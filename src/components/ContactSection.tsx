import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data';
import LucideIcon from './LucideIcon';
import { ContactFormInput } from '../types';

// Standard Google Maps embed URL centered around Tekari Road Gaya Bihar
const googleMapUrl = "https://maps.google.com/maps?q=New%20Mantu%20Pharma%20Tekari%20Road%20Gaya%20Bihar%20823001&t=&z=16&ie=UTF8&iwloc=&output=embed";

interface ContactSectionProps {
  darkMode: boolean;
}

export default function ContactSection({ darkMode }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) errors.message = "Message text is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API storage / webhook submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="space-y-12" id="contact-section-root">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h2 className="text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Contact New Mantu Pharma</h2>
        <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Have an inquiry about medicine availability, orthopedic sizes, or clinical orders? Contact us or drop by our store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Business details and Hours */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Quick Contact Cards */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <h3 className="font-bold text-lg font-display mb-4 flex items-center gap-2 text-primary-navy dark:text-white">
              <LucideIcon name="Compass" className="w-5 h-5 text-brand-green" />
              Store Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="text-brand-green mt-0.5">
                  <LucideIcon name="MapPin" className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Physical Address</strong>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-slate-750'}`}>{BUSINESS_INFO.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-brand-green mt-0.5">
                  <LucideIcon name="Phone" className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Direct Call / Helpline</strong>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-base text-brand-green hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-brand-green mt-0.5">
                  <LucideIcon name="Clock" className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Working Hours</strong>
                  <div className={`space-y-1 ${darkMode ? 'text-slate-350' : 'text-slate-650'}`}>
                    <p>Mon - Sat: <span className="font-semibold">{BUSINESS_INFO.hours.weekdays}</span></p>
                    <p>Sunday: <span className="font-semibold">{BUSINESS_INFO.hours.sunday}</span></p>
                    <p className="text-xs text-rose-500 font-bold flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      Emergency: 24/7 Available on Call
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support Badge */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-brand-green/10 to-medical-blue/10 border border-brand-green/20">
            <h4 className="font-bold text-sm text-brand-green flex items-center gap-1.5 mb-1.5">
              <LucideIcon name="Award" className="w-4 h-4" />
              Gaya Local Delivery Notice
            </h4>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-350' : 'text-slate-600'}`}>
              For order placements within Gaya, please prefer using our <strong>WhatsApp Order Form</strong> for faster processing. Physical pickup is available directly inside our store front with complimentary parking.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className={`p-6 md:p-8 rounded-2xl border text-left ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className="font-bold text-xl font-display mb-1 flex items-center gap-2 text-primary-navy dark:text-white">
              <LucideIcon name="FileText" className="w-5 h-5 text-brand-green" />
              Inquiry / Message Form
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Fill the quick form below. Our pharmacist team will get back to you within 30 minutes!
            </p>

            {isSuccess ? (
              <div className="text-center py-8" id="contact-success-screen">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-brand-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <LucideIcon name="Check" className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Inquiry Submitted Successfully!</h4>
                <p className={`text-xs max-w-sm mx-auto mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Thank you for reaching out. We have logged your request and our pharmacist will contact you shortly on your phone.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-4 py-2 bg-brand-green text-white text-xs font-semibold rounded-lg hover:bg-brand-green-hover transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-inquiry-form">
                {/* Name */}
                <div id="contact-field-name">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-brand-green focus:outline-none transition-all ${
                      formErrors.name 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-rose-500 block mt-1 font-semibold">{formErrors.name}</span>
                  )}
                </div>

                {/* Grid Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div id="contact-field-phone">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      10-Digit Phone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9934023219"
                      className={`w-full px-4 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-brand-green focus:outline-none transition-all ${
                        formErrors.phone 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-rose-500 block mt-1 font-semibold">{formErrors.phone}</span>
                    )}
                  </div>

                  <div id="contact-field-email">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="support@example.com"
                      className={`w-full px-4 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-brand-green focus:outline-none transition-all ${
                        formErrors.email 
                          ? 'border-rose-400 focus:ring-rose-400' 
                          : darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-rose-500 block mt-1 font-semibold">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div id="contact-field-message">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Your Message / Inquiry <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Specify the medicine, generic availability, or medical device details..."
                    className={`w-full px-4 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-brand-green focus:outline-none transition-all ${
                      formErrors.message 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-rose-500 block mt-1 font-semibold">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <LucideIcon name="MessageSquare" className="w-4 h-4" />
                      <span>Submit Secure Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Embedded Google Map Section */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 shadow-lg h-96 relative" id="contact-google-map-embed">
        <iframe
          src={googleMapUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title={`${BUSINESS_INFO.name} Location Map in Gaya, Bihar`}
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Soft overlay banner with address */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 text-left">
          <h4 className="font-bold text-sm text-primary-navy dark:text-brand-green font-display">{BUSINESS_INFO.name}</h4>
          <p className="text-xs text-slate-500 mt-1">{BUSINESS_INFO.location}</p>
          <div className="flex gap-4 items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <a
              href="https://maps.google.com/?q=New+Mantu+Pharma+Tekari+Road+Gaya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-brand-green font-bold flex items-center gap-1"
            >
              <LucideIcon name="Compass" className="w-3.5 h-3.5" /> Open in Google Maps
            </a>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-[11px] text-slate-400">Coordinates: 24.7955° N, 84.9995° E</span>
          </div>
        </div>
      </div>

    </div>
  );
}
