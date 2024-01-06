import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginHeader from "../../components/LoginHeader";
import TextField from "../../components/TextField";
import StandardButton from "../../components/StandardButton";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Login(props) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const navigation = useNavigation();

  const onLogin = () => {
    if (email.length == 0) {
      alert("Lütfen E-mailiniz Girin");
    } else if (password.length == 0) {
      alert("Lütfen Parolayı Girin");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoading(false);
          navigation.navigate("TabNavi", {
            email: email,
            password: password,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message);
          setLoading(false);
        });
    }
  };

  const onResetPassword = () => {
    if (email.length == 0) {
      alert("Lütfen E-mailiniz Girin");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert(
            "Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin."
          );
        })
        .catch((error) => {
          alert("Şifre sıfırlama işlemi başarısız: " + error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <LoginHeader
        title="Hesabınıza Giriş Yapın"
        subTitle="Email Ve Parolanızı Girin"
      />
      <View style={styles.fieldWrapper}>
        <TextField
          label="Email"
          placeholder="Emailinizi Girin"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextField
          label="Password"
          placeholder="Parolanızı Girin"
          password
          secureTextEntry={showPass ? false : true}
          onPress={() => setShowPass(!showPass)}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <StandardButton title="Giriş" onPress={onLogin} loading={loading} />
      </View>
      <View style={styles.resetPasswordWrapper}>
        <Text style={styles.resetPasswordText} onPress={onResetPassword}>
          Şifremi Unuttum
        </Text>
      </View>
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>
          Bir Hesabınız Yok Mu?{" "}
          <Text
            onPress={() => props.navigation.navigate("SignUp")}
            style={styles.footerButtonTxt}
          >
            Kayıt Ol{" "}
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
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 30,
  },
  resetPasswordWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  resetPasswordText: {
    color: "#023B54",
    fontSize: 12,
  },
  footerWrap: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
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
