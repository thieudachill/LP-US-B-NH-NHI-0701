"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

const SAMPLE_TOPICS = [
    "Tư vấn vay cá nhân",
    "Nợ & thẻ tín dụng",
    "Chi tiêu & quản lý dòng tiền",
    "Tiết kiệm & quỹ dự phòng",
    "Đầu tư",
    "Thu nhập & sự nghiệp"
];

export default function ChatPage() {
    const { messages, input, handleInputChange, handleSubmit, resetSession, isLoading } = useChat();

    // Auto-scroll logic removed as requested

    return (
        <div className="h-[100dvh] sm:min-h-screen bg-gray-50 flex flex-col sm:py-12 py-0">
            <main className="flex-1 overflow-hidden">
                <Container className="h-full flex items-center justify-center p-0 sm:p-4">
                    <div className="bg-white rounded-none sm:rounded-2xl shadow-xl overflow-hidden border-0 sm:border border-gray-100 sm:h-[85vh] h-full w-full flex flex-col max-w-4xl mx-auto">
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-100 p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10 shrink-0">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-[#0059FF]" />
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">Finance AI Agent</h1>
                                    <p className="text-[10px] sm:text-sm text-gray-500">Professional Financial Consultation</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetSession}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-9 h-9 sm:w-10 sm:h-10 px-0 rounded-full"
                                title="Reset Chat Session"
                            >
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 scroll-smooth">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center min-h-[60vh] sm:h-full text-center">
                                    <div className="mb-8">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                                            <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-[#0059FF]" />
                                        </div>
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 px-6">How can I help you today?</h2>
                                        <p className="text-sm sm:text-gray-500 max-w-xs mx-auto px-6 text-gray-500">Select a topic below or type your message to start consulting with our AI.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full max-w-2xl px-4 pb-4">
                                        {SAMPLE_TOPICS.map((topic) => (
                                            <button
                                                key={topic}
                                                onClick={() => handleSubmit(topic)}
                                                disabled={isLoading}
                                                className="flex items-center justify-between p-3.5 sm:p-4 bg-white border border-gray-200 rounded-xl text-left text-xs sm:text-sm font-medium text-gray-700 hover:border-[#0059FF] hover:bg-blue-50/50 hover:text-[#0059FF] transition-all group shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                            >
                                                {topic}
                                                <Send className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex w-full items-start gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]",
                                        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn(
                                        "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                        message.role === "user" ? "bg-[#0059FF] text-white" : "bg-emerald-500 text-white"
                                    )}>
                                        {message.role === "user" ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </div>

                                    <div className={cn(
                                        "p-3 sm:p-4 rounded-xl sm:rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm",
                                        message.role === "user"
                                            ? "bg-[#0059FF] text-white rounded-tr-none"
                                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none w-full"
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
                        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0">
                            <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your question here..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0059FF]/20 focus:border-[#0059FF] transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 shrink-0 bg-[#0059FF] hover:bg-[#0040CC] active:scale-90 transition-transform"
                                    disabled={isLoading || !input.trim()}
                                >
                                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
