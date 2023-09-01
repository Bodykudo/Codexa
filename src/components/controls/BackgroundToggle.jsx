import useStore from '@/lib/store';
import { Switch } from '../ui/switch';

function BackgroundToggle() {
  const showBackground = useStore((state) => state.showBackground);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Background
      </label>
      <Switch
        checked={showBackground}
        onCheckedChange={(checked) =>
          useStore.setState({ showBackground: checked })
        }
        className="my-1.5"
      />
    </div>
  );
}

export default BackgroundToggle;
