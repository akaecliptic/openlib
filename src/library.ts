import axios from "axios";
import { Books } from "./models/book";
import { Works } from "./models/works";
import { Search } from "./models/search";
import { Edition } from "./models/edition";
import { Endpoint, LibraryOptions } from "./types";

const baseurl = 'https://openlibrary.org/';
const format = '.json';
const endpoints: Map<Endpoint, string> = new Map([
    ['isbn', 'isbn/'],
    ['works', 'works/'],
    ['editions', 'books/'],
    ['books', 'api/books?'],
    ['search', 'search.json?']
]);

export async function library( options: LibraryOptions ): Promise<Search | Books | Edition | Works> {
    const url: string = makeURL(options);

    if ( options.endpoint === 'search' ) 
        return search(url);
    
    if ( options.endpoint === 'books' )
        return books(url);

    return _query(url);
};

export const makeURL = ( { endpoint, parameter = '', bibkeys = [] }: LibraryOptions ): string => {
    if ( endpoint === 'search' ) {
        const processedParameter: string = parameter.replace(/\s+/g, '+').toLowerCase();
        return `${baseurl}${endpoints.get(endpoint)}title=${processedParameter}`;
    }
    
    if ( endpoint === 'books' ) {
        let processedParameter: string = '';
        bibkeys.forEach( pair => processedParameter += `${pair[0]}:${pair[1]},` );
        processedParameter = ( processedParameter.endsWith(',') ) ? processedParameter.slice(0, -1) : processedParameter;
        return `${baseurl}${endpoints.get(endpoint)}bibkeys=${processedParameter}&jscmd=data&format=json`;
    }

    return `${baseurl}${endpoints.get(endpoint)}${parameter}${format}`;
};

export async function search( url: string ): Promise<Search> {
    return _query<Search>(url)
};

export async function books( url: string ): Promise<Books> {
    return _query<Books>(url);
};

export async function works( url: string ): Promise<Works> {
    return _query<Works>(url)
};

export async function edition( url: string ): Promise<Edition> {
    return _query<Edition>(url);
};

export const _query = async <T extends Edition | Works | Search | Books>( url: string ): Promise<T> => {
    try {
        let data: object = ( await axios.get(url) ).data;
        return Promise.resolve( data as T );
    } catch ( error ) {
        return Promise.reject( error );
    }
};
