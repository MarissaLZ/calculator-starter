import Grid2 from "@mui/material/Unstable_Grid2"
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material"
import { OutlinedInput } from "@mui/material"
import axios from "axios"
import { useState, ChangeEvent, FormEvent } from "react"

export const Calculator = () => {
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")
  const [value, setValue] = useState({ first: "", second: "" })

  //Cast event.target to the appropriate HTML element to ensure
  // it is HTMLSelectElement which does have a value property:
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setOperation(e.target.value)
  }
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...value, [e.target.id]: e.target.value })
  }

  const handleCalculate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const query = {
      operation: operation,
      first: value.first,
      second: value.second,
    }
    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result)
        console.log("res", res)
        console.log("res.data.result", res.data.result)
      })
      .catch((err) => {
        console.log("err", err)
        err.response.data.message
          ? setResult(err.response.data.message)
          : setResult(err.message)
      })
  }

  return (
    <>
      <form id="calculator-form" aria-label="form" onSubmit={handleCalculate}>
        <Grid2 container spacing={1}>
          <Grid2 xs={5}>
            <FormControl fullWidth>
              <TextField
                id="first"
                label="First Number"
                variant="outlined"
                onChange={handleInput}
                value={value.first}
              />
            </FormControl>
          </Grid2>
          <Grid2 xs={2}>
            <FormControl fullWidth>
              <NativeSelect
                input={<OutlinedInput />}
                defaultValue={""}
                inputProps={{
                  name: "operation",
                  id: "operation",
                }}
                onChange={handleChange}
              >
                <option value="">Op</option>
                <option value={"add"}>+</option>
                <option value={"subtract"}>-</option>
                <option value={"multiply"}>*</option>
                <option value={"divide"}>/</option>
              </NativeSelect>
            </FormControl>
          </Grid2>
          <Grid2 xs={5}>
            <FormControl fullWidth>
              <TextField
                id="second"
                label="Second Number"
                variant="outlined"
                onChange={handleInput}
                value={value.second}
              />
            </FormControl>
          </Grid2>
          <Grid2 xs={12}>
            <FormControl fullWidth>
              <Button variant="contained" type="submit" data-testid="calcBttn">
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
                {result && (
                  <Typography
                    id="result"
                    data-testid="result"
                    align="center"
                    variant="h3"
                    gutterBottom
                    role="heading"
                  >
                    {result}
                  </Typography>
                )}
              </Paper>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </>
  )
}
