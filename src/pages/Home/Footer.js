import React from 'react';
import AnimatedBackground from "../../components/AnimatedBackground";

function Footer() {
  return (
    <div id="footer-section" className="relative py-10 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden">
      {/* Add the animated background */}
      <AnimatedBackground containerId="footer-section" />

      <div className='relative z-10'>
        <div className='h-[1px] w-full bg-gray-700'>
        </div>

        <div className='flex items-center justify-center flex-col mt-10 opacity-70'>
              <h1 className="text-white">
                  Designed and Developed By
              </h1>
             <h className="text-white">
                <span className="text-white">AbhisheK Solapure</span>
             </h>
        </div>
      </div>
    </div>
  )
}

export default Footer