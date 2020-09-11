import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Form, Item, Input, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

import { gql, useMutation } from '@apollo/client'

const CREATE_PROJECT = gql`
    mutation createProject($input: ProjectInput) {
        createProject(input: $input) {
            name
            id
        }
    }
`

const GET_PROJECTS = gql`
    query getProjects {
        getProjects {
            id
            name
        }
    }
`

const NewProject = () => {
    const [name, saveName] = useState('')
    const [message, saveMessage] = useState(null)

    const [createProject] = useMutation(CREATE_PROJECT, {
        update(cache, { data: { createProject } }) {
            const { getProjects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {getProjects: getProjects.concat([createProject])}
            })
        }
    });

    const navigation = useNavigation()

    const showAlert = () => {
        Toast.show({
            text: message,
            duration: 4000,
            textStyle: {
                textAlign: 'center'
            },
            onClose: () => saveMessage(null)
        })
    }

    const handleSubmit = async () => {
        if (name === '') {
            saveMessage("The name of the project is mandatory")
            return
        }
        try {
            const { data } = await createProject({
                variables: {
                    input: {
                        name
                    }
                }
            })
            saveMessage('The project have been created!')
            navigation.navigate('Projects')
        } catch (error) {
            console.log(error)
            saveMessage(error.message.replace('GraphQL error: ', ''))
        }
    }

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
            <View style={globalStyles.content}>
                <H1 style={globalStyles.title}>New project</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Name of the project"
                            onChangeText={text => saveName(text)}
                        />
                    </Item>
                </Form>

                <Button
                    style={[globalStyles.button, { marginTop: 30 }]}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.textButton}>Create project</Text>
                </Button>

                {message && showAlert()}

            </View>
        </Container>
    );
}

export default NewProject;