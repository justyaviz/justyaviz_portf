import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "just.yaviz - Biz bilan biznesingizni yangi bosqichga olib chiqing.", 
  keywords = "IT kompaniya, Veb sayt yaratish, Digital Agency, SMM, Branding, Tashkent, O'zbekiston, just.yaviz",
  ogImage = "https://yaviz.vercel.app/logo.png" // We can replace this with a real hero image URL
}) => {
  return (
    <Helmet>
      <title>{title} | just.yaviz</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
