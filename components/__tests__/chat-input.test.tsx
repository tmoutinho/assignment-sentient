import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInput } from '../chat-input'

describe('ChatInput', () => {
  const defaultProps = {
    inputValue: '',
    setInputValue: jest.fn(),
    onSubmit: jest.fn(),
    isLoading: false,
  }

  it('renders the input field', () => {
    render(<ChatInput {...defaultProps} />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('calls onSubmit when form is submitted with non-empty input', () => {
    const mockOnSubmit = jest.fn()
    render(
      <ChatInput
        {...defaultProps}
        inputValue="Test message"
        onSubmit={mockOnSubmit}
      />,
    )

    const submitButton = screen.getByTestId('submit-chat-form')
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('updates input value when typing', () => {
    const mockSetInputValue = jest.fn()
    render(<ChatInput {...defaultProps} setInputValue={mockSetInputValue} />)

    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'Test message' } })

    expect(mockSetInputValue).toHaveBeenCalledWith('Test message')
  })

  it('does not call onSubmit when input is empty', () => {
    const mockOnSubmit = jest.fn()
    render(
      <ChatInput {...defaultProps} inputValue="" onSubmit={mockOnSubmit} />,
    )

    const submitButton = screen.getByTestId('submit-chat-form')
    fireEvent.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('disables input when isLoading is true', () => {
    render(<ChatInput {...defaultProps} isLoading={true} />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled()
  })
})
