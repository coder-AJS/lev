

/* appearText */

const mod = await import("./components/fallBack/textAppear.js")
const comp = new mod.default

comp.configure({
    color: "white"
})

document.body.appendChild(comp)
comp.init()

await new Promise(resolve => setTimeout(resolve, 1000))

comp.update({color: "green"})