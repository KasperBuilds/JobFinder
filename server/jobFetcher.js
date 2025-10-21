const axios = require('axios');
const config = require('./config');
const Database = require('./database');

class JobFetcher {
  constructor() {
    this.db = new Database();
    this.categories = [
      'International Relations',
      'Political Science', 
      'Law',
      'Public Policy',
      'Diplomacy',
      'Human Rights',
      'International Development',
      'International Law'
    ];
    
    // Rate limiting: 1000 requests per hour = ~16 requests per minute
    this.requestCount = 0;
    this.lastResetTime = Date.now();
    this.maxRequestsPerHour = 1000;
    this.requestDelay = 4000; // 4 seconds between requests (15 requests per minute)
  }

  async fetchJobs() {
    console.log('Starting job fetch process...');
    const allJobs = [];

    // Reset counter if it's been more than an hour
    if (Date.now() - this.lastResetTime > 3600000) {
      this.requestCount = 0;
      this.lastResetTime = Date.now();
    }

    for (const category of this.categories) {
      try {
        console.log(`Fetching jobs for category: ${category}`);
        const jobs = await this.fetchJobsForCategory(category);
        allJobs.push(...jobs);
        
        // Add delay between categories to respect rate limits
        await this.delay(this.requestDelay);
      } catch (error) {
        console.error(`Error fetching jobs for ${category}:`, error.message);
      }
    }

    console.log(`Fetched ${allJobs.length} total jobs`);
    return allJobs;
  }

  async fetchJobsForCategory(category) {
    const searchQueries = this.getSearchQueriesForCategory(category);
    const allJobs = [];

    for (const query of searchQueries) {
      // Check rate limit
      if (this.requestCount >= this.maxRequestsPerHour) {
        console.log('Rate limit reached. Skipping remaining requests.');
        break;
      }

      try {
        const jobs = await this.searchJobs(query, category);
        allJobs.push(...jobs);
        
        // Increment request counter
        this.requestCount++;
        
        // Add delay between requests
        await this.delay(this.requestDelay);
      } catch (error) {
        console.error(`Error searching for "${query}":`, error.message);
      }
    }

    return allJobs;
  }

  getSearchQueriesForCategory(category) {
    const queries = {
      'International Relations': ['international relations internship', 'foreign affairs intern', 'diplomacy intern'],
      'Political Science': ['political science internship', 'policy intern', 'government intern'],
      'Law': ['legal internship', 'law intern', 'paralegal intern'],
      'Public Policy': ['public policy internship', 'policy analysis intern', 'government affairs intern'],
      'Diplomacy': ['diplomacy internship', 'embassy intern', 'consular intern'],
      'Human Rights': ['human rights internship', 'advocacy intern', 'nonprofit intern'],
      'International Development': ['international development internship', 'NGO intern', 'development intern'],
      'International Law': ['international law internship', 'treaty law intern', 'humanitarian law intern']
    };

    return queries[category] || [`${category} internship`];
  }

  async searchJobs(query, category) {
    // Check rate limit before making request
    if (this.requestCount >= 24) {
      console.log(`Rate limit reached (10 requests). Skipping query: "${query}"`);
      return [];
    }

    const options = {
      method: 'GET',
      url: 'https://api.openwebninja.com/jsearch/search',
      params: {
        query: query,
        country: 'us',
        language: 'en',
        num_pages: '10',
        date_posted: 'month',
        employment_types: 'INTERN'
      },
      headers: {
        'Accept': 'application/json',
        'x-api-key': config.rapidApiKey
      }
    };

    try {
      console.log(`Making API request for: "${query}" (Request #${this.requestCount + 1})`);
      const response = await axios.request(options);
      const jobs = response.data.data || [];
      
      console.log(`Found ${jobs.length} jobs for query: "${query}"`);
      return jobs.map(job => this.transformJobData(job, category));
    } catch (error) {
      console.error(`API Error for query "${query}":`, error.response?.data || error.message);
      return [];
    }
  }

  transformJobData(job, category) {
    return {
      job_id: job.job_id || `${job.employer_name}_${job.job_title}_${Date.now()}`,
      title: job.job_title || 'N/A',
      company: job.employer_name || 'N/A',
      location: job.job_city && job.job_state ? 
        `${job.job_city}, ${job.job_state}` : 
        (job.job_city || job.job_state || job.job_country || 'Location not specified'),
      description: job.job_description || '',
      requirements: this.formatRequirements(job.job_highlights?.Qualifications),
      employment_type: this.mapEmploymentType(job.job_employment_type),
      remote_allowed: this.isRemoteJob(job),
      salary_min: this.extractSalary(job.job_salary, 'min'),
      salary_max: this.extractSalary(job.job_salary, 'max'),
      currency: this.extractCurrency(job.job_salary) || 'USD',
      category: category,
      job_url: job.job_apply_link || job.job_url,
      company_url: null,
      posted_date: job.job_posted_at_datetime_utc || new Date().toISOString(),
      application_deadline: null,
      experience_level: this.mapExperienceLevel(job.job_highlights?.Qualifications),
      education_level: this.extractEducationLevel(job.job_highlights?.Qualifications),
      skills: this.extractSkills(job.job_highlights?.Qualifications),
      benefits: job.job_highlights?.Benefits || ''
    };
  }

  mapEmploymentType(type) {
    const mapping = {
      'FULLTIME': 'Full-time',
      'PARTTIME': 'Part-time',
      'CONTRACTOR': 'Contract',
      'INTERNSHIP': 'Internship',
      'INTERN': 'Internship',
      'TEMPORARY': 'Temporary'
    };
    // Since we're searching for internships, default to Internship if type is null
    return mapping[type] || 'Internship';
  }

  isRemoteJob(job) {
    const location = ((job.job_city || '') + ' ' + (job.job_state || '')).toLowerCase();
    return location.includes('remote') || 
           location.includes('work from home') ||
           job.job_title?.toLowerCase().includes('remote') ||
           job.job_description?.toLowerCase().includes('remote');
  }

  extractSalary(salaryStr, type) {
    if (!salaryStr) return null;
    
    const numbers = salaryStr.match(/\d+/g);
    if (!numbers || numbers.length === 0) return null;
    
    const nums = numbers.map(Number);
    if (type === 'min') {
      return Math.min(...nums);
    } else {
      return Math.max(...nums);
    }
  }

  extractCurrency(salaryStr) {
    if (!salaryStr) return 'USD';
    
    if (salaryStr.includes('€') || salaryStr.includes('EUR')) return 'EUR';
    if (salaryStr.includes('£') || salaryStr.includes('GBP')) return 'GBP';
    if (salaryStr.includes('$') || salaryStr.includes('USD')) return 'USD';
    
    return 'USD';
  }

  mapExperienceLevel(qualifications) {
    if (!qualifications) return 'Not specified';
    
    // Handle both string and array cases
    const quals = Array.isArray(qualifications) 
      ? qualifications.join(' ').toLowerCase()
      : qualifications.toLowerCase();
      
    if (quals.includes('senior') || quals.includes('5+ years') || quals.includes('10+ years')) {
      return 'Senior';
    } else if (quals.includes('mid') || quals.includes('3-5 years') || quals.includes('2-5 years')) {
      return 'Mid-level';
    } else if (quals.includes('entry') || quals.includes('0-2 years') || quals.includes('junior')) {
      return 'Entry-level';
    }
    
    return 'Not specified';
  }

  extractEducationLevel(qualifications) {
    if (!qualifications) return 'Not specified';
    
    // Handle both string and array cases
    const quals = Array.isArray(qualifications) 
      ? qualifications.join(' ').toLowerCase()
      : qualifications.toLowerCase();
      
    if (quals.includes('phd') || quals.includes('doctorate')) return 'PhD';
    if (quals.includes('master') || quals.includes('mba')) return 'Master\'s';
    if (quals.includes('bachelor') || quals.includes('degree')) return 'Bachelor\'s';
    if (quals.includes('high school') || quals.includes('diploma')) return 'High School';
    
    return 'Not specified';
  }

  extractSkills(qualifications) {
    if (!qualifications) return '';
    
    // Handle both string and array cases
    const quals = Array.isArray(qualifications) 
      ? qualifications.join(' ').toLowerCase()
      : qualifications.toLowerCase();
    
    const commonSkills = [
      'research', 'analysis', 'communication', 'writing', 'presentation',
      'project management', 'leadership', 'teamwork', 'problem solving',
      'data analysis', 'policy development', 'stakeholder engagement',
      'legal research', 'compliance', 'regulatory affairs', 'international relations',
      'diplomacy', 'foreign languages', 'negotiation', 'advocacy'
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      quals.includes(skill)
    );
    
    return foundSkills.join(', ');
  }

  formatRequirements(qualifications) {
    if (!qualifications) return '';
    
    // Handle both string and array cases
    if (Array.isArray(qualifications)) {
      return qualifications.join('\n');
    }
    
    // If it's an object, try to extract meaningful content
    if (typeof qualifications === 'object') {
      return JSON.stringify(qualifications);
    }
    
    return qualifications.toString();
  }

  async saveJobs(jobs) {
    console.log(`Saving ${jobs.length} jobs to database...`);
    let saved = 0;
    let errors = 0;

    for (const job of jobs) {
      try {
        await this.db.insertOrUpdateJob(job);
        saved++;
      } catch (error) {
        console.error(`Error saving job ${job.job_id}:`, error.message);
        errors++;
      }
    }

    console.log(`Saved ${saved} jobs, ${errors} errors`);
    return { saved, errors };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async runFullFetch() {
    try {
      const jobs = await this.fetchJobs();
      const result = await this.saveJobs(jobs);
      console.log('Job fetch completed:', result);
      return result;
    } catch (error) {
      console.error('Error in full fetch:', error);
      throw error;
    }
  }
}

module.exports = JobFetcher;
