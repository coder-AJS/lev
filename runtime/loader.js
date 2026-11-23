const isLocal =  ["localhost", "127.0.0.1"].includes(window.location.hostname)
const base = isLocal ? "" : "/lev"

if (base === "") console.log("level base: local")

export const get = async ({ mode = null, items = null } = {}) => {
    let state = true
    let itemsAr = items
    if (items) itemsAr = Array.isArray(items) ? items : [items]

    const modes = {
        helpers: base + "./../config/helpers.js"
    }

    if (!(mode in modes)) {
        console.error("LEVEL LOAD: mode unknowed")
        return null
    }

    if (itemsAr && !Array.isArray(itemsAr)) {
        console.error("LEVEL LOAD: items is not an array")
        return null
    }

    const moduleConf = await import(modes[mode]).then(mod => mod.default)

    let itemsList = {}
    if (itemsAr) {
        for (const item of itemsAr) {
            if (state && !(item in moduleConf)) {
                console.error("LEVEL LOADER:", item, "unknowed item")
                state = false
                return null
            }
            itemsList[item] = moduleConf[item]
        }
    }

    if (!itemsAr) itemsList = moduleConf
    await Promise.all(Object.entries(itemsList).map(async ([key, value]) => await import(value).then(mod => itemsList[key] = mod)))
    return itemsList
}
