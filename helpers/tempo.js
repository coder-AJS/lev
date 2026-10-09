export const getTempo = (element) => {
    if (!element) return null
    const transicion = getComputedStyle(element).getPropertyValue("transition-duration") || "0s"

    if (transicion.includes("ms")) return parseFloat(transicion)
    return parseFloat(transicion) * 1000
}

export const sleep = async (ms) => {
    if (!ms) return null
    await new Promise(resolve => setTimeout(resolve, ms))
}

export const sleepTempo = async (element) => {
    if (!element) return null
    await sleep(getTempo(element))
}