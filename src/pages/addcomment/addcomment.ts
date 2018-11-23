import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the AddcommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcomment',
  templateUrl: 'addcomment.html',
})
export class AddcommentPage {

  commentForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCntrl: ViewController,
    private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      rating: 4,
      comment: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcommentPage');
  }

  dismiss() {
    this.viewCntrl.dismiss()
  }

  onSubmit() {
    let comment = this.commentForm.value;
    this.viewCntrl.dismiss(comment);
  }

}
