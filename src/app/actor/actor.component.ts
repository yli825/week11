import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB: any[] = [];
  title: string ="";
  year: number=0;

  ayear: number=0;

  movieactorDB: any[] = [];
  item1: {_id:any,title:"",year:0}
  item2: {_id:any,name:"",bYear:0}
  




  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
      
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
      
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies()
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  onSaveMovies() {
    let obj = {title:this.title, year:this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
}
onDeleteMovie(item) {
  this.dbService.deleteMovie(item._id).subscribe(result => {
    this.onGetMovies();
  });
}

onDeleteMoviesayear(ayear) {
  for (let i of this.moviesDB) {
    if(i.year<ayear)
    {this.dbService.deleteMovie(i._id).subscribe(result => {
      this.onGetMovies();
    });
    }
}
}


update1(item){
  this.item1=item;
}
update2(item){
  this.item2=item;
}



onSelectUpdate2(){
  this.dbService.update(this.item1._id,this.item2).subscribe(result=>{
    this.onGetMovies()
  })
}




}