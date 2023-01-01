import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {   
                    selectedActivity /* only display ActivityDetails if there is a SelectedActivity */ 
                        &&
                    !editMode /* only display ActivityDetails if not in editMode */
                        &&
                    <ActivityDetails/>
                }
                {editMode && /* only display ActivityForm if in editMode */
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})