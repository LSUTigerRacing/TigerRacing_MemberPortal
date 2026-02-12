export const array = {
    /**
     * Immutably replace an array entry. Useful for stateful arrays.
     * @param array The array to clone and modify.
     * @param index The index to modify.
     * @param value The value to replace the modified index with.
     */
    immutableReplace: function <T>(array: T[], index: number, value: T): T[] {
        return array.map((x, i) => i === index ? value : x);
    }
};
