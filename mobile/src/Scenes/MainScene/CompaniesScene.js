import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { ErrorScene, CompanyList } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const query = gql`
  query Companies {
    companies {
      id
      name
      color
      image
      employees {
        name
        image
        id
        friends {
          name
          id
        }
      }
    }
  }
`;

export default class CompaniesScene extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Query query={query}>
          {({ loading, error, data }) => {

            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <FlatList
                data={data.companies}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.id })
                    }
                  >
                    <CompanyList company={item} />
                  </TouchableOpacity>
                )}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
