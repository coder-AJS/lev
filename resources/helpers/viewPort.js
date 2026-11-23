import * as terminal from "./terminal.js"

export const blockScroll = (element, boolean) => {
    if (!element) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.overflow = boolean ? "hidden" : ""
}

export const info = () => terminal.description({
    module: "viewPort helper",
    items: {

        blockScroll: {
            type: "fn",
            description: [
                "🇪🇸 Bloquea o desbloquea el scroll de un elemento.",
                "🇬🇧 Blocks or unblocks the scroll of an element."
            ],
            pars: ["element (required)", "boolean (required)"]
        }
    }
})