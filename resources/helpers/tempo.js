import * as terminal from "./terminal.js"

const onError = (info) => {
    console.trace("tempo HELPER - parameters error")
    info()
    return null
}

export const getTempo = (element) => {
    const info = () => console.table({ element: "HTMLElement | SVGElement" })
    if (!element) return onError(info)

    const transicion = getComputedStyle(element).getPropertyValue("transition-duration") || "0s"

    if (transicion.includes("ms")) return parseFloat(transicion)
    return parseFloat(transicion) * 1000
}

export const sleep = async (ms) => {
    const info = () => console.table({ ms: "number" })
    if (!ms) return onError(info)
    
    await new Promise(resolve => setTimeout(resolve, ms))
}

export const sleepTempo = async (element) => {
    const info = () => console.table({ element: "HTMLElement | SVGElement" })
    if (!element) return onError(info)
    
    await sleep(getTempo(element))
}

export const info = terminal.helper("tempo", "fn", {
    getTempo: {
        description: [
            "🇪🇸 Devuelve la duracion de transicion de un elemento en ms.",
            "🇬🇧 Return transition duration of an element in ms."
        ],
        params: "element (required)"
    },
    sleep: {
        description: [
            "🇪🇸 Pausa la ejecucion durante X ms.",
            "🇬🇧 Pauses execution X ms."
        ],
        params: "ms (required)"
    },
    sleepTempo: {
        description: [
            "🇪🇸 Pausa la ejecucion durante el tempo de la transicion de un elemento.",
            "🇬🇧 Pauses execution based on the transition duration of an element."
        ],
        params: "element (required)"
    }
})
