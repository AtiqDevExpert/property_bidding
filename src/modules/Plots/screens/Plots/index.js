import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Colors} from '../../../../constants/Colors';
import PlotComponent from '@components/PlotComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Plots = ({navigation}) => {
  const plotdata = [
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad ',
      mail: 'jawad@gmail.com',
      id: '1',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'aSAD Ahmad',
      mail: 'asadahmad@gmail.com',
      id: '2',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Nabeel Ahmad',
      mail: 'nabeelahmad@gmail.com',
      id: '3',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Alipaki Ahmad',
      mail: 'jawad@gmail.com',
      id: '4',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'jawad@gmail.com',
      id: '5',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'jawad@gmail.com',
      id: '6',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'jawad@gmail.com',
      id: '7',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'jawad@gmail.com',
      id: '8',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'jawad@gmail.com',
      id: '9',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
    {
      Phase: 'Phase 1',
      PLot: 'Plot # 201204',
      Block: 'Block C',
      Location: 'New colony 33 street n New colony 33 street nyy....',
      price: '2,000,0000',
      width: '2000*2000',
      area: '5 Canal',
      image: null,
      name: 'Jawad Ahmad',
      mail: 'nabeelismaeel1122@gmail.com',
      id: '10',
      data: [
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
        {
          name: 'Jawad ',
          persentage: '20%',
        },
      ],
      index: '500000',
      soldDate: '22-mar-22',
      soldPrice: '25000000',
    },
  ];

  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={styles.mainView1}>
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.text1}>All Sellers</Text>
            </View>
          </>
          <>
            <View
              style={{
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.searchInputContainer}>
                <Icon name="search" color={Colors.grey} size={25} />
                <TextInput
                  placeholder="Search seller"
                  placeholderTextColor={'#000'}
                  value={search}
                  onChange={text => {
                    setSearch(text);
                  }}
                />
              </View>
            </View>
          </>
        </View>

        <View style={styles.view2}>
          <FlatList
            nestedScrollEnabled={true}
            style={{
              borderRadius: 20,
            }}
            data={plotdata.filter(item =>
              item.Location.toUpperCase().includes(search.toUpperCase()),
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <PlotComponent
                  item1={item}
                  onPressButton={() =>
                    navigation.navigate('PlotDetailNavigation')
                  }
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </>
      {/* )} */}

      {/* {plotNavigation == 'plot' && (
        <>
          <View style={styles.mainView}>
            <View style={styles.view1}>
              <Text style={styles.text1}>List Of Plots</Text>
              <View style={styles.view11}>
                <View style={styles.view10}>
                  <View style={styles.iconView}>
                    <LocationIcon style={styles.locationIcon} />
                  </View>

                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Search property"
                    placeholderTextColor="#0277FA"
                    style={styles.text3}
                    onChangeText={text => {
                      setSearch(text);
                    }}
                    value={search}
                    autoCorrect={true}
                    maxLength={20}
                  />
                </View>
                <View style={styles.iconView}>
                  <SearchRightIcon
                    style={styles.searchRightIcon}
                    fill={'#0277FA'}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#F5F5F5',
            }}>
            <View style={styles.routeView}>
              <SwitchSelector
                style={{
                  width: '90%',
                  alignSelf: 'center',
                }}
                selectedColor={Colors.white}
                textColor={Colors.switchergray}
                textStyle={styles.switchertxt}
                selectedTextStyle={styles.switchertxt}
                fontSize={14}
                buttonColor={Colors.darkPrimery}
                backgroundColor={Colors.white}
                borderRadius={5}
                borderWidth={0}
                buttonMargin={3}
                initial={0}
                onPress={value =>
                  // this.setState({ gender: value })
                  setPlotType(value)
                }
                hasPadding
                options={[
                  {label: 'Purchase Plots', value: 'Purchase'},
                  {label: ' Sold Plots', value: 'Sold'},
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
              />
            </View>
          </View>
          <ScrollView style={{flex: 1}}>
            {plotType == 'Purchase' && (
              <View style={styles.view2}>
                <FlatList
                  nestedScrollEnabled={true}
                  style={{
                    borderRadius: 20,
                  }}
                  data={plotdata.filter(item =>
                    item.Location.toUpperCase().includes(search.toUpperCase()),
                  )}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <PlotComponent
                        item1={item}
                        onPressButton={() =>
                          navigation.navigate('PlotDetailNavigation')
                        }
                      />
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            )}

            {plotType == 'Sold' && (
              <View style={styles.view2}>
                <FlatList
                  nestedScrollEnabled={true}
                  style={{
                    borderRadius: 20,
                  }}
                  data={plotdata.filter(item =>
                    item.Location.toUpperCase().includes(search.toUpperCase()),
                  )}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <SoldPlotComponent
                        item1={item}
                        onPressHandler={() =>
                          navigation.navigate('SoldNavigation')
                        }
                      />
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </ScrollView>
        </>
      )} */}
    </SafeAreaView>
  );
};

export default Plots;