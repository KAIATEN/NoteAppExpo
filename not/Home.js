import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const notesRef = collection(db, "notes");
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
    const userNotesRef = query(notesRef, where("userId", "==", userId));
    onSnapshot(userNotesRef, (querySnapshot) => {
      const newNotes = [];
      querySnapshot.forEach((doc) => {
        const { note, title } = doc.data();
        newNotes.push({ note, title, id: doc.id });
      });
      setNotes(newNotes.reverse());
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.noteView}>
            <Pressable
              onPress={() => {
                navigation.navigate("Detail", { item });
              }}
            >
              <Text style={styles.noteTitle}>
                {item.title.substring(0, 15)}
              </Text>
              <Text style={styles.noteDescription}>
                {item.note.substring(0, 20)}
              </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Not Ekle" onPress={() => navigation.navigate("NoteAdd")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9AC5F4",
  },
  noteView: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
    alignItems: "center",
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  noteDescription: {
    fontSize: 16,
    marginTop: 5,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Home;
