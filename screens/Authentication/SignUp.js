import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginHeader from "../../components/LoginHeader";
import TextField from "../../components/TextField";
import StandardButton from "../../components/StandardButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function SignUp(props) {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();

  const onSignUp = () => {
      if (email.length == 0) {
      alert("Lütfen E-mailinizi Giriniz");
    } else if (password.length == 0) {
      alert("Lütfen Parolayı Girin");
    } else if (confirmPass.length == 0) {
      alert("Lütfen Parolanızı Onaylayınız");
    } else if (password != confirmPass) {
      alert("Girdiğiniz Parolalar Birbiriyle Eşleşmiyor!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <View style={styles.container}>
      <LoginHeader
        title="Hesabınızı Oluşturmak İçin Kaydolun"
        subTitle="Aşağıdaki Boş Kutuların Hepsini Doldurmayı Unutmayın"
      />
      <View style={styles.fieldWrapper}>
        <TextField
          label="E-mail"
          placeholder="E-mailinizi girin"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextField
          label="Parola"
          placeholder="Parolanızı girin"
          password
          secureTextEntry={showPass ? false : true}
          onPress={() => setShowPass(!showPass)}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
        <TextField
          label="Parolayı Onayla"
          placeholder="Şifreni Tekrar Yaz"
          password
          secureTextEntry={showPassConfirm ? false : true}
          onPress={() => setShowPassConfirm(!showPassConfirm)}
          value={confirmPass}
          onChangeText={(val) => setConfirmPass(val)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <StandardButton title="Kayıt Ol" onPress={onSignUp} loading={loading} />
      </View>
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>
          Zaten Bir Hesabınız Var Mı?{" "}
          <Text
            onPress={() => props.navigation.navigate("Login")}
            style={styles.footerButtonTxt}
          >
            Giriş
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  fieldWrapper: {
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 60,
  },
  footerWrap: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  footerText: {
    color: "#303030",
    fontSize: 12,
  },
  footerButtonTxt: {
    fontWeight: "bold",
    color: "#023B54",
    fontSize: 12,
  },
});

