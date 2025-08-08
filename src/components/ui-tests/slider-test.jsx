import React from 'react';
import { Slider } from '../ui/slider';

export default function SliderTest() {
  const [value, setValue] = React.useState([50]);
  const [rangeValue, setRangeValue] = React.useState([25, 75]);

  return (
    <div className="p-8 max-w-md mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-4">Slider Component Test</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">Single Value Slider</h3>
        <div className="space-y-2">
          <Slider value={value} onValueChange={setValue} max={100} step={1} className="w-full" />
          <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Range Slider</h3>
        <div className="space-y-2">
          <Slider
            value={rangeValue}
            onValueChange={setRangeValue}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Range: {rangeValue[0]} - {rangeValue[1]}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Disabled Slider</h3>
        <Slider defaultValue={[50]} max={100} step={1} disabled className="w-full" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Step Slider</h3>
        <div className="space-y-2">
          <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
          <p className="text-sm text-muted-foreground">Step: 10</p>
        </div>
      </div>
    </div>
  );
}
