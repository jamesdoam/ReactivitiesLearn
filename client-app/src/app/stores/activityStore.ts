import { makeAutoObservable} from "mobx";

export default class activityStore {
    title = 'Hello from Mobx!';
    constructor(){
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title = this.title + '!!!';
    }
}