import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  
  item1: {_id:any,title:"",year:0}
  item2: {_id:any,name:"",bYear:0}

  constructor(private dbService: DatabaseService, private router: Router) { }
  
  
  onGetActors() {
    console.log("From on GetActors");
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
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

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

}
