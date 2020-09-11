import React, { useState } from 'react';
import { View } from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import { gql, useMutation } from '@apollo/client'

const AUTHENTICATE_USER = gql`
    mutation authenticateUser($input: AuthenticateUser) {
        authenticateUser(input: $input) {
            token
        }
    }
`

const Login = () => {
    const [email, saveEmail] = useState('')
    const [password, savePassword] = useState('')
    const [message, saveMessage] = useState(null)

    const navigation = useNavigation()

    const [authenticateUser] = useMutation(AUTHENTICATE_USER); // Pasamos el mutation

    const handleSubmit = async () => {
        if (email === '' || password === '') {
            saveMessage('All the fields are mandatory')
            return;
        }

        try {
            const { data } = await authenticateUser({
                variables: {
                    input: {
                        email: email.toLowerCase(),
                        password
                    }
                }
            })

            const {token} = data.authenticateUser

            await AsyncStorage.setItem('token', token)

            navigation.navigate('Projects')

        } catch (error) {
            saveMessage(error.message.replace('GraphQL error: ', ''))
        }
    }

    const showAlert = () => {
        Toast.show({
            text: message,
            duration: 4000,
            textStyle: {
                textAlign: 'center'
            }
        })
    }

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]}>
            <View style={globalStyles.content}>
                <H1 style={globalStyles.title}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Email"
                            onChangeText={text => saveEmail(text)}
                        />

                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={text => savePassword(text)}
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStyles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.textButton}>Log in</Text>
                </Button>

                <Text
                    onPress={() => navigation.navigate('CreateAccount')}
                    style={globalStyles.link}
                >Create new account</Text>

                {message && showAlert()}

            </View>
        </Container>
    );
}

export default Login;