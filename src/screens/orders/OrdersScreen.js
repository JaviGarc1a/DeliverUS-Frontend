import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { getOrder } from '../../api/OrderEndPoints'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandSecondary, flashTextStyle, flashStyle } from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import ImageCard from '../../components/ImageCard'
import { AuthorizationContext } from '../../context/AuthorizationContext'

export default function OrdersScreen ({ navigation }) {
  const [orders, setOrders] = useState([])
  const { loggedInUser } = useContext(AuthorizationContext)

  useEffect(() => {
    async function fetchOrder () {
      try {
        const fetchedOrder = await getOrder()
        setOrders(fetchedOrder)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving orders. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    if (loggedInUser) {
      fetchOrder()
    } else {
      setOrders(null)
    }
  }, [loggedInUser])

  const renderHeader = () => {
    return (
      <View style={styles.container}>
              <TextSemiBold>FR5: Listing my confirmed orders</TextSemiBold>
              <TextRegular>A Customer will be able to check his/her confirmed orders, sorted from the most recent to the oldest.</TextRegular>
              <TextRegular textStyle={styles.text}>Go to Order Detail Screen</TextRegular>
          </View>
    )
  }

  const renderOrder = ({ item }) => {
    const date = Date(item.createdAt).toString().replace('GMT+0200 (hora de verano de Europa central)', '')
    return (
      <ImageCard
      imageUri={item.restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + item.restaurant.logo } : undefined}
      title={item.restaurant.name}
      onPress={() => {
        navigation.navigate('OrderDetailScreen', { id: item.id })
      }}
    >
      <br/>
      <TextSemiBold>Quantity: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.products.length}</TextSemiBold></TextSemiBold>
      <TextSemiBold>Price: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.price}€</TextSemiBold></TextSemiBold>
      <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      <TextSemiBold>Date: <TextSemiBold textStyle={{ color: brandPrimary }}>{date}</TextSemiBold></TextSemiBold>

    </ImageCard>
    )
  }

  const renderEmptyOrdersList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        This user has no orders yet.
      </TextRegular>
    )
  }

  return (
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyOrdersList}
        data={orders}
        renderItem={renderOrder}
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
  button: {
    borderRadius: 8,
    height: 40,
    margin: 12,
    padding: 10,
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  }
})
