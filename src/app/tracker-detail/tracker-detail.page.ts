import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-tracker-detail',
  templateUrl: './tracker-detail.page.html',
  styleUrls: ['./tracker-detail.page.scss'],
})
export class TrackerDetailPage implements OnInit {
  @Input() name: string;
  @Input() date: Date;
  @Input() id: string;
  @Input() category: string;

  private detailForm: FormGroup;
  private edited: boolean = false;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private dataTracker: DataService,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.detailForm = this.formBuilder.group({
      name: [this.name, [Validators.required, Validators.minLength(3)] ],
      category: [this.category, [Validators.required, Validators.minLength(5)]]
    });
    this.detailForm.valueChanges.subscribe((formData) => {
      this.edited = true;
    })
  }

  save() {
    let data = {
      name: this.detailForm.controls.name.value,
      note: this.detailForm.controls.note.value,
      date: this.date,
      id: this.id
    }
    this.modal.dismiss(data);
  }

  close() {
    this.modal.dismiss();
  }

  delete() {
    this.dataTracker.deleteTracker( this.id );
    this.modal.dismiss();
  }

  async showDeleteAlert( name ) {
    const confirm = await this.alert.create({
      header: 'Confirm deletion of tracker:',
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        {
          text: 'YAHHH',
          role: 'confirm'
        }, 
        {
          text: 'NEYYY',
          role: 'cancel'
        }
      ],
      backdropDismiss: false
    });
    confirm.onDidDismiss().then(( response ) => {
      if( response.role == 'confirm' ) {
        this.delete();
        this.modal.dismiss();
      }
    });
    await confirm.present();
  }



}
