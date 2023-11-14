import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  listObserver$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public multimedia: MultimediaService) { }

  ngOnInit(): void {
    // const observer1$: Subscription = this.multimedia.callback.subscribe(
    //   (response: TrackModel) => {
    //     console.log('recibiendo cancion', response)
    //   }
    // )

    // this.listObserver$ = [observer1$]

    // const observable1$= this.multimedia.myObservable1$
    // .subscribe(
    //   (responseOk)=>{
    //     console.log('👍', responseOk)
    //   },
    //   (responseFail)=>{
    //     console.log('se tapo', responseFail)
    //   }
    // )

    // this.multimedia.trackInfo$.subscribe(
    //   res => console.log('reroducción de la canción', res)
    // )

    const observer1$ = this.multimedia.playerStatus$
      .subscribe(status => this.state = status)

    this.listObserver$ = [observer1$]

  }


  ngOnDestroy(): void {
    this.listObserver$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴 BOOM!')
  }

  handlePosition(event: MouseEvent): void {
    const { clientX } = event
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x
    const precentageFromX = (clickX * 100) / width
    this.multimedia.seekAudio(precentageFromX)
    console.log(`clienteX : ${precentageFromX}`)
  }

}
