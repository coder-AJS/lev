export const init = async (box) => {
    const compMod = await import("../components/avancedProgressCard001.js")
    const component = box.appendChild(new compMod.default())

    document.addEventListener("component", (e) => {
        console.log(e.detail.id, e.detail.state)
        component.init()
    })

    await component.configure("css", {
        backgroundImage: "./temp/images/rocky-mountain.jpg",
        fontFamily_1: "oxanium",
        fontFamily_2: "conthrax",
    })

    await component.configure("logic", {
        id: "card",
        title: "HTML",
    })

    component.addToNode({ html: "a", style: "a" })

}