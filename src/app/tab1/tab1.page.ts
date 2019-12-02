import { Component} from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  calendars = [];

  constructor(private navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    });
  }

  addEvent(cal) {
    const date = new Date();
    const options = { calenderId: cal.id, calendarName: cal.name, url: 'https://google.com', firstReminderMinutes: 15};

    this.calendar.createEventInteractivelyWithOptions('New Event', 'Test', 'Test notes', date, date, options). then(() => {
    });
  }

  openCal(cal) {
    this.navCtrl.navigateForward('/CalDetailsPage');
  }
}
