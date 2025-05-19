# Package Updates for shadcn-ui Migration

## package.json Changes

### Remove shadcn-svelte Dependencies

```diff
{
  "name": "deckbuilder",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "prettier --plugin-search-dir . --check . && eslint .",
    "format": "prettier --plugin-search-dir . --write .",
    "test": "vitest run",
    "test:ui": "vitest --ui",
    "test:watch": "vitest",
-   "shadcn-svelte": "shadcn-svelte",
    "prepare": "pre-commit install"
  },
  "devDependencies": {
    "@skeletonlabs/skeleton": "^2.2.0",
    "@skeletonlabs/tw-plugin": "^0.2.1",
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/adapter-static": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^3.0.2",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/svelte": "^4.1.0",
    "autoprefixer": "^10.4.14",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "eslint": "^8.28.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-svelte": "^2.30.0",
    "jsdom": "^24.0.0",
    "lucide-svelte": "^0.363.0",
    "postcss": "^8.4.24",
    "postcss-load-config": "^4.0.1",
    "pre-commit": "^1.2.2",
    "prettier": "^2.8.0",
    "prettier-plugin-svelte": "^2.10.1",
-   "shadcn-svelte": "^0.8.3",
    "stylelint": "^15.11.0",
    "stylelint-config-standard": "^34.0.0",
    "svelte": "^4.0.5",
    "tailwind-merge": "^1.14.0",
    "tailwindcss": "^3.3.2",
    "tailwindcss-animate": "^1.0.7",
    "vite": "^5.0.0",
    "vitest": "^1.4.0"
  },
  "type": "module",
  "dependencies": {
    "@floating-ui/dom": "^1.5.3",
-   "bits-ui": "^0.11.8",
    "tailwind-variants": "^0.1.18"
  }
}
```

## tailwind.config.js Changes

Update the content paths to remove shadcn-svelte references:

```diff
// @ts-check
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';
import animation from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
-   './node_modules/shadcn-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    // Theme configurations remain unchanged
  },
  plugins: [
    skeleton({
      themes: { preset: ['skeleton'] }
    }),
    animation
  ]
};
```

## Add Script for MCP Component Integration

Create a new script for using MCP with shadcn-ui:

```js
// src/lib/utils/mcp-integration.js
export async function installComponent(componentName) {
  try {
    // Code to interface with MCP for component installation
    const response = await fetch(`/api/mcp/install-component?name=${componentName}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to install component ${componentName}:`, error);
    throw error;
  }
}

export async function useComponent(componentName, props) {
  try {
    // Code to use a shadcn-ui component via MCP
    const response = await fetch(`/api/mcp/use-component`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        componentName,
        props
      })
    });
    return await response.json();
  } catch (error) {
    console.error(`Failed to use component ${componentName}:`, error);
    throw error;
  }
}
```
