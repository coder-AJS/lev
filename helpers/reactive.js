export const reactive = (object, arrayFn = null) => {

    let listeners = {}
    arrayFn && (listeners[Object.keys(object)[0]] = Array.isArray(arrayFn) ? arrayFn : [arrayFn])

    const { proxy, revoke } = Proxy.revocable(object, {
        set(object, prop, value) {
            object[prop] = value
            listeners?.[prop]?.forEach(fn => {
                try { fn(value) }
                catch (error) { console.error("Error in reactive callBack: ", error, fn) }
            })
            return true
        }
    })

    proxy.add = (prop, functions = null) => {
        if (typeof prop !== "object" && prop !== null) {
            console.error("reactive: prop is not an object")
            return null
        }

        const name = Object.keys(prop)[0]
        const value = Object.values(prop)[0]

        if (name in proxy) {
            console.error(`reactive: ${name} already declared, use addTo() if needed: `, proxy)
            return null
        }

        proxy[name] = value

        if (functions) {
            !Array.isArray(functions) && (functions = [functions])
            listeners[name] = []
            functions.forEach(fn => listeners[name].push(fn))
        }
    }

    proxy.addTo = (prop, functions) => {
        if (typeof prop !== "string") {
            console.error(`reactive: ${prop} is not string`)
            return null
        }

        if (!(prop in proxy)) {
            console.error(`reactive: ${prop} is not in reactive object`, proxy)
            return null
        }

        if (!functions) {
            console.error(`reactive: ${prop} funtions: `, functions)
            return null
        }

        !Array.isArray(functions) && (functions = [functions])
        listeners[prop] ??= []
        functions.forEach(item => {
            if (typeof item === 'function' && !listeners[prop].includes(item)) listeners[prop].push(item)
        })
    }

    proxy.getProps = () => Object.fromEntries(Object.entries(proxy).filter(([key, value]) => typeof value !== "function"))

    proxy.getListeners = (prop) => {
        if (!(prop in proxy)) {
            console.error(`reactive: ${prop} doesn't exist in: `, proxy)
            return null
        }

        if (!(prop in listeners)) {
            console.error(`reactive: ${prop} has no listeners yet: `, proxy)
            return null
        }
        return listeners[prop]
    }

    proxy.destroy = () => {
        listeners = null
        revoke()
    }

    return proxy
}