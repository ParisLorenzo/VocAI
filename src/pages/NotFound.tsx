import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-orbitron text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">¡Oops! Página no encontrada</p>
        <p className="text-muted-foreground mb-6">La página que buscas no existe o ha sido movida.</p>
        <a href="/" className="text-primary hover:text-primary-glow underline font-medium">
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
