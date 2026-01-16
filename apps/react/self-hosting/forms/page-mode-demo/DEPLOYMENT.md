# Deployment Guide: Page Mode Demo

This guide will walk you through deploying the Page Mode Demo with:
- **Frontend (Next.js)** → Vercel
- **Backend (Django)** → Railway
- **Database** → MongoDB Atlas

## Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
2. **Railway Account** - [Sign up here](https://railway.app)
3. **Vercel Account** - [Sign up here](https://vercel.com/signup)
4. **Velt API Key** - [Get from Velt Dashboard](https://console.velt.dev)

---

## Part 1: Setup MongoDB Atlas

### 1.1 Create a Cluster

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Create Cluster"**
3. Choose **"Shared"** (free tier) or your preferred plan
4. Select your cloud provider and region
5. Click **"Create Cluster"**

### 1.2 Create Database User

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username and generate a strong password (save this!)
5. Set user privileges to **"Read and write to any database"**
6. Click **"Add User"**

### 1.3 Configure Network Access

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For production, restrict to Railway and Vercel IPs
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (format: `mongodb+srv://...`)
5. Replace `<password>` with your database user password
6. Save this connection string for later

---

## Part 2: Deploy Backend to Railway

### 2.1 Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Choose **"Deploy from GitHub repo"**
4. Connect your GitHub account if not already connected
5. Select your repository
6. Railway will detect the Django app automatically

### 2.2 Configure Root Directory (Important!)

Railway needs to know where your Django backend is located:

1. In Railway project settings, go to **"Settings"** tab
2. Find **"Root Directory"** setting
3. Enter: `apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend`
4. Click **"Save"**

### 2.3 Set Environment Variables

In Railway project settings, go to **"Variables"** tab and add:

```bash
# Django Configuration
DJANGO_SECRET_KEY=<generate-a-strong-random-key>
DEBUG=False
ALLOWED_HOSTS=<your-app-name>.up.railway.app

# CORS - You'll update this after deploying to Vercel
CORS_ALLOWED_ORIGINS=http://localhost:3000

# MongoDB Atlas
MONGODB_URI=<your-mongodb-connection-string-from-step-1.4>
MONGODB_DATABASE=velt_comments

# Velt API Configuration
VELT_API_KEY=<your-velt-api-key>
VELT_AUTH_TOKEN=<your-velt-auth-token>
```

**To generate DJANGO_SECRET_KEY:**
```python
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

### 2.4 Deploy

1. Railway will automatically deploy after you set environment variables
2. Wait for the deployment to complete (check **"Deployments"** tab)
3. Once deployed, Railway will provide a URL: `https://<your-app>.up.railway.app`
4. Test the health endpoint: `https://<your-app>.up.railway.app/api/health`
   - Should return: `{"status": "ok", "service": "velt-django-backend"}`

### 2.5 Copy Backend URL

Save your Railway backend URL for the next step: `https://<your-app>.up.railway.app`

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will detect Next.js automatically

### 3.2 Configure Build Settings

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `apps/react/self-hosting/forms/page-mode-demo`
3. **Build Command**: `pnpm run build` (auto-detected)
4. **Install Command**: `cd ../../../../.. && pnpm install`

### 3.3 Set Environment Variables

In Vercel project settings, go to **"Environment Variables"** and add:

```bash
# Velt Configuration
NEXT_PUBLIC_VELT_API_KEY=<your-velt-api-key>

# Backend API URL (from Railway - Part 2.5)
NEXT_PUBLIC_BACKEND_URL=https://<your-backend>.up.railway.app
```

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for the deployment to complete
3. Vercel will provide a URL: `https://<your-app>.vercel.app`

### 3.5 Copy Frontend URL

Save your Vercel frontend URL: `https://<your-app>.vercel.app`

---

## Part 4: Connect Frontend and Backend

### 4.1 Update Railway CORS Settings

Go back to Railway and update the `CORS_ALLOWED_ORIGINS` variable:

```bash
CORS_ALLOWED_ORIGINS=https://<your-app>.vercel.app,http://localhost:3000
```

**Important:** No spaces between URLs, comma-separated.

### 4.2 Update Railway ALLOWED_HOSTS

Also update `ALLOWED_HOSTS` if using a custom domain:

```bash
ALLOWED_HOSTS=<your-railway-app>.up.railway.app,<custom-domain-if-any>
```

### 4.3 Redeploy Backend

Railway will automatically redeploy after you update environment variables.

---

## Part 5: Verify Deployment

### 5.1 Test Backend

```bash
# Health check
curl https://<your-backend>.up.railway.app/api/health

# Test Velt endpoint
curl https://<your-backend>.up.railway.app/api/velt/token
```

### 5.2 Test Frontend

1. Visit your Vercel URL: `https://<your-app>.vercel.app`
2. The page should load successfully
3. Try adding a comment to test the Velt integration
4. Check browser console for any errors

### 5.3 Test Integration

1. Open browser DevTools → Network tab
2. Add a comment in the frontend
3. Verify API calls are going to your Railway backend
4. Check MongoDB Atlas **"Collections"** tab to see data being saved

---

## Troubleshooting

### Backend Issues

**Error: "DisallowedHost"**
- Check `ALLOWED_HOSTS` in Railway environment variables
- Make sure it includes your Railway domain

**Error: "CORS policy"**
- Check `CORS_ALLOWED_ORIGINS` in Railway
- Make sure it includes your Vercel URL (with https://)
- No trailing slashes in URLs

**Error: "Unable to connect to MongoDB"**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows Railway IPs (0.0.0.0/0)
- Verify database user credentials

### Frontend Issues

**Error: "Failed to fetch"**
- Check `NEXT_PUBLIC_BACKEND_URL` in Vercel
- Verify Railway backend is running (check health endpoint)
- Check browser console for CORS errors

**Comments not saving**
- Check `NEXT_PUBLIC_VELT_API_KEY` in Vercel
- Verify Velt API key is valid in [Velt Console](https://console.velt.dev)
- Check Network tab in browser DevTools

### Railway Deployment Failed

**Build errors:**
- Check Railway **"Deployments"** → **"Build Logs"**
- Verify `Root Directory` is set correctly
- Check `requirements.txt` has all dependencies

**Runtime errors:**
- Check Railway **"Deployments"** → **"Deploy Logs"**
- Look for Python errors or missing environment variables

---

## Environment Variables Reference

### Railway (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `DJANGO_SECRET_KEY` | Django secret key (generate random) | `django-insecure-xxx...` |
| `DEBUG` | Debug mode (False in production) | `False` |
| `ALLOWED_HOSTS` | Allowed hosts (comma-separated) | `myapp.up.railway.app` |
| `CORS_ALLOWED_ORIGINS` | CORS origins (comma-separated) | `https://myapp.vercel.app` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@...` |
| `MONGODB_DATABASE` | MongoDB database name | `velt_comments` |
| `VELT_API_KEY` | Velt API key | From Velt Console |
| `VELT_AUTH_TOKEN` | Velt auth token | From Velt Console |

### Vercel (Frontend)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_VELT_API_KEY` | Velt API key (public) | From Velt Console |
| `NEXT_PUBLIC_BACKEND_URL` | Railway backend URL | `https://myapp.up.railway.app` |

---

## Custom Domains (Optional)

### Railway Custom Domain

1. Go to Railway project **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your custom domain
4. Add DNS records as shown by Railway
5. Update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` accordingly

### Vercel Custom Domain

1. Go to Vercel project **"Settings"** → **"Domains"**
2. Add your custom domain
3. Configure DNS records as shown by Vercel
4. Update Railway's `CORS_ALLOWED_ORIGINS` with new domain

---

## Monitoring and Logs

### Railway Logs

- Go to Railway project → **"Deployments"**
- Click on latest deployment → **"View Logs"**
- Monitor for errors or issues

### Vercel Logs

- Go to Vercel project → **"Deployments"**
- Click on deployment → **"Functions"** tab
- View serverless function logs

### MongoDB Atlas Monitoring

- Go to MongoDB Atlas → **"Clusters"**
- Click **"Metrics"** to see database usage
- Click **"Collections"** to view stored data

---

## Security Best Practices

1. **Never commit sensitive keys** to Git
2. **Use strong passwords** for MongoDB users
3. **Restrict MongoDB Network Access** to specific IPs in production
4. **Set DEBUG=False** in production
5. **Use environment-specific** `.env` files
6. **Rotate secrets regularly** (especially DJANGO_SECRET_KEY)
7. **Enable HTTPS** (automatic on Railway and Vercel)
8. **Monitor logs** for suspicious activity

---

## Cost Estimates

### Free Tiers Available

- **MongoDB Atlas**: 512 MB storage (Shared M0)
- **Railway**: $5 credit/month (then pay-as-you-go)
- **Vercel**: Generous free tier for personal projects

### Upgrade When Needed

- Scale MongoDB cluster for more storage/performance
- Upgrade Railway plan for more resources
- Upgrade Vercel Pro for team features and analytics

---

## Need Help?

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas
- **Velt Docs**: https://docs.velt.dev

---

## Quick Reference

### Railway CLI (Optional)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Set environment variable
railway variables set KEY=value
```

### Vercel CLI (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# View logs
vercel logs

# Set environment variable
vercel env add
```

---

**Congratulations!** Your Page Mode Demo is now deployed and running in production! 🎉
