# БД mongodb
* API
    * collection
        * записи
            * insert добаявлет новый
            * save перезатирает существующий. Работает как insert если нет _id
            * update патчит существующий
            * все методы принимают как один объект так и массив
        * find([criteria], [return_field]), findOne, fine
            * return_field - {field1: 1, field2: 0}
            * .pretty
            * .skip
            * .limit
        * drop
        * remove([criteria], [count])
        * sort([fields])
            * fields - {field1: 1, field2: -1}. 1 - asc, -1 - desc
        * ensureIndex(fields, [options]) - добавление индекса
            * fields - {field1: 1, field2: -1}. 1 - asc, -1 - desc
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
* replication 
    * A cluster of N nodes
    * Any one node can be primary
    * All write operations go to primary
    * Automatic failover
    * Automatic recovery
    * Consensus election of primary
* Sharding
    * горизонтальное масштабирование БД
    * .. 
* Dump MongoDB Data
    * command - mongodump, mongorestore
    * --host, --dbpath, --collection, --out BACKUP_DIRECTORY
* Deployment
    * mongostat - текущее состояние выполнения операций в инстансах
    * mongotop [time_update] - топовые операции на запись, чтение
        * 

