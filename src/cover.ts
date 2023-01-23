import axios from "axios";
import { CoverOptions } from "./types";
import { Cover, CoverInformation } from "./models/cover";

const baseurl = 'https://covers.openlibrary.org/b/';
const formatImage = '.jpg';
const formatJSON = '.json';

export async function cover( url: string ): Promise<CoverInformation>;
export async function cover( cover: CoverOptions ): Promise<Cover | CoverInformation>;
export async function cover( cover: string | CoverOptions ): Promise<Cover | CoverInformation> {
    if ( typeof cover === 'string' ) return _url(cover);
    return _options(cover);
}

export const makeURL = ( { key = 'id', size = 'M', info = false, value }: CoverOptions ): string => {
    return ( info ) ? `${baseurl}${key}/${value}${formatJSON}` : `${baseurl}${key}/${value}-${size}${formatImage}`;
};

export const _options = async ( data: CoverOptions ): Promise<Cover | CoverInformation> => {
    const url: string = makeURL(data);
    
    if ( url.endsWith(formatImage) ) return Promise.resolve({ source: url } as Cover);
    
    return _url(url);
};

export const _url = async ( url: string ): Promise<CoverInformation> => {
    if ( url.endsWith(formatJSON) ) { 
        try {
            let data: object = ( await axios.get(url) ).data;
            return Promise.resolve( data as CoverInformation );
        } catch ( error ) {
            return Promise.reject( error );
        }
    }
    
    return Promise.reject(new Error(`Malformed URL "${url}" does not end with ".json".\nCorrect URL, or use as is if valid .jpg format`));
};
