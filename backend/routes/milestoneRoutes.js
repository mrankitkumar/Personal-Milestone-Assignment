const express = require('express');
const router = express.Router();
const { getMilestones, createMilestone, getStats, updateProfile, deleteMilestone } = require('../controllers/milestoneController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMilestones).post(protect, createMilestone);
router.get('/stats', protect, getStats);
router.put('/profile', protect, updateProfile);
router.delete('/:id', protect, deleteMilestone);

module.exports = router;
