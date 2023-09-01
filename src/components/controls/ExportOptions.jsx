import { toBlob, toPng, toSvg } from 'html-to-image';
import { toast } from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';
import useStore from '@/lib/store';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from '@radix-ui/react-icons';

function ExportOptions({ targetRef, setIsFull }) {
  const title = useStore((state) => state.title);

  const copyImage = async () => {
    const loading = toast.loading('Copying...');

    try {
      setIsFull(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });
      const img = new ClipboardItem({ 'image/png': imgBlob });
      navigator.clipboard.write([img]);

      toast.remove(loading);
      toast.success('Image copied to clipboard!');
    } catch (error) {
      toast.remove(loading);
      toast.error('Something went wrong!');
    } finally {
      setIsFull(false);
    }
  };

  const copyLink = () => {
    try {
      const state = useStore.getState();
      const queryParams = new URLSearchParams({
        ...state,
        code: btoa(state.code),
      }).toString();
      navigator.clipboard.writeText(`${location.href}?${queryParams}`);

      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const saveImage = async (name, format) => {
    const loading = toast.loading(`Exporting ${format} image...`);

    try {
      setIsFull(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      let imgUrl, filename;
      switch (format) {
        case 'PNG':
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.png`;
          break;
        case 'SVG':
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
          filename = `${name}.svg`;
          break;

        default:
          return;
      }

      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = filename;
      a.click();

      toast.remove(loading);
      toast.success('Exported successfully!');
    } catch (error) {
      toast.remove(loading);
      toast.error('Something went wrong!');
    } finally {
      setIsFull(false);
    }
  };

  useHotkeys('ctrl+c', copyImage);
  useHotkeys('alt+c', copyLink);
  useHotkeys('ctrl+s', (e) => {
    e.preventDefault();
    saveImage(title, 'PNG');
  });

  useHotkeys('shift+ctrl+s', () => saveImage(title, 'SVG'));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon /> Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon /> Copy Link
          <DropdownMenuShortcut>Alt C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, 'PNG')}
        >
          <DownloadIcon /> Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, 'SVG')}
        >
          <DownloadIcon /> Save as SVG
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportOptions;
