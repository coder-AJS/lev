import * as terminal from "./terminal.js"

export const blockScroll = (element, boolean) => {
    if (!element) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.overflow = boolean ? "hidden" : ""
}

export const info = terminal.helper("viewPort", "fn", {
    blockScroll: {
        description: [
            "🇪🇸 Bloquea o desbloquea el scroll de un elemento.",
            "🇬🇧 Blocks or unblocks the scroll of an element."
        ],
        params: ["element (required)", "boolean (required)"]
    }
})