import { Typography, Container, Stack } from "@mui/material"
import Calculator from "../components/Calculator"
import Link from "next/link"
import TestButton from "../components/TestButton"
import { useState } from "react"

export default function Home() {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <>
      <Container maxWidth="sm">
        <Stack>
          <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
            The Amazing Calculator
          </Typography>
          <Calculator />
        </Stack>
      </Container>
      <Link href="/test">
        <Typography variant="h4" sx={{ color: "white" }}>
          Test Route
        </Typography>
      </Link>
      <TestButton
        isToggled={isToggled}
        setIsToggled={setIsToggled}
        text="This is a test button for passing props"
      />
    </>
  )
}
