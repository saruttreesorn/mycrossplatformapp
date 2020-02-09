import { Component, OnInit, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @ViewChildren("map") mapElement;
  map: any;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
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
