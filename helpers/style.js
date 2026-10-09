export const getVar = (prop, element = null) => {
    if (!prop) return null
    const propName = prop.startsWith("--") ? prop : `--${prop}`
    const target = element || document.documentElement
    return getComputedStyle(target).getPropertyValue(propName).trim()
}