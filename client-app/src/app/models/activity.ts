/* get an activity from swagger (or postman), and then use json to ts conversion tool to generate this model */
export interface Activity {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
}