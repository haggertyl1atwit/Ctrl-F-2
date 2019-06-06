import React, { Fragment } from 'react';
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
import { Constants, Camera, Permissions } from 'expo';
import {Ionicons} from '@expo/vector-icons';
import RNTextDetector from "react-native-text-detector";
export default class LinksScreen extends React.Component {
  state = {
    hasCameraPermission: false,
    previewPhotoModalIsOpen: false,
    currentPhoto: null,
    image: null,
    visionResp: []
  };

  async componentDidMount() {
    // Prompt to the use to give the app permission to use the camera.
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // We're only handling the scenario where permission was granted. (User only needs to do this once)
    // Set a state variable to says we have permission so we know when to render the camera
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onPictureSaved = currentPhoto => {
    //put our photo into state and toggle the preview window
    this.setState({ currentPhoto, previewPhotoModalIsOpen: true });
  };

  takePicture = () => {
    // Check to see if the camera is ready, if not, do nothing
    if (this.camera) { 
      // Take the photo and then pass the photo to our function onPicureSaved
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
    this.setState(
      {
        image: currentPhoto.uri
      },
      () => {
        console.log(currentPhoto.uri);
        this.processImage(currentPhoto.uri, {
          height: currentPhoto.uri,
          width: currentPhoto.uri
        });
      })
  };

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={this.takePicture}
          style={{ alignSelf: 'center' }}>
          <Ionicons color="white" name="ios-radio-button-on" size={70} />
        </TouchableOpacity>
      </View>
    </View>
  );
  processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    if (!(visionResp && visionResp.length > 0)) {
      throw "UNMATCHED";
    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
    });
  };
  
  mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map(item => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y
        }
      };
    });
  };

  renderPreview = photo => {
    // Get the photo's URI (path to where the photo is stored)
    const image = photo && photo.uri;
    // If we have an image then render the photo as a background image, if not, render nothing (null)
    return image ? (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: image }}
          style={{ width: '100%', height: '100%' }}
          key="image"
          resizeMode="cover">
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              left: 0,
              justifyContent: 'space-around',
            }}>
            {this.state.visionResp.map(item => {
              return (
                <TouchableOpacity
                  style={[style.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
            <Button
              onPress={() => {
                this.setState({ previewPhotoModalIsOpen: false });
              }}
              title={'close'}
            />
          </View>
        </ImageBackground>
      </View>
    ) : null;
  };
  
  render() {
    return this.state.hasCameraPermission ? (
      <Fragment>
        <View style={{ flex: 1, height: 500, width: '100%' }}>
          <Camera
            style={styles.camera}
            autoFocus={true}
            flashMode={true}
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
  boundingRect: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6600"
  }
});
