import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonGroups, createPersonGroup, updatePersonGroup, deletePersonGroup } from "../../actions";
import {Link,useRouteMatch} from "react-router-dom";
import { Grid, Header, Table } from 'semantic-ui-react';
import AddPersonGroupModal from "./AddPersonGroupModal";
import EditPersonGroupModal from "./EditPersonGroupModal"
import DeletePersonGroupModal from "./DeletePersonGroupModal"
import TrainingModal from "../Training/TrainingModal";

const PersonGroup = () => {
  let { url } = useRouteMatch();  

  const error = useSelector((state) => state.error);
  const personGroups = useSelector((state) => state.personGroups);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPersonGroups());
    console.log(error)
  }, [error,dispatch]);

  const renderRows = () => {
    return personGroups.map(({ personGroupId, name, recognitionModel, userData }) => {
      return (
              
          <Table.Row key={personGroupId}>              
              <Table.Cell><Link to={`${url}/${personGroupId}`}> {personGroupId}</Link></Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{recognitionModel}</Table.Cell>
              <Table.Cell>{userData}</Table.Cell>
              <Table.Cell collapsing>
                <TrainingModal personGroupId={personGroupId} />
                <EditPersonGroupModal editPersonGroupHandler={editPersonGroupHandler} personGroup={{ personGroupId, name, recognitionModel, userData }} />
                <DeletePersonGroupModal deletePersonGroupHandler={deletePersonGroupHandler} personGroup={{ personGroupId, name, recognitionModel, userData }} />            
              </Table.Cell>
          </Table.Row>
        
      );
    });
  };

  const addPersonGroupHandler = (data) => {
    dispatch(createPersonGroup(data));
  }

  const editPersonGroupHandler = (data) => {
    dispatch(updatePersonGroup(data));
  }

  const deletePersonGroupHandler = (personGroupId) => {
    dispatch(deletePersonGroup(personGroupId));
  }

  const renderTable = () => {
      return (
        <Grid.Row>
                <Grid.Column>
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Group Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Recognition Model</Table.HeaderCell>
                    <Table.HeaderCell>User Data</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderRows()}</Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                        <AddPersonGroupModal addPersonGroupHandler={addPersonGroupHandler} />                        
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
                </Table>
                
                </Grid.Column>
            </Grid.Row>
      );
  }

    return (       
        <Grid container style={{ padding: '5em 0em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h1' dividing>
                       Person Group
                    </Header>
                </Grid.Column>
            </Grid.Row>
            {renderTable()}
        </Grid> 
    );
}

export default PersonGroup;