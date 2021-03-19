import { StateService } from './../../../@core/utils/state.service';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  sidebarEl: ElementRef;
  // hideMenuOnClick: boolean = false;
  // userSettingSidebarCompacted: boolean = false;
  // isXl: boolean = false;
  // currentWidth: number;

  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private stateService: StateService,
    private el: ElementRef
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }


  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    // const { is } = this.breakpointService.getBreakpointsMap();


    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
        takeUntil(this.destroy$),
      )
      .subscribe(currentBreakpoint => {
        // this.currentWidth = currentBreakpoint.width;
        this.userPictureOnly = currentBreakpoint.width < xl;
        // this.hideMenuOnClick = currentBreakpoint.width <= is;

        if (currentBreakpoint.width < xl) {

        }
        // sideBarCompactedSetting

      });


    // this.menuService.onItemClick().subscribe(() => {
    //   if (this.hideMenuOnClick) {

    //     this.sidebarService.collapse('menu-sidebar');

    //   }

    // });





    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });



  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    // // this.sidebarEl = this.el.nativeElement.querySelector('nb-sidebar[tag=menu-sidebar]');
    // // this.stateService.sideBarCompactedSetting = this.stateService.sidebarEl['classList'].contains('compacted');
    // var a = this.stateService.sidebarEl['classList'];

    // console.log(a);
    // console.log('from hearder', a.contains('compacted'));
    // console.log(this.sidebarEl['classList'].contains('compacted'));


    // sideBarCompactedSetting

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }



}
