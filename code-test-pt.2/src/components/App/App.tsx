import { ProductList } from '../ProductList/ProductList'
import { Order } from '../Order/Order'
import { productData } from '../../config/products'
import './App.css'
import { useState } from 'react'
import { Product } from '../../models/Product'

export interface OrderItem extends Product {
  quantity: number
}

export function App() {
  const [order, setOrder] = useState<OrderItem[]>([])

  const subTotal = order.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  )

  const handleAddProduct = (product: Product) => {
    const existingOrderProduct = order.find((p) => p.code === product.code)

    if (existingOrderProduct) {
      setOrder(
        (prevOrder) =>
          prevOrder.map((p) =>
            p.code === product.code ? { ...p, quantity: p.quantity + 1 } : p
          ) as OrderItem[]
      )
    } else {
      setOrder(
        (prevOrder) =>
          [...prevOrder, { ...product, quantity: 1 }] as OrderItem[]
      )
    }
  }

  const handleRemoveProduct = (product: Product) => {
    const updatedOrder = order.filter((p) => p.code !== product.code)

    setOrder(updatedOrder)
  }

  const handleDecrement = (product: Product) => {
    const existingOrderProduct = order.find((p) => p.code === product.code)

    if (existingOrderProduct) {
      if (existingOrderProduct.quantity === 1) {
        const updatedOrder = order.filter((p) => p.code !== product.code)
        setOrder(updatedOrder)
      } else {
        setOrder(
          (prevOrder) =>
            prevOrder.map((p) =>
              p.code === product.code ? { ...p, quantity: p.quantity - 1 } : p
            ) as OrderItem[]
        )
      }
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome to the Checkout</h1>
      </div>
      <div className="App-body">
        <ProductList products={productData} onAddProduct={handleAddProduct} />
        <Order
          order={order}
          subTotal={subTotal}
          onRemoveProduct={handleRemoveProduct}
          onAddProduct={handleAddProduct}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  )
}
