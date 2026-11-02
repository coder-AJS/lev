import * as terminal from "./terminal.js"

const onError = (info) => {
    console.trace("dom HELPER - parameters error")
    info()
    return null
}

export const add = ({
    tag = null,
    id = null,
    className = null,
    attributes = null,
} = {}) => {
    const info = () => console.table({ tag: "string", className: "string (optional)", id: "string (optional)", attributes: "Object (optional)" })
    let parsError = false

    if (!tag) parsError = true
    if (id && typeof id !== "string") parsError = true
    if (attributes && typeof attributes !== "object") parsError = true
    if (parsError) return onError(info)

    const element = document.createElement(tag)
    className && className.split(" ").forEach(item => element.classList.add(item))
    id && (element.id = id)
    attributes && Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    return element
}

export const inject = ({
    tag = null,
    parent = document.body,
    id = null,
    className = null,
    attributes = null
} = {}) => {
    const info = () => console.table({ tag: "string", className: "string (optional)", id: "string (optional)", attributes: "Object (optional)" })

    const newElement = add({
        "tag": tag,
        "id": id,
        "className": className,
        "attributes": attributes
    })

    if (!newElement) return onError(info)
    parent.appendChild(newElement)
    return newElement
}

/* DEPRECATED */
export const addTo = ({
    tag = null,
    parent = document.body,
    id = null,
    className = null,
    attributes = null
} = {}) => {
    console.trace("DEPRECATED USE ADDTO")
    const info = () => console.table({ tag: "string", className: "string (optional)", id: "string (optional)", attributes: "Object (optional)" })

    const newElement = add({
        "tag": tag,
        "id": id,
        "className": className,
        "attributes": attributes
    })

    if (!newElement) return onError(info)
    parent.appendChild(newElement)
    return newElement
}

/* info */
export const info = terminal.info("dom", "fn", {
    add: {
        description: "return a new html element without dom's injection",
        params: {
            tag: "required",
            id: "optional",
            className: "optional",
            attributes: "optional"
        }
    },
    inject: {
        description: "adds a new html element directly to dom",
        params: {
            tag: "required",
            parent: "default (body)",
            id: "optional",
            className: "optional",
            attributes: "optional"
        }
    }
})