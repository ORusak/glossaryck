# Настройка установки template message

https://bitbucket.org/snippets/atlassian/qedp7d

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

# Multi repos check status
* https://github.com/rw251/git-summary.git 

# Previous commit info
https://github.com/Fakerr/git-recall
