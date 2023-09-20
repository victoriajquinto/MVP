import { render } from "@testing-library/react"
import App from "../src/components/App.jsx";

test("Renders the main page", () => {
  render(<App />)
  expect(true).toBeTruthy()
})
