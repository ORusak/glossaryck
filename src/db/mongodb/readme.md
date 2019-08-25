# БД mongodb

# API
* collection
    * записи
        * insert добаявлет новый
        * save перезатирает существующий. Работает как insert если нет _id
        * update патчит существующий
        * все методы принимают как один объект так и массив
        * можно в рамках update делать query запросы, устанавливать или убирать поля
    * find([criteria], [return_field]), findOne
        * return_field - {field1: 1, field2: 0}
        * .pretty
        * .skip
        * .limit
    * findAndModify - атомарная операция поиска и модификации, как вариант транзакции
    ``` js
    query: {_id:2,product_available:{$gt:0}}, update:{
        $inc:{product_available:-1},
        $push:{product_bought_by:{customer:"rob",date:"9-Jan-2014"}}
    }
    ```
    * drop
    * remove([criteria], [count])
    * sort([fields])
        * fields - {field1: 1, field2: -1}. 1 - asc, -1 - desc
    * ensureIndex(fields, [options]) - добавление индекса
        * fields - {field1: 1, field2: -1, field_text1: "text"}. 1 - asc, -1 - desc, text - текстовый
        * field.subfield1 - для вложенных
        * индекс работает при поиске только в том порядке полей в котором создан сам индекс

    * aggregate(operation)
        * operation - [{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}]
        * $project − Used to select some specific fields from a collection.
        * $match − This is a filtering operation and thus this can reduce the amount of documents that are given as input to the next stage.
        * $group − This does the actual aggregation as discussed above.
        * $sort − Sorts the documents.
        * $skip − With this, it is possible to skip forward in the list of documents for a given amount of documents.
        * $limit − This limits the amount of documents to look at, by the given number starting from the current positions.
        * $unwind − This is used to unwind document that are using arrays. When using an array, the data is kind of pre-joined and this operation will be undone with this to have individual documents again. Thus with this stage we will increase the amount of documents for the next stage.
* db
    * createCollection(name, options)
# Индексы
* Индексы хранятся в памяти требуется следить за их размером для избежания деоптимизации при выгрузке/подгрузке
* Индексы не используются с операторами
    * Regular expressions? or negation operators like $nin, $not, etc
    * Arithmetic operators like $mod, etc.
    * $where clause
* Ограничения
    * A collection cannot have more than 64 indexes.
    * The length of the index name cannot be longer than 125 characters.
    * A compound index can have maximum 31 fields indexed.

# ObjectId
* getTimestamp() - дата создания
* str - строкой

# mapReduce -
* Солянка из map и reduce, find
* Похожа на view из postgresql

```
mapReduce(map, reduce, options)
```
*
* Может наполнять/дополнять результат коллекций

# Text Search
* можно строить по одному или всем полям в документе
* учитываются настройки поиска: язык, регистр и прочее
*
```
db.posts.find({post_text:{$search:"tutorialspoint"}})
```
# regex Expression
*
```
db.posts.find({post_text:{$regex:"tutorialspoint", $options:"$i"}})
```
# Embedded
* Храним данные вложенные
* Минус увеличение размера хранимых данных из-за дублирвоания, плюс быстрота выборки.

# Referenced Relationships
* Храним ссылки на связанные документы
* Минус - дополнительные запросы, плюс - уменьшение размера БД
* Виды:
    * Manual References
        * Храним просто ссылку
        * Рекомендуется когда документ в этой же коллекции
    * DBRefs
        * Храним ссылку, имя коллекции, имя БД
        * Рекомендуется документ в отдельной коллекции
        * Как ни странно, количество запросов это не уменьшает. Просто дополнительная описательная информация. Есть ORM которые используют эту информацию, делая эти запросы за программиста.

# Covered Query
* Очень быстрый поиск
* Поиск происходит только по информации в индексе (в памяти)
* В условии и в результате можно использовать только поля использованные в индексе
* Не работает если индексированное поле в массиве или во вложенной структуре

# Capped Collections (Ограниченные коллекции)
* Фиксированные по размеру коллекции
```
db.createCollection("cappedLogCollection",{capped:true,size:10000})
```
* При достижении максимума удаляется старейший элемент
* Быстрые операции вставки, чтения. Удалять нельзя.
* Годится для кеша, логов
* Нет индексов по умолчанию
* для ускорения
    * Данные вставляются в конец
    * Выводятся в порядке хранения на диске

# Analyzing Queries
* explain - статистика выполнения запроса
* hint- принудительное использование определенных индексов для проверки вариантов

# Ticks

## Auto-Increment Sequence
* Коллекция счетчиков
* При создании нового документа получать для нее атомарной операцией новый номер

# replication
* A cluster of N nodes
* Any one node can be primary
* All write operations go to primary
* Automatic failover
* Automatic recovery
* Consensus election of primary
# Sharding
* горизонтальное масштабирование БД
* ..
# Dump MongoDB Data
* command - mongodump, mongorestore
* --host, --dbpath, --collection, --out BACKUP_DIRECTORY
# Deployment
* mongostat - текущее состояние выполнения операций в инстансах
* mongotop [time_update] - топовые операции на запись, чтение
    *

 # GridFS
* Хранение файлов больше 16MB
* Хранит на диске, в БД мету
