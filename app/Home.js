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
    StyleSheet,
    Text,
} = React

var Home = React.createClass({
    //touch事件回调
    goBack: function(target:Object){
        if (this.props.navigator.getCurrentRoutes().length>1) {
            this.props.navigator.pop();
        };
    },

    render: function() {

        return (
            <View style={styles.container}>
                <Text style={{lineHeight: 18}}>开发中...</Text>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

module.exports = Home