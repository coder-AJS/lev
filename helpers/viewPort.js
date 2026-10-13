export const blockScroll = (element, bol) => {
    if (!element || !bol) {
        console.error("helper error: blockScroll parametres")
        return
    }
    element.style.scroll = bol ? "hidden" : ""
}