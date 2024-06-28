import React, { useState, useEffect } from 'react';

interface TextRevealProps {
  text: string;
  duration: number;
}

const randomChar = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
};

const TextReveal: React.FC<TextRevealProps> = ({ text, duration }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = duration / text.length;
    const revealText = () => {
      setDisplayText((prev) =>
        prev.substring(0, currentIndex) + text[currentIndex] + prev.substring(currentIndex + 1)
      );
      setCurrentIndex((prev) => prev + 1);
    };

    if (currentIndex < text.length) {
      const timeout = setTimeout(revealText, interval);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, duration]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const randomizeText = () => {
        setDisplayText((prev) =>
          Array.from(text).map((_, idx) => (idx < currentIndex ? text[idx] : randomChar())).join('')
        );
      };

      const interval = setInterval(randomizeText, 50);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);  // Ensure the final text is set correctly
    }
  }, [currentIndex, text]);

  return <>{displayText}</>;
};

export default TextReveal;
