import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const WIDTH = window.width;
const HEIGHT = window.height;

const ASPECT_RATIO = WIDTH / HEIGHT;
const LATITUDE_DELTA = 0.35;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" },
  { uri: "https://i.imgur.com/sNam9iJ.jpg" }
]

export const INITIAL_POSITION = {
  latitude: 49.924447,
  longitude: 36.367339,
  latitudeDelta: 1,
  longitudeDelta: 1
};

export const COORDS = [
  {
    id: 123456,
    identifier: "121",
    title: "Best Place",
    description: "Большой кирпичный гараж",
    price: '2900$',
    image: Images[0],
    data: {
      id: 13,
      name: "Гараж зеленый"
    },
    location: {
      latitude: 49.9854,
      longitude: 36.3653,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Second Best Place",
    description: "Маленький гараж",
    identifier: "122",
    price: '3000$',
    image: Images[1],
    data: {
        id: 1231123,
        name: "Гараж 1128"
      },
    location: {
      latitude: 49.9811,
      longitude: 36.3552,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "my Best Place",
    description: "Маленький гараж",
    identifier: "127",
    price: '3330$',
    image: Images[1],
    data: {
        id: 1231123,
        name: "Гараж 11428"
      },
    location: {
      latitude: 49.9811,
      longitude: 36.3553,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Third Best Place",
    description: "Место на паркинге",
    identifier: "123",
    price: '3400$',
    image: Images[2],
    location: {
      latitude: 49.9801,
      longitude: 36.3553,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Fourth Best Place",
    description: "Гараж шмараж",
    identifier: "124",
    price: '3500$',
    image: Images[3],
    location: {
      latitude: 49.9831,
      longitude: 36.3662,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Best Place",
    description: "This is the best place in Portland",
    identifier: "125",
    price: '2000$',
    image: Images[4],
    data: {
      id: 123123,
      name: "Гараж 128"
    },
    location: {
      latitude: 49.9814,
      longitude: 36.3667,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  }
];
