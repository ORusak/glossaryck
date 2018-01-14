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
