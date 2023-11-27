import { Product } from '../../models/Product'
import './Order.css'
import '../Product/Product.css'

interface OrderItem extends Product {
  quantity: number
}

interface Props {
  order: OrderItem[]
  subTotal: number
  onRemoveProduct: (product: Product) => void
  onAddProduct: (product: Product) => void
  onDecrement: (product: Product) => void
}

export function Order({
  order,
  subTotal,
  onRemoveProduct,
  onAddProduct,
  onDecrement,
}: Props) {
  const calculateG95Discount = (quantity: number, price: number) => {
    const discountQuantity = Math.floor(quantity / 2)
    return discountQuantity * price
  }

  const total = subTotal > 1000 ? subTotal * 0.8 : subTotal
  const g95Items = order.find((item) => item.code === 'G95')
  const totalG95 = g95Items?.quantity ?? 0
  const discountedG95 = calculateG95Discount(totalG95, g95Items?.price ?? 0)
  const finalTotal = total - discountedG95

  const bogoEligible = (g95Items?.quantity ?? 0) > 1
  const discountEligible = subTotal >= 1000

  return (
    <div className="Order">
      <h2 className="Order-title" data-testid="order-title">
        Your Order
      </h2>
      <p data-testid={'subtotal'} className="Order-title">
        Subtotal - {(subTotal / 100).toFixed(2)}
      </p>
      {(bogoEligible || discountEligible) && (
        <p className="Order-title" data-testid="discount-total">
          Total after discounts - {(finalTotal / 100).toFixed(2)}
        </p>
      )}

      {order.map((x) => (
        <div key={x.code} className="Product">
          <div className="Product-name">{x.name}</div>
          <div className="Product-price">
            <span
              data-testid={'decrement-' + x.code}
              onClick={() => onDecrement(x)}
            >
              &#60;
            </span>
            {'\n'}
            <span data-testid={'qty-' + x.code}>Qty:{x.quantity}</span>
            {'\n'}
            <span data-testid={'add-' + x.code} onClick={() => onAddProduct(x)}>
              &#62;
            </span>
            {'\n'}
            <span
              data-testid={'remove-' + x.code}
              onClick={() => onRemoveProduct(x)}
            >
              &#215;
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
