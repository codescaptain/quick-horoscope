import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import horoscopes from "../assets/horoscopes.json";
import HoroscopeNameList from "@/components/HoroscopeNameList";
import { HoroscopeResponse, Horoscopes } from "@/interface";
import axios from "axios";

const timePeriods = [
  { value: '', label: "Günlük" },
  { value: "haftalik", label: "Haftalık" },
  { value: "aylik", label: "Aylık" },
];

const Page = () => {
  const [selectedHoroscope, setSelectedHoroscope] = useState(horoscopes[0]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[0]);
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeResponse | null>(
    null
  );

  const handleHoroscopePress = (item: Horoscopes) => {
    setSelectedHoroscope(item);
  };

  const handleTimePeriodPress = (period: (typeof timePeriods)[0]) => {
    setSelectedTimePeriod(period);
  };

  const renderHoroscopeContent = () => {
    if (!horoscopeData) return null;

    const content = horoscopeData.GunlukYorum || horoscopeData.Yorum;
    if (!content) return null;

    const paragraphs = content.split('\n').filter(paragraph => paragraph.trim() !== '');

    return (
      <View style={styles.horoscopeContent}>
        {paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.horoscopeParagraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    );
  };

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const response = await axios.get<HoroscopeResponse>(
          `${process.env.EXPO_PUBLIC_HOROSCOPE_API_URL}${selectedHoroscope.value}/${selectedTimePeriod.value}`
        );        
        setHoroscopeData(response.data[0]);
      } catch (error) {
        console.error("Error fetching horoscope data:", error);
      }
    };
    fetchHoroscope();
  }, [selectedHoroscope, selectedTimePeriod]);

  console.log(horoscopeData);
  

  return (
    <ImageBackground
      source={require("../assets/welcome.jpg")}
      style={styles.background}
    >
      <ScrollView style={styles.overlay}>
        <Text style={styles.horoscopeName}>{selectedHoroscope.name}</Text>
        <Text style={styles.horoscopeName}>{selectedHoroscope.date}</Text>
        <FlatList
          style={{ marginTop: 0, maxHeight: 200 }}
          keyExtractor={(item) => item.value}
          data={horoscopes}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleHoroscopePress(item)}>
              <HoroscopeNameList
                item={item}
                isSelected={selectedHoroscope.name === item.name}
                onSelect={handleHoroscopePress}
              />
            </TouchableOpacity>
          )}
          horizontal
        />
        <View style={styles.timePeriodContainer}>
          {timePeriods.map((period) => (
            <TouchableOpacity
              key={period.value}
              style={[
                styles.timePeriodButton,
                selectedTimePeriod.value === period.value &&
                  styles.selectedTimePeriod,
              ]}
              onPress={() => handleTimePeriodPress(period)}
            >
              <Text style={styles.timePeriodText}>{period.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
 {renderHoroscopeContent()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Siyah renk, 0.5 opaklık
  },
  safeArea: {
    flex: 1,
    justifyContent: "flex-end", // This will push the content to the bottom
  },
  horoscopeName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 20,
  },
  timePeriodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 20,
  },
  timePeriodButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  selectedTimePeriod: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  timePeriodText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  horoscopeContent: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  horoscopeText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    marginTop: 20,
  },
  horoscopeParagraph: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 15,
    textAlign: 'justify',
    letterSpacing: -0.7,
  },
});

export default Page;
