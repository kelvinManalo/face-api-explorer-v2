import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import { Grid, Table, Loader, Header, Button } from "semantic-ui-react";
import { createPersonGroupPerson, deletePersonGroupPerson, fetchPersonGroupPerson, updatePersonGroupPerson, createPersonFace, deletePersonFace } from "../../actions";
import AddPersonModal from "./AddPersonModal";
import DeletePersonModal from "./DeletePersonModal";
import EditPersonModal from "./EditPersonModal";
import FaceListModal from "../PersonGroupPersonFace/FaceListModal";

const PersonList = () => {
    let {personGroupId} = useParams();
    const error = useSelector((state) => state.error);
    const persons = useSelector((state) => state.personGroupPersons);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchPersonGroupPerson(personGroupId));
        console.log(error);
    }, [error,personGroupId,dispatch]);

    const addPersonHandler = (data) => {
        dispatch(createPersonGroupPerson(personGroupId,data));
    }

    const editPersonHandler = (personId, data) => {
        dispatch(updatePersonGroupPerson(personGroupId,personId,data));
    }

    const deletePersonHandler = (personId) => {
        dispatch(deletePersonGroupPerson(personGroupId,personId));
    }

    const addFaceHandler = (personId,data) => {
        dispatch(createPersonFace(personGroupId,personId,data))
    }

    const deleteFaceHandler = (personId, persistedFaceId) => {
        dispatch(deletePersonFace(personGroupId,personId,persistedFaceId))
    }

    const renderRows = () => {
        return persons.map(({ personId, name, userData, persistedFaceIds}) => {
            return (
                <Table.Row key={personId}>
                    <Table.Cell>{personId}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{userData}</Table.Cell>
                    <Table.Cell collapsing><FaceListModal person={{personId,name,userData,persistedFaceIds}} length={persistedFaceIds.length} addFaceHandler={addFaceHandler} deleteFaceHandler={deleteFaceHandler}/></Table.Cell>
                    <Table.Cell collapsing>
                        <EditPersonModal editPersonHandler={editPersonHandler} person={{personId,name,userData}} />
                        <DeletePersonModal deletePersonHandler={deletePersonHandler} person={{personId,name,userData}} />
                    </Table.Cell>
                </Table.Row>
            );
        })
    }

    const renderTable = () => {
        return (
            <Grid.Row>
                <Grid.Column>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Person Id</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>UserData</Table.HeaderCell>
                                <Table.HeaderCell>Faces</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{renderRows()}</Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                <Button floated='right' color='red' size='small'><Link style={{ textDecoration: 'none' }} to='/personGroup'>Cancel</Link></Button>
                                    <AddPersonModal addPersonHandler={addPersonHandler} />                                    
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        );
    };

    return (
        <Grid container style={{ padding: '5em 0em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h1' dividing>
                       Person Group Id {personGroupId}
                    </Header>
                </Grid.Column>
            </Grid.Row>
            {renderTable()}
        </Grid>
    );
}

export default PersonList;