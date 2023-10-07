import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListOfDocs,requestDoc } from '../services/URLs';


const RequestDoctorScreen = ({ visible, onClose }) => {
    
    const [doctorData,setDoctorData] = useState([]);
    
    useEffect(() => {   
       
        getListOfDoctors();
    }, [])

    const getListOfDoctors=async()=>
    {
      const token = await AsyncStorage.getItem('token');
      const doctorData = await axios.get(getListOfDocs);
      setDoctorData(doctorData.data);
    }
  
    const requestDoctor=async(doctorId)=>{
      try {
        const patientId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        let config = {
              headers: {
                  Authorization: token,
                  'ngrok-skip-browser-warning':'true'
                  }
          };
      const response = await axios.post(requestDoc+patientId+"/"+doctorId, {}, config);
      if(response.status===200)
        {      
          return (Alert.alert(
            'Request has been sent successfully',
            'Click on Continue to start your journey with us :-)',
            [
              {
                text: 'Continue',
                onPress:onClose
              }
            ]
          ));
        } 
      
      } catch (error) {
        console.log(error);
        return (Alert.alert(
          'There has been some error fron our side..',
          'Please keep faith in us and try again.. We are here only for you..',
          [
            {
              text: 'Try again',
              onPress:onClose
            }
          ]
        ));
        
      }

    }

  const renderDoctorCard = ({ item }) => (
    <View  className="mb-3 bg-blue-300" style={styles.doctorCard}>
        <Avatar.Image
            className = {20}
            size={50}
            source={{
                uri: `http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Happy-Whatsapp-DP-Profile-Images-4.jpg`,
                    }}
        />
      <View style={styles.info}>
        <Text style={styles.name}> Dr. {item.firstName} {item.lastName}</Text>
        <Text style={styles.name}> Specialisation :- {item.specialisation}</Text>
        <Text style={styles.name}> Contact :- {item.contact}</Text>
        <Button icon='home' onPress={()=>requestDoctor(item.id)}> Request Doctor</Button>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text className="mt-2" style={styles.modalTitle}>Some Doctor Suggestions for you</Text>
        <FlatList
          data={doctorData}
          keyExtractor={(item) => item.registrationStamp}
          renderItem={renderDoctorCard}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '97%',
    height: 200,
    marginBottom: 5,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    },
    closeButtonText: {
    fontSize: 16,
    color: '#fff',
    },
    });

export default RequestDoctorScreen;

