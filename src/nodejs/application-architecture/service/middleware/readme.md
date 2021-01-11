# Обработка ошибок
* Плохой паттерн обрабатывать все ошибки только в middleware, как единой точке. Часть ошибок связанных с запуском запланированных задач туда не попадет. Лучше выделить сервис, который обеспечивает единообразную обработку.
  * https://github.com/i0natan/nodebestpractices#-24-handle-errors-centrally-not-within-an-express-middleware
