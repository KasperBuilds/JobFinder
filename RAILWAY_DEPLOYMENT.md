# Railway Deployment Guide for AHS Job Portal

## 🚀 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **API Key**: Your RapidAPI key is already configured

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

### Step 2: Deploy on Railway

1. **Login to Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your AHS job portal repository

3. **Configure Environment Variables**:
   In Railway dashboard, go to Variables tab and add:
   ```
   RAPIDAPI_KEY=ak_rn2rsf4vcavfel6syaylxlqj685pxiewg8u7qpuh22qnkl9
   RAPIDAPI_HOST=api.openwebninja.com
   NODE_ENV=production
   DATABASE_PATH=/data/jobs.db
   ```

4. **Deploy**:
   - Railway will automatically detect Node.js
   - It will run `npm install` and `npm run start:prod`
   - Your app will be available at `https://your-app-name.railway.app`

### Step 3: Configure Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Railway dashboard, go to Settings
   - Add your custom domain
   - Update CORS_ORIGIN environment variable

### Step 4: Monitor Your Deployment

1. **View Logs**:
   - Railway provides real-time logs
   - Monitor job fetching and API calls

2. **Health Check**:
   - Visit `https://your-app-name.railway.app/api/health`
   - Should return: `{"status":"OK","timestamp":"...","environment":"production"}`

## 🔧 Configuration Files Created

- `railway.json`: Railway-specific configuration
- `Procfile`: Process definition for Railway
- Updated `package.json`: Production scripts
- Updated server config: Production-ready settings

## 📊 Features After Deployment

✅ **320+ Internship Listings**: Real jobs from API
✅ **8 Job Categories**: International Relations, Political Science, Law, etc.
✅ **Job Detail Pages**: Clickable jobs with descriptions and apply links
✅ **Responsive Design**: Works on desktop and mobile
✅ **Auto Job Fetching**: Updates every 6 hours
✅ **Rate Limiting**: Respects API limits (1000 requests/hour)

## 🚨 Important Notes

1. **Database Persistence**: Railway provides persistent storage at `/data/`
2. **Environment Variables**: Keep your API key secure
3. **CORS**: Update CORS_ORIGIN for your production domain
4. **Monitoring**: Check Railway logs for any issues

## 🎯 Your Live Application

Once deployed, your job portal will be available at:
`https://your-app-name.railway.app`

Users can:
- Browse internships by category
- Search and filter jobs
- Click on jobs to see full details
- Apply directly through job links
- View job statistics and categories

## 🔄 Updating Your App

To update your deployed app:
1. Make changes locally
2. Commit and push to GitHub
3. Railway automatically redeploys

## 📞 Support

If you encounter issues:
1. Check Railway logs
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity
