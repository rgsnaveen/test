import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
/*
  Generated class for the VideoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoServiceProvider {
  public data:any;
  
  constructor(public http: HttpClient) {
    console.log('Hello VideoServiceProvider Provider');
  }
  
	load(pageNo) {
	let mockUrl = `../../assets/API/CONTENTLISTINGPAGE-PAGE${pageNo}.json`;
	 /* if (this.data) {

		return Promise.resolve(this.data);
	  }*/

	  // don't have the data yet
	  return new Promise(resolve => {
		this.http.get(mockUrl)
			  .subscribe(data => {
			this.data = data;
			resolve(this.data.page);
		  });
	  });
	}

}
