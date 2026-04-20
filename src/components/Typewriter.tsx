import { useState, useEffect } from "react";

export function Typewriter({ words, delay = 2000 }: { words: string[], delay?: number }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // If words array is empty or undefined, handle gracefully
    if (!words || words.length === 0) return;

    const word = words[currentWordIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === word) {
      typingSpeed = delay;
      setIsDeleting(true);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      typingSpeed = 800;
    }

    const timer = setTimeout(() => {
      setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="ml-[2px] w-[3px] md:w-[4px] h-[0.9em] bg-accent animate-pulse inline-block" />
    </span>
  );
}
