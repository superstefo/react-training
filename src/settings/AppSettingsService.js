import React from 'react';
//import store from '../store';
import BeanContextAware from '../services/BeanContextAware';
//import PollService from '../services/PollService';
import CashService from '../services/CashService';
import Const from '../services/Constants';


//this singleton applies settings at startup:
class AppSettingsService extends React.Component {
  constructor(props) {
    super(props);

    this.textColors = [
      { "name": 'Muted', "class": 'text-muted' },
      { "name": 'White', "class": 'text-white' },
      { "name": 'Dark', "class": 'text-dark' },
      { "name": 'Body', "class": 'text-body' }
    ]

    this.bgColors = [
      { "name": 'Secondary', "class": 'bg-secondary' },
      { "name": 'Dark', "class": 'bg-dark' },
      { "name": 'Light', "class": 'text-light' }
    ]

    this.updatePollInterval = 20000;
  }

  applySettingsFromLocalStorage = () => {
    let ls = CashService.getLocalStorage();
    let phone = CashService[Const.PHONE_HEADER_NAME];

    if (!ls[phone]) {
      return;
    }

    let textColor = this.getSetting("textColor") || this.textColors[0];
    this.applyClass(document.body, this.textColors, textColor);

    let bgColor = this.getSetting("bgColor") || this.bgColors[0];
    this.applyClass(document.body, this.bgColors, bgColor);
  }

  persistSetting = (settingName, settingObject) => {
    let ls = CashService.getLocalStorage();
    let phone = CashService[Const.PHONE_HEADER_NAME];

    if (!phone || !ls[phone]) {
      return;
    }
    let settings = ls[phone]["settings"];
    if (!settings) {
      settings = {};
    }
    settings[settingName] = settingObject;
    ls[phone]["settings"] = settings;
    CashService.setLocalStorage(ls);
  }

  getSetting = (settingName) => {
    let ls = CashService.getLocalStorage();
    let phone = CashService[Const.PHONE_HEADER_NAME];

    if (!phone || !ls[phone]) {
      return;
    }
    let settings = ls[phone]["settings"];
    if (!settings) {
      return;
    }
    return settings[settingName];
  }

  applyClass = (element, colors, selectedColor) => {
    colors.forEach(color => {
      element.classList.remove(color.class);
    });

    element.classList.add(selectedColor);
  }

}
export default new AppSettingsService();
