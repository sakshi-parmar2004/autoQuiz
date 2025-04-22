import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSun, FaMoon } from 'react-icons/fa';


const Navbar = () => {
const Navigate = useNavigate();
const {isLoggedIn,backendURL, userData ,setIsLoggedIn ,theme, toggleTheme} = useContext(AppContext);

  const handleLogout = async()=>
  {
    
    const data = await axios.post(backendURL + '/api/auth/logout' );
    if(data.success)
    {
      toast.success(data.message);
      setIsLoggedIn(false);
    
    }
    else{
   toast.error(data.message)
    }


  }
  return (
    <nav className={`${theme === 'day' ? 'bg-blue-700 text-white' : 'bg-gray-900 text-white'} shadow-md flex justify-between items-center px-6 py-4 `} >
      <h1
      onClick={()=> Navigate('/')}
        className=' text-2xl font-bold cursor-pointer' // Added brightness-125 to make the image brighter
       >AutoQuiz</h1>
        
      <div>
        {

          isLoggedIn ? (<>
            <div className='flex items-center gap-4'>
               {theme=='day'? <FaMoon
                onClick={toggleTheme}
               />:<FaSun
               onClick={toggleTheme}
               /> }
               <div className="relative group">
              <img
                onClick={() => Navigate('/login')}
                className="w-6 h-6 rounded-full cursor-pointer"
                src={assets.person_icon}
                alt="Profile Icon"
              />
              <div 
              
              className="hidden group-hover:block absolute bg-white text-black   p-4 rounded shadow-lg top-8 left-0 whitespace-nowrap">
                Create New Account
              </div>
            </div>
              <p> {userData.name}</p>
              <button
              onClick={handleLogout}
                className='px-8 py-2 mx-10 font-semibold bg-white text-black rounded-full text-center cursor-pointer '>Logout</button>
            </div>
          </>
          ) : (
            null
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;