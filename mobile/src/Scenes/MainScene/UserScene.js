import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ErrorScene } from '../../components';
import CompanySnippet from '../../components/CompanySnippet';
import UserList from '../../components/UserList';
import UserInfo from '../../components/UserInfo';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userData: {
    padding: 20
  },
  sectionTitle: {
    fontSize: 15,
    color: '#666666',
    fontWeight: 'bold'
  },
  divider: {
    height: 2,
    backgroundColor:'#efefef',
    marginTop: 10,
    marginBottom: 10
  }
});

export default class UserScene extends PureComponent {

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const query = gql`
    query User {
      user(id:"${id}") {
        id
        color
        name
        email
        image
        address {
          zipCode
          city
          cityPrefix
          citySuffix
          streetName
          streetAddress
          streetSuffix
          streetPrefix
          secondaryAddress
          county
          country
          state
        }
        company {
          id
          color
          image
          name
        }
        friends {
          id
          name
          image
          email
        }
      }
    }
    `;

    return (
      <ScrollView style={styles.container}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            const { user } = data
            const { address, company, friends } = user

            return (
              <View>

                {/* RESPONSIBLE FOR EDITING USER DATA */}
                <UserInfo user={user}/>
                
                {address &&
                  <View style={styles.userData}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <View style={styles.divider}/>
                    <Text>{`${address.streetAddress}, ${address.city}, ${address.state} ${address.zipCode} - ${address.country}`}</Text>
                  </View>
                }

                {company &&
                  <View style={styles.userData}>
                    <Text style={styles.sectionTitle}>Company</Text>
                    <View style={styles.divider}/>
                    <CompanySnippet company={company} navigation={navigation} />
                  </View>
                }

                {friends &&
                  <View style={styles.userData}>
                    <Text style={styles.sectionTitle}>Friends</Text>
                    <View style={styles.divider}/>
                    {friends.map(friend => (
                      <TouchableOpacity
                      key={friend.id}
                      onPress={() =>
                        navigation.navigate('UserScene', { id: friend.id })
                      }
                    >
                        <UserList user={friend}
                          size="small"
                          key={friend.id}/>
                      </TouchableOpacity>
                    ))}
                  </View>
                }

              </View>
            )

          }}
        </Query>
      </ScrollView>
    );
  }
}
