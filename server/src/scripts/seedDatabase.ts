import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Patient from '../models/patient.model';
import Settings from '../models/settings.model';
import Service from '../models/service.model';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Settings.deleteMany({});
    await Service.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create Admin User
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
    console.log('✅ Created admin user: admin@psc.com / admin123');

    // Create Dermatologist
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    const doctorUser = new User({
      firstName: 'Dr. Sarah',
      lastName: 'Ahmed',
      email: 'doctor@psc.com',
      password: doctorPassword,
      role: 'dermatologist',
      isActive: true,
      phoneNumber: '+92-300-7654321'
    });
    await doctorUser.save();
    console.log('✅ Created doctor user: doctor@psc.com / doctor123');

    // Create Receptionist
    const receptionistPassword = await bcrypt.hash('reception123', 10);
    const receptionistUser = new User({
      firstName: 'Maria',
      lastName: 'Khan',
      email: 'reception@psc.com',
      password: receptionistPassword,
      role: 'receptionist',
      isActive: true,
      phoneNumber: '+92-300-9876543'
    });
    await receptionistUser.save();
    console.log('✅ Created receptionist user: reception@psc.com / reception123');

    // Create Settings
    const settings = new Settings({
      clinicName: 'Prime Skin Clinic',
      address: '123 Medical Center, Gulberg III, Lahore, Pakistan',
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
    await settings.save();
    console.log('✅ Created clinic settings');

    // Create Sample Services
    const services = [
      {
        name: 'Acne Treatment',
        description: 'Comprehensive acne treatment and consultation',
        price: 2500,
        duration: 45,
        category: 'Treatment'
      },
      {
        name: 'Skin Consultation',
        description: 'General dermatology consultation',
        price: 2000,
        duration: 30,
        category: 'Consultation'
      },
      {
        name: 'Chemical Peel',
        description: 'Professional chemical peel treatment',
        price: 5000,
        duration: 60,
        category: 'Cosmetic'
      },
      {
        name: 'Laser Treatment',
        description: 'Laser therapy for various skin conditions',
        price: 8000,
        duration: 90,
        category: 'Treatment'
      }
    ];

    for (const serviceData of services) {
      const service = new Service(serviceData);
      await service.save();
    }
    console.log('✅ Created sample services');

    // Create Sample Patient
    const samplePatient = new Patient({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+92-300-1111111',
      dateOfBirth: new Date('1990-01-15'),
      gender: 'male',
      address: {
        street: '456 Sample Street',
        city: 'Lahore',
        state: 'Punjab',
        zipCode: '54000',
        country: 'Pakistan'
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'spouse',
        phoneNumber: '+92-300-2222222'
      },
      medicalHistory: {
        allergies: ['None'],
        currentMedications: [],
        pastSurgeries: [],
        chronicConditions: []
      }
    });
    await samplePatient.save();
    console.log('✅ Created sample patient');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@psc.com / admin123');
    console.log('Doctor: doctor@psc.com / doctor123');
    console.log('Receptionist: reception@psc.com / reception123');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

export default seedDatabase;
