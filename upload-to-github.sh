#!/bin/bash

# Upload Prime Skin Clinic to GitHub
echo "Uploading Prime Skin Clinic to GitHub..."

# Configure git
git config user.name "Alimaster30"
git config user.email "alit169533@gmail.com"

# Add all files
echo "Adding all files..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Complete Prime Skin Clinic Management System

- Updated branding from Pak Skin Care to Prime Skin Clinic
- Fixed Monthly Revenue chart data structure
- Added clinic logo to login page
- Complete dermatology clinic management system with:
  * Patient management
  * Appointment scheduling
  * Prescription management
  * Billing and invoicing
  * Analytics dashboard
  * Staff management
  * Role-based access control"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "Upload complete!"
