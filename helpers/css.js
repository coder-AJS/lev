import * as terminal from "./terminal.js"

const onError = () => {
    console.trace("helper error: invalid parameters")
    return null
}

export const get = (prop, element = null) => {
    if (!prop) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    const target = element || document.documentElement
    const value = getComputedStyle(target).getPropertyValue(propName).trim()

    if (!value) {
        console.trace(propName, "...not exist in element")
        return null
    }
    return value
}

export const set = (prop, value, element) => {
    if (!element || prop == null || value == null) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    element.style.setProperty(propName, value)
}

export const info = terminal.add("css", "fn", {
    get: {
        description: "Gets the value of a CSS custom property (variable)",
        params: ["prop (required)", "element (optional)"]
    },
    set: {
        description: "Sets the value of a CSS custom property (variable)",
        params: ["prop (required)", "value (required)", "element (required)"]
    }
})

/* deprecared */
export const setVar = (prop, value, element) => {
    console.trace("DEPRECATED use set")
    if (!element || prop == null || value == null) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    element.style.setProperty(propName, value)
}

export const getVar = (prop, element = null) => {
    console.trace("DEPRECATED use get")
    if (!prop) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    const target = element || document.documentElement
    const value = getComputedStyle(target).getPropertyValue(propName).trim()

    if (!value) {
        console.trace(propName, "...not exist in element")
        return null
    }
    return value
}