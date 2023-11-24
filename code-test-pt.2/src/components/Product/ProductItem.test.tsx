import ReactDOM from 'react-dom'
import { ProductItem } from './ProductItem'
import { Product } from '../../models/Product'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const productA = new Product('CA6', 'Cake', 200)
const mockOnAddProduct = jest.fn()

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ProductItem product={productA} onAddProduct={() => {}} />,
    div
  )
})

test('add product click handler called', () => {
  render(
    <ProductItem
      product={productA}
      onAddProduct={() => mockOnAddProduct(productA)}
    />
  )
  const element = screen.getByTestId('CA6')
  userEvent.click(element)
  expect(mockOnAddProduct).toHaveBeenCalledWith(productA)

  //   userEvent.click(screen.getByText(/Cake/i));
  //     expect(mockOnAddProduct).toHaveBeenCalledWith(productA);
})
