import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  listResults$: TrackModel[] = []

  constructor(private searchService:SearchService,){

  }

  receiveData(event:string): void {
    // this.searchService.searchTracks$(event)
    this.searchService.searchTracks$(event).subscribe((tracks: TrackModel[]) => {
      const oneTrack = tracks.filter((track, index, selfArray) =>
        index === selfArray.findIndex(t => t.uid === track.uid)
      );
      this.listResults$ = oneTrack;
    })    
  }

}
