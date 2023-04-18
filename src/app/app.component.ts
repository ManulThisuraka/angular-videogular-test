import { Component } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'my-app',
  template: `
      <vg-player (onPlayerReady)="onPlayerReady($event)">
          <video #media [vgMedia]="$any(media)" id="singleVideo" preload="auto" controls>
              <source src="https://ymcagtadev.blob.core.windows.net/619d5b2514c8801bccc727bd-4p69z1el2zpdm7x/17%20Minute%20Countdown%20Timer%20with%20Alarm.mp4">
          </video>
      </vg-player>
  `,
  styles: [
    `h1 {
        font-family: Lato;
    }`,
  ],
})
export class AppComponent {
  constructor(private api: VgApiService) {}

  onPlayerReady(api: VgApiService) {
    this.api = api;
    //Set time for particular start time
    //this.api.currentTime = 30;
    this.api
    .getDefaultMedia()
    .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    setTimeout(() => {
      const currentTime = api.time;
      console.log('Initial Time:', currentTime);
      setInterval(() => {
        const currentTime = api.time;
        console.log('Current Time:', currentTime);
      }, 60000);
    }, 60000);
  }

  playVideo() {
    this.api.play();
  }
}
