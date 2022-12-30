import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoandingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App(): JSX.Element {

  const {activityStore} = useStore();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [submitting, setSubmitting ] = useState(false);

  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore]);

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })    
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    /* check activity.id, if exist remove it from current activities and add the updated one */
    /* if not exist, append the new activity to current activities */
    if (activity.id) {
      agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(x=>x.id !== activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(()=> {
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    }
  }

  if (activityStore.loadingInitial) return <LoandingComponent content='Loading app'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities = {activityStore.activities}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>        
    </Fragment>
  );
}

export default observer(App);
