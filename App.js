import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import Data from './Data';
var {height, width} = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.initData = Data;
    this.state = {
      data: this.initData,
      isModalVisible: false,
      inputText: '',
      editedItem: 0,
    };
  }

  //MODAL
  setModalVisible = bool => {
    this.setState({isModalVisible: bool});
  };

  //Set TextInput
  setInputText = text => {
    this.setState({inputText: text});
  };

   //Edit Items
  setEditedItem = id => {
    this.setState({editedItem: id});
  };

  handleEditItem = editedItem => {
    const newData = this.state.data.map(item => {
      if (item.id === editedItem) {
        item.text = this.state.inputText;
        return item;
      }
      return item;
    });
    this.setState({data: newData});
  };

  //DELETE ITEM
  deleteItemById = id => {
    let tempData = this.state.data;
    tempData.splice(id, 1);
    this.setState({data: tempData});
  };

  //FLAT LIST RENDER METHOD
  renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        backgedoundColor: 'yellow',
        
      }}>
      <TouchableHighlight
        style={{
          width: width - 70,
          padding:7
        }}
        >
        <View style={styles.item}>
          <View style={styles.marginLeft}>
            <View style={[styles.menu, {backgroundColor: item.color}]} />
            <View style={[styles.menu, {backgroundColor: item.color}]} />
            <View style={[styles.menu, {backgroundColor: item.color}]} />
          </View>
          <View style={styles.viewItem}>
          <Text style={styles.text}> {"Product Name: " +item.text} </Text>
          <Text style={styles.rates}> {"rate: "+item.rate} </Text>
          <Text style={styles.quality}> {"quality: "+item.quality} </Text>
          </View>
         
        </View>
      </TouchableHighlight>
      <View
        style={{
          
          flexDirection: 'column',
          marginBottom:0,
          
        }}>
        <TouchableOpacity
          style={{marginTop: 0,backgroundColor:'red',padding:5,marginBottom:2}}
          onPress={() => {
            Alert.alert(
              'Delete?',
              'Are you sure want to delete?',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    this.deleteItemById(index)
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}
          >
          <Text style={{textAlign: 'center', fontSize: 15,}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop:3, backgroundColor:'gray',padding:5}}
          onPress={() => {
            Alert.alert(
              'Update?',
              'Are you sure want to update product name?',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('  OK CLICK ');
                    this.setModalVisible(true);
                    this.setInputText(item.text), this.setEditedItem(item.id);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={{textAlign: 'center', fontSize: 15}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Products List </Text>
        </View>
        <FlatList 
        contentContainerStyle={{
    flexGrow: 1,
    }}
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
         
        />
        <Modal
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Update product:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                this.setState({inputText: text});
                console.log('state ', this.state.inputText);
              }}
              defaultValue={this.state.inputText}
              editable={true}
              multiline={false}
              maxLength={200}
            />
            <TouchableHighlight
              onPress={() => {
                this.handleEditItem(this.state.editedItem);
                this.setModalVisible(false);
              }}
              style={[styles.touchableHighlight, {backgroundColor: 'gray'}]}
              >
              <Text style={styles.text}>Save</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  contentContainer: {
    marginTop: 25,
    backgroundColor: 'white',
    flex:1
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: '#111',
    margin: 2,
    borderRadius: 3,
  },
  text: {
    marginVertical:5,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  textInput: {
    width: '90%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableHighlight: {
    backgroundColor: 'white',
    // marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
    height: 70,
  },
  viewItem:
  {flexDirection:'column',justifyContent:'space-between'},
  rates:{marginTop:5,marginLeft: 10,},
  quality:
    {marginTop:5,marginLeft: 10,color:'gray'}
  
});
