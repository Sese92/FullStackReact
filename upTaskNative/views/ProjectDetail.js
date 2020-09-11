import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container, Button, Content, List, Form, Item, Input, Toast, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import TaskDetail from '../components/TaskDetail';
import { gql, useMutation, useQuery } from '@apollo/client'

const CREATE_TASK = gql`
    mutation createTask($input: TaskInput) {
        createTask(input: $input) {
            name
            id
            project
            completed
        }
    }
`;

const GET_TASKS = gql`
    query getTasks($input: ProjectIDInput) {
        getTasks(input: $input) {
            id
            name
            completed
        }
    }
`

const ProjectDetail = ({ route }) => {
    const { id } = route.params

    const [name, saveName] = useState('')
    const [message, saveMessage] = useState(null)

    const { data, loading, error } = useQuery(GET_TASKS, {
        variables: {
            input: {
                project: id
            }
        }
    })

    const [createTask] = useMutation(CREATE_TASK, {
        update(cache, { data: { createTask } }) {
            const { getTasks } = cache.readQuery({
                query: GET_TASKS,
                variables: {
                    input: {
                        project: id
                    }
                }
            })

            cache.writeQuery({
                query: GET_TASKS,
                variables: {
                    input: {
                        project: id
                    }
                },
                data: {
                    getTasks: [...getTasks, createTask]
                }
            })
        }
    })

    const handleSubmit = async () => {
        if (name === '') {
            saveMessage('The name of the task is mandatory')
            return
        }
        try {

            const data = await createTask({
                variables: {
                    input: {
                        name,
                        project: id
                    }
                }
            })
            saveName('')
            saveMessage('Task succesfully created!')
        } catch (error) {
            console.log(error)
        }
    }

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

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]}>
            <Form style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
                <Item inlineLabel last style={globalStyles.input}>
                    <Input
                        placeholder="Name of the task"
                        onChangeText={text => saveName(text)}
                        value={name}
                    />
                </Item>
                <Button style={globalStyles.button}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text>Create task</Text>
                </Button>
            </Form>

            {loading ? (
                <>
                    <Spinner color="white" />
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: -10 }}>Loading...</Text>
                </>
            ) : (
                    <>
                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 40 }}>Press to mark as completed</Text>
                        <Text style={{ textAlign: 'center', color: 'white', marginBottom: 40 }}>Long press to delete it</Text>
                        <Content>
                            <List style={styles.content}>
                                {data.getTasks.map(task => (
                                    <TaskDetail
                                        key={task.id}
                                        task={task}
                                        projectId={id}
                                    />
                                ))}

                            </List>
                        </Content>
                    </>
                )}

            {message && showAlert()}

        </Container>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        marginHorizontal: '2.5%'
    }
})

export default ProjectDetail;