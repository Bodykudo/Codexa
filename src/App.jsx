import { useEffect, useRef, useState } from 'react';
import useStore from './lib/store';
import { fonts, themes } from './lib/options';
import CodeSnap from './components/CodeSnap';
import ControlPanel from './components/ControlPanel';

function App() {
  const store = useStore();
  const editorRef = useRef(null);
  const [fullEditor, setFullEditor] = useState(false);

  // Handle copied links
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);
    console.log(state);
    useStore.setState({
      ...state,
      code: state.code ? atob(state.code) : '',
      autoDetection: state.autoDetection === 'true',
      darkMode: state.darkMode === 'true',
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  return (
    <main className="dark flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
      <link
        rel="stylesheet"
        href={themes[store.theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[store.fontStyle].src}
        crossOrigin="anonymous"
      />
      <img src="logo.png" className="fixed top-4 w-28" />
      <CodeSnap targetRef={editorRef} isFull={fullEditor} />
      <ControlPanel targetRef={editorRef} setIsFull={setFullEditor} />
    </main>
  );
}

export default App;
