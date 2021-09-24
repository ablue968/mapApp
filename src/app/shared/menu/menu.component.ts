import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { menuItem } from 'src/app/shared/menu/menuItem.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: menuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen'},
    { route: '/maps/zoom-range', name: 'Zoom Range'},
    { route: '/maps/markers', name: 'Markers'},
    { route: '/maps/properties', name: 'Properties'},
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

 

}
