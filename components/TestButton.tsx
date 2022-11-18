import React from "react"
// import { Button } from "@mui/material"

interface TestButtonProps {
  isToggled: boolean
  setIsToggled: (value: boolean) => void
  text: string
}
const TestButton = ({ isToggled, setIsToggled, text }: TestButtonProps) => {
  return (
    <button
      data-testid="testBttn"
      onClick={() => setIsToggled(!isToggled)}
      style={{ backgroundColor: isToggled ? "red" : "green", width: "200px" }}
    >
      {text}
    </button>
  )
}
export default TestButton
