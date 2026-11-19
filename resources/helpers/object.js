import * as terminal from "./terminal.js"

export const recursive = async (object, callback) => {
    if (!callback) {
        console.trace("HELPER RECURSIVE ERROR: no callback")
        return
    }

    const errors = {}

    await Promise.all(
        Object.entries(object).map(async ([key, value]) => {
            if (typeof (value) === "object" && value !== null) {
                const subErrors = await recursive(value, callback)
                if (Object.keys(subErrors).length) errors[key] = subErrors
                return
            }

            const result = await callback(key, value, object)
            if (!result) errors[key] = false
            
        })
    )
    return errors
}

export const info = terminal.info()