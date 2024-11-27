import { render, screen, waitFor } from '@testing-library/react'
import { StreamingResponse } from '../streaming-response'

describe('StreamingResponse', () => {
  it('renders complete content when isComplete is true', () => {
    const content = 'Complete content'
    render(<StreamingResponse content={content} isComplete={true} />)

    expect(screen.getByText('Complete content')).toBeInTheDocument()
  })

  it('handles empty content', () => {
    render(<StreamingResponse content="" isComplete={true} />)

    expect(screen.getByTestId('streaming-response')).toBeInTheDocument()
    expect(screen.getByTestId('streaming-response')).toHaveTextContent('')
  })

  it('renders mobile-specific elements', () => {
    const content = 'Mobile content'
    render(
      <StreamingResponse content={content} isComplete={true} isMobile={true} />,
    )

    expect(screen.getByText('Search for it')).toBeInTheDocument()
  })

  it('renders streaming text content gradually', async () => {
    jest.useFakeTimers()
    const content = 'Hello\nWorld'

    render(<StreamingResponse content={content} isComplete={false} />)

    expect(screen.getByTestId('streaming-response')).toHaveTextContent('')

    await waitFor(
      () => {
        expect(screen.getByTestId('streaming-response')).toHaveTextContent('')
      },
      { timeout: 50 },
    )

    await waitFor(
      () => {
        expect(screen.getByTestId('streaming-response')).toHaveTextContent('H')
      },
      { timeout: 200 },
    )

    await waitFor(
      () => {
        expect(screen.getByTestId('streaming-response')).toHaveTextContent(
          'HelloWorl',
        )
      },
      { timeout: 500 },
    )

    jest.useRealTimers()
  })
})
