'use client'

import React from 'react';
import { Resizable } from 're-resizable';
import 'tailwindcss/tailwind.css';

const MyPage: React.FC = () => {
  return (
    <div >
      <div className="flex flex-col items-center justify-center lg:flex-row  mt-4 gap-6 flex-wrap resize-x overflow-hidden w-auto flex-initial ">
        <Resizable

          defaultSize={{
            width: 300,
            height: 200,
          }}
          style={{ border: '1px solid black' }}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          className="bg-stone-950"
        >
          <div className="p-4 bg-blue-200 ">Component 1 (some HTML content)</div>
        </Resizable>

        <Resizable
          defaultSize={{
            width: 300,
            height: 200,
          }}
          style={{ border: '1px solid black' }}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
        >
          <div className="p-4 bg-green-200">Component 2 (some HTML content)</div>
        </Resizable>


      </div>
      <div className='flex justify-center mt-4'>

        <Resizable
          defaultSize={{
            width: 300,
            height: 200,
          }}
          style={{ border: '1px solid black' }}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
        >
          <div className="p-4 bg-green-200">Component 2 (some HTML content)</div>
        </Resizable>

      </div>
    </div>
  );
};

export default MyPage;











