import multer from 'multer'; // Import multer for handling file uploads
import express from 'express'; // Import express to create a router
import path from 'path'; // Import path to handle file paths
import { uploadFile } from '../controller/uploadController.js'; // Import the uploadFile controller function
import { generateMCQs } from '../controller/mcqController.js';

const uploadRouter = express.Router(); // Create a new router instance

// Define storage configuration for multer
const storage = multer.diskStorage({
    // Set the destination folder for uploaded files
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Files will be saved in the 'uploads/' directory
    },
    // Set the filename for uploaded files
    filename: (req, file, cb) => {
      // Generate a unique filename using the current timestamp and the original file extension
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
// Initialize multer with the defined storage configuration
const upload = multer({ storage });

// Define a POST route for file uploads
// This route expects a single file with the field name 'pdf'
uploadRouter.post('/', upload.single('pdf'), uploadFile);


// Export the router to be used in other parts of the application
export default uploadRouter;