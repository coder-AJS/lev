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

export const info = terminal.add("tempo", "fn", {
    getTempo: {
        description: "Gets the transition duration of an element in milliseconds",
        params: "element (required)"
    },
    sleep: {
        description: "Pauses execution for a specified number of milliseconds",
        params: "ms (required)"
    },
    sleepTempo: {
        description: "Pauses execution based on the transition duration of an element",
        params: "element (required)"
    }
})
