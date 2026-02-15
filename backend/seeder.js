const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();
connectDB();

const events = [
    {
        name: 'Tech Conference 2024',
        description: 'A deep dive into the latest in technology.',
        date: new Date('2024-11-15T10:00:00'),
        location: 'San Francisco, CA',
        category: 'Technology',
        capacity: 100,
        organizer: 'TechWorld'
    },
    {
        name: 'Music Fest',
        description: 'Enjoy the best bands in town.',
        date: new Date('2024-12-20T18:00:00'),
        location: 'Austin, TX',
        category: 'Music',
        capacity: 500,
        organizer: 'LiveMusic'
    },
    {
        name: 'Art Expo',
        description: 'Contemporary art exhibition.',
        date: new Date('2024-10-05T09:00:00'),
        location: 'New York, NY',
        category: 'Art',
        capacity: 50,
        organizer: 'ArtGallery'
    },
    {
        name: 'Startup Summit',
        description: 'Networking for entrepreneurs.',
        date: new Date('2025-01-10T09:00:00'),
        location: 'Chicago, IL',
        category: 'Business',
        capacity: 200,
        organizer: 'StartupHub'
    },
    {
        name: 'Coding Bootcamp',
        description: 'Learn to code in 3 days.',
        date: new Date('2023-12-01T09:00:00'),
        location: 'Online',
        category: 'Education',
        capacity: 30,
        organizer: 'CodeAcademy'
    }
    // Add more if needed
];

const seedData = async () => {
    try {
        await Event.deleteMany();
        await Event.insertMany(events);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
