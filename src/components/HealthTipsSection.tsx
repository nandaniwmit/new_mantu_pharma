import React, { useState } from 'react';
import { HEALTH_TIPS, OFFERS_AND_DISCOUNTS } from '../data';
import { BlogTip } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface HealthTipsSectionProps {
  darkMode: boolean;
}

export default function HealthTipsSection({ darkMode }: HealthTipsSectionProps) {
  const [activeTip, setActiveTip] = useState<BlogTip | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    
    setNewsletterSuccess(true);
    setNewsletterError('');
    setNewsletterEmail('');
    
    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-16" id="health-tips-root">
      
      {/* 1. Offers & Discounts Panel */}
      <div id="offers-discounts-panel">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-black text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Patient Support & Concessions
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Active Offers & Care Discounts</h3>
          <p className={`text-xs mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            We provide consistent concessions for chronic care cycles and baby formulations to lessen medicinal budget weights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS_AND_DISCOUNTS.map((offer) => (
            <div
              key={offer.id}
              id={`offer-card-${offer.id}`}
              className={`p-6 rounded-2xl border text-left relative overflow-hidden transition-all hover:border-brand-green/30 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                {offer.badge}
              </div>
              
              <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-4">
                <LucideIcon name="Award" className="w-5 h-5" />
              </div>

              <h4 className="font-extrabold text-sm md:text-base tracking-tight text-primary-navy dark:text-white mb-2">
                {offer.title}
              </h4>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Health Awareness Articles */}
      <div id="health-awareness-articles">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-black text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Weekly Wellness Blog
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Latest Health & Medicine Safety Tips</h3>
          <p className={`text-xs mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Written and verified by pharmacist Mantu Kumar and regional doctors to guide your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_TIPS.map((tip) => (
            <div
              key={tip.id}
              id={`tip-card-${tip.id}`}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-md ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] text-slate-400 font-bold">
                  <span>{tip.category}</span>
                  <span>{tip.readTime}</span>
                </div>

                <h4 className="font-extrabold text-sm md:text-base tracking-tight text-primary-navy dark:text-white mb-2 hover:text-brand-green transition-colors">
                  {tip.title}
                </h4>

                <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tip.snippet}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-medium">By {tip.author}</span>
                <button
                  onClick={() => setActiveTip(tip)}
                  className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Read Article <LucideIcon name="ArrowRight" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Newsletter Subscription Panel */}
      <div className={`p-8 rounded-3xl border text-center relative overflow-hidden ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-950 text-white'
      }`} id="newsletter-subscription-panel">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-medical-blue/10 opacity-50 pointer-events-none" />
        
        <div className="max-w-xl mx-auto space-y-4 relative z-10">
          <div className="w-12 h-12 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-2">
            <LucideIcon name="ShieldPlus" className="w-6 h-6 text-brand-green" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white">Subscribe to Health Awareness Alerts</h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Join 1200+ Gaya local families! Receive essential medical safety advisories, generic medicine guides, and monthly discount vouchers directly in your inbox. No spam.
          </p>

          {newsletterSuccess ? (
            <div className="p-3 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-xl text-xs font-bold" id="newsletter-success-box">
              🎉 Thank you! You have successfully subscribed to New Mantu Pharma health newsletters.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2" id="newsletter-form">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-850/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-brand-green transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          )}
          {newsletterError && (
            <span className="text-xs text-rose-400 block mt-1 font-semibold">{newsletterError}</span>
          )}
        </div>
      </div>

      {/* Blog Article Detail Overlay Modal */}
      <AnimatePresence>
        {activeTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="blog-tip-details-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="p-6 md:p-8 text-left">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-brand-green uppercase tracking-wide bg-brand-green/10 px-2 py-0.5 rounded">
                      {activeTip.category}
                    </span>
                    <h3 className="text-xl font-bold font-display mt-2 leading-tight text-primary-navy dark:text-white">{activeTip.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Written by: {activeTip.author} • {activeTip.date}</p>
                  </div>
                  <button
                    onClick={() => setActiveTip(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LucideIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Content */}
                <div className="my-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className={`text-xs md:text-sm space-y-3 whitespace-pre-line leading-relaxed ${
                    darkMode ? 'text-slate-300' : 'text-slate-650'
                  }`}>
                    {activeTip.content}
                  </div>
                </div>

                {/* Footer close */}
                <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveTip(null)}
                    className="px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-semibold"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
