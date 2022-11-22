import * as React from "react"
import "@testing-library/jest-dom"
import { expect, jest, test } from "@jest/globals"
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { add, subtract, multiply, divide } from "../utils/calculate"
import { Calculator } from "../components/Calculator"
import Home from "../pages/index"
//import axios from "axios"
import TestButton from "../components/TestButton"
//jest.mock("axios")
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
  //requesy may go to default port
  rest.get("http://localhost/api/calculate/*", (req, res, ctx) => {
    //can access request.params
    return res(ctx.status(200), ctx.json({ result: 3 }))
  })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

//this is not a good approach and is not unit  testing
describe("mock api response", () => {
  test("loading result", async () => {
    render(<Calculator />)
    const addOperation = screen.getByRole("option", { name: "+" })
    const firstNum = screen.getByLabelText("First Number")
    const secondNum = screen.getByLabelText("Second Number")
    //must add the frist and second number and operation
    // fireEvent.change(addOperation, {
    //   target: { value: "add" },
    // })
    // fireEvent.change(firstNum, { target: { value: "2" } })
    // fireEvent.change(secondNum, { target: { value: "1" } })
    // fireEvent.click(screen.getByTestId("calcBttn"))
    // await waitFor(() => screen.findByTestId("result"))
    // expect(screen.findByTestId("result")).toHaveTextContent("3")

    await userEvent.click(screen.getByTestId("calcBttn"))
    setTimeout(() => {
      expect(screen.findByTestId("result")).toHaveTextContent("3")
    }, 1000)
  })
})

//forgot to import jest-dom
describe("link on home page", () => {
  test("Link", () => {
    render(<Home />)
    const linkElement = screen.getAllByRole("link")
    expect(linkElement[0]).toBeInTheDocument()
    expect(linkElement[0].getAttribute("href")).toBe("/test")
  })
})

describe("Calculator Component", () => {
  test("renders elements in Calculator correctly", () => {
    render(<Calculator />)
    expect(screen.getByRole("form")).toBeInTheDocument()
    expect(screen.getByLabelText("First Number")).toBeInTheDocument()
    expect(screen.getByLabelText("Second Number")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "+" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "-" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "*" })).toBeInTheDocument()
    expect(screen.getByTestId("calcBttn")).toBeInTheDocument()
    //expect(screen.getByTestId("result")).toBeInTheDocument()
  })
})

describe("TestButton Component", () => {
  test("passing props", () => {
    render(<TestButton text="testing passing props" />)
    expect(screen.getByText("testing passing props")).toBeInTheDocument()
  })
  test("clicking the test button calls the callback handler  ", () => {
    //using jest to create a mocked function
    const setIsToggled = jest.fn()
    render(
      <TestButton text="testing passing props" setIsToggled={setIsToggled} />
    )
    const testButton = screen.getByText("testing passing props")
    //fire event on button
    fireEvent.click(testButton)
    //asserting the callback handler function is called
    expect(setIsToggled).toHaveBeenCalled()
  })
})

describe("number input", () => {
  test("testing number input ", async () => {
    render(<Calculator />)
    const form = screen.getByRole("form")
    const firstNum = screen.getByLabelText("First Number")
    const secondNum = screen.getByLabelText("Second Number")
    const addOperation = screen.getByRole("option", { name: "+" })
    const calculateButton = screen.getByTestId("calcBttn")
    //const result = screen.getByTestId("result")

    fireEvent.change(addOperation, {
      target: { value: "add" },
    })
    fireEvent.change(firstNum, { target: { value: "2" } })
    fireEvent.change(secondNum, { target: { value: "1" } })
    userEvent.click(calculateButton)

    expect(screen.getByDisplayValue("2")).toBeInTheDocument()
    expect(screen.getByDisplayValue("1")).toBeInTheDocument()

    //fireEvent.click(calculateButton)
    //fireEvent.submit(form)

    //waitFor(() => expect(screen.findByTestId("result")).toBeInTheDocument())
    // waitFor(() => expect(screen.findByDisplayValue("3")).toBeInTheDocument())
    //expect(await screen.findByTestId("result")).toBeInTheDocument()
  })
})

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
  test("throws error when adding empty strings", () => {
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
  test("throws error when subtracting empty strings", () => {
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
