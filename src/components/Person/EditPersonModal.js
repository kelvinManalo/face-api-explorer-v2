import React, { useState } from 'react'
import { Button, Modal, Icon, Form } from 'semantic-ui-react'

function EditPersonModal({editPersonHandler, person}) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] = useState(person.name);
  const [userData,setUserData] = useState(person.userData);

  const editButtonClickEvent = (personId) => {
    const data = {name,userData};
    editPersonHandler(personId,data);
    setOpen(false);
  }

 
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='mini'
      trigger={<Button icon color='green'><Icon name='pen square' /></Button>}
    >
      <Modal.Header>Update Person Group</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>Person Id</label>
                <input placeholder='Person Id' readOnly value={person.personId}/>
            </Form.Field>
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' value={name} onInput={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>User Data</label>
                <input placeholder='User Data' value={userData} onInput={(e) => setUserData(e.target.value)}/>
            </Form.Field>            
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => editButtonClickEvent(person.personId)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditPersonModal