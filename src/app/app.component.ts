import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ProductService } from './services/product/product.service';
import { NewProductComponent } from './components/new-product/new-product.component';
import { FormComponent } from './components/form/form.component';
import { isNil } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private readonly dialog: MatDialog, public readonly productService: ProductService) {}

	public updateProduct(product: Product): void {
		this.dialog
			.open(FormComponent, { data: product })
			.afterClosed()
			.pipe(take(1))
			.subscribe((updatedProduct) => {
				if (!isNil(updatedProduct) && !isNil(updatedProduct.data)) {
					this.productService.save(product._id, updatedProduct.data);
				}
			});
	}

	public createProduct(): void {
		this.dialog
			.open(NewProductComponent)
			.afterClosed()
			.pipe(take(1))
			.subscribe((product) => {
				if (!isNil(product) && !isNil(product.data)) {
					const id = uuidv4();
					this.productService.save(id, product.data);
				}
			});
	}

	public deleteProduct(product: Product): void {
		this.productService.delete(product);
	}
}
