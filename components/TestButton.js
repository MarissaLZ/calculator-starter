import React from "react"
// import { Button } from "@mui/material"
const TestButton = ({ isToggled, setIsToggled, text }) => {
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
