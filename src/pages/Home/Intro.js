import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileBadge2  } from 'lucide-react'; // Importing FileBadge2  icon from lucide-react

import axios from 'axios';
import "./intro.css"; 
function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description, caption } = intro;


  const [animationText, setAnimationText] = useState('web Developer🌐');

  useEffect(() => {
    const interval = setInterval(() => {
      switch (animationText) {
        case 'web Developer🌐':
          setAnimationText('android Developer📱');
          break;
        case 'android Developer📱':
          setAnimationText('desktop Developer🖥️');
          break;
        case 'desktop Developer🖥️':
          setAnimationText('ML Engineer👾');
          break;
        case 'ML Engineer👾':
          setAnimationText('web Developer🌐');
          break;
        default:
          setAnimationText('web Developer🌐');
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [animationText]);


  const handleResumeDownload = async () => {
    try {
      const response = await axios.get('https://baskend-deploy-1.onrender.com/api/portfolio/resume');
      const resumeData = response.data[0]; // Assuming there's only one resume entry in the response array
      
      // Extracting the resume URL from the response
      const resumeUrl = resumeData.resume;
      
      // Initiating the download
      window.open(resumeUrl, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center h-[80vh] bg-primary gap-8">
      <h1 className="text-white">{welcomeText || ""} </h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        {firstName || ""} {lastName || ""}
      </h1>
      <h1 className='text-5xl sm:text-3xl text-white font-semibold'><span className="animation-text">{animationText}</span></h1> 
      <p className="text-white w-2/3">{description || ""}s</p>
      <button className='border-2 border-tertiary text-tertiary px-10 py-3 rounded flex' onClick={handleResumeDownload}>
        Resume <FileBadge2 className="py-1" size={25} />
      </button>
    </div>
  );
}

export default Intro;
