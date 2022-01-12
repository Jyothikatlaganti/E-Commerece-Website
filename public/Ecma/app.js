import * as math from './main.js'

var doOperation = (type)=>{
    var result;
var fval = document.querySelector("#fval").value;
var sval = document.querySelector("#sval").value
switch(type){
    case 'add':
      result= math.addValues(fval,sval);
        break;
    case 'mul':
        result=math.mulValues(fval,sval);
        break;
}
    console.log(`The ${type} is ${result}`);
}

document.querySelector("#mul").addEventListener("click",()=>{
    doOperation("mul");
})

document.querySelector("#add").addEventListener("click",()=>{
    doOperation("add");
})
