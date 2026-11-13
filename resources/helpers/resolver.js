import * as terminal from "./terminal.js"

export const paths = async (obj) => {
    if (!obj || typeof (obj) !== "object") {
        console.error("HELPER RESOLVE PATHS: parameters error")
        info()
        return null
    }

    let errors = []

    const resolvePaths = async (object) => {
        const temp = {}

        await Promise.all(
            Object.entries(object).map(async ([key, value]) => {
                if (typeof (value) === "object" && value) {
                    temp[key] = await resolvePaths(value)
                    return
                }

                try {
                    const module = await import(value)
                    temp[key] = module.default || module
                } catch (error) {
                    errors.push({ key, value, error })
                    temp[key] = value
                }
            })
        )
        return temp
    }

    const objectResolved = await resolvePaths(obj)
    if (errors.length) console.error("HELPER RESOLVE PATHS:", errors)
    Object.assign(obj, objectResolved)
    return
}

export const info = terminal.add("paths", "fn", {
    blockScroll: {
        description: [
            "🇪🇸 Reemplaza las rutas del objeto con el modulo importado.",
            "🇬🇧 Replace object paths with imported modules."
        ],
        params: "object (required)"
    }
})