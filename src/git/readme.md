# Настройка установки template message
* Создание hook на нужное событие. Сделать hook исполняемым.
    * например post-checkout
```
# bin/bash
echo "" > ~/.git-message-template
```
* Регулярка для получения номера из строки 'TASK_12312_feature'
    * sed 's/.*_\([0-9]*\)[a-zA-Z]*/\1/'
* 
``` bash
#!/bin/sh
git rev-parse --abbrev-ref HEAD | sed 's/[a-zA-Z]*_\([0-9]*\)_[a-zA-Z_]*/\1/' | { IFS= read -r spo; printf 'RCV-%s\n' "$spo"; } > ~/.commit-template
```