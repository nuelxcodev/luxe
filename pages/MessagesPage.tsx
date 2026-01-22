
import React, { useState, useRef, useEffect } from 'react';
import { Icons, MOCK_CONTACTS, MOCK_PRODUCTS } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { Product, Contact, Message } from '../types';
import Button from '../components/ui/Button';

interface MessagesPageProps {
  product?: Product | null;
}

type Persona = 'concierge' | 'seller' | 'friend';

const MessagesPage: React.FC<MessagesPageProps> = ({ product }) => {
  const [selectedContact, setSelectedContact] = useState<Contact>(
    product 
      ? MOCK_CONTACTS.find(c => c.type === 'seller') || MOCK_CONTACTS[0]
      : MOCK_CONTACTS[0]
  );
  const [persona, setPersona] = useState<Persona>('concierge');
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({
    'c1': [{ id: 'm1', role: 'model', text: "Hello! I'm your LUXE concierge. How can I assist you today?", timestamp: new Date() }],
    'c2': [{ id: 'm2', role: 'model', text: "OMG look at these headphones!", timestamp: new Date() }],
    'c3': [{ id: 'm3', role: 'model', text: "Welcome to AudioElite. Ready to upgrade?", timestamp: new Date() }]
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, selectedContact]);

  useEffect(() => {
    if (product) {
      const seller = MOCK_CONTACTS.find(c => c.type === 'seller');
      if (seller) {
        setSelectedContact(seller);
        setShowMobileList(false);
      }
    }
  }, [product]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    const currentContact = selectedContact;
    setInput('');

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText, timestamp: new Date() };
    setChatHistory(prev => ({
      ...prev,
      [currentContact.id]: [...(prev[currentContact.id] || []), newUserMsg]
    }));

    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction: `You are chatting as "${currentContact.name}" using the "${persona}" persona on LUXE. 
          If friend: be casual and enthusiastic. If seller: professional and product-focused. If concierge: elite and helpful. 
          Current user: Alex.`,
        }
      });

      const aiText = response.text || "I'm here to help!";
      
      // Randomly inject an earning suggestion for social proof features
      const suggestion = Math.random() > 0.7 ? {
        text: "By the way, did you know you can earn $15 by sharing the Stealth Pro with your friends?",
        actionLabel: "Share & Earn",
        productId: "1"
      } : undefined;

      const newAiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: aiText, timestamp: new Date(), suggestion };
      
      setChatHistory(prev => ({
        ...prev,
        [currentContact.id]: [...(prev[currentContact.id] || []), newAiMsg]
      }));
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="px-4 md:px-0 h-[calc(100vh-140px)] min-h-[500px] flex gap-4 overflow-hidden rounded-[40px] animate-fade-in pb-4">
      {/* Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-96 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft overflow-hidden`}>
         <div className="p-6 border-b border-slate-50 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-800/20">
           <h2 className="font-bold text-2xl text-slate-900 dark:text-white">Social Hub</h2>
           <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Friends', 'Sellers'].map(tag => (
                <button key={tag} className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-all whitespace-nowrap">
                  {tag}
                </button>
              ))}
           </div>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {MOCK_CONTACTS.map(c => (
              <button 
                key={c.id} 
                onClick={() => {setSelectedContact(c); setShowMobileList(false);}}
                className={`w-full flex gap-4 p-4 rounded-[24px] transition-all duration-300 relative ${
                  selectedContact.id === c.id ? 'bg-primary/5 ring-1 ring-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white dark:ring-slate-800">
                    <img src={c.avatar} className="w-full h-full object-cover" alt="" />
                  </div>
                  {c.status === 'online' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-success rounded-full border-2 border-white dark:border-slate-900"></div>}
                </div>
                <div className="flex-1 text-left py-1">
                   <h4 className={`font-bold text-sm truncate ${selectedContact.id === c.id ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{c.name}</h4>
                   <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                </div>
              </button>
            ))}
         </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showMobileList ? 'flex' : 'hidden'} lg:flex flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex-col relative overflow-hidden shadow-soft`}>
         <div className="p-4 border-b dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowMobileList(true)} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full rotate-180"><Icons.ChevronRight /></button>
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-inner ring-1 ring-slate-100 dark:ring-slate-800">
                <img src={selectedContact.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedContact.name}</h3>
                {/* Persona Switcher UI */}
                <div className="flex gap-2">
                   {['concierge', 'seller', 'friend'].map(p => (
                     <button 
                        key={p} 
                        onClick={() => setPersona(p as Persona)}
                        className={`text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded transition-all ${persona === p ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                      >
                        {p}
                      </button>
                   ))}
                </div>
              </div>
            </div>
         </div>

         <div ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/20 dark:bg-slate-800/10 custom-scrollbar">
            {chatHistory[selectedContact.id]?.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'model' ? 'justify-start' : 'justify-end'}`}>
                <div className="max-w-[85%] sm:max-w-[70%] space-y-2">
                   <div className={`p-4 rounded-[24px] shadow-sm ${msg.role === 'model' ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200' : 'bg-primary text-white'}`}>
                    <p className="text-sm">{msg.text}</p>
                   </div>
                   {/* AI Earning Suggestion (New Feature) */}
                   {msg.suggestion && (
                     <div className="bg-accent-success/10 border border-accent-success/20 p-3 rounded-2xl flex items-center justify-between gap-4 animate-slide-up">
                        <p className="text-[10px] font-bold text-accent-success">{msg.suggestion.text}</p>
                        <button className="shrink-0 px-3 py-1 bg-accent-success text-white text-[8px] font-bold rounded-lg uppercase tracking-widest">{msg.suggestion.actionLabel}</button>
                     </div>
                   )}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400 animate-pulse">Assistant is typing...</div>}
         </div>

         <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
           <div className="flex items-end gap-3 max-w-4xl mx-auto">
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder={`Message as ${persona}...`}
               className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
               rows={1}
             />
             <button onClick={handleSend} disabled={isTyping} className="p-4 bg-secondary text-white rounded-2xl hover:bg-primary transition-all shadow-lg">
                <Icons.ChevronRight />
             </button>
           </div>
         </div>
      </div>
    </div>
  );
};

export default MessagesPage;
