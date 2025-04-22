import fs from 'fs';
import pdf from 'pdf-parse';
import { generateMCQs } from './mcqController.js';

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  console.log("The req looks like ",req.body.mcqCount);
  const mcqCount = req.body.mcqCount;

  let dataBuffer = fs.readFileSync(req.file.path);
 
   pdf(dataBuffer).then(async(data) =>{
 
    // number of pages
    // console.log( "data.numpages",   data.numpages);
    // // number of rendered pages
    // console.log( "data of rendered pages" , data.numrender);
    // // PDF info
    // console.log("data.info", data.info);
    // // PDF metadata
    // console.log("data.metadataa is here", data.metadata); 
    // PDF.js version
    // // check https://mozilla.github.io/pdf.js/getting_started/
    // console.log("dara version" , data.version);
    // PDF text
    const rawText =data.text;
    const cleanText = rawText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

    const mcqs = await generateMCQs({ text: cleanText, count: mcqCount });
    
    res.json({success:true,message:"Generated successfully" ,mcqs }); // Send MCQs back to frontend
        
});

  };


