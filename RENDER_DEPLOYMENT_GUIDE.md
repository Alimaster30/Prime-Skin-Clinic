# 🚀 Prime Skin Clinic - Render Deployment Guide

## Email for Deployment: 223595@students.au.edu.pk

---

## 🌐 Step-by-Step Render Deployment

### 🔧 Prerequisites
1. GitHub repository: https://github.com/Alimaster30/Prime-Skin-Clinic
2. MongoDB Atlas account (free tier)
3. Render account with email: 223595@students.au.edu.pk

---

## 🗄️ Part 1: Setup MongoDB Atlas

1. **Go to**: https://cloud.mongodb.com/
2. **Sign up/Login** with: 223595@students.au.edu.pk
3. **Create free cluster** (M0 Sandbox)
4. **Create database user**:
   - Username: `primeskin`
   - Password: `PrimeSkin2025!`
5. **Network Access**: Add IP `0.0.0.0/0` (Allow access from anywhere)
6. **Get connection string**: 
   ```
   mongodb+srv://primeskin:PrimeSkin2025!@cluster0.xxxxx.mongodb.net/prime-skin-clinic?retryWrites=true&w=majority
   ```

---

## 🚂 Part 2: Deploy Backend to Render

1. **Go to**: https://render.com/
2. **Sign up/Login** with: 223595@students.au.edu.pk
3. **Connect GitHub** account
4. **Create New Web Service**:
   - **Repository**: `Alimaster30/Prime-Skin-Clinic`
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=prime-skin-clinic-super-secure-jwt-secret-key-2025
   MONGODB_URI=mongodb+srv://primeskin:PrimeSkin2025!@cluster0.xxxxx.mongodb.net/prime-skin-clinic?retryWrites=true&w=majority
   ```

6. **Deploy**: Click "Create Web Service"

---

## 🌐 Part 3: Deploy Frontend to Render

1. **Create New Static Site**:
   - **Repository**: `Alimaster30/Prime-Skin-Clinic`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

2. **Environment Variables**:
   ```
   VITE_API_URL=https://prime-skin-clinic-backend.onrender.com/api
   VITE_APP_NAME=Prime Skin Clinic
   VITE_APP_VERSION=1.0.0
   ```

3. **Deploy**: Click "Create Static Site"

---

## 🔗 Expected URLs

After deployment:
- **Backend**: `https://prime-skin-clinic-backend.onrender.com`
- **Frontend**: `https://prime-skin-clinic-frontend.onrender.com`
- **API**: `https://prime-skin-clinic-backend.onrender.com/api`

---

## ✅ Verification Steps

1. **Backend Health Check**: Visit backend URL
2. **Frontend Access**: Visit frontend URL
3. **Login Test**: Try logging in with test credentials
4. **API Test**: Check if frontend can connect to backend

---

## 🛠️ Troubleshooting

- **Build Failures**: Check build logs in Render dashboard
- **CORS Errors**: Verify frontend URL in CORS configuration
- **Database Connection**: Verify MongoDB Atlas connection string
- **Environment Variables**: Double-check all environment variables

---

## 📱 Test Credentials

After deployment, test with:
- **Email**: `admin@psc.com`
- **Password**: `admin123`
