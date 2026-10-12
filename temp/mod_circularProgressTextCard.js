export const init = async (box) => {
    const compMod = await import("../components/circularProgressCard.js")
    const component = box.appendChild(new compMod.default())

    component.configure("css", {
        backgroundImage: "./temp/images/rocky-mountain.jpg",
        mainFont: "oxanium",
        counterFont: "conthrax",
        domWidth: "300px",
        domHeight: "460px"
    })

    component.configure("logic", {
        title: "HTML",
        progress: 90
    })

    component.addToNode({ html: "a", style: "a" })

    component.init()
}