type CategoryIconProps = {
  icon: string;
  className?: string;
};

export default function CategoryIcon({ icon, className }: CategoryIconProps) {
  const shared = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (icon) {
    case 'code':
      return <svg {...shared}><path d="M9 8 5 12l4 4" /><path d="m15 8 4 4-4 4" /></svg>;
    case 'sparkles':
      return <svg {...shared}><path d="m12 4 1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" /><path d="m18 14 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></svg>;
    case 'server':
      return <svg {...shared}><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01" /><path d="M8 17h.01" /></svg>;
    case 'brackets':
      return <svg {...shared}><path d="M10 7 6 12l4 5" /><path d="m14 7 4 5-4 5" /></svg>;
    case 'database':
      return <svg {...shared}><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>;
    case 'bot':
      return <svg {...shared}><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 4v4" /><path d="M8 12h.01" /><path d="M16 12h.01" /><path d="M9 15h6" /></svg>;
    case 'brain':
      return <svg {...shared}><path d="M9 6.5A2.5 2.5 0 0 0 6.5 9v1A2.5 2.5 0 0 0 5 12.3 2.7 2.7 0 0 0 7.7 15H9" /><path d="M15 6.5A2.5 2.5 0 0 1 17.5 9v1a2.5 2.5 0 0 1 1.5 2.3 2.7 2.7 0 0 1-2.7 2.7H15" /><path d="M12 6v12" /><path d="M9.5 10.5H12" /><path d="M12 13.5h2.5" /></svg>;
    case 'video':
      return <svg {...shared}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></svg>;
    case 'gamepad':
      return <svg {...shared}><path d="M6 12h4" /><path d="M8 10v4" /><path d="M15 11h.01" /><path d="M18 13h.01" /><path d="M7 19 4.5 14a5 5 0 0 1 5-7h5a5 5 0 0 1 5 7L17 19l-3-3H10z" /></svg>;
    case 'palette':
      return <svg {...shared}><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h1a2 2 0 0 0 2-2 8 8 0 0 0-8-8Z" /><circle cx="8" cy="10" r=".7" fill="currentColor" stroke="none" /><circle cx="12" cy="7.5" r=".7" fill="currentColor" stroke="none" /><circle cx="16" cy="10" r=".7" fill="currentColor" stroke="none" /></svg>;
    case 'globe':
      return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></svg>;
    case 'smartphone':
      return <svg {...shared}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></svg>;
    case 'puzzle':
      return <svg {...shared}><path d="M9 4h3a2 2 0 1 1 4 0h3v5a2 2 0 1 0 0 4v5h-5a2 2 0 1 1-4 0H5v-5a2 2 0 1 0 0-4V4z" /></svg>;
    case 'bolt':
      return <svg {...shared}><path d="M13 2 5 14h6l-1 8 8-12h-6z" /></svg>;
    case 'wand':
      return <svg {...shared}><path d="m4 20 8-8" /><path d="m10 3 .5 2L13 6l-2 .5L10 9l-.5-2L7 6l2.5-.5z" /><path d="m16 8 .4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z" /></svg>;
    case 'workflow':
      return <svg {...shared}><rect x="3" y="4" width="6" height="5" rx="1" /><rect x="15" y="4" width="6" height="5" rx="1" /><rect x="9" y="15" width="6" height="5" rx="1" /><path d="M6 9v3h12V9" /><path d="M12 12v3" /></svg>;
    case 'home':
      return <svg {...shared}><path d="m3 10 9-7 9 7" /><path d="M5 9.5V20h14V9.5" /></svg>;
    case 'shield':
      return <svg {...shared}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>;
    case 'coins':
      return <svg {...shared}><ellipse cx="8" cy="8" rx="4" ry="2.5" /><path d="M4 8v4c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V8" /><ellipse cx="16" cy="14" rx="4" ry="2.5" /><path d="M12 14v4c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5v-4" /></svg>;
    case 'github':
      return <svg {...shared}><path d="M12 3a9 9 0 0 0-2.85 17.53c.45.08.61-.2.61-.44v-1.56c-2.49.54-3.02-1.06-3.02-1.06-.4-1.01-.99-1.28-.99-1.28-.81-.56.06-.55.06-.55.9.06 1.37.92 1.37.92.8 1.37 2.09.97 2.6.74.08-.58.31-.97.56-1.19-1.99-.23-4.08-.99-4.08-4.43 0-.98.35-1.78.92-2.4-.09-.23-.4-1.15.09-2.4 0 0 .76-.24 2.48.92a8.5 8.5 0 0 1 4.52 0c1.72-1.16 2.47-.92 2.47-.92.49 1.25.18 2.17.09 2.4.57.62.92 1.42.92 2.4 0 3.45-2.1 4.2-4.11 4.42.32.28.6.83.6 1.67v2.47c0 .24.16.53.61.44A9 9 0 0 0 12 3Z" fill="currentColor" stroke="none" /></svg>;
    default:
      return <svg {...shared}><circle cx="12" cy="12" r="8" /></svg>;
  }
}
