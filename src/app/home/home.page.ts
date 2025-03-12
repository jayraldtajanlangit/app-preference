import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  option1 = false;
  option2 = false;
  option3 = false;
  rangeValue = 50;
  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  radioValue: string | null = null;

  async ngOnInit() {
    await this.loadSettings();
  }

  async saveSettings() {
    await Preferences.set({
      key: 'appSettings',
      value: JSON.stringify({
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        rangeValue: this.rangeValue,
        checkbox1: this.checkbox1,
        checkbox2: this.checkbox2,
        checkbox3: this.checkbox3,
        radioValue: this.radioValue,
      }),
    });
  }

  async loadSettings() {
    const { value } = await Preferences.get({ key: 'appSettings' });
    if (value) {
      const settings = JSON.parse(value);
      this.option1 = settings.option1;
      this.option2 = settings.option2;
      this.option3 = settings.option3;
      this.rangeValue = settings.rangeValue;
      this.checkbox1 = settings.checkbox1;
      this.checkbox2 = settings.checkbox2;
      this.checkbox3 = settings.checkbox3;
      this.radioValue = settings.radioValue;
    }
  }

  async resetSettings() {
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.rangeValue = 50;
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.radioValue = null;
    await this.saveSettings();
  }
}
