import { useState, useEffect, useCallback } from 'react';

// Generate a random session ID if one doesn't exist
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');

    // Initialize session and load messages from local storage
    useEffect(() => {
        let storedSessionId = localStorage.getItem('n8n_chat_session_id');
        if (!storedSessionId) {
            storedSessionId = generateId();
            localStorage.setItem('n8n_chat_session_id', storedSessionId);
        }
        setSessionId(storedSessionId);

        const storedMessages = localStorage.getItem('n8n_chat_messages');
        if (storedMessages) {
            try {
                setMessages(JSON.parse(storedMessages));
            } catch (e) {
                console.error("Failed to parse stored messages", e);
            }
        }
    }, []);

    // Save messages to local storage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('n8n_chat_messages', JSON.stringify(messages));
        }
    }, [messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const sendMessage = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: generateId(),
            role: 'user',
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send to n8n Webhook
            const response = await fetch('https://publicservicehelp.com/webhook/7c7f3aca-be2a-4722-8102-8a2017fae845/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: userMessage.content,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            // Assuming n8n returns { output: "text response" } or just the text, or { response: ... }
            // Adjust this based on actual n8n output structure. 
            // Common pattern for n8n webhook response node is returning a JSON object.
            // If the webhook returns a plain string, we'll handle that too.

            let aiContent = "I received your message but couldn't process the response.";

            if (typeof data === 'string') {
                aiContent = data;
            } else if (typeof data === 'object') {
                // Try common keys
                aiContent = data.output || data.text || data.response || data.message || JSON.stringify(data);
            }

            const aiMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: aiContent,
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: generateId(),
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting to the server right now.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, sessionId, isLoading]);

    const resetSession = useCallback(() => {
        setMessages([]);
        const newSessionId = generateId();
        setSessionId(newSessionId);
        localStorage.setItem('n8n_chat_session_id', newSessionId);
        localStorage.removeItem('n8n_chat_messages');
    }, []);

    return {
        messages,
        input,
        handleInputChange,
        handleSubmit: sendMessage,
        resetSession,
        isLoading,
        sessionId // Exposed for debugging/display if needed
    };
}
