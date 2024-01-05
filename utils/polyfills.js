/**
 * Current Electron environment doesn't support the '.at' method which is new from 2021, some fundamental libraries raise
 * errors for this, so hardcode this polyfill logic.
 * */
export const atPolyfill = () => {
    function at(n) {
        n = Math.trunc(n) || 0;
        if (n < 0) n += this.length;
        if (n < 0 || n >= this.length) return undefined;
        return this[n];
    }

    const TypedArray = Reflect.getPrototypeOf(Int8Array);
    for (const C of [Array, String, TypedArray]) {
        Object.defineProperty(C.prototype, "at",
            { value: at,
                writable: true,
                enumerable: false,
                configurable: true });
    }
}
