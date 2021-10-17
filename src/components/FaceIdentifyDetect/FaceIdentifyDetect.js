import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Grid, Header, Accordion, Icon, Form, Button, Segment, Dropdown } from 'semantic-ui-react'
import Webcam from "react-webcam";
import { detectPerson, fetchPersonGroups, identifyPerson } from '../../actions';

const FaceIdentifyDetect = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [uploadedFile,setUploadedFile] = useState(null);
    const [imageUrl,setimageUrl] = useState('');
    const webcam = useRef(null);
    const [personGroupIdSelected, setpersonGroupIdSelected] = useState('');
    const [detectResultJSON, setdetectResultJSON] = useState('');
    const [identifyResultJSON, setidentifyResultJSON] = useState('');
    const detectResult = useSelector((state) => state.faceDetect);
    const identifyResult = useSelector((state) => state.faceIdentify);
    const personGroups = useSelector((state) => state.personGroups);    
            


    const generateOptions = () => {
        const optionsArray = personGroups.map(({personGroupId, name}) => {
            return {key:personGroupId, text:name, value:personGroupId }
        });
        return optionsArray;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        
        if(identifyResult.length > 0)
            setidentifyResultJSON(JSON.stringify(identifyResult, null, 4));
    }, [identifyResult]);

    useEffect(() => {
        if(detectResult.length > 0){
            setdetectResultJSON(JSON.stringify(detectResult, null, 4));            
        } else {
            setdetectResultJSON("No face detected.");
        }
        
    }, [detectResult]);

    useEffect(() => {
        dispatch(fetchPersonGroups());
      }, [dispatch]);
    
    const getImageFile = (file) => {
        const formData = new FormData();
        formData.append("faceImage", file);
        setUploadedFile(formData);
    }

    
    const capture = useCallback(
        async () => {
            const imageSrc = webcam.current.getScreenshot();
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const formData = new FormData();

            formData.append('faceImage', blob)

            console.log(formData.get("faceImage"))
            dispatch(detectPerson(formData));
        },
        [dispatch,webcam]
    )

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
      }   

    const onFileSelect = e => {         
        getImageFile(e.target.files[0]);        
      };


    const detectClickHandler = () => {
        if (activeIndex === 1){
            dispatch(detectPerson(uploadedFile));
        } else if (activeIndex ===2){
            capture();
        }       
    };

    const identifyClickHandler = () => {        
        var data = {
            personGroupId : personGroupIdSelected,
            faceIds : [detectResult[0].faceId],
            maxNumOfCandidatesReturned : 1,
            confidenceThreshold : 0.5
        };

        dispatch(identifyPerson(data))
    };

    const renderAccordion = () => {
        return (<Accordion styled fluid>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Image Url
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Form>
              <Form.Field>
                <input placeholder='Image Url' value={imageUrl} onInput={(e) => setimageUrl(e.target.value)} />
                </Form.Field>
              </Form>
            </Accordion.Content>
    
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Upload File
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
            <Form>
              <Form.Field>
                <input type="file" id="file" name="filename" onChange={onFileSelect} />
              </Form.Field>
              </Form>
            </Accordion.Content>
    
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={handleClick}
            >
              <Icon name='dropdown' />
              Web Cam
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
            <Segment>
                <Webcam
                    audio={false}
                    ref={webcam}
                    screenshotFormat="image/jpeg" />
            </Segment>            
            </Accordion.Content>
          </Accordion>)
    }

    
    return (
        <Grid container style={{ padding: '5em 0em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h1' dividing>
                       Detect / Identify
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h3' dividing>
                       Get Image
                    </Header>
                    {renderAccordion()}
                    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                   <Button primary onClick={detectClickHandler}>Detect</Button>
                   <Button primary onClick={() => setdetectResultJSON('')}>Clear</Button>                   
                   <Segment inverted>
                       <pre>{detectResultJSON}</pre>
                    </Segment>                    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h3' dividing>
                       Identify
                    </Header>                    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <label>Person Group</label>
                        <Dropdown fluid selection placeholder='Person Group' value={personGroupIdSelected} options={generateOptions()} onChange={(e, {value}) => setpersonGroupIdSelected(value)} ></Dropdown>                                            
                    </Form>                    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button primary onClick={identifyClickHandler}>Identify</Button>
                    <Segment inverted>
                       <pre>{identifyResultJSON}</pre>
                    </Segment>                    
                </Grid.Column>
            </Grid.Row>
            
            
        </Grid> 
        
    );
}

export default FaceIdentifyDetect;