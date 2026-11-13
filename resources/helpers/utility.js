import * as terminal from "./terminal.js"

export const randomize =  ({
    min = 0,
    max = null
}) => {
    if (max === null || max === undefined) return null
    if (min >= max) return null
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const info = terminal.helper("utility", "fn", {
    randomize: {
        description: [
            "🇪🇸 Devuelve un numero entero entre min y max.",
            "🇬🇧 Return a random integer between min and max."
        ],
        params: {
            min: "required",
            max: "required"
        }
    }
})