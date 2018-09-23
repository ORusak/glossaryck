/**
 * Created by Oleg Rusak on 04.06.2017.
 *
 * Proto code
 */
"use strict"

const eRelProvider = require("../entity-relation")
const ifaceDocument = require("../interface/document")
const ifaceBEntity = require("../interface/business-entity")
const ifaceEmployee = require("../interface/employee")
//  определили интерфейсы над типами
const eRel = eRelProvider({
    "be": ifaceBEntity,
    "doc": ifaceDocument,
    "emp": ifaceEmployee
})

//  API

const a = async () => {

    //  Получение по идентифкатору текущей сущности ее атрибута
    const guid = "g-u-i-d"
    //  получение атрибутов сущности
    //      -   указание идентификатора сущности, пути до атриубта в пределах сущности, [типа сущности]
    //      -   нет кеширования. сущность получается каждый раз.
    const guidType = await eRel.get(guid, "guid-type-document", "doc")
    const number = await eRel.get(guid, "data.number", "doc")
    //      -   автоопределение типа:
    //          -   ресурсоемко: сущность ищется последовательно в интерфейсах,
    //          -   возможны коллизии, если идентификаторы совпадут в разных интерфейсах
    //          -   нормально, если заведомо работаем только над одним типом сущности. не перебора.
    //          -
    await eRel.get(guid, "guid-type-document")
    //      -   цепочки
    //          -   указание конкретного типа
    //          -   есть кеширование (по умолчанию). можно отключить
    //          -   результат объект, свойства названия переменных в camel case
    //          -   для получения данных объектом с отключением кеша
    const { guidTypeDocument, data: { number } } = await eRel
        .get(guid, "guid-type-document", "doc")
        .prop("data.number")    //  по умолчанию тот же тип
    //      -   объектное
    //          -   указание конкретного типа
    //          -   есть кеширование (по умолчанию). можно отключить
    //          -   указание названий ключей
    //          -   указанение функций трансформаций
    const { guidType, n, countStage } = await eRel.get(guid, {
        guidType: "guid-type-document",
        n: "data.number",
        countStage: (data) => _.get(data, "data.stage.length"),
    }, "doc")

    //  Получение по идентифкатору текущей сущности
    //      - атрибута связанной сущности, через него атрибут связанной сущности
    const state = await eRel.get(guid, "data.{ inspection: be }.data.state", "doc")

    //      - всех данных связанной сущности
    //          - определил тип значит хочешь данные
    const state = await eRel
        .get(guid, "data.{ inspection: be }", "doc")

    //          - явное указание
    const state = await eRel
        .get(guid, "data.{ inspection: be }", "doc")
        .data()

    //      - выборочных данных связанной сущности
    const { state, code } = await eRel
        .get(guid, "data.{ inspection: be }", "doc")
        .data({
            state: "data.state",
            code: "data.code"
        })

    //      - данных связанной связанной сущности
    const state = await eRel
        .get(guid, "data.{ inspection: be }.data.{ parent_doc: doc}.data.number", "doc")

    const { state, code, parentState, } = await eRel
        .get(guid, "data.{ inspection: be }", "doc")
        .data({
            state: "data.state",
            code: "data.code",
            parentState: "{ parent_doc: doc }.data.state",
            //  ctx? ссылка на всю структуру
            //  eRel - инициализирован текущим контекстом inspection.data
            title: (data, eRel, ctx) => {
                //  вырианты полчения атрибута title
                //  контекст inspection.data
                const titleCurrentCtx = eRel.get("type_business_entity.title")
                //  временное переопределение контекста. проводим вычисление, не сохраняя контекст
                const titleNewCtx = eRel.get(data.type_business_entity, "title", "type_be")

                return `${titleCurrentCtx} № ${_.get(data, "number")}`
            },
            parent: {
                number: "{ parent_doc: doc}.data.number"
            }
        })

    //      - атрибут список
    //          -   получение списка связанных сущностей со всеми данными
    const [stageFirst, stageSecond, ...StageRest] = await eRel.get(guid, "data.{ stage: be }", "doc")

    //          -   получение списка связанных сущностей со конкретными
    const [stageStateFirst, stageStateSecond, ...StageStateRest] = await eRel.get(guid, "data.{ stage: be }.data.state", "doc")

    //          -   фильтрация сущностей
    //              -   обращение по индексу
    const [stageStateFirst] = await eRel.get(guid, "data.{ stage: be }[0].data.state", "doc")

    //              -   ограничение по количеству
    const [stageStateFirst, stageStateSecond] = await eRel.get(guid, "data.{ stage: be }", "doc")
        .first(2)

    //              -   можно добавить разлиных модификаторов для работы со списком: skip и тп

    //              -   условия
    const [stageStateFirst] = await eRel.get(guid, "data.{ stage: be }", "doc")
        .where("data.source", "ADIIOS")
        .whereIn("data.state", ["ACCEPTED", "FINISH"])

    //      - кеширование данных для исключения повторных обращений
    const guidType = await eRel
        .get(guid, "guid-type-document", "doc")
        .cache()
    const number = await eRel.get(guid, "data.number", "doc")   // повторный запрос не делается данные сущности берутся из кеша инстанса eRel

    //      - сущности ссылающиеся на текущую сущность?

    //      - трансформация данных


    //  Установка данных
    //  установка атрибутов сущности
    //      -   patch, если поддерживается итерфейсом
    //      -   update, с получением данных, объединеннием, обновлением
    const data = await eRel.set(guid, "data.state", "ACCEPTED", "doc")
    const data = await eRel.set(guid, "data", {
        state: "ACCEPTED",
        approvers: [{ /*...*/ }]
    }, "doc")

    //  установка списочных атрибутов сущности
    //      -   [] указывает что атрибут ссылочный. не обязательно, если перезатираем.
    //      -   установка у всех записей approvers атрибута is_complete=false
    const data = await eRel.set(guid, "data.approvers[]", { "is_complete": false }, "doc")

    //      -   установка у записей approvers удовлетворяющих условию атрибута is_complete=false
    const data = await eRel.set(guid, "data.approvers[id=1, role='SIGNERS']", { "is_complete": false }, "doc")

    const data = await eRel.set(guid, "data.approvers[]", { "is_complete": false }, "doc")  //  альтернативный интерфейс
        .where("id", 1)
        .where("role", 'SIGNERS')

    //  установка связанных атрибутов сущности
    //      -   patch, если поддерживается итерфейсом
    //      -   update, с получением данных, объединеннием, обновлением
    const data = await eRel.set(guid, "data.{ parent_doc: doc }.data.state", "ACCEPTED", "doc")

    //  Оптимизации
    //  - кеширование в рамках экземпляра eRel
    //  - поиск данных в _embedded текущей сущности до обращения к интерфейсу
}