const onError = () => {
    console.trace("helper error: invalid parameters")
    return null
}

/**
 * Gets the value of a CSS custom property (variable).
 * @param {string} prop - The CSS variable name (with or without '--').
 * @param {HTMLElement|SVGElement|Document|null} [element=null] - The target element to read from. Defaults to document.documentElement.
 * @returns {string|null} The value of the CSS variable, or null if prop is missing.
 */
export const getVar = (prop, element = null) => {
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

/**
 * Sets the value of a CSS custom property (variable).
 * @param {HTMLElement|SVGElement} element - The target element to set the variable on.
 * @param {string} prop - The CSS variable name (with or without '--').
 * @param {string|number} value - The value to assign to the variable.
 * @returns {null|undefined} Returns null if validation fails, otherwise undefined.
 */
export const setVar = (prop, value, element) => {
    if (!element || !prop || !value) return onError()
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    element.style.setProperty(propName, value)
}