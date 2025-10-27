export interface Product {
    id : number;
    name : string;
    price : number;
    company : number;
    created_at : Date;
    updated_at : Date;
    category : number[];
    details : JSON;
}
