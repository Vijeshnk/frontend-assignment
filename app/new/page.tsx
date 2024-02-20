'use client'

import React from 'react';
import { Resizable } from 're-resizable';
import 'tailwindcss/tailwind.css';
import { ResizableComponent } from '../components/ResizableComponent/ResizableComponent';

const MyPage: React.FC = () => {
  return (
    <div >
      <div className="flex flex-col items-center justify-center lg:flex-row  mt-4 gap-6 flex-wrap resize-x overflow-hidden w-auto flex-initial ">
      <ResizableComponent/>

     <ResizableComponent/>


      </div>
      <div className='flex justify-center mt-4'>

     <ResizableComponent/>

      </div>
    </div>
  );
};

export default MyPage;











