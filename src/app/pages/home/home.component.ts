import { Component, OnInit, inject } from '@angular/core';
import { HomeService, Product } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = inject(HomeService).getProducts();
  productSignal = this.products.result;
  cols: string[] = [];
  dataSource!: Product[];

  ngOnInit() {
    this.products.result$.subscribe((data) => {
      const tempCols = [];
      if (data.data) {
        for (const key in data.data.products) {
          for (const value in data.data.products[key]) {
            tempCols.push(value);
          }
        }
        this.cols = Array.from(new Set(tempCols));
        this.dataSource = data.data?.products;
      }
    });
  }
}
