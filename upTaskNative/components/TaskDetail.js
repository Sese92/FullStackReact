import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import { gql, useMutation } from '@apollo/client'

const UPDATE_TASK = gql`
    mutation updateTask($id: ID!, $input: TaskInput, $completed: Boolean) {
        updateTask(id: $id, input: $input, completed: $completed) {
            name
            id
            project
            completed
        }
    }
`;

const REMOVE_TASK = gql`
    mutation removeTask($id: ID!) {
        removeTask(id: $id)
    }
`

const GET_TASKS = gql`
    query getTasks($input: ProjectIDInput) {
        getTasks(input: $input) {
            id
            name
            completed
        }
    }
`

const TaskDetail = ({ task, projectId }) => {
    const { id } = task;

    const [updateTask] = useMutation(UPDATE_TASK)
    const [removeTask] = useMutation(REMOVE_TASK, {
        update(cache) {
            const { getTasks } = cache.readQuery({
                query: GET_TASKS,
                variables: {
                    input: {
                        project: projectId
                    }
                }
            })

            cache.writeQuery({
                query: GET_TASKS,
                variables: {
                    input: {
                        project: projectId
                    }
                },
                data: {
                    getTasks: getTasks.filter(currentTask => currentTask.id !== task.id)
                }
            })
        }
    })

    const changeStatus = async () => {
        try {
            const { data } = await updateTask({
                variables: {
                    id,
                    input: {
                        name: task.name
                    },
                    completed: !task.completed
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const showRemove = () => {
        Alert.alert(
            'Remove task',
            'Are you sure do you want to remove this task?',
            [
                {
                    text: 'No',
                    type: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => removeTaskDB()
                }
            ]
        )
    }

    const removeTaskDB = async() => {
        try {
            const { data } = await removeTask({
                variables: {
                    id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ListItem
            onPress={() => changeStatus()}
            onLongPress={() => showRemove()}
        >
            <Left>
                <Text>{task.name}</Text>
            </Left>
            <Right>
                {task.completed ? (
                    <Icon
                        style={[styles.icon, styles.completed]}
                        name="ios-checkmark-circle"
                    />
                ) :
                    <Icon
                        style={[styles.icon, styles.incompleted]}
                        name="ios-checkmark-circle"
                    />}
            </Right>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 32
    },
    completed: {
        color: 'green'
    },
    incompleted: {
        color: '#e1e1e1'
    }
})

export default TaskDetail;