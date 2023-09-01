import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import flourite from 'flourite';

import useStore from '@/lib/store';
import { cn } from '@/lib/utils';
import { codeSnippets, fonts, languages, themes } from '@/lib/options';

function CodeEditor({ isFull }) {
  const store = useStore();

  useEffect(() => {
    if (!store.code) {
      const randomSnippet =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      useStore.setState(randomSnippet);
    }
  }, []);

  useEffect(() => {
    if (store.autoDetection) {
      const { language } = flourite(store.code, { noUnknown: true });
      useStore.setState({ language: language.toLowerCase() || 'plaintext' });
    }
  }, [store.autoDetection, store.code]);

  return (
    <div
      className={cn(
        'rounded-xl border-2 shadow-2xl',
        store.darkMode
          ? 'border-gray-600/40 bg-black/75'
          : 'border-gray-200/20 bg-white/75'
      )}
    >
      <header className="grid grid-cols-6 items-center gap-3 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            spellCheck={false}
            onClick={(e) => e.target.select()}
            onChange={(e) => useStore.setState({ title: e.target.value })}
            className={cn(
              'bg-transparent text-center text-sm font-medium focus:outline-none',
              store.darkMode ? 'text-gray-400' : 'text-gray-900'
            )}
          />
        </div>
      </header>
      <div
        className={cn(
          'px-4 pb-4',
          !isFull &&
            `max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-track-rounded-md scrollbar-thumb-rounded-md ${
              themes[store.theme].scrollbar
            }`,
          store.darkMode
            ? 'brightness-110'
            : 'text-gray-800 brightness-50 contrast-200 saturate-200'
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => useStore.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || 'plaintext' })
              .value
          }
          style={{
            fontFamily: fonts[store.fontStyle].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
