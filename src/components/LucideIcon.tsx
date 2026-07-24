import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "w-5 h-5", size }: LucideIconProps) {
  // Map standard category & service icon string names to actual component references
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[name];
  
  if (!IconComponent) {
    // Fallback if icon not found
    return <Icons.HelpCircle className={className} size={size} id={`fallback-icon-${name}`} />;
  }

  return <IconComponent className={className} size={size} id={`lucide-icon-${name}`} />;
}
