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
export const info = terminal.add("components", "fn", {
    prepare: {
        description: [
            "🇪🇸 Instancia el componente y pregarga los recursos",
            "🇬🇧 Create component instance and preload resources"
        ],
        params: {
            module: "required",
            logic: "required",
            css: "optional",
            node: "optional"
        }
    },
    add: {
        description: [
            "🇪🇸 Instancia el componente y lo inyecta en su elemento padre.",
            "🇬🇧 Create component instance and inject on parent element."
        ],
        params: {
            module: "required",
            parent: "required",
            logic: "required",
            css: "optional",
            node: "optional"
        },
    }
})