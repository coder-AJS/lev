import * as resolver from "./resolver.js"

export const helper = (module, type, info) => () => {
    if (type !== "fn" && type !== "method") {
        console.trace("helper error: type must be (fn or method)")
        return
    }

    const color = "greenyellow"
    let sections = [`HELPER ${module.toUpperCase()}\n\n--------------------------------------------------------\n\n\n`]

    Object.entries(info).forEach(([name, value], index) => {
        let colors = 1
        let icon = null
        type === "method" && (icon = "🔗")
        type === "fn" && (icon = "🧩")

        index > 0 && (sections[0] += "\n\n")

        sections[0] += `${icon} %c${name}%c (${type})\n\n`
        sections[0] += "• Description\n\n"
        value.description.forEach(item => sections[0] += `  ${item}\n`)

        if (value.params) {
            sections[0] += `\n• Parameters:\n\n`

            if (typeof value.params === "string") sections[0] += `  ${value.params}\n`

            if (Array.isArray(value.params)) value.params.forEach(item => sections[0] += `  ${item}\n`)

            if (typeof value.params === "object" && !Array.isArray(value.params))
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

export const objectError = (module, obj) => {
    console.log(module, obj)
    let sections = [`${module.toUpperCase()} ERROR\n\n--------------------------------------------------------\n\n\n`]

    const addText = (text) => {
        console.log("d", text)
    }

    console.log(resolver)
    resolver.recursive(obj, addText)
}

export const info = helper("terminal", "fn", {
    helper: {
        description: [
            "🇪🇸 Genera documentacion en consola para modulos.",
            "🇬🇧 Generates console documentation for modules."
        ],
        params: ["module (required)", "type (required)", "info (required)"]
    }
})

export const reportError = (log, error) => {
    console.groupCollapsed(
        `%c[ERROR] ${log}`,
        'color: rgb(252, 75, 75); font-weight: bold; font-size: 12px;'
    )
    console.error(error)
    console.groupEnd()
}

export const traceError = (log, error) => {
    console.groupCollapsed(
        `%c[ERROR] ${log}`,
        'color: rgb(252, 75, 75); font-weight: bold; font-size: 12px;'
    )
    console.error(error)
    console.trace()
    console.groupEnd()
}
