import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, H2, Content, List, ListItem, Right, Left, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';

const GET_PROJECTS = gql`
    query getProjects {
        getProjects {
            id
            name
        }
    }
`

const Projects = () => {
    const navigation = useNavigation()

    const { data, loading, error } = useQuery(GET_PROJECTS);

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
            {loading ? (
                <>
                    <Spinner color="white" />
                    <Text style={{ color: 'white', textAlign: 'center', marginTop: -10 }}>Loading...</Text>
                </>
            ) : (
                    <>
                        <Button
                            style={[globalStyles.button, { marginTop: 30 }]}
                            square
                            block
                            onPress={() => navigation.navigate('NewProject')}
                        >
                            <Text style={globalStyles.textButton}>New project</Text>
                        </Button>

                        <H2 style={globalStyles.subtitle}>Select a project</H2>

                        <Content>
                            <List style={styles.content}>
                                {data.getProjects.map(project => (
                                    <ListItem
                                        key={project.id}
                                        onPress={() => navigation.navigate('ProjectDetail', project)}
                                    >
                                        <Left>
                                            <Text>{project.name}</Text>
                                        </Left>
                                        <Right>

                                        </Right>
                                    </ListItem>
                                ))}

                            </List>
                        </Content>
                    </>
                )}

        </Container>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        marginHorizontal: '2.5%'
    }
})

export default Projects;