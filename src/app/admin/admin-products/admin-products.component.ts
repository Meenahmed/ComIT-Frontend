import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: any[] = [];
  productId: any;

  constructor(public prodService: ProductService, private router: Router) {}

  ngOnDestroy(): void {
    this.getAll();
  }

  onSearch(query: string) {
    this.filteredProducts = query
      ? this.products.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
      : this.products;
  }

  getAll() {
    this.prodService.getAll().subscribe((products) => {
      this.products = this.filteredProducts = products;
    });
  }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    // console.log(this.productId);
    this.prodService.delete(productId).subscribe(
      (res) => {
        this.getAll();
        this.router.navigate(['/admin/products']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getAll();
  }
}
