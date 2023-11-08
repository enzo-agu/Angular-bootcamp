import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators'
// import * as dataRaw from '../../../data/tracks.json'
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  // dataTracksTrending$: Observable<TrackModel[]> = of([])

  // dataTracksRandom$: Observable<any> = of([])
  private readonly URL = environment.api;

  private skipTrackById(
    trackArr: TrackModel[],
    _id: Number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const tmpArr = trackArr.filter((el) => el._id !== _id);
      resolve(tmpArr);
    });
  }


  constructor(private httpClient: HttpClient) {


    // const { data }: any = (dataRaw as any).default

    // this.dataTracksTrending$ = of(data)
    // this.dataTracksRandom$ = new Observable((observer) => {

    //   const trackExample: TrackModel = {
    //     _id: 9,
    //     name: 'Leve',
    //     album: 'Cartel de Santa',
    //     url: 'http://',
    //     cover: 'https://cdns-images.dzcdn.net/images/cover/b41071397b93014a617c4a3a8d544e75/500x500.jpg'
    //   }


    //   setTimeout(() => {
    //     observer.next([trackExample])
    //   }, 3500)

    // })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map((dataRaw: any) => {
          return dataRaw.data
        })
      )
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipTrackById(data, 1)),
         catchError((err)=>{
          const {status, statusText} = err
          console.log('Algo pasó', [status,statusText])
          return of([])
         })
      )
  }

}
