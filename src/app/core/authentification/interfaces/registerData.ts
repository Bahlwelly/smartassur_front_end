export interface RegisterData {
    first_name : string;
    last_name : string;
    telephone : number;
    email : string;
    password : string;
    password2 : string;
    profile : string | null;
    role : 'MANAGER' | 'CLIENT';
}
