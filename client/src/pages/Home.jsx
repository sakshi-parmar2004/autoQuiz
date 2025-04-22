import React, { useContext, useState  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AppContext } from '../context/AppContext';
import { McqContext } from '../context/McqContext';
import Loading from '../components/Loading'

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState('');
  const [mcqs, setMcqs] = useState([]);
  const[dataRecieved,setDataRecieved] = useState(false);
  const[datasent,setDatasent] = useState(false);

  const {isLoggedIn,theme , backendURL} = useContext(AppContext);
  //to pass as a prompt to tthe api 
  const {McqCount, setMcqCount} = useContext(McqContext)
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
     axios.defaults.withCredentials = true;

    if (!pdfFile) {
      setMessage('Please select a PDF file.');
      return;
    }
    setDatasent(true)
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    console.log("the mcq are",McqCount)
    formData.append('mcqCount',McqCount)

    try {
      const res = await axios.post( backendURL + '/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
      console.log(res.data); // contains filename, path, etc.
      setMcqs(res.data.mcqs.split('\n\n')); 
      setDataRecieved(true)
      
    } catch (err) {
      setMessage('Upload failed.');
      console.error( "The error is",err);
    }
  };
  
const Navigate = useNavigate();
  const handleMcqPage=()=>
  {
    Navigate('/mcqs', { state: { mcqs } })

  }
  return (
    <div className={` ${theme === 'day' ? 'bg-white text-black' : 'bg-black text-white'}`} >
   
    <Navbar/>
      
    {
      isLoggedIn?
      <form onSubmit={handleUpload} className={`flex flex-col gap-3 max-w-md mx-auto ${theme === 'day' ? 'bg-white text-black' : 'bg-gray-900 text-white'} p-6 rounded-lg shadow-md mt-40`}>
  <h2 className="text-2xl font-bold mb-4  text-center">Upload a PDF</h2>
  <div className="mb-4">
    <label
      htmlFor="pdfFile"
      className={`block text-xl font-semibold mb-2 `}
    >
      Select a PDF file
    </label>
    <input
      id="pdfFile"
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
      ${theme === 'day' ? 'bg-white text-black' : 'bg-gray-800 text-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-6 py-2`}
    />
  </div>
  <div className='flex flex-col gap-2'>
  <label htmlFor=""> Select the no. of mcq you want to generate</label>
  <select 
  onChange={(e)=>setMcqCount(e.target.value)}
  value={McqCount}>
      <option className={`${theme === 'day' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`} value="5">5 MCQs</option>
      <option className={`${theme === 'day' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}  value="10">10 MCQs</option>
      <option className={`${theme === 'day' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}  value="20">20 MCQs</option>
    </select>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-600 py-2 px-4 rounded-lg text-white hover:bg-blue-700 transition duration-200 cursor-pointer"
  >
    Upload PDF
  </button>
  
  {message && (
    <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
  )}
</form> :
<div className="text-center mt-40">
  <h2 className="text-2xl font-bold mb-4 text-gray-700">Welcome to AutoQuiz</h2>
  <p className="text-gray-600 mb-6">
    Please log in to upload a PDF and start generating quizzes.
  </p>
  <button
    onClick={() => Navigate('/login')}
    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Log In
  </button>
</div>
    }

{  datasent && !message ? 
  <div className="text-center mt-6"> <button className="px-4 py-2 bg-blue-600 text-white rounded animate-pulse">
  Loading...
</button>
</div>
 : mcqs.length > 0 && dataRecieved && (
  <div className="text-center mt-6">
    <button
      onClick={handleMcqPage}
      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
    >
      Start Quiz
    </button>
  </div>
)}


    </div>
  );
};

export default Home;
