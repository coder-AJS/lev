import * as terminal from "./terminal.js"

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
    instance.configure("logic", logic)
    css && instance.configure("css", css)
    node && instance.configure("node", node)
    return instance
}

/* info */
export const info = terminal.info("components", "fn", {
    prepare: {
        description: "create component instance and preload resources",
        params: {
            module: "required",
            logic: "required",
            css: "optional",
            node: "optional"
        }
    },
    add: {
        description: "create component instance and inject on element",
        params: {
            module: "required",
            parent: "required",
            logic: "required",
            css: "optional",
            node: "optional"
        },
    }
})