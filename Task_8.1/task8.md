## Задание к лекции на тему "09 - Frontend Application Infrastructure_ NPN, Gulp, Webpack" и "10 - TypeScript"
### Общие требования
* Код необходимо разместить в отдельной ветке или репозитории.
* После выполнения задания завести PR и отправить преподавателю.

### Задание 1:
 * Ознакомиться с ESLint (https://eslint.org/docs/latest/use/getting-started)
 * Подключить в проекты ESLint
 * Продемонстрировать работу ESLint, исправив форматирование кода проектов
 * Создать ПР с изменениями
 * Бонус: настроить ESLint таким образом, чтобы форматирование исправлялось автоматически при коммите

### Задание 2:
 * Изучить работу декораторов.
 * Написать декоратор класса `Injectable({key: string})`, который создает экземпляр класса и помещает его в список (Map) инстансов по переданному ключу. 
Список инстансов можно передавать в декоратор или использовать внешнюю глобальную переменную.
 * Написать декоратор поля `Inject(key)`, который ищет по ключу в списке экземпляр класса и присваивает его полю. 

Пример использования: 
```
@Injectable({key: "TestInjectable"})
class TestInjectable {}

class TestInject {
 @Inject("TestInjectable")
 public testedField: TestInjectable;

 public print(): void {
  console.log(this.testedField);
 }
}
```
 
### Самостоятельно изучить работу
1. Изучить [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
2. Изучить [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Список источников
1. [Официальная документация](https://www.typescriptlang.org/) 
2. [Tutorial на русском языке](https://metanit.com/web/typescript/) 
3. [Подробнее про декораторы](https://habr.com/ru/company/ivi/blog/275003/) 
