export class QuizzCard{
    reponse_vue = false;
    etat_repone = 'Reponse';
    explication!:string;
    couleur!:string;
    imageUrl!:string;

    constructor(public id:number,
                public domaine:string,
                public categorie:string,
                public question:string,
                public reponse:string,
                explication:string,
                public publication: string,
                public date:Date = new Date,
                public userID: string
            ){

        this.setCouleur(categorie)
        this.setImage(domaine)
        this.setExplication(explication)
    }

    setCouleur(difficile:string){
        switch (difficile) {
            case "facile":
                this.couleur = 'green'
            break;
            case "moyenne":
                this.couleur = 'yellow'
            break;
            case "difficile":
                this.couleur = 'blue'
            break;
            case "expert":
                this.couleur = 'red'
            break;
            case "génie":
                this.couleur = 'purple'
            break;
        }
    }

    setImage(domaine:string){
        switch (domaine) {
            case "science et technologie":
                this.imageUrl = "assets/sci_tech.jpg"
            break;
            case "geographie":
                this.imageUrl = "assets/geo.jpg"
            break;
            case "medecine":
                this.imageUrl = "assets/med.jpeg"
            break;
            case "botanique":
                this.imageUrl = "assets/bota.jpeg"
            break;
            case "histoire":
                this.imageUrl = "assets/histo.jpg"
            break;
            case "animale":
                this.imageUrl = "assets/zoo.jpeg"
            break;
        }
    }

    setExplication(explication:string){
        this.explication = explication !=="" ? explication : "aucune explication!"
    }

    getID(){
        return this.id;
    }

    onVoirReponse(): void{
        if (this.reponse_vue === false){
            this.etat_repone = 'Masquer'
            this.reponse_vue = true;
        }
        else{
            this.etat_repone = 'Reponse'
            this.reponse_vue = false;
        }
    }
    
}

    