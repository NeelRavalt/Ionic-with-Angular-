import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  currentSlideIndex: number = 0;

  constructor(private router: Router) {}

  homeOptions = {
    initialSlide: 0,
    speed: 700,
  };

  ngOnInit() {}

  login() {
    this.router.navigate(['/login']);
  }
  navigation() {
    this.router.navigate(['/traslator']);
  }
}
