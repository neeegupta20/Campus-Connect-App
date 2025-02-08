/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(account)` | `/(account)/` | `/(account)/changePassword` | `/(account)/contactUs` | `/(account)/editAvatar` | `/(account)/privacyPolicy` | `/(account)/tickets` | `/(auth)` | `/(auth)/` | `/(auth)/OTPVerify` | `/(auth)/chooseAvatar` | `/(auth)/enterEmail` | `/(auth)/enterName` | `/(auth)/enterPhoneNo` | `/(auth)/login` | `/(notifications)/notificationScreen` | `/(notifications)/useNotification` | `/(tabs)` | `/(tabs)/` | `/(tabs)/connectzones` | `/(tabs)/event` | `/(tabs)/profile` | `/OTPVerify` | `/_sitemap` | `/changePassword` | `/chooseAvatar` | `/connectZoneType` | `/connectZonesList` | `/connectZonesTab` | `/connectzones` | `/contactUs` | `/context/UserContext` | `/editAvatar` | `/enterEmail` | `/enterName` | `/enterPhoneNo` | `/event` | `/eventsList` | `/login` | `/mapScreen` | `/notificationScreen` | `/privacyPolicy` | `/profile` | `/selectedZoneContext` | `/tickets` | `/useNotification`;
      DynamicRoutes: `/event/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}/seat`;
      DynamicRouteTemplate: `/event/[id]` | `/event/[id]/seat`;
    }
  }
}
