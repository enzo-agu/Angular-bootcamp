import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback:EventEmitter <any> = new EventEmitter<any>()

  // myObservable1$ : Subject <any> = new Subject()

  myObservable1$ : BehaviorSubject <any> = new BehaviorSubject('inicializo')


  constructor() { 

    // setTimeout(() => {
    //   this.myObservable1$.next('envía agua!')
    // }, 1000);

    // setTimeout(() => {
    //   this.myObservable1$.error('error con el agua')
    // }, 1000);

    // ☝️ Subject

    // this.myObservable1$ = new Observable(
    //   (observer: Observer <any>)=>{
    //     observer.next('aguaaa')

    //     setTimeout(() => {
    //       observer.error('tapado')
    //     }, 2000);

    //     setTimeout(() => {
    //       observer.error('tapado')
    //     }, 1000);


    //   }
    // )

    // BehaviorSubject 



  }
}
