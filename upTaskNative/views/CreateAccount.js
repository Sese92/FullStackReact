import React, { useState } from 'react';
import { View } from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

import { gql, useMutation } from '@apollo/client'

const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input)
    }
`

const CreateAccount = () => {
    const [name, saveName] = useState('')
    const [email, saveEmail] = useState('')
    const [password, savePassword] = useState('')
    const [message, saveMessage] = useState(null)

    const navigation = useNavigation()

    const [ createUser ] = useMutation(CREATE_USER); // Pasamos el mutation

    const handleSubmit = async() => {
        if (name === '' || email === '' || password === '') {
            saveMessage('All the fields are mandatory')
            return;
        }
        if(password.length < 6) {
            saveMessage('The password must be of 6 characters at least')
            return;
        }

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        name,
                        email: email.toLowerCase(),
                        password
                    }
                }
            })

            saveMessage(data.createUser)
            navigation.navigate('Login')

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
                            placeholder="Name"
                            onChangeText={text => saveName(text)}
                        />

                    </Item>

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
                    <Text style={globalStyles.textButton}>Create account</Text>
                </Button>

                {message && showAlert()}
            </View>
        </Container>
    );
}

export default CreateAccount;