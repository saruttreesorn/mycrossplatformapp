import { Component, ViewChildren, OnInit } from '@angular/core';
import { google} from 'google-maps';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage implements OnInit {

  @ViewChildren("map") mapElement;
  map: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    let coords = new google.maps.LatLng(-35.473469, 149.012375);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,
      mapOptions)

      let marker: google.maps.Marker = new google.maps.Marker({
        map: this.map,
        position: coords
      })
  }
}
