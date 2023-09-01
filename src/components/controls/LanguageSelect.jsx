import useStore from '@/lib/store';
import { languages } from '@/lib/options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MagicWandIcon } from '@radix-ui/react-icons';

function LanguageSelect() {
  const language = useStore((state) => state.language);
  const autoDetection = useStore((state) => state.autoDetection);

  const handleChange = (language) => {
    if (language === 'auto-detect')
      useStore.setState({ autoDetection: true, language: 'plaintext' });
    else useStore.setState({ autoDetection: false, language });
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {autoDetection && <MagicWandIcon className="mr-2" />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[31.25rem]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center gap-2">
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSelect;
