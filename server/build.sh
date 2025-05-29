#!/bin/bash

echo "🔨 Building Prime Skin Clinic Backend for Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🏗️ Building TypeScript..."
npm run build

echo "✅ Build complete!"
