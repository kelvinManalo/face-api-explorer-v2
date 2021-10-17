import React, { useState } from 'react'
import { Button, Modal, Icon, Form, Dropdown } from 'semantic-ui-react'

function EditPersonGroupModal({editPersonGroupHandler, personGroup}) {
  const [open, setOpen] = React.useState(false);
  const [groupId,setGroupid] = useState(personGroup.personGroupId);
  const [name,setName] = useState(personGroup.name);
  const [userData,setUserData] = useState(personGroup.userData);

  const editButtonClickEvent = () => {
    const data = {groupId,name,userData};
    console.log(data);
    editPersonGroupHandler(data);
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
      trigger={<Button icon color='green'><Icon name='pen square' /></Button>}
    >
      <Modal.Header>Update Person Group</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field>
                <label>Group Id</label>
                <input placeholder='Group Id' value={groupId} onInput={(e) => setGroupid(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' value={name} onInput={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>User Data</label>
                <input placeholder='User Data' value={userData} onInput={(e) => setUserData(e.target.value)}/>
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
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => editButtonClickEvent()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditPersonGroupModal