//  + high priority then ternarn operation
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');  //  Something



//  ----------
// What is the result of this expression? (or multiple ones)

          
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

//  Goodbye, Jack
//  The var declaration is hoisted to the function scope, but the initialization is not.

//  ----------
// What is the result of this expression? (or multiple ones)
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

// []
// Array.prototype.filter is not invoked for the missing elements.

//  ----------
//  ----------
//  ----------
//  ----------
//  ----------
//  ----------