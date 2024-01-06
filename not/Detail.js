import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

const Detail = ({ route }) => {
  const navigation = useNavigation();
  const [noteText, setNoteText] = useState(route.params.item.note);
  const [noteTitle, setNoteTitle] = useState(route.params.item.title);

  const handleUpdate = async () => {
    if (noteTitle && noteTitle.length > 0) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const notesRef = collection(db, "notes");
      const noteDoc = doc(notesRef, route.params.item.id);

      try {
        await updateDoc(noteDoc, { title: noteTitle, note: noteText });
        navigation.navigate("Home");
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleDelete = async () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const notesRef = collection(db, "notes");
    const noteDoc = doc(notesRef, route.params.item.id);

    try {
      await deleteDoc(noteDoc);
      navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Başlık"
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder="Not"
        value={noteText}
        onChangeText={(text) => setNoteText(text)}
        style={styles.inputNote}
        multiline={true}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Notu Güncelle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Notu Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputNote: {
    fontSize: 16,
    height: 300,
    width: "97%",
    borderColor: "black",
    borderWidth: 1 / 2,
    borderRadius: 5,
    padding: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "97%",
  },
  button: {
    backgroundColor: "#212A3E",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
