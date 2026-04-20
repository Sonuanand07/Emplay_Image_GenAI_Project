/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 */

import 'zone.js';  // Angular

// Node.js Buffer shim for browser (no self-reference)
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

if (typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = {
    from: (data: string | ArrayBuffer | Uint8Array): Uint8Array => {
      if (typeof data === 'string') {
        const encoder = new TextEncoder();
        return encoder.encode(data);
      }
      return new Uint8Array(data as ArrayBuffer | Uint8Array);
    },
    alloc: (size: number): Uint8Array => new Uint8Array(size),
    allocUnsafe: (size: number): Uint8Array => new Uint8Array(size),
    isBuffer: () => false
  };
}

