import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Basket, BasketService} from '@/store/basket';
import {RegionsQuery} from '@/store/regions';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketItemComponent implements OnInit {

  @Input()
  item: Basket;

  price$: Observable<number>;

  constructor(
    private basketService: BasketService,
    protected regionsQuery: RegionsQuery
  ) {
  }

  ngOnInit(): void {
    this.price$ = this.regionsQuery.getPriceDiscount(this.item.price);
  }


  handleChangeCount(count: number): void {
    this.basketService.changeCount({
      ...this.item,
      count
    });
  }

  handleDelete(): void {
    this.basketService.deleteProduct(this.item.id);
  }

}
