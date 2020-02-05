import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note.interface';
import { Tracker } from '../models/tracker.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Category } from '../models/category.class';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private notesCollection: AngularFirestoreCollection<Note>;
  // notes$: Observable<Note[]>;
  public notes$ = new BehaviorSubject<Note[]>([]);
  public trackers$ = new BehaviorSubject<Tracker[]>([]);
  private uid: string;
  private authStatus: Subscription;
  private ncSub: Subscription;

  /////////////// tracker
  private trackersCollection: AngularFirestoreCollection<Tracker>;
  categoryList: Array<Category> = new Array( new Category('default') );
  categories$ = new BehaviorSubject<Category[]>(this.categoryList);
  ''
  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {
    // get the user auth status
    this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        // create path
        const path = `notes/${this.uid}/usernotes`;
        // set the collection
        this.notesCollection = afs.collection<Note>(path);
        // this.notes$ = this.getNotes();
        this.ncSub = this.getNotes().subscribe((data) => {
          this.notes$.next(data);
        });
      }
      else{
        this.ncSub.unsubscribe();
      }
    });
  }

  addNote(data: Note) {
    this.notesCollection.add(data);
  }

  //add new tracker
  addTracker(data: Tracker) {
    this.trackersCollection.add(data);
  }

  getNotes() {
    // this function retuns an Observable
    return this.notesCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Note;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  updateNote( note ) {
    this.notesCollection.doc( note.id ).update( {name: note.name, note: note.note });
  }

  //tracker
  updateTracker( tracker ){
    this.trackersCollection.doc( tracker.id ).update( {name: tracker.name});
  }

  deleteNote( id ) {
    this.notesCollection.doc( id ).delete();
  }
  //
  deleteTracker( id ) {
    this.trackersCollection.doc( id ).delete();
  }

  getUid() {
    return this.uid;
  }

  addCategory(name) {
    return new Promise( (resolve, reject) => {
      if( this.checkIfCategoryExists(name) == false ) {
        this.categoryList.push( new Category(name) );
        this.saveCategories();
        this.categories$.next(this.categoryList);
        resolve( true );
      }
      else {
        reject( false );
      }
    })
  }

  //Categories....
  checkIfCategoryExists( name :string ){
    let arr:Array<Category> = this.categoryList.filter( (category) => {
      if( category.name.toLocaleLowerCase() == name.toLowerCase() ) {
        return category;
      }
    })
    return ( arr.length > 0 ) ? true : false;
  }

  saveCategories() {
    let data = JSON.stringify( this.categoryList );
    try {
      window.localStorage.setItem("categories" , data );
      if( !window.localStorage.getItem("categories") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }






}
