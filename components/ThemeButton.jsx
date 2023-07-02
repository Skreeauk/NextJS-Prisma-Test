'use client'

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeButton() {

  const {resolvedTheme, setTheme} = useTheme();

  const [mounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <button 
        className="emoji_btn"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
        {resolvedTheme === 'dark' ? '🌕' : '🌑'}
    </button>
  );
}