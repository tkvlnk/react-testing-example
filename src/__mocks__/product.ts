import faker from 'faker';
import { Product, ProductsOriginData } from '../store/products';
import { ProductFormData } from '../containers/ProductForm';

export const buildProduct: () => Product = () => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
  price: faker.random.number({ min: 0, max: 1200 }),
  origin: faker.helpers.randomize(['usa', 'europe', 'asia', 'africa']),
  isEditable: faker.random.boolean()
});

export const buildProductFormData: () => ProductFormData = () => ({
  name: faker.random.alphaNumeric(10),
  price: faker.random.number({ min: 0, max: 1200 }).toString(),
  origin: faker.helpers.randomize(['usa', 'europe', 'asia', 'africa'])
});

export function getProductsOriginDisplayName(
  origin: string,
  productOrigins: ProductsOriginData[]
) {
  return (
    productOrigins?.find(({ value }) => value === origin)?.displayName ||
    'definitely-absent-products-origin'
  );
}
