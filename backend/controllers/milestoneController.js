const Milestone = require('../models/Milestone');
const User = require('../models/User');
const sendResponse = require('../utils/responseHelper');

// @desc Fetch all milestones for logged in user (server-side category filter)
// @route GET /api/milestones?category=Work
// @access Private
const getMilestones = async (req, res) => {
    const filter = { user: req.user._id };

    // Server-side category filtering
    if (req.query.category && req.query.category !== 'All') {
        filter.category = req.query.category;
    }

    const milestones = await Milestone.find(filter).sort({ createdAt: -1 });
    sendResponse(res, 200, 'Milestones fetched successfully', milestones);
};

// @desc Create a new milestone (stored in DB with description)
// @route POST /api/milestones
// @access Private
const createMilestone = async (req, res) => {
    const { title, category, description } = req.body;

    if (!title || title.length < 3) {
        return sendResponse(res, 400, 'Title must be at least 3 characters long');
    }

    if (!['Work', 'Personal', 'Health'].includes(category)) {
        return sendResponse(res, 400, 'Invalid category');
    }

    const milestone = new Milestone({
        user: req.user._id,
        title,
        category,
        description: description || ''
    });

    const createdMilestone = await milestone.save();
    sendResponse(res, 201, 'Milestone created successfully', createdMilestone);
};

// @desc Get milestone stats + user metrics (fully server-side)
// @route GET /api/milestones/stats
// @access Private
const getStats = async (req, res) => {
    const [total, work, health, personal, user] = await Promise.all([
        Milestone.countDocuments({ user: req.user._id }),
        Milestone.countDocuments({ user: req.user._id, category: 'Work' }),
        Milestone.countDocuments({ user: req.user._id, category: 'Health' }),
        Milestone.countDocuments({ user: req.user._id, category: 'Personal' }),
        User.findById(req.user._id).select('-password')
    ]);

    sendResponse(res, 200, 'Stats fetched successfully', {
        total,
        categories: [
            { id: 'Work', count: work },
            { id: 'Health', count: health },
            { id: 'Personal', count: personal }
        ],
        user: {
            name: user.name,
            email: user.email,
            focusGrade: user.focusGrade,
            status: user.status
        }
    });
};

// @desc Update user profile (name, focusGrade, status)
// @route PUT /api/milestones/profile
// @access Private
const updateProfile = async (req, res) => {
    const { name, focusGrade, status } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return sendResponse(res, 404, 'User not found');

    if (name) user.name = name;
    if (focusGrade) user.focusGrade = focusGrade;
    if (status) user.status = status;

    const updatedUser = await user.save();

    sendResponse(res, 200, 'Profile updated successfully', {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        focusGrade: updatedUser.focusGrade,
        status: updatedUser.status
    });
};

// @desc Delete a milestone
// @route DELETE /api/milestones/:id
// @access Private
const deleteMilestone = async (req, res) => {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
        return sendResponse(res, 404, 'Milestone not found');
    }

    // Check for user ownership
    if (milestone.user.toString() !== req.user._id.toString()) {
        return sendResponse(res, 401, 'User not authorized to delete this milestone');
    }

    await milestone.deleteOne();
    sendResponse(res, 200, 'Milestone removed successfully');
};

module.exports = { getMilestones, createMilestone, getStats, updateProfile, deleteMilestone };
