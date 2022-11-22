//testing an api

import { test, expect } from "@playwright/test"
//const { test, expect } = require("@playwright/test")

test.describe("api testing", () => {
  test("api get request with addition", async ({ request }) => {
    //call the api
    const result = await request.get("/api/calculate/add/2/2", {})
    expect(result.ok()).toBeTruthy()
    expect(await result.json()).toEqual({ result: 4 })
  })

  test("api get request failure if only the first input has a valid parameter", async ({
    request,
  }) => {
    //call the api
    const result = await request.get("/api/calculate/add/2", {})
    await expect(result).not.toBeOK()
    expect(await result.json()).toEqual({
      message: "Query params should have 3 items. Received 2: add,2",
    })
  })
})

test("api get request fails if there is no input", async ({ request }) => {
  //call the api
  const result = await request.get("/api/calculate", {})
  await expect(result).not.toBeOK()
})
