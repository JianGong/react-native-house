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
    Navigator,
    StyleSheet,
    Text,
    View,
    ListView,

    AppRegistry,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Alert,
    RefreshControl,
    Animation,
} = React;

//config
var HOUSE_LIST = "http://www.domain.com.hk/Api/House/houselist"; //domain
var HOUSE_LIST = "https://raw.githubusercontent.com/addcn/react-native-house/master/docs/data/houselist.json";

var PAGE_SIZE =  15;
var CACHE_DATA = {items: [], pageindex: 1, records: 0};


var HouseList = React.createClass({

    //touch事件回调
    goNavTo: function (target:Object) {
        //var data = (typeof data:target.data !== 'undefined') ? data:target.data : '';
        //ToastAndroid.show(target.data.tid.toString(), ToastAndroid.SHORT);
        this.props.navigator.push({
                title: target.title,
                name: target.name,
                passProps: {data:target.data},
            }
        );
    },

    goAbout: function(target:Object){
        //Alert.alert( '提示', '正在开发中...', [ {text: '确定', onPress: () => console.log('OK Pressed!')} ])
        this.props.navigator.push({
                title: target.title,
                name: target.name,
                passProps: {data:target.data},
            }
        );
        
    },

    getInitialState: function () {
        //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            //dataSource: ds.cloneWithRows(this.fetchData()),
            isLoading: true,

            isLoadMoreing: false,
            isRefreshing: false,
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function () {
        if (this.state.isLoadMoreing) {
            return ;// is loading return false
        }        
        if (CACHE_DATA.pageindex > 0 && CACHE_DATA.records>0 && CACHE_DATA.pageindex*PAGE_SIZE >= CACHE_DATA.records) {
            if(React.Platform.OS === 'ios'){
                //alert("已经加载到最底部拉");
            }else{
                //ToastAndroid.show('已经加载到最底部拉',ToastAndroid.SHORT);
            }
            //return false;
        }

        this.setState({isLoadMoreing: true});


        var params = [];
        params.push('listRows=' + PAGE_SIZE);
        params.push('page=' + CACHE_DATA.pageindex);
        //params.join('&');
        var url = HOUSE_LIST+'?device=android&version=1.14.0.34&region=&price=&purpose=&type=1&hl=zh-hk&' + params.join('&');

        console.log(url);

        var results = [];
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonObject = eval("(" + responseText + ")");
                var items = jsonObject.data.items;
                for (var i = 0; i < items.length; i++) {
                    results.push(items[i]);

                    CACHE_DATA.items.push(items[i]);
                }

                CACHE_DATA.records = jsonObject.data.records;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(CACHE_DATA.items),
                    isLoading: false,
                    isLoadMoreing: false
                });
            })
            .catch((error) => {
                console.warn(error);

                this.setState({
                    isLoadMoreing: false
                });

            }).done;
        return results;
    },

    fetchRefresh(){
        if (this.state.isRefreshing) {
            return;
        }

        //初始数据
        CACHE_DATA = {items: [], pageindex: 1, records: 0};        

        this.setState({isRefreshing: true});

        var params = [];
        params.push('listRows=' + PAGE_SIZE);
        params.push('page=' + CACHE_DATA.pageindex);
        //params.join('&');
        var url = HOUSE_LIST+'?device=android&version=1.14.0.34&region=&price=&purpose=&type=1&hl=zh-hk&' + params.join('&');

        console.log(url);

        var results = [];
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                var jsonObject = eval("(" + responseText + ")");
                var items = jsonObject.data.items;
                for (var i = 0; i < items.length; i++) {
                    results.push(items[i]);

                    CACHE_DATA.items.push(items[i]);
                }

                CACHE_DATA.records = jsonObject.data.records;

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(CACHE_DATA.items),
                    isRefreshing: false
                });
            })
            .catch((error) => {
                console.warn(error);
            }).done;
        return results;
    },

    onEndReached () {
        console.log("onEndReached");
        CACHE_DATA.pageindex = CACHE_DATA.pageindex + 1;
        this.fetchData();
    },
    

    renderRow (rowData) {
        return (
            <View>
                <TouchableOpacity sytle={styles.item} onPress={() => this.goNavTo({name:'HouseDetail', title:'详情', data:rowData})}>
                    <View>

                        <View style={styles.rowContainer}>
                            <Image style={styles.thumb} source={{ uri: rowData.cover_src }} />
                            <View  style={styles.textContainer}>
                                <Text style={styles.title}>{rowData.title}</Text>
                                <View style={{flexDirection:'row', justifyContent:'flex-start', }}>
                                    <Text style={styles.area}>{rowData.area}</Text>
                                    <Text style={styles.price}>{rowData.price}</Text>
                                    <Text style={styles.price_unit}>{rowData.price_unit}</Text>
                                </View>
                                <Text style={styles.address} numberOfLines={1}>{rowData.address}</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    },

    renderFooter () {
        return (
          this.state.isLoadMoreing ? (<View style={[styles.indicatorWrapper]}>
            <Animation timingLength = {50} duration = {500} bodyColor={'#aaaaaa'}/>
          </View>) : null)
    },

    render: function () {

        var content = (
                <View style={{ flex:1,}}>

                    <ListView 
                        ref="listview"
                        dataSource={this.state.dataSource} 
                        renderRow={this.renderRow} 
                        onEndReached={()=> {this.onEndReached()}} 
                        onRenderFooter={()=> {this.renderFooter()}}
                        onEndReachedThreshold={50}                        
                        refreshControl={
                              <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={()=> this.fetchRefresh()}
                                tintColor='#aaaaaa'
                                title='Loading...'
                                progressBackgroundColor='#aaaaaa'/>
                        }                       
                    />
                </View>
        );
        if(this.state.isLoading){
            content = (
                <View style={{ flex:1,justifyContent:'center', alignItems:'center',}}>
                    <Text >正在加载...</Text>
                </View>);
        }


        return (<View style={styles.container}>

            <View style={styles.navbar}>

                <TouchableOpacity style={styles.navbar_back} onPress={this.goBack}>
                    <View style={styles.navbar_back_icon_} />
                </TouchableOpacity>

                <Text style={styles.navbar_title} numberOfLines={1}>搜寻列表<Text style={{fontSize: 16, color: '#dddddd',}}>({CACHE_DATA.items.length}/{CACHE_DATA.records})</Text></Text>

                <TouchableOpacity style={styles.navbar_action} onPress={() => this.goAbout({name:'About', title:'关于', data:null})}>
                    <Image source={require('../../images/navicon.png')} />
                </TouchableOpacity>

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
        bottom: (NAV_BAR_HEIGHT-(React.Platform.OS === 'ios' ? 18 : 35))/2,
        paddingTop: STATUS_BAR_HEIGHT,
    },

    //
    indicatorWrapper: {
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#252528'
    },

    //container
    container: {
        flex: 1,
    },

    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },

    thumb: {
        width: 100,
        height: 80,
        marginRight: 5
    },

    textContainer: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        color: '#333333'
    },

    area: {
        fontSize: 12,
        color: '#666666',
    },

    price: {
        fontSize: 16,
        color: '#ff0000',

        borderRadius: 4,
        borderWidth: 0,
        borderColor: '#d6d7da',

    },

    price_unit: {
        fontSize: 12,
        color: '#ff0000',
    },

    address:{
        fontSize: 12,
        color: '#666666',
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd',
    },

});

//导出
module.exports = HouseList;