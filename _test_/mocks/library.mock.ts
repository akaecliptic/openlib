import fs from "fs";
import { join } from "path";
import { dataDirectory } from "./common.mock";
import { LibraryOptions, Books, Works, Search, Edition, Endpoint } from "../../index";

const format = '.json';
const endpoints: Map<Endpoint, string> = new Map([
    ['isbn', 'isbn/'],
    ['works', 'works/'],
    ['editions', 'books/'],
    ['books', 'api/books?'],
    ['search', 'search.json?']
]);

export const mock_makeURL = ( { endpoint, parameter = '', bibkeys = [] }: LibraryOptions ): string => {
    if ( endpoint === 'search' ) {
        const processedParameter: string = parameter.replace(/\s+/g, '+').toLowerCase();
        return `search-${processedParameter}${format}`;
    }
    
    if ( endpoint === 'books' ) {
        let processedParameter: string = '';
        bibkeys.forEach( pair => processedParameter += `${pair[0]}_${pair[1]},` )
        processedParameter = ( processedParameter.endsWith(',') ) ? processedParameter.slice(0, -1) : processedParameter;
        return `books-${processedParameter}${format}`;
    }

    return `${endpoints.get(endpoint)?.slice(0, -1)}-${parameter}${format}`;
};

export const mock_query = async <T extends Edition | Works | Search | Books>( url: string ): Promise<T> => {
    try {
        const rawFile: string = fs.readFileSync(join(dataDirectory, url), { encoding: 'utf-8' });
        const data: object = JSON.parse(rawFile);
        return Promise.resolve( data as T );
    } catch ( error ) {
        return Promise.reject( error );
    }
};
