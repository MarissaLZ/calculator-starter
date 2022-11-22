import { Typography } from "@mui/material"
import React from "react"

interface HeadingProps {
  label: string
  // level: string
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" //why?
  margin: string
  color: string
}

const Heading = ({ label, level, margin, color }: HeadingProps) => {
  return (
    <Typography
      data-testid="heading"
      variant={level}
      sx={{ margin: { margin } }}
      color={color}
    >
      {label}
    </Typography>
  )
}
export default Heading
