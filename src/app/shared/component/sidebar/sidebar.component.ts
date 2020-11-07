import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {UserQuery} from '../../../user/state/user.query';
import {UserService} from '../../../user/state/user.service';
import {UserStore} from '../../../user/state/user.store';
import {User} from '../../../user/state/user.model';
import {MatDialog} from '@angular/material/dialog';
import {UploadProfileComponent} from '../../../modals/upload-profile/upload-profile.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private snotifyService: SnotifyService, private userService: UserService,
              private userQuery: UserQuery, private userStore: UserStore, private api: ApiService,
              private auth: AuthService, public dialog: MatDialog) {
  }

  public profile = this.userQuery.selectAll();
  public loading = this.userQuery.selectLoading();

  usr = JSON.parse(localStorage.getItem('user'));

  public getUser(): any{
    this.userService.get();
  }

  public update(user: User): any{
    this.userService.update(user);
  }

  ngOnInit(): void {
    this.getUser();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(UploadProfileComponent, {
      width: '80%',
      height: '95%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async data => {

    });
  }

  logout(): any{
   return this.auth.logout();
  }

}
