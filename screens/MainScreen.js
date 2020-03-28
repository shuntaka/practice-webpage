import React, { useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList
  // Icon
} from "react-native";
// import { Card } from "react-native-elements";
import { Card, CardItem, Icon, Button, Text } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";

const newsData = [
  {
    _id: "1234",
    date: "2020/3/7",
    title: "0さいからのコンサート\n予約受け付け開始!",
    description: "日時: 2020/1/18(土)\n場所: 葛西区民館ホール",
    hasAction: true,
    actionURL: "",
    actionText: "予約する",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2Fzero_years_concert%2F2020_0118%2F1.jpg?alt=media&token=d0ac4f69-c3f0-4fd2-b291-6efc80ef9d4f"
  }
  // {
  //   _id: "1234",
  //   date: "2020/3/7",
  //   title: "エクセレントコンサート\n予約受け付け開始!",
  //   description: "日時: 2020/3/18(土)\n場所: ホール",
  //   actionURL: "",
  //   actionText: "予約する",
  //   imageURL:
  //     "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2fexcellent_concert%2f2019_0223_excellent_concert_1.jpg?alt=media&token=a35bdf8e-9a14-4fac-98fe-a815952068e7"
  // }
];

const concertData = [
  {
    title: "0sai",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2Fzero_years_concert%2F2020_0118%2F1.jpg?alt=media&token=d0ac4f69-c3f0-4fd2-b291-6efc80ef9d4f"
  }
];
export default function MainScreen() {
  const [state, setState] = useState({ activeSlide: 0 });
  console.log("main screen rendering");
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/ui_images%2Fedogawa_logo.png?alt=media&token=7a5dc7f6-d4de-46c9-b125-0de8a28e5269"
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>
        {/* <Icon type="MaterialCommunityIcons" name="piano" /> */}
        <View>
          <Text style={styles.headerText}>江戸川</Text>
          <Text style={styles.headerText}>演奏家協会</Text>
        </View>
      </View>
      <View style={styles.newsListOuterContainer}>
        <Carousel
          data={newsData}
          renderItem={({ item, index }) => {
            console.log("carousel content rendering");
            return (
              <View style={styles.newsItemContainer}>
                <View style={styles.newsImageContainer}>
                  <Image
                    style={styles.newsImage}
                    source={{ uri: item.imageURL }}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.newsTextContainer}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>

                <Button block style={styles.showDetailButton}>
                  <Text style={styles.showDetailButtonText}>詳細をみる</Text>
                </Button>
                <Button block style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{item.actionText}</Text>
                </Button>
              </View>
            );
          }}
          itemWidth={350}
          sliderWidth={350}
          // itemWidth={Dimensions.get("window").width * 0.6}
          // sliderWidth={Dimensions.get("window").width * 1.0}
          containerCustomStyle={{ flex: 1, backgroundColor: "#ecfbfc" }}
          // containerCustomStyle={{ flex: 1, backgroundColor: "black" }}
          onSnapToItem={index => setState({ activeSlide: index })} //for pagination
          loop
          autoplay
        />
        <Pagination
          dotsLength={newsData.length} //dotの数
          activeDotIndex={state.activeSlide} //どのdotをactiveにするか
          containerStyle={{ paddingVertical: 15 }} //デフォルトではちと広い
        />
      </View>
      <View
        style={{
          borderColor: "red",
          borderWidth: 5,
          alignSelf: "stretch",
          height: 300
        }}
      >
        <Text style={{ fontSize: 20 }}>Concert Info</Text>
        <View>
          <FlatList
            horizontal
            data={concertData}
            renderItem={({ item }) => {
              return (
                <View>
                  <Image
                    style={{ width: 200, height: 100 }}
                    source={item.imageURL}
                  ></Image>
                  <Text>{item.title}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          borderColor: "blue",
          borderWidth: 5,
          alignSelf: "stretch",
          height: 300
        }}
      >
        <Text>MENU</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "center"
  },
  headerText: {
    margin: 0,
    marginLeft: 10,
    fontSize: 10
  },
  newsListOuterContainer: {},
  newsListInnerContainer: {
    borderColor: "red",
    borderWidth: 5,
    flexDirection: "row"
  },
  // newsListContainer: {
  //   flexDirection: "row",
  //   alignSelf: "stretch"
  // },
  newsItemContainer: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1
  },
  newsImageContainer: {
    // borderWidth: 10,
    // borderColor: "blue"
  },
  newsImage: {
    // borderColor: "green",
    // borderWidth: 5,
    width: "100%",
    height: 300
  },
  newsTextContainer: {},
  newsTitle: {
    padding: 10,
    color: "grey",
    fontSize: 30
  },
  newsDescription: {
    padding: 10,
    color: "grey",
    fontSize: 20
  },
  newsDate: {
    fontSize: 5
  },
  // concertTitle: {
  //   fontSize: 30
  // },
  // concertSchedule: {
  //   fontSize: 20
  // },
  // concertPrice: {
  //   fontSize: 10
  // },
  showDetailButton: {
    borderColor: "#ffc8bd",
    borderWidth: 1,
    backgroundColor: "#ecfbfc",
    borderRadius: 10,
    margin: 20,
    marginBottom: 0
  },

  actionButton: {
    // borderColor: "#ffc8bd",
    // borderWidth: 1,
    backgroundColor: "#ffc8bd",
    // backgroundColor: "#ecfbfc",
    borderRadius: 10,
    margin: 20,
    alignItems: "center"
  },
  showDetailButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffc8bd"
  },
  actionButtonText: {
    // borderColor: "red",
    // borderWidth: 5,
    fontSize: 20,
    fontWeight: "bold",
    // color: "#ffc8bd"
    color: "white"
  }
});
