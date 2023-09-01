import React from 'react';
import { Card, CardContent } from './ui/card';
import ThemeSelect from './controls/ThemeSelect';
import LanguageSelect from './controls/LanguageSelect';
import FontSelect from './controls/FontSelect';
import FontSizeInput from './controls/FontSizeInput';
import PaddingSlider from './controls/PaddingSlider';
import BackgroundToggle from './controls/BackgroundToggle';
import DarkModeToggle from './controls/DarkModeToggle';
import ExportOptions from './controls/ExportOptions';

function ControlPanel({ targetRef, setIsFull }) {
  return (
    <Card className="fixed bottom-4 mx-6 bg-neutral-900/90 px-8 py-6 backdrop-blur">
      <CardContent className="flex flex-wrap gap-6 p-0">
        <ThemeSelect />
        <LanguageSelect />
        <FontSelect />
        <FontSizeInput />
        <PaddingSlider />
        <BackgroundToggle />
        <DarkModeToggle />
        <div className="w-px bg-neutral-800" />
        <div className="place-self-center">
          <ExportOptions targetRef={targetRef} setIsFull={setIsFull} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ControlPanel;
