import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cal-details',
  templateUrl: './cal-details.page.html',
  styleUrls: ['./cal-details.page.scss'],
})
export class CalDetailsPage  {
  calName = '';
  events = [];

  constructor(public navParams: NavParams, private calendar: Calendar, private plt: Platform) {
    this.calName = navParams.get('name');

    if (this.plt.is('ios')) {
      this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
        this.events = data;
      });
    } else if (this.plt.is('android')) {
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + 31);

      this.calendar.listEventsInRange(start, end).then(data => {
        this.events = data;
      });
    }
  }
}
