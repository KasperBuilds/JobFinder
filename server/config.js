require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rapidApiKey: process.env.RAPIDAPI_KEY || '',
  rapidApiHost: process.env.RAPIDAPI_HOST || 'jobsearch4.p.rapidapi.com',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  databasePath: process.env.DATABASE_PATH || './jobs.db'
};
