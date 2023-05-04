import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { MongoService } from 'src/app/services/mongo.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product =  {
    _id: -1,
    name: "",
    price: 0,
    description: ""
  };

  constructor(private route: ActivatedRoute, private mongo: MongoService, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mongo.getProduct(params['id']).subscribe(
        (product: Product) => {
          this.product = product;
        },
        (error) => {
          console.log(error);
        });
    });
  }

  logout() {
    this.auth.logout();
  }

}
