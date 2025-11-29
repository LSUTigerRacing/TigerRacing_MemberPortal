/**
 * String utilities.
 *
 * We export the entire struct to avoid import spam.
 * This is acceptable for performance as V8 optimizes constant objects anyways.
 */
export const string = {
    /**
     * Capitalize a string
     * @param str The string to capitalize.
     */
    capitalize (str: string): string {
        return str.replace(/^\w/, f => f.toUpperCase()).split(/(?=[A-Z])/).join(" ");
    },

    /**
     * Truncate a string to a specified length.
     * @param str The string to potentially truncate.
     * @param maxLength The maximum length of the string (including ellipsis).
     */
    trunc (str: string, maxLength: number): string {
        return str.length > maxLength - 3
            ? `${str.substring(0, maxLength)}...`
            : str;
    }
};
