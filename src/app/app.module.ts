import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routes.modules';
import { provideQueryClientOptions } from '@ngneat/query';
import { StockTableComponent } from './pages/shared/stock-table/stock-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth';
import { HttpTokenInterceptor } from 'core/interceptors/http.interceptor';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NotFoundPageComponent } from 'pages/shared/not-found/not-found.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StockTableComponent,
    NotFoundPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzMessageModule,
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 3000,
          refetchOnWindowFocus: false,
          retry: 3,
        },
      },
    }),
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
