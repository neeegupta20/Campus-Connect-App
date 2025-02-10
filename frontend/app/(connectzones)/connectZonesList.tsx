import { ImageSourcePropType } from "react-native";
const Zones:{
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    imageUrl:ImageSourcePropType | string;
    }[]=[
      {
        id:1,
        name:'Pet Therapy Zone',
        description:'A RELAXING SPACE TO INTERACT WITH THERAPY ANIMALS, PROMOTING WELL-BEING AND STRESS RELIEF THROUGH CONNECTION WITH PETS.',
        latitude:30.351622,
        longitude:76.373908,
        imageUrl:require("../../assets/EVENT IMAGES/petTherapy.png") 
      },
      {
        id:2,
        name:'Hack-A-Zone',
        description:'A DYNAMIC, COLLABORATIVE EVENT WHERE TEAMS WORK UNDER PRESSURE TO DEVELOP INNOVATIVE SOLUTIONS, SHOWCASING CREATIVITY AND TECHNICAL SKILLS IN A LIMITED TIMEFRAME.',
        latitude:30.346372,
        longitude:76.378603,
        imageUrl:require("../../assets/EVENT IMAGES/hackathons.png") 
      }
    ]
  
export default Zones;