class TextAppear extends HTMLElement {
    constructor() {
        super()

        this.font = "initial"
        this.text = "LOADING WAIT"
        this.textSize = "40px"
        this.textColor = "gray"
        this.blur = "20px"
        this.animationTempo = "6000" /* ms */
        this.appearTempo = "140" /* ms */
        this.scaleMin = "1"
        this.scaleMax = "10"

        this.dom = this.attachShadow({ mode: "open" })
        this.dom.innerHTML = `
            <ul class="textBox"></ul>
        `

        const customStyle = this.dom.appendChild(document.createElement("style"))
        customStyle.textContent = `
            :host {
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
                border: 1px solid blue;

                .charBox {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: auto;
                    height: auto;

                    .char {
                        position: relative;
                        top: 0;
                        font-family: ${this.font};
                        font-size: ${this.textSize};
                        color: ${this.textColor};
                        letter-spacing: 4px;
                        transform: scale(1);
                        filter: blur(${this.blur});
                        opacity: 0;
                    }

                    .empty {
                        width: calc(${this.textSize} / 2);
                        height: 0;
                    }

                    .animated {
                        animation: appear ${this.animationTempo}ms infinite;
                    }
                }
            }

            @keyframes appear {
                0% {
                    filter: blur(${this.blur});
                    opacity: 0;
                    transform: scale(${this.scaleMax});
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
                    filter: blur(${this.blur});
                    opacity: 0;
                    transform: scale(${this.scaleMin});
                }
            }
        `
    }

    #createBoxes() {
        Array.from(this.text).forEach(char => {
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
            box.classList.add("animated")
            await new Promise(resolve => setTimeout(resolve, this.appearTempo))
        }
    }

    init() {
        const boxes = this.#createBoxes()
        this.#animate(boxes)
    }

    connectedCallback() {
        this.init()
    }
}

customElements.define("text-appear", TextAppear)