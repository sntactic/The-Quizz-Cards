export class User{

    constructor(public id:string,
                public name:string,
                public email:string
            ){
    }

    getInfo(){
        console.log(this.id , this.name , this.email)
    }
}