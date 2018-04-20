import I18n from 'react-native-i18n';
import en from './en';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr,
};

export default I18n;
