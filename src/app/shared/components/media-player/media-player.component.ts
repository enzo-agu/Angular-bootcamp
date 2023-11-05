import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {
mockCover: TrackModel={
  cover:'https://akamai.sscdn.co/uploadfile/letras/playlists/0/7/5/5/0755db9a28294510852de54840015412.jpg',
  album:'Californication',
  name:'Californication',
  url:'http://localhost/track.mp3',
  _id:1
}
}
