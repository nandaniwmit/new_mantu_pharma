import React, { useState } from 'react';
import { FAQS } from '../data';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface FaqSectionProps {
  darkMode: boolean;
}

export default function FaqSection({ darkMode }: FaqSectionProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Store' | 'Medicines' | 'Orders' | 'Services'>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1'); // Open first by default

  const filteredFaqs = FAQS.filter(
    (faq) => activeTab === 'All' || faq.category === activeTab
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-10" id="faq-section-root">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Information Hub
        </span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Frequently Asked Questions</h2>
        <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Got questions? We have compiled responses to the 10 most common questions regarding medicine sourcing, payments, and delivery.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5" id="faq-category-tabs">
        {(['All', 'Store', 'Medicines', 'Orders', 'Services'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenFaqId(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-green text-white shadow-sm'
                  : darkMode
                    ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab === 'All' ? 'All FAQs' : tab}
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3 text-left" id="faq-accordion-list">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              id={`faq-item-${faq.id}`}
              className={`rounded-2xl border transition-all ${
                isOpen 
                  ? 'border-primary-navy dark:border-brand-green shadow-sm' 
                  : darkMode ? 'border-slate-800' : 'border-slate-100'
              } ${
                darkMode ? 'bg-slate-900' : 'bg-white'
              }`}
            >
              {/* Accordion Header Button */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                    isOpen 
                      ? 'bg-brand-green/10 text-brand-green' 
                      : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {faq.category}
                  </span>
                  <h4 className="font-bold text-sm md:text-base tracking-tight pr-4 text-primary-navy dark:text-white">
                    {faq.question}
                  </h4>
                </div>

                <div className={`p-1 rounded-full transition-transform ${
                  isOpen ? 'rotate-180 text-brand-green bg-brand-green/10' : 'text-slate-400'
                }`}>
                  <LucideIcon name="ChevronDown" className="w-5 h-5" />
                </div>
              </button>

              {/* Accordion Content with smooth height transition */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-5 pb-5 pt-1 text-xs md:text-sm leading-relaxed border-t ${
                      darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
                    }`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
