import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App, OrderItem } from './App'
import '@testing-library/jest-dom/extend-expect'
import { Order } from '../Order/Order'

const productA = {
  code: 'CA6',
  name: 'Cake',
  price: 200,
}

const orderItems = [
  {
    ...productA,
    quantity: 2,
  },
] as OrderItem[]

const mockHandler = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('handleAddProduct adds product to order', () => {
  render(
    <Order
      order={orderItems}
      subTotal={200}
      onRemoveProduct={() => mockHandler(productA)}
      onAddProduct={() => mockHandler(productA)}
      onDecrement={() => mockHandler(productA)}
    />
  )

  userEvent.click(screen.getByTestId('add-CA6'))
})

test('adds a product to the order on clicking', () => {
  render(<App />)
  fireEvent.click(screen.getByTestId(productA.code))

  const orderItem = screen.getByTestId(`qty-${productA.code}`)
  expect(orderItem).toHaveTextContent('Qty:1')
})

test('removes a product from the order', () => {
  render(<App />)
  userEvent.click(screen.getByTestId(productA.code))
  userEvent.click(screen.getByTestId(`remove-${productA.code}`))

  const orderItem = screen.queryByTestId(`qty-${productA.code}`)
  expect(orderItem).toBeNull()
})

test('increments quantity on clicking add', () => {
  render(<App />)
  userEvent.click(screen.getByTestId(productA.code))
  userEvent.click(screen.getByTestId(`add-${productA.code}`))

  const orderItem = screen.getByTestId(`qty-${productA.code}`)
  expect(orderItem).toHaveTextContent('Qty:2')
})

test('decrements quantity on clicking decrement', () => {
  render(<App />)
  userEvent.click(screen.getByTestId(productA.code))
  userEvent.click(screen.getByTestId(`decrement-${productA.code}`))

  const orderItem = screen.queryByTestId(`qty-${productA.code}`)
  expect(orderItem).toBeNull()
})
test('updates quantity on clicking decrement and increment buttons', () => {
  render(<App />)
  userEvent.click(screen.getByTestId(productA.code))

  userEvent.click(screen.getByTestId(`add-${productA.code}`))
  let orderItem = screen.getByTestId(`qty-${productA.code}`)
  expect(orderItem).toHaveTextContent('Qty:2')

  userEvent.click(screen.getByTestId(`decrement-${productA.code}`))
  orderItem = screen.getByTestId(`qty-${productA.code}`)
  expect(orderItem).toHaveTextContent('Qty:1')
})
