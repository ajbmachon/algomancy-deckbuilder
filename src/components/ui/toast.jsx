import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster({ ...props }) {
  return (
    <SonnerToaster
      closeButton
      richColors
      position="bottom-right"
      toastOptions={{
        className: "bg-black/80 backdrop-blur-sm border border-white/10 text-white",
        descriptionClassName: "text-white/80 text-sm",
        style: {
          borderRadius: "0.5rem",
          padding: "1rem",
        },
      }}
      {...props}
    />
  );
}
