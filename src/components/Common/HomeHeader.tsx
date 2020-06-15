import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Animated,
  Image,
  LayoutChangeEvent,
} from "react-native"
import { useResponsiveWidth } from "react-native-responsive-dimensions"
import { H1, P } from "@expo/html-elements"
import { HERO_FONT, HIGHLIGHT_FONT, INFO_FONT } from "../../assets/styles/fonts"
import useColors from "../../hooks/useColors"
import NavBar, { MenuType } from "./NavBar"

const { createAnimatedComponent, Value } = Animated

const AnimatedView = createAnimatedComponent(View)
const AnimatedH1 = createAnimatedComponent(H1)
const AnimatedImage = createAnimatedComponent(Image)
const AnimatedP = createAnimatedComponent(P)

export const HEADER_HEIGHT = 280
export const STICKY_HEADER_HEIGHT = 48

type HeaderProps = {
  animatedValue: Animated.Value
  title: string
  description: string
  trivia: string[]
  menu: MenuType[]
  copyright: string
}

const HomeHeader = ({
  animatedValue,
  title,
  description,
  trivia,
  menu,
  copyright,
}: HeaderProps) => {
  const range = [0, HEADER_HEIGHT]

  const [titleWidth, setTitleWidth] = useState(136)
  const [titleHeight, setTitleHeight] = useState(48)

  const interpolator = (
    outputRange: [number, number],
    customInputRange?: [number, number]
  ) =>
    animatedValue.interpolate({
      inputRange: customInputRange || range,
      outputRange: outputRange,
      extrapolate: "clamp",
    })

  const colors = useColors()

  const width = useResponsiveWidth(100)

  const onTitleLayout = (event: LayoutChangeEvent) => {
    const {
      width: titleTextWidth,
      height: titleTextHeight,
    } = event.nativeEvent.layout
    setTitleHeight(titleTextHeight)
    setTitleWidth(titleTextWidth)
  }

  const disapper = {
    transform: [{ translateY: interpolator([0, 24]) }],
    opacity: interpolator([1, 0], [0, HEADER_HEIGHT / 6]),
  }

  return (
    <>
      <AnimatedView
        style={[
          styles.headerBar,
          {
            opacity: interpolator([0, 1]),
            width,
            backgroundColor: colors.color5,
          },
        ]}
      />
      <View
        style={[
          styles.headerBackground,
          { backgroundColor: colors.color4, width },
        ]}
      />
      <AnimatedImage
        style={[
          styles.profilePic,
          {
            height: interpolator([90, 24]),
            width: interpolator([90, 24]),
            borderRadius: interpolator([24, 4]),
            left: interpolator([24, 16]),
            top: interpolator([24, 12]),
          },
        ]}
        source={require("../../assets/images/profile-pic.jpg")}
      />
      <AnimatedH1
        style={[
          styles.pageTitle,
          {
            left: interpolator([16 + 24 + 90, width / 2 - titleWidth / 2]),
            top: interpolator([24, (STICKY_HEADER_HEIGHT - titleHeight) / 2]),
            color: colors.backgroundColor,
          },
        ]}
        onLayout={onTitleLayout}
      >
        {title}
      </AnimatedH1>
      <AnimatedP
        style={[styles.infoText, { color: colors.backgroundColor }, disapper]}
      >
        {description}
      </AnimatedP>
      <AnimatedP
        numberOfLines={2}
        ellipsizeMode={"tail"}
        style={[
          styles.triviaText,
          {
            color: colors.backgroundColor,
            width: width - 48,
          },
          disapper,
        ]}
      >
        {trivia[Math.floor(Math.random() * trivia.length)]}
      </AnimatedP>
      <AnimatedView style={[styles.navbar, disapper]}>
        <NavBar menu={menu} />
      </AnimatedView>
      <P>{copyright}</P>
    </>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    height: HEADER_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -100,
  },
  pageTitle: {
    position: "absolute",
    fontFamily: HERO_FONT,
    fontSize: 48,
    marginVertical: 0,
    lineHeight: 48,
  },
  infoText: {
    position: "absolute",
    fontFamily: HIGHLIGHT_FONT,
    fontSize: 16,
    left: 16 + 24 + 90,
    marginVertical: 0,
    top: 24 + 8 + 48,
  },
  triviaText: {
    position: "absolute",
    fontFamily: INFO_FONT,
    fontSize: 24,
    textAlign: "center",
    left: 24,
    marginVertical: 0,
    top: 24 + 16 + 90,
  },
  profilePic: {
    position: "absolute",
  },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: STICKY_HEADER_HEIGHT,
  },
  navbar: {
    position: "absolute",
    top: 24 + 24 + 90 + 72,
  },
})

export default HomeHeader
