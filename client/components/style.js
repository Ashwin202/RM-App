import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerElement: { justifyContent: "center", alignItems: "center" },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  title: {
    marginLeft: 2,
  },
  ellipsisContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  ellipsisIcon: {
    marginRight: 8,
  },
  caretIcon: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: 8,
    position: "absolute",
    top: "100%",
    width: "auto",
    right: 10,
  },
  Listcontainer: {
    flex: 1,
    paddingTop: 2,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
