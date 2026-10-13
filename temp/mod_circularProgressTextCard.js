export const init = async (box) => {
    const compMod = await import("../components/circularProgressCard.js")
    const component = box.appendChild(new compMod.default())

    document.addEventListener("component", (e) => {
        console.log(e.detail.id, e.detail.state)
        component.init()
    })

    await component.configure("css", {
        backgroundImage: "./temp/images/rocky-mountain.jpg",
        mainFont: "oxanium",
        counterFont: "conthrax",
        domWidth: "300px",
        domHeight: "460px"
    })

    await component.configure("logic", {
        id: "card",
        title: "HTML",
        progress: 90
    })

    component.addToNode({ html: "a", style: "a" })

}