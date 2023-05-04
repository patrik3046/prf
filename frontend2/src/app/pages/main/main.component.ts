import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { MongoService } from 'src/app/services/mongo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products : Product[] = [];

  constructor(private mongo: MongoService, private auth: AuthService) { }

  ngOnInit(): void {
    this.mongo.getAllProduct().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      });
  }

  logout() {
    this.auth.logout();
  }

}
