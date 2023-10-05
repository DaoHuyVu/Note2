import { TextInput ,StyleSheet,View} from "react-native"
export default function SearchBar({searchQuery,setSearchQuery}){
    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.input}
                placeholder="Search..."
                value = {searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        height : '20%',
        justifyContent : 'center',
        alignItems : 'center',
    },
    input : {
        width : "70%",
        height : 50,
        borderRadius : 50,
        borderWidth : 1,
        paddingLeft : 10,
    }
})