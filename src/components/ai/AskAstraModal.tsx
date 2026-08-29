import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Telescope, 
  Moon, 
  Compass, 
  RefreshCw, 
  HelpCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ShieldCheck,
  Cpu,
  ChevronDown
} from 'lucide-react';
import { 
  askAstronomyAI, 
  fetchAIProviders, 
  fetchPresetQuestions 
} from '../../services/aiService';
import { 
  AIMessage, 
  AIProviderId, 
  AIProviderInfo, 
  PresetQuestionItem 
} from '../../types';

interface AskAstraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskAstraModal: React.FC<AskAstraModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      role: 'assistant',
      text: `Greetings from **ASTRA** at **PSG Institute of Technology and Applied Research**, Coimbatore!\n\nI am your AI Astronomy Guide (Motto: *"LOOK BEYOND. DISCOVER MORE."*). Ask me anything about tonight's sky over Coimbatore, black holes, lunar phases, meteor showers, telescope optics, or astrophotography!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      providerUsed: 'Google Gemini 3.7 Flash',
      modelUsed: 'gemini-3.7-flash',
      isAstronomyRelated: true,
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Multi-provider state
  const [providers, setProviders] = useState<AIProviderInfo[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<AIProviderId>('gemini');
  const [presetQuestions, setPresetQuestions] = useState<PresetQuestionItem[]>([]);
  const [isProviderMenuOpen, setIsProviderMenuOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function init() {
      const providerData = await fetchAIProviders();
      setProviders(providerData.providers);
      setSelectedProvider(providerData.activeDefault);

      const presets = await fetchPresetQuestions();
      setPresetQuestions(presets);
    }
    init();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = (id: string, text: string) => {
    const cleanText = text.replace(/[*#_`$]/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`$]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        role: 'assistant',
        text: `Chat history reset. How can I help you explore the cosmos today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        providerUsed: providers.find(p => p.id === selectedProvider)?.name || 'ASTRA AI',
        modelUsed: selectedProvider,
        isAstronomyRelated: true,
      },
    ]);
  };

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputText;
    if (!promptToSend.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      role: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.sender === 'assistant' ? 'model' : 'user',
        parts: m.text,
      }));

      const activeProviderObj = providers.find((p) => p.id === selectedProvider);

      const response = await askAstronomyAI(
        promptToSend,
        historyPayload,
        selectedProvider,
        activeProviderObj?.model
      );

      const botMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        role: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        providerUsed: activeProviderObj?.name || 'ASTRA Engine',
        modelUsed: response.model,
        isAstronomyRelated: response.isAstronomyTopic,
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        role: 'assistant',
        text: "I encountered an issue connecting to the astronomical model. Please try asking again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAstronomyRelated: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const activeProvider = providers.find((p) => p.id === selectedProvider) || {
    id: 'gemini',
    name: 'Google Gemini 3.7 Flash',
    model: 'gemini-3.7-flash',
    badge: 'Recommended',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="stargaze-card rounded-3xl max-w-3xl w-full border border-indigo-500/40 overflow-hidden shadow-2xl flex flex-col h-[88vh] max-h-[720px] relative bg-[#060a1f]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0b1028] via-[#0e1638] to-[#0b1028] border-b border-indigo-900/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Ask ASTRA AI
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Astronomy Only
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Official Astronomy Guide • PSG iTech Observatory (11.0772° N, 77.0867° E)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Provider Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProviderMenuOpen(!isProviderMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700 transition-colors"
                title="Select AI Provider"
              >
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[100px] sm:max-w-[140px] font-medium text-white">
                  {activeProvider.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isProviderMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#090e28] border border-indigo-500/40 p-2 shadow-2xl z-40 animate-fade-in space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-mono text-slate-400 border-b border-slate-800">
                    SELECT AI PROVIDER
                  </div>
                  {providers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProvider(p.id);
                        setIsProviderMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-colors ${
                        selectedProvider === p.id
                          ? 'bg-blue-600/30 text-white border border-blue-500/40 font-semibold'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{p.name}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-indigo-950 text-indigo-300">
                          {p.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleClear}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close Ask ASTRA Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#050817]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-1">
                  <Telescope className="w-4 h-4 text-cyan-300" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                    : 'bg-[#0a0f24] text-slate-200 border border-blue-900/40 rounded-bl-none'
                }`}
              >
                {msg.sender === 'assistant' && msg.providerUsed && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1 text-[10px] font-mono text-cyan-400/90 border-b border-slate-800">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      {msg.providerUsed}
                    </span>
                    <span className="text-slate-500">{msg.timestamp}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {msg.sender === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5 text-slate-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
                          speakingId === msg.id
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                        }`}
                        title="Listen via Text-to-Speech"
                      >
                        {speakingId === msg.id ? (
                          <>
                            <VolumeX className="w-2.5 h-2.5 animate-pulse" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-2.5 h-2.5 text-slate-400" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>

                    <span className="text-slate-500">ASTRA Knowledge Base</span>
                  </div>
                )}

                {msg.sender === 'user' && (
                  <span className="block text-[10px] font-mono text-blue-200 mt-2 text-right">
                    {msg.timestamp}
                  </span>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin-slow text-cyan-300" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0a0f24] border border-blue-900/40 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="animate-pulse">
                  Querying {activeProvider.name} with PSG iTech astronomical ephemeris...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts (Including the 4 exact requested questions) */}
        <div className="px-4 py-2 bg-[#080d22] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-cyan-400" />
            Quick Prompts:
          </span>
          {[
            "What can I see tonight?",
            "What is a black hole?",
            "Why does the Moon have phases?",
            "When is the next meteor shower?",
            "Best telescope for beginners?",
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-indigo-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-mono whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#090e24] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about tonight's sky, black holes, lunar phases, meteor showers, or optics..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-heading font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
