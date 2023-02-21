import React, { useState } from 'react'
import { Text } from 'react-native'
import { StyleSheet, View } from 'react-native-web'

export default function ButtonCart (props) {
  const [amount, setAmount] = useState(0)
  return (
    <View style={styles.container}>
      <button style={{ backgroundColor: 'lightblue', fontSize: 12, border: 3, borderRadius: '30px' }}>
        <Text style={styles.texts} onPress={() => { if (amount > 0) setAmount(amount - 1) }}>-</Text>
      </button>
      <button style={{ backgroundColor: 'lightblue', fontSize: 12, border: 3, borderRadius: '30px' }}>
          <Text onPress={() => { setAmount(0) }}>Add to cart</Text><br/>
          <Text>{amount}</Text>
      </button>
      <button style={{ backgroundColor: 'lightblue', fontSize: 12, border: 3, borderRadius: '30px' }}>
        <Text onPress={() => { setAmount(amount + 1) }}>+</Text>
      </button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 5
  }
})
