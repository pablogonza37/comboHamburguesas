'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";

const Main = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    
    return (
      <div className="min-h-screen bg-black">
        {/* O un placeholder vacío o loader */}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2271099/pexels-photo-2271099.jpeg')",
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen  bg-opacity-60 space-y-10 px-4 text-center">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          ¡Bienvenido!
        </h1>
        <Link href="/hamburguesas" className="bg-yellow-500 border-white hover:bg-yellow-600 text-white text-3xl font-extrabold py-6 px-14 rounded-full shadow-xl transition duration-300">
          Armá tu combo
        </Link>
      </div>
    </div>
  );
};

export default Main;
