/**
 * Math utilities.
 */
export const math = {
    /**
     * Faster than Math.min(...args) for two arguments.
     */
    min: function (a: number, b: number): number {
        return a < b ? a : b;
    },

    /**
     * Faster than Math.max(...args) for two arguments.
     */
    max: function (a: number, b: number): number {
        return a > b ? a : b;
    }
};
