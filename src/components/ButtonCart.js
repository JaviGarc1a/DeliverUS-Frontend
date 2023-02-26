import { Button, Modal } from '@mui/material'
import React, { useState, useContext } from 'react'
import { BsCart, BsCartDash, BsCartPlus } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Text } from 'react-native'
import { StyleSheet, View } from 'react-native-web'
import { create } from '../api/OrderEndPoints'
import { CartContextProvider } from '../context/CartContext'

export default function ButtonCart (props) {
  const [amount, setAmount] = useState(0)
  const [open, setOpen] = useState(false)
  const cart = useContext(CartContextProvider)

  const handleClose = () => {
    setOpen(false)
  }

  const decrement = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  const increment = () => {
    setAmount(amount + 1)
  }

  return (
    console.log(props),
      <View style={styles.container}>
        <View style={styles.cart}>
          <BsCartDash onClick={decrement} />
          <BsCart onClick={() => { setOpen(true) }}/>
          <Modal open={open}
          onClose={handleClose}
          style={{ backgroundColor: 'white', width: '75%', height: '75%', margin: 'auto' }}
          >
            <View>
              <View>
                <RxCross1 onClick={() => { setOpen(false) }} style={{ alignSelf: 'flex-end' }} />
              </View>
              <View>
                <Text>Subtotal: €</Text>
                <Text>Delivery: €</Text>
                <Text style={{ color: 'red' }}>Total: €</Text>
              </View>
              <View style={styles.button}>
                <Button variant='contained' onClick={create}>Confirm</Button>
                <Button variant='contained'>Cancel</Button>
              </View>
            </View>
          </Modal>
          <BsCartPlus onClick={increment}/>
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
  },
  modal: {
    backgroundColor: 'lightblue',
    width: '75%',
    height: '75%',
    alignSelf: 'center'
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
    columnGap: 10,
    fontSize: '16px'
  }
})
