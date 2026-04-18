interface AdSlotProps {
  format: 'vertical' | 'horizontal' | 'square' | 'inline-card' | 'masonry';
  label?: string;
  className?: string;
}

const sizeMap: Record<string, string> = {
  vertical: 'h-[420px]',
  horizontal: 'h-[110px]',
  square: 'h-[260px]',
  'inline-card': 'h-full min-h-[180px]',
  masonry: 'h-[220px]',
};

const AdSlot = ({ format, label = 'Реклама', className = '' }: AdSlotProps) => {
  return (
    <div
      className={`relative ${sizeMap[format]} rounded-md overflow-hidden border border-border bg-gradient-to-br from-secondary/60 to-secondary/30 flex items-center justify-center ${className}`}
    >
      <span className="absolute top-1.5 left-2 text-[9px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
        {label}
      </span>
      <div className="text-center px-3">
        <div className="text-xs font-bold text-muted-foreground/80 uppercase tracking-wider">Партнёрский блок</div>
        <div className="text-[11px] text-muted-foreground/60 mt-1">Тюмень.инфо · ad slot</div>
      </div>
    </div>
  );
};

export default AdSlot;
