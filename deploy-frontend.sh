#!/bin/bash

echo "🌐 Deploying Prime Skin Clinic Frontend to Vercel..."

# Navigate to client directory
cd client

# Login to Vercel (will prompt for authentication)
echo "📝 Logging into Vercel..."
vercel login

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Frontend deployment complete!"
echo "🔗 Your frontend will be available at the URL shown above"

cd ..
