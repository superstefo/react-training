import React from 'react';
import CashService from '../services/CashService';
import Const from '../services/Constants';

//this singleton applies settings at startup:
class AppSettingsService extends React.Component {
  constructor(props) {
    super(props);

    this.textColors = [
      { "name": 'Gray', "class": 'text-muted' },
      { "name": 'White', "class": 'text-white' },
      { "name": 'Dark', "class": 'text-dark' },
      { "name": 'Black', "class": 'text-body' }
    ]

    this.bgColors = [
      { "name": 'Gray', "class": 'bg-secondary' },
      { "name": 'Dark', "class": 'bg-dark' },
      { "name": 'Light', "class": 'bg-light' }
    ]

    this.updatePollInterval = Const.UPDATE_POLL_INTERVAL;
    this.isToShowPhotos = true;
  }

  applyDesignSettings = () => {
    let textColor = this.getSetting("textColor") || this.textColors[0]?.class;
    if (textColor) {
      console.log(textColor);
      
      this.applyClass(document.body, this.textColors, textColor);
    }

    let bgColor = this.getSetting("bgColor") || this.bgColors[0].class;
    if (bgColor) {
      this.applyClass(document.body, this.bgColors, bgColor);
    }
  }

  persistSetting = (settingName, settingObject) => {
    let settings = CashService.getSettings();
    if (!settings) {
      settings = {};
      CashService.setSettings(settings);
    }
    settings[settingName] = settingObject;
    CashService.persistSettings(settings);
  }

  getSetting = (settingName) => {
    let settings = CashService.getSettings();
    return settings?.[settingName];
  }

  applyClass = (element, colors, selectedColor) => {
    colors.forEach(color => {
      element.classList.remove(color.class);
    });

    element.classList.add(selectedColor);
  }

  getInputStyleClasses = () => {
    return "form-control " + (this.getSetting("textColor") || " ") +
      " " + (this.getSetting("bgColor") || "");
  }
}
export default new AppSettingsService();
