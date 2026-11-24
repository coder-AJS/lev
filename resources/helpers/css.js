import * as terminal from "./terminal.js"

const onError = () => {
    console.trace("helper error: invalid parameters")
    return null
}

export const getVar = (prop, element = null) => {
    if (!prop) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    const target = element || document.body
    const value = getComputedStyle(target).getPropertyValue(propName).trim()

    if (!value) {
        console.trace(propName, "...not exist in element")
        return null
    }
    return value
}

export const setVar = (prop, value, element) => {
    if (prop == null || value == null) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    const target = element || document.body
    target.style.setProperty(propName, value)
}

export const info = () => terminal.description({
        module: "css helper",
        items: {

            getVar: {
                type: "fnd",
                description: [
                    "🇪🇸 Devuelve el valor de la variable css.",
                    "🇬🇧 Gets the value of a CSS var."
                ],
                pars: [
                    "prop (required)",
                    "element (default body)"
                ]
            },
            
            setVar: {
                type: "fn",
                description: [
                    "🇪🇸 Actualiza el valor de la variable css.",
                    "🇬🇧 Sets the value of a CSS var."
                ],
                pars: [
                    "prop (required)",
                    "value (required)",
                    "element (default body)"
                ]
            }
        }
    })
