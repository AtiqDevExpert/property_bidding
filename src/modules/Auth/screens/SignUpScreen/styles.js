import {StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Dimensions} from 'react-native';
import {Colors} from '../../../../constants/Colors';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: Colors.fullDarkBlue,
  },
  bluebackground: {
    // backgroundColor: Colors.darkPrimery,
    borderRadius: width * 0.09,
  },
  text: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  whitebackground: {
    backgroundColor: Colors.white,
    borderRadius: width * 0.09,
    marginHorizontal: 5,
  },

  dummyView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  dummyView1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dummy: {
    marginHorizontal: 20,
  },
  input: {marginVertical: 20, marginHorizontal: 10},
  mainView1: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
