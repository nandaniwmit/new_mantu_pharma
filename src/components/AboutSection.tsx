import React from 'react';
import { STORE_TIMELINE, BUSINESS_INFO } from '../data';
import LucideIcon from './LucideIcon';
import { motion } from 'motion/react';

// Import our custom-generated pharmacist about image
const pharmacistAboutImg = "/src/assets/images/pharmacist_consultation_about_1784098339254.jpg";

interface AboutSectionProps {
  darkMode: boolean;
}

export default function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <div className="space-y-16" id="about-section-container">
      
      {/* 1. Hero / Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Text Area */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full block w-max">
            Our Legacy since 1998
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight leading-tight text-primary-navy dark:text-white">
            Serving the Gaya Community with Genuine Medicines & Heartfelt Care
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            For nearly three decades, <strong className="text-brand-green">New Mantu Pharma</strong> has been a cornerstone of reliable healthcare on Tekari Road, Gaya. Established in 1998 under the leadership of Mantu Kumar, our mission is built on a single, uncompromising promise: <strong>100% Genuine, batch-certified pharmaceutical products at honest prices.</strong>
          </p>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            We understand that medicine is not just a commodity—it is a critical necessity that can save lives. That is why we source our stocks directly from authorized manufacturer channels and pharmaceutical stockists, and maintain strict temperature-controlled refrigeration logbooks to safeguard every molecule.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className={`p-4 rounded-2xl border text-center ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className="text-2xl font-black text-brand-green block">28+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Years Legacy</span>
            </div>
            <div className={`p-4 rounded-2xl border text-center ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className="text-2xl font-black text-brand-green block">15k+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Happy Patients</span>
            </div>
            <div className={`p-4 rounded-2xl border text-center ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className="text-2xl font-black text-brand-green block">100%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Genuine Guarantee</span>
            </div>
          </div>
        </div>

        {/* Beautiful Image Area */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-green to-medical-blue rounded-3xl blur opacity-30 animate-pulse"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[4/3] bg-slate-100">
            <img
              src={pharmacistAboutImg}
              alt="Experienced pharmacist with medical box in New Mantu Pharma Gaya"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Soft overlay banner */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/45 to-transparent p-6 text-white text-left">
              <span className="text-xs text-brand-green font-bold uppercase tracking-wider block">Owner & Chief Pharmacist</span>
              <h4 className="font-extrabold text-lg">{BUSINESS_INFO.owner}</h4>
              <p className="text-xs text-slate-300">Registered Pharmacist, Gaya (Bihar)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mission, Vision, Values Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="mission-vision-values">
        {/* Mission */}
        <div className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="w-12 h-12 bg-emerald-500/10 text-brand-green rounded-xl flex items-center justify-center mb-4">
            <LucideIcon name="Compass" className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold font-display tracking-tight mb-2 text-primary-navy dark:text-white">Our Mission</h4>
          <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            To deliver authentic medications, professional consultation, and premium wellness supplies to the residents of Gaya, Bihar. We believe in providing healthcare accessibility that prioritizes lives over commercial margins.
          </p>
        </div>

        {/* Vision */}
        <div className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="w-12 h-12 bg-sky-500/10 text-medical-blue rounded-xl flex items-center justify-center mb-4">
            <LucideIcon name="Activity" className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold font-display tracking-tight mb-2 text-primary-navy dark:text-white">Our Vision</h4>
          <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            To remain Gaya’s most trusted physical and digital pharmaceutical partner—bridging top-class pharmacy management systems with seamless online ordering to serve generations with modern clinical excellence.
          </p>
        </div>

        {/* Core Values */}
        <div className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
        }`}>
          <div className="w-12 h-12 bg-emerald-500/10 text-brand-green rounded-xl flex items-center justify-center mb-4">
            <LucideIcon name="Shield" className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold font-display tracking-tight mb-2 text-primary-navy dark:text-white">Our Core Values</h4>
          <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Strict adherence to therapeutic safety, batch verification logs, patient empathy, and transparent pricing. We stand against black marketing or unverified generic supplies.
          </p>
        </div>
      </div>

      {/* 3. The Store Timeline */}
      <div className="py-8 border-y border-slate-100 dark:border-slate-800" id="store-timeline">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wide">Historical Milestone</span>
          <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-1">Our Store Journey</h3>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            How New Mantu Pharma evolved from a single drug storage locker to Gaya's leading trusted community chemist shop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STORE_TIMELINE.map((item, index) => (
            <div key={index} className="relative group text-left">
              {/* Year badge */}
              <div className="text-3xl font-black text-brand-green/35 font-display mb-1.5 group-hover:text-brand-green transition-colors">
                {item.year}
              </div>
              <h4 className="font-bold text-sm tracking-tight text-primary-navy dark:text-white">{item.title}</h4>
              <p className={`text-xs mt-1 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {item.description}
              </p>
              {index < 3 && (
                <div className="hidden md:block absolute top-4 right-[-12px] text-slate-300">
                  <LucideIcon name="ArrowRight" className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Owner Message Box */}
      <div className={`p-8 rounded-3xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-emerald-50/20 border-brand-green/15'
      } relative overflow-hidden`} id="owner-message-box">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center font-black font-display text-2xl flex-shrink-0 shadow-lg shadow-brand-green/10">
            MK
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold font-display tracking-tight text-primary-navy dark:text-white">A Personal Word from Mantu Kumar</h4>
            <blockquote className={`text-sm italic leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-650'}`}>
              "When I started New Mantu Pharma in 1998 in Gaya, Tekari Road was very different. But the core challenge for families has always remained the same: finding genuine medicines at prices that do not stress the family budget. I wanted to establish a medical store that people could trust blindly. Even today, I supervise major medicine stocks myself, checking batch safety, expiry windows, and maintaining continuous cold-storage logbooks. Your health is our highest priority and your trust is our only business asset."
            </blockquote>
            <div>
              <strong className="text-sm block">{BUSINESS_INFO.owner}</strong>
              <span className="text-xs text-slate-400">Founder & Managing Director, New Mantu Pharma</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
