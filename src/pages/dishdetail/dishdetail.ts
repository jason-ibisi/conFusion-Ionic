import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { AddcommentPage } from '../../pages/addcomment/addcomment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMsg: string;
  avgStars: string;
  numComments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    private toastCntrl: ToastController,
    private actionSheetCntrl: ActionSheetController,
    private modalCntrl: ModalController,
    private socialSharing: SocialSharing,
    @Inject('BaseURL') private BaseURL) {
      this.dish = navParams.get('dish');
      this.favorite = this.favoriteService.isFavorite(this.dish.id);
      this.numComments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgStars = (total/this.numComments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCntrl.create({
      message: 'Dish ' + this.dish.name + ' added as a favorite successully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  removeFromFavorites() {
    console.log('Removing from Favorites', this.dish.id);
    this.favorite = !this.favoriteService.removeFavorite(this.dish.id);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCntrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            console.log('Add Comment clicked!');
            let modal = this.modalCntrl.create(AddcommentPage);
            modal.onDidDismiss(comment => {
              console.log(comment);
              comment['date'] = Date.now();
              this.dish.comments.push(comment);
            });
            modal.present();
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => { console.log('Posted successfully to Facebook');
                this.toastCntrl.create({
                  message: 'Posted successfully to Facebook',
                  position: 'middle',
                  duration: 2000
                }).present(); })
              .catch(() => {
                console.log('Failed to post to Facebook');
                this.toastCntrl.create({
                  message: 'Failed to post to Facebook',
                  position: 'middle',
                  duration: 2000
                }).present();
              });
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(
              this.dish.name + ' -- ' + this.dish.description,
              this.BaseURL + this.dish.image, '')
              .then(() => {
                console.log('Posted successfully to Twitter');
                this.toastCntrl.create({
                  message: 'Posted successfully to Twitter',
                  position: 'middle',
                  duration: 2000
                }).present();
              })
              .catch(() => {
                console.log('Failed to post to Twitter');
                this.toastCntrl.create({
                  message: 'Failed to post to Twitter',
                  position: 'middle',
                  duration: 2000
                }).present();
              });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Action Cancelled');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
