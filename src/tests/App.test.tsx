import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('renders JobExplo landing page', () => {
  render(<App />)
  const titleElement = screen.getByText(/jobexplo/i)
  expect(titleElement).toBeInTheDocument()
})
