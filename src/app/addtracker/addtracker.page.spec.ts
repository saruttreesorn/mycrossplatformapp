import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtrackerPage } from './addtracker.page';

describe('AddtrackerPage', () => {
  let component: AddtrackerPage;
  let fixture: ComponentFixture<AddtrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
