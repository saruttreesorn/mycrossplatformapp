import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-addtracker',
  templateUrl: './addtracker.page.html',
  styleUrls: ['./addtracker.page.scss'],
})
export class AddtrackerPage implements OnInit {
  private addTrackerForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
    private picture: PictureService
  ) { }

  ngOnInit() {
    this.addTrackerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3) ] ],
      note: ['', [Validators.required, Validators.minLength(5) ] ]
    })
  }

  close() {
    this.modal.dismiss();
  }

  submit() {
    let name = this.addTrackerForm.controls.name.value;
    let note = this.addTrackerForm.controls.note.value;
    let date = new Date();
    let noteData = { name: name, date: date, note: note };
    this.modal.dismiss( noteData );
  }
}
