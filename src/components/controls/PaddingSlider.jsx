import useStore from '@/lib/store';
import { Slider } from '../ui/slider';

function PaddingSlider() {
  const padding = useStore((state) => state.padding);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider
        className="my-5 w-44"
        value={[padding]}
        onValueChange={([padding]) => useStore.setState({ padding })}
        max={128}
        step={8}
      />
    </div>
  );
}

export default PaddingSlider;
