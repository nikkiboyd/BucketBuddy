import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
  providers: [UserService]
})

export class ProfileUpdateComponent implements OnInit {
  currentUser;
  currentUserID;
  currentUserEmail;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private userService: UserService, private authService: AuthenticationService, private database: AngularFireDatabase) { }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.currentUserID = u.uid;
      this.currentUserEmail = u.email;
      this.currentUser = this.userService.getUserById(u.uid);
    })
  };

  updateUserProfile(newName: string, newFirstName: string, newLastName: string, newAge: string, newBio: string, newContact: string){
    var userEmailpath = this.database.object('users/'+ this.currentUserID);
    userEmailpath.update(
      {
        email: this.currentUserEmail,
        bio: newBio,
        age: newAge,
        // bucketlist: [""],
        // comments: [""],
        userName: newName,
        // friends: [""],
        firstName: newFirstName,
        lastName: newLastName,
        contact: newContact
      })
    this.router.navigate(['profileuser']);
  }

}
