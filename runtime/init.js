const isLocal = window.location.hostname === "localhost" || "127.0.0.1"
const base = isLocal ? window.location.origin : window.location.origin + "/lev"

console.log("level base:", base)
const loader = await import(base + "/runtime/loader.js")

const init = async () => {
    const [helpers] = await Promise.all([
        loader.get({ mode: "helpers", items: null})
    ])

    console.log(helpers)
}

init()