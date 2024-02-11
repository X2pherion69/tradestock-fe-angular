import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@ngneat/query';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getProducts() {
    return this.#query({
      queryKey: ['products'],
      queryFn: () =>
        this.#http.get<ProductResponse>('https://dummyjson.com/products'),
    });
  }
}
