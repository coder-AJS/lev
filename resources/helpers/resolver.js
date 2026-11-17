import * as terminal from "./terminal.js"
import * as objects from "./objects.js"

const resolveImports = async (key, value, object) => {
    try {
        const module = await import(value)
        object[key] = module.default || module
        return true
    } catch (error) {
        object[key] = null
        return false
    }
}

export const imports = async (obj) => {
    if (!obj || typeof (obj) !== "object") {
        console.error("HELPER RESOLVE PATHS: parameters error")
        info()
        return null
    }

    const errors = await objects.recursive(obj, resolveImports)
    console.log(errors)
    return
}

export const info = terminal.helper("resolver", "fn", {
    imports: {
        description: [
            "🇪🇸 Reemplaza las rutas del objeto con el modulo importado.",
            "🇬🇧 Replace object paths with imported modules."
        ],
        params: "object (required)"
    }
})