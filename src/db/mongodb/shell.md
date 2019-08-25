# Command
 * cls - clear screen
 * show dbs/collections
 * use db

## Database
* db - link
* dropDatabase()
* stats()
* createCollections(name, options)
  * options
    * validator
      * $jsonSchema
* runCommand(options)
## Collection
   * db.[collectionName] - link
   * drop()
   * update
     * update({}, { prop1: "value"}) - makes a replace of the document data. Prefer to use updateOne/Many instead
   * updateOne/Many
     * works with atomic operations (etc. {$set })
   * replaceOne/Many
   * deleteOne/Many

## Functions
* Timestamp
* NumberLong
* NumberInt
  * Store int32
  * By default mongo save int64 as JavaScript
  *
