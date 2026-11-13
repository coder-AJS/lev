import * as terminal from "./terminal.js"

export const imports = async (obj) => {
    if (!obj || typeof (obj) !== "object") {
        console.error("HELPER RESOLVE PATHS: parameters error")
        info()
        return null
    }

    const resolveImports = async (path) => {
        try {
            const module = await import(path)
            return { module: module.default || module, error: null }
        } catch (error) {
            return { module: null, error: error }
        }
    }

    const recursive = async (object, callback) => {
        if (!callback) {
            console.trace("HELPER RECURSIVE ERROR: no callback")
            return
        }

        const errors = {}

        await Promise.all(
            Object.entries(object).map(async ([key, value]) => {
                if (typeof (value) === "object" && value) {
                    const error = await recursive(value, callback)
                    if (Object.keys(error).length) errors[key] = error
                    return
                }

                const result = await callback(value)

                if (result.module) object[key] = result.module
                if (result.error) errors[key] = result.error
            })
        )
        return errors
    }

    const errors = await recursive(obj, resolveImports)
    if (Object.keys(errors).length) terminal.objectError("resolver helper", errors)
    return
}

export const info = terminal.helper("resolver", "fn", {
    paths: {
        description: [
            "🇪🇸 Reemplaza las rutas del objeto con el modulo importado.",
            "🇬🇧 Replace object paths with imported modules."
        ],
        params: "object (required)"
    }
})