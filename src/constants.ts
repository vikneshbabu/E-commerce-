import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Ceramic Vase',
    price: 85,
    category: 'Home Decor',
    description: 'A hand-crafted ceramic vase with a matte finish, perfect for minimalist interiors.',
    image: 'https://picsum.photos/seed/vase1/800/1000',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Raw Linen Throw',
    price: 120,
    category: 'Textiles',
    description: '100% pure linen throw in a natural stone color. Soft, breathable, and timeless.',
    image: 'https://picsum.photos/seed/linen/800/1000',
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Oak Stool No. 4',
    price: 240,
    category: 'Furniture',
    description: 'Solid oak stool with clean lines and a satin finish. Versatile and durable.',
    image: 'https://picsum.photos/seed/stool/800/1000',
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Palo Santo Incense Holder',
    price: 45,
    category: 'Home Decor',
    description: 'Brushed brass incense holder designed specifically for palo santo sticks.',
    image: 'https://picsum.photos/seed/incense/800/1000',
    rating: 4.6,
    reviews: 210
  },
  {
    id: '5',
    name: 'Concrete Desk Lamp',
    price: 180,
    category: 'Lighting',
    description: 'Industrial-inspired desk lamp with a weighted concrete base and warm LED bulb.',
    image: 'https://picsum.photos/seed/lamp/800/1000',
    rating: 4.8,
    reviews: 42
  },
  {
    id: '6',
    name: 'Wool & Silk Rug',
    price: 450,
    category: 'Textiles',
    description: 'Hand-knotted rug featuring a subtle geometric pattern. Luxurious feel.',
    image: 'https://picsum.photos/seed/rug/800/1000',
    rating: 5.0,
    reviews: 18
  }
];

export const CATEGORIES = ['All', 'Home Decor', 'Textiles', 'Furniture', 'Lighting'];
