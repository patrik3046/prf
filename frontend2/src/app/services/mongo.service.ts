import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private httpClient: HttpClient) { }

  getProduct(id: Number) {
    return this.httpClient.get<Product>('http://localhost:3000/api/product/' + id, { headers: this.headers });
  }
  
  getAllProduct() {
    return this.httpClient.get<Product[]>('http://localhost:3000/api/product/', { headers: this.headers });
  }

  createProduct(name: string, description: string, price: number) {
    const body = { name, description, price };
    return this.httpClient.post<Product>('http://localhost:3000/api/product/', body, {headers: this.headers});
  }
}