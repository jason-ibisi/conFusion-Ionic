import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Promotion } from '../../shared/Promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(public navCtrl: NavController,
    private dishService: DishProvider,
    private promotionService: PromotionProvider,
    private leaderService: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {

  }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe( dish => this.dish = dish,
        errmsg => this.dishErrMsg = <any>errmsg
      );

    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmsg => this.promoErrMsg = <any>errmsg
      );

    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmsg => this.leaderErrMsg = <any>errmsg
      );
  }

}
