import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';

export default function PopoverTest() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Popover Component Test</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Popover</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="width">Width</label>
                    <input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8 rounded-md border px-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="maxWidth">Max. width</label>
                    <input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8 rounded-md border px-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="height">Height</label>
                    <input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8 rounded-md border px-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="maxHeight">Max. height</label>
                    <input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8 rounded-md border px-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Popover with Icon</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-10 rounded-full p-0">
                <Calendar className="h-4 w-4" />
                <span className="sr-only">Open popover</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-64">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Calendar</h4>
                <p className="text-sm text-muted-foreground">Select a date from the calendar.</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Popover Positions</h3>
          <div className="flex gap-4 flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Top
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top">
                <p className="text-sm">Popover on top</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Right
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right">
                <p className="text-sm">Popover on right</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Bottom
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom">
                <p className="text-sm">Popover on bottom</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Left
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left">
                <p className="text-sm">Popover on left</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
