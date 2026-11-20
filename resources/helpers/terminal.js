import { realType } from "./object.js"
import { recursive } from "./object.js"

/* export const description = ({
    module = null,
    items = null
} = {}) => {
    const modulePar = module && (typeof (module) === "string")
    const itemPar = Array.isArray(items)

    if (!modulePar || !itemPar) {
        traceError(`${module} - invalid parameters`)
        info()
        return null
    }

    let error = false
    const color = "greenyellow"
    let sections = [`${module.toUpperCase()}\n\n--------------------------------------------------------\n\n\n`]

    Object.entries(items).forEach(([name, value], index) => {
        if (error) {
            return
        }

        let icon
        const type = value.type || "fn" 
        const destructured = value.destructured || false 
        const params = value.params || null
        
        type === "fn" && (icon = "🧩")
        type === "method" && (icon = "🔗")


        console.log(destructured)

        if (type !== "fn" && type !== "method") {
            traceError(`${module} - invalid destructured`)
            info()
            error = true
        }

        if (typeof destructured !== "boolean") {
            traceError(`${module} - invalid destructured`)
            info()
            error = true
        }

        let colors = 1

        index > 0 && (sections[0] += "\n\n")

        sections[0] += `${icon} %c${value.name}%c [${type}]\n\n`
        sections[0] += "• Description\n\n"
        value.description.forEach(item => sections[0] += `  ${item}\n`)

        if (value.params) {

            sections[0] += `\n• Parameters:\n\n`

            if (type === "fn") {
                const normalized = value.params === "string" ? [value.params] : value.params
                normalized.forEach(item => sections[0] += `  ${item}\n`)
            }


            if (type === "method")
                Object.entries(value.params).forEach(([key, value]) => {
                    sections[0] += `  ${key}:`
                    for (let i = 0; i < 16 - key.length; i++) { sections[0] += " " }
                    sections[0] += `${value}\n`
                })
        }

        if (value.params && typeof value.params === "object" && !Array.isArray(value.params)) {
            sections[0] += `\n• Destructured: %ctrue%c\n`
            colors++
        }

        sections[0] += "\n\n--------------------------------------------------------\n\n"
        do {
            sections.push(`color: ${color}; font-weight: bold;`, "")
            colors--
        } while (colors !== 0)
    })

    console.trace(...sections, "\n")
}
 */

export const description = ({
    module = null,
    items = null
} = {}) => {
    let error = false
    let output = []
    let styles = []

    const alert = (infoAlert) => {
        traceError(`Terminal helper - ${module}: ` + infoAlert)
        info()
        error = true
        return
    }

    const resetStyle = "color: inherit; font-weight: normal; font-size: 12px;"

    const toColor = (text, color) => {
        return {
            text: `%c${text}%c`,
            style: [`color: ${color}; font-weight: bold; font-size: 12px;`, resetStyle]
        }
    }

    const jumpLine = (lines) => { return "\n".repeat(lines) }

    const addText = (text, jump, color) => {
        if (!color) {
            output.push(text + "\n".repeat(jump))
            return
        }
        const textColor = toColor(text, color)
        output.push(textColor.text + "\n".repeat(jump))
        styles.push(...textColor.style)
    }

    const addMethods = (methods) => {

    }

    const isValidModule = typeof module === "string"
    const isValidItems = items !== null && typeof items === "object"

    if (!isValidModule || !isValidItems) alert("invalid parameters")
    if (error) return

    const permitedTypes = {
        fn: "🧩"
    }

    addText(module.toUpperCase(), 2, "greenyellow")

    Object.entries(items).forEach(([key, value]) => {
        const type = value?.type && permitedTypes[value.type] || null
        const description = value?.description || null
        const parameters = value?.parameters || null
        const methods = value?.methods || null
        const destructured = parameters && Array.isArray(parameters) ? false : true

        console.log(type, parameters, methods, destructured)

        if (!type) alert(`${key} - type (${value.type}) not valid`)
        if (!description) alert(`${key} - description not exist`)
        if (methods != null && realType(methods) !== "object") alert(`${key} - methods only can be an object`)
        if (error) return


        addText(type + " " + key, 2)
        addText("• Description", 2)
        description.forEach(item => addText("     " + item, 1))
        addText(jumpLine(1))

        if (parameters) {
            addText("• Parameters", 2)

            if (!destructured) {
                parameters.length
                    ? parameters.forEach(item => addText(`     ${item}`, 1))
                    : addText(`     none`, 1)

                addText(jumpLine(1))
            } /* falta parametros desestruturados */
        }

        if (methods) {
            addMethods()
        }

        if (parameters?.length || (methods && Object.keys(methods).length)) {
            addText("• destructured: ", 0)
            destructured
                ? addText(true, 4, "tomato")
                : addText(false, 4, "greenyellow")
        }


    })

    !error && console.trace(output.join(""), ...styles)
}

export const objectError = async (module, obj) => {
    console.log(module, obj)
    let sections = [`${module.toUpperCase()} ERROR\n\n--------------------------------------------------------\n\n\n`]

    const addText = (text) => {
        console.log(text)
    }

/*     const { recursive } = await import("./object.js")
 */    recursive(obj, addText)
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

export const info = () => {
    description({
        module: "terminal helper",
        items: {
            description: {
                description: [
                    "🇪🇸 Genera documentacion en consola para modulos.",
                    "🇬🇧 Generates console documentation for modules."
                ],
                type: "fn",
                params: ["module (required)", "type (required)", "info (required)"]
            }
        }
    })
}