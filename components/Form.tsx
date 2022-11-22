import React, { useState } from "react"

type FormProps = {
  onSubmit: (n: number) => void
}

export const Form = ({ onSubmit }: FormProps) => {
  const [value, setValue] = React.useState(1)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="number-of-facts">Number of Dog Facts</label>
        <input
          value={value}
          //+ converts string to a number
          onChange={(event) => setValue(+event.target.value)}
          id="number-of-facts"
        />
      </div>
      <input type="submit" value="Fetch Dog Facts" />
    </form>
  )
}
