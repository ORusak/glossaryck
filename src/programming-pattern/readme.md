# Описание
Информация по паттернам программирования

# Зацепление
Мера взаимосвязанности модулей программы

## Типы зацепления
согласно стандарту ISO/IEC/IEEE 24765-2010, включают:
* зацепление по общей области (англ. common-environment coupling, common coupling);
    * Тип зацепления, при котором два программных модуля совместно используют общую область данных.
* зацепление по содержимому (англ. content coupling);
    * Тип зацепления, при котором некоторые или все программные модули включены в некоторый модуль как составные части.
* зацепление по управлению (англ. control coupling);
    * Тип зацепления, при котором один программный модуль обменивается данными с другим модулем с явной целью повлиять на его последующее выполнение.
* зацепление по данным (англ. data coupling, input-output coupling);
    * Тип зацепления, при котором выходные данные одного программного модуля служат входными данными другого модуля.
* смешанное зацепление (англ. hybrid coupling);
    * Тип зацепления, при котором различные подмножества значений некоторого элемента данных используются в нескольких программных модулях для разных и несвязанных целей.
* патологическое зацепление (англ. pathological coupling)[2].
    * Тип зацепления, при котором один программный модуль зависит от деталей внутренней реализации другого модуля или влияет на них.

## Методы уменьшения
* Инверсия зависимостей

# Подходы для проектирования кода

## Общие
* Инкапсулируйте все, что может изменяться
* Уделяйте больше внимания интерфейсам, а не их реализациям.
* Принцип единой ответственности. Каждый класс, функция в вашем приложении должен иметь только одно назначение.
* Принцип инверсии зависимостей. Система должна конструироваться на основе абстракций “сверху вниз”: не абстракции должны формироваться на основе деталей, а детали должны формироваться на основе абстракций.

## ООП
* Классы — это их поведение и функциональность.
* Используйте следующее вместе с наследованием
    * Делегация — перепоручение задачи от внешнего объекта внутреннему;
    * Композиция — включение объектом-контейнером объекта-содержимого и управление его поведением; последний не может существовать вне первого;
    * Агрегация — включение объектом-контейнером ссылки на объект-содержимое; при уничтожении первого последний продолжает существование.

# Подходы для упрощения кода 
* Разбивайте задачи на подзадачи которые не должны по вашему мнению длиться более 4-12 часов написания кода
* Разбивайте задачу на множество более маленьких задач, каждая задача должна решаться одним или парой классов
* Сохраняйте ваши методы маленькими. Каждый метод должен состоять не более чем из 30-40 строк. Каждый метод должен решать одну маленькую задачу, а не множество случаев. Если в вашем методе множество условий, разбейте его на несколько. Это повысит читаемость, позволит легче поддерживать код и быстрее находить ошибки в нём. Вы полюбите улучшать код.
* Сохраняйте ваши классы маленькими. Здесь применяется та же техника что и с методами.
* Придумайте решение задачи сначала, потом напишите код. Никогда не поступайте иначе. Многие разработчики придумывают решение задачи во время написания кода и в этом нет ничего плохого. Вы можете делать так и при этом придерживаться выше обозначенного правила. Если вы можете в уме разбивать задачу на более мелкие части, когда вы пишете код, делайте это любыми способами. И не бойтесь переписывать код ещё и ещё и ещё… В счёт не идёт число строк, до тех пор пока вы считаете что можно ещё меньше/ещё лучше.
* Не бойтесь избавляться от кода. Изменение старого кода и написание нового решения два очень важных момента. Если вы столкнулись с новыми требованиями, или не были оповещены о них ранее, тогда порой лучше придумать новое более изящное решение решающее и старые и новые задачи.