import React, { useState, useEffect } from 'react';
import { WhatsAppOrderInput } from '../types';
import { BUSINESS_INFO } from '../data';
import LucideIcon from './LucideIcon';
import { motion } from 'motion/react';

interface OrderFormProps {
  prefilledMedicineName: string;
  onClearPrefilledMedicine: () => void;
  darkMode: boolean;
}

export default function OrderForm({ prefilledMedicineName, onClearPrefilledMedicine, darkMode }: OrderFormProps) {
  const [formData, setFormData] = useState<WhatsAppOrderInput>({
    name: '',
    phone: '',
    email: '',
    address: '',
    medicineName: '',
    hasPrescription: 'No',
    prescriptionFile: null,
    prescriptionFileName: '',
    message: '',
    preferredDeliveryTime: '04:00 PM - 08:00 PM (Evening)'
  });

  const [dragActive, setDragActive] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync prefilled medicine name from catalog
  useEffect(() => {
    if (prefilledMedicineName) {
      setFormData((prev) => ({
        ...prev,
        medicineName: prev.medicineName 
          ? `${prev.medicineName}, ${prefilledMedicineName}` 
          : prefilledMedicineName,
        hasPrescription: 'Yes' // Assume prescription is required for direct catalog orders if specified
      }));
    }
  }, [prefilledMedicineName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleRadioChange = (val: 'Yes' | 'No') => {
    setFormData((prev) => ({
      ...prev,
      hasPrescription: val
    }));
    if (val === 'No') {
      setFormData((prev) => ({
        ...prev,
        prescriptionFile: null,
        prescriptionFileName: ''
      }));
      setFilePreview(null);
    }
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        prescriptionFile: file,
        prescriptionFileName: file.name
      }));
      
      // If image, read as URL for preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview('pdf-placeholder');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      prescriptionFile: null,
      prescriptionFileName: ''
    }));
    setFilePreview(null);
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Mobile Number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) errors.address = 'Delivery Address is required';
    if (!formData.medicineName.trim()) errors.medicineName = 'Please enter at least one medicine or product';
    
    if (formData.hasPrescription === 'Yes' && !formData.prescriptionFileName) {
      errors.prescription = 'Please upload your prescription file or switch to "No"';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to error
      const firstError = Object.keys(formErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Prepare WhatsApp Message Formatting
    const msg = `Hello New Mantu Pharma!

I would like to place a medicine order:

*Customer Name:* ${formData.name}
*Phone Number:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Delivery Address:* ${formData.address}

*Required Medicines:*
${formData.medicineName}

*Has Prescription:* ${formData.hasPrescription} ${formData.prescriptionFileName ? `(Uploaded File: ${formData.prescriptionFileName})` : ''}
*Preferred Delivery Time:* ${formData.preferredDeliveryTime}

${formData.message ? `*Additional Notes:* ${formData.message}` : ''}

_Generated via New Mantu Pharma Website_`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${BUSINESS_INFO.whatsapp}&text=${encodedMsg}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-all ${
      darkMode ? 'bg-slate-900 border-slate-800 text-white shadow-emerald-950/5' : 'bg-white border-slate-100 text-slate-800 shadow-slate-100/50'
    } shadow-xl`} id="order-form-container">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 text-brand-green rounded-xl">
          <LucideIcon name="MessageSquare" className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-primary-navy dark:text-white">Order via WhatsApp</h3>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Fill the details below. We will instantly format your order and open WhatsApp to send!
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="text-center py-10" id="order-success-screen">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
            <LucideIcon name="CheckCircle" className="w-10 h-10 animate-bounce" />
          </div>
          <h4 className="font-bold text-xl text-primary-navy dark:text-white">Order Sent to WhatsApp!</h4>
          <p className={`text-sm max-w-md mx-auto mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Thank you, <strong className="text-brand-green">{formData.name}</strong>. If your WhatsApp tab did not open automatically, please click the button below to complete your order.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <LucideIcon name="MessageSquare" className="w-4 h-4" />
              Re-open WhatsApp Chat
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  address: '',
                  medicineName: '',
                  hasPrescription: 'No',
                  prescriptionFile: null,
                  prescriptionFileName: '',
                  message: '',
                  preferredDeliveryTime: '04:00 PM - 08:00 PM (Evening)'
                });
                setFilePreview(null);
                onClearPrefilledMedicine();
              }}
              className={`px-6 py-3 border rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                darkMode ? 'border-slate-800 text-slate-300' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
              }`}
            >
              Order More Medicines
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" id="whatsapp-prescription-order-form">
          {/* Grid Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="field-name">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                  formErrors.name 
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-500/5' 
                    : darkMode 
                      ? 'bg-slate-850 border-slate-750 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
              {formErrors.name && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{formErrors.name}</span>
              )}
            </div>

            <div id="field-phone">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                10-Digit Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={10}
                placeholder="e.g. 9934023219"
                className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                  formErrors.phone 
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-500/5' 
                    : darkMode 
                      ? 'bg-slate-850 border-slate-750 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
              {formErrors.phone && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{formErrors.phone}</span>
              )}
            </div>
          </div>

          {/* Email Address optional */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. support@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                darkMode 
                  ? 'bg-slate-850 border-slate-750 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>

          {/* Medicine List Area */}
          <div id="field-medicineName">
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Required Medicines / Products <span className="text-rose-500">*</span>
              </label>
              {prefilledMedicineName && (
                <button
                  type="button"
                  onClick={onClearPrefilledMedicine}
                  className="text-[10px] text-rose-500 font-bold hover:underline flex items-center gap-0.5"
                >
                  <LucideIcon name="X" className="w-3 h-3" /> Clear Prefill
                </button>
              )}
            </div>
            <textarea
              name="medicineName"
              value={formData.medicineName}
              onChange={handleInputChange}
              rows={3}
              placeholder="List the medicines you need, with quantities. (e.g. Paracetamol 650mg - 2 strips, Himalaya Baby Cream 200g - 1 bottle)"
              className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                formErrors.medicineName 
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-500/5' 
                  : darkMode 
                    ? 'bg-slate-850 border-slate-750 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
            {formErrors.medicineName && (
              <span className="text-xs text-rose-500 font-semibold mt-1 block">{formErrors.medicineName}</span>
            )}
          </div>

          {/* Address */}
          <div id="field-address">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Gaya Delivery Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Door No., Street Name, Landmark, Gaya (Bihar)"
              className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                formErrors.address 
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-500/5' 
                  : darkMode 
                    ? 'bg-slate-850 border-slate-750 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
            {formErrors.address && (
              <span className="text-xs text-rose-500 font-semibold mt-1 block">{formErrors.address}</span>
            )}
            <span className={`text-[10px] mt-1 block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              📍 Free Home Delivery on orders above ₹500 within a 2km radius of Tekari Road, Gaya.
            </span>
          </div>

          {/* Preferred Delivery Time */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Preferred Delivery Schedule
            </label>
            <select
              name="preferredDeliveryTime"
              value={formData.preferredDeliveryTime}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                darkMode 
                  ? 'bg-slate-850 border-slate-750 text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="09:00 AM - 12:00 PM (Morning)">09:00 AM - 12:00 PM (Morning)</option>
              <option value="12:00 PM - 04:00 PM (Afternoon)">12:00 PM - 04:00 PM (Afternoon)</option>
              <option value="04:00 PM - 08:00 PM (Evening)">04:00 PM - 08:00 PM (Evening)</option>
              <option value="Urgent (Within 2 Hours)">🚨 Urgent (Within 2 Hours in Gaya)</option>
            </select>
          </div>

          {/* Do you have a prescription? */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <LucideIcon name="FileText" className="w-4 h-4 text-brand-green" />
                Upload Doctor Prescription?
              </span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
                  <input
                    type="radio"
                    name="hasPrescription"
                    checked={formData.hasPrescription === 'Yes'}
                    onChange={() => handleRadioChange('Yes')}
                    className="w-4 h-4 text-brand-green focus:ring-brand-green accent-brand-green border-slate-300"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
                  <input
                    type="radio"
                    name="hasPrescription"
                    checked={formData.hasPrescription === 'No'}
                    onChange={() => handleRadioChange('No')}
                    className="w-4 h-4 text-brand-green focus:ring-brand-green accent-brand-green border-slate-300"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {formData.hasPrescription === 'Yes' && (
              <div id="field-prescription" className="space-y-3">
                <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Schedule H and H1 medicines (like antibiotics and chronic care drugs) strictly require a doctor prescription. Upload it below.
                </p>

                {formData.prescriptionFileName ? (
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    darkMode ? 'bg-slate-800 border-slate-750' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 overflow-hidden">
                      {filePreview === 'pdf-placeholder' ? (
                        <div className="p-2 bg-rose-100 text-rose-500 rounded-lg">
                          <LucideIcon name="FileText" className="w-5 h-5" />
                        </div>
                      ) : (
                        <img
                          src={filePreview || "https://picsum.photos/seed/prescription/100/100"}
                          alt="Prescription preview"
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="text-left overflow-hidden">
                        <span className="text-xs font-bold block truncate max-w-[200px]">{formData.prescriptionFileName}</span>
                        <span className="text-[10px] text-slate-400 block">Ready to proceed</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove file"
                    >
                      <LucideIcon name="X" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      dragActive 
                        ? 'border-brand-green bg-brand-green/5' 
                        : formErrors.prescription 
                          ? 'border-rose-400 bg-rose-500/5' 
                          : darkMode 
                            ? 'border-slate-700 hover:border-slate-500' 
                            : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <input
                      type="file"
                      id="prescription-file-upload-input"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="prescription-file-upload-input" className="cursor-pointer block">
                      <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-2">
                        <LucideIcon name="Upload" className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold block text-slate-500 dark:text-slate-300">
                        Drag and drop your prescription here
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        or <span className="text-brand-green font-bold underline">browse files</span> (PDF, JPG, PNG)
                      </span>
                    </label>
                  </div>
                )}
                {formErrors.prescription && (
                  <span className="text-xs text-rose-500 font-semibold mt-1 block">{formErrors.prescription}</span>
                )}
                
                <div className={`p-2.5 rounded-lg border text-[10px] leading-relaxed flex gap-1.5 ${
                  darkMode ? 'bg-slate-800/50 border-slate-700/50 text-slate-400' : 'bg-amber-500/5 border-amber-500/10 text-amber-700'
                }`}>
                  <LucideIcon name="Shield" className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                  <span>
                    Note: This forms a secure text query. For privacy, after WhatsApp opens, please click the "Paperclip" attachment icon in WhatsApp to upload and send your prescription file securely.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Message / Directions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={2}
              placeholder="e.g. Please bring change for ₹2000, call before reaching near Tekari Chowk landmark..."
              className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-brand-green focus:outline-none transition-all text-sm ${
                darkMode 
                  ? 'bg-slate-850 border-slate-750 text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-850 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-green/20 transition-all cursor-pointer text-sm"
            >
              <LucideIcon name="MessageSquare" className="w-5 h-5" />
              <span>Send Order via WhatsApp</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className={`py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm ${
                darkMode ? 'border-slate-800 text-slate-300' : 'border-primary-navy text-primary-navy hover:bg-primary-navy/5'
              }`}
            >
              <LucideIcon name="Phone" className="w-5 h-5 text-brand-green" />
              <span>Call Store Directly</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
