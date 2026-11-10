import * as terminal from "./terminal.js"

export const paths = async (obj) => {
    if (!obj || typeof(obj) !== "object") {
        console.error("HELPER RESOLVE PATHS: parameters error")
        info()
        return null
    }

    let errors = {}
    const temp = {}

    await Promise.all(
        Object.entries(obj).map(async ([key, value]) => {
            try {
                const module = await import(value)
                temp[key] = module.default || module
            } catch (error) {
                errors[key] = value
                console.error("HELPER RESOLVE PATHS:", value)
            }
        })
    )

    if (Object.keys(errors).length) return null
    Object.assign(obj, temp)
    return
}

export const info = terminal.add("paths", "fn", {
    blockScroll: {
        description: `🇪🇸 Reemplaza las rutas del objeto con el modulo importado\n
           🇬🇧 Replace object paths with imported modules`,
        params: "object (required)"
    }
})