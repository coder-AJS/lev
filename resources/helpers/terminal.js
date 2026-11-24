import { realType } from "./object.js"
import { recursive } from "./object.js"

export const description = ({
    module = null,
    items = null
} = {}) => {
    /*     let styles = []
     */
    const icons = {
        module: "📌",
        fn: "🧩",
        method: "🔗"
    }

    const colors = {
        module: "color: white; font-weight: bold; font-size: 12px;",
        fn: "color: greenyellow; font-weight: bold; font-size: 12px;",
        method: "color: orange; font-weight: bold; font-size: 12px;",
        errorTitle: "color: tomato; font-size: 12px; font-weight: bold;",
        error: "color: greenyellow; font-size: 12px;",
    }

    const toColor = (text, color) => {
        return {
            text: `%c${text}%c`,
            style: color
        }
    }

    const addTabs = (tabs) => { return " ".repeat(tabs) }

    const addText = (obj, text, jump, color) => {
        if (!color) {
            obj.push(text + "\n".repeat(jump))
            return
        }
        const textColor = toColor(text, color)
        obj.push({ text: textColor.text + "\n".repeat(jump), style: textColor.style })
    }



    const addArrayItems = (array, tabs) => {
        let normalized = realType(array) === "array" ? array : [array]
        normalized.forEach(item => addText(addTabs(tabs) + "   " + item, 1))
        addText("", 2)
    }

    const addObjectItems = (object, tabs) => {
        Object.entries(object).forEach(([key, value]) => {
            const size = key.length
            addText(`${addTabs(tabs + 4)} ${key}`, 0)
            addText(`${addTabs(20 - size)} ${value}`, 1)
        })
        addText("", 2)
    }

    const addDestructured = (boolean, tabs, color) => {
        addText(`${addTabs(tabs)} • Destructured: `, 0)
        boolean
            ? addText(true, 1, color)
            : addText(false, 1, "grey")
    }

    const consoleOutput = (output, mode) => {
        console.log(output)

        output.forEach((item, index) => {
            if (index === 0) console.groupCollapsed(item.text, item.style, "")
            if (mode === "error" && index !== 0) console.trace(item.text, item.style, "")
        })
    }


    let errorReg = []
    addText(errorReg, "TERMINAL HELPER ERROR", 1, colors.errorTitle)

    const primaryValidation = () => {
        if (!module || realType(module) !== "string") addText(errorReg, "module parameter lost", 1, colors.error)
        if (!items || realType(items) !== "object") addText(errorReg, "items parameter lost", 1, colors.error)
    }

    const validateItem = (ar) => {
        const itemsType = ["fn", "method"]
        const descriptionType = ["string", "array"]
        const parsType = ["string", "array", "object"]
        const methodsType = ["object"]

        const isValidtype = itemsType.includes(ar.type)
        if (!ar.type) { addText(errorReg, "type required parameter", 1, colors.error) }
        if (ar.type && !isValidtype) { addText(errorReg, `type invalid parameter`, 1, colors.error) }

        const isValidDescription = descriptionType.includes(realType(ar.description))
        if (!ar.description) addText(errorReg, "descriptionr required paramameter", 1, colors.error)
        if (ar.description && !isValidDescription) addText(errorReg, "description invalid parameter", colors.error) 

        const isValidPars = parsType.includes(realType(ar.pars))
        if (ar.pars && !isValidPars) addText(errorReg, "pars invalid parameter", 1, colors.error)

        const isValidMethods = methodsType.includes(realType(ar.methods))
        if (ar.methods && !isValidMethods) addText(errorReg, "methods invalid parameter", 1, colors.error)
    }

    primaryValidation()
    if (errorReg.length > 1) return consoleOutput(errorReg, "error")

    let correctOutput = []
    addText(correctOutput, icons.module + " " + module.toUpperCase(), 2, colors.module)

    Object.entries(items).forEach(([key, value]) => {
        validateItem(value)


/*         const type = value?.type && icons[value.type] || null
        const description = value?.description || null
        const pars = value?.pars || null
        const methods = value?.methods || null

        if (!type) alert(`${key} - type (${value.type}) not valid`)
        if (!description) alert(`${key} - description not exist`)
        if (methods != null && realType(methods) !== "object") alert(`${key} - methods only can be an object`)
 */
        /* description */
/*         addText("─".repeat(60), 3, "rgb(90, 90, 90)")
        addText(type + " " + key, 2, colors.fn)
        addText(`${addTabs(2)} • Description`, 2)
        addArrayItems(description, 2)

 */        /* pars */
/*         if (pars) {
            const isObject = realType(pars) === "object"
            addText(`${addTabs(2)} • Parameters`, 2)

            if (!isObject) {
                addArrayItems(pars, 4)
                addDestructured(false, 2)
            }

            if (isObject) {
                addObjectItems(pars, 2)
                addDestructured(true, 2, colors.fn)
            }

        }
 */
        /* methods */
/*         if (methods) {
            addText(`${addTabs(2)} • Methods`, 2)

            Object.entries(methods).forEach(([key, value]) => {
                addText(addTabs(5) + "─".repeat(60), 3, "rgb(79, 129, 123)")
                addText(addTabs(3) + "  " + icons.method + " " + key, 2, colors.method)
                addText(`${addTabs(5)} • Description`, 2)
                addArrayItems(value.description, 8)

                if (value.pars) {
                    const isObject = realType(value?.pars) === "object"
                    addText(`${addTabs(5)} • Parameters`, 2)
                    isObject
                        ? addObjectItems(value.pars, 5)
                        : addArrayItems(value.pars, 7)
                    addDestructured(isObject, 5, colors.method)
                    addText("", 2)
                }

                if (!value.pars) addText("", 1)
            })
        }

        if (!methods) addText("", 2)
 */    })

    errorReg.length > 1
        ? consoleOutput(errorReg, "error")
        : console.trace(consoleOutput(correctOutput))
}

export const objectError = async (module, obj) => {
    console.log(module, obj)
    let sections = [`${module.toUpperCase()} ERROR\n\n--------------------------------------------------------\n\n\n`]

    const addText = (text) => {
        console.log(text)
    }
    recursive(obj, addText)
}

const inError = () => [
    `%c[ ERROR ]%c`,
    `color: rgb(252, 75, 57); font-weight: bold; font-size: 12px;`,
    ""
]

export const traceError = (text) => {
    const tag = inError()
    console.groupCollapsed(tag[0] + ` ` + text, tag[1], tag[2])
    console.trace()
    console.groupEnd()
}

export const reportError = (alert, error) => {
    const tag = inError()
    console.groupCollapsed(tag[0] + ` ` + alert, tag[1], tag[2])
    console.error(error)
    console.trace()
    console.groupEnd()
}

export const info = () => description({
    module: "terminal helper",
    items: {

        description: {
            type: "fn",
            description: [
                "🇪🇸 Genera documentacion en consola para modulos.",
                "🇬🇧 Generates console documentation for modules."
            ],
            pars: ["module (required)", "type (required)", "info (required)"]
        }
    }
})
