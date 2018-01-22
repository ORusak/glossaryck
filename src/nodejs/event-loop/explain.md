# Статьи
* Русский перевод документации https://medium.com/devschacht/event-loop-timers-and-nexttick-18579cd122e0
* Погружение в код loop https://habrahabr.ru/post/336498/

# Заметки
* В рамках выполняемых коллбеков, есть макро задачи и мини задачи
    * макро - выполняются в свой тик цикла
        * setTimeout, setInternal, setImmediate, I/O tasks
    * мини - выполняются в любом тике, как только стек пуст
        * process.nextTick, Promises
