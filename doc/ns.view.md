# ns.View

## Про события

Список событий:
* ```hide``` - view был скрыт и больше не виден на странице
* ```htmldestroy``` - старая нода у view была заменена на новую
* ```htmlinit``` - у view появилась новая нода
* ```async``` - у async-view появилась заглушка. Это единственное событие, которое генерируется для заглушки async-view
* ```show``` - view был показан и теперь виден на странице
* ```repaint``` - view виден и был затронут в процессе обновления страницы

1. События генерируются снизу вверх, т.е. сначала их получают дочерние view, потом родительские.
2. События генерируются пачками, т.е. сначала одно событие у всех view, потом другое событие у всех view.
3. События генерируются в строго определенном порядке:

```
hide
htmldestroy
htmlinit
async
show
repaint
```

Примеры последовательностей событий:
* инициализация view: ```htmlinit -> show -> repaint```
* перерисовка страница, если view валиден: ```repaint```
* view был скрыт: ```hide``` (без ```repaint```)
* view был показан: ```show -> repaint```
* view был обновлене: ```hide -> htmldestroy -> htmlinit -> show -> repaint``` (```hide``` тут вызывается из тех соображение, что могут быть обработчики, которые вешаются на ```show/hide``` и при обновлении ноды, они должны быть переинициализированы)