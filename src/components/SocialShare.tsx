"use client";
import React from "react";
import { Share, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface SocialShareProps {
  url: string;
  title?: string;
  description?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ 
  url, 
  title = "Check out this video", 
  description = "Amazing healthcare video content" 
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 px-4 py-2 bg-[#4ec48f] text-white rounded-lg hover:bg-[#3db37f] transition-colors"
      >
        <Facebook size={20} />
        Facebook
      </button>
      
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
      >
        <Twitter size={20} />
        Twitter
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2 px-4 py-2 bg-[#4ec48f] text-white rounded-lg hover:bg-[#3db37f] transition-colors"
      >
        <Linkedin size={20} />
        LinkedIn
      </button>
      
      <button
        onClick={() => handleShare('whatsapp')}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={20} />
        WhatsApp
      </button>
      
      <button
        onClick={() => handleShare('telegram')}
        className="flex items-center gap-2 px-4 py-2 bg-[#4ec48f] text-white rounded-lg hover:bg-[#3db37f] transition-colors"
      >
        <MessageCircle size={20} />
        Telegram
      </button>
      
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Share size={20} />
        Share
      </button>
    </div>
  );
}; 