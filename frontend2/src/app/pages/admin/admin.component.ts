import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { MongoService } from 'src/app/services/mongo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  product: Product = {
    _id: -1,
    name: '',
    price: 0,
    description: ''
  };

  constructor(private mongo: MongoService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.mongo.createProduct(this.product.name, this.product.description, this.product.price).subscribe((product) => {
      console.log('Product created:', product);
    });
  }

  logout() {
    this.auth.logout();
  }
}
