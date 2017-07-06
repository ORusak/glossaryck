# Implementation
 - Генерация grapshql схемы на основании json схемы
    - Берем из схемы названия, типы, описание
    - Без обязательность полей, проверяем позже 
 - Чтение атрибутов документов, вложенных сущностей
    - Как вызыват чтение через методы? Или названия сущности?
        - Попробуем через названия
 - Модификация документов, 
    - вложенных сущностей?
 - Ручная валидация по статусу
 - Как вырезать не редактируемые поля?

# Note
- Лучше преобразовать сущности в плоский тип без data. В принципе это всего лишь внутреннее 
представление смысла в нем для клиента особого нет.
    - Это позволит ограничится только связкой InterfaceEntity -> TypeDocument 
    и не вводить дополнительный тип для data
    - Упростит работу клиента с данными без дополнительного уровня вложенности
    
- Реализуем через функциональный подход для производительности.
  Мы могли бы использовать ООП с выделением базового класса отвечающего за:
   - подмешивание корневых полей
   - предоставление приватных методов трансформации типов
   - метода трансформации всего документа в тип graphql
 
  В дочерних классах через getter можно переопределять поля с особыми типами или другими свойствами
 
  Подход ООП привлекателен за счет чистоты кода. Инкапсуляция логики в родительском классе, в дочерних только
  переопределение полей.
  Однако! ООП метод подрузомевает выделение памяти на создание экземпляров. Что в целом для задачи не требуется
  так как на лицо обычная трансформация данных.
 