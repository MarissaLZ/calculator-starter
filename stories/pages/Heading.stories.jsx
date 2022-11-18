import Heading from "../../components/Heading"

export default {
  title: "components/Heading",
  component: Heading,
  argTypes: {
    label: { control: "text" },
    color: { control: { type: "color", presetColors: ["red", "green"] } },
    level: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "radio" },
    },
  },
}

const Template = (args) => <Heading {...args} />

export const DefaultHeading = Template.bind({})
DefaultHeading.args = {
  label: "Heading",
  level: "h2",
  margin: "60px",
  color: "red",
}
