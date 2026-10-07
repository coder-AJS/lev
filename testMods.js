import {reactive} from "./helpers/reactive.js"

const fn1 = () => {
    console.log(1, reactObj.scroll)
}

const fn2 = () => {
    console.log(2, reactObj.other)
}

const fn3 = () => {
    console.log(3)
}

const fn4 = () => {
    console.log(4)
}

const reactObj = reactive({scroll: 0}, fn1)
reactObj.addTo("scroll", fn2)
reactObj.add({other: 100})
reactObj.addTo("other", [fn3, fn4])



const newReact = reactive({a: 100})
console.log(newReact.a)

console.log(reactObj.getProps())
console.log(reactObj.getListeners("other"))









window.addEventListener("scroll", () => {
    reactObj.scroll = window.scrollY
    
})