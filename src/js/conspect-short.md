# Краткий конспект

## Типы 
* 6 базовых 
    * Number
    * String
    * Boolean
    * null
    * undefined
    * Symbol - уникальный идентификатор  
* 1 специальный
    * Object 
    
## Циклы
* for in 
    * Итерируется по всем свойствам
    * проверка hasOwnProperty

## Итераторы
* Symbol.iterator
* () => ({ 
        next () => ({
            value: any, 
            done: boolean
        })
    })

# Сравнение
* При не полном сравнении boolean c другим значением, значение приводится к Number
    * false == [] // true, так как Number([]) === 0

# Всплытие (hoisting)
* Всплывает объявление переменной, а не инициализация
* let и const не всплывают

# Режимы выполнения

## use strict
* материал https://ru.stackoverflow.com/questions/435546/%D0%A7%D1%82%D0%BE-%D0%B7%D0%BD%D0%B0%D1%87%D0%B8%D1%82-use-strict
* зарезервировано больше имен под системные
* нельзя менять необявленные переменные
* нельзя использовать оператор with; arguments - caller, callee
* повторные свойства в объектах, arguments
* this не преобразуется в глобальный объект если null, undefined

## Приведение типов
* Строки
    * Когда требуется представление в виде строки
    * С оператором + , если один операнд строка
    * String(val)
* Числа
    * В не строгих сравнениях == данных различных типов
    * Number(val)
    * +val
    * Number(undefined) = NaN
    * Number(Object) = NaN
    * Строки откидываются whitespace и Number(val)
* Логическое
    * В логическом контексте
    * Boolean(value)
    * !!val
* Исключения
    * null == только null и undefined. В логических выражениях не приводится.
