import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

@NgModule({
	declarations: [AppComponent, ProductsComponent, HeaderComponent, NewProductComponent, FormComponent],
	imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [NewProductComponent, FormComponent]
})
export class AppModule {}
