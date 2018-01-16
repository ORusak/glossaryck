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
