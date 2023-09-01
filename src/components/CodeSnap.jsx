import { useState } from 'react';
import { Resizable } from 're-resizable';
import useStore from '@/lib/store';
import { cn } from '@/lib/utils';

import CodeEditor from './CodeEditor';
import WidthMeasurement from './WidthMeasurement';
import { Button } from './ui/button';
import { themes } from '@/lib/options';
import { ResetIcon } from '@radix-ui/react-icons';

function CodeSnap({ targetRef, isFull }) {
  const [width, setWidth] = useState('auto');
  const [showWidth, setShowWidth] = useState(false);
  const store = useStore();

  return (
    <Resizable
      enable={{ left: true, right: true }}
      minWidth={store.padding * 2 + 400}
      size={{ width }}
      onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
      onResizeStart={() => setShowWidth(true)}
      onResizeStop={() => setShowWidth(false)}
      className="mb-40 lg:mb-14"
    >
      <div
        className={cn(
          'mb-4 overflow-hidden transition-all ease-out',
          store.showBackground
            ? themes[store.theme].background
            : 'ring ring-neutral-900'
        )}
        style={{ padding: store.padding }}
        ref={targetRef}
      >
        <CodeEditor isFull={isFull} />
      </div>
      <WidthMeasurement showWidth={showWidth} width={width} />
      <div
        className={cn(
          'mx-auto -mt-4 w-fit transition-opacity',
          showWidth || width === 'auto'
            ? 'invisible opacity-0'
            : 'visible opacity-100'
        )}
      >
        {width !== 'auto' ? (
          <Button size="sm" onClick={() => setWidth('auto')} variant="ghost">
            <ResetIcon className="mr-2" />
            Reset width
          </Button>
        ) : null}
      </div>
    </Resizable>
  );
}

export default CodeSnap;
