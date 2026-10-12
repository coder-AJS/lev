const globalStyle = new CSSStyleSheet()
globalStyle.replaceSync(
    `:host {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    .textBox {
        display: flex;
        width: auto;
        height: auto;

        .charBox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: auto;
            height: auto;

            .char {
                font-family: var(--fontFamily);
                font-size: var(--fontSize);
                color: var(--color2);
                letter-spacing: 4px;
                opacity: 0;
                filter: blur(10px);
                transform: translateX(-300px) scale(5);
                transition: 0s;
            }

            .animateIn {
                color: var(--color);
                opacity: 1;
                filter: blur(0);
                transform: translateX(0);
                transition: 600ms ease-in-out;
            }

            .animateOut {
                color: var(--color2);
                opacity: 0;
                filter: blur(10px);
                transform: translateX(400px) scale(5);
                transition: 600ms ease-in-out;
            }

            .empty {
                width: calc(var(--fontSize) / 2);
                height: 0;
            }
        }
    }`
)

export default class TextAppear extends HTMLElement {
    #configured = false
    #initialized = false
    #destroy = false

    constructor() {
        super()

        this.css = {
            fontFamily: "initial",
            fontSize: "40px",
            color: "gray",
            color2: "red"
        }

        this.logic = {
            text: "LOADING WAIT",
            loop: true,
            loopTime: 10000
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw() {
        this.dom.innerHTML = `<ul class="textBox"></ul>`
    }

    #createBoxes() {
        Array.from(this.logic.text).forEach(char => {
            const charBox = this.dom.querySelector(".textBox").appendChild(document.createElement("li"))
            charBox.classList.add("charBox")

            const box = charBox.appendChild(document.createElement("span"))
            box.className = char === " " ? "box empty" : "box char"
            char !== " " && (box.textContent = char)
        })
        return this.dom.querySelectorAll(".box")
    }

    async #animate(boxes) {
        do {
            for (const box of boxes) {
                box?.classList.add("animateIn")
                box?.classList.remove("animateOut")
                await this.#sleep(80)
            }
            if (this.logic.loop) {
                await this.#sleep(this.logic.loopTime)
                for (const box of boxes) {
                    box?.classList.replace("animateIn", "animateOut")
                    await this.#sleep(80)
                }
                await this.#sleep(500)
                boxes.forEach(box => {
                    box.classList.remove("animateOut")
                })
                await this.#sleep(500)
            }
        } while (this.logic.loop && !this.#destroy)
    }

    async #sleep(ms) {
        await new Promise(resolve => setTimeout(resolve, ms))
    }

    update() {
        Object.entries(this.css).forEach(([key, value]) => this.style.setProperty(`--${key}`, value))
    }

    configure(type, config) {
        if (type !== "css" && type !== "logic") {
            console.error("error in configure method type not valid", this)
            return null
        }

        const configObj = type === "css" ? this.css : this.logic
        for (const key of Object.keys(config)) {
            if (!(key in configObj)) {
                console.error(`component configure error, ${key} is not valid prop`, this)
                return null
            }
        }

        Object.assign(configObj, config)
        configObj === this.css && this.update()

        this.#configured = true
        this.dom.adoptedStyleSheets = [globalStyle]
    }

    async init() {
        if (!this.#configured) {
            console.error("component no configured", this)
            return
        }
        if (this.#initialized) {
            console.error("component previously initialized", this)
            return
        }
        this.#initialized = true
        this.#draw()
        const boxes = this.#createBoxes()
        await this.#sleep(100)
        await this.#animate(boxes)
    }

    destroy() {
        this.#destroy = true
        this.dom.innerHTML = ""
    }

    disconnectedCallback() { this.destroy() }
}

customElements.define("text-appear", TextAppear)