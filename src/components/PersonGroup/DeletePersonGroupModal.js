import React from 'react'
import { Button, Modal, Icon, Form, Dropdown } from 'semantic-ui-react'

function DeletePersonGroupModal({deletePersonGroupHandler, personGroup}) {
  const [open, setOpen] = React.useState(false);

  const deleteButtonClickEvent = (personGroupId) => {    
    deletePersonGroupHandler(personGroupId);
    setOpen(false);
  }

  const recognitionModelData = [
    {
      key: 'recognition_01',
      text: 'recognition_01',
      value: 'recognition_01',
    },
    {
        key: 'recognition_02',
        text: 'recognition_02',
        value: 'recognition_0',
    },
    {
        key: 'recognition_03',
        text: 'recognition_03',
        value: 'recognition_03',
    },
  ]
  
 
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
                <label>Group Id</label>
                <input placeholder='Group Id' readOnly value={personGroup.personGroupId} />
            </Form.Field>
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' readOnly value={personGroup.name} />
            </Form.Field>
            <Form.Field>
                <label>User Data</label>
                <input placeholder='User Data' readOnly value={personGroup.userData}/>
            </Form.Field>
            <Form.Field>
                <label>Recognition Model</label>
                <Dropdown
                    placeholder='Recognition Model'
                    fluid
                    selection
                    options={recognitionModelData}
                    value={personGroup.recognitionModel}
                    disabled
                />
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
          onClick={() => deleteButtonClickEvent(personGroup.personGroupId)}
          positive
          color='red'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeletePersonGroupModal