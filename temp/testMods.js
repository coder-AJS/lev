const testBox = document.querySelector("#test")

const compMod = await import("../../components/fallBack/textAppear.js")
const component = testBox.appendChild(new compMod.default())

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