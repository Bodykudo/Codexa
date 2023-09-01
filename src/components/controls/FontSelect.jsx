import useStore from '@/lib/store';
import { fonts } from '@/lib/options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function FontSelect() {
  const fontStyle = useStore((state) => state.fontStyle);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Font
      </label>
      <Select
        value={fontStyle}
        onValueChange={(fontStyle) => useStore.setState({ fontStyle })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[31.25rem]">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              <div className="flex items-center gap-2">
                <span className="capitalize">{font.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FontSelect;
