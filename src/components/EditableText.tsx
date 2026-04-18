import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminProvider';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  type?: 'input' | 'textarea';
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  contentKey, 
  defaultText, 
  className = "", 
  as: Component = 'span',
  type = 'input'
}) => {
  const { isEditMode, siteContent, updateContent, isAdmin } = useAdmin();
  const [value, setValue] = useState(siteContent?.[contentKey] || defaultText);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (siteContent?.[contentKey]) {
      setValue(siteContent[contentKey]);
    }
  }, [siteContent, contentKey]);

  if (!isEditMode || !isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    updateContent(contentKey, e.target.value);
  };

  const inputClasses = `bg-white/5 border border-dashed border-white/20 rounded px-2 py-1 outline-none focus:border-accent transition-all w-full ${className} ${isFocused ? 'bg-white/10 border-solid border-accent' : ''}`;

  return (
    <div className="relative group w-full" data-content-key={contentKey}>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          className={inputClasses + " min-h-[100px] resize-y"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          className={inputClasses}
        />
      )}
      <div className="absolute -top-6 right-0 text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Tahrirlash: {contentKey}
      </div>
    </div>
  );
};
