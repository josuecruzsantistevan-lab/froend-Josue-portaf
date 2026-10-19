import { useState, useEffect } from 'react';

/**
 * Custom typewriter hook to cycle through an array of words
 * (type → pause → delete → next word) without any external libraries.
 * Starts only when active is true.
 */
export default function useTypewriter(
  words = [],
  typeSpeed = 85,
  deleteSpeed = 45,
  pauseDuration = 1800,
  active = true
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active || !words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];
    let timer;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Word is fully typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Word deleted, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [active, currentText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration]);

  return currentText;
}
