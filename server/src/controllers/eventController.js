const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events with search and filter
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const { search, category, location } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 9; // Default 9 events per page
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Event.countDocuments(query);

        const events = await Event.find(query)
            .sort({ date: 1 })
            .skip(startIndex)
            .limit(limit);

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            count: events.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            pagination,
            data: events
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Admin only - simplified for now)
const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check capacity
        const registrationCount = await Registration.countDocuments({ event: req.params.id });
        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event is fully booked' });
        }

        // Check for existing registration
        const existingRegistration = await Registration.findOne({
            user: req.user.id,
            event: req.params.id
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'You are already registered for this event' });
        }

        const registration = await Registration.create({
            user: req.user.id,
            event: req.params.id
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Cancel registration
// @route   DELETE /api/events/:id/register
// @access  Private
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOneAndDelete({
            user: req.user.id,
            event: req.params.id
        });

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.status(200).json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my registrations
// @route   GET /api/events/my/registrations
// @access  Private
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id }).populate('event');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    registerForEvent,
    cancelRegistration,
    getMyRegistrations
};
