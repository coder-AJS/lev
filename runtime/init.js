const isLocal = window.location.hostname === "127.0.0.1"
const base = isLocal ? "" : "/cv"
const load = await import(base + "/runtime/loader.js")

const init = async () => {
    const [helpers] = await Promise.all([
        load.get({ mode: "helpers", items: null})
    ])

    console.log(helpers)
}

init()