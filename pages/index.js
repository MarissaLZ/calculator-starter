import { Typography, Container, Stack } from "@mui/material"
import Calculator from "../components/calculator"

import Link from "next/link"

export default function Home() {
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
    </>
  )
}
