import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.configService.fetchData();

    firebase.initializeApp({
      apiKey: "AIzaSyAgZbMVA7ZFw7dD8zmaVCvpwzPXWij40mI",
      authDomain: "udemy-recipe-project-db.firebaseapp.com",
    });
  }
}

// greek question mark ;
