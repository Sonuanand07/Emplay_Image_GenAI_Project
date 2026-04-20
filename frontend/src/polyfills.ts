/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 */

import 'zone.js';  // Angular

// Node.js Buffer shim for browser
const myBuffer = {
  from: (data: string | ArrayBuffer | Uint8Array): Uint8Array => {
    if (typeof data === 'string') {
      const encoder = new TextEncoder();
      return encoder.encode(data);
    }
    return new Uint8Array(data as ArrayBuffer | Uint8Array);
  },
  alloc: (size: number): Uint8Array => new Uint8Array(size),
  allocUnsafe: (size: number): Uint8Array => new Uint8Array(size),
  isBuffer: (): boolean => false
};

(window as any).Buffer = myBuffer;

