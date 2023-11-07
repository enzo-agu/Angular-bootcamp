import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  dataTracksTrending$: Observable<TrackModel[]> = of([])

  dataTracksRandom$: Observable<any> = of([])

  constructor() {
    const { data }: any = (dataRaw as any).default

    this.dataTracksTrending$ = of(data)
    this.dataTracksRandom$ = new Observable((observer) => {

      const trackExample: TrackModel = {
        _id: 9,
        name: 'Leve',
        album: 'Cartel de Santa',
        url: 'http://',
        cover: 'https://cdns-images.dzcdn.net/images/cover/b41071397b93014a617c4a3a8d544e75/500x500.jpg'
      }


      setTimeout(() => {
        observer.next([trackExample])
      }, 3500)

    })
  }
}
