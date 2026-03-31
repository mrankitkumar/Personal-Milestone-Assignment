const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/milestones', milestoneRoutes);

// Seed Default User
const seedUser = async () => {
    try {
        const userExists = await User.findOne({ email: 'user@gmail.com' });
        if (!userExists) {
            await User.create({
                email: 'user@gmail.com',
                password: '123456789' // Password will be hashed by the pre-save hook
            });
            console.log('Default user seeded: user@gmail.com / 123456789');
        }
    } catch (error) {
        console.error('Error seeding user:', error.message);
    }
};

seedUser();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
