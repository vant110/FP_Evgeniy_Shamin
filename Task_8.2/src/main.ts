const KEY = 'TestInjectable'

const map = new Map<string, object>()

// Декоратор класса
interface injectableArg {
  map: Map<string, object>
  key: string
}

function injectable({
  map,
  key,
}: injectableArg) {
  return function (target: any) {
    map.set(key, new target())
  }
}

@injectable({ map, key: KEY })
class TestInjectable { }

// Декоратор поля
function inject(map: Map<string, object>, key: string) {
  return function (target: any, propertyKey: PropertyKey) {
    target[propertyKey] = map.get(key)
  }
}

class TestInject {
  @inject(map, KEY)
  testedField?: TestInjectable

  constructor() {
    delete this.testedField
  }

  print() {
    console.log(this.testedField)
  }
}

const testInject = new TestInject()
testInject.print()
