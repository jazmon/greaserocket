# Greaserocket 

[![Greenkeeper badge](https://badges.greenkeeper.io/jazmon/greaserocket.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jazmon/greaserocket.svg?branch=master)](https://travis-ci.org/jazmon/greaserocket)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jazmon/greaserocket/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/jazmon/greaserocket.svg)](https://github.com/jazmon/greaserocket/issues)


A heavily opionated React Native boilerplate. Still under construction 🚧👷
Also this readme is just a dump of notes about stuff i'll document better. Just here so i won't forget 

## Planned Features
* [flowtyped](https://flow.org/)
* [react-navigation](https://reactnavigation.org)
* latest ES features (ES2017)
* modern React syntax (no createClass, class prop autobinding)
* [Redux](http://redux.js.org/), [Redux Loop](https://github.com/redux-loop/redux-loop/tree/v2.2.2)
* [Code Push](https://github.com/Microsoft/code-push/blob/master/cli/README.md)
* No Immutable.js (why? because it doesn't go well with flowtype :( )
* Testing with [Jest](https://facebook.github.io/jest/) and [enzyme](https://github.com/airbnb/enzyme)
* [Airbnb JS](https://github.com/airbnb/javascript) (with a few tweaks)
* [i18n support](https://github.com/i18next/i18next)
* [Deep linking](https://reactnavigation.org/docs/guides/linking) support via react-navigation
* Error reporting via [sentry](https://docs.sentry.io/clients/javascript/integrations/react-native/)
* [Styled components <💅>](https://github.com/styled-components/styled-components#react-native)

# Android release
* setup Gradle global variables in `~/.gradle/gradle.properties` (create if it doesn't exist)
  * https://docs.gradle.org/current/userguide/userguide_single.html#sec:gradle_properties_and_system_properties
* insert ```
GREASEROCKET_RELEASE_STORE_FILE=./path/to/your/file
GREASEROCKET_RELEASE_KEY_ALIAS=your-key-alias
GREASEROCKET_RELEASE_STORE_PASSWORD=your-store-password
GREASEROCKET_RELEASE_KEY_PASSWORD=your-key-password
```
* TODO: improve security with https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/ and https://stackoverflow.com/questions/12893995/how-to-check-certificate-name-and-alias-in-keystore-files
* TODO: move code push keys to env/gradle variables and figure out how to do same on iOS
* TODO if push notifications: https://github.com/Microsoft/react-native-code-push/blob/master/docs/setup-android.md#background-react-instances