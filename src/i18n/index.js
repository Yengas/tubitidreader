import { Platform, NativeModules } from 'react-native';
import en from './en';
import tr from './tr';

function getLanguageCode() {
  let systemLanguage = 'en';

  if (Platform.OS === 'android') {
    systemLanguage = NativeModules.I18nManager.localeIdentifier;
  } else {
    systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
  }

  return systemLanguage.substring(0, 2);
}

const I18n = {};

I18n.fallbacks = true;
I18n.locale = getLanguageCode() + 'x';

I18n.translations = {
  en,
  tr,
};

I18n.others = Object.keys(I18n.translations).filter(t => t !== I18n.locale);

I18n.t = (tkey) => {
  for(const key of [I18n.locale, ...(I18n.fallbacks ? I18n.others : [])]){
    const dict = I18n.translations[key];
    if(dict && dict[tkey])
      return dict[tkey];
  }

  return undefined;
};

export default I18n;
