import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
})
export class StockTableComponent<T> {
  @Input('cols') columns: string[] = [];
  @Input('dataSource') dataSource!: MatTableDataSource<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  convertToColHeader(input: string): string {
    // Split the string into words
    const words = input.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them with a space
    const label = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return label;
  }
}
