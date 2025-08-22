import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles, User, Lightbulb, TrendingUp, MessageCircle, Lock, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  suggestions?: string[];
}

const AsistenteVocAi = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isMobile } = useMobile();

  const demoConversation = [
    {
      id: "demo-1",
      content: "¡Hola! Soy VocAi, tu asistente vocacional especializada en STEM. ¿En qué te puedo ayudar hoy?",
      sender: "assistant" as const,
      timestamp: new Date(),
      suggestions: [
        "¿Qué carrera STEM es mejor para mí?",
        "Diferencias entre Data Science e IA",
        "Cómo empezar en programación",
        "Oportunidades en biotecnología"
      ]
    },
    {
      id: "demo-2",
      content: "Me interesa la tecnología pero no sé si programación o datos. ¿Cuál me recomiendas?",
      sender: "user" as const,
      timestamp: new Date(),
    },
    {
      id: "demo-3",
      content: "¡Excelente pregunta! Para ayudarte mejor, me gustaría conocerte un poco más:\n\n🔍 **¿Qué te atrae más?**\n• Resolver problemas complejos con lógica\n• Descubrir patrones en información\n• Crear aplicaciones que usen millones de personas\n• Analizar datos para tomar decisiones\n\n💡 **Ambas áreas son increíbles para mujeres en tech y tienen gran demanda laboral.** ¿Te inclinas más hacia el análisis y los insights, o hacia la construcción de productos digitales?",
      sender: "assistant" as const,
      timestamp: new Date(),
      suggestions: [
        "Me gusta más analizar datos",
        "Prefiero crear aplicaciones",
        "¿Cuál tiene mejor salario?",
        "¿Puedo combinar ambas?"
      ]
    }
  ];

  const quickSuggestions = [
    "¿Qué carrera STEM tiene más futuro?",
    "Cómo superar el síndrome del impostor",
    "Mejores empresas tech para mujeres",
    "Ruta para cambiar de carrera a STEM",
    "¿Necesito matemáticas avanzadas?",
    "Diferencia entre ingeniería y ciencias"
  ];

  useEffect(() => {
    if (showDemo) {
      setMessages(demoConversation);
    }
  }, [showDemo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    if (!isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    
    if (!messageToSend) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageToSend,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setShowDemo(false);
    setShowSidebar(false); // Close sidebar on mobile when sending message

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Esa es una excelente pregunta. En mi experiencia ayudando a miles de mujeres en STEM, puedo decirte que...",
        "¡Me encanta tu curiosidad! Basándome en las tendencias actuales del mercado tech...",
        "Perfecto, vamos a explorar esa área juntas. Según mis datos y feedback de profesionales..."
      ];

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: responses[Math.floor(Math.random() * responses.length)] + " (Esta es una demo - la IA completa estará disponible pronto)",
        sender: "assistant",
        timestamp: new Date(),
        suggestions: [
          "Cuéntame más sobre esto",
          "¿Qué otros aspectos debo considerar?",
          "¿Tienes ejemplos específicos?",
          "¿Y las oportunidades laborales?"
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (showDemo) {
      setInputMessage(suggestion);
      setShowSidebar(false); // Close sidebar on mobile
      return;
    }
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            Asistente <span className="bg-gradient-primary bg-clip-text text-transparent">VocAi</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Tu guía inteligente para descubrir y planificar tu carrera ideal en STEM
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Sidebar Toggle */}
          <div className="xl:hidden flex justify-center mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="flex items-center space-x-2"
            >
              {showSidebar ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{showSidebar ? 'Ocultar' : 'Mostrar'} información</span>
            </Button>
          </div>

          {/* Mobile Overlay */}
          {showSidebar && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Info Sidebar */}
          <div className={`xl:col-span-1 space-y-4 sm:space-y-6 order-2 xl:order-1 ${
            showSidebar ? 'block' : 'hidden xl:block'
          } ${showSidebar ? 'fixed top-0 left-0 w-80 h-full bg-background z-50 overflow-y-auto p-4 xl:static xl:w-auto xl:h-auto xl:bg-transparent xl:p-0' : ''}`}>
            {/* Mobile Close Button */}
            {showSidebar && (
              <div className="xl:hidden flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(false)}
                  className="p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
            
            <Card className="bg-gradient-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span>Sobre VocAi</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-2">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>IA especializada en orientación vocacional STEM</span>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>Datos actualizados del mercado laboral</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Recomendaciones personalizadas</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Conversación natural y fluida</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Preguntas Populares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 sm:space-y-2">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-2 text-xs"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="xl:col-span-3 order-1 xl:order-2">
            <Card className="bg-gradient-card border-border h-[500px] sm:h-[550px] lg:h-[600px] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-border p-4 sm:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">VocAi Assistant</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground">En línea</span>
                      {showDemo && (
                        <Badge variant="secondary" className="text-xs">Demo</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 sm:space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <AvatarFallback className={`${
                        message.sender === 'assistant' 
                          ? 'bg-gradient-primary text-white' 
                          : 'bg-muted'
                      }`}>
                        {message.sender === 'assistant' ? (
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-[85%] sm:max-w-[80%] ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 px-2"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-2 sm:p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t border-border p-3 sm:p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={showDemo ? "Escribe un mensaje para probar la demo..." : "Escribe tu pregunta sobre carreras STEM..."}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                    className="text-sm sm:text-base min-h-[44px]"
                  />
                  <Button 
                    variant="neon" 
                    size="icon"
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-10 h-10 sm:w-12 sm:h-12 min-h-[44px]"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsistenteVocAi;