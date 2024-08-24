import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Horoscopes } from "@/interface";

const horoscopeImages: { [key: string]: any } = {
  aries: require("../assets/aries.jpg"),
  taurus: require("../assets/taurus.jpg"),
  gemini: require("../assets/gemini.jpg"),
  cancer: require("../assets/cancer.jpg"),
  leo: require("../assets/leo.jpg"),
  virgo: require("../assets/virgo.jpg"),
  libra: require("../assets/libra.jpg"),
  scorpio: require("../assets/scorpio.jpg"),
  sagittarius: require("../assets/sagittarius.jpg"),
};

const fallbackImage = require("../assets/welcome.jpg");

interface HoroscopeNameListProps {
  item: Horoscopes;
  isSelected: boolean;
  onSelect: (item: Horoscopes) => void;
}


const HoroscopeNameList: React.FC<HoroscopeNameListProps> = ({ item, isSelected, onSelect }) => {
  const getImageSource = () => {
    const imageSource = horoscopeImages[item.image];

    if (!imageSource) {
      return fallbackImage;
    }

    return imageSource;
  };


  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onSelect(item)}
    >
      <Image source={getImageSource()} style={styles.image} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  horoscopeName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 20,
  },
  selectedContainer: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default HoroscopeNameList;
