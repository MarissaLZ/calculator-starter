import Calculator from "../../components/Calculator"
import React from "react"

//defining story
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   */
  //   title: "components/Calculator",
  component: Calculator,
}

const Template = (args) => <Calculator />
//create  a story
export const FirstCalculator = Template.bind({})
