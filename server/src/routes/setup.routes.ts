import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Settings from '../models/settings.model';
import seedDatabase from '../scripts/seedDatabase';

const router = express.Router();

// Comprehensive database seeding endpoint
router.get('/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({
      message: 'Database seeded successfully!',
      credentials: {
        admin: { email: 'admin@psc.com', password: 'Admin123!' },
        doctor: { email: 'doctor@psc.com', password: 'Doctor123!' },
        receptionist: { email: 'reception@psc.com', password: 'Reception123!' }
      }
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    res.status(500).json({
      message: 'Database seeding failed',
      error: error?.message || 'Unknown error'
    });
  }
});

// Setup initial admin user and settings (GET version for easy browser access)
router.get('/init', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@psc.com' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
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
        password: 'Admin123!'
      }
    });

  } catch (error: any) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Setup failed', error: error?.message || 'Unknown error' });
  }
});

// Setup initial admin user and settings (POST version)
router.post('/init', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@psc.com' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
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
        password: 'Admin123!'
      }
    });

  } catch (error: any) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Setup failed', error: error?.message || 'Unknown error' });
  }
});

export default router;
