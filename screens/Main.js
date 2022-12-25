import React from 'react';
import { StyleSheet,Button,Text,View,Platform,SafeAreaView } from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            faces:[],
        }
    }
    async componentDidMount(){
        const {status}=await Camera.requestCameraPermissionsAsync();
        this.setState({hasCameraPermission:status==="granted"})

    }

    onFacesDetected({faces}){
        this.setState({faces:faces})
    }

render(){
    const {hasCameraPermission}=this.state
        if(hasCameraPermission===null){
            return <View/>
        }
    
        if(hasCameraPermission===false){
            return(
                <View style={styles.container}>
                    <Text>No Access To Camera</Text>
                </View>
            )
        }
    
        console.log(this.state.faces)
        return(
            <View style={styles.UpperContainer}>
                <SafeAreaView style={styles.droidSafeArea}/>
            <View>
                <Text>Look Me...</Text>
            </View>
           
                <View style={styles.middleContainer}>
                 <Camera
                    style={{
                        flex:1,
                    }}
                    type={Camera.Constants.Type.front}
                    faceDetectorSettings={{
                        mode:FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks:FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications:FaceDetector.FaceDetectorClassifications.all,
                    }}
                    onFacesDetected={this.onFacesDetected}
                    onFacesDetectionError={this.onFacesDetectionError}
                    />   
                </View>

              </View>
        )
    }    


}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
  });