import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App(): JSX.Element {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(()=>{
    /*axios.get<Activity[]>('http://localhost:5000/api/activities')*/
    agent.Activities.list().then(response => {
      //console.log(response);
      setActivities(response);
    })
  },[]);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string) {
    id? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  function handleCreateOrEditActivity(activity: Activity){
    /* check activity.id, if exist remove it from current activities and add the updated one */
    /* if not exist, append the new activity to current activities */
    activity.id 
      ? setActivities([...activities.filter(x=>x.id !== activity.id),activity])
      : setActivities([...activities,{...activity,id:uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
}

  return (
    <Fragment>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities = {activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>        
    </Fragment>
  );
}

export default App;
