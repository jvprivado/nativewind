import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
    const [books, setBooks] = useState([]);
    const colorScheme = useColorScheme();
    const [pressed, setPressed] = useState(false);

    const fetchData = async () => {
        const { data, error } = await supabase.from("Books").select("*");
        setBooks(data);

        if (error) {
            console.error("Error fetching data:", error);
            return [];
        }

        return data;
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Publisher</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.books}>
                <View>
                    {books.map((detail) => (
                        <>
                            <View key={detail.id}>
                                <Text>{detail.id}</Text>
                                <Text>{detail.title}</Text>
                                <Text>{detail.author}</Text>
                                <Text>{detail.genre}</Text>
                                <Text>{detail.publishedDate}</Text>

                                <Pressable
                                    style={styles.button}
                                    onPress={() => {
                                        console.log(`Pressed ${detail.id}`);
                                        setPressed(!pressed);
                                    }}
                                >
                                    <FontAwesome
                                        name="trash"
                                        size={25}
                                        color={
                                            Colors[colorScheme ?? "light"].tint
                                        }
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </>
                    ))}
                </View>
            </Text>
            {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    books: {
        fontSize: 16,
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: "80%",
    },
});
