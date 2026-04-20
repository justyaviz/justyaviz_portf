import useSound from 'use-sound';

// High-end UI sound URLs (standard short sounds)
const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft pop
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Very light tick
  success: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' // Achievement chime
};

export function useAudio() {
  const [playClick] = useSound(SOUNDS.click, { volume: 0.15 });
  const [playHover] = useSound(SOUNDS.hover, { volume: 0.05 });
  const [playSuccess] = useSound(SOUNDS.success, { volume: 0.2 });

  return { playClick, playHover, playSuccess };
}
