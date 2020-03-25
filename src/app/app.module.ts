import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
	declarations: [AppComponent, ProductsComponent],
	imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
