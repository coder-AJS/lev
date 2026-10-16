const testBox = document.querySelector("#test")

const components = {
    "textAppear": "./mod_textAppear.js",
    "avancedProgressCard001": "./mod_avancedProgressCard001.js"
}

const load = async (component) => {
    const mod = await import(components[component]).then(mod => mod.init(testBox))

}

load("avancedProgressCard001")
