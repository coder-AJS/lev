const testBox = document.querySelector("#test")

/* test textAppear */
/* const compMod = await import("../components/textAppear.js")
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

component.init() */

/* test cards */
const compMod = await import("../components/circularProgressCard.js")
const component = testBox.appendChild(new compMod.default())

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

component.addToNode({html: "a", style: "a"})

component.init()
