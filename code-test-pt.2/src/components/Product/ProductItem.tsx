import { Product } from '../../models/Product'
import './Product.css'

interface Props {
  product: Product
  onAddProduct: (product: Product) => void
}

export function ProductItem({ product, onAddProduct }: Props) {
  return (
    <div
      data-testid={product.code}
      className="Product"
      onClick={() => onAddProduct(product)}
    >
      <div className="Product-name">{product.name}</div>
      <div className="Product-price">£{product.getFormattedPrice()}</div>
    </div>
  )
}
