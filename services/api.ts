import axios from "axios";

interface Response<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export type URLString = string;
export type DateString = string;

export interface Planet {
  name: string;
  rotation_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  residents: URLString[];
  films: URLString[];
  url: URLString;
  created: DateString;
  edited: DateString;
}

export class Swapi {
  static readonly baseUrl = "https://swapi.dev/api";

  static composeUrl = (resourceUrl: string) =>
    `${Swapi.baseUrl}/${resourceUrl}`;

  static getPlanet = async (id: number) => {
    const url = Swapi.composeUrl(`planets/${id}`);
    const response = await axios.get<Response<Planet>>(url);
    const { data } = response;

    return data;
  };

  static getPlanets = async () => {
    const url = Swapi.composeUrl("planets");
    const response = await axios.get<Response<Planet[]>>(url);
    const { data } = response;

    return data;
  };

  /** This methods fetches information about all planets. It uses while loop, which is
   * VERY unoptimal, but this data can be fetched once to generate pages. Loop is used, because
   * API doesn't give us more elegant way to fetch all data, as it returns paginated results, and
   * link to next page */
  static getAllPlanets = async () => {
    const url = Swapi.composeUrl("planets");

    let planets: Planet[] = [];
    let response = await axios.get<Response<Planet[]>>(url);

    while (response.data.next) {
      planets.push(...response.data.results);
      response = await axios.get<Response<Planet[]>>(response.data.next);
    }

    // pushing the last batch of data into planets
    planets.push(...response.data.results);

    return { planets };
  };
}
