export function isNumeric(input) {
    return (typeof input === 'number') || (!isNaN(parseFloat(input)) && isFinite(input));
}
export const strToNum = (str) => {
    return parseInt(str);
};
//# sourceMappingURL=utils.js.map