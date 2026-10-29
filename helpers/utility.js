export const randomize =  ({
    min = 0,
    max = null
}) => {
    if (max === null || max === undefined) return null
    if (min >= max) return null
    return Math.floor(Math.random() * (max - min + 1)) + min
}