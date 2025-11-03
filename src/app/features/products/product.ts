export interface Product {
    id : number;
    name_original : string;
    name_en : string;
    name_fr : string;
    name_ar : string;
    description_original : string;
    description_en : string;
    description_ar : string;
    description_fr : string;
    price : number;
    company : number;
    created_at : Date;
    updated_at : Date;
    category : number[];
    details : JSON;
}
