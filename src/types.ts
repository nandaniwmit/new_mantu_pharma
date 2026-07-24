export interface Medicine {
  id: string;
  name: string;
  category: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Equipment' | 'Supplement' | 'Cream' | 'Device' | 'Other';
  price: number;
  availability: 'In Stock' | 'Available in 2 Hours' | 'Out of Stock';
  description: string;
  isGeneric: boolean;
  genericName?: string;
  dosage: string;
  manufacturer: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Orders' | 'Medicines' | 'Store' | 'Services';
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  role: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  benefits: string[];
}

export interface BlogTip {
  id: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  tag: string;
}

export interface ContactFormInput {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface WhatsAppOrderInput {
  name: string;
  phone: string;
  email: string;
  address: string;
  medicineName: string;
  hasPrescription: 'Yes' | 'No';
  prescriptionFile?: File | null;
  prescriptionFileName?: string;
  message: string;
  preferredDeliveryTime: string;
}
