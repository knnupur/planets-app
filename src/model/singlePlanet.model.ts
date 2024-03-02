import { Resident } from "./resident.model";

export interface SinglePlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: Resident[];
    residentUrl:any[];
    imgUrl:string;
 
   }