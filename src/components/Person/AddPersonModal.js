
import React, {useState} from 'react';
import { Button, Modal, Icon, Form} from 'semantic-ui-react';

const AddPersonModal = ( {addPersonHandler} ) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [userData, setUserData] = useState('');

    const addButtonClickEvent = () => {
        const data = {name,userData};
        setName('');
        setUserData('');
        addPersonHandler(data);
        setOpen(false);
    };

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='mini'
            trigger={<Button floated='right' icon labelPosition='left' primary size='small'><Icon name='user'/> Add Person</Button>}
        >
            <Modal.Content>
                <Form>
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
                    onClick={() => addButtonClickEvent()}
                    positive />                
            </Modal.Actions>
        </Modal>
    );
}

export default AddPersonModal;