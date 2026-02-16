const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bellcorp_events');

const events = [
    {
        name: 'The Future of AI Conference',
        description: 'Join industry leaders to discuss the transformative power of Artificial Intelligence in various sectors.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        location: 'San Francisco, CA',
        category: 'Technology',
        capacity: 500,
        organizer: 'TechInnovate',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Global Music Festival 2026',
        description: 'A three-day festival featuring top artists from around the world across multiple genres.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
        location: 'Austin, TX',
        category: 'Music',
        capacity: 5000,
        organizer: 'LiveBeat Productions',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Sustainable Business Summit',
        description: 'Learn how to implement sustainable practices in your business to drive growth and positive impact.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        location: 'London, UK',
        category: 'Business',
        capacity: 300,
        organizer: 'GreenBiz Alliance',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Modern Art Exhibition Opening',
        description: 'Be the first to see the new collection from avant-garde artists pushing the boundaries of medium.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (Past Event)
        location: 'New York, NY',
        category: 'Art',
        capacity: 200,
        organizer: 'MOMA',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Marathon for Charity',
        description: 'Run for a cause! All proceeds go to supporting local educational initiatives.',
        date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 months from now
        location: 'Boston, MA',
        category: 'Sports',
        capacity: 1000,
        organizer: 'City Run Foundation',
        image: 'https://images.unsplash.com/photo-1532444458054-a158e87693d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Digital Marketing Masterclass',
        description: 'A comprehensive workshop on the latest digital marketing strategies and tools.',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago (Past Event)
        location: 'Online',
        category: 'Education',
        capacity: 100,
        organizer: 'GrowthHackers',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Startup Pitch Night',
        description: 'Watch 10 promising startups pitch their ideas to a panel of investors.',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        location: 'Seattle, WA',
        category: 'Business',
        capacity: 150,
        organizer: 'Venture Partners',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Classical Symphony Evening',
        description: 'An enchanting evening of classical masterpieces performed by the City Symphony Orchestra.',
        date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        location: 'Vienna, Austria',
        category: 'Music',
        capacity: 800,
        organizer: 'Vienna Arts Council',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Blockchain Summit 2026',
        description: 'Exploring the future of decentralized finance and blockchain technology.',
        date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        location: 'Dubai, UAE',
        category: 'Technology',
        capacity: 1000,
        organizer: 'CryptoWorld',
        image: 'https://images.unsplash.com/photo-1639322537228-ad7117a7a66b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Abstract Art Gallery Walk',
        description: 'A guided tour through the city\'s most prestigious abstract art galleries.',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Paris, France',
        category: 'Art',
        capacity: 50,
        organizer: 'Artistic Minds',
        image: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'International Jazz Night',
        description: 'Smooth jazz performances by award-winning musicians in an intimate setting.',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        location: 'New Orleans, LA',
        category: 'Music',
        capacity: 200,
        organizer: 'Jazz Soul',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Yoga & Mindfulness Retreat',
        description: 'A weekend of relaxation, yoga, and meditation to rejuvenate your mind and body.',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'Bali, Indonesia',
        category: 'Sports',
        capacity: 40,
        organizer: 'Zen Life',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Cybersecurity Defense Workshop',
        description: 'Hands-on training on how to protect systems and networks from cyber attacks.',
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        location: 'Tel Aviv, Israel',
        category: 'Technology',
        capacity: 120,
        organizer: 'SecureNet',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Global Leadership Forum',
        description: 'Developing the next generation of global leaders through mentorship and seminars.',
        date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        location: 'Geneva, Switzerland',
        category: 'Business',
        capacity: 800,
        organizer: 'Leadership One',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Photography Masterclass 101',
        description: 'Learn the fundamentals of professional photography from world-renowned experts.',
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        location: 'Tokyo, Japan',
        category: 'Art',
        capacity: 60,
        organizer: 'Lens Masters',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'International Jazz Night',
        description: 'Smooth jazz performances by award-winning musicians in an intimate setting.',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        location: 'New Orleans, LA',
        category: 'Music',
        capacity: 200,
        organizer: 'Jazz Soul',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Cybersecurity Defense Workshop',
        description: 'Hands-on training on how to protect systems and networks from cyber attacks.',
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        location: 'Tel Aviv, Israel',
        category: 'Technology',
        capacity: 120,
        organizer: 'SecureNet',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Blockchain Summit 2026',
        description: 'Exploring the future of decentralized finance and blockchain technology.',
        date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        location: 'Dubai, UAE',
        category: 'Technology',
        capacity: 1000,
        organizer: 'CryptoWorld',
        image: 'https://images.unsplash.com/photo-1639322537228-ad7117a7a66b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Global Music Festival 2026',
        description: 'A three-day festival featuring top artists from around the world across multiple genres.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
        location: 'Austin, TX',
        category: 'Music',
        capacity: 5000,
        organizer: 'LiveBeat Productions',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Classical Symphony Evening',
        description: 'An enchanting evening of classical masterpieces performed by the City Symphony Orchestra.',
        date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        location: 'Vienna, Austria',
        category: 'Music',
        capacity: 800,
        organizer: 'Vienna Arts Council',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Marathon for Charity',
        description: 'Run for a cause! All proceeds go to supporting local educational initiatives.',
        date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 months from now
        location: 'Boston, MA',
        category: 'Sports',
        capacity: 1000,
        organizer: 'City Run Foundation',
        image: 'https://images.unsplash.com/photo-1532444458054-a158e87693d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'NextGen EdTech Expo',
        description: 'Showcasing the latest technologies transforming the way we learn and teach.',
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'Seoul, South Korea',
        category: 'Education',
        capacity: 1500,
        organizer: 'EdFuture',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Extreme Sports Championship',
        description: 'Adrenaline-pumping action featuring skateboarding, BMX, and motocross.',
        date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        location: 'Los Angeles, CA',
        category: 'Sports',
        capacity: 3000,
        organizer: 'X-Games Inc',
        image: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        name: 'Creative Writing Workshop',
        description: 'Unlock your creativity and improve your storytelling skills with published authors.',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        location: 'Edinburgh, Scotland',
        category: 'Education',
        capacity: 40,
        organizer: 'Writers Guild',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
];

const importData = async () => {
    try {
        await Event.deleteMany(); // Clear existing events (optional, be careful)
        await Event.create(events);
        console.log('Data Imported successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Event.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error('Error destroying data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
