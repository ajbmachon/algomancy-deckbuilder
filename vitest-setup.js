import '@testing-library/svelte/vitest'
import '@testing-library/jest-dom/vitest'

// Fix reference to missing method in JSDOM
if (!global.DOMRect) {
  global.DOMRect = class DOMRect {
    constructor(x, y, width, height) {
      this.x = x || 0
      this.y = y || 0
      this.width = width || 0
      this.height = height || 0
      this.top = this.y
      this.right = this.x + this.width
      this.bottom = this.y + this.height
      this.left = this.x
    }
  }
}
