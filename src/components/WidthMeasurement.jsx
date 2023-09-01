import { cn } from '@/lib/utils';

export default function WidthMeasurement({ showWidth, width }) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 text-white transition-opacity',
        showWidth ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <div className="flex flex-1 items-center">
        <div className="h-4 w-0.5 bg-white/20" />
        <div className="h-px w-full bg-white/20" />
      </div>
      <span className="text-sm text-neutral-500">{width} px</span>
      <div className="flex flex-1 items-center">
        <div className="h-px w-full bg-white/20" />
        <div className="h-4 w-0.5 bg-white/20" />
      </div>
    </div>
  );
}
