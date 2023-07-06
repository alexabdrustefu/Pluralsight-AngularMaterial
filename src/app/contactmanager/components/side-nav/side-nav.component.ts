import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  isScreenSmall: boolean;
  users: Observable<User[]>;
  dir = 'ltr';

  constructor(
    public breakpintObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.breakpintObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
        } else {
          this.isScreenSmall = false;
        }
      });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

  toggleDir() {
    this.dir = (this.dir === 'ltr')
      ? 'rtl'
      : 'ltr';
  }
}
