import React, { useState } from 'react'
import { Button, Table, Grid, Header, Loader, Modal, Icon } from 'semantic-ui-react'

function FaceListModal({person, length, addFaceHandler, deleteFaceHandler}) {
  const [open, setOpen] = React.useState(false);
  const [uploadedFile,setUploadedFile] = useState(null);

  const onFileSelect = e => {         
    getImageFile(e.target.files[0]);        
  };

  const getImageFile = (file) => {
    const formData = new FormData();
    formData.append("faceImage", file);
    setUploadedFile(formData);
    };

   const addFaceButtonHandler = () => {
       if(!uploadedFile){
           alert('No uploaded file.');
       }       
        addFaceHandler(person.personId, uploadedFile);
        setUploadedFile(null);
   }

   const deleteButtonHandler = (persistedFaceId) => {
    deleteFaceHandler(person.personId, persistedFaceId);
}
  
  const renderRows = () => {
      return person.persistedFaceIds.map((persistedFaceId) => {
          return (
            <Table.Row key={persistedFaceId}>
            <Table.Cell>{persistedFaceId}</Table.Cell>
            <Table.Cell collapsing><Button icon floated='right' color='red' onClick={() => deleteButtonHandler(persistedFaceId)}><Icon name='times' /></Button></Table.Cell>
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
                        <Table.HeaderCell>Face Id</Table.HeaderCell>                        
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderRows()}</Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                        <input type="file" id="file" name="filename" onChange={onFileSelect} />
                        <Button floated='right' color='red' size='small' onClick={() => setOpen(false)} >Cancel</Button>
                        <Button floated='right' primary size='small' onClick={addFaceButtonHandler} >Add Face</Button>
                        </Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Grid.Column>
    </Grid.Row>
      );
  }
  
 
return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={<Button icon primary size='large'>{length}</Button>}>
        <Modal.Header>Face List</Modal.Header>
        <Modal.Content>
        <Grid container style={{ padding: '2em 0em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h4' dividing>
                    Face Data of {person.name}
                    </Header>
                </Grid.Column>
            </Grid.Row>
            {renderTable()}
        </Grid>
        </Modal.Content>
    </Modal>
    
);
}

export default FaceListModal