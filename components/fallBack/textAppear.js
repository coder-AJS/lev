const sharedStyle = new CSSStyleSheet()
sharedStyle.replaceSync(
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
                position: relative;
                top: 0;
                font-family: var(--fontFamily, initial);
                font-size: var(--fontSize, 40px);
                color: var(--color, red);
                letter-spacing: 4px;
                transform: scale(1);
                filter: blur(var(--filterBlur, 20px));
                opacity: 0;
            }

            .empty {
                width: calc(var(--fontSize, 40px) / 2);
                height: 0;
            }

            .animated {
                animation: appear var(--animationTempo, 6000ms) infinite;
            }
        }
    }

    @keyframes appear {
        0% {
            filter: blur(var(--filterBlur, 20px));
            opacity: 0;
            transform: scale(var(--scaleMax, 10));
        }

        10% {
            filter: blur(0px);
            opacity: 1;
            transform: scale(1);
        }

        70% {
            top: 0;
            filter: blur(0px);
            opacity: 1;
            transform: scale(1);
        }

        100% {
            top: 80px;
            filter: blur(var(--filterBlur, 20px));
            opacity: 0;
            transform: scale(var(--scaleMin, 1));
        }
    }`
)

export default class TextAppear extends HTMLElement {
    #destroy = false

    constructor() {
        super()

        this.textContent = "LOADING WAIT"
        this.fontFamily = "initial"
        this.fontSize = "40px"
        this.color = "red"
        this.filterBlur = "20px"
        this.animationTempo = "6000ms"
        this.appearTempo = "140"
        this.scaleMin = "1"
        this.scaleMax = "10"

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw() {
        this.dom.innerHTML = `<ul class="textBox"></ul>`
        this.dom.adoptedStyleSheets = [sharedStyle]
    }

    #createBoxes() {
        Array.from(this.textContent).forEach(char => {
            const charBox = this.dom.querySelector(".textBox").appendChild(document.createElement("li"))
            charBox.classList.add("charBox")

            const box = charBox.appendChild(document.createElement("span"))
            box.classList.add(char === " " ? "empty" : "char")
            char !== " " && (box.textContent = char)
        })
        return this.dom.querySelectorAll(".char")
    }

    async #animate(boxes) {
        for (const box of boxes) {
            if (this.#destroy) return
            box.classList.add("animated")
            await new Promise(resolve => setTimeout(resolve, this.appearTempo))
        }
    }

    configure(props) { Object.assign(this, props) }

    update(props) {
        Object.entries(props).forEach(([key, value]) => {
            this.style.setProperty(`--${key}`, value)
            this.configure({ [key]: value })
        })
    }

    init() {
        this.#draw()
        const boxes = this.#createBoxes()
        this.#animate(boxes)
    }

    destroy() {
        this.#destroy = true
        this.remove()
    }
}

customElements.define("text-appear", TextAppear)