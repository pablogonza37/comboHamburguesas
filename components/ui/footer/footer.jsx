const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold mb-2">BurgerApp</h2>
          <p className="text-sm">
            Sabores auténticos, ingredientes frescos y pasión por las hamburguesas. Desde 2025, alimentando antojos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Secciones</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Inicio</a></li>
            <li><a href="/nosotros" className="hover:underline">Nosotros</a></li>
            <li><a href="/contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Redes Sociales</h2>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-yellow-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2.1.3 2.6.6.6.3 1 .7 1.3 1.3.3.5.5 1.4.6 2.6.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2.1-.6 2.6-.3.6-.7 1-1.3 1.3-.5.3-1.4.5-2.6.6-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2.1-.3-2.6-.6-.6-.3-1-.7-1.3-1.3-.3-.5-.5-1.4-.6-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2.1.6-2.6.3-.6.7-1 1.3-1.3.5-.3 1.4-.5 2.6-.6C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.6.2-2 .4-.5.3-.8.6-1.1 1.1-.2.4-.3.9-.4 2-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.6.4 2 .3.5.6.8 1.1 1.1.4.2.9.3 2 .4 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.6-.2 2-.4.5-.3.8-.6 1.1-1.1.2-.4.3-.9.4-2 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.6-.4-2-.3-.5-.6-.8-1.1-1.1-.4-.2-.9-.3-2-.4-1.3-.1-1.7-.1-4.8-.1zm0 3.2a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6zm0 9.6a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6zm5.7-9.9a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-yellow-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.7-1.6 1.5V12H18l-.5 3h-2.6v7C18.3 21.1 22 17 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6 opacity-70">© {new Date().getFullYear()} BurgerApp. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
