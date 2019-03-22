import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

let styles = StyleSheet.create({
  userList: {
    flexDirection: 'row',
    padding: 20
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  }, 
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: 24
  },
  textEmail: {
    fontSize: 18
  }
});

export default memo(({ user, size }) => {
  const isSmall = size === 'small';
  const newWidthImage = isSmall ? {width: 40, height: 40} : {};
  const newNameSize = isSmall ? {fontSize: 18} : {};
  const newEmailSize = isSmall ? {fontSize: 12} : {};
  return (
    <View style={styles.userList}>
      <View style={[styles.imageWrapper, { borderColor: user.color }, newWidthImage ]}>
        <Image style={[styles.image, newWidthImage]} source={{ uri: user.image }} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.textName,newNameSize]}>{user.name}</Text>
        <Text style={[styles.textEmail,newEmailSize]}>{user.email}</Text>
      </View>
    </View>
  )
});
