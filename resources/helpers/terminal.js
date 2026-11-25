import { realType } from "./object.js"
import { recursive } from "./object.js"

export const description = ({
    module = null,
    items = null
} = {}) => {
    const errorText = []
    const errorStyle = []
    const infoText = []
    const infoStyle = []

    const icons = {
        module: "📌",
        fn: "🧩",
        method: "🔗"
    }

    const colors = {
        limeBold: "color: greenyellow; font-weight: bold; font-size: 12px;",
        orangeBold: "color: orange; font-weight: bold; font-size: 12px;",
        errorTitle: "color: tomato; font-size: 12px; font-weight: bold;",
        error: "color: greenyellow; font-size: 12px;",
        greyLight: "color: rgb(60, 60, 60);",
        greyNormal: "color: grey;"
    }

    const addTabs = (tabs) => { return " ".repeat(tabs) }

    const selectReg = (par) => {
        if (par === "E") return { text: errorText, style: errorStyle }
        if (par === "I") return { text: infoText, style: infoStyle }
    }

    const addText = (regPar, text, newLine, color = null) => {
        const reg = selectReg(regPar)
        const lines = "\n".repeat(newLine)

        reg.text.push(`%c${text}%c${lines}`)
        reg.style.push(color ?? "", "")
    }

    const addTitle = ({ regPar, title, tabs, newLines }) => {
        addText(regPar, `${addTabs(tabs)} ${title}`, newLines, colors.limeBold)
    }

    const addLine = (regPar, length, tabs = 0) => { addText(regPar, `${addTabs(tabs)} ${"─".repeat(length)}`, 1, colors.greyLight) }

    const addArray = (infoReg, array, tabs) => {
        let normalized = realType(array) === "array" ? array : [array]
        normalized.forEach(item => addText(infoReg, `${addTabs(tabs)}   ${item}`, 1))
    }

    const addObject = (regPar, object, tabs) => {
        Object.entries(object).forEach(([key, value]) => {
            const size = key.length
            addText(regPar, `${addTabs(tabs + 2)} ${key}`, 0)
            addText(regPar, `${addTabs(20 - size)} ${value}`, 1)
        })
    }

    const addDestructured = (regPar, boolean, tabs, color) => {
        addText(regPar, `${addTabs(tabs)} • Destructured: `, 0)
        boolean
            ? addText(regPar, true, 1, colors.limeBold)
            : addText(regPar, false, 1, colors.greyNormal)
    }

    const consoleOutput = (mode, reg, style) => {
        console.groupCollapsed(reg[0], style[0], style[1])
        if (mode === "error") reg.forEach((item, index) => index !== 0 && console.trace(item, style[index + 1], style[index + 2]))

        if (mode === "info") {
            const listReg = reg.slice(1).join("")
            const listStyle = style.slice(2)
            console.log(listReg, ...listStyle)
        }
        console.groupEnd()
    }

    const primaryValidation = () => {
        addText("E", "TERMINAL HELPER ERROR", 1, colors.errorTitle)
        if (!module || realType(module) !== "string") addText("E", "module parameter lost", 1, colors.error)
        if (!items || realType(items) !== "object") addText("E", "items parameter lost", 1, colors.error)
    }

    const validateTree = (ar) => {
        const itemsType = ["fn", "method"]
        const descriptionType = ["string", "array"]
        const parsType = ["string", "array", "object"]
        const methodsType = ["object"]

        const isValidtype = itemsType.includes(ar.type)
        if (!ar.type) { addText("E", "type required parameter", 1, colors.error) }
        if (ar.type && !isValidtype) { addText("E", `type invalid parameter`, 1, colors.error) }

        const isValidDescription = descriptionType.includes(realType(ar.description))
        if (!ar.description) addText("E", "descriptionr required paramameter", 1, colors.error)
        if (ar.description && !isValidDescription) addText("E", "description invalid parameter", colors.error)

        const isValidPars = parsType.includes(realType(ar.pars))
        if (ar.pars && !isValidPars) addText("E", "pars invalid parameter", 1, colors.error)

        const isValidMethods = methodsType.includes(realType(ar.methods))
        if (ar.methods && !isValidMethods) addText("E", "methods invalid parameter", 1, colors.error)
    }

    primaryValidation()
    if (errorText.length > 1) return consoleOutput("error", errorText, errorStyle)

    addTitle({ regPar: "I", title: `${icons.module} ${module.toUpperCase()}`, tabs: 0, lines: 0 })

    Object.entries(items).forEach(([key, value], index) => {
        validateTree(value)

        /* title */
        if (index > 0) addLine("I", 60)
        addText("I", "", 2)
        const icon = icons[value.type]
        addTitle({ regPar: "I", title: `${icon} ${key.toUpperCase()}`, tabs: 0, lines: 0 })
        addText("I", ` ()`, 2, colors.greyNormal)

        /* description */
        addText("I", "    • Description", 2)
        addArray("I", value.description, 3)
        addText("I", "", 2)

        /* params */
        if (value.pars) {
            addText("I", "    • Parameters", 2)
            const parsType = realType(value.pars)
            if (parsType === "array" || parsType === "string") addArray("I", value.pars, 3)
            if (parsType === "object") {
                addObject("I", value.pars, 3)
            }
            addText("I", "", 2)

            /* destructured */
            addDestructured("I", parsType === "object", 3,)
            addText("I", "", 2)
        }

        /* methods */
        if (value.methods) {
            addText("I", "    • Methods", 2)
            Object.entries(value.methods).forEach((item, index) => {
                const title = item[0]
                const pars = item[1]

                if (index !== 0) {
                    addLine("I", 56, 4)
                    addText("I", "", 2)
                }

                addText("I", `${addTabs(4)} ${icons.method} ${title}`, 2, colors.orangeBold)
                Object.entries(pars).forEach(([key, value]) => {
                    console.log(key, value)
                })
                addText("I", "", 2)

            })
        }

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
        addaddArray(description, 2)

 */        /* pars */
/*         if (pars) {
            const isObject = realType(pars) === "object"
            addText(`${addTabs(2)} • Parameters`, 2)

            if (!isObject) {
                addaddArray(pars, 4)
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
                addaddArray(value.description, 8)

                if (value.pars) {
                    const isObject = realType(value?.pars) === "object"
                    addText(`${addTabs(5)} • Parameters`, 2)
                    isObject
                        ? addObjectItems(value.pars, 5)
                        : addaddArray(value.pars, 7)
                    addDestructured(isObject, 5, colors.method)
                    addText("", 2)
                }

                if (!value.pars) addText("", 1)
            })
        }

        if (!methods) addText("", 2)
 */    })

    errorText.length > 1
        ? consoleOutput("error", errorText, errorStyle)
        : consoleOutput("info", infoText, infoStyle)
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
