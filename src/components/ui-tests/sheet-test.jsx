import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';

export default function SheetTest() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Sheet Component Test</h2>

      <div className="space-x-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Right Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Left Sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Browse through different sections of the application.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <nav className="space-y-2">
                <a href="#" className="block py-2 hover:text-primary">
                  Dashboard
                </a>
                <a href="#" className="block py-2 hover:text-primary">
                  Cards
                </a>
                <a href="#" className="block py-2 hover:text-primary">
                  Decks
                </a>
                <a href="#" className="block py-2 hover:text-primary">
                  Settings
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
