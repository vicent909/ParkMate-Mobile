import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hr from "../components/Hr";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MidtransView from "../components/MidtransView";
import WebView from "react-native-webview";
import Toast from "react-native-toast-message";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";

const ConfirmationBookingPage = ({ navigation, route }) => {
  const { id, spotId } = route.params;
  const [parkSpot, setParkSpot] = useState({});
  const [spotDetail, setSpotDetail] = useState({});
  const bookRate = 15000;

  const getData = async () => {
    try {
      const { data } = await api({
        url: `api/parkspot/${id}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setParkSpot(data);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.msg,
          topOffset: 50,
        });
      } else {
        console.log(error);
      }
    }
  };

  const getDataDetail = async () => {
    try {
      const { data } = await api({
        url: `api/parkspot/${id}/${spotId}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setSpotDetail(data);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.msg,
          topOffset: 50,
        });
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
    getDataDetail();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        title={"Booking Confirmation"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.containerBottom}>
        <Text style={styles.amount}>Amount</Text>
        <Text style={styles.amountNumber}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(bookRate)}
        </Text>
        <Hr pad={16} />
        <View style={styles.containerDescription}>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Parking Spot
            </Text>
            <Text style={styles.rightDescription}>{parkSpot.name}</Text>
          </View>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Floor
            </Text>
            <Text style={styles.rightDescription}>{spotDetail.floor}</Text>
          </View>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Area
            </Text>
            <Text style={styles.rightDescription}>{spotDetail.area}</Text>
          </View>
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Your Vehicle
            </Text>
            <Text style={styles.rightDescription}>
              {spotDetail.type === "car" ? "Car" : "Motorcycle"}
            </Text>
          </View>
          {/* <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Hourly Rate
            </Text>
            <Text style={styles.rightDescription}>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(spotDetail.fee)}
              /hour
            </Text>
          </View> */}
          {/* <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { }]}>Address</Text>
            <Text style={[styles.rightDescription, { width: 50 }]}></Text>
            <Text style={styles.rightDescription}>Jalan BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBla BlaBlaBlaBlaBlaBlaBlaBla</Text>
          </View> */}
          <View style={styles.containerDescriptionDetail}>
            <Text style={[styles.leftDescription, { marginRight: 42 }]}>
              Time
            </Text>
            <Text style={styles.rightDescription}>
              {new Date().toLocaleDateString("id-ID", {
                timeZone: "Asia/Bangkok",
                dayPeriod: "short",
                day: "2-digit",
                weekday: "short",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("PaymentPage")}
        >
          <Text style={styles.btnText}>Continue to Payment</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View>
            <Text
              style={[
                styles.leftDescription,
                {
                  textAlign: "center",
                  marginBottom: 24,
                  textDecorationLine: "underline",
                },
              ]}
            >
              Important Information
            </Text>
            <View style={styles.containerDescriptionDetail}>
              <View style={styles.containerLeft}>
                <Text style={styles.leftDescription}>Booking Rate</Text>
                <Text style={styles.leftDescription}>Hourly Rate</Text>
              </View>
              <View style={styles.containerRight}>
                <Text style={styles.leftDescription}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(bookRate)}
                </Text>
                <Text style={styles.leftDescription}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(spotDetail.fee)}
                  /hour
                </Text>
              </View>
            </View>
            <Hr pad={24} />
            <Text style={[styles.leftDescription, { textAlign: "center" }]}>
              Please do not leave your belongings in the vehicle, be responsible
              for your belongings. Any loss will be the responsibility of the
              vendor.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConfirmationBookingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  amount: {
    fontSize: 16,
    color: "#737373",
  },
  amountNumber: {
    fontSize: 32,
    fontWeight: "700",
  },
  containerDescription: {
    gap: 6,
    width: "100%",
  },
  containerDescriptionDetail: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  containerLeft: {
    gap: 4,
  },
  containerRight: {
    gap: 4,
    alignItems: "flex-end",
  },
  leftDescription: {
    fontSize: 16,
    color: "#737373",
  },
  rightDescription: {
    fontSize: 16,
    textAlign: "right",
  },
  btn: {
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 24,
  },
  btnText: {
    color: "#fff",
  },
  infoContainer: {
    borderColor: "#e2e2e2",
    borderWidth: 1,
    padding: 24,
    borderRadius: 10,
  },
  BottomSheet: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
});
