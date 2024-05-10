import { Component, AfterViewInit } from '@angular/core';

declare var Swiper: any;
@Component({
  selector: 'app-sliderImg',
  standalone: true,
  imports: [],
  templateUrl: './sliderImg.component.html',
  styleUrls: ['./sliderImg.component.css'],
})

export class sliderImgComponent implements AfterViewInit{
  
  constructor() { }

  ngAfterViewInit(): void {
    let mainSliderSelector = '.main-slider';

    let mainSliderOptions = {
      loop: true,
      speed: 1500,
      parallax: true,
      grabCursor: true,
      watchSlidesProgress: true,
      autoplay: {
        delay: 5000,
      }
    };

    let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
  }
}