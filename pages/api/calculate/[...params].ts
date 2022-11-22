import { add, subtract, multiply, divide } from "../../../utils/calculate"
import { NextApiRequest } from "next"
import { NextApiResponse } from "next"

export type RequestObj = {
  method: string
  query: { params: string[] }
}

export type ResponseObj = {
  _status: null
  _json: null
  status: Function
  json: Function
}

//function handler does not return anything
export default function handler(
  req: NextApiRequest | RequestObj,
  res: NextApiResponse | ResponseObj
): void {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      )
    }
    // console.log("req", req)
    // console.log("req.query.params", req.query.params) //[ 'add', '3', '1' ]

    //nextApiRequest likely can have type string, string[]
    const queryParams = req.query.params

    // prevents queryParams for being a string or undefined an ensure it is only an array
    if (!Array.isArray(queryParams)) {
      throw new Error(`Query params should have 3 items. ${queryParams}`)
    }
    // function converts query params to an key/value pairs in an object
    const params = extractParams(queryParams) // converts to { operation: 'add', first: 3, second: 1 }
    // console.log("params", params)
    let result: number
    switch (params.operation) {
      case "add":
        result = add(params.first, params.second)
        break
      case "subtract":
        result = subtract(params.first, params.second)
        break
      case "multiply":
        result = multiply(params.first, params.second)
        break
      case "divide":
        result = divide(params.first, params.second)
        break
      default:
        throw new Error(`Unsupported operation ${params.operation}`)
    }
    //status and result
    res.status(200).json({ result })
  } catch (error) {
    // catch clause varaibles have type unknown instead of any
    //Typescript doesn't accept types for clause catch arguments
    //Typescript doesn't let you do that because there's no way that typescript
    //can verify at compile time that the only thing the code can throw is a ValidationError
    //You cannot write a specific annotation for the catch clause variable in Typescript,
    // because in js a catch clause will catch any exception that is thrown, not just exceptions of a specified type.
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

interface CalculatorParams {
  operation: string
  first: number
  second: number
}

// function returns object {operation: string , first: Number, second: number}
// function takes a parameter that is an array with string types
function extractParams(queryParams: string[]): CalculatorParams {
  // console.log("queryparams", queryParams)

  if (queryParams.length !== 3) {
    // console.log("throws error in length test")
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    )
  }

  try {
    const params: CalculatorParams = {
      operation: queryParams[0],
      first: parseFloat(queryParams[1]),
      second: parseFloat(queryParams[2]),
    }

    // if (isNaN(params.first) || isNaN(params.second)) {
    //   throw new Error(`Failed to process query params. Received ${queryParams}`)
    // }
    return params
  } catch (e) {
    throw new Error(`Failed to process query params. Received: ${queryParams}`)
  }
}
