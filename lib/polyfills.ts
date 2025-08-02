// Browser polyfills for Node.js globals
if (typeof globalThis !== "undefined") {
  // Process polyfill
  if (!globalThis.process) {
    globalThis.process = require("process/browser");
  }

  // Buffer polyfill
  if (!globalThis.Buffer) {
    globalThis.Buffer = require("buffer").Buffer;
  }

  if (!globalThis.indexedDB) {
    const mockIndexedDB = {
      open: () => ({
        result: null,
        error: null,
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null,
      }),
      deleteDatabase: () => ({}),
      cmp: () => 0,
    };

    globalThis.indexedDB = mockIndexedDB as any;
    globalThis.IDBKeyRange = {} as any;
    globalThis.IDBCursor = {} as any;
    globalThis.IDBDatabase = {} as any;
    globalThis.IDBIndex = {} as any;
    globalThis.IDBObjectStore = {} as any;
    globalThis.IDBRequest = {} as any;
    globalThis.IDBTransaction = {} as any;
  }

  if (!globalThis.localStorage) {
    const storage = new Map();

    globalThis.localStorage = {
      getItem: (key: string) => storage.get(key) || null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
      key: (index: number) => Array.from(storage.keys())[index] || null,
      get length() {
        return storage.size;
      },
    } as Storage;
  }

  if (!globalThis.sessionStorage) {
    globalThis.sessionStorage = globalThis.localStorage;
  }

  // Handle Ethereum provider conflicts
  if (typeof window !== "undefined") {
    // Store original ethereum if it exists
    let originalEthereum = (window as any).ethereum;

    // Override the ethereum setter to handle conflicts gracefully
    try {
      Object.defineProperty(window, "ethereum", {
        get() {
          return originalEthereum;
        },
        set(value) {
          // Only set if no existing provider or if it's undefined
          if (!originalEthereum || originalEthereum === undefined) {
            originalEthereum = value;
          }
          // Silently ignore attempts to overwrite existing provider
        },
        configurable: true,
      });
    } catch {
      // If we can't redefine the property, just log the conflict
      // eslint-disable-next-line no-console
      console.warn(
        "Multiple wallet providers detected. This may cause conflicts.",
      );
    }
  }
}

if (typeof global !== "undefined") {
  if (!global.process) {
    global.process = globalThis.process;
  }
  if (!global.Buffer) {
    global.Buffer = globalThis.Buffer;
  }
  if (!global.indexedDB) {
    global.indexedDB = globalThis.indexedDB;
  }
  if (!global.localStorage) {
    global.localStorage = globalThis.localStorage;
  }
  if (!global.sessionStorage) {
    global.sessionStorage = globalThis.sessionStorage;
  }
}
