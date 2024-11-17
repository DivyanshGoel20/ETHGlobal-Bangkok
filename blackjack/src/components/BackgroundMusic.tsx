import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('../assets/card-flip.wav');
    audioRef.current.loop = true;

    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    };

    // Play audio on first user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
};

export default BackgroundMusic;