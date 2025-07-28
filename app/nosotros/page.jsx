export default function Nosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-red-100 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-red-600">Sobre Nosotros</h1>
        <p className="text-lg mb-6">
          En <span className="font-bold">BurgerApp</span>, creemos que una buena hamburguesa puede cambiar tu día.
          Desde nuestros comienzos en una pequeña cocina familiar, nos propusimos crear algo más que comida rápida:
          queríamos ofrecer experiencias memorables.
        </p>
        <img
          src="https://images.pexels.com/photos/4109132/pexels-photo-4109132.jpeg"
          alt="Nuestra cocina"
          className="rounded-2xl shadow-xl mx-auto w-full max-w-lg mb-6"
        />
        <p className="text-lg">
          Usamos ingredientes frescos, carne de primera calidad y un toque de creatividad en cada receta. Somos una
          empresa joven, apasionada y comprometida con brindar lo mejor, siempre.
        </p>
      </div>
    </div>
  );
}
