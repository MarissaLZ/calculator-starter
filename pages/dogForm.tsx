import React, { useState } from "react"
import { fetchDogFacts } from "../dogFactsFetch"
import { Form } from "../components/Form"
import { Fact } from "../components/Fact"

export type DogFactType = {
  id: number
  fact: string
}

const FactsForm = () => {
  //facts is an array with type DogFact. Starts as an empty array
  const [facts, setFacts] = React.useState<DogFactType[]>([])

  const handleSubmit = (n: number) => {
    fetchDogFacts(n).then((facts) => {
      setFacts(facts)
    })
  }

  return (
    <main>
      <Form onSubmit={handleSubmit} />
      <section>
        {facts.map((fact, index) => (
          <Fact key={index} fact={fact.fact} />
        ))}
      </section>
    </main>
  )
}
export default FactsForm
