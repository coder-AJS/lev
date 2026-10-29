export const addComponent = async ({
    module = null,
    parent = null,
    css = null,
    logic = null,
    node = null,

} = {}) => {
    console.trace("DEPRECATED USE ADD")
    if (!module || !parent) {
        console.error("addComponent error: lost parametres")
        return null
    }
    const instance = new module.default()
    parent.appendChild(instance)
    css && await instance.configure("css", css)
    logic && await instance.configure("logic", logic)
    node && await instance.configure("node", node)
    return instance
}

export const add = async ({
    module = null,
    parent = null,
    css = null,
    logic = null,
    node = null
} = {}) => {
    if (!module || !parent) {
        console.trace("add error: lost parametres")
        return null
    }
    const instance = new module.default()
    parent.appendChild(instance)
    css && await instance.configure("css", css)
    logic && await instance.configure("logic", logic)
    node && await instance.configure("node", node)
    return instance
}