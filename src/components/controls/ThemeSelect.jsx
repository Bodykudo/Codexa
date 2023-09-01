import useStore from '@/lib/store';
import { cn } from '@/lib/utils';
import { themes } from '@/lib/options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function ThemeSelect() {
  const theme = useStore((state) => state.theme);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Theme
      </label>
      <Select
        value={theme}
        onValueChange={(theme) => useStore.setState({ theme })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem key={name} value={name}>
              <div className="flex items-center gap-2">
                <div className={cn('h-4 w-4 rounded-full', theme.background)} />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ThemeSelect;
