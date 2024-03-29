import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../../../constants/Colors';

import {Rating} from 'react-native-ratings';
import Button from '@components/Button/button';
import BiddindList from '@components/BiddingList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  get_bidding_properties,
  get_properties,
  write_review,
  report_property,
  get_allSeller,
  add_Query,
  get_All_Queries,
} from '../../../../utils/API/Requests';
import Loading from '../../../../components/Loading/Loading';
import Modal from 'react-native-modal';
const DetailsScreen = ({navigation, route}) => {
  const {width} = Dimensions.get('screen');
  const item = route.params?.item;
  const bidPrice = route.params?.bidPrice;
  const propertyID = route.params?.propertyID;
  const [review, setReview] = useState('');
  const [query, setQuery] = useState('');
  const [feedBack, setFeedBack] = useState('');
  const [reason, setReason] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(item);
  const [user, setUser] = useState({});
  const [verifyModal, setVerifyModal] = useState(false);
  const [seller, setSeller] = useState({});
  const [phone, setPhone] = useState();
  const [allQuries, setAllQueries] = useState([]);
  useEffect(() => {
    fetchProperties(propertyID);
    fetchUserInfo();
    fetchAllSellers();
  }, [propertyID]);
  const fetchUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem('USER_INFO');
    let userDetail = JSON.parse(userInfo);
    if (userDetail) {
      setPhone(userDetail.phone);
      setUser(userDetail);
    }
  };
  const fetchProperties = async propertyID => {
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem('USER_TOKEN');
      let responseList = await get_properties(token);
      let responseBiding = await get_bidding_properties(token);
      const allQuries = await get_All_Queries(propertyID);
      if (allQuries.queries.length > 0) {
        setAllQueries(allQuries.queries);
      }
      if (responseList.properties.length > 0 && responseBiding.length > 0) {
        let combineArrays = responseList.properties.concat(responseBiding);
        let updatedProperty = combineArrays.find(property => {
          return property._id === propertyID;
        });

        if (updatedProperty !== undefined) {
          setProperty(updatedProperty);
          if (updatedProperty.reviews.length > 0) {
            console.log('updatedProperty', updatedProperty);
            setReviews(updatedProperty.reviews);
          } else {
            setReviews(null);
          }
        } else {
          // Handle the case when no matching property is found
          console.log('Property not found');
        }
      }
      setLoading(false);
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const renderReview = ({item}) => {
    return (
      <>
        <View pointerEvents="none" style={styles.review}>
          <Text style={styles.facilityText}>Name : {item.username}</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.light}}>
              {item?.reviews?.reviewText !== '' && (
                <Text style={styles.facilityText}>
                  Review : {item.reviewText ? item.reviewText : ''}
                </Text>
              )}
              {item?.reviews?.rating !== 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.facilityText}>Rating : </Text>
                  <Rating
                    ratingBackgroundColor={Colors.light}
                    isDisabled={true}
                    ratingCount={item.rating}
                    imageSize={20}
                    onFinishRating={rating => {
                      console.log('Star Rating: ' + JSON.stringify(rating));
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };
  const renderQuries = ({item}) => {
    return (
      <>
        <View pointerEvents="none" style={styles.review}>
          <Text style={styles.facilityText}>
            Name : {item.userDetails?.name}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.light}}>
              {item?.queryText !== '' && (
                <Text style={styles.facilityText}>
                  Query : {item.queryText ? item.queryText : ''}
                </Text>
              )}
              {item?.userDetails?.email !== '' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.facilityText}>
                    Query :{item?.userDetails?.email}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };
  const SubmitReview = async propertyID => {
    setLoading(true);
    let body = {
      username: user?.username,
      email: user?.email,
      reviewText: review,
      rating: userRating !== 0 ? userRating : 0,
    };
    try {
      let response = await write_review(propertyID, body);

      if (response) {
        console.log('response=====>', response);
        setUserRating(0);
        setReview('');
        fetchProperties(propertyID);
      }
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const SubmitQuery = async propertyID => {
    setLoading(true);

    let body = {
      userDetails: {
        name: user?.username,
        email: user?.email,
        profilePicture: 'https://example.com/profile.jpg',
      },
      queryText: query,
    };
    try {
      let response = await add_Query(propertyID, body);

      if (response) {
        console.log('response=====>', response);
        setUserRating(0);
        setReview('');
        setQuery('');
        fetchProperties(propertyID);
        const allQuries = await get_All_Queries(propertyID);
        if (allQuries.queries.length > 0) {
          setAllQueries(allQuries.queries);
        }
        console.log(allQuries);
        setLoading(false);
      }
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const renderBids = ({item, index}) => {
    return <BiddindList item1={item} />;
  };
  const onPressOptions = () => {
    setVerifyModal(true);
  };
  const onPressCancel = () => {
    if (feedBack || reason) {
      setFeedBack('');
      setReason('');
      setVerifyModal(false);
    } else {
      setVerifyModal(false);
    }
  };
  const onReportProperty = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('USER_TOKEN');

    let body = {
      feedbackMessage: feedBack,
      feedbackReason: reason,
    };

    try {
      let response = await report_property(token, propertyID, body);
      console.log('response ==== > ', response);
      setVerifyModal(false);

      setLoading(false);
      Toast.show(response.message, Toast.LONG);
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.error('Error signing up:', error);
      setLoading(false);
    }
  };
  const fetchAllSellers = async () => {
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem('USER_TOKEN');
      let response = await get_allSeller(token);

      if (response?.sellers?.length > 0) {
        const filterSeller = response?.sellers.find(seller => {
          console.log(seller?._id === property?.addedBy);
          return seller?._id === property?.addedBy;
        });

        if (filterSeller !== undefined) {
          setSeller(filterSeller);

          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.log(error);
      setLoading(false);
    }
  };

  const sendWhatsApp = () => {
    let msg = 'i want to your about this property details';

    let mobile = seller.phone;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure WhatsApp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <StatusBar hidden={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.backgroundImageContainer}>
            <ImageBackground
              style={styles.backgroundImage}
              source={{uri: property?.images[0]}}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={styles.headerBtn}>
                  <Icon name="arrow-back-ios" size={20} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressOptions}
                  style={styles.headerBtn}>
                  <Icon2 name="options-vertical" size={20} color={'white'} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.detailsContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: Colors.dark}}>
                {property.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  // padding: 8,
                }}>
                <View>
                  <Rating
                    isDisabled={true}
                    selectedColor={'#f1c40f'}
                    unSelectedColor={'#BDC3C7'}
                    ratingCount={
                      property?.rating !== 0 && property?.rating
                        ? property?.rating
                        : 0
                    }
                    defaultRating={
                      property?.rating !== 0 && property?.rating
                        ? property?.rating
                        : 0
                    }
                    imageSize={20}
                    onFinishRating={rating => {
                      console.log('Star Rating: ' + JSON.stringify(rating));
                    }}
                  />
                </View>
              </View>
            </View>

            <Text
              style={{fontSize: 16, color: Colors.black, fontWeight: '600'}}>
              {property.location.address}
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={styles.facility}>
                <Icon name="hotel" size={18} />
                <Text style={styles.facilityText}>
                  {property?.specifications[0]}
                </Text>
              </View>
              <View style={styles.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={styles.facilityText}>
                  {property?.specifications[1]}
                </Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={styles.facilityText}>
                  {property?.specifications[2]}
                </Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={styles.facilityText}>
                  {property?.specifications[3]}
                </Text>
              </View>
            </View>
            {Array.isArray(reviews) && reviews.length > 0 && (
              <View style={{flex: 1}}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    Customer Reviews
                  </Text>
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  keyExtractor={(_, key) => key.toString()}
                  data={reviews}
                  renderItem={renderReview}
                />
              </View>
            )}

            <View style={{marginVertical: 10}}>
              <Text
                style={{fontSize: 16, color: Colors.black, fontWeight: '600'}}>
                Enter your Feedback
              </Text>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <View>
                  <Rating
                    ratingCount={5}
                    defaultRating={0}
                    imageSize={20}
                    selectedColor={'#f1c40f'}
                    unSelectedColor={'#BDC3C7'}
                    onFinishRating={rating => {
                      console.log('Star Rating: ' + rating);
                      let finalRating = JSON.stringify(rating);
                      setUserRating(finalRating);
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <TextInput
                  value={review}
                  placeholder="Write your review"
                  placeholderTextColor={'#000'}
                  onChangeText={text => {
                    setReview(text);
                  }}
                  style={[
                    styles.inputReview,
                    {
                      height: 100,
                      paddingVertical: 10,
                      textAlignVertical: 'top',
                      color: '#000',
                      fontSize: 12,
                    },
                  ]}
                  multiline={true}
                  maxLength={1000}
                />
              </View>
              <>
                <Button
                  text={'Submit Review'}
                  color={Colors.white}
                  fontSize={15}
                  height={50}
                  width={'100%'}
                  backgroundColor={Colors.black}
                  marginTop={10}
                  onPress={() => SubmitReview(property?._id)}
                />
              </>
            </View>

            {Array.isArray(property?.bids) && property.bids.length > 0 && (
              <View
                style={{
                  // flex: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: '#fff',
                  // zIndex: 1000,
                  // padding: 10,
                  height: 300,
                }}>
                <FlatList
                  nestedScrollEnabled={true}
                  style={{
                    borderRadius: 20,
                  }}
                  data={property?.bids}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderBids}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            {/* Query form */}
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{fontSize: 20, color: Colors.black, fontWeight: 'bold'}}>
                Wants to send a Query ?
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                  marginHorizontal: 30,
                }}>
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: Colors.white,
                    height: width > 450 ? 60 : 40,
                    width: width > 450 ? 200 : 80,
                    padding: width > 450 ? 10 : 5,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Name:
                  </Text>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    {user.username}
                  </Text>
                </View>

                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: Colors.white,
                    height: width > 450 ? 60 : 40,
                    width: width > 450 ? 200 : 150,
                    padding: width > 450 ? 10 : 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Email:
                  </Text>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    {user.email}
                  </Text>
                </View>
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: Colors.white,
                    height: width > 450 ? 60 : 60,
                    width: width > 450 ? 200 : 150,
                    padding: width > 450 ? 10 : 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Phone:
                  </Text>
                  <TextInput
                    value={phone}
                    placeholder="Enter Your Query"
                    placeholderTextColor={'#000'}
                    onChangeText={text => {
                      setPhone(text);
                    }}
                    style={[
                      {
                        height: width > 450 ? 60 : 40,
                        // paddingVertical: 10,
                        textAlignVertical: 'top',
                        color: '#000',
                        fontSize: 12,
                        width: '100%',

                        backgroundColor: '#f1f3f6',
                        paddingHorizontal: 10,
                        borderRadius: 10,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={{marginTop: 10, width: '100%'}}>
                <TextInput
                  value={query}
                  placeholder="Enter Your Query"
                  placeholderTextColor={'#000'}
                  onChangeText={text => {
                    setQuery(text);
                  }}
                  style={[
                    styles.inputReview,
                    {
                      height: 100,
                      paddingVertical: 10,
                      textAlignVertical: 'top',
                      color: '#000',
                      fontSize: 12,
                    },
                  ]}
                  multiline={true}
                  maxLength={1000}
                />
              </View>

              <>
                <Button
                  text={'Send Query'}
                  color={Colors.white}
                  fontSize={15}
                  height={50}
                  width={'100%'}
                  backgroundColor={Colors.black}
                  marginVertical={20}
                  marginTop={20}
                  onPress={() => SubmitQuery(property?._id)}
                />
              </>
              {Array.isArray(allQuries) && allQuries.length > 0 && (
                <View style={{flex: 1}}>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Colors.black,
                        fontWeight: 'bold',
                      }}>
                      Customer Quries
                    </Text>
                  </View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    keyExtractor={(_, key) => key.toString()}
                    data={allQuries}
                    renderItem={renderQuries}
                  />
                </View>
              )}
            </View>

            {/* footer container */}
            {seller && (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    fontWeight: 'bold',
                  }}>
                  Contact on WhatsApp ?
                </Text>
                <TouchableOpacity
                  onPress={() => sendWhatsApp()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon3 name="whatsapp" size={30} color="green" />

                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    {seller.phone}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{fontSize: 20, color: Colors.black, fontWeight: 'bold'}}>
                Price Details
              </Text>
            </View>

            {bidPrice ? (
              <View style={styles.footer}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    Fixed Price
                  </Text>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    PKR-{property.fixedPrice}
                  </Text>
                </View>
                <View style={{height: 50, backgroundColor: 'red', width: 2}} />

                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    Bidding Price
                  </Text>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    PKR-{bidPrice}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.footer}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                      fontWeight: 'bold',
                    }}>
                    Fixed Price
                  </Text>
                  <Text
                    style={{
                      color: Colors.switchergray,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    PKR-{property.fixedPrice}
                  </Text>
                </View>
              </View>
            )}

            <>
              <Button
                text={'Purchase Now'}
                color={Colors.white}
                fontSize={15}
                height={50}
                width={'100%'}
                backgroundColor={Colors.black}
                marginBottom={10}
                onPress={() => {
                  navigation.navigate('PaymentScreen', {
                    fixedPrice: property?.fixedPrice,
                    name: property?.name,
                    propertyId: property?._id,
                    userId: user?.userId,
                  });
                }}
              />
            </>
          </View>
        </ScrollView>
        <>
          <Modal isVisible={verifyModal}>
            <View style={styles.ModalViewImage}>
              <View
                style={{
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    value={feedBack}
                    placeholder="Write your Feedback"
                    placeholderTextColor={'#000'}
                    onChangeText={text => {
                      setFeedBack(text);
                    }}
                    style={{
                      height: 100,
                      paddingVertical: 10,
                      textAlignVertical: 'top',
                      color: '#000',
                      fontSize: 12,
                      width: '95%',
                      backgroundColor: '#f1f3f6',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                    multiline={true}
                    maxLength={1000}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    value={reason}
                    placeholder="Reason"
                    placeholderTextColor={'#000'}
                    onChangeText={text => {
                      setReason(text);
                    }}
                    style={{
                      height: 50,
                      paddingVertical: 10,
                      textAlignVertical: 'top',
                      color: '#000',
                      fontSize: 12,
                      width: '95%',
                      backgroundColor: '#f1f3f6',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                    multiline={false}
                    maxLength={50}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <View style={styles.dummy}>
                  <Button
                    text={'Report'}
                    color={Colors.white}
                    fontSize={15}
                    height={50}
                    width={'120%'}
                    backgroundColor={Colors.black}
                    marginBottom={20}
                    onPress={onReportProperty}
                    marginTop={80}
                    borderWidth={1}
                    padding={10}
                  />
                </View>
                <View style={styles.dummy}>
                  <Button
                    text={'Cancel'}
                    color={Colors.white}
                    fontSize={15}
                    height={50}
                    width={'120%'}
                    backgroundColor={Colors.black}
                    marginBottom={20}
                    onPress={onPressCancel}
                    marginTop={80}
                    borderWidth={1}
                    padding={10}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
        {loading && (
          <View style={[styles.popupContainer, {zIndex: 99999}]}>
            <Loading />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default DetailsScreen;
