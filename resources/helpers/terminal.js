import { realType, recursive } from "./object.js"

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
        limeBold: "color: greenyellow; font-size: 12px; font-weight: bold; ",
        lime: "color: greenyellow; font-size: 12px;",
        orange: "color: orange; font-size: 12px;",
        errorTitle: "color: tomato; font-size: 12px; font-weight: bold;",
        error: "color: tomato; font-size: 12px;",
        greyLight: "color: rgb(60, 60, 60);",
        greyNormal: "color: grey;"
    }

    const addTabs = (tabs) => { return " ".repeat(Math.max(0, tabs)) }
    const addLine = (regPar, length, tabs = 0) => { addText(regPar, `${addTabs(tabs)} ${"─".repeat(length)}`, 0, 1, colors.greyLight) }

    const selectReg = (par) => {
        if (par === "error") return { text: errorText, style: errorStyle }
        if (par === "info") return { text: infoText, style: infoStyle }
    }

    const addText = (regPar, text, tabs, newLine, color) => {
        const reg = selectReg(regPar)
        const lines = "\n".repeat(newLine)
        reg.text.push(`${addTabs(tabs)}%c${text}%c${lines}`)
        reg.style.push(color ?? "", "")
    }

    const addArray = (parReg, array, tabs) => {
        let normalized = realType(array) === "array" ? array : [array]
        normalized.forEach(item => addText(parReg, `${addTabs(tabs + 1)} ${item}`, 0, 1))
    }

    const addObject = (regPar, object, tabs) => {
        Object.entries(object).forEach(([key, value]) => {
            const size = key.length
            addText(regPar, `${addTabs(tabs + 1)} ${key}`, 0, 0)
            addText(regPar, `${addTabs(20 - size)} ${value}`, 0, 1)
        })
    }

    /* sections */
    const addName = (name, color) => {
        addText("info", "", 0, 2)
        addText("info", name, 0, 0, color)
        addText("info", " ()", 0, 2, colors.greyNormal)
    }

    const addDescription = (description, tabs) => {
        addText("info", "• Description", tabs, 2)
        addArray("info", description, tabs + 2)
        addText("info", "", 0, 2)
    }

    const addPars = (pars, tabs) => {
        addText("info", "• Parameters", tabs, 2)
        const parsType = realType(pars)
        if (parsType === "array" || parsType === "string") addArray("info", pars, tabs + 2)
        if (parsType === "object") addObject("info", pars, tabs + 2)
        addText("info", "", 0, 2)

        addDestructured("info", tabs, 3, parsType === "object")
    }

    const addDestructured = (regPar, tabs, lines, boolean) => {
        addText(regPar, `${addTabs(tabs)}• Destructured:`, 0, 0)
        boolean
            ? addText(regPar, true, 1, lines, colors.limeBold)
            : addText(regPar, false, 1, lines, colors.greyNormal)
    }

    /* output */
    const consoleOutput = (mode, reg, style) => {
        console.groupCollapsed(reg[0], style[0], style[1])
        if (mode === "error") {
            reg.forEach((item, index) => index !== 0 && console.log(item, style[index * 2], style[index * 2 + 1]))
            console.trace()
        }

        if (mode === "info") {
            const listReg = reg.slice(1).join("")
            const listStyle = style.slice(2)
            console.log(listReg, ...listStyle)
        }
        console.groupEnd()
    }

    /* validations */
    const primaryValidation = () => {
        addText("error", "TERMINAL HELPER ERROR", 0, 1, colors.errorTitle)
        if (!module || realType(module) !== "string") addText("error", "module parameter lost", 0, 1, colors.error)
        if (!items || realType(items) !== "object") addText("error", "items parameter lost", 0, 1, colors.error)
    }

    const validateTree = (ar) => {
        const itemsType = ["fn", "method"]
        const descriptionType = ["string", "array"]
        const parsType = ["string", "array", "object"]
        const methodsType = ["object"]

        const isValidtype = itemsType.includes(ar.type)
        if (!ar.type) { addText("error", "type required parameter", 0, 1, colors.error) }
        if (ar.type && !isValidtype) { addText("error", `type invalid parameter`, 0, 1, colors.error) }

        const isValidDescription = descriptionType.includes(realType(ar.description))
        if (!ar.description) addText("error", "description required paramameter", 0, 1, colors.error)
        if (ar.description && !isValidDescription) addText("error", "description invalid parameter", 0, 1, colors.error)

        const isValidPars = parsType.includes(realType(ar.pars))
        if (ar.pars && !isValidPars) addText("error", "pars invalid parameter", 0, 1, colors.error)

        const isValidMethods = methodsType.includes(realType(ar.methods))
        if (ar.methods && !isValidMethods) addText("error", "methods invalid parameter", 0, 1, colors.error)
    }

    /* generate */
    const generateInfo = (par) => {
        Object.entries(par).forEach(([name, items], index) => {
            validateTree(items)
            index > 0 && addLine("info", 60)

            /* name */
            addName(`${icons[items.type]} ${name}`, colors.lime)

            /* description */
            addDescription(items.description, 4)

            /* params */
            if (items.pars) addPars(items.pars, 4)

            /* methods */
            if (items.methods) {
                addText("info", "• Methods", 4, 0)
                Object.entries(items.methods).forEach(([name, item], index) => {
                    index > 0 && addLine("info", 56, 4)
                    addName(`${addTabs(4)} ${icons.method} ${name}`, colors.orange)
                    addDescription(item.description, 10)
                    item.pars && addPars(item.pars, 10)
                })
            }
        })

        errorText.length > 1
            ? consoleOutput("error", errorText, errorStyle)
            : consoleOutput("info", infoText, infoStyle)
    }

    primaryValidation()
    if (errorText.length > 1) return consoleOutput("error", errorText, errorStyle)

    /* gererate info */
    addText("info", `${icons.module} ${module.toUpperCase()}`, 0, 0, colors.limeBold)
    generateInfo(items)
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
