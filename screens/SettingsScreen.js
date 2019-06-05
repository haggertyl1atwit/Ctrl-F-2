import React from 'react';
import {mapContextToProps} from '../components/AppContext';
import {StyleSheet, View, Text, Image} from "react-native";
import RNTextDetector from "react-native-text-detector";

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Found Text'
    };
state={detectedText : ''};

    componentDidMount() {
        const detectText = async uri => {
            try {
                const options = {
                    quality: 0.8,
                    base64: true,
                    skipProcessing: true
                };
                const visionResp = await RNTextDetector.detectFromUri(uri);
                console.log('visionResp', visionResp);
                this.setState({detectedText: visionResp});
            } catch (e) {
                console.warn(e);
            }
        };
        detectText(this.props.photo);
    }


    render() {


        return (<View style={styles.container}>
            <View>
            <Text>Searching For {this.props.searchString || ''}</Text>
            </View>
            <View>
                <Image source = {this.props.photo} sstyle={{width: 40, height: 40}}/>
            </View>
            <View>
                <Text>Found</Text><Text>{this.state.detectedText || ''}</Text>
            </View>
        </View>)

    }
}

export default mapContextToProps(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});