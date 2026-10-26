const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Announcement = require('./models/Announcement');
const Training = require('./models/Training');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Announcement.deleteMany({});
    await Training.deleteMany({});

    console.log('Cleared existing data');

    // Create demo users
    const hrUser = await User.create({
      name: 'Admin HR',
      email: 'hr@staffsync.com',
      password: 'password123',
      role: 'HR',
    });

    const managerUser = await User.create({
      name: 'John Manager',
      email: 'manager@staffsync.com',
      password: 'password123',
      role: 'Manager',
    });

    const employeeUser = await User.create({
      name: 'Jane Employee',
      email: 'employee@staffsync.com',
      password: 'password123',
      role: 'Employee',
    });

    console.log('Demo users created');

    // Create demo employee record
    await Employee.create({
      name: 'Jane Employee',
      email: 'employee@staffsync.com',
      department: 'Engineering',
      position: 'Developer',
      salary: 50000,
      joinDate: new Date('2024-01-15'),
      phone: '9876543210',
      address: 'Bangalore, India',
      user: employeeUser._id,
    });

    // Create demo announcement
    await Announcement.create({
      title: 'Welcome to StaffSync!',
      message: 'This is your new HRM portal. Use it to manage leaves, attendance, and stay updated with company news.',
      createdBy: hrUser._id,
      targetAudience: 'All',
    });

    // Create demo training
    await Training.create({
      title: 'MongoDB CRUD Operations',
      description: 'This Training Session is based on the MongoDB CRUD Operation.',
      date: new Date('2025-11-05'),
      trainer: 'John Manager',
      createdBy: managerUser._id,
      assignedTo: [employeeUser._id],
    });

    console.log('\n=== Seed Complete ===');
    console.log('Demo Accounts:');
    console.log('HR:       hr@staffsync.com      / password123');
    console.log('Manager:  manager@staffsync.com / password123');
    console.log('Employee: employee@staffsync.com / password123');
    console.log('=====================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
