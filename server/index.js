const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const path = require('path');
const config = require('./config');
const Database = require('./database');
const JobFetcher = require('./jobFetcher');

const app = express();
const db = new Database();
const jobFetcher = new JobFetcher();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  console.log('Serving static files from:', buildPath);
  app.use(express.static(buildPath));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  try {
    const healthData = { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv,
      port: process.env.PORT || config.port,
      database: 'connected',
      memory: process.memoryUsage(),
      version: process.version
    };
    
    console.log('Health check requested:', healthData);
    res.status(200).json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString()
  });
});

// Keep-alive endpoint to prevent Railway from killing the server
app.get('/api/keepalive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all jobs with optional filters
app.get('/api/jobs', async (req, res) => {
  try {
    const {
      category,
      location,
      employment_type,
      remote_only,
      search,
      salary_min,
      page = 1,
      limit = 20
    } = req.query;

    const filters = {
      category,
      location,
      employment_type,
      remote_only: remote_only === 'true',
      search,
      salary_min: salary_min ? parseInt(salary_min) : undefined,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const jobs = await db.getJobs(filters);
    const totalCount = await db.getJobs({ ...filters, limit: undefined, offset: undefined });

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount.length,
        totalPages: Math.ceil(totalCount.length / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await db.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Get job statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await db.getJobStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get filter options
app.get('/api/filters', async (req, res) => {
  try {
    const options = await db.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

// Get job categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { name: 'International Relations', description: 'Jobs in diplomacy, foreign affairs, international organizations' },
    { name: 'Political Science', description: 'Research, analysis, and policy positions' },
    { name: 'Law', description: 'Legal positions, attorneys, legal counsel' },
    { name: 'Public Policy', description: 'Government policy, regulatory affairs' },
    { name: 'Diplomacy', description: 'Diplomatic positions, embassy roles' },
    { name: 'Human Rights', description: 'Advocacy, human rights organizations' },
    { name: 'International Development', description: 'NGO positions, development work' },
    { name: 'International Law', description: 'International legal positions' }
  ];
  res.json(categories);
});

// Manual job fetch endpoint (for testing)
app.post('/api/fetch-jobs', async (req, res) => {
  try {
    console.log('Manual job fetch triggered');
    const result = await jobFetcher.runFullFetch();
    res.json({ 
      message: 'Job fetch completed', 
      result 
    });
  } catch (error) {
    console.error('Error in manual job fetch:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  // In production, serve React app for non-API routes
  if (process.env.NODE_ENV === 'production' && !req.path.startsWith('/api/')) {
    const buildPath = path.join(__dirname, '../client/build');
    return res.sendFile(path.join(buildPath, 'index.html'));
  }
  
  // For API routes or development, return JSON error
  res.status(404).json({ error: 'Route not found' });
});

// Start server with simple port handling
async function startServer() {
  try {
    const PORT = process.env.PORT || config.port;
    console.log(`Starting server on port ${PORT}...`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Database path: ${config.databasePath}`);
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ Environment: ${config.nodeEnv}`);
      console.log(`✅ Health check available at http://0.0.0.0:${PORT}/api/health`);
      
      // Schedule job fetching every 2 days
      if (config.rapidApiKey && config.rapidApiKey.length > 0) {
        console.log('Scheduling job fetch every 2 days...');
        cron.schedule('0 0 */2 * *', async () => {
          console.log('Starting scheduled job fetch...');
          try {
            await jobFetcher.runFullFetch();
            console.log('Scheduled job fetch completed');
          } catch (error) {
            console.error('Scheduled job fetch failed:', error);
          }
        });
        
        // Run initial fetch on startup (with delay to avoid immediate rate limiting)
        setTimeout(async () => {
          console.log('Running initial job fetch...');
          try {
            await jobFetcher.runFullFetch();
            console.log('Initial job fetch completed');
          } catch (error) {
            console.error('Initial job fetch failed:', error);
          }
        }, 10000); // 10 second delay
      } else {
        console.log('⚠️  RAPIDAPI_KEY not set or empty - job fetching disabled');
        console.log('⚠️  Server will start but no jobs will be fetched until API key is provided');
      }
    });
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is in use, trying alternative port...`);
        const altPort = PORT + 1;
        const altServer = app.listen(altPort, '0.0.0.0', () => {
          console.log(`✅ Server running on alternative port ${altPort}`);
          console.log(`✅ Health check available at http://0.0.0.0:${altPort}/api/health`);
        });
        
        altServer.on('error', (altError) => {
          console.error('❌ Failed to start server on alternative port:', altError);
          process.exit(1);
        });
      } else {
        console.error('❌ Server error:', error);
        process.exit(1);
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();


// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close();
  process.exit(0);
});

module.exports = app;
