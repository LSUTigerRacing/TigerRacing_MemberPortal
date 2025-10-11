/**
 * Number utilities.
 *
 * We export the entire struct to avoid import spam.
 * This is acceptable for performance as V8 optimizes constant objects anyways.
 */
export const number = {
    /**
     * Delimit a number with a string value, every 3 digits.
     * @param num The number to delimit.
     * @param delimiter The string to delimit with. Defaults to `,`.
     */
    delimit (num: number, delimiter = ","): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    },

    predicate (num: number): string {
        return Math.abs(num) >= 1e21
            ? `${(num / 1e21).toFixed(2)}S`
            : Math.abs(num) >= 1e18
                ? `${(num / 1e18).toFixed(2)}QT`
                : Math.abs(num) >= 1e15
                    ? `${(num / 1e15).toFixed(2)}Q`
                    : Math.abs(num) >= 1e12
                        ? `${(num / 1e12).toFixed(2)}T`
                        : Math.abs(num) >= 1e9
                            ? `${(num / 1e9).toFixed(2)}B`
                            : Math.abs(num) >= 1e6
                                ? `${(num / 1e6).toFixed(2)}M`
                                : Math.abs(num) >= 1e3
                                    ? `${(num / 1e3).toFixed(2)}K`
                                    : num.toString();
    }
};
