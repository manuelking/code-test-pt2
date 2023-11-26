import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Order } from './Order' // Adjust the import path
import { OrderItem } from '../App/App'
import userEvent from '@testing-library/user-event'
import { Product } from '../../models/Product'

const mockOnRemoveProduct = jest.fn()
const mockOnAddProduct = jest.fn()
const mockOnDecrement = jest.fn()
const productA = new Product('CA6', 'Cake', 200)
const productB = new Product('G95', 'Asparagus', 83)
const subTotal = 1200

const orderItems = [
  {
    ...productA,
    quantity: 2,
  },
  {
    ...productB,
    quantity: 3,
  },
] as OrderItem[]

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Order
      order={orderItems}
      subTotal={subTotal}
      onRemoveProduct={() => {}}
      onAddProduct={() => {}}
      onDecrement={() => {}}
    />,
    div
  )
})

describe('oder item handlers are called', () => {
  test('on decrement order item qty', () => {
    render(
      <Order
        order={orderItems}
        subTotal={subTotal}
        onRemoveProduct={() => mockOnRemoveProduct(productA)}
        onAddProduct={() => mockOnAddProduct(productA)}
        onDecrement={() => mockOnDecrement(productA)}
      />
    )
    userEvent.click(screen.getByTestId('decrement-CA6'))
    expect(mockOnDecrement).toHaveBeenCalledWith(productA)
  })

  test('on add order item', () => {
    render(
      <Order
        order={orderItems}
        subTotal={subTotal}
        onRemoveProduct={() => mockOnRemoveProduct(productA)}
        onAddProduct={() => mockOnAddProduct(productA)}
        onDecrement={() => mockOnDecrement(productA)}
      />
    )
    userEvent.click(screen.getByTestId('add-CA6'))
    expect(mockOnAddProduct).toHaveBeenCalledWith(productA)
  })

  test('on remove order item', () => {
    render(
      <Order
        order={orderItems}
        subTotal={subTotal}
        onRemoveProduct={() => mockOnRemoveProduct(productA)}
        onAddProduct={() => mockOnAddProduct(productA)}
        onDecrement={() => mockOnDecrement(productA)}
      />
    )
    userEvent.click(screen.getByTestId('remove-CA6'))
    expect(mockOnRemoveProduct).toHaveBeenCalledWith(productA)
  })
})

test('renders order title', () => {
  render(
    <Order
      order={orderItems}
      subTotal={subTotal}
      onRemoveProduct={mockOnRemoveProduct}
      onAddProduct={mockOnAddProduct}
      onDecrement={mockOnDecrement}
    />
  )
  expect(screen.getByTestId('order-title')).toBeInTheDocument()
})

test('renders subtotal correctly', () => {
  render(
    <Order
      order={orderItems}
      subTotal={subTotal}
      onRemoveProduct={mockOnRemoveProduct}
      onAddProduct={mockOnAddProduct}
      onDecrement={mockOnDecrement}
    />
  )
  expect(screen.getByTestId('subtotal')).toHaveTextContent('Subtotal - 12.00')
})

test('renders total after discounts when eligible', () => {
  render(
    <Order
      order={orderItems}
      subTotal={subTotal}
      onRemoveProduct={mockOnRemoveProduct}
      onAddProduct={mockOnAddProduct}
      onDecrement={mockOnDecrement}
    />
  )
  expect(screen.getByTestId('discount-total')).toHaveTextContent(
    'Total after discounts - 8.77'
  )
})

test('renders product names and quantities correctly', () => {
  render(
    <Order
      order={orderItems}
      subTotal={subTotal}
      onRemoveProduct={mockOnRemoveProduct}
      onAddProduct={mockOnAddProduct}
      onDecrement={mockOnDecrement}
    />
  )

  orderItems.forEach((item) => {
    const productName = screen.getByText(item.name)
    const productQuantity = screen.getByTestId(`qty-${item.code}`)

    expect(productName).toBeInTheDocument()
    expect(productQuantity).toHaveTextContent(`Qty:${item.quantity}`)
  })
})
