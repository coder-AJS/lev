const testBox = document.querySelector("#test")

const components = {
    "textAppear": "./mod_textAppear.js",
    "circularProgressTextCard": "./mod_circularProgressTextCard.js"
}

const load = async (component) => {
    const mod = await import(components[component]).then(mod => mod.init(testBox))

}

load("circularProgressTextCard")
