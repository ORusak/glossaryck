/**
 * Проверка построения стек трейса у промисов и async/await кода
 * 
 * Получается что колбеки промисов и функции async теряют контекст выполнения при вызове.
 * Что не позволяет им построить полный стек трейс. Хотя от async это ожидалось бы, исходя из семантики запуска.
 */
'use strict'

const a = 1

const p = Promise.resolve()

function g () {
    function c () {

        try {
            // const p1 = await p
            
            function b () {
                throw new Error('boom!')
        
                return a
            }
                
            return b ()
        } catch(error) {
            console.error(error)
        }
    }

    return c()
}

g ()
