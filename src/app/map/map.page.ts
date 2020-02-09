import { Component, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

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
