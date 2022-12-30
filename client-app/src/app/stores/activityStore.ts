import { makeObservable, observable } from "mobx";

export default class activityStore {
    title = 'Hello from Mobx!';
    constructor(){
        makeObservable(this,{
            title: observable
        })
    }
}