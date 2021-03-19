import { Component, ViewChildren, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuComponent, NbMenuService, NbSidebarComponent, NbSidebarService, NbThemeService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { StateService } from '../@core/utils';
import { OneColumnLayoutComponent } from '../@theme/layouts';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout #layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, AfterViewInit {

  sidebarEl: ElementRef;
  isXl: boolean = false;
  hideMenuOnClick: boolean = false;
  sidebarStatus: string;

  listenSidebarMouseEnter: () => void;
  listenSidebarMouseLeave: () => void;


  menu = MENU_ITEMS;

  public constructor(
    private el: ElementRef,
    private render: Renderer2,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private menuService: NbMenuService,
    private breakpointService: NbMediaBreakpointsService,
    private stateService: StateService,
  ) {

  }


  ngOnInit(): void {

    // const { xl } = this.breakpointService.getBreakpointsMap();



  }


  ngAfterViewInit(): void {


    // //
    // this.sidebarEl = this.el.nativeElement.querySelector('nb-sidebar[tag=menu-sidebar]');
    this.stateService.sidebarEl = this.el.nativeElement.querySelector('nb-sidebar[tag=menu-sidebar]');
    // this.sidebarStatus = this.sidebarEl.nativeElement.classList.contains('compacted');
    console.log('from pages',this.stateService.sidebarEl['classList'].contains('compacted'));
    // console.dir(this.el.;
    // this.sidebarEl.
    // console.log(this.sidebarEl.classList.contains('compacted'));

    this.listenSidebar();


    // this.sidebarService.getSidebarState('menu-sidebar').subscribe((si) => {
    //   console.log(si);
    // });



    const { xl, is } = this.breakpointService.getBreakpointsMap();


    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
      )
      .subscribe(currentBreakpoint => {
        // this.currentWidth = currentBreakpoint.width;

        // if (currentBreakpoint.width >= xl) {
        //   this.sidebarService.collapse('menu-sidebar');
        // }


        this.isXl = currentBreakpoint.width >= xl;
        this.hideMenuOnClick = currentBreakpoint.width <= is;

        if (this.hideMenuOnClick) {
          this.unlistenSidebar();
        } else {
          this.unlistenSidebar();
          this.listenSidebar();
        }



      });


    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {

        this.sidebarService.collapse('menu-sidebar');

      }

    });



  }


  listenSidebar(): void {

    this.listenSidebarMouseEnter = this.render.listen(this.stateService.sidebarEl, 'mouseenter', (event) => {
      this.sidebarService.expand('menu-sidebar');
      this.stateService.sideBarCompactedSetting = this.stateService.sidebarEl['classList'].contains('compacted');
      console.log('compacted', this.stateService.sidebarEl['classList'].contains('compacted'));
    });

    this.listenSidebarMouseLeave = this.render.listen(this.stateService.sidebarEl, 'mouseleave', (event) => {
      this.sidebarService.toggle(true, 'menu-sidebar');
    });


  }


  unlistenSidebar(): void {

    this.listenSidebarMouseEnter();
    this.listenSidebarMouseLeave();

  }



}
