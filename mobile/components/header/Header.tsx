import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/styles/global";

export default function Header(){
  return(
    <SafeAreaView style={{padding: 32}}>
     <Text
          style={Typography.label}>
          PERSONAL FINANCE
        </Text>
      <Text style={styles.title}
      >LEDGER</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Playfair Display",
    fontSize: 30,
    color: '#fff'
  }
})