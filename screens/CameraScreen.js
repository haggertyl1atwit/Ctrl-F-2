import React, {Fragment} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Button,
    ImageBackground,
    Modal,
} from 'react-native';
import {Constants, Camera, Permissions} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import {mapContextToProps} from '../components/AppContext';

class CameraScreen extends React.Component {
    static navigationOptions = {
        title: 'Camera'
    };

    state = {
        hasCameraPermission: false,
        previewPhotoModalIsOpen: false,
        currentPhoto: null,
    };

    async componentDidMount() {
        // Prompt to the use to give the app permission to use the camera.
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        // We're only handling the scenario where permission was granted. (User only needs to do this once)
        // Set a state variable to says we have permission so we know when to render the camera
        this.setState({hasCameraPermission: status === 'granted'});
    }

    onPictureSaved = currentPhoto => {
        //put our photo into state and toggle the preview window
        this.setState({currentPhoto, previewPhotoModalIsOpen: true});
    };

    takePicture = () => {
        // Check to see if the camera is ready, if not, do nothing
        if (this.camera) {
            // Take the photo and then pass the photo to our function onPicureSaved
            this.camera.takePictureAsync({onPictureSaved: this.onPictureSaved});
        }
    };

    renderBottomBar = () => (
        <View style={styles.bottomBar}>
            <View style={{flex: 1}}>
                <TouchableOpacity
                    onPress={this.takePicture}
                    style={{alignSelf: 'center'}}>
                    <Ionicons color="white" name="ios-radio-button-on" size={70}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    renderPreview = photo => {
        // Get the photo's URI (path to where the photo is stored)
        const image = photo && photo.uri;
        // If we have an image then render the photo as a background image, if not, render nothing (null)
        return image ? (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={{uri: image}}
                    style={{width: '100%', height: '100%'}}>
                    <View
                        style={{
                            flex: 0.4,
                            width: '100%',
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            justifyContent: 'space-around'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 0.4,
                                backgroundColor:'red',
                                color: 'white',
                                fontSize: 3,
                                textAlign: 'center'
                            }}

                            onPress={() => {
                                this.setState({previewPhotoModalIsOpen: false});
                            }}
                        >
                            <Text>{'Try Again'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 0.4,
                                backgroundColor:'red',
                                color: 'white',
                                fontSize: 3,
                                textAlign: 'center'
                            }}
                            onPress={() => {
                                this.props.updateContext({photo: this.state.currentPhoto});
                                this.setState({previewPhotoModalIsOpen: false});
                            }}
                        >
                            <Text>{'Use'}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        ) : null;
    };

    render() {
        // check to see permission to use the camera has been granted.
        // If not, render an annoying message
        // If permission has been given, render the camera and the hidden preview-photo Modal (A Modal is a pop up window)
        return this.state.hasCameraPermission ? (
            <Fragment>
                <View style={{flex: 1, height: 500, width: '100%'}}>
                    <Camera
                        style={styles.camera}
                        autoFocus={true}
                        ref={ref => {
                            this.camera = ref;
                        }}
                        onMountError={() => {
                            Alert.alert('Could not mount camera');
                        }}
                        type={'back'}>
                        {this.renderBottomBar()}
                    </Camera>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.previewPhotoModalIsOpen}>
                    {this.renderPreview(this.state.currentPhoto)}
                </Modal>
            </Fragment>
        ) : (
            <Text>{"Please grant permission to use your phone's camera"}</Text>
        );
    }
}

export default mapContextToProps(CameraScreen);

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        justifyContent: 'space-around',
        flex: 0.2,
        flexDirection: 'row',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
