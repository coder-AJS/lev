const onError = (info) => {
    console.trace("dom HELPER - parameters error")
    info()
    return null
}

/** return a new html element without dom's injection
* @property {Object} options
* @property {string} tag
* @property {string} [className=null]
* @property {string} [id=null]
* @property {Object} [attributes=null]
* @returns {HTMLElement|null}
*/

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


/** adds a new html element directly to dom
* @property {Object} options
* @property {string} tag
* @property {HTMLElement} [parent=document.body]
* @property {string} [className=null]
* @property {string} [id=null]
* @property {Object} [attributes=null]
* @returns {HTMLElement|null}
*/

export const addToDom = ({
    tag = null,
    id = null,
    className = null,
    attributes = null,
    parent = document.body
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