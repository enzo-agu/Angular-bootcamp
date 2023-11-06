import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
// @Input() customImg:string=''
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement
    console.log('sin img', this.elHost)
    elNative.src = 'https://img.freepik.com/vector-gratis/coche-deportivo-azul-aislado-vector-blanco_53876-67354.jpg'
  }

  constructor(private elHost: ElementRef) {

  }

}
