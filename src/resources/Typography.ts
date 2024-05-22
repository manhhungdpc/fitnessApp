import {isIOS} from '@src/base/common';
import Colors from '@src/resources/Colors';
import {StyleSheet} from 'react-native';

const Fonts = {
  sfProDisplayBold: isIOS() ? 'SFProDisplay-Bold' : 'sf_pro_display_bold',
  sfProDisplayRegular: isIOS()
    ? 'SFProDisplay-Regular'
    : 'sf_pro_display_regular',
  sfProDisplayLight: isIOS() ? 'SFProDisplay-Light' : 'sf_pro_display_light',
  sfProDisplayMedium: isIOS() ? 'SFProDisplay-Medium' : 'sf_pro_display_medium',
  sfProDisplaySemibold: isIOS()
    ? 'SFProDisplay-Semibold'
    : 'sf_pro_display_semibold',
};

const Typography = StyleSheet.create({
  b1Bold12: {
    fontFamily: Fonts.sfProDisplayBold,
    fontSize: 12,
  },
  b1Bold16: {
    fontFamily: Fonts.sfProDisplayBold,
    fontSize: 16,
    fontWeight: '600',
  },
  b2SemiBold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 14,
    fontWeight: '600',
  },
  b3Bold: {
    fontFamily: Fonts.sfProDisplayBold,
    fontSize: 12,
    fontWeight: '600',
  },
  h1Medium: {
    fontFamily: Fonts.sfProDisplayMedium,
    fontSize: 92,
  },
  h2Medium: {
    fontFamily: Fonts.sfProDisplayMedium,
    fontSize: 58,
  },
  h3Semibold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 46,
  },
  h4Semibold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 33,
    fontWeight: '600',
    lineHeight: isIOS() ? 40 : 33,
  },
  h5Bold: {
    fontFamily: Fonts.sfProDisplayBold,
    fontSize: 23,
    fontWeight: '600',
  },
  h6Bold: {
    fontFamily: Fonts.sfProDisplayBold,
    fontSize: 19,
    fontWeight: '600',
  },
  l1Medium: {
    fontFamily: Fonts.sfProDisplayMedium,
    fontSize: 13,
    fontWeight: '500',
  },
  l1Regular: {
    fontFamily: Fonts.sfProDisplayRegular,
    fontSize: 13,
  },
  l1SemiBold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 12,
  },
  l2Light: {
    fontFamily: Fonts.sfProDisplayLight,
    fontSize: 10,
    fontWeight: '300',
  },
  l2SemiBold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 10,
  },
  n1Light: {
    fontFamily: Fonts.sfProDisplayLight,
    fontSize: 8,
  },
  p1Regular: {
    fontFamily: Fonts.sfProDisplayRegular,
    fontSize: 15,
  },
  p2Regular: {
    fontFamily: Fonts.sfProDisplayRegular,
    fontSize: 13,
  },
  p5Regular: {
    fontFamily: Fonts.sfProDisplayRegular,
    fontSize: 23,
  },
  s1SemiBold: {
    fontFamily: Fonts.sfProDisplaySemibold,
    fontSize: 15,
  },
  s2Medium: {
    fontFamily: Fonts.sfProDisplayMedium,
    fontSize: 13,
    fontWeight: '500',
  },
  text12Regular: {
    fontSize: 12,
  },
  text14RegularBlack: {
    color: Colors.black,
  },
  text16BoldBlack: {
    color: Colors.black,
    fontSize: 16,
  },
  text16BoldPrimary: {
    color: Colors.primary,
    fontSize: 16,
  },
  text18BoldWhite: {
    color: Colors.white,
    fontSize: 18,
  },
  text18RegularBlack: {
    color: Colors.black,
    fontSize: 18,
  },
  text20BoldBlack: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '800',
  },
});

export default Typography;
