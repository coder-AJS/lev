const urlJSON = "../conf/importUrl.json"

export const init = async ({
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
        console.info(`LEV init: check parametres\n${failed}`)
        return null
    } 

    await Promise.all(
        Object.entries(LEV).map(([section, obj]) => {
            return Promise.all(
                Object.entries(obj).map(([name, url]) =>
                    import(url).then(module => LEV[section][name] = module)
                )
            )
        })
    )

    return LEV
}

console.log(await init({
    helper: ["dom", "tempo"]
})
)