const strObj = new String("hello");
console.log(typeof strObj); // "object"
console.log(typeof strObj.valueOf()); // "hello" (extracts the primitive value)

let numObj = new Number(10);
console.log(typeof numObj); // "object"
console.log(typeof numObj.valueOf()); // 10

let boolObj = new Boolean(true);
console.log(typeof boolObj); // "object"
console.log(typeof boolObj.valueOf()); // true

let arrObj = new Array(1, 2, 3);
console.log(typeof arrObj); // "object"
console.log(typeof arrObj.valueOf()); //

let arr = [1, 3];
console.log(typeof arr); //)

let newArray=new Array(1,2,3);
console.log(newArray);
console.log(typeof newArray);

const str1 = "hello";
const str2 = "hello";
const strObj1 = new String("hello");
const strObj2 = new String("hello");

console.log(str1 === str2);       // true (same primitive value)
console.log(strObj1 === strObj2); // false (different object references)