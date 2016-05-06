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
    InteractionManager,
} = React

//config
var HOUSE_DETAIL = "http://www.domain.com.hk/Api/House/detail"; //domain
var HOUSE_DETAIL = "https://raw.githubusercontent.com/addcn/react-native-house/master/docs/data/detail.json";

var NewsDetail = React.createClass({

    //touch事件回调
    goBack: function(target:Object){
        if (this.props.navigator.getCurrentRoutes().length>1) {
            this.props.navigator.pop();
        };
    },

    getInitialState: function () {
        return {
            isReady: false,
            isLoading: true,
            results: null
        };
    },

    componentDidMount: function() {
        this.fetchData();
        InteractionManager.runAfterInteractions(() => {
          this.setState({isReady: true});
        });
    },


    fetchData: function () {

        var houseid = this.props.data.houseid;

        var type = houseid.substring(0,1)=='S' ? '2' : '1';
        var post_id = houseid.substring(1);

        var url = HOUSE_DETAIL + '?device=android&version=1.14.0.34&isApp=1&hl=zh-hk&size=1080x1776&hl=zh-hk&type=' + type + '&post_id=' + post_id;
        
        var obj;
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonObject = eval("(" + responseText + ")");
                obj = jsonObject;
                this.setState({
                    results: obj, 
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.warn(error);
            }).done;
        return obj;
    },

    render: function() {

        var content;

        if(this.state.isLoading || !this.state.isReady){
            content = (
                <View style={{ flex:1,justifyContent:'center', alignItems:'center',}}>
                    <Text >正在加载...</Text>
                </View>);
        }else{
            var data = this.state.results.data;

            content = (
                <ScrollView>
                    <View>
                        <View>
                            <Image style={{ height:200, flex:1, resizeMode:Image.resizeMode.stretch, backgroundColor:"#dddddd",}} source={{uri: data.houseInfo.cover_src}} />
                        </View>

                        <Text style={styles.title, {lineHeight: 20,}}>{this.props.data.title}({this.props.data.houseid.substring(0,1)}{this.props.data.houseid.substring(1)})</Text>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize: 12, color:'#666666'}}>{data.files.refreshtime.name }：{data.files.refreshtime.text}</Text>
                            <Text style={{fontSize: 12, color:'#666666'}}>{data.files.browseNum.name }：{data.files.browseNum.text}</Text>
                        </View>

                        <View style={{ height:5, backgroundColor:'#dddddd'}}></View>

                        <Text style={{fontSize: 12, color:'#333333'}}>{data.files.price.name }：<Text style={{fontSize: 16, color:'#ff0000'}}>{data.files.price.value }</Text>{data.files.price.text}</Text>
                        <Text style={{fontSize: 12, color:'#666666'}}>{data.files.address.name }：{data.files.address.text}</Text>

                        <View style={{ height:5, backgroundColor:'#dddddd'}}></View>

                        <View>
                            <Text style={{fontSize: 12, color:'#333333'}}>{data.files.remark.name }</Text>
                            <Text style={{fontSize: 12, color:'#333333'}}>{data.files.remark.text}</Text>
                        </View>


                    </View>
                </ScrollView>
            );
        }

        return (<View style={styles.container}>

            <View style={styles.navbar}>

                <TouchableOpacity style={styles.navbar_back} onPress={this.goBack}>
                    <View style={styles.navbar_back_icon} />
                </TouchableOpacity>

                <Text style={styles.navbar_title} numberOfLines={1}>详细资讯</Text>                

            </View>

            {content}
            
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

module.exports = NewsDetail