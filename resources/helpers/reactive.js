import * as terminal from "./terminal.js"

export const newReactive = () => {
    let object = {}
    let listenMap = {}

    const normalizeArray = (array) => {
        return Array.isArray(array) ? array : [array]
    }

    const { proxy, revoke } = Proxy.revocable(object, {
        
        set(object, name, value) {
            if (value === object[name]) return true

            object[name] = value
            listenMap[name] ??= []
            listenMap[name].forEach(listener => { 
                try {listener(value) }
                catch (error) {console.error(`reactive: ${name} error in listener:\n`, listener, error)}
            })
            return true
        },

        deleteProperty(object, name) {
            delete object[name]
            delete listenMap[name]
            return true
        }
    })

    object.add = ({ name = null, value = null, listeners = null } = {}) => {
        if (name === null || value === undefined) {
            console.error("reactive.add received invalid parametres")
            return
        }

        if (name in object) {
            console.error(`reactive.add ${name} previously added`)
            return
        }

        listenMap[name] = listeners ? normalizeArray(listeners) : []
        object[name] = value
        return proxy
    }

    object.addTo = ({ name = null, listeners = null } = {}) => {
        if (name === null || listeners === null) {
            console.error("reactive.addTo received invalid parametres")
            return
        }

        if (!(name in object)) {
            console.error(`reactive.addTo not exist prop: `, name)
            return
        }

        const newListeners = normalizeArray(listeners)
        newListeners.forEach(item => listenMap[name].push(item))
    }

    object.remove = ({ name = null, listeners = null, all = false } = {}) => {
        if (name === null || (listeners === null && !all)) {
            console.error("reactive.remove received invalid name")
            return
        }

        if (!(name in listenMap)) {
            console.error(`reactive.remove not exist prop: `, name)
            return
        }

        if (all) {
            listenMap[name] = []
        } else {
            const normalizedListeners = normalizeArray(listeners)
            const list = listenMap[name].filter(item => !normalizedListeners.includes(item))
            listenMap[name] = list.length ? list : []
        }
    }

    object.getProps = () => Object.fromEntries(Object.entries(object).filter(([_, value]) => typeof value !== "function"))
    object.props = () => ({ ...object })

    object.listeners = (prop = null) => {
        if (prop !== null && !(prop in listenMap)) {
            console.error(`reactive.getListeners no exist: `, prop)
            return
        }
        return prop !== null ? listenMap[prop] : listenMap
    }

    object.destroy = () => {
        object = null
        listenMap = null
        revoke()
    }

    return proxy
}

/* info */
export const info = terminal.add("newReactive", "method", {
    add: {
        description: "Adds a new reactive property with optional listeners",
        params: {
            name: "required",
            value: "required",
            listeners: "optional"
        }
    },
    addTo: {
        description: "Adds new listeners to an existing reactive property",
        params: {
            name: "required",
            listeners: "required"
        }
    },
    remove: {
        description: "Removes specific listeners or clears all listeners for a property",
        params: {
            name: "required",
            listeners: "optional",
            all: "default (false)"
        }
    },
    props: {
        description: "Returns a plain object containing the reactive data properties",
    },
    listeners: {
        description: "Retrieves listeners for a specific property or for all properties",
        params: "prop (optional)"
    },
    destroy: {
        description: "Cleans up the reactive instance, nullifies references, and revokes the proxy",
    }
})