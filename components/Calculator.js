import Grid2 from "@mui/material/Unstable_Grid2"
import {
  Box,
  Paper,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Divider,
  Typography,
} from "@mui/material"
import axios from "axios"

import { useState } from "react"

const Calculator = () => {
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")

  const handleChange = (e) => {
    setOperation(e.target.value)
  }

  const handleCalculate = (e) => {
    console.log("first ", typeof e.target.first.value, e.target.first.value)
    console.log("second", typeof e.target.second.value, e.target.second.value)

    e.preventDefault()
    const query = {
      operation: operation,
      first: e.target.first.value,
      second: e.target.second.value,
    }

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result)
      })
      .catch((err) => {
        setResult(err.response.data.message)
      })
  }

  return (
    <form onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="first" label="First Number" variant="outlined" />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <Select
              id="operation-select"
              value={operation}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"add"}>+</MenuItem>
              <MenuItem value={"subtract"}>-</MenuItem>
              <MenuItem value={"multiply"}>*</MenuItem>
              <MenuItem value={"divide"}>/</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="second" label="Second Number" variant="outlined" />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit" id="calculateButton">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  )
}
export default Calculator
