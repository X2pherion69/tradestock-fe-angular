import { Component, Input } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

const isNumber = (value: any) => typeof value === 'number' && !isNaN(value);

@Component({
  selector: 'stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
})
export class StockTableComponent<T> {
  @Input('cols') columns: string[] = [];
  @Input('dataSource') dataSource!: T[] | any[];
  @Input('isLoading') isLoading!: boolean;

  pageSize: number = 30;
  sortDirection: string | null = null;
  sortColumn: string | null = null;

  onSortChange(e: NzTableQueryParams): void {
    console.log(e);
  }

  onSortOrderChange(e: string | null): void {
    console.log(e);
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

  isSticky(c: string) {
    return ['id'].includes(c);
  }

  genCellColor(value: any) {
    let color;

    if (!isNumber(value)) {
      return '#FFF';
    }

    if (value < 0) {
      color = 'red';
    } else if (value === 0) {
      color = 'yellow';
    } else {
      color = 'green';
    }

    return color;
  }
}
