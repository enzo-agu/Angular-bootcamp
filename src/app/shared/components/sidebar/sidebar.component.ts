import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []

  constructor(private router: Router, private cookieService: CookieService, private logService: AuthService) { }

  ngOnInit(): void {

    const roleUser = this.cookieService.get('roleUser');

    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' }
      }
    ]


    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      },
    ]
    
    
    if (roleUser === 'admin') {
      this.mainMenu.defaultOptions.push({
        name: 'Admin',
        icon: 'uil uil-user-check',
        router: ['/', 'admin'],
      },
      

      )
    }


   

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]
  }

  closeSessionAdmin(): void {
    this.cookieService.deleteAll('/');
    this.router.navigate(['auth/login']); 
   
  }
 

}
