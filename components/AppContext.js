import React, {Component} from 'react';
import {Text, TouchableOpacity} from "react-native";
import {EventEmitter} from 'events';

const initialState = {currentPhoto: null, theme:'light'};


class MyEmitter extends EventEmitter {
    constructor(args){
        super(args);
        this.registerListener = (eventName, callback) => {
            this.on(eventName, callback)
        }
    }
}
const myEmitter = new MyEmitter();


// Create the context object that will store our global application state
const AppContext = React.createContext(initialState);
export const {Consumer} = AppContext;

export const mapContextToProps = WrappedComponent => (
    class AppContext extends Component {
        render() {

            const updateContext = updates => myEmitter.emit('UPDATE', updates);
            return (
                <Consumer>
                    {(context) => (<WrappedComponent {...context}{...this.props} updateContext ={updateContext}/>)}
                </Consumer>
            );
        }
    }
);

export class ContextProvider extends React.Component {
    state = initialState;

    componentDidMount(){
        myEmitter.registerListener('UPDATE', updates => this.setState({...this.state, ...updates}))
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}


