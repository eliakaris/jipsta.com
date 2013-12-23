Can anyone explain this?

```javascript
var s1 = "http://www.youtube.com/watch?v=hMtZfW2z9dw";

var re1 = /^(?:(?:https?\:\/\/)?(?:www\.)?)?youtube\.com\/watch[a-zA-Z0-9_\-\?\&\=\/]+/g;

console.log(re1.test(s1)); // true
console.log(re1.test(s1)); // false
console.log(re1.test(s1)); // true
console.log(re1.test(s1)); // false
console.log(re1.test(s1)); // true
console.log(re1.test(s1)); // false
console.log(re1.test(s1)); // true

var re2 = /^(?:(?:https?\:\/\/)?(?:www\.)?)?youtube\.com\/watch[a-zA-Z0-9_\-\?\&\=\/]+/;

console.log(re2.test(s1)); // true
console.log(re2.test(s1)); // true
console.log(re2.test(s1)); // true
console.log(re2.test(s1)); // true
console.log(re2.test(s1)); // true
console.log(re2.test(s1)); // true
```
