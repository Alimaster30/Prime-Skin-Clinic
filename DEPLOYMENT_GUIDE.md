# 🚀 Prime Skin Clinic - CLI Deployment Guide

## Email for Deployment: 223595@students.au.edu.pk

---

## 🚂 Part 1: Railway Backend Deployment

### Step 1: Install Railway CLI
```bash
# Option 1: Using npm
npm install -g @railway/cli

# Option 2: Using PowerShell (Windows)
iwr https://install.railway.app -useb | iex

# Option 3: Using curl (Linux/Mac)
curl -fsSL https://railway.app/install.sh | sh
```

### Step 2: Login to Railway
```bash
cd server
railway login
# Use email: 223595@students.au.edu.pk
```

### Step 3: Create Railway Project
```bash
railway project create prime-skin-clinic-backend
```

### Step 4: Set Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set PORT=5001
railway variables set JWT_SECRET=prime-skin-clinic-super-secure-jwt-secret-key-2025
railway variables set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prime-skin-clinic
```

### Step 5: Deploy Backend
```bash
railway up
```

---

## 🌐 Part 2: Vercel Frontend Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
cd ../client
vercel login
# Use email: 223595@students.au.edu.pk
```

### Step 3: Deploy Frontend
```bash
vercel --prod
```

### Step 4: Set Environment Variables
After deployment, set these in Vercel dashboard:
- VITE_API_URL=https://your-railway-backend-url.railway.app/api
- VITE_APP_NAME=Prime Skin Clinic
- VITE_APP_VERSION=1.0.0

---

## 🔧 MongoDB Atlas Setup (Required)

1. Go to https://cloud.mongodb.com/
2. Create free account with: 223595@students.au.edu.pk
3. Create new cluster
4. Create database user
5. Whitelist all IPs (0.0.0.0/0)
6. Get connection string
7. Update Railway MONGODB_URI variable

---

## ✅ Verification Steps

1. Check Railway deployment: `railway status`
2. Check Vercel deployment: `vercel ls`
3. Test API: Visit your Railway URL
4. Test Frontend: Visit your Vercel URL
5. Test full app: Login and check features

---

## 🛠️ Troubleshooting

- **Railway login issues**: Try `railway logout` then `railway login`
- **Vercel build errors**: Check build logs in dashboard
- **CORS errors**: Update CORS origins in backend
- **Database connection**: Verify MongoDB Atlas connection string
