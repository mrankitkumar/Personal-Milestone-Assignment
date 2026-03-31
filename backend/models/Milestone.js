const mongoose = require('mongoose');

const milestoneSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Work', 'Personal', 'Health']
    }
}, {
    timestamps: true
});

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;
