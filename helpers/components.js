export const add = ({
    module = null,
    parent = null,
    css = null,
    logic = null,
    node = null
} = {}) => {
    if (!module || !parent || !logic.id) {
        console.trace("add error: lost parametres")
        return null
    }
    const instance = prepare({ module, css, logic, node })
    parent.appendChild(instance)
    return instance
}

export const prepare = ({
    module = null,
    css = null,
    logic = null,
    node = null
} = {}) => {
    if (!module || !logic.id) {
        console.trace("add error: lost parametres")
        return null
    }
    const instance = new module.default()
    css && instance.configure("css", css)
    logic && instance.configure("logic", logic)
    node && instance.configure("node", node)
    return instance
}