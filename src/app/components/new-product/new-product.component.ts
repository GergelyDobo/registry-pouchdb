import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
	selector: 'app-new-product',
	templateUrl: './new-product.component.html',
	styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {
	public isSubmitted: boolean = false;

	constructor(private readonly dialogRef: MatDialogRef<NewProductComponent>) {}

	public submit(): void {
		this.isSubmitted = true;
	}

	public createProduct(form: NgForm): void {
		if (form.value.name && form.value.price && form.value.manufacturer && form.value.currency && form.value.amount) {
			const product = {
				name: form.value.name,
				price: form.value.price,
				manufacturer: form.value.manufacturer,
				currency: form.value.currency,
				amount: form.value.amount
			} as Product;

			this.dialogRef.close({ data: product });
		}
	}
}
