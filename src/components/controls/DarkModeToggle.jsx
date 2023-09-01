import useStore from '@/lib/store';
import { Switch } from '../ui/switch';

function DarkModeToggle() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Dark Mode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) => useStore.setState({ darkMode: checked })}
        className="my-1.5"
      />
    </div>
  );
}

export default DarkModeToggle;
