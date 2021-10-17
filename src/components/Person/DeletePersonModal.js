import React from 'react'
import { Button, Modal, Icon, Form } from 'semantic-ui-react'

function DeletePersonModal({deletePersonHandler, person}) {
  const [open, setOpen] = React.useState(false);

  const deleteButtonClickEvent = (personId) => {  
      alert(personId);  
    deletePersonHandler(personId);
    setOpen(false);
  }

 
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='mini'
      trigger={<Button icon color='red'><Icon name='times' /></Button>}
    >
      <Modal.Header>Update Person Group</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>Person Id</label>
                <input placeholder='Group Id' readOnly value={person.personId} />
            </Form.Field>
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' readOnly value={person.name} />
            </Form.Field>
            <Form.Field>
                <label>User Data</label>
                <input placeholder='User Data' readOnly value={person.userData}/>
            </Form.Field>           
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Delete"
          labelPosition='right'
          icon='checkmark'
          onClick={() => deleteButtonClickEvent(person.personId)}
          positive
          color='red'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeletePersonModal