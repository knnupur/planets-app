import { SinglePlanet } from "./singlePlanet.model";

export interface Planets {
   count: string;
   next:string;
   previous:string;
   results: SinglePlanet[];

  }