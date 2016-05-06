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
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    Alert,
} = React

var About = React.createClass({
    
    //touch事件回调
    goBack: function(target:Object){
        if (this.props.navigator.getCurrentRoutes().length>1) {
            this.props.navigator.pop();
        };
    },

    viewSource:function(target:Object){
        Alert.alert( '提示', '详情请看 https://github.com/addcn/react-native-house', [ {text: '确定', onPress: () => console.log('OK Pressed!')} ])
    },


    render: function() {

        return (<View style={styles.container}>

            <View style={styles.navbar}>

                <TouchableOpacity style={styles.navbar_back} onPress={this.goBack}>
                    <View style={styles.navbar_back_icon} />
                </TouchableOpacity>

                <Text style={styles.navbar_title} numberOfLines={1}>关于</Text>                

            </View>
            
            <ScrollView style={{padding:5,}}>
                <View style={[{alignSelf: 'center',}]}>
                    <Image style={{ flex:1, resizeMode: Image.resizeMode.stretch, height: 60, width:60,}} source={require('../images/ic_launcher.png')} />
                </View>
                <Text style={{ flex:1, fontSize: 14, textAlign: 'center', alignSelf: 'center', marginBottom:8,}} >House<Text style={{textDecorationLine: 'underline',fontSize: 14, color: '#999999',}}>（v1.0.0）</Text></Text>
                <Text style={{fontSize: 16, marginBottom:8,}}>House是一款线上找房APP，提供线上房屋查看功能。纯React Native开发，兼容ios&android。</Text>
                <Text style={{fontSize: 16,}}>项目开源地址：</Text>
                <TouchableOpacity onPress={this.viewSource}>
                    <Text style={{fontSize: 16,textDecorationLine: 'underline', color: '#1e2acc',}}>https://github.com/addcn/react-native-house</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </View>);
    },
});

const STATUS_BAR_HEIGHT = React.Platform.OS === 'ios' ? 20 : 0;
const NAV_BAR_HEIGHT = 50;

var styles = StyleSheet.create({

    //navbar
    navbar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'center',
        backgroundColor:'#fe9002',
        paddingTop: STATUS_BAR_HEIGHT,
      },

    navbar_back: {
        width: 70,
        height: 20,
        justifyContent: 'center',
        left: 12,
        position: 'absolute',        
        bottom: (NAV_BAR_HEIGHT-20)/2,
        paddingTop: STATUS_BAR_HEIGHT,
      },

      navbar_back_icon: {
        width: 14,
        height: 14,
        marginLeft: 2.5,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor:'#ffffff',
        transform: [{rotate: '45deg'}]
      },

      navbar_title: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
        alignSelf: 'center',
    },

    navbar_action: {
        height: 35,
        width: 35,
        position: 'absolute',
        right: 3,
        bottom: (NAV_BAR_HEIGHT-35)/2,
        paddingTop: STATUS_BAR_HEIGHT,
    },

    //container
    container: {
        flex: 1,
    },

})

module.exports = About