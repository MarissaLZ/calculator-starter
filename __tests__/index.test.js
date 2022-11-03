import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { add, subtract, multiply, divide } from "../utils/calculate"
import Calculator from "../components/Calculator"

//entering a a space
//null
//test for empty input
//test the calc button and its callback handleCalculate?

// describe("Calculator Component", () => {
//   test("renders a button", () => {
//     render(<Calculator />)
//     expect(screen.getAllByRole("button")).toBeInTheDocument()
//   })
// })

describe("add functionality", () => {
  test("adds 1+1 to equal 2", () => {
    expect(add(1, 1)).toBe(2)
  })
  test("adds a negative and positive", () => {
    expect(add(-10, 5)).toBe(-5)
  })
  test("adds two floats", () => {
    expect(add(0.2, 0.5)).toBe(0.7)
  })
  test("adds null and a number", () => {
    expect(() => add(null, 1)).toThrow()
  })
  test("thows error when adding empty strings", () => {
    expect(() => {
      add("", "")
    }).toThrow()
  })
})

describe("subtraction functionality", () => {
  test("subtracts two numbers ", () => {
    expect(subtract(10, 5)).toBe(5)
  })
  test("subtract two negatives", () => {
    expect(subtract(-10, -5)).toBe(-5)
  })
  test("subtracts two floats", () => {
    expect(subtract(10.5, 1.4)).toBe(9.1)
  })
  test("subtracts null from a number", () => {
    expect(() => subtract(10, null)).toThrow()
  })
  test("trhows error when subtracting empty strings", () => {
    expect(() => {
      subtract("", "")
    }).toThrow()
  })
})

describe("multiply functionality", () => {
  test("multiplies a number and 0 and returns 0", () => {
    expect(multiply(5, 0)).toBe(0)
  })
  test("multiplies two negatives and return a positive", () => {
    expect(multiply(-5, -5)).toBe(25)
  })
  test("multiplies a negative and postive and returns a negative", () => {
    expect(multiply(-5, 5)).toBe(-25)
  })
  test("multiply two floats", () => {
    expect(multiply(0.55, 0.15)).toBe(0.0825)
  })
  test("Throws as error if input is null", () => {
    expect(() => multiply(null, null)).toThrow()
  })
})

describe("divide functionality", () => {
  test("divides an integer by an integer", () => {
    expect(divide(10, 2)).toBe(5)
  })
  test("divides two floats", () => {
    expect(divide(0.25, 0.5)).toBe(0.5)
  })
  test("divides a negative and positive", () => {
    expect(divide(-10, 5)).toBe(-2)
  })
  test("throws error if a number is divided by 0", () => {
    expect(() => {
      divide(10, 0)
    }).toThrow()
  })
})
