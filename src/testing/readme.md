# Описание
Раздел заметок про тестирование

# Модульное тестирование (Unit test)
* Внутренние функции тестировать не требуется?
* Что будет если поведение внутренних функций изменится?
    * Не замоканых
        * Основная функция изменит свое поведение.
        * Выполнение тестов покажет ошибку не совместимости. При условии качества тестов.
    * Замоканных
        * Основная функция НЕ изменит свое поведение.
        * Выполнение тестов НЕ покажет ошибку не совместимости.
    * Получается что мокать не верно, так как мы не контролируем совместимость с используемыми зависимостями.
    * Если mock внешняя библиотека, то ее изменение может нами контролироваться через файлы конфигурации проекта (package.json).
        * Если нам надо поменять версию зависимости мы ПРИНИМАЕМ РЕШЕНИЕ и модернизируем свой код, которые от нее зависит.
        * Не гарантирует что обновление пройдет успешно так как мы можем забыть обновить какие то mock.
        * Часть ошибок уйдет на продакшен.
    * Если mock внутренняя зависимость, то ее изменение никак нами не контролируется. Мы просто подключаем ее и ее изменение никак не зафиксироваться. Кроме как в ручную, что не чревато.
        * Если мы владельцы кодовой базы зависящего кода и зависимого, то мы можем это отслеживать в РУЧНУЮ.
    * Решением может быть не mock код.
        * Как этого добиться?
    * Для чистых функций это просто.
        * Проблема может быть только с медленными чистыми функциями, так как это влияет на скорость выполнения тестов.
            * Таких случаев мало.
            * Вариант мокать их.
            * Не мокать и гонять отдельно.
    * Что делать с не чистыми?
        * Не чистой функцию делает сайд эффект свой или использование функции, в которой есть сайд эффект.
    * Мокать только низкоуровневые обращения ко внешним ресурсам.
        * Выделить в системе места что порождают сайд эффекты.
        * Остальные функции должны быть чистыми.
        * Чистые функции будет легко тестировать без моканья. Грязные не тестировать.
    * Возможно ли это в реальной системе?
      
* 

## Чистые функции
* Цель?
* Нужны ли моки, стабы?
* Нужно ли проверять алгоритм функции?
* 

### Цель тестирования
* Функция должна возвращать определенные значения при определенных входных параметрах

### Входные параметры

### Выходные параметры

### Mock, stub
* Как правило, не нужны.
* Нужны, если внутренние функции слишком долго выполняются.

### Проверка алгоритма
* Не нужна, так как важен результат, а не то что эта функция использует для его достижения.
    * Функция может использовать инлайн вычисления, а может вызовы функций.
* Нужна, если функция специфичная и нам надо проверить, что данные в коде функции переходят правильно во внутренние функции.
    * Редкий случай.


* Входящие/выходящие данные
    * Проверка на обязательность
        * Важно. Так как мы проверяем поведение функции в разных обстоятельствах.
        * 
    * 
* Проверка вызовов вложенных функций?
    * Что мы хотим этим проверить?
        * Главное что на основании полученных параметров функция вернет результат. Будет ли 
        она использовать вспомогательные функции значения не имеет, если только это не ее особенность.
        * 
    * 

## Грязные функции
Функции с side effect


## Что мы тестируем?
* Чистая функция

* Функции с побочными эффектами (например, контроллеры)
    * Входящие/выходящие данные?
    * Алгоритм? Последовательность вызовов функций?
    * Проверка вызовов вложенных функций?
