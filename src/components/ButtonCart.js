import React, { useState } from 'react'
import { Text } from 'react-native'
import { StyleSheet, View } from 'react-native-web'
import { BsCart, BsCartDash, BsCartPlus } from 'react-icons/bs'

export default function ButtonCart () {
  const [amount, setAmount] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.cart}>
        <BsCartDash onClick={() => { if (amount > 0) setAmount(amount - 1) }} />
        <BsCart onClick={() => { setAmount(0) }}/>
        <BsCartPlus onClick={() => { setAmount(amount + 1) }}/>
      </View>
      <View>
        <Text style={styles.counter}>{amount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cart: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    columnGap: 5
  },
  counter: {
    alignSelf: 'flex-end',
    paddingHorizontal: 23
  }
})
