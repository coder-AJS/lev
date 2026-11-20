export const detect = async (container, helper, base) => {
    const animations = Array.from(container.querySelectorAll("[data-animation]"))
    let prepared = {}
    let error = {}

    const list = {
        text: base + "/moveToLevel/text.js"
    }

    await helper.resolver.imports(list)

    animations.forEach(item => {

        if (!item.id) {
            console.error("HELPER ANIMATIONS ERROR: not id in", item)
            return
        }

        const data = item.dataset.animation?.split(".") || null
        if (!data) console.error("HELPER ANIMATIONS ERROR: no data-animation", item)

        const type = list[data?.[0]] ? data[0] : null
        const animation = list[data?.[0]] ? data[1] : null

        if (!type || !animation) {
            error[item.id] = {
                name: data[1],
                family: data[0],
                mod: list[data[0]]?.[data[1]] || null,
                ref: item
            }
        } else {
            prepared[item.id] = {
                name: data[1],
                family: data[0],
                mod: list[data[0]][data[1]],
                ref: item
            }
        }

    })

    if (Object.keys(error).length) {
        console.error("HELPER ANIMATION ERROR:", error)
        return error
    }
    return prepared
}