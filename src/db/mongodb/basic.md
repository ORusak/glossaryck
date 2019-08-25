# Utils
* default port 27017
* mongod - start db service
  * sudo service mongodb start - без залипания окна. сервис пишет лог в директорию по умолчанию
  * mongod --fork --logpath / - без залипания окна, лог обязателен чтобы процессу было куда перенаправить поток вывода
  * завершить можно sudo service mongodb stop или из admin db.stopService()
* mongo - shell
  * --port 27017

# Limits
* The MongoDB Limits: https://docs.mongodb.com/manual/reference/limits/

# Store data

# Collections
## Index
* limit 64 index

# Document
* 16 Mb per document (with nested document)

# Nested documents
* Number of levels is 100

# Data types
* The MongoDB Data Types: https://docs.mongodb.com/manual/reference/bson-types/

## Text
  * Has no limit. Restrict only overall limit of the document (16 mb)

## Boolean
## Number
* Integer (int32)
* NumberLong (int64)
* NumberDecimal (int64)
## ObjectId
* have order
* base on date
## ISODate
## Embedded Document
## Array

# Schema
More on Schema Validation: https://docs.mongodb.com/manual/core/schema-validation/
