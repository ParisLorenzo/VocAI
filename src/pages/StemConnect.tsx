import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Search, 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar,
  Pin,
  MoreHorizontal,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const StemConnect = () => {
  const [activeTab, setActiveTab] = useState("recientes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const categories = [
    { id: "all", name: "Todas", count: 1247, color: "bg-primary" },
    { id: "data-science", name: "Ciencia de Datos", count: 324, color: "bg-blue-500" },
    { id: "software", name: "Ingeniería de Software", count: 567, color: "bg-green-500" },
    { id: "biotech", name: "Biotecnología", count: 189, color: "bg-pink-500" },
    { id: "robotics", name: "Robótica", count: 167, color: "bg-purple-500" },
  ];

  const posts = [
    {
      id: 1,
      title: "¿Cómo prepararse para una entrevista en Google como Data Scientist?",
      author: {
        name: "María García",
        avatar: null,
        role: "Senior Data Scientist @Meta",
        verified: true
      },
      category: "data-science",
      content: "Después de 3 años trabajando en Meta, quiero compartir mi experiencia sobre cómo prepararse efectivamente para entrevistas técnicas en big tech...",
      timestamp: "hace 2 horas",
      replies: 23,
      likes: 156,
      isPinned: true,
      tags: ["entrevistas", "big-tech", "consejos"]
    },
    {
      id: 2,
      title: "Mi primer proyecto de Machine Learning: predicción de ventas",
      author: {
        name: "Ana Rodríguez",
        avatar: null,
        role: "Estudiante de Ingeniería",
        verified: false
      },
      category: "data-science",
      content: "¡Hola chicas! Acabo de terminar mi primer proyecto de ML y quería compartir mi experiencia. Usé Python, scikit-learn y pandas para...",
      timestamp: "hace 4 horas",
      replies: 12,
      likes: 89,
      isPinned: false,
      tags: ["proyecto", "machine-learning", "principiante"]
    },
    {
      id: 3,
      title: "Bootcamp vs Universidad: mi experiencia en desarrollo web",
      author: {
        name: "Carmen López",
        avatar: null,
        role: "Full Stack Developer @Startup",
        verified: true
      },
      category: "software",
      content: "Después de estudiar informática en la universidad y luego hacer un bootcamp intensivo, puedo comparar ambas experiencias...",
      timestamp: "hace 1 día",
      replies: 45,
      likes: 234,
      isPinned: false,
      tags: ["educación", "bootcamp", "universidad"]
    }
  ];

  const handlePostLike = (postId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión requerido",
        description: "Debes iniciar sesión para dar like a las publicaciones",
        variant: "destructive"
      });
    }
  };

  const handleNewPost = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión requerido",
        description: "Debes iniciar sesión para crear publicaciones",
        variant: "destructive"
      });
    } else {
      setShowNewPost(true);
    }
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const cat = categories.find(c => c.id === category);
    return (
      <Badge className={`${cat?.color || 'bg-gray-500'} text-white`}>
        {cat?.name || category}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">STEM Connect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conecta con mujeres en STEM, comparte experiencias y aprende de la comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Categorías</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className="w-full justify-between hover:bg-muted/50"
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Estadísticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3,247</div>
                  <div className="text-sm text-muted-foreground">Miembros activas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">89</div>
                  <div className="text-sm text-muted-foreground">Publicaciones hoy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">156</div>
                  <div className="text-sm text-muted-foreground">Mentoras disponibles</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and New Post */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar publicaciones, temas, usuarias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="neon" onClick={handleNewPost}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Publicación
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recientes">Recientes</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="sin-respuesta">Sin Respuesta</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6 mt-6">
                {posts.map((post) => (
                  <Card key={post.id} className="bg-gradient-card border-border hover:border-primary/30 transition-all">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.author.avatar || ""} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {post.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{post.author.name}</h3>
                              {post.author.verified && (
                                <Badge variant="secondary" className="text-xs">Verificada</Badge>
                              )}
                              {post.isPinned && (
                                <Pin className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{post.author.role}</p>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CategoryBadge category={post.category} />
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-foreground leading-relaxed">
                          {post.content}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => handlePostLike(post.id)}
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.replies}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Compartir
                          </Button>
                        </div>
                        
                        {!isAuthenticated && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Lock className="w-3 h-3" />
                            <span>Inicia sesión para comentar</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Cargar más publicaciones
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemConnect;