import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
 
  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };


  constructor(private db: AngularFirestore) { 
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        this.eventSource.push(event);
      });
    });
  }

  ngOnInit() {

  }

  //functions
  addNewEvent() {
    let start = new Date();
    let end = new Date();
    end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: 'Event #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      allDay: false
    }

    this.db.collection(`events`).add(event);
  }



  onViewTitleChanged(title) {
    console.log(title);
  }
  
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChange(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }



}
