import React from 'react';
import {mapContextToProps} from '../components/AppContext';
import {
    StyleSheet,
    Text,

    View,
    TextInput,
} from 'react-native';


class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View>
                        <Text style={styles.title}>Welcome to Control-F</Text>
                    </View>
                </View>
                <View style={styles.mid}>
                    <Text style={styles.label}>{'Enter search target'}</Text>
                    <TextInput
                        value={this.props.searchString || ''}
                        onChangeText={searchString => this.props.updateContext({searchString})}
                        style={styles.input}
                    />
                </View>
                <View style={styles.bot}>
                    <View style={styles.botLeft}><Text style={styles.botLeftText}>Clear</Text></View>
                    <View style={styles.botRight}><Text style={styles.botRightText}>Enter</Text></View>
                </View>
            </View>
        );
    }
}

export default mapContextToProps(HomeScreen);

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        backgroundColor: '#2E2E2E',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bot: {
        backgroundColor: '#2E2E2E',
        flex: 1,
        flexDirection: 'row',
    },
    mid: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botLeft: {
        backgroundColor: '#ef6969',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 30,
    },
    botRight: {
        backgroundColor: '#8cffa7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 30,
    },
    botRightText: {
        fontSize: 50,
    },
    botLeftText: {
        fontSize: 50,
    },
    input: {
        fontSize: 30,
        color: 'white',
        borderWidth: 1,
        borderColor: '#AAA',
        width: '100%'
    },
    label: {
        fontSize: 30,
        color: 'white'
    },
    title: {
        fontSize: 40,
        color: 'white',
        flex: 1,
        marginTop: 15,
    },
});