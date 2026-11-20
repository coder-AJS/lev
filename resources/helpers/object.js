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

export const realType = (item) => {
    return Object.prototype.toString.call(item).slice(8, -1).toLowerCase()
}

export const info = () => terminal.description({
    module: "object helper",
    type: "fn",
    info: {
        recursive: {
            description: [
                "🇪🇸 Recorre recursivamente un objeto, ejecutando el callback por cada valor real.",
                "🇬🇧 Recursively traverses an object, running the callback for each actual value."
            ],
            params: ["object (required)", "callback (required)"]
        }
    }
})