import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbmService {

  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  newTrack$(name: string, album: string, cover: string, artist: string): Observable<any> {
    const bodyTrack = {
      name,
      album,
      cover,
      artist
    }
    return this.http.post(`${this.URL}/api/1.0/tracks/add`, bodyTrack)
  }

  deleteTrack$(id: string): Observable<any> {
    console.log(id)
    return this.http.delete(`${this.URL}/api/1.0/tracks/delete/${id}`)
  }

  editTrack$(name: string, id: string): Observable<any>{
    
    return this.http.put(`${this.URL}/api/1.0/tracks/edit/${id}`, {name})
   }

}
