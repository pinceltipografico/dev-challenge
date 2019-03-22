import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput
} from 'react-native';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 275
  },
  avatar: {
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#ffffff',
    width: 100,
    height: 100,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  userName: {
    color: '#ffffff',
    fontSize: 20
  },
  userEmail: {
    fontSize: 10,
    color: '#ffffff',
    marginBottom: 10
  },
  input: {
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffffff',
    width: '90%',
    marginBottom: 5,
    marginTop: 5
  }
});

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String!, $email: String) {
    updateUser(
      user: {
        id: $id,
        name: $name,
        email: $email
      }
    )
  }
`;

export default class UserInfo extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      showForm: false
    }
    this.onSave = this.onSave.bind(this);
  }

  onSave () {
    this.setState({showForm: false});
  }

  render () {
    const { user } = this.props;
    const { showForm, name, email } = this.state;
    

    return (
      <View style={[styles.avatarContainer,{backgroundColor: user.color }]}>

        <View style={styles.avatar}>
          <Image style={styles.image} source={{ uri: user.image }} />
        </View>

        {!showForm ? (
          <React.Fragment>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Button
              color="transparent"
              onPress={() => this.setState({showForm: !showForm})} 
              title="edit" />
          </React.Fragment>
        ) : (
          /**
           * NEED UPDATE THE CACHE
           */
          <Mutation mutation={UPDATE_USER}
            variables={{id: user.id, name: name, email: email}}>
            {(updateUser, { data }) => (
              <React.Fragment>
                <TextInput
                  style={styles.input}
                  defaultValue={user.name}
                  onChange={(value) => this.setState({name: value}) } />
                <TextInput
                  style={styles.input}
                  defaultValue={user.email}
                  onChange={(value) => this.setState({email: value}) } />
                <Button
                  color="transparent"
                  onPress={() => {
                    updateUser();
                    this.setState( { showForm: false } );
                  }}
                  title="Save" />
              </React.Fragment>
            )}
          </Mutation>
        )}

      </View>
    )
  }
}