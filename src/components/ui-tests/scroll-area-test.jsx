import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export default function ScrollAreaTest() {
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">ScrollArea Component Test</h2>

      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map(tag => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Horizontal ScrollArea</h3>
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <figure key={i} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <div className="h-20 w-32 bg-gray-200 flex items-center justify-center">
                    <span>Item {i + 1}</span>
                  </div>
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  Photo <span className="font-semibold text-foreground">{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
