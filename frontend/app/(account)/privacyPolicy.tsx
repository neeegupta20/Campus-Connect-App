import { Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import { StatusBar } from "expo-status-bar";
export default function PrivacyPolicyTab(){

    const router=useRouter();
    
    return(
        // <ImageBackground source={require('../../assets/images/bg.jpeg')} style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" backgroundColor="#00000" translucent={true}/>
                <View style={styles.heading}>
                        <TouchableOpacity onPress={()=>router.back()} style={styles.backIcon}>
                            <Ionicons name="arrow-back-outline" color="white" size={32} />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Privacy & Terms</Text>
                </View>
                <ScrollView>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Introduction</Text>
                        <Text style={styles.text}>
                            {`Welcome to Campus Connect ("we," "our," "us"). By using our app, you agree to these Terms and Conditions. If you do not agree, please do not use our services.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>User Information & Privacy</Text>
                        <Text style={styles.text}>
                            {`We collect certain personal information, including your phone number, email address, name, and other basic details. Your data is handled in accordance with our Privacy Policy. By using our app, you consent to receive notifications related to your bookings, promotions, and updates.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Non-Refundable Bookings</Text>
                        <Text style={styles.text}>
                            {`All tickets booked for any events listed on our app are strictly non-refundable. Please review your selection carefully before making a purchase.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Event Responsibilities</Text>
                        <Text style={styles.text}>
                            {`We act solely as a ticketing platform and are not responsible for any disputes, incidents, or mishaps that occur at the event venue or restaurant. Any issues related to the event, including but not limited to safety, service, or disputes, must be addressed directly with the venue.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Notification Permissions</Text>
                        <Text style={styles.text}>
                            {`By using our app, you agree to allow us to send push notifications related to bookings, reminders, and promotional offers. You can manage notification preferences in your device settings.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Food & Liquor Consumption</Text>
                        <Text style={styles.text}>
                            {`The consumption of food and liquor at events is the sole responsibility of the attendee. We do not promote or endorse the consumption of alcohol or smoking by underage individuals. Users are responsible for ensuring they adhere to local laws and regulations.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Limitation of Liability</Text>
                        <Text style={styles.text}>
                            {`We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our platform. Our responsibility is limited to providing a booking interface between users and event organizers.`}
                        </Text>
                    </View>
                    <View style={styles.topicView}>
                        <Text style={styles.topicHeading}>Changes to Terms</Text>
                        <Text style={styles.text}>
                            {`We reserve the right to update these Terms and Conditions at any time. Continued use of the app after changes are made constitutes acceptance of the new terms.`}
                        </Text>
                    </View>
                    <Text style={styles.text1}>
                        By using our app, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        // </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20,
        backgroundColor:"black"
    },
    heading:{
        flexDirection:"row",
        alignItems: "center",
        width:"100%",
        paddingHorizontal:5,
        marginBottom:20,
        top: Platform.OS==="ios"?0:70,
    },
    headingText:{
        color:"white",
        fontSize:24,
        fontWeight:"bold",
        marginLeft:10,
    },
    backIcon:{
        padding:10,
    },
    topicView:{
       marginTop:10,
       marginHorizontal:10        
    },
    topicHeading:{
        color:"white",
        marginVertical:10,
        fontSize:25,
        fontFamily:"Montserrat_700Bold"
    },
    text:{
        color:"white",
        fontFamily:"Montserrat_400Regular",
        fontSize:16,
    },
    text1:{
        color:"white",
        fontFamily:"Montserrat_400Regular",
        fontSize:16,
        marginTop:30,
        marginBottom:100,
        marginHorizontal:10
    }
})