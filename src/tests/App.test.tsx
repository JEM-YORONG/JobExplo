import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('renders JobExplo landing page', () => {
  render(<App />)
  const titleElement = screen.getAllByRole('link', { name: /jobexplo/i }).find(link => !link.parentElement?.getAttribute('class')?.includes('nav'))
  expect(titleElement).toBeInTheDocument()
})
