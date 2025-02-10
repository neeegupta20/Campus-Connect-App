import { ImageSourcePropType } from "react-native"

export default interface ConnectZone{
  id: number,
  name: string,
  description: string,
  longitude: number,
  latitude: number,
  imageUrl: ImageSourcePropType | string
}