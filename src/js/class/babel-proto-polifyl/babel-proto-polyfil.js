var MyClass1 = function () {
    MyClass.prototype = Object.create(Array.prototype);
    MyClass.prototype.b = function dozo () {}

    Object.setPrototypeOf(MyClass, Array);

    function MyClass() {
        return Object.getPrototypeOf(MyClass).call(this)
    } 
    
    return MyClass
}()

console.log(MyClass1)

const a = new MyClass1()

console.log(a.__proto__)  /* ? */
