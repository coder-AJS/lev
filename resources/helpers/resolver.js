import * as terminal from "./terminal.js"
import * as object from "./object.js"

const resolveImports = async (key, value, object) => {
    try {
        const module = await import(value)
        object[key] = module.default || module
        return true
    } catch (error) {
        terminal.reportError("HELPER RESOLVE IMPORTS", value)
        object[key] = null
        return false
    }
}

export const imports = async (obj) => {
    if (!obj || typeof (obj) !== "object") {
        terminal.reportError("HELPER RESOLVE IMPORTS PARAMETERS", obj)
        info()
        return null
    }

    const errors = await object.recursive(obj, resolveImports)
    return
}

export const info = terminal.description({
    module: "resolver",
    type: "fn",
    info: {
        imports: {
            description: [
                "🇪🇸 Reemplaza las rutas del objeto con el modulo importado.",
                "🇬🇧 Replace object paths with imported modules."
            ],
            params: "object (required)"
        }
    }
})