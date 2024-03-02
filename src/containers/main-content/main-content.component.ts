import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwApi } from 'src/app/api/swapi';
import { Planets } from 'src/model/planet.model';
import { Resident } from 'src/model/resident.model';
import { SinglePlanet } from 'src/model/singlePlanet.model';
import { MatTableDataSource } from '@angular/material/table';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(private swapi :SwApi) { }
  haveIt = [];
  listOfPlanets: Planets;
  planets: SinglePlanet[]=[];
  active:any;
  noData:boolean=false;
  

  displayedColumns: string[] = ['name', 'height', 'mass','gender'];
  residentData : any[]=[];
  allData: any[]=[];
  dataSource : any;
  pageObj: any = {
    page: 1,
    size: 10,
    totalElements: null,
    currentPageIndex:0
  };


  
  

  ngOnInit(): void {
   this.fetchPlanets();
  }

 

  fetchPlanets(url?){
    this.listOfPlanets = null;

    this.swapi.fetchPlanets(url).subscribe(data =>{

      if(data){
       this.listOfPlanets = data;
       this.planets = data.results;
       this.pageObj.totalElements = data.count;

      }

      this.planets.forEach(planet =>{
        planet.imgUrl = "../../assets/"+this.generateUniqueRandom(10) +".png";
        //this.getResidentInfo(planet);

    

    });

    
    
  });

  }
  
  generateUniqueRandom(maxNr) {
    
    //Generate random number
    let random = Math.floor((Math.random() * maxNr + 1));
    //Force to number by boxing
    random = Number(random);

    if(!this.haveIt.includes(random)) {
        this.haveIt.push(random);
        return random;
    } else {
        if(this.haveIt.length < maxNr) {
          //Recursively generate number
         return  this.generateUniqueRandom(maxNr);
        } else {
          return Math.floor((Math.random() * maxNr + 1));
        }
    }
}





  pageChanged(event: PageEvent): void {

  
 
    this.pageObj.currentPageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.pageObj.page = this.pageObj.currentPageIndex + 1;
    this.pageObj.size = pageSize;
    this.fetchPlanets("https://swapi.dev/api/planets/?page="+this.pageObj.page+"&format=json");
   
    
  }

  setReset(index,item){

    if(this.active == index){
      this.active = null;
     
    }else{
      this.active = index;
      this.getResidentInfo(item);
    }
 
  }

  getResidentInfo(item){
    let allData = [];
    this.dataSource = null;
    let urls = item.residents;

    urls.forEach(url =>{

      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        allData.push(data);
      
        if(allData.length > 0){

          this.dataSource = new MatTableDataSource(allData);
          this.noData = false;
    
        }else{
          this.noData = true;
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
      });

    });
   
  
  
  }

 

}
