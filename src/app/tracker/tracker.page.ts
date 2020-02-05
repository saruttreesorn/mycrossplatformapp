import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddtrackerPage} from '../addtracker/addtracker.page';
import { Tracker } from '../../models/tracker.interface';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AddPageModule } from '../add/add.module';
import { TrackerDetailPage } from '../tracker-detail/tracker-detail.page';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  
  public trackers: Array<Tracker> = new Array();
  private trackersData: Array<Tracker> = new Array();

  private loadingState: ReplaySubject<boolean> = new ReplaySubject();
  private trackersSub: Subscription;
  private authSub: Subscription;

  constructor(
    private data: DataService,
    private modal: ModalController,
    private loading: LoadingController,
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( (user) => {
      if ( user ) {
        this.getTrackers();
      }
      else {
        this.trackersSub.unsubscribe();
      }
    });
    this.getTrackers();
  }

  async addTracker(){
    const addModal = await this.modal.create({ component: AddtrackerPage });
    addModal.onDidDismiss()
    .then( (response) => {
      if (response.data ) {
        this.data.addTracker( response.data );
      }
    })
    .catch( (error) => {
      console.log(error);
    });
    addModal.present();
  }


  ///////
  getTrackers(){
    this.loadingState.next(true);
    this.showLoading();
    this.trackersSub = this.data.trackers$.subscribe((data) => {
      this.trackersData = data;
      this.trackers = data;
      this.loadingState.next(false);
    });
  }

  /////
  filterTrackers( event ) {
    let searchTerm = event.target.value.toLowerCase();
    this.trackers = this.trackersData.filter( (tracker) => {
      if ( tracker.name.toLowerCase().indexOf (searchTerm ) !== -1 ){
        return tracker;
      }
    });
  }

  restoreNotes() {
    this.trackers = this.trackersData;
  }

  ///
  async getTrackerDetail ( tracker ) {
    const detailModal = await this.modal.create({ component: TrackerDetailPage, componentProps: {
      "name": tracker.name,
      "date": tracker.date,
      "id": tracker.id
    } });
    detailModal.onDidDismiss()
      .then( (response) => {
        if( response.data ) {
          this.data.updateTracker( response.data );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    detailModal.present();
  }

  async showLoading() {
    const loadingIndicator = await this.loading.create({
      spinner: "bubbles"
    });
    this.loadingState.subscribe( (value) => {
      if(value == true ) {
        loadingIndicator.present();
      }
      else{
        loadingIndicator.dismiss();
      }
    });
  }
}//ends
