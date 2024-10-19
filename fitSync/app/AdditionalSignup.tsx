import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AdditionalDetailsScreen = () => {
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const router = useRouter();

    const handleSignUp = async () => {
        const payload = {
            gender: gender,
            date_of_birth: dob,
            weight: weight,
            height: height,
        };

        try {
            const response = await axios.post('https://your-backend-url/api/register', payload);
            
            if (response.status === 200) {
                Alert.alert('Success', 'Account created successfully!');
                router.navigate('/SignIn');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            Alert.alert('Error', 'Failed to create account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>More Information</Text>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Gender</Text>
            </View>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Date of Birth</Text>
            </View>
            <DatePicker
                style={styles.datePicker}
                date={dob}
                mode="date"
                placeholder="Select Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => setDob(date)}
            />

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Weight (kg)</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="body-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Enter Weight"
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.labelContainer}>
                <Text style={styles.label}>Height (cm)</Text>
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="resize-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Enter Height"
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Complete Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f2f5',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    labelContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#15B9A6',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
    },
    datePicker: {
        width: '100%',
        marginBottom: 15,
    },
});




