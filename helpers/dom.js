export const addToDom = ({
    tag = null,
    className = [],
    id = null,
    parent = document.body,
    attributes = {}
} = {}) => {
    const newElement = add({
        "tag": tag,
        "className": className,
        "id": id,
        "attributes": attributes
    })
    parent.appendChild(newElement)
    return newElement
}

export const add = ({
    tag = null,
    className = [],
    id = null,
    attributes = {}
} = {}) => {
    let parsError = false
    if (!tag) parsError = true
    if (className && !Array.isArray(className)) parsError = true
    if (id && typeof id !== "string") parsError = true
    if (attributes && typeof attributes !== "object") parsError = true

    if (parsError) {
        console.log("addToDom HELPER - parameters error")
        return null
    }

    const element = document.createElement(tag)
    className && className.forEach(item => element.classList.add(item))
    id && (element.id = id)
    attributes && Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    return element
}