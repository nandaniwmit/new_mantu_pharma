import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface TestimonialsSectionProps {
  darkMode: boolean;
}

export default function TestimonialsSection({ darkMode }: TestimonialsSectionProps) {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    text: ''
  });
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleStarClick = (rating: number) => {
    setNewReview((prev) => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) {
      setFormError('Please fill in your name and review message.');
      return;
    }

    const createdReview: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: 'Just Now',
      role: newReview.role || 'Gaya Local Patient',
      verified: false
    };

    // Add to top of local reviews state
    setReviews([createdReview, ...reviews]);
    setSubmitSuccess(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitSuccess(false);
      setNewReview({ name: '', role: '', rating: 5, text: '' });
    }, 2000);
  };

  return (
    <div className="space-y-10" id="testimonials-section-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-left max-w-xl">
          <span className="text-xs font-black text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
            Patient Feedback
          </span>
          <h2 className="text-3xl font-bold font-display tracking-tight text-primary-navy dark:text-white mt-2">Why Our Customers Trust Us</h2>
          <p className={`text-sm mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            We are honored to have served thousands of patients in Gaya. Read about their authentic experiences with our store.
          </p>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all self-start md:self-end cursor-pointer shadow-md"
        >
          <LucideIcon name="Sparkles" className="w-4 h-4" />
          <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Review Submission Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-6 rounded-2xl border text-left ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/10 border-brand-green/15'
            }`}
            id="review-submission-box"
          >
            {submitSuccess ? (
              <div className="text-center py-6" id="review-success-message">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-brand-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <LucideIcon name="Check" className="w-6 h-6 animate-ping" />
                </div>
                <h4 className="font-bold text-lg">Thank You for Your Review!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Your feedback helps us continue providing quality medical services in Gaya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <h3 className="font-bold font-display text-base text-primary-navy dark:text-white">Share Your Experience</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Anand Sharma"
                      className={`w-full px-4 py-2 rounded-xl text-xs focus:ring-1 focus:ring-brand-green focus:outline-none ${
                        darkMode ? 'bg-slate-850 border-slate-750 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Location / Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={newReview.role}
                      onChange={handleInputChange}
                      placeholder="e.g. Resident, Gaya"
                      className={`w-full px-4 py-2 rounded-xl text-xs focus:ring-1 focus:ring-brand-green focus:outline-none ${
                        darkMode ? 'bg-slate-850 border-slate-750 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="transition-colors cursor-pointer"
                        title={`Rate ${star} Stars`}
                      >
                        <LucideIcon
                          name="Star"
                          className={`w-5 h-5 ${
                            star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Your Review Message
                  </label>
                  <textarea
                    name="text"
                    value={newReview.text}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell others about our product quality, service speed, generic medicine assistance, or WhatsApp delivery..."
                    className={`w-full px-4 py-2 rounded-xl text-xs focus:ring-1 focus:ring-brand-green focus:outline-none ${
                      darkMode ? 'bg-slate-850 border-slate-750 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {formError && (
                  <span className="text-xs text-rose-500 font-bold block">{formError}</span>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonials-grid">
        {reviews.map((rev) => {
          return (
            <motion.div
              key={rev.id}
              id={`testimonial-card-${rev.id}`}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}
            >
              <div>
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <span key={sIdx}>
                        <LucideIcon
                          name="Star"
                          className={`w-3.5 h-3.5 ${
                            sIdx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </span>
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      Gaya Verified Customer
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className={`text-xs md:text-sm leading-relaxed mb-6 italic ${
                  darkMode ? 'text-slate-300' : 'text-slate-650'
                }`}>
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center font-bold text-sm font-display">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <strong className="text-xs font-bold block text-primary-navy dark:text-white">{rev.name}</strong>
                  <span className="text-[10px] text-slate-400 block">{rev.role} • {rev.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
