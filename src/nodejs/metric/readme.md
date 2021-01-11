# Метрики

## Сбор
* Логирование в мете. С последующим анализом в grafana.
* open tracing в тегах. Анализ в jaeger.

## Варианты метрик

### http, https
* Логирование событий при http, https запросах к другим сервисам https://blog.risingstack.com/measuring-http-timings-node-js/
Поиск узких мест.
    * DNS Lookup - получение IP
    * TCP Connection - установка соединения 
    * TLS handshake - проверка безопасного соединения (только для https)
    * Time to First Byte (TTFB) - передача первого байта
    * Content Transfer - передача содержимого