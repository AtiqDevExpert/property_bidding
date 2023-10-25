import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {SearchIcon} from '../../Assets/SVG/Svg';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../../constants/Colors';
import {
  NewPropertyPlotIcon,
  AreaIcon,
  LocationIcon,
  AreaIcon1,
} from '../../Assets/SVG/Svg';

const PlotComponent = ({item1, onPressButton, onChangeText}) => {
  const divider = index => {
    if (data.length - 1 == index) {
      return 0;
    } else {
      return 1;
    }
  };

  const data = item1.data;
  return (
    <>
      <TouchableOpacity
        onPress={onPressButton}
        onChangeText={onChangeText}
        style={{
          marginVertical: 10,
          // marginHorizontal: 5,
          flex: 1,
          width: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
            flexDirection: 'row',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.text5}>{/* {item1.Phase} */}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              marginHorizontal: 8,
              borderColor: '#D9D9D9',
              marginVertical: 7,
            }}>
            <Text style={[styles.text5, {marginHorizontal: 10}]}>
              {/* {item1.PLot} */}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.text5}>{/* {item1.Block} */}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
            // marginBottom: 8,
            width: '100%',
          }}>
          <View>
            <View style={styles.ndummyChild1}>
              <View style={styles.ndummyChild2}>
                <LocationIcon style={styles.logo} />
                <Text style={styles.text2}>{/* {item1.Location} */}</Text>
              </View>

              <View style={styles.ndummyChild3}>
                <Text style={[styles.bluePrice, {marginHorizontal: 10}]}>
                  {/* {item1.price} */}
                </Text>
              </View>
            </View>

            <View style={styles.ndummyChild21}>
              <AreaIcon style={styles.logo} />
              <Text style={styles.text2}>{/* {item1.width} */}</Text>
            </View>

            <View style={styles.ndummyChild21}>
              <AreaIcon1 style={styles.logo} />
              <Text style={styles.text2}>{/* {item1.area} */}</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'rgba(2,119,250,0.13)',
              flexDirection: 'row',
              borderRadius: 10,
              alignItems: 'center',
              marginVertical: 10,
              marginBottom: 15,
              width: '95%',
              alignSelf: 'center',
              flexWrap: 'wrap',
            }}>
            {data.map((item, index) => {
              return (
                <>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: divider(index),
                      marginLeft: 5,
                      borderColor: Colors.darkPrimery,
                      marginVertical: 5,
                    }}>
                    <Text style={styles.text6}>
                      {/* {item.name} */}
                      20%
                    </Text>
                  </View>
                </>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PlotComponent;