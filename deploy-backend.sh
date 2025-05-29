#!/bin/bash

echo "🚂 Deploying Prime Skin Clinic Backend to Railway..."

# Navigate to server directory
cd server

# Login to Railway (will prompt for authentication)
echo "📝 Logging into Railway..."
railway login

# Create new project
echo "🆕 Creating Railway project..."
railway project create prime-skin-clinic-backend

# Set environment variables
echo "⚙️ Setting environment variables..."
railway variables set NODE_ENV=production
railway variables set PORT=5001
railway variables set JWT_SECRET=prime-skin-clinic-super-secure-jwt-secret-key-2025

# Deploy the service
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Backend deployment complete!"
echo "🔗 Your backend will be available at the URL shown above"

cd ..
