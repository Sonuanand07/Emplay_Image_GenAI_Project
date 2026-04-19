(window as any).global = window;
(window as any).process = { env: { DEBUG: undefined }, version: '' };
(window as any).Buffer = { from: (data: string | Array<any>) => Buffer.from(data), alloc: (size: number) => new Uint8Array(size) };

