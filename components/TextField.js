import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const TextField = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{props.label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          secureTextEntry={props?.secureTextEntry}
          value={props?.value}
          onChangeText={props?.onChangeText}
        />
        {props?.password ? (
          <TouchableOpacity onPress={props.onPress}>
            <Entypo
              name={props.secureTextEntry ? "eye-with-line" : "eye"}
              size={14}
              color="#303030"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    height: 45, 
    width: "90%", 
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 10, 
  },
  labelText: {
    color: "#303030",
    fontSize: 12, 
  },
  inputWrapper: {
    height: 40, 
    width: "100%",
    borderRadius: 10,
    borderColor: "#C1C1C1",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5, 
  },
  input: {
    flex: 1,
    fontSize: 12, 
  },
});
