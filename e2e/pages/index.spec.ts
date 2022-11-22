// @ts-check
//end2end testing simulates a user interacting with the application

//const { test, expect } = require("@playwright/test")
import { test, expect } from "@playwright/test"

test(" calculator multiply", async ({ page }) => {
  //user navigates to home pg
  await page.goto("/")
  //se types in a number
  await page.type("#first", "5")
  await page.type("#second", "3")
  //user selects an operation from drop down
  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")
  //user clicks on button and submits inputs
  await page.click('button[type="submit"]')
  //result
  const result = page.locator("#result")
  await expect(result).toContainText("15")
})

test(" calculator addition", async ({ page }) => {
  //user navigates to home pg
  await page.goto("/")
  //se types in a number
  await page.type("#first", "1")
  await page.type("#second", "2")
  //user selects an operation from drop down
  await page.click("#operation")
  await page.locator("#operation").selectOption("add")
  //user clicks on button and submits inputs
  await page.click('button[type="submit"]')
  //result
  const result = page.locator("#result")
  await expect(result).toContainText("3")
})

test("clicking the test link routes to /test route", async ({ page }) => {
  await page.goto("/")
  //locate the link
  const findLink = page.getByRole("link")
  await expect(findLink).toHaveAttribute("href", "/test")
  //click the link
  await findLink.click()
  //expect the url to contain test
  await expect(page).toHaveURL(/.*test/)
})

test("calculator throws error if no operation is selected", async ({
  page,
}) => {
  await page.goto("/")
  await page.type("#first", "3")
  await page.type("#second", "")
  await page.click("#operation")
  await page.locator("#operation").selectOption("subtract")
  //click button
  await page.click('button[type="submit"]')

  const result = page.locator("#result")
  await expect(result).toContainText("params")
})
