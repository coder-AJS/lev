const urlJSON = new URL("../conf/importUrl.json", import.meta.url).href

export const load = async ({
    helper = null,
    style = null
} = {}) => {
    const confJSON_response = await fetch(urlJSON)
    const confURL = await confJSON_response.json()
    const LEV = {}
    let failed = []

    if (helper) {
        LEV["help"] = {}
        helper.forEach(item => {
            confURL.helpers[item]
                ? LEV.help[item] = confURL.helpers[item]
                : failed.push(`[helper - ${item}]`)
        })
    }

    if (failed.length) {
        console.info(`LEV load: check parametres\n${failed}`)
        return null
    }

    await Promise.all(
        Object.entries(LEV).map(([section, obj]) => {
            return Promise.all(
                Object.entries(obj).map(([name, url]) => {
                    const serverUrl = new URL(url, import.meta.url).href
                    return import(serverUrl).then(module => LEV[section][name] = module)
                })
            )
        })
    )

    return LEV
}