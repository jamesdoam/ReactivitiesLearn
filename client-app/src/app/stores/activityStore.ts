import { makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class activityStore {
    activities: Activity[] = []; // initialize a list of activities of type Activity
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

        constructor(){
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true; 
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.loadingInitial = false;
        } catch (error){
            console.log(error);
            this.loadingInitial=false;
        }
    }

    /* setTitle = () => {
        this.title = this.title + '!!!';
    } */
}