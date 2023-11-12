export enum Operation {
  Degree,
  Root,
  Divide,
  Multiply,
  Subtract,
  Add,
}

export function getSymbol(operation: Operation) {
  let result: String

  switch (operation) {
    case Operation.Degree:
      result = '^'
      break
    case Operation.Root:
      result = '√'
      break
    case Operation.Divide:
      result = '÷'
      break
    case Operation.Multiply:
      result = '×'
      break
    case Operation.Subtract:
      result = '−'
      break
    case Operation.Add:
      result = '+'
      break
  }

  return result
}
