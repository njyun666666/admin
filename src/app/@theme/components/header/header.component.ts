import { Component, OnDestroy, OnInit } from '@angular/core';
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
  hideMenuOnClick: boolean = false;
  userSettingSidebarCompacted: boolean = false;
  isXl: boolean = false;
  currentWidth: number;

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
    const { is } = this.breakpointService.getBreakpointsMap();


    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
        takeUntil(this.destroy$),
      )
      .subscribe(currentBreakpoint => {
        this.currentWidth = currentBreakpoint.width;
        this.userPictureOnly = currentBreakpoint.width < xl;
        this.hideMenuOnClick = currentBreakpoint.width <= is;
        this.isXl = currentBreakpoint.width >= xl;

        // console.log('this.isXl=', this.isXl);
        // console.log('this.userSettingSidebarCompacted=', this.userSettingSidebarCompacted);
        // console.log('currentBreakpoint.width=', currentBreakpoint.width);



      });


    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {

        this.sidebarService.collapse('menu-sidebar');

      } else if (!this.isXl || this.userSettingSidebarCompacted) {

        this.sidebarService.toggle(true, 'menu-sidebar');

      }


    });



    this.menuService.onItemHover().subscribe((menu) => {
      // console.log(menu);
      this.sidebarService.expand('menu-sidebar');
    });



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

    if (this.isXl) {
      this.userSettingSidebarCompacted = !this.userSettingSidebarCompacted;
      console.log('toggleSidebar, this.isXl=' + this.isXl + ' , this.userSettingSidebarCompacted=' + this.userSettingSidebarCompacted);
    }

    // this.userSettingSidebarCompacted = this.widthSidebarExpaned ? true : false;

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }



}
