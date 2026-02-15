const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    registerForEvent,
    cancelRegistration,
    getMyRegistrations
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(createEvent); // Optionally protect this for admin

router.get('/my/registrations', protect, getMyRegistrations);

router.route('/:id')
    .get(getEventById);

router.route('/:id/register')
    .post(protect, registerForEvent)
    .delete(protect, cancelRegistration);

module.exports = router;
