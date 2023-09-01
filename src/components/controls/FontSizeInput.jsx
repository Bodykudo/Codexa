import useStore from '@/lib/store';
import { Input } from '../ui/input';

function FontSizeInput() {
  const fontSize = useStore((state) => state.fontSize);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Font Size
      </label>
      <Input
        type="number"
        className="dark w-16 bg-transparent"
        min={6}
        max={40}
        value={fontSize}
        onChange={(e) =>
          useStore.setState({ fontSize: Number(e.target.value) })
        }
      />
    </div>
  );
}

export default FontSizeInput;
