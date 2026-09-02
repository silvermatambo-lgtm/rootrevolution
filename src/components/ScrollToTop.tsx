import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-4 z-40 w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 md:bottom-8"
    >
      <ChevronUp size={20} />
    </button>
  );
}
