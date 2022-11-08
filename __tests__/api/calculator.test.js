import handler from "../../pages/api/calculate/[...params]"

describe("/api/calculate/[...params]", () => {
  test("returns a valid result ", () => {
    //passing args to a mock req object parameters (method, params)
    const req = getRequestObject("GET", ["add", 2, 5])
    //calling responseObject. No args
    const res = getResponseObject()
    handler(req, res)
    expect(res._status).toBe(200)
    //testing json response
    expect(res._json).toEqual({ result: 7 })
  })

  test("api returns a 500 response and an error result", () => {
    // call to our mock req and res objects
    const req = getRequestObject("GET", ["invalid operation", 1, 1])
    const res = getResponseObject()
    handler(req, res)
    expect(res._status).toBe(500)
    expect(res._json).toEqual({
      message: `Unsupported operation ${req.query.params[0]}`,
    })
  })

  test("api returns an error if more than 3 arguments are passed", () => {
    // call to our mock req and res objects
    const req = getRequestObject("GET", ["add", 1, 1, 4])
    const res = getResponseObject()
    handler(req, res)
    expect(res._status).toBe(500)
    expect(res._json).toEqual({
      message: "Query params should have 3 items. Received 4: add,1,1,4",
    })
  })
})

//expecting to call 2 functions (status and json)
// mocking functions below
const getRequestObject = (method, params) => {
  //mocking a req
  return {
    //key: value
    method: method, //method: 'GET',
    query: { params }, //object literal shorthand
    //in an actual req  query: { params: [ 'add', '1', '2' ] },
  }
}

//response is trickier than the request
const getResponseObject = (method, params) => {
  return {
    _status: null,
    _json: null,
    status: function (s) {
      this._status = s
      return this
    },
    json: function (j) {
      this._json = j
      return this
    },
  }
}

//Need to do a test if returns a nonvalid result when getting valid params

// this will always point to the current scope or instance from where it's called.
