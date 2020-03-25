import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import PouchDB from 'pouchdb';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly db;
	private _products = new BehaviorSubject<Product[]>(null);
	private isInstantiated: boolean = false;

	constructor() {
		if (!this.isInstantiated) {
			this.db = new PouchDB(environment.cloudantConfig.db_name);
			this.db
				.changes({
					live: true,
					since: 'now'
				})
				.on('change', () => this.setProducts());
			this.isInstantiated = true;
		}
		this.sync(environment.cloudantConfig.url + '/' + environment.cloudantConfig.db_name);
	}

	private sync(remote: string): void {
		const remoteDB = new PouchDB(remote);
		this.db
			.sync(remoteDB, {
				live: true,
				retry: true,
				back_off_function: (delay) => {
					if (delay === 0) {
						return 1000;
					}
					return delay * 3;
				}
			})
			.on('change', () => this.setProducts())
			.on('paused', () => this.setProducts())
			.on('active', () => this.setProducts())
			.on('error', (error) => console.error(JSON.stringify(error)));
	}

	public get products$(): Observable<Product[]> {
		return this._products.asObservable();
	}

	private setProducts(): void {
		this.fetch().then(
			(result) => {
				const actualProducts = [];
				result.rows.forEach((element) => {
					if (!element._deleted) {
						actualProducts.push(element.doc);
					}
				});
				this._products.next(actualProducts);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	private fetch() {
		return this.db.allDocs({ include_docs: true });
	}

	private get(id: string) {
		return this.db.get(id);
	}

	public save(id: string, document: Product) {
		return this.get(id).then(
			(result) => {
				return this.db.put({
					...document,
					_rev: result._rev
				});
			},
			(error) => {
				if (error.status === 404) {
					return this.db.put({
						...document,
						_id: id
					});
				} else {
					return new Promise((resolve, reject) => {
						reject(error);
					});
				}
			}
		);
	}

	public delete(product: Product): void {
		this.db.remove(product);
	}
}
