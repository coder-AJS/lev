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
    content = null
} = {}) => {
    const info = () => console.table({ tag: "string", className: "string", id: "string", attributes: "Object" })
    let parsError = false

    if (!tag) parsError = true
    if (id && typeof id !== "string") parsError = true
    if (attributes && typeof attributes !== "object") parsError = true
    if (className && typeof className !== "string") parsError = true
    if (parsError) return onError(info)

    const element = document.createElement(tag)
    if (className) className.split(" ").forEach(item => element.classList.add(item))
    if (id) element.id = id
    if (attributes) Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    if (content) element.textContent = content
    return element
}

export const inject = ({
    tag = null,
    parent = document.body,
    id = null,
    className = null,
    attributes = null,
    content = null
} = {}) => {
    const info = () => console.table({ tag: "string", className: "string", id: "string", attributes: "Object" })

    const newElement = add({
        'tag': tag,
        'id': id,
        'className': className,
        'attributes': attributes,
        'content': content
    })

    if (!newElement) return onError(info)
    parent.appendChild(newElement)
    return newElement
}

/* info */
export const info = terminal.description({
    module: "dom helper",
    type: "fn",
    info: {
        add: {
            description: [
                "🇪🇸 Devuelve el elemento sin inyectarlo en el dom.",
                "🇬🇧 Return new element without dom injection."
            ],
            params: {
                tag: "required",
                id: "optional",
                className: "optional",
                attributes: "optional",
                content: "optional"
            }
        },
        inject: {
            description: [
                "🇪🇸 Devuelve el elemento inyectado en su contenedor.",
                "🇬🇧 Return the injected element into container."
            ],
            params: {
                tag: "required",
                parent: "default (body)",
                id: "optional",
                className: "optional",
                attributes: "optional",
                content: "optional"
            }
        }
    }
})