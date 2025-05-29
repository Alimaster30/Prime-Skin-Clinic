import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Settings from '../models/settings.model';

const router = express.Router();

// Setup initial admin user and settings
router.post('/init', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@psc.com' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@psc.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      phoneNumber: '+92-300-1234567'
    });

    await adminUser.save();

    // Create default settings
    const defaultSettings = new Settings({
      clinicName: 'Prime Skin Clinic',
      address: '123 Medical Center, Lahore, Pakistan',
      phoneNumber: '+92-42-1234567',
      email: 'info@primeskinclinic.com',
      website: 'https://primeskinclinic.com',
      currency: 'PKR',
      taxRate: 17,
      appointmentDuration: 30,
      appointmentBuffer: 15,
      workingHours: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '09:00', end: '14:00' },
        sunday: { start: '', end: '' }
      },
      consultationFees: {
        initial: 2000,
        followUp: 1500
      },
      notifications: {
        appointmentReminders: true,
        reminderHours: 24,
        smsEnabled: false,
        emailEnabled: true,
        prescriptionReady: true,
        paymentReceived: true
      },
      backup: {
        autoBackup: true,
        backupFrequency: 'daily',
        backupTime: '02:00',
        retentionDays: 30
      }
    });

    await defaultSettings.save();

    res.status(201).json({
      message: 'Initial setup completed successfully',
      admin: {
        email: 'admin@psc.com',
        password: 'admin123'
      }
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Setup failed', error: error.message });
  }
});

export default router;
