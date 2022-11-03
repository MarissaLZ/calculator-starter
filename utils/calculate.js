export const add = (first, second) => {
  if (first === null || first === "" || second === null || second === "") {
    throw new Error("unacceptable value")
  } else {
    return first + second
  }
}

export const subtract = (first, second) => {
  if (first === null || first === "" || second === null || second === "") {
    throw new Error("unacceptable value")
  } else {
    return first - second
  }
}

export const multiply = (first, second) => {
  if (first === null || first === "" || second === null || second === "") {
    throw new Error("unacceptable value")
  } else {
    return first * second
  }
}

export const divide = (first, second) => {
  if (first === null || first === "" || second === null || second === "") {
    throw new Error("unacceptable value")
  } else if (second === 0) {
    throw new Error("cannot divide by 0")
  } else {
    return first / second
  }
}
