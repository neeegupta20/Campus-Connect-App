/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/` | `/(auth)/OTPVerify` | `/(auth)/chooseAvatar` | `/(auth)/enterEmail` | `/(auth)/enterName` | `/(auth)/enterPhoneNo` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/account` | `/(tabs)/connectzones` | `/(tabs)/event` | `/OTPVerify` | `/_sitemap` | `/account` | `/chooseAvatar` | `/connectZoneType` | `/connectZonesList` | `/connectZonesTab` | `/connectzones` | `/context/UserContext` | `/enterEmail` | `/enterName` | `/enterPhoneNo` | `/event` | `/eventsList` | `/login` | `/notificationScreen` | `/sendNotification` | `/useNotification`;
      DynamicRoutes: `/event/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}/seat`;
      DynamicRouteTemplate: `/event/[id]` | `/event/[id]/seat`;
    }
  }
}
