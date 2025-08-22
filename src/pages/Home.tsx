import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Brain, ArrowRight, Star, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Ruta STEM Personalizada",
      description: "Rutas de aprendizaje adaptadas a tus intereses y objetivos profesionales",
      href: "/ruta-stem",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "STEM Connect",
      description: "Comunidad de mujeres en STEM para compartir experiencias y conocimientos",
      href: "/stem-connect",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Asistente VocAi",
      description: "IA conversacional que te guía en la elección de tu carrera ideal",
      href: "/asistente",
      color: "text-accent"
    }
  ];

  const stats = [
    { icon: Target, value: "95%", label: "Precisión en orientación" },
    { icon: Star, value: "500+", label: "Estudiantes guiadas" },
    { icon: Zap, value: "24/7", label: "Asistencia disponible" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-orbitron text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                VocAi
              </span>
              <br />
              <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
                Tu futuro en STEM
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto fade-in">
              Descubre tu vocación en ciencia, tecnología, ingeniería y matemáticas con inteligencia artificial
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
              <Button variant="hero" size="lg" asChild>
                <Link to="/register">
                  Comenzar mi Ruta STEM
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/asistente">Probar Asistente VocAi</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center hover-scale">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 glow-pink">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-orbitron text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold mb-4">
              Explora Nuestras <span className="bg-gradient-primary bg-clip-text text-transparent">Herramientas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada módulo está diseñado para acompañarte en tu journey hacia una carrera exitosa en STEM
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border hover-scale hover-glow group cursor-pointer">
                <Link to={feature.href} className="block h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-primary glow-pink group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="flex justify-center mt-6">
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Lista para transformar tu futuro?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a cientos de mujeres que ya están construyendo su carrera en STEM con VocAi
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/register">
              Crear cuenta gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;