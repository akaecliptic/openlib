import fs from "fs";
import { join } from "path";
import { HTTPErrorMock, dataDirectory } from "./common.mock";
import { CoverOptions, CoverInformation } from "../../index";

const formatImage = '.jpg';
const formatJSON = '.json';

export const mock_makeURL = ( { info = false, value }: CoverOptions ): string => {
    return ( info ) ? `${value}${formatJSON}` : `${value}${formatImage}`;
};

export const mock_url = async ( url: string ): Promise<CoverInformation> => {
    if ( url.endsWith(formatJSON) ) { 
        try {
            const rawFile: string = fs.readFileSync(join(dataDirectory, url), { encoding: 'utf-8' });
            const data: CoverInformation = JSON.parse(rawFile) as CoverInformation;
            return Promise.resolve(data);
        } catch ( error ) {
            const malformed: boolean = url.includes('malformed');
            const httpError: HTTPErrorMock = { 
                name: 'Mock Cover Error', 
                message: (malformed) ? 'Internal Server Error' : 'Not Found', 
                response: { 
                    status: (malformed) ? 500 : 404
                } 
            };
            return Promise.reject(httpError);
        }
    }
    
    return Promise.reject(new Error('Malformed URL'));
};
