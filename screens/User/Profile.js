import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth } from "firebase/auth";

const Profile = ({ route, navigation }) => {
  const { email, password } = route.params || {};

  const deleteUser = () => {
    const user = getAuth().currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          console.log("Kullanıcı başarıyla silindi.");
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log("Kullanıcı silme hatası:", error);
        });
    } else {
      console.log("Oturum açmış bir kullanıcı bulunamadı.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hoşgeldiniz</Text>
      {email && <Text style={styles.emailText}>E-mail: {email}</Text>}
      {password && <Text style={styles.passwordText}>Şifre: {password}</Text>}
      <View style={styles.buttonContainer}>
        <Button
          title="Çıkış"
          onPress={() => navigation.navigate("Login")}
          color="#023B54"
        />
        <Button title="Profil Sil" onPress={deleteUser} color="#FF0000" />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
  },
  passwordText: {
    fontSize: 12,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
