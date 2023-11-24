import React from 'react'
import ReactDOM from 'react-dom'
import { App, OrderItem } from './App'
import { Order } from '../Order/Order'
import { Product } from '../../models/Product'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const productA = new Product('CA6', 'Cake', 200)

const mockOrder = [
  {
    ...productA,
  },
]

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
