import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subject, debounceTime, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbmService } from '@modules/abm/services/abm.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-abm-page',
  templateUrl: './abm-page.component.html',
  styleUrls: ['./abm-page.component.css']
})
export class AbmPageComponent implements OnInit, OnDestroy {
  listResults$: Observable<any> = of([]);
  Form: FormGroup = new FormGroup({});
  tracks: TrackModel[] = []
  editTrackForm: FormGroup = new FormGroup({});
  trackId: string | number = ''


  constructor(private trackService: TracksService, private abmService: AbmService) {

  }

  ngOnInit(): void {
    this.trackService.getAllTracks$().pipe(
      map((tracks: TrackModel[]) => this.tracks = tracks)
    ).subscribe()


    this.Form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4)]),
        album: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        cover: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        artist: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      });

    this.editTrackForm = new FormGroup(
      {
        nameTrack: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ])
      }
    )
  }

  formTrack($event: any): void {
    $event.preventDefault();
    const { name, album, cover, artist } = this.Form.value;
    this.abmService.newTrack$(name, album, cover, artist).subscribe(
      (responseOk) => {
        console.log('Agregado', responseOk);
        console.log('Data', this.listResults$)
        this.Form.reset();
        Swal.fire({
          title: "Nueva canción agregada!",
          icon: "success",
          customClass: {
            popup: 'sweet-popup'
          }
        }).then((resp) => {
          if (resp.isConfirmed) {
            this.trackService.getAllTracks$().pipe(
              map((tracks: TrackModel[]) => this.tracks = tracks)
            ).subscribe()
          }
        });
      }
      ,
      (error) => {
        console.log('Error', error);
        Swal.fire({
          title: "No se pudo agregar ",
          icon: "error",
          customClass: {
            popup: 'sweet-popup'
          }
        });
      }

    );
  }

  editTrackName$(track: TrackModel, name: string): void {
    const { nameTrack } = this.editTrackForm.value
    if (nameTrack.length < 4) {
      Swal.fire({
        title: "Debe ingresar 4 caracteres como mínimo",
        icon: "error",
        customClass: {
          popup: 'sweet-popup'
        }
      });
    }
    
    else {
      this.abmService.editTrack$(nameTrack, track.uid.toString()).subscribe(
        (responseOk) => {
          console.log('Nombre editado', responseOk);
          track.name = name;
          this.editTrackForm.reset();
          Swal.fire({
            title: "Editada!",
            icon: "success",
            customClass: {
              popup: 'sweet-popup'
            }
          })
          this.trackService.getAllTracks$().pipe(
            map((tracks: TrackModel[]) => this.tracks = tracks)
          ).subscribe()
        }
        ,
        // (error) => {
        //   console.log('Error al editar ', error);
        //   Swal.fire({
        //     title: "Error al editar",
        //     icon: "error",
        //     customClass: {
        //       popup: 'sweet-popup'
        //     }
        //   });
        // }
      );
    }

  }
  deleteTrack(track: any) {
    const { uid } = track;
    Swal.fire({
      title: `¿Está seguro de eliminar la canción ${track.name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        popup: 'sweet-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.abmService.deleteTrack$(uid).subscribe(() => {
          Swal.fire({
            title: "Eliminada!",
            icon: "success",
            customClass: {
              popup: 'sweet-popup'
            }
          });
          this.trackService.getAllTracks$().pipe(
            map((tracks: TrackModel[]) => this.tracks = tracks)
          ).subscribe()
        }, (error: any) => {
          console.log(error)
          Swal.fire({
            title: "Error ",
            icon: "error",
            customClass: {
              popup: 'sweet-popup'
            }
          });
        })
      }
    });
  }

  ngOnDestroy(): void {

  }

}
