import React, { useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions
  // Icon
} from "react-native";
// import { Card } from "react-native-elements";
import { Card, CardItem, Icon, Button, Text, Accordion } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";

const newsData = [
  {
    _id: "1234",
    isActive: true,
    date: "2020/3/7",
    title: "0さいからのコンサート\n予約受け付け開始!",
    content:
      "日時: 2020/1/18(土)\n    第1部(0-3歳向け): 10:30\n    第2部(4歳- 向け): 14:00\n場所: 葛西区民館ホール\n大人:¥1000\n子供:¥500",
    imageURL: [
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2Fzero_years_concert%2F2020_0118%2F1.jpg?alt=media&token=d0ac4f69-c3f0-4fd2-b291-6efc80ef9d4f",
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2Fzero_years_concert%2F2019_0119_zerosai_concert_2.jpg?alt=media&token=bf19ec82-0413-49d1-a873-056d525f28be"
    ],
    hasAction: true,
    actionURL: "",
    actionText: "予約ページ"
  },
  {
    _id: "1235",
    date: "2020/3/7",
    title: "エクセレントコンサート\n予約受け付け開始!",
    content: "日時: 2020/3/18(土)\n場所: ホール",
    imageURL: [
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2fexcellent_concert%2f2019_0223_excellent_concert_1.jpg?alt=media&token=a35bdf8e-9a14-4fac-98fe-a815952068e7"
    ],
    hasAction: true,
    actionURL: "",
    actionText: "予約する"
  }
];

const concertData = [
  {
    title: "0sai",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/concert_posters%2Fzero_years_concert%2F2020_0118%2F1.jpg?alt=media&token=d0ac4f69-c3f0-4fd2-b291-6efc80ef9d4f"
  }
];
export default function App() {
  const [state, setState] = useState({ activeSlide: 0, isDetailOpen: false });
  console.log(state);
  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/edogawa-music-web.appspot.com/o/ui_images%2Fedogawa_logo.png?alt=media&token=7a5dc7f6-d4de-46c9-b125-0de8a28e5269"
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>江戸川区</Text>
          <Text style={styles.headerText}>演奏家協会</Text>
        </View>
      </View>
      <View style={styles.newsListOuterContainer}>
        <Carousel
          data={newsData}
          renderItem={({ item, index }) => {
            console.log("carousel item rendering");
            return (
              <View style={styles.newsItemContainer}>
                <View style={styles.newsPreviewImageContainer}>
                  <Image
                    style={styles.newsPreviewImage}
                    source={{ uri: item.imageURL[0] }}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.newsTitleContainer}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                </View>
                <View style={styles.showDetailContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setState({ ...state, isDetailOpen: !state.isDetailOpen });
                    }}
                  >
                    {state.isDetailOpen === true ? (
                      <View
                        style={{
                          paddingLeft: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Text style={styles.showDetailText}>詳細を閉じる</Text>
                        <Icon
                          type="AntDesign"
                          name="up"
                          style={{ color: "grey", fontSize: 15 }}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          paddingLeft: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Text style={styles.showDetailText}>詳細を見る</Text>
                        <Icon
                          type="AntDesign"
                          name="down"
                          style={{ color: "grey", fontSize: 15 }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                {/* <Button block style={styles.showDetailButton}>
                  <Text style={styles.showDetailButtonText}>詳細をみる</Text>
                </Button> */}

                {state.isDetailOpen === true ? (
                  <View style={styles.newsContentContainer}>
                    <View style={styles.newsContentTextContainer}>
                      <Text style={styles.newsContentText}>{item.content}</Text>
                    </View>
                    <View style={styles.newsImagesContainer}>
                      {item.imageURL.map(imageURL => {
                        return (
                          <Image
                            style={styles.newsImage}
                            source={{ uri: imageURL }}
                            resizeMode="contain"
                          />
                        );
                      })}
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            );
          }}
          itemWidth={Math.round(Dimensions.get("window").width)}
          sliderWidth={Math.round(Dimensions.get("window").width)}
          containerCustomStyle={styles.carousel}
          onSnapToItem={index => {
            console.log("onSnapToItem running");
            setState({ activeSlide: index });
          }} //for pagination
          // loop
          // autoplay
        />

        <Pagination
          dotsLength={newsData.length} //dotの数
          activeDotIndex={state.activeSlide} //どのdotをactiveにするか
          containerStyle={{ paddingVertical: 5 }} //デフォルトではちと広い
        />
        {/* <Accordion
          expanded={state.isDetailOpen === true ? 0 : 1}
          headerStyle={styles.accordionHeader}
          contentStyle={styles.accordionContent}
          dataArray={[{ ...newsData[state.activeSlide], title: "詳細" }]}
          renderContent={accordionItem => {
            console.log("accordion item rendering");
            return (
              <View style={styles.newsContentContainer}>
                <View style={styles.newsContentTextContainer}>
                  <Text style={styles.newsContentText}>
                    {accordionItem.content}
                  </Text>
                </View>
                <View style={styles.newsImagesContainer}>
                  {accordionItem.imageURL.map(imageURL => {
                    return (
                      <Image
                        style={styles.newsImage}
                        source={{ uri: imageURL }}
                        resizeMode="contain"
                      />
                    );
                  })}
                </View>
              </View>
            );
          }}
        /> */}

        <Button block style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {newsData[state.activeSlide].actionText}
          </Text>
        </Button>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    // alignItems: "center",
    justifyContent: "flex-start",
    margin: 20
  },
  header: {
    // borderColor: "red",
    // borderWidth: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "center"
  },
  headerImageContainer: {},
  headerTextContainer: {},
  headerText: {
    margin: 0,
    marginLeft: 10,
    fontSize: 10
  },
  newsListOuterContainer: {
    // borderColor: "blue",
    // borderWidth: 5
  },
  carousel: {
    // borderColor: "green",
    // borderWidth: 5
  },
  // carousel2: {
  //   alignSelf: "stretch"
  // },
  newsItemContainer: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1
  },
  newsPreviewImageContainer: {
    // borderColor: "blue",
    // borderWidth: 5
  },
  newsPreviewImage: {
    // borderColor: "green",
    // borderWidth: 5,
    // width: "100%",
    height: (3 * Math.round(Dimensions.get("window").height)) / 5
  },
  newsTitleContainer: {
    // borderColor: "blue",
    // borderWidth: 5
    backgroundColor: "white"
  },
  newsTitle: {
    padding: 10,
    // color: "white",
    color: "black",
    fontSize: 20
  },
  showDetailContainer: {
    // borderColor: "blue",
    // borderWidth: 5
    backgroundColor: "white"
  },
  showDetailText: {
    color: "grey"
  },
  accordionHeader: {
    // borderColor: "blue",
    // borderWidth: 5,
    // backgroundColor: "#97e8ed"
    backgroundColor: "white"
  },
  accordionContent: {
    borderColor: "red",
    borderWidth: 5
  },
  newsContentContainer: {},
  newsContentTextContainer: {
    padding: 20
  },
  newsContentText: {
    color: "grey",
    fontSize: 20
  },
  newsImagesContainer: {
    alignItems: "stretch"
  },
  newsImage: {
    width: "100%",
    height: 500
  },

  newsContent: {
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
    borderColor: "#ffc8bd",
    borderWidth: 1,
    backgroundColor: "white",
    // backgroundColor: "#ecfbfc",
    // backgroundColor: "#ffc8bd",
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
    color: "#ffc8bd"
    // color: "white"
  }
});
