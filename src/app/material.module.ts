import { NgModule } from '@angular/core';
import {
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatCardModule,
	MatMenuModule,
	MatDialogModule
} from '@angular/material';

@NgModule({
	imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatMenuModule, MatDialogModule],
	exports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatMenuModule, MatDialogModule]
})
export class MaterialModule {}
