const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('./config');

class Database {
  constructor() {
    // Use Railway's persistent volume or fallback to local path
    // Try multiple paths for Railway compatibility
    let dbPath;
    if (process.env.DATABASE_PATH) {
      dbPath = process.env.DATABASE_PATH;
    } else if (process.env.RAILWAY_ENVIRONMENT) {
      // Railway environment - use /tmp for writable directory
      dbPath = '/tmp/jobs.db';
    } else {
      dbPath = config.databasePath;
    }
    
    console.log(`Initializing database at: ${dbPath}`);
    
    try {
      this.db = new sqlite3.Database(dbPath);
      this.init();
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  init() {
    this.db.serialize(() => {
      // Create job_listings table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS job_listings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          job_id TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          company TEXT NOT NULL,
          location TEXT NOT NULL,
          description TEXT,
          requirements TEXT,
          employment_type TEXT,
          remote_allowed BOOLEAN DEFAULT 0,
          salary_min INTEGER,
          salary_max INTEGER,
          currency TEXT DEFAULT 'USD',
          category TEXT NOT NULL,
          job_url TEXT,
          company_url TEXT,
          posted_date TEXT,
          application_deadline TEXT,
          experience_level TEXT,
          education_level TEXT,
          skills TEXT,
          benefits TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create indexes for better performance
      this.db.run(`CREATE INDEX IF NOT EXISTS idx_category ON job_listings(category)`);
      this.db.run(`CREATE INDEX IF NOT EXISTS idx_location ON job_listings(location)`);
      this.db.run(`CREATE INDEX IF NOT EXISTS idx_employment_type ON job_listings(employment_type)`);
      this.db.run(`CREATE INDEX IF NOT EXISTS idx_remote_allowed ON job_listings(remote_allowed)`);
      this.db.run(`CREATE INDEX IF NOT EXISTS idx_posted_date ON job_listings(posted_date)`);
    });
  }

  // Insert or update job listing
  async insertOrUpdateJob(jobData) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO job_listings (
          job_id, title, company, location, description, requirements,
          employment_type, remote_allowed, salary_min, salary_max, currency,
          category, job_url, company_url, posted_date, application_deadline,
          experience_level, education_level, skills, benefits, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `);

      stmt.run([
        jobData.job_id,
        jobData.title,
        jobData.company,
        jobData.location,
        jobData.description,
        jobData.requirements,
        jobData.employment_type,
        jobData.remote_allowed ? 1 : 0,
        jobData.salary_min,
        jobData.salary_max,
        jobData.currency || 'USD',
        jobData.category,
        jobData.job_url,
        jobData.company_url,
        jobData.posted_date,
        jobData.application_deadline,
        jobData.experience_level,
        jobData.education_level,
        jobData.skills,
        jobData.benefits
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });

      stmt.finalize();
    });
  }

  // Get jobs with filters
  async getJobs(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM job_listings WHERE 1=1';
      const params = [];

      if (filters.category) {
        query += ' AND category = ?';
        params.push(filters.category);
      }

      if (filters.location) {
        query += ' AND (location LIKE ? OR location LIKE ?)';
        params.push(`%${filters.location}%`, `%Remote%`);
      }

      if (filters.employment_type) {
        query += ' AND employment_type = ?';
        params.push(filters.employment_type);
      }

      if (filters.remote_only) {
        query += ' AND remote_allowed = 1';
      }

      if (filters.search) {
        query += ' AND (title LIKE ? OR company LIKE ? OR description LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      if (filters.salary_min) {
        query += ' AND (salary_min >= ? OR salary_max >= ?)';
        params.push(filters.salary_min, filters.salary_min);
      }

      query += ' ORDER BY posted_date DESC, created_at DESC';

      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }

      if (filters.offset) {
        query += ' OFFSET ?';
        params.push(filters.offset);
      }

      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get job by ID
  async getJobById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM job_listings WHERE job_id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Get job statistics
  async getJobStats() {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          category,
          COUNT(*) as count,
          AVG(salary_min) as avg_salary_min,
          AVG(salary_max) as avg_salary_max
        FROM job_listings 
        WHERE salary_min IS NOT NULL AND salary_max IS NOT NULL
        GROUP BY category
        ORDER BY count DESC
      `, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get unique values for filters
  async getFilterOptions() {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT 
          DISTINCT category,
          COUNT(*) as count
        FROM job_listings 
        GROUP BY category
        ORDER BY count DESC
      `, (err, categories) => {
        if (err) {
          reject(err);
        } else {
          this.db.all(`
            SELECT 
              DISTINCT employment_type,
              COUNT(*) as count
            FROM job_listings 
            WHERE employment_type IS NOT NULL
            GROUP BY employment_type
            ORDER BY count DESC
          `, (err, employmentTypes) => {
            if (err) {
              reject(err);
            } else {
              this.db.all(`
                SELECT 
                  DISTINCT location,
                  COUNT(*) as count
                FROM job_listings 
                GROUP BY location
                ORDER BY count DESC
                LIMIT 50
              `, (err, locations) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    categories,
                    employmentTypes,
                    locations
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = Database;
