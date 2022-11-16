import React from "react"
import TestButton from "../../components/TestButton"
import { action } from "@storybook/addon-actions"
import { within, userEvent } from "@storybook/testing-library"
import { expect } from "@storybook/jest"

//defining story
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   */
  title: "Components/TestButton",
  component: TestButton,
  argTypes: {
    setIsToggled: { action: "click" },
    isToggled: { control: "boolean" },
  },
}

const Template = (args) => <TestButton {...args} />

export const FirstTestButton = Template.bind({})
//define arguments
FirstTestButton.args = {
  text: "test button",
}

export const ClickedButton = Template.bind({})
ClickedButton.args = { text: "test button" }

//test will appear in storybook
ClickedButton.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId("testBttn"))

  // await expect(canvas.getByText("test button")).toBeInTheDocument())
  await expect(args.setIsToggled).toHaveBeenCalled()
}
