import React, { useState, useEffect, useRef } from 'react';
import { 
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
  Settings2, 
  Cpu, 
  Star,
  ChevronDown,
  Info,
  Radio
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

export const AskAstraSection: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      role: 'assistant',
      text: `Greetings from **ASTRA** at **PSG Institute of Technology and Applied Research (PSG iTech)**, Coimbatore!\n\nI am your dedicated **AI Astronomy & Observational Guide** (Motto: *"LOOK BEYOND. DISCOVER MORE."*). I am calibrated exclusively for astronomy, astrophysics, telescope optics, astrophotography, space missions, and tonight's sky from Coimbatore.\n\nHow can I guide your cosmic exploration today?`,
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

  // Load providers and preset questions on mount
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

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = (id: string, text: string) => {
    // Strip markdown formatting for clean clipboard
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

  const handleClearHistory = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        role: 'assistant',
        text: `Chat history cleared. I am ready to answer any questions about the night sky, astrophysics, telescope optics, or space science!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        providerUsed: providers.find(p => p.id === selectedProvider)?.name || 'ASTRA AI',
        modelUsed: selectedProvider,
        isAstronomyRelated: true,
      },
    ]);
  };

  const handleSendMessage = async (customPrompt?: string) => {
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
      const historyPayload = messages.slice(-6).map((m) => ({
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
        text: "I encountered a transient issue processing your astronomical inquiry. Please try submitting your question again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAstronomyRelated: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const activeProvider = providers.find((p) => p.id === selectedProvider) || providers[0] || {
    id: 'gemini',
    name: 'Google Gemini 3.7 Flash',
    model: 'gemini-3.7-flash',
    badge: 'Recommended',
  };

  return (
    <section id="ask-astra" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#020512] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-900/15 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>AI ASTRONOMY INTELLIGENCE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            ASK ASTRA AI ASSISTANT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Your dedicated astrophysics and observational guide. Ask about tonight's Coimbatore night sky, black holes, lunar phases, meteor showers, or telescope optics.
          </p>
        </div>

        {/* Preset Prompt Cards Bar (Featuring the 4 exact requested questions) */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Common Astronomy Inquiries:
            </span>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/50">
              Click any question to ask instantly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {presetQuestions.slice(0, 4).map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSendMessage(preset.question)}
                disabled={isLoading}
                className="text-left p-3.5 rounded-2xl bg-slate-900/70 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 transition-all duration-200 group flex flex-col justify-between shadow-sm hover:shadow-indigo-500/10"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-cyan-300 border border-blue-800">
                    {preset.category}
                  </span>
                  <Sparkles className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </div>
                <div className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-cyan-200 transition-colors mb-1.5">
                  "{preset.question}"
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {preset.hint}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Assistant Window */}
        <div className="stargaze-card rounded-3xl border border-indigo-500/30 overflow-hidden shadow-2xl bg-[#060a1f] flex flex-col h-[680px]">
          {/* Assistant Header & Provider Configuration Bar */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0a0f2b] via-[#0d163d] to-[#0a0f2b] border-b border-indigo-900/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Telescope className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    ASTRA Observational AI
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Astronomy Only
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Observatory Coordinates: 11.0772° N, 77.0867° E • Coimbatore
                </p>
              </div>
            </div>

            {/* Provider Configuration Picker */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setIsProviderMenuOpen(!isProviderMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors shadow-inner"
                  title="Select AI Provider"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-white truncate max-w-[130px] sm:max-w-[180px]">
                    {activeProvider.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isProviderMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#090e28] border border-indigo-500/40 p-2 shadow-2xl z-30 animate-fade-in space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
                      <span>CONFIGURABLE AI PROVIDERS</span>
                      <Settings2 className="w-3 h-3 text-slate-500" />
                    </div>

                    {providers.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProvider(p.id);
                          setIsProviderMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                          selectedProvider === p.id
                            ? 'bg-blue-600/30 text-white border border-blue-500/40'
                            : 'hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <Radio className={`w-3.5 h-3.5 mt-0.5 ${selectedProvider === p.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <div>
                          <div className="flex items-center gap-1.5 font-semibold text-white">
                            <span>{p.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                              {p.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {p.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear History Button */}
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#030616]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-1">
                    <Telescope className="w-4 h-4 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                      : 'bg-[#0a0f28] text-slate-200 border border-blue-900/40 rounded-bl-none shadow-sm'
                  }`}
                >
                  {/* Provider tag for assistant */}
                  {msg.sender === 'assistant' && msg.providerUsed && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
                      <span className="text-cyan-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {msg.providerUsed}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Body text with markdown-style line breaks */}
                  <div className="whitespace-pre-wrap font-sans text-slate-100">
                    {msg.text}
                  </div>

                  {/* Action Bar for Assistant Messages (Copy, Text-to-Speech) */}
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                          title="Copy text to clipboard"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300 text-[10px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
                            speakingId === msg.id
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                          }`}
                          title="Read aloud using Speech Synthesis"
                        >
                          {speakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-white animate-pulse" />
                              <span className="text-[10px]">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-slate-400" />
                              <span className="text-[10px]">Listen</span>
                            </>
                          )}
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">
                        PSG iTech Sky Ephemeris
                      </span>
                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <span className="block text-[10px] font-mono text-blue-200 mt-2 text-right">
                      {msg.timestamp}
                    </span>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin-slow text-cyan-300" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0a0f28] border border-indigo-900/50 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
                  </span>
                  <span className="animate-pulse">
                    Querying {activeProvider.name} with PSG iTech astronomical ephemeris...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Follow-up Chips */}
          <div className="px-4 py-2 bg-[#080d22] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
              <Star className="w-3 h-3 text-cyan-400" />
              Quick Inquiries:
            </span>
            {[
              "What can I see tonight?",
              "What is a black hole?",
              "Why does the Moon have phases?",
              "When is the next meteor shower?",
              "Best telescope for beginners?",
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-indigo-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-mono whitespace-nowrap transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Submission Bar */}
          <div className="p-4 bg-[#090e26] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about tonight's sky, black holes, lunar phases, telescopes, or astrophysics..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-sans"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-heading font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send Question</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
