#Задачи
* Поразбираться с [jest https://github.com/facebook/jest]. Тестовый проект.
* Разобраться с flex-box
* Разобраться с css-grid-layout http://css-live.ru/css/bolshaya-statya-pro-gridy-css-grid-layout.html#more-19832
*

# CSS
## Теги
* Цитаты
    * cite - ссылка на цитату, индексируется поисковиками
    * blockquote - большая цитата
    * q - маленькая цитата
* strong, em - симантическая замена b, i
* dl, dt, dd - список определений
* address - информация об авторе

### Семантическая верстка
*

## Классы
* Имена классов чувствительны к регистру
## Селекторы
* tag
* tag, tag1 - перечень
* #id
* * - любой
* .class
* tag.class
* tag .class - любой потомок
* tag1 + tag2 - следование, смежный селектор
* tag1 ~ tag2 - все tag2 на уровне tag1
### Дочерние селекторы
* tag > .class - дочерний
* :first-child
* :last-child
* :only-child
* :nth-child(odd|even|n exp)
### Дочерние псевдоклассы
* :first-of-type -
* :last-of-type -
* :nth-of-type -
### Свойств
* tag[prop]
* tag[prop=]
* tag[prop^=] - начинается на
* tag[prop$=] - заканчивается на
* tag[prop*=] - содержит на
* tag[prop|=] - не?
* tag[prop~=] - регулярное
### Другие
* :target(id) - срабатывает если после # в URL есть id.
    * вариант использования показ содержимого табов при клике по заголовку таба
* :not(selector) -
    * есть ограничения на selector

## Наследование
### Специфичность
* Приоритет применения свойств стилей непосредственно на элемент
5 тег - 1
4 класс - 10
3 идентификатор - 100
2 инлайн стиль - 1000
1 ! important
0 при равности, последний определенный
* Другое
    * наследуемые стили приоритета не имеют
    * если несколько селекторов то специфичность высчитывается как сумма весов селекторов
## Поддержка браузерами
### CSS reset
* http://meyerweb.com/eric/tools/css/reset/
* https://necolas.github.io/normalize.css/ - выглядит более зрелой
### Порядок загрузки страницы
* Материалы
    * https://webo.in/articles/all/2009/31-rending-restyle-reflow-relayout/
    * https://uspei.com/uskorenie-sajta/kak-skripty-javascript-vliyayut-na-skorost-zagruzki-stranitsy/
* Загружается страница
    * анализируется doctype
* Строится DOM дерево элементов
* Загружается список критичных ресурсов (CSS, JS, картинки)
* Строится CSS DOM  
    * каскадным образом
* Объеденяется DOM элементов и CSS DOM (rendering tree)
    * компоновака - назначение координат
    * отрисовка - 
* Выполняются JS скрипты
* Корректируется CSS DOM, DOM элементов

## Шрифты
### Встроенные
### Веб шрифты
* Подключение @font-face {
    font-family: ; имя
    src: ...
    font-weight: - толщина применения
    font-style: - начертанние применения
}
* Генерация веб шрифтов https://www.fontsquirrel.com/tools/webfont-generator
* Онлайн google.com/fonts
* Если стиля в шрифте нет, то браузер может попробывать "наклонять", "утолщать" шрифт
    * Требуется отключать поведение браузера через font-...: normal
    * Например, если браузер устаревший IE 8
### Варианты шрифтов
#### Serif Антиквенные шрифты (с заческами)
* идеальны для длинных фрагментов текста
* "Times New Roman", Georgia, Baskerville, "Palatino Linotype", Times, serif, "Hoefler Text"
#### San serif Рубленые шрифты (без засечек)
* для заголовков - простые, прямые
* Arial, Verdana, Helvetica, Tahoma,
#### Моноширинные и декоративные шрифты
* компьютерный код -
* буквы одинаковой ширины
* "Courier New", Courier, monospace,"Lucida Console", Monaco, "Copperplate Light", "Copperplate Gothic Light", "Marker Felt", "Comic Sans MS", fantasy.
#### Display (Экранные)
*  полужирными и декоративными, они не подходят для длинных текстовых отрывков, но могут пригодиться для коротких
заголовков, акцентирующих внимание на странице
#### Handwriting (Рукописные)
### Цвета
* Подбор цветовых палитр colourlovers.com
* rgba - не поддерживается IE 8
* hsl - тон, насыщеность, яркость
### Размер
* для retina дисплеев браузеры умножают px в 2 раза
* pt - вроде как лучше использовать для информации под печать на принтерах
* 16px - как правило стандартный размер по умолчанию в браузерах
* rem - размер относительно корневого элемента. Можно задать размер в корневом потом менять от него.
### Выделение текста (контраст)
* https://creativepro.com/dot-font-seven-principles-of-typographic-contrast/
1. Размер
2. Вес
3. Форма - начертание
4. Структура - шрифт
5. Текстура - заполнение текстом
6. Цвет -
7. Направление -
8. Ритм - меж буквенное расстояние

## Трюки, заметки
### Поддержка html5 IE8 и ниже
<!--[if lt IE 9]> <script src="//html5shiv.
googlecode.com/ svn/trunk/html5.js"></script>
<![endif]-->
## CSS3 разбит на независимые модули: Selectors, Values and Units и прочее
## Валидация CSS
http://jigsaw.w3.org/css-validator/#validate_by_uri+with_options
