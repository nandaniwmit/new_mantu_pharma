import React, { useState } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data';
import { Service } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
  darkMode: boolean;
}

export default function ServicesSection({ onSelectServiceForInquiry, darkMode }: ServicesSectionProps) {
  const [activeDetailedService, setActiveDetailedService] = useState<Service | null>(null);

  return (
    <div className="space-y-12" id="services-section-root">
      
      {/* Intro Text */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Comprehensive Healthcare Solutions
        </span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Our Specialized Pharmacy Services</h2>
        <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          At New Mantu Pharma, we provide structured, medically-sound services to address your diagnostic hardware, surgical, pharmaceutical, and dietary needs.
        </p>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-cards-grid">
        {SERVICES.map((serv, index) => {
          return (
            <motion.div
              key={serv.id}
              id={`service-card-${serv.id}`}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:shadow-lg ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div>
                {/* Header Icon */}
                <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-5">
                  <LucideIcon name={serv.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold font-display tracking-tight mb-2 text-primary-navy dark:text-white hover:text-brand-green transition-colors">
                  {serv.title}
                </h3>

                <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {serv.description}
                </p>

                {/* Short list of benefits (Top 2) */}
                <ul className="space-y-1.5 mb-6 text-left">
                  {serv.benefits.slice(0, 2).map((ben, bIdx) => (
                    <li key={bIdx} className="text-[11px] font-medium flex items-center gap-1.5 text-slate-400">
                      <LucideIcon name="Check" className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                      <span className="truncate">{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveDetailedService(serv)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                    darkMode 
                      ? 'border-slate-800 text-slate-300 hover:bg-slate-850' 
                      : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
                  }`}
                >
                  Learn More
                </button>

                <button
                  onClick={() => onSelectServiceForInquiry(serv.title)}
                  className="px-3 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <LucideIcon name="MessageSquare" className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Services Detail Modal (Lightbox / Learn More view) */}
      <AnimatePresence>
        {activeDetailedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="service-details-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center">
                      <LucideIcon name={activeDetailedService.iconName} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display tracking-tight text-primary-navy dark:text-white">{activeDetailedService.title}</h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Department Service</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDetailedService(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  >
                    <LucideIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="my-6 space-y-4">
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeDetailedService.detailedDescription}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Service Assurances</h4>
                    <ul className="space-y-2">
                      {activeDetailedService.benefits.map((ben, bIdx) => (
                        <li key={bIdx} className="text-xs font-semibold flex items-start gap-2">
                          <LucideIcon name="CheckCircle" className="w-4.5 h-4.5 text-brand-green flex-shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400">Need immediate assistance?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveDetailedService(null);
                        onSelectServiceForInquiry(activeDetailedService.title);
                      }}
                      className="px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <LucideIcon name="MessageSquare" className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        darkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-850' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
                      }`}
                    >
                      Call Store
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
