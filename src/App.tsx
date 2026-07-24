import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SchemaMarkup from './components/SchemaMarkup';
import SearchCatalog from './components/SearchCatalog';
import OrderForm from './components/OrderForm';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import FaqSection from './components/FaqSection';
import TestimonialsSection from './components/TestimonialsSection';
import HealthTipsSection from './components/HealthTipsSection';
import ContactSection from './components/ContactSection';
import LucideIcon from './components/LucideIcon';
import { BUSINESS_INFO, MEDICINE_CATEGORIES, TESTIMONIALS, FAQS } from './data';
import { motion, AnimatePresence } from 'motion/react';

// Path to our custom generated hero image
const heroBannerImg = "/src/assets/images/pharmacy_hero_banner_1784098319405.jpg";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [prefilledMedicineName, setPrefilledMedicineName] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showWhatsAppBubble, setShowWhatsAppBubble] = useState(false);
  const [whatsappBubbleMenuOpen, setWhatsappBubbleMenuOpen] = useState(false);

  // Sync dark mode state with document element class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Show floating WhatsApp bubble after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsAppBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectMedicineForOrder = (medicineName: string) => {
    setPrefilledMedicineName(medicineName);
    // Switch to page 'home' where the OrderForm lives, and scroll smoothly to it
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById('order-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  const handleNavigateToOrder = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById('order-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  // Programmatic text download for Prescription checklist
  const handleDownloadChecklist = () => {
    const textContent = `NEW MANTU PHARMA - PRESCRIPTION CHECKLIST & SOURCING GUIDE
Location: Tekari Road, Gaya, Bihar 823001
Helpline: +91 99340 23219

Before sharing your prescription on WhatsApp or visiting our store, please ensure the following details are visible to guarantee immediate medical dispatch:

1. PATIENT DETAILS:
   - Full Name
   - Age/Gender
   - Delivery Address in Gaya

2. CLINICAL STAMP / SIGNATURE:
   - Doctor's Stamp & Registration Number
   - Signature with Date

3. MEDICATION SPECIFICATIONS:
   - Medication Brand or Generic Formula name (e.g., Paracetamol)
   - Specific Strength/Dosage (e.g., 500mg, 650mg, SR)
   - Exact Quantity needed (e.g., 2 Strips, 3 Bottles)
   - Schedulation Details (e.g., Once a day, twice a day)

HOW SOURCING WORKS:
- SNAP: Take a clear photo of your doctor's prescription.
- SEND: Upload using our website uploader or send directly via WhatsApp.
- DELIVER: We verify the batch, package securely, and deliver to your Gaya address.

Thank you for choosing New Mantu Pharma. We look forward to serving your healthcare needs!`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'New_Mantu_Pharma_Prescription_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`} id="application-root">
      
      {/* Dynamic SEO Meta Tags & Local Business Schema */}
      <SchemaMarkup currentPage={currentPage} />

      {/* Emergency Alert Banner */}
      <div className="bg-rose-600 text-white py-2 px-4 text-xs font-bold text-center flex flex-col sm:flex-row justify-center items-center gap-1.5 z-50 relative" id="emergency-contact-banner">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          🚨 EMERGENCY CARE HELPLINE GAYA:
        </span>
        <span>Need life-saving medicine urgently? Call us directly: </span>
        <a href={`tel:${BUSINESS_INFO.phone}`} className="underline hover:text-rose-100 font-extrabold tracking-wide">
          {BUSINESS_INFO.phone}
        </a>
      </div>

      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onNavigateToOrder={handleNavigateToOrder}
      />

      {/* Primary Page Layouts */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="main-content-layout">
        
        {/* VIEW A: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-16" id="home-view-stage">
            
            {/* 1. HERO SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left" id="home-hero-section">
              {/* Left text panel */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold w-max">
                  <LucideIcon name="Shield" className="w-4.5 h-4.5" />
                  <span>Licensed Community Pharmacist in Gaya</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-none text-primary-navy dark:text-white">
                  New Mantu Pharma <br />
                  <span className="text-brand-green font-extrabold">{BUSINESS_INFO.tagline}</span>
                </h2>

                <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Serving Tekari Road, Gaya with verified, 100% genuine medicines, surgical supplies, dietary health supplements, hypoallergenic baby cosmetics, and diagnostic medical equipment at reasonable, honest prices.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="px-6 py-3.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                  >
                    <LucideIcon name="Phone" className="w-4 h-4" />
                    <span>Call Store Now</span>
                  </a>

                  <button
                    onClick={handleNavigateToOrder}
                    className={`px-6 py-3.5 border rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      darkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-200' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
                    }`}
                  >
                    <LucideIcon name="MessageSquare" className="w-4 h-4 text-brand-green" />
                    <span>WhatsApp Order</span>
                  </button>

                  <a
                    href="https://maps.google.com/?q=New+Mantu+Pharma+Tekari+Road+Gaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3.5 border rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      darkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-200' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
                    }`}
                  >
                    <LucideIcon name="Compass" className="w-4 h-4 text-medical-blue" />
                    <span>Get Directions</span>
                  </a>
                </div>

                {/* Sourcing details indicator */}
                <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-brand-green">
                    <LucideIcon name="Check" className="w-4 h-4" /> 100% Authentic Products
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1 text-medical-blue">
                    <LucideIcon name="Activity" className="w-4 h-4" /> Temp Controlled Storage
                  </span>
                </div>
              </div>

              {/* Right picture panel */}
              <div className="lg:col-span-6 relative">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-green to-medical-blue rounded-3xl blur opacity-25 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-250 dark:border-slate-800 aspect-[16/9] bg-slate-100">
                  <img
                    src={heroBannerImg}
                    alt="Authentic Pharmacy shelves at New Mantu Pharma Gaya, Bihar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Soft pill detail card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Visit Us Near</span>
                      <h4 className="font-bold text-sm tracking-tight text-brand-green">Tekari Chowk, Gaya</h4>
                      <p className="text-[10px] text-slate-500">Free Customer Parking Available</p>
                    </div>
                    <LucideIcon name="MapPin" className="w-7 h-7 text-brand-green/80" />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. WHY CHOOSE US (Attractive Cards Grid) */}
            <section className="space-y-8" id="why-choose-us-section">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black text-brand-green uppercase tracking-wider">Community Assurances</span>
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-1">Why Choose New Mantu Pharma?</h3>
                <p className={`text-xs mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  We hold active registered drug licensing and work with ethical pharmaceutical channels to ensure absolute medication integrity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '100% Genuine Medicines', desc: 'Directly sourced from manufacturer-authorized stockists with full verification logs.', icon: 'Shield' },
                  { title: 'Experienced Chemists', desc: 'Managed by licensed pharmacist Mantu Kumar to guide on dosage & interactions.', icon: 'Award' },
                  { title: 'Affordable Pricing', desc: 'Transparent billing with fair retail discounts on monthly chronic care tablets.', icon: 'CheckCircle' },
                  { title: 'Fast Local Service', desc: 'Immediate billing, responsive counters, and 2-hour home deliveries in Gaya.', icon: 'Truck' },
                  { title: 'Prescription Medicines', desc: 'Fully stocked Schedule H and H1 cardiovascular, diabetes & anti-infective drugs.', icon: 'FileText' },
                  { title: 'Baby Care & Diapers', desc: 'Dermatologist-tested pediatric skincare formulas, infant milks & maternal tonics.', icon: 'Heart' },
                  { title: 'Trusted Local Shop', desc: 'Proudly serving thousands of families in Gaya, Bihar since 1998.', icon: 'Compass' },
                  { title: 'Easy WhatsApp Support', desc: 'Direct order placement with instant photo prescription upload uploader.', icon: 'MessageSquare' }
                ].map((item, index) => (
                  <div
                    key={index}
                    id={`why-card-${index}`}
                    className={`p-5 rounded-2xl border text-left transition-all hover:translate-y-[-2px] hover:shadow-md ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-4">
                      <LucideIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm md:text-base tracking-tight mb-2 text-primary-navy dark:text-white">{item.title}</h4>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. INTERACTIVE MEDICINE SEARCH CATALOG */}
            <section className="py-4 border-y border-slate-100 dark:border-slate-850" id="interactive-catalog-section">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-black text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Live Stock Catalog
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Search Stock & Check Availability</h3>
                <p className={`text-xs mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Enter drug formula names or general categories to check stocks, pricing, and generic equivalents instantly.
                </p>
              </div>

              {/* Catalog Component */}
              <SearchCatalog
                onSelectMedicineForOrder={handleSelectMedicineForOrder}
                darkMode={darkMode}
              />
            </section>

            {/* 4. CHRONIC MEDS SOURCING PROCESS */}
            <section className="space-y-8" id="working-process-section">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black text-brand-green uppercase tracking-wider">Sourcing Guide</span>
                <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-1">Our Working Process</h3>
                <p className={`text-xs mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  How we process prescription checkouts and custom out-of-stock sourcing smoothly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left" id="sourcing-process-grid">
                {[
                  { step: '01', title: 'Visit Store or Upload', desc: 'Visit our Tekari road counter directly or upload your prescription via our WhatsApp order form.', icon: 'MapPin' },
                  { step: '02', title: 'Share Prescription', desc: 'Our licensed pharmacist carefully verifies the dose, manufacturer batch, and expiry dates.', icon: 'FileText' },
                  { step: '03', title: 'Get Medicines', desc: 'Collect directly in-store with expert guidance or receive doorstep delivery in Gaya.', icon: 'Award' },
                  { step: '04', title: 'Easy UPI Payment', desc: 'Pay safely using Cash, Cards, or any UPI app (PhonePe, GPay, Paytm) once verified.', icon: 'CheckCircle' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border relative ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                    }`}
                  >
                    <span className="absolute top-4 right-4 text-3xl font-black text-brand-green/20 font-display">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-4">
                      <LucideIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm md:text-base tracking-tight mb-2 text-primary-navy dark:text-white">{item.title}</h4>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* EXTRA FEATURE: PRESCRIPTION SOURCING CHECKLIST DOWNLOADER */}
            <section className={`p-6 md:p-8 rounded-3xl border text-left ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-brand-green/5 border-brand-green/15'
            }`} id="prescription-downloader-banner">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                    Sourcing Checklist
                  </span>
                  <h4 className="font-extrabold text-lg md:text-xl font-display tracking-tight text-primary-navy dark:text-white">Download Prescription Verification Guide</h4>
                  <p className={`text-xs max-w-2xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                    Avoid dispatch delays! Download our verified checklist detailing all statutory clinical requirements (Doctor stamp, age, dosage specificity, dates) needed for certified drug dispensations.
                  </p>
                </div>
                <button
                  onClick={handleDownloadChecklist}
                  className="px-5 py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md flex-shrink-0 cursor-pointer"
                >
                  <LucideIcon name="Upload" className="w-4.5 h-4.5 rotate-180" />
                  <span>Download Sourcing Guide (TXT)</span>
                </button>
              </div>
            </section>

            {/* 5. WHATSAPP ORDER FORM AND DRAG-DROP UPLOADER */}
            <section className="py-4 text-center scroll-mt-20" id="order-form-section">
              <div className="max-w-3xl mx-auto">
                <OrderForm
                  prefilledMedicineName={prefilledMedicineName}
                  onClearPrefilledMedicine={() => setPrefilledMedicineName('')}
                  darkMode={darkMode}
                />
              </div>
            </section>

            {/* 6. WEEKLY HEALTH BLOG AND NEWSLETTER PANEL */}
            <section className="py-4 border-t border-slate-100 dark:border-slate-850" id="home-health-tips-section">
              <HealthTipsSection darkMode={darkMode} />
            </section>

            {/* 7. CUSTOMER TESTIMONIALS (Minimum 6Reviews, Interactive write-review) */}
            <section className="py-4 border-t border-slate-100 dark:border-slate-850" id="home-testimonials-section">
              <TestimonialsSection darkMode={darkMode} />
            </section>

            {/* 8. 10 PHARMACY ACCORDION FAQS */}
            <section className="py-4 border-t border-slate-100 dark:border-slate-850" id="home-faq-section">
              <FaqSection darkMode={darkMode} />
            </section>

            {/* 9. CONTACT MAPS AND CTA SUMMARY */}
            <section className="py-4 border-t border-slate-100 dark:border-slate-850 space-y-10" id="home-contact-section">
              <ContactSection darkMode={darkMode} />

              {/* Simple Bottom CTA */}
              <div className={`p-8 rounded-3xl border text-center ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}>
                <h4 className="font-bold text-xl md:text-2xl font-display tracking-tight text-primary-navy dark:text-white">Need Medicines in Gaya Right Now?</h4>
                <p className={`text-xs md:text-sm max-w-xl mx-auto mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Don't wait in long hospital lines. Call us directly or place your order via WhatsApp. We will confirm your items and keep them packaged for pickup or prompt delivery.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    Call store helpline: {BUSINESS_INFO.phone}
                  </a>
                  <button
                    onClick={handleNavigateToOrder}
                    className={`px-5 py-2.5 border rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      darkMode ? 'border-slate-800 text-slate-300 hover:bg-slate-900' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
                    }`}
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW B: ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="animate-fade-in" id="about-page-view">
            <AboutSection darkMode={darkMode} />
          </div>
        )}

        {/* VIEW C: SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="animate-fade-in" id="services-page-view">
            <ServicesSection
              onSelectServiceForInquiry={handleSelectMedicineForOrder}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* VIEW D: GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <div className="animate-fade-in" id="gallery-page-view">
            <GallerySection darkMode={darkMode} />
          </div>
        )}

        {/* VIEW E: TESTIMONIALS PAGE */}
        {currentPage === 'testimonials' && (
          <div className="animate-fade-in" id="testimonials-page-view">
            <TestimonialsSection darkMode={darkMode} />
          </div>
        )}

        {/* VIEW F: FAQ PAGE */}
        {currentPage === 'faq' && (
          <div className="animate-fade-in" id="faq-page-view">
            <FaqSection darkMode={darkMode} />
          </div>
        )}

        {/* VIEW G: CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="animate-fade-in" id="contact-page-view">
            <ContactSection darkMode={darkMode} />
          </div>
        )}

      </main>

      {/* Footer Section */}
      <Footer
        onPageChange={setCurrentPage}
        darkMode={darkMode}
        currentPage={currentPage}
      />

      {/* FLOATING WHATSAPP BUTTON WITH POPUP QUICK MENU (Visible on every single page!) */}
      {showWhatsAppBubble && (
        <div className="fixed bottom-6 left-6 z-45" id="floating-whatsapp-trigger">
          <AnimatePresence>
            {whatsappBubbleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                className={`absolute bottom-16 left-0 p-4 rounded-2xl shadow-2xl border text-left w-64 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2 font-display">New Mantu Pharma Support</h4>
                <p className="text-[11px] text-slate-400 leading-normal mb-4">
                  Connect instantly! Place your prescription order or speak to pharmacist Mantu Kumar right now.
                </p>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setWhatsappBubbleMenuOpen(false);
                      handleNavigateToOrder();
                    }}
                    className="w-full py-2 bg-brand-green hover:bg-brand-green-hover text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <LucideIcon name="FileText" className="w-3.5 h-3.5" />
                    <span>Open Medicine Order Form</span>
                  </button>
                  
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20New%20Mantu%20Pharma%20Gaya`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2 border text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                      darkMode ? 'border-slate-850 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-650'
                    }`}
                  >
                    <LucideIcon name="MessageSquare" className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core bubble button */}
          <button
            onClick={() => setWhatsappBubbleMenuOpen(!whatsappBubbleMenuOpen)}
            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 transition-transform hover:scale-105 cursor-pointer relative"
            title="WhatsApp Helpline Assistance"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border border-white" />
            <LucideIcon name="MessageSquare" className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
}
