"use client";

import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import RootLayout from "@/components/Layout/Layout";
import styled from "styled-components";

// Importar los nuevos componentes de chat
import SessionsSidebar from "@/components/SessionsSidebar";
import ChatMessages, { Message } from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

// Estilos para el layout de la página de chat
const ChatPageWrapper = styled.div`
  display: flex;
  height: calc(
    100vh - 60px
  ); // Asumiendo que el Navbar/Header tiene 60px, ajustar si es diferente
  // O si RootLayout ya maneja la altura de forma que el contenido llene la pantalla, podría ser simplemente height: 100%;
`;

const ChatArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%; // Ocupa toda la altura de ChatPageWrapper
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto; // ChatMessages ya tiene overflow, pero por si acaso
  display: flex; // Para que ChatMessages (que es flex-grow) se expanda
  flex-direction: column;
`;

export default function AuroraAssistantPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Estado para los mensajes y la sesión actual (hardcodeado por ahora)
  const [messages, setMessages] = useState<Message[]>([]); // Empezar vacío o con mensajes de bienvenida
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(
    "1"
  ); // ID de sesión activa
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      router.push("/forbidden");
    }
  }, [isAuthenticated, router]);

  // Simular carga de mensajes de sesión cuando cambie currentSessionId
  useEffect(() => {
    if (currentSessionId) {
      // Aquí iría la lógica para cargar mensajes de la sesión seleccionada desde el backend
      // Por ahora, podemos reiniciar con un mensaje de bienvenida o dejarlo vacío
      setMessages([
        {
          id: "welcome-" + currentSessionId,
          text: `Bienvenido a la sesión ${currentSessionId}. ¿En qué puedo ayudarte hoy?`,
          sender: "llm",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [currentSessionId]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: "msg-" + Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    // Simular respuesta del LLM después de un breve retraso
    setTimeout(() => {
      const llmResponse: Message = {
        id: "llm-resp-" + Date.now(),
        text: `Respuesta simulada a: "${text}". La integración real con Langchain vendrá después.`,
        sender: "llm",
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, llmResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    // La lógica de carga de mensajes ya está en el useEffect de currentSessionId
    console.log(`Sesión seleccionada: ${sessionId}`);
  };

  const handleCreateNewSession = () => {
    // Aquí crearías una nueva sesión en el backend y luego la seleccionarías
    const newSessionId = "session-" + Date.now(); // ID simulado
    console.log("Creando nueva sesión: ", newSessionId);
    setCurrentSessionId(newSessionId);
    // El useEffect de currentSessionId se encargará de limpiar/preparar los mensajes
  };

  if (typeof isAuthenticated === "undefined" || !isAuthenticated) {
    // Considerar mostrar un spinner/loader más elegante aquí
    return <p>Cargando autenticación...</p>;
  }

  return (
    <RootLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <ChatPageWrapper>
            <SessionsSidebar
              currentSessionId={currentSessionId}
              onSelectSession={handleSelectSession}
              onCreateNewSession={handleCreateNewSession}
            />
            <ChatArea>
              <MessagesContainer>
                <ChatMessages messages={messages} isLoading={isLoading} />
              </MessagesContainer>
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </ChatArea>
          </ChatPageWrapper>
        </main>
      </div>
    </RootLayout>
  );
}
