export class contact{
    firstname?: string;
    lastname?: string;
    phonenumber?: number;
    city?:string;
    id?: number;
}

export class signup{
    name?:string;
    email?:string;
    password?:string;
}

export class login{
    email?:string;
    password?:string;
}

export class contactUs{
    email?:string;
    name?:string;
    message?:string;
    id?:number;
}

export class adminSignup{
    name?:string;
    email?:string;
    password?:string;
}

export class adminLogin{
    email?:string;
    password?:string;
}