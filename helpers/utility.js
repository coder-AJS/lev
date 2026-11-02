import * as terminal from "./terminal.js"

export const randomize =  ({
    min = 0,
    max = null
}) => {
    if (max === null || max === undefined) return null
    if (min >= max) return null
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const info = terminal.add("utility", "fn", {
    randomize: {
        description: "Generates a random integer between a given minimum and maximum value.",
        params: {
            min: "required",
            max: "required"
        }
    }
})