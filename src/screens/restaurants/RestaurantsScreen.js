/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, StatusBar, Animated, Text } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { getTopProduct } from '../../api/ProductEndpoints'
import { getAll } from '../../api/RestaurantEndpoints'
import ImageCard from '../../components/ImageCard'
import ImageCardTop, { size } from '../../components/ImageCardTop'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandSecondary, flashStyle, flashTextStyle, brandBackground } from '../../styles/GlobalStyles'

export default function RestaurantsScreen ({ navigation, route }) {
  // TODO: Create a state for storing the restaurants
  const [restaurants, setRestaurants] = useState([])
  const [topProduct, setTopProducts] = useState([])

  useEffect(() => {
    // TODO: Fetch all restaurants and set them to state.
    //      Notice that it is not required to be logged in.

    async function fetchRestaurants () {
      try {
        const fetchedRestaurant = await getAll()
        setRestaurants(fetchedRestaurant)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving restaurants. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }

    async function fetchTopProducts () {
      try {
        const fetchedTopProduct = await getTopProduct()
        setTopProducts(fetchedTopProduct)
      } catch (error) {
        showMessage({
          message: `There was an error while retrieving products. ${error} `,
          type: 'error',
          style: flashStyle,
          titleStyle: flashTextStyle
        })
      }
    }
    fetchTopProducts()
    fetchRestaurants() // TODO: set restaurants to state
  }, [route])

  const renderHeader = () => {
    return (
      <View style={styles.container}>
    <TextSemiBold>FR1: Restaurants listing.</TextSemiBold>
     <TextRegular>List restaurants and enable customers to navigate to restaurant details so they can create and place a new order</TextRegular>
     <TextSemiBold>FR7: Show top 3 products.</TextSemiBold>
     <TextRegular>Customers will be able to query top 3 products from all restaurants. Top products are the most popular ones, in other words the best sellers.</TextRegular>
   </View>
    )
  }

  const renderTopProducts = () => {
    return (
      <View style={{ flex: 1, backgroundColor: brandBackground, padding: 10 }}>
        <View style={styles.containerTop}>
          <Text style={styles.topTitle}><b>Mejores productos de nuestros restaurantes</b></Text>
        </View>
          <StatusBar hidden />
          <Animated.FlatList
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
          data={topProduct}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          keyExtractor={item => item.id}
          pagingEnabled
          renderItem={({ item }) => {
            return <>
              <ImageCardTop
                imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : undefined}
                title={item.name}
                price={item.price}
                restaurant={item.restaurant.name}
                onPress={() => {
                  navigation.navigate('RestaurantDetailScreen', { id: item.restaurantId })
                }}
             >
             </ImageCardTop>
            </>
          }}
          >
          </Animated.FlatList>
      </View>
    )
  }

  const renderRestaurant = ({ item }) => {
    return (
      <ImageCard
      imageUri={item.logo ? { uri: process.env.API_BASE_URL + '/' + item.logo } : undefined}
      title={item.name}
      onPress={() => {
        navigation.navigate('RestaurantDetailScreen', { id: item.id })
      }}
    >
      <TextRegular numberOfLines={2}>{item.description}</TextRegular>
      {item.averageServiceMinutes !== null &&
        <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
      }
      <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
    </ImageCard>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={renderTopProducts}
      ListEmptyComponent={renderHeader}
      data = {restaurants}
      renderItem = {renderRestaurant}
      keyExtractor = {item => item.id}
    />
  )
}

const styles = StyleSheet.create({
  containerTop: {
    padding: '1%',
    alignItems: 'center',
    backgroundColor: '#a7d1cf',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200
  },
  topTitle: {
    fontSize: size * 1.7
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center',
    marginLeft: 5
  }
})
