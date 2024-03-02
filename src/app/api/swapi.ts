import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Planets } from "src/model/planet.model";
import { Resident } from "src/model/resident.model";

@Injectable({ providedIn: 'root' })
export class SwApi {
    constructor(private http: HttpClient) {}

    private readonly endpoint = "https://swapi.dev/api";

    fetchPlanets(url?){
        if(url){
            return this.http.get<Planets>(url);
        }else{
            return this.http.get<Planets>(this.endpoint+"/planets/?format=json");

        }
    
    }

    fetchResident(url){
        return this.http.get<Resident>(url);
    }



}