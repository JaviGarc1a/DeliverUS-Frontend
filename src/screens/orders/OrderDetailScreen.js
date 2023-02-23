/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { getOrderDetail } from '../../api/OrderEndPoints'
import ImageCard from '../../components/ImageCard'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'

export default function OrderDetailScreen ({ navigation, route }) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    async function fetchOrderDetail () {
      try {
        const fetchedOrder = await getOrderDetail(route.params.id)
        setOrders(fetchedOrder)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving Orders. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchOrderDetail()
  }, [route])

  const renderHeader = () => {
    return (
    <View style={styles.container}>
          <TextSemiBold>FR6: Show order details</TextSemiBold>
          <TextRegular>A customer will be able to look his/her orders up. The system should provide all details of an order, including the ordered products and their prices.</TextRegular>
    </View>
    )
  }

  const renderProduct = ({ item }) => {
    return (
        <ImageCard
          imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : undefined}
          title={item.name}
        >
          <TextRegular numberOfLines={2}>{item.description}</TextRegular>
          <TextSemiBold textStyle={styles.price}>Unity price: <Text>{item.price.toFixed(2)}€</Text></TextSemiBold>
          <TextSemiBold>Quantity: <Text>{item.OrderProducts.quantity}</Text></TextSemiBold>
          <TextSemiBold textStyle={styles.price}>Total price: <Text>{(item.price * item.OrderProducts.quantity).toFixed(2)}€</Text></TextSemiBold>
        </ImageCard>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={orders.products}
      renderItem={renderProduct}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  description: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center',
    marginLeft: 5
  }
})
