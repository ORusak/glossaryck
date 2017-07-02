/**
 * Created by Oleg Rusak on 02.07.2017.
 *
 * Code-style. Conditions.
 */

/*
 1. Eсли в условии присутствует больше одного логического оператора, нужно задуматься о его рефакторинге.
 При именовании переменных выбирать имена, соответствующие бизнес-логике,
 а не формальным проверкам, которые очевидны из кода.
 */

//  bad
if (model.user && model.user.id) {
  doSomethingWithUserId(model.user.id);
}

//  good
let userExistsAndValid = model.user && model.user.id;
if (userExistsAndValid) {
  doSomethingWithUser(model.user);
}

