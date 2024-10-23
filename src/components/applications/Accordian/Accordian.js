import React from 'react'
import { StyleSheet, View, Text, Dimensions,Touchablew,TouchableWithoutFeedback } from 'react-native';
import Collapsible from 'react-native-collapsible';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Accordion = props => {


    return (
        <View style={{backgroundColor:"#f5f5f5",borderColor:"lightgrey",borderWidth:1,borderRadius:10,margin:2}}>
            <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.accordionContainer}>
            <Text style={styles.accordionContainerTitle} >{props.title}</Text>
            </View>
            </TouchableWithoutFeedback>
            <Collapsible style={styles.accordionCollapsedContainer} collapsed={props.isCollapsed}>
                {props.accordionRender}
            </Collapsible>
        </View>
    );
}

export default Accordion;

const styles = StyleSheet.create({
    accordionContainer: {
        justifyContent:'center',
       minHeight: Dimensions.get('window').height / 15
    },
    accordionCollapsedContainer: {
    },
    accordionContainerTitle: {
        color: 'black',
        fontSize: 16,
        marginLeft:10,
        fontWeight:"bold"
    },

})