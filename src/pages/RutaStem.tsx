import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Trophy, Users, ArrowRight, Play, CheckCircle } from "lucide-react";

const RutaStem = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const stemRoutes = [
    {
      id: "data-science",
      title: "Ciencia de Datos",
      description: "Aprende a extraer insights de datos usando Python, machine learning y estadística",
      duration: "12 semanas",
      difficulty: "Intermedio",
      rating: 4.8,
      students: 1250,
      progress: 0,
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      modules: [
        { name: "Fundamentos de Python", duration: "2 semanas", completed: false },
        { name: "Estadística y Probabilidad", duration: "2 semanas", completed: false },
        { name: "Pandas y NumPy", duration: "2 semanas", completed: false },
        { name: "Visualización de Datos", duration: "2 semanas", completed: false },
        { name: "Machine Learning", duration: "3 semanas", completed: false },
        { name: "Proyecto Final", duration: "1 semana", completed: false }
      ]
    },
    {
      id: "software-engineering",
      title: "Ingeniería de Software",
      description: "Desarrolla aplicaciones web modernas con React, Node.js y mejores prácticas",
      duration: "16 semanas",
      difficulty: "Principiante",
      rating: 4.9,
      students: 2100,
      progress: 25,
      color: "bg-gradient-to-r from-green-500 to-teal-600",
      modules: [
        { name: "HTML, CSS y JavaScript", duration: "3 semanas", completed: true },
        { name: "React Fundamentals", duration: "3 semanas", completed: false },
        { name: "Backend con Node.js", duration: "3 semanas", completed: false },
        { name: "Bases de Datos", duration: "2 semanas", completed: false },
        { name: "Testing y Deployment", duration: "3 semanas", completed: false },
        { name: "Proyecto Capstone", duration: "2 semanas", completed: false }
      ]
    },
    {
      id: "biotechnology",
      title: "Biotecnología",
      description: "Explora la intersección entre biología y tecnología para innovar en salud",
      duration: "14 semanas",
      difficulty: "Avanzado",
      rating: 4.7,
      students: 850,
      progress: 0,
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      modules: [
        { name: "Biología Molecular", duration: "3 semanas", completed: false },
        { name: "Genética y Genomics", duration: "3 semanas", completed: false },
        { name: "Bioinformática", duration: "2 semanas", completed: false },
        { name: "Ingeniería Genética", duration: "3 semanas", completed: false },
        { name: "Aplicaciones Médicas", duration: "2 semanas", completed: false },
        { name: "Investigación Aplicada", duration: "1 semana", completed: false }
      ]
    },
    {
      id: "robotics",
      title: "Robótica e IA",
      description: "Construye robots inteligentes y sistemas autónomos del futuro",
      duration: "18 semanas",
      difficulty: "Avanzado",
      rating: 4.6,
      students: 950,
      progress: 0,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      modules: [
        { name: "Fundamentos de Robótica", duration: "3 semanas", completed: false },
        { name: "Programación de Robots", duration: "4 semanas", completed: false },
        { name: "Sensores y Actuadores", duration: "3 semanas", completed: false },
        { name: "Inteligencia Artificial", duration: "4 semanas", completed: false },
        { name: "Visión por Computadora", duration: "2 semanas", completed: false },
        { name: "Proyecto Robótico", duration: "2 semanas", completed: false }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "bg-green-500/20 text-green-400";
      case "Intermedio": return "bg-yellow-500/20 text-yellow-400";
      case "Avanzado": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl font-bold mb-4">
            Tu <span className="bg-gradient-primary bg-clip-text text-transparent">Ruta STEM</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige tu camino hacia una carrera exitosa en STEM. Cada ruta incluye proyectos reales, 
            mentoría personalizada y certificaciones reconocidas por la industria.
          </p>
        </div>

        {!selectedRoute ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stemRoutes.map((route) => (
              <Card key={route.id} className="bg-gradient-card border-border hover-scale hover-glow group cursor-pointer overflow-hidden">
                <div className={`h-2 ${route.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {route.title}
                    </CardTitle>
                    <Badge className={getDifficultyColor(route.difficulty)}>
                      {route.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {route.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{route.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{route.rating}</span>
                    </div>
                  </div>

                  {route.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="text-primary font-medium">{route.progress}%</span>
                      </div>
                      <Progress value={route.progress} className="h-2" />
                    </div>
                  )}

                  <Button 
                    variant="neon" 
                    className="w-full group"
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    {route.progress > 0 ? "Continuar Ruta" : "Comenzar Ruta"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRoute(null)}
              className="mb-6"
            >
              ← Volver a Rutas
            </Button>

            {(() => {
              const route = stemRoutes.find(r => r.id === selectedRoute)!;
              return (
                <div className="space-y-6">
                  <Card className="bg-gradient-card border-border">
                    <div className={`h-3 ${route.color}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl font-bold mb-2">{route.title}</CardTitle>
                          <CardDescription className="text-lg">{route.description}</CardDescription>
                        </div>
                        <Badge className={getDifficultyColor(route.difficulty)} variant="outline">
                          {route.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground pt-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{route.students.toLocaleString()} estudiantes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{route.rating} (324 reseñas)</span>
                        </div>
                      </div>

                      {route.progress > 0 && (
                        <div className="pt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Tu progreso general</span>
                            <span className="text-primary font-medium">{route.progress}%</span>
                          </div>
                          <Progress value={route.progress} className="h-3" />
                        </div>
                      )}
                    </CardHeader>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Módulos del Curso</h3>
                    {route.modules.map((module, index) => (
                      <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                module.completed 
                                  ? "bg-green-500/20" 
                                  : route.progress > 0 && index === 0 
                                    ? "bg-primary/20" 
                                    : "bg-muted"
                              }`}>
                                {module.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : route.progress > 0 && index === 0 ? (
                                  <Play className="w-5 h-5 text-primary" />
                                ) : (
                                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{module.name}</h4>
                                <p className="text-sm text-muted-foreground">{module.duration}</p>
                              </div>
                            </div>
                            <Button 
                              variant={module.completed ? "outline" : route.progress > 0 && index === 0 ? "neon" : "ghost"} 
                              size="sm"
                              disabled={!module.completed && !(route.progress > 0 && index === 0)}
                            >
                              {module.completed ? "Completado" : route.progress > 0 && index === 0 ? "Continuar" : "Bloqueado"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary">Certificación Profesional</h4>
                          <p className="text-sm text-muted-foreground">
                            Obtén un certificado reconocido por la industria al completar esta ruta
                          </p>
                        </div>
                        <Button variant="neon">
                          Ver Certificado
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RutaStem;