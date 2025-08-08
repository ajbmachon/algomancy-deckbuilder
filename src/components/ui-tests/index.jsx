import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CollapsibleTest from './collapsible-test';
import ResizableTest from './resizable-test';
import SheetTest from './sheet-test';
import ScrollAreaTest from './scroll-area-test';
import CommandTest from './command-test';
import SliderTest from './slider-test';
import PopoverTest from './popover-test';
import SkeletonTest from './skeleton-test';
import ProgressTest from './progress-test';

export default function UITestsIndex() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">shadcn/ui Component Tests</h1>

      <Tabs defaultValue="collapsible" className="w-full">
        <TabsList className="grid grid-cols-5 lg:grid-cols-9 mb-8">
          <TabsTrigger value="collapsible">Collapsible</TabsTrigger>
          <TabsTrigger value="resizable">Resizable</TabsTrigger>
          <TabsTrigger value="sheet">Sheet</TabsTrigger>
          <TabsTrigger value="scroll-area">ScrollArea</TabsTrigger>
          <TabsTrigger value="command">Command</TabsTrigger>
          <TabsTrigger value="slider">Slider</TabsTrigger>
          <TabsTrigger value="popover">Popover</TabsTrigger>
          <TabsTrigger value="skeleton">Skeleton</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="collapsible">
          <CollapsibleTest />
        </TabsContent>

        <TabsContent value="resizable">
          <ResizableTest />
        </TabsContent>

        <TabsContent value="sheet">
          <SheetTest />
        </TabsContent>

        <TabsContent value="scroll-area">
          <ScrollAreaTest />
        </TabsContent>

        <TabsContent value="command">
          <CommandTest />
        </TabsContent>

        <TabsContent value="slider">
          <SliderTest />
        </TabsContent>

        <TabsContent value="popover">
          <PopoverTest />
        </TabsContent>

        <TabsContent value="skeleton">
          <SkeletonTest />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTest />
        </TabsContent>
      </Tabs>
    </div>
  );
}
