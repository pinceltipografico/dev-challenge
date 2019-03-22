import React, {memo} from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const styles = StyleSheet.create({
  snippet: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  imageWrapper: {
    marginRight: 20,
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover'
  },
  button: {
    marginLeft: 'auto'
  }
});

export default memo( ( { company, navigation } ) => (
  <View style={styles.snippet}>
    <View style={styles.imageWrapper}>
      <Image source={{uri: company.image}} style={styles.image}/>
    </View>
    <Text style={{flex: 3}}>{company.name}</Text>
    <Button
      style={styles.button}
      title="Details"
      color={company.color}
      onPress={() =>
        navigation.navigate('CompanyScene', { id: company.id })
      }/>
  </View>
));