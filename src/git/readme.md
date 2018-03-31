# Настройка установки template message
* Создание hook на нужное событие. Сделать hook исполняемым.
    * например post-checkout
```
# bin/bash
echo "" > ~/.git-message-template
```
* Регулярка для получения номера из строки 'TASK_12312_feature'
    * sed 's/.*_\([0-9]*\)[a-zA-Z]*/\1/'