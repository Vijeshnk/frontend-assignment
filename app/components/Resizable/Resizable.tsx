'use client'

import React from 'react';
import { Rnd } from 'react-rnd';

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const ResizableComponents = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Component 1 */}
      <Rnd
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds="parent"
      >
        <div className="text-center">Component 1</div>
      </Rnd>

      {/* Component 2 */}
      <Rnd
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds="parent"
      >
        <div className="text-center">Component 2</div>
      </Rnd>

      {/* Component 3 */}
      <Rnd
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds="parent"
      >
        <div className="text-center">Component 3</div>
      </Rnd>
    </div>
  );
};

export default ResizableComponents;

