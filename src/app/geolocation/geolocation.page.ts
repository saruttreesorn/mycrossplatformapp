import { Component, OnInit } from '@angular/core';
import { Geolocation} from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  lat:any;
  lng:any;

  constructor(public geo: Geolocation) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));
  }



}
