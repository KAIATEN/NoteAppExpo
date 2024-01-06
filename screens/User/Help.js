import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Help = () => {
 return (
   <View style={styles.container}>
     <Text style={styles.heading}>Yardım</Text>

     <Text style={styles.sectionTitle}>İletişim</Text>
     <Text style={styles.sectionText}>E-mail: aemin368@gmail.com</Text>
   </View>
 );
}

export default Help

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
