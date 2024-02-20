import React from 'react'
import { Resizable } from 're-resizable';
import 'tailwindcss/tailwind.css';


export const ResizableComponent = () => {
    return (
        <>
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
        </>
    )
}
