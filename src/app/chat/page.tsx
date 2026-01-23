"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function ChatPage() {
    const { messages, input, handleInputChange, handleSubmit, resetSession, isLoading } = useChat();

    // Auto-scroll logic removed as requested

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12">
            <main className="flex-1">
                <Container className="h-full flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-[85vh] w-full flex flex-col max-w-4xl mx-auto">
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <Bot className="w-7 h-7 text-[#0059FF]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Finance AI Assistant</h1>
                                    <p className="text-sm text-gray-500">Ask me about loans, savings, or financial planning</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetSession}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 px-0"
                                title="Reset Chat Session"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                    <Bot className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="max-w-xs">Start a conversation by typing a message below. I can help you analyze your financial options.</p>
                                </div>
                            )}

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex w-full items-start gap-3 max-w-[80%]",
                                        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                        message.role === "user" ? "bg-[#0059FF] text-white" : "bg-emerald-500 text-white"
                                    )}>
                                        {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>

                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        message.role === "user"
                                            ? "bg-[#0059FF] text-white rounded-tr-none"
                                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                    )}>
                                        {message.role === "user" ? (
                                            message.content
                                        ) : (
                                            <MarkdownRenderer
                                                content={message.content}
                                                className="prose prose-sm max-w-none
                                                    prose-p:leading-relaxed prose-p:text-gray-800
                                                    prose-headings:font-semibold prose-headings:text-gray-900
                                                    prose-a:text-[#0059FF] prose-a:no-underline hover:prose-a:underline
                                                    prose-strong:text-gray-900
                                                    prose-code:text-[#0059FF] prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
                                                    prose-h1:text-gray-900 prose-h2:text-gray-900 prose-h3:text-gray-900
                                                    prose-h4:text-gray-900 prose-h5:text-gray-900 prose-h6:text-gray-900"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex w-full items-start gap-3 mr-auto max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                        <span className="text-sm text-gray-400">AI is thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSubmit} className="flex gap-3 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your question here..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#0059FF]/20 focus:border-[#0059FF] transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="rounded-full w-14 h-14 p-0 shrink-0 bg-[#0059FF] hover:bg-[#0040CC]"
                                    disabled={isLoading || !input.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
