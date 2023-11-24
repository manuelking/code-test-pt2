import { render, screen } from '@testing-library/react'
import { Product } from '../../models/Product'
import { OrderItem } from '../App/App'
import { Order } from './Order'
import ReactDOM from 'react-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

const mockHandler = jest.fn()
const productA = new Product('CA6', 'Cake', 200)
const subTotal = 200

const orderItems = [
  {
    ...productA,
    quantity: 2,
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
        onRemoveProduct={() => mockHandler(productA)}
        onAddProduct={() => mockHandler(productA)}
        onDecrement={() => mockHandler(productA)}
      />
    )
    userEvent.click(screen.getByTestId('decrement-CA6'))
    expect(mockHandler).toHaveBeenCalledWith(productA)
  })

  test('on add order item', () => {
    render(
      <Order
        order={orderItems}
        subTotal={subTotal}
        onRemoveProduct={() => mockHandler(productA)}
        onAddProduct={() => mockHandler(productA)}
        onDecrement={() => mockHandler(productA)}
      />
    )
    userEvent.click(screen.getByTestId('add-CA6'))
    expect(mockHandler).toHaveBeenCalledWith(productA)
  })

  test('on remove order item', () => {
    render(
      <Order
        order={orderItems}
        subTotal={subTotal}
        onRemoveProduct={() => mockHandler(productA)}
        onAddProduct={() => mockHandler(productA)}
        onDecrement={() => mockHandler(productA)}
      />
    )
    userEvent.click(screen.getByTestId('remove-CA6'))
    expect(mockHandler).toHaveBeenCalledWith(productA)
  })
})

// test('discount total renders', () => {
//   const bogoEligible = true
//   const discountEligible = false

//   render(
//     <Order
//       order={orderItems}
//       subTotal={subTotal}
//       onRemoveProduct={() => mockHandler(productA)}
//       onAddProduct={() => mockHandler(productA)}
//       onDecrement={() => mockHandler(productA)}
//     />
//   )

//   const totalAfterDiscountElement = screen.queryByTestId('total-after-discount')

// })
