/** return a new html element without dom's injection
* @typedef {Object} AddOptions
* @property {string} tag
* @property {string} [className=null]
* @property {string} [id=null]
* @property {Object} [attributes=null]
*/
/** 
 * Return a new HTML element without DOM injection
 * @param {AddOptions} options
 * @returns {HTMLElement|null}
 */

export const add = ({
    tag = null,
    id = null,
    className = null,
    attributes = null,
} = {}) => {
    let parsError = false

    if (!tag) parsError = true
    if (id && typeof id !== "string") parsError = true
    if (attributes && typeof attributes !== "object") parsError = true
    if (parsError) {
        console.trace("dom HELPER - parameters error")
        return null
    }

    const element = document.createElement(tag)
    className && className.split(" ").forEach(item => element.classList.add(item))
    id && (element.id = id)
    attributes && Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    return element
}

/** adds a new html element directly to dom
* @typedef {Object} AddToDomOptions
* @property {string} tag
* @property {HTMLElement} [parent=document.body]
* @property {string} [className=null]
* @property {string} [id=null]
* @property {Object} [attributes=null]
*/
/** 
 * Adds a new HTML element directly to the DOM
 * @param {AddToDomOptions} options
 * @returns {HTMLElement|null}
 */

export const addToDom = ({
    tag = null,
    id = null,
    className = null,
    attributes = null,
    parent = document.body
} = {}) => {
    const newElement = add({
        "tag": tag,
        "id": id,
        "className": className,
        "attributes": attributes
    })

    if (!newElement) return null
    parent.appendChild(newElement)
    return newElement
}