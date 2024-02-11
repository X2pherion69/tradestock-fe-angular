import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routes.modules';
import { provideQueryClientOptions } from '@ngneat/query';
import { StockTableComponent } from './pages/shared/stock-table/stock-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent, StockTableComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 3000,
          refetchOnWindowFocus: false,
          retry: 3,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
