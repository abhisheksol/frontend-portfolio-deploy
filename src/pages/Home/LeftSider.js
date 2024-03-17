import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static sm:text-4xl sm:gap-3 sm:p-4 ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="https://www.google.com/">
            {" "}
            <i class="ri-facebook-circle-line text-gray-400"></i>
          </a>

          <i class="ri-mail-line text-gray-400 "></i>
          <i class="ri-instagram-line text-gray-400 "></i>
          <i class="ri-linkedin-box-line text-gray-400 "></i>
          <i class="ri-github-line text-gray-400 "></i>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;



// import React from "react";

// function LeftSider() {
//   return (
//     <div className='fixed left-0 bottom-0 px-10 sm:px-0'>
//     <div className='flex flex-col items-center '>
//     <div className='flex flex-col gap-5'>
//          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//              <i className="ri-facebook-circle-line text-gray-400 text-xl cursor-pointer"></i>
//          </a>
//          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//              <i className="ri-instagram-line text-gray-400 text-xl cursor-pointer"></i>
//          </a>
//          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
//              <i className="ri-linkedin-box-line text-gray-400 text-xl cursor-pointer"></i>
//          </a>
//          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//              <i className="ri-github-fill text-gray-400 text-xl cursor-pointer"></i>
//          </a>
//          <a href="mailto:example@example.com">
//              <i className="ri-mail-line text-gray-400 text-xl cursor-pointer"></i>
//          </a>
//      </div>
//      <div className='bg-[#125f63] w-[1px] h-52'></div>
//     </div>
//  </div>
//   );
// }

// export default LeftSider;
