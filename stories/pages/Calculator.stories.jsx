import Calculator from "../../components/Calculator"
import React from "react"
import { within, userEvent, waitFor } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import { rest } from "msw"

//defining story
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   */
  title: "Components/Calculator",
  component: Calculator,
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/calculate/*", (req, res, ctx) => {
          console.log("req.params", req.params) // {0: 'add/1/2'}
          if (req.params[0] == "//") {
            return res(
              ctx.status(500, "no params entered"),
              ctx.json({ message: "no params entered" })
            )
          }
          const splitParams = req.params[0].split("/")
          const params = splitParams.filter((param) => param != "")
          console.log("params", params)
          //["add", "1", "2"]

          if (params.length !== 3) {
            return res(
              ctx.status(
                500,
                `did not receive expected number of params. Got ${params}`
              ),
              ctx.json({
                message: `did not receive expected number of params. Got ${params}`,
              })
            )
          } else if (isNaN(params[1]) || isNaN(params[2])) {
            return res(
              ctx.status(500, `did not receive expected params. Got ${params}`),
              ctx.json({
                message: `did not receive expected params. Got ${params}`,
              })
            )
          }
          return res(
            ctx.json({
              result: "okay",
            })
          )
        }),
      ],
    },
  },
}

const Template = (args) => <Calculator />
//create  a story
export const Default = Template.bind({})

export const InteractiveTest = Template.bind({})
InteractiveTest.play = async ({ parameters, canvasElement }) => {
  console.log("args", parameters)
  const canvas = within(canvasElement)
  const form = canvas.getByRole("form")
  const calculateButton = canvas.getByTestId("calcBttn")
  await userEvent.type(canvas.getByLabelText("First Number"), "1")
  await userEvent.type(canvas.getByLabelText("Second Number"), "4")
  await userEvent.selectOptions(form.querySelector("#operation"), ["add"])
  await userEvent.click(calculateButton)
  await waitFor(() => {
    expect(canvas.getByTestId("result")).toHaveTextContent("okay")
  })
}
//should I add a toThrow???????
export const NoParamsTest = Template.bind({})
NoParamsTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const calculateButton = canvas.getByTestId("calcBttn")
  await userEvent.type(canvas.getByLabelText("First Number"), "")
  await userEvent.type(canvas.getByLabelText("Second Number"), "")
  await userEvent.click(calculateButton)
  await waitFor(() => {
    expect(canvas.getByTestId("result")).toHaveTextContent("no params entered")
  })
}
export const InvalidParamsLength = Template.bind({})
InvalidParamsLength.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const calculateButton = canvas.getByTestId("calcBttn")
  await userEvent.type(canvas.getByLabelText("First Number"), "4")
  await userEvent.type(canvas.getByLabelText("Second Number"), "5")
  await userEvent.click(calculateButton)
  await waitFor(() => {
    expect(canvas.getByTestId("result")).toHaveTextContent(
      "did not receive expected params"
    )
  })
}
export const InvalidParamsTest = Template.bind({})
InvalidParamsTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const form = canvas.getByRole("form")
  const calculateButton = canvas.getByTestId("calcBttn")
  await userEvent.type(canvas.getByLabelText("First Number"), "*")
  await userEvent.type(canvas.getByLabelText("Second Number"), "*")
  await userEvent.selectOptions(form.querySelector("#operation"), ["add"])

  await userEvent.click(calculateButton)
  await waitFor(() => {
    expect(canvas.getByTestId("result")).toHaveTextContent(
      "did not receive expected params."
    )
  })
}
