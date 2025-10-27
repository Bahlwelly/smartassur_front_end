export interface Contract {
    id : number;
    client : number;
    product : number;
    type : string;
    status : 'active' | 'pending' | 'expired' | 'canceled';
    viewed : boolean;
    singed_at : Date;
    start_date : Date;
    end_date : Date;
    upated_at : Date;
}
