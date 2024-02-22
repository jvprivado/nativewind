import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function ModalScreen() {
    const [book, onChangeBook] = useState({
        title: "",
        author: "",
        genre: "",
        publishedDate: "",
    });

    console.log(book);

    const insertData = async (data) => {
        const { error } = await supabase.from("Books").insert([{ ...data }]);

        if (error) {
            console.error("Error inserting data:", error);
            return false;
        }

        return true;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Publish a Book </Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => {
                        onChangeBook({ ...book, title: e });
                    }}
                    placeholder="Title"
                    value={book.title}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => {
                        onChangeBook({ ...book, author: e });
                    }}
                    placeholder="Author"
                    value={book.author}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => {
                        onChangeBook({ ...book, genre: e });
                    }}
                    placeholder="Genre"
                    value={book.genre}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => {
                        onChangeBook({ ...book, publishedDate: e });
                    }}
                    placeholder="Published Date"
                    value={book.publishedDate}
                />
                <Pressable
                    onPress={() => {
                        insertData(book);
                    }}
                >
                    <Text style={styles.button}>Add Book</Text>
                </Pressable>
            </View>
            {/* <EditScreenInfo path="app/modal.tsx" /> */}

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
    },
    inputBox: {
        margin: 10,
    },
    input: {
        height: 40,
        width: "100%",
        padding: 10,
        marginVertical: 12,
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: "80%",
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
        marginVertical: 10,
    },
});
