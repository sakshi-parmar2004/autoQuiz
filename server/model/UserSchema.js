import mongoose from 'mongoose';

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensures no duplicate emails
    trim: true,
    lowercase: true, // Converts email to lowercase
  },
  password: {
    type: String,
    required: true, // Password is required
    minlength: 6, // Minimum password length
  }
//   role: {
//     type: String,
//     enum: ['user', 'admin'], // Role can only be 'user' or 'admin'
//     default: 'user', // Default role is 'user'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now, // Automatically sets the creation date
//   },
});

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;