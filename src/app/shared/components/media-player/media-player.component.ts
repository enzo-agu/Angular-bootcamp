import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/7/5/5/0755db9a28294510852de54840015412.jpg',
    album: 'Californication',
    name: 'Californication',
    url: 'http://localhost/track.mp3',
    _id: 1
  }

  listObserver$: Array<Subscription> =[]

  constructor(private multimedia: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimedia.callback.subscribe(
      (response: TrackModel) => {
        console.log('recibiendo cancion', response)
      }
    )

    this.listObserver$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach(u=>u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴 BOOM!')
  }

}
