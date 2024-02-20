'use client'

import React from 'react';
import { Resizable } from 're-resizable';
import 'tailwindcss/tailwind.css';
import { ResizableComponent } from '../ResizableComponent/ResizableComponent';


const HomeComponent: React.FC = () => {
    return (
        <div >
            <div className="flex flex-col items-center justify-center lg:flex-row  mt-4 gap-6 flex-wrap resize-x overflow-hidden w-auto flex-initial ">
                <ResizableComponent />


                <Resizable
                    defaultSize={{
                        width: 700,
                        height: 420,
                    }}

                    style={{ border: '1px solid black' }}
                    minWidth={110}
                    minHeight={100}
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
                    <div className="p-4 bg-red-200 text-center">Component 2</div>
                    <div><h1>Welcome</h1></div>
                </Resizable>



            </div>
            <div className='flex justify-center mt-4'>

                <Resizable
                    defaultSize={{
                        width: '95vw',
                        height: 420,
                    }}
                    style={{ border: '1px solid black' }}
                    minWidth={167}
                    minHeight={350}
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
                    <div className="p-4 bg-red-200 text-center">Component 3 </div>
                    <div><p className='text-wrap'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel, harum a provident at quae voluptatem optio ratione cumque laboriosam officia culpa fugit eaque corporis exercitationem quos corrupti nostrum. Quis, totam?r</p></div>
                </Resizable>


            </div>
        </div>
    );
};

export default HomeComponent;











