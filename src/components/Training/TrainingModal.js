import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Grid, Header, Loader, Modal, Icon } from 'semantic-ui-react'
import { getTrainingStatus, trainPersonGroup } from '../../actions'
function TrainingModal( {personGroupId} ) {
  const [open, setOpen] = useState(false);  

  const trainingStatus = useSelector((state) => state.trainingStatus);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const onModalOpen = () =>{
    dispatch(getTrainingStatus(personGroupId));
    setOpen(true);
  }
  
  const onRefreshClick = () => {
    dispatch(getTrainingStatus(personGroupId));
  };

  const onTrainClick = () => {
     dispatch(trainPersonGroup(personGroupId)); 
  }
  
return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => onModalOpen()}
        open={open}
        size='tiny'
        trigger={<Button icon primary><Icon name='sync' /></Button>}>
        <Modal.Header>Training Status of {personGroupId} </Modal.Header>
        <Modal.Content>
        <Grid divided>
            <Grid.Row columns={2}>
                <Grid.Column>
                    Status
                </Grid.Column>
                <Grid.Column>
                    {error.length === 0 ? trainingStatus.status : error}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    Created Date Time
                </Grid.Column>
                <Grid.Column>
                {error.length === 0 ? trainingStatus.createdDateTime : ''}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    Last Action Date Time
                </Grid.Column>
                <Grid.Column>                    
                    {error.length === 0 ? trainingStatus.lastActionDateTime : ''}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    Message
                </Grid.Column>
                <Grid.Column>                    
                    {error.length === 0 ? trainingStatus.message : ''}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row width={1}>
                <Grid.Column>
                <Button floated='right' icon labelPosition='left' color='green' size='small' onClick={onTrainClick}><Icon name='user' /> Train</Button>
                <Button floated='right' primary size='small' onClick={onRefreshClick}> Refresh</Button>
                </Grid.Column>
            </Grid.Row>            
        </Grid>
        
        </Modal.Content>
    </Modal>
    
);
}

export default TrainingModal