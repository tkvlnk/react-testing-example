import faker from 'faker';
import { Product } from '../store/products';
import { ProductFormData } from '../containers/ProductForm';

export const buildProduct: () => Product = () => ({
  id: faker.random.uuid(),
  name: faker.random.alphaNumeric(10),
  price: faker.random.number({
    min: 1,
    max: 1200
  }),
  origin: faker.helpers.randomize(['usa', 'europe', 'asia', 'africa']),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
  isEditable: faker.random.boolean()
});

export const buildProductDto: () => ProductFormData = () => ({
  name: faker.random.alphaNumeric(10),
  price: faker.random
    .number({
      min: 1,
      max: 1200
    })
    .toString(),
  origin: faker.helpers.randomize(['usa', 'europe', 'asia', 'africa'])
});
