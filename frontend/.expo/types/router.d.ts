/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/` | `/(auth)/OTPVerify` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/account` | `/(tabs)/connectzones` | `/(tabs)/event` | `/ConnectZones` | `/OTPVerify` | `/RootLayout` | `/Zones` | `/_sitemap` | `/account` | `/bottomSlider` | `/connectzones` | `/context/AuthContext` | `/context/UserContext` | `/event` | `/eventsList` | `/login`;
      DynamicRoutes: `/event/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}/seat`;
      DynamicRouteTemplate: `/event/[id]` | `/event/[id]/seat`;
    }
  }
}
