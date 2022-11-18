export const add = (first: number, second: number): number => {
  if (first === null || second === null) {
    throw new Error("unacceptable value")
  } else {
    return first + second
  }
}

export const subtract = (first: number, second: number): number => {
  if (first === null || second === null) {
    throw new Error("unacceptable value")
  } else {
    return first - second
  }
}

export const multiply = (first: number, second: number): number => {
  if (first === null || second === null) {
    throw new Error("unacceptable value")
  } else {
    return first * second
  }
}

export const divide = (first: number, second: number): number => {
  if (first === null || second === null) {
    throw new Error("unacceptable value")
  } else if (second === 0) {
    throw new Error("cannot divide by 0")
  } else {
    return first / second
  }
}
