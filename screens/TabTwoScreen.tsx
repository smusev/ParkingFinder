import * as React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, Dimensions, Callout, ScrollView, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import ClusteredMapView from "react-native-maps-super-cluster";
import { COORDS, INITIAL_POSITION } from "../Data";

export default function TabTwoScreen({navigation}) {

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  const CARD_HEIGHT = HEIGHT / 4;
  const CARD_WIDTH = Dimensions.get('window').width * 0.85;

  const [ cardList, setCardList ] = useState([]);
  const _scrollView = useRef();

  let zoomLevel = 9;

  const handleMarkerPress = (e) => {
    let card = COORDS.find(item => item.identifier === e.nativeEvent.id)
    setCardList([card])
    console.log(cardList);
  }

  const renderMarker = (data) => {
    return (
      <Marker
        key = {data.id || Math.random()}
        identifier	= {data.identifier}
        coordinate = {data.location}
        style = {styles.markerWrap}
        onPress = {handleMarkerPress}
        >
        <Text style={styles.markerText}>
          {data.price}
        </Text>
        <View style={styles.arrowDown} />
        <View style={styles.marker} />
      </Marker>
  )}

  const onRegionChangeComplete = (region) => {
    zoomLevel = Math.log2(360 * ((WIDTH/256) / region.longitudeDelta)) + 1
  }

  const onClusterPress = (clusterId, children) => {
    if (zoomLevel >= 16) {
      setCardList(children)
    }
    console.log(children)
  }

  const renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

        return (
          <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
            <View style={styles.clusterContainer}>
              <Text style={styles.clusterText}>
                {pointCount}
              </Text>
            </View>
          </Marker>
        )
      }



  return (
    <View style={styles.container}>
      <ClusteredMapView
        style={{flex: 1}}
        maxZoom	= {18}
        radius = {80}
        maxZoomLevel = {16}
        data={COORDS}
        initialRegion={INITIAL_POSITION}
        //ref={(r) => { this.map = r }}
        preserveClusterPressBehavior = {true}
        onClusterPress = {onClusterPress}
        renderMarker = {renderMarker}
        renderCluster = {renderCluster}
        onRegionChangeComplete = {onRegionChangeComplete} >
        <Marker
          key={Math.random()}
          title='4000$'
          description='Кирпичный гараж, 3*6'
          coordinate={{
            latitude: 49.9814,
            longitude: 36.367,
          }}>
          <Animated.View style={[styles.marker]} />
        </Marker>
        </ClusteredMapView>
        { cardList.length === 0 ? null :
        <Animated.ScrollView
          ref = {_scrollView}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: 0,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle = {styles.endPadding}
          onContentSizeChange = {() => { _scrollView.current.scrollTo({x:0, y:0, animated: true})}}
        >
          {cardList.map((marker, index) => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Details')}>
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.price}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>
      }

{/*      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 49.98,
          longitude: 36.33,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05
        }}
      >
      <Marker
        key='12'
        coordinate={{ latitude: 49.98, longitude: 36.36 }}
        title='wtf title'
        description='wtf description'
      >
      </Marker >
      <Marker
        key='11'
        coordinate={{ latitude: 49.97, longitude: 36.35 }}
        title='wtf title'
        description='wtf description'
      >
      </Marker>
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
    clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
    scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
    endPadding: {
    paddingRight: Dimensions.get('window').width * 0.01,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width * 0.8,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerText:{
    padding: 6,
    backgroundColor: 'green',
    borderRadius: 12,
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderLeftColor: "rgba(158, 150, 150, .01)",
    borderRightWidth: 6,
    borderRightColor: "rgba(158, 150, 150, .01)",
    borderTopWidth: 6,
    borderTopColor: 'green',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
