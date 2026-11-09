import * as terminal from "./terminal.js"

export const blockScroll = (element, boolean) => {
    if (!element) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.overflow = boolean ? "hidden" : ""
}

export const info = terminal.add("viewPort", "fn", {
    blockScroll: {
        description: "Blocks or unblocks the scroll of a specified element",
        params: ["element (required)", "boolean (required)"]
    }
})