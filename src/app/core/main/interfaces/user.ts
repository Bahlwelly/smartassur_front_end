export interface User {
    id : number;
    first_name : string;
    last_name : string;
    telephone : string;
    email : string;
    role : 'admin' | 'client' | 'manager';
    profile : string;
    company : number;
}
