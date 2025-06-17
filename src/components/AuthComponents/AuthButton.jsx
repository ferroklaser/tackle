import { StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const AuthButton = ({onPress, style, ...props}) => {
  return (
    <TouchableOpacity style={ [styles.button, style] } onPress={onPress} activeOpacity={.5} {...props}/>
  )
}

export default AuthButton

const styles = StyleSheet.create({
    button: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        padding: 15,
        backgroundColor: 'white',
        width: '40%',
        borderRadius: 10,
        alignItems: 'center',
    }
})