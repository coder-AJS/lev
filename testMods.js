import { reactive } from "./helpers/reactive.js"

const fn1 = () => {
    console.log(1, obj.scroll)
}

const fn2 = () => {
    console.log(2, obj.other)
}

const fn3 = () => {
    console.log(3)
}

const fn4 = () => {
    console.log(4)
}

const obj = reactive()
obj.add({
    name: "scroll",
    value: window.scrollY,
    listeners: fn1
})
console.log(obj)

obj.add({
    name: "other",
    value: 0
})
obj.addTo({
    name: "scroll",
    listeners: fn2
})

console.log(obj.getProps())
console.log(obj.getListeners())

obj.destroy()
console.log(obj)



window.addEventListener("scroll", () => {
    obj.scroll = window.scrollY

})