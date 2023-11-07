import { Component, OnInit, OnDestroy } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []
  constructor(private trackService: TracksService) { }

  ngOnInit(): void {
    const observable1$ = this.trackService.dataTracksTrending$
      .subscribe(response => {
        this.tracksTrending = response
        this.tracksRandom = response
        console.log('canciones trending', response)
      })

      const observable2$ = this.trackService.dataTracksRandom$
      .subscribe(response => {
        this.tracksRandom =[...this.tracksRandom, ...response]
        console.log('canciones random entrando', response)
      })

    this.listObservers$ = [observable1$, observable2$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
