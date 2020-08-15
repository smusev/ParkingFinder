import React, { useState } from 'react';
import { StyleSheet, FlatList, ListItem, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native' // <-- import useNavigation hook
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" },
  { uri: "https://i.imgur.com/sNam9iJ.jpg" }
]

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: Images[0],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: Images[1],
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: Images[2],
  },
];

const Item = ({ title, image }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Image
      source={Images[0]}
      style={styles.cardImage}
      resizeMode="cover"
    />
  </View>
);

export default function ProfileScreen({navigation}){

  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.authReducer)
  const [state, setState] = useState();

  console.log(loggedIn)
//  const navigation = useNavigation()
  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', item)}>
        <View style={styles.item}  >
        <Image
          style={styles.itemImage}
          source={item.image}
        />
        <View style={styles.itemMeta}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.title}</Text>
        </View>
    </View>
  </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
      <View style={styles.loggedInContainer}>
        <Text style={styles.loggedInText}>Logged In: </Text>
        <Text style={styles.loggedInText}>{`${loggedIn}`}</Text>
        <Button
          title="Login"
          onPress={loggedIn === false ? () => dispatch(login(true)) : () => dispatch(login(false))}
          style={styles.loginButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    marginTop: 10,
    paddingBottom: 5,
    justifyContent: 'space-between'
  },
  itemMeta: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  itemImage: {
    width:'100%',
    height: 200,
    marginRight: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: "#111",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loggedInContainer: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 40,
},
loggedInText: {
  fontFamily: 'System',
  fontSize: 17,
  fontWeight: '400',
  color: '#000',
},
loginButton: {
  marginTop: 20,
  paddingTop: 20,
},

});
