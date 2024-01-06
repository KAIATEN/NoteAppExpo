import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const NoteAdd = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = async () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const notesRef = collection(db, "notes");
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;

      try {
        await addDoc(notesRef, { title, note, userId });
        setTitle("");
        setNote("");
        Keyboard.dismiss();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Başlık"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.inputTitle}
        multiline={true}
      />
      <TextInput
        placeholder="Not"
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.inputNote}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#c9f5d9",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    padding: 10,
  },
  inputNote: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    height: 200,
    width: "97%",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    padding: 10,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 20,
    height: 55,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
