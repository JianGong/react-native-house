/**
 * Sample React Native App
 * https://github.com/addcn/react-native-house
 * 
 * @author <a href="mailto:lhuibo@gmail.com">dodo</a> 2016/04/27
 * @version ${Id}
 * 
 */
 
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    Navigator,
    BackAndroid,
} = React;

var _navigator;

//视图
var About = require('./About');
var HouseList = require('./house/HouseList');
var HouseDetail = require('./house/HouseDetail');

BackAndroid.addEventListener('harwardBackPress',() => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    };
    return false;
});


//规则
var RouteMapper = function(route,navigation,onComponent){
    _navigator = navigation;
    if (route.name === 'Home') {
        return (
            <Home navigator={navigation} {...route.passProps} />
        );
    }else if (route.name==="About"){
        return (
            <About navigator={navigation} {...route.passProps} />
        );
    }else if (route.name==="HouseList"){
        return (
            <HouseList navigator={navigation} {...route.passProps} />
        );
    }else if (route.name==="HouseDetail"){
        return (
            <HouseDetail navigator={navigation} {...route.passProps} />
        );
    }
};

//入口
var Router = React.createClass({
    render: function() {
        var initialRoute = {name:"HouseList"};
        return (<Navigator
            initialRoute={initialRoute}
            configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromLeft;
              }}
            renderScene={RouteMapper}
        />)
    },

});

//module.exports = Router

//注册
AppRegistry.registerComponent('AwesomeProject', () => Router);
