export const nextIndex = (indexString) => {
    return indexString.replace(/\d+/, match => {
        const incrementedNumber = String(Number(match) + 1);
        const leadingZeros = match.slice(0, -incrementedNumber.length);
        return leadingZeros + incrementedNumber;
    });
}
