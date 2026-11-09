const isLocal = window.location.hostname === "127.0.0.1"
const base = isLocal ? "" : "/cv"

console.log(base)

export const get = async ({ mode = null, items = null } = {}) => {
    let state = true
    const modes = {
        helpers: base + "/config/helpers.js"
    }

    if (!(mode in modes)) {
        console.error("LEVEL LOAD: mode unknowed")
        return null
    }

    if (items && !Array.isArray(items)) {
        console.error("LEVEL LOAD: items is not an array")
        return null
    }

    const moduleConf = await import(modes[mode]).then(mod => mod.default)

    let itemsList = {}
    if (items) {
        for (const item of items) {
            if (state && !(item in moduleConf)) {
                console.error("LEVEL LOADER:", item, "unknowed item")
                state = false
                return null
            }
            itemsList[item] = moduleConf[item]
        }
    } 
        
    if (!items) itemsList = moduleConf

    if (!state) return
    await Promise.all(Object.entries(itemsList).map(async ([key, value]) => await import(value).then(mod => itemsList[key] = mod)))
    return itemsList
}
