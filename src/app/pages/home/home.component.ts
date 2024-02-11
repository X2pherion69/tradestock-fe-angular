import { Component, OnInit } from '@angular/core';
import { HomeService, Product } from './home.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  todos = this.homeService.getProducts();
  cols: string[] = [];
  dataSource!: MatTableDataSource<Product>;

  ngOnInit() {
    this.todos.result$.subscribe((data) => {
      const tempCols = [];
      if (data.data) {
        for (const key in data.data.products) {
          for (const value in data.data.products[key]) {
            tempCols.push(value);
          }
        }
        this.cols = Array.from(new Set(tempCols));
        this.dataSource = new MatTableDataSource(data.data?.products);
      }
    });
  }
}
