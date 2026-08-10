import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO, MEDICINE_CATEGORIES } from '../data';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onPageChange: (page: string) => void;
  darkMode: boolean;
  currentPage: string;
}

export default function Footer({ onPageChange, darkMode, currentPage }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Global tracker integration
  useEffect(() => {
    const TRACKING_ENDPOINT = 'https://tools.cprajapati.com/tracker/track.php';
    const urlParams = new URLSearchParams(window.location.search);
    
    let cid = urlParams.get('cid') || localStorage.getItem('wmit_active_cid');
    if (urlParams.get('cid')) {
        localStorage.setItem('wmit_active_cid', urlParams.get('cid'));
    }
    
    if (!cid) return;

    let visitorId = localStorage.getItem('wmit_visitor_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wmit_visitor_id', visitorId);

    let sessionId = sessionStorage.getItem('wmit_session_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wmit_session_id', sessionId);

    const getPageName = () => {
        if (currentPage) {
            return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        }
        const path = window.location.pathname;
        const segment = path.replace(/\/$/, "").split("/").pop();
        return segment ? segment.split('?')[0] : 'Home';
    };

    const sendInitPayload = () => {
        const payload = {
            cid: cid, visitor_id: visitorId, session_id: sessionId,
            page_name: getPageName(), referrer: document.referrer || '',
            device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
            browser: navigator.userAgent, action: 'init'
        };
        fetch(TRACKING_ENDPOINT, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(err => {});
    };

    const sendExitPayload = () => {
        const payload = { cid: cid, session_id: sessionId, page_name: getPageName(), action: 'page_change' };
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(TRACKING_ENDPOINT, blob);
        } else {
            fetch(TRACKING_ENDPOINT, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(err => {});
        }
    };

    sendInitPayload();

    const handleLocationChange = () => {
        sendExitPayload();
        setTimeout(sendInitPayload, 100);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pagehide', sendExitPayload);
    
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') { sendExitPayload(); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
        sendExitPayload();
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('pagehide', sendExitPayload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentPage]);

  // Monitor scroll for Back to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t transition-all ${
        darkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-900 border-slate-950 text-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4 text-left" id="footer-col-brand">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-brand-green flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-brand-green/20">
                M
              </div>
              <h2 className="font-extrabold text-base md:text-lg font-display tracking-tight text-white">
                {BUSINESS_INFO.name}
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted licensed chemist in Gaya, Bihar since 1998. Providing genuine medicines, clinical supplies, and baby formulas under strict pharmacological safety logs.
            </p>
            <div className="pt-2 text-xs font-semibold text-brand-green flex items-center gap-1">
              <LucideIcon name="Shield" className="w-4 h-4 text-brand-green" />
              <span>Drug Lic. No: Registered Chemist</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4 text-left" id="footer-col-links">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              {['home', 'about', 'services', 'gallery', 'testimonials', 'faq', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="hover:text-brand-green text-slate-400 transition-colors capitalize font-semibold cursor-pointer"
                  >
                    {link} Page
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories & Sourcing */}
          <div className="space-y-4 text-left" id="footer-col-sourcing">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Our Store Departments</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {MEDICINE_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id} className="flex items-center gap-1.5 font-medium">
                  <span className="w-1 h-1 rounded-full bg-brand-green" />
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts & Working timings */}
          <div className="space-y-4 text-left" id="footer-col-timings">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Store Hours</h3>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>Mon - Sat: <strong className="text-white">{BUSINESS_INFO.hours.weekdays}</strong></p>
              <p>Sunday: <strong className="text-white">{BUSINESS_INFO.hours.sunday}</strong></p>
              <p className="text-rose-400 font-bold flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                Emergency Available 24/7 on Call
              </p>
              
              <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs">
                <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 text-brand-green font-bold">
                  <LucideIcon name="Phone" className="w-4 h-4 text-brand-green" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </a>
                <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="flex items-center gap-2 text-emerald-400 font-bold">
                  <LucideIcon name="MessageSquare" className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-semibold">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-brand-green transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-brand-green transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span>|</span>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-brand-green transition-colors cursor-pointer">
              Medical Disclaimer
            </button>
          </div>

          <p className="leading-relaxed">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved. Located at Tekari Road, Gaya, Bihar 823001. Developed by <a href="#" className="wmit-popup-trigger hover:text-white underline transition-colors" target="_blank" rel="noopener noreferrer">Developed by WMIT</a>.
          </p>
          <p className="text-[10px] text-slate-600 max-w-2xl mx-auto italic">
            Disclaimer: The information provided on this website is for educational and communication purposes only. Sourcing and dispensing of scheduled drugs are subject to verification of a valid registered medical prescription inside our brick-and-mortar store in Gaya.
          </p>
        </div>
      </div>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-45 p-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-full shadow-xl shadow-brand-green/20 border border-brand-green/10 transition-transform hover:translate-y-[-4px] cursor-pointer"
            title="Back to Top"
            id="back-to-top-button"
          >
            <LucideIcon name="ChevronDown" className="w-5 h-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Modal Popups for Legal pages */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="footer-legal-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border transition-all text-left ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-primary-navy dark:text-brand-green">
                    {activeModal === 'privacy' && 'Privacy Policy'}
                    {activeModal === 'terms' && 'Terms & Conditions'}
                    {activeModal === 'disclaimer' && 'Medical Disclaimer'}
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LucideIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <div className="my-6 max-h-60 overflow-y-auto text-xs space-y-4 pr-2 text-slate-400 leading-relaxed">
                  {activeModal === 'privacy' && (
                    <>
                      <p>At New Mantu Pharma, we prioritize the privacy of our Gaya residents. When you order medicines via our WhatsApp Order Form or make inquiries, your contact details, address, and medical prescriptions are utilized solely to compile your order text query.</p>
                      <p><strong>1. Data Confidentiality:</strong> Your medical prescriptions and health requirements are handled with extreme discretion. We never share, trade, or distribute your prescriptions or name to any third-party marketing agency.</p>
                      <p><strong>2. Local Storage:</strong> This website may store minor local state parameters (such as your chosen display theme setting) in your browser’s local session cache for visual convenience.</p>
                      <p><strong>3. Compliance:</strong> We adhere to standard Indian Pharmacist guidelines and the IT Act for secure digital medical cataloging.</p>
                    </>
                  )}

                  {activeModal === 'terms' && (
                    <>
                      <p>Welcome to New Mantu Pharma website. Sourcing or ordering from our store constitutes agreement with these terms:</p>
                      <p><strong>1. Prescription Requirements:</strong> Dispensing of any medication categorised as Schedule H, H1, or X under Indian Drug rules requires physical presentation of a valid physical prescription signed by a registered practitioner.</p>
                      <p><strong>2. Pricing Accuracy:</strong> While we keep our MRP prices updated, exact prices will be verified and printed on your official GST cash memo at our store counter.</p>
                      <p><strong>3. Sourcing Duration:</strong> Sourcing of out-of-stock specialized chronic care drugs can take up to 24 hours depending on the Gaya distributor cycle.</p>
                      <p><strong>4. Order Acceptance:</strong> We reserves the right to deny delivery or cancel orders if fraudulent activities, invalid phone numbers, or invalid prescriptions are detected.</p>
                    </>
                  )}

                  {activeModal === 'disclaimer' && (
                    <>
                      <p>The information, search catalog listings, health tips, and blog snippets presented on New Mantu Pharma website are intended solely for general awareness and educational value. It should not be treated as a substitute for professional clinical diagnosis or doctor consultation.</p>
                      <p><strong>1. Self-Medication Risk:</strong> Populating or self-diagnosing with medicines without an active Rx is extremely dangerous. Always consult a general physician before taking new courses of action.</p>
                      <p><strong>2. Manufacturer Liability:</strong> Product descriptions and side effects are compiled from manufacturer packages. New Mantu Pharma does not guarantee specific therapeutic results from drug consumption.</p>
                      <p><strong>3. Cold-Chain Integrity:</strong> Once vaccines or refrigerated items leave our Gaya store premises, they are not eligible for exchange or refund due to inability to verify temperature maintenance.</p>
                    </>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
}
