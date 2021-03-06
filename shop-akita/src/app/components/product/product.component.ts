import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {BasketQuery, BasketService} from '@/store/basket';
import {Product} from '@/store/products';
import {RegionsQuery} from '@/store/regions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;

  count = 1;
  basketCount$: Observable<number>;
  price$: Observable<number>;

  constructor(
    private basketService: BasketService,
    private basketQuery: BasketQuery,
    protected regionsQuery: RegionsQuery
  ) {
  }

  ngOnInit(): void {
    this.basketCount$ = this.basketQuery.selectEntity(this.product.id, 'count');
    this.price$ = this.regionsQuery.getPriceDiscount(this.product.price);
  }

  handleAddToCart(): void {
    this.basketService.addBasket({
      ...this.product,
      count: this.count
    });
    this.count = 1;
  }

  handleChangeCount($event: number): void {
    this.count = $event;
  }
}
