import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { VideoServiceProvider } from '../../providers/video-service/video-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  public videos: any;
  public searchQuery: string = '';
  private page: any;
  private currentVideos: any;
  private originalList: any;
  public buttonClicked: boolean = false; 
  
  constructor(public toastCtrl: ToastController, private videoServiceProvider: VideoServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.bindItems('1');
  }
  bindItems(pageNo: string) {
    this.videoServiceProvider.load(pageNo).then(data => {
      if (data) {

        if (pageNo == '1') {
          this.page = data;
          this.videos = data["content-items"].content;
        } else {
          this.page = data;
          this.currentVideos = data["content-items"].content;
          this.videos.push(...this.currentVideos);
        }
        this.originalList = this.videos;
      }
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let currentPage = Number(this.page['page-num-requested']);
      if (currentPage <= 2) {
        currentPage = currentPage + 1;
        this.bindItems(currentPage.toString());

      } else {
        this.showToast('bottom');
      }
      infiniteScroll.complete();
    }, 500);
  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'No More Records...',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.videos = this.originalList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.videos = this.originalList;
    }
  }
  onCancel(ev: any) {
    this.bindItems('1');

  }

  public onButtonClick() {

    this.buttonClicked = !this.buttonClicked;
  }
}