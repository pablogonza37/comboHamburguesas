'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  const links = [
    { nombre: 'Inicio', href: '/principal' },
    { nombre: 'Nosotros', href: '/nosotros' },
    { nombre: 'Contacto', href: '/contacto' },
  ];

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition">
          🍔 BurgerApp
        </Link>

        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-yellow-400 transition ${
                pathname === link.href ? 'text-yellow-400 font-semibold' : ''
              }`}
            >
              {link.nombre}
            </Link>
          ))}
        </div>

      
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuAbierto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

     
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-black">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:text-yellow-400 transition ${
                pathname === link.href ? 'text-yellow-400 font-semibold' : ''
              }`}
              onClick={() => setMenuAbierto(false)}
            >
              {link.nombre}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
