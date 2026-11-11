const isLocal = window.location.hostname === "localhost" || "127.0.0.1"
const base = isLocal ? window.location.origin : window.location.origin + "/lev"

console.log("level base:", base)
const load = await import(base + "/runtime/loader.js")

const init = async () => {
    const [helpers] = await Promise.all([
        load.get({ mode: "helpers", items: null})
    ])

    console.log(helpers)
    helpers.terminal.info()
}

init()