require("./a.js")
import { utils } from './b.js'
console.log(utils.add(10, 20))
class Person {
  constructor(name) {
    this.name = name
  }
  getName () {
    return this.name 
  }
}

let p = new Person('gqf')
// alert(p.getName())
console.log(p.getName())

for(let i of [1,2,3]) {
  console.log(i)
}