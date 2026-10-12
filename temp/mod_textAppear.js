export const init = async (box) => {
    const compMod = await import("../components/textAppear.js")
    const component = box.appendChild(new compMod.default())

    component.configure("css", {
        fontFamily: "neuropol",
        fontSize: "60px",
        color: "rgb(200, 200, 200)",
        color2: "blue"
    })

    component.configure("logic", {
        text: "FRONT-END DEVELOPER",
    })

    component.init()
}