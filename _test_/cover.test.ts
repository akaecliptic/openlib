import * as api from "../src/cover";
import { Cover, CoverInformation } from "../index";
import { mock_url, mock_makeURL } from "./mocks/cover.mock";
import { HTTPErrorMock } from "./mocks/common.mock";

const formatJSON = '.json';

const malformed = 'https://covers.openlibrary.org/b/id/123malformed.json';
const missing = 'https://covers.openlibrary.org/b/id/00000000.json';
const image = 'https://covers.openlibrary.org/b/id/12547191-M.jpg';
const valid = 'https://covers.openlibrary.org/b/id/12547191.json';
const id = '12547191';

describe('TEST: Get cover data by url', () => {
    jest.spyOn(api, '_url').mockImplementation( (url) => mock_url(url) );
    
    test('Invalid endpoint: book cannot be found', () => {
        expect.assertions(2);
        return api.cover(missing).catch( data => {
            const error: HTTPErrorMock = data as HTTPErrorMock;
            expect(error.response.status).toBe(404);
            expect(error.message).toMatch(/not found/i);
        });
    });

    test('Invalid endpoint: malformed book id', () => {
        expect.assertions(2);
        return api.cover(malformed).catch( data => {
            const error: HTTPErrorMock = data as HTTPErrorMock;
            expect(error.response.status).toBe(500);
            expect(error.message).toMatch(/internal server error/i);
        });
    });

    test('Valid endpoint: get cover information', () => {
        expect.assertions(3);
        return api.cover(id + formatJSON).then( data => {
            expect( typeof data ).toBe('object');

            const coverInfo: CoverInformation = data as CoverInformation;
            expect(coverInfo.id).toBe(12547191);
            expect(coverInfo.olid).toBe('OL35615701M');
        });
    });
});

describe('TEST: Get cover data by options', () => {
    test('Passing "value"', () => {
        expect.assertions(2);
        return api.cover({ value: id }).then( data => {
            expect( typeof data ).toBe('object');

            const cover: Cover = data as Cover;
            expect(cover.source).toBe(image);
        });
    });
    
    test('Passing "value" and "info" set to true', () => {
        jest.spyOn(api, 'makeURL').mockImplementation( (options) => mock_makeURL(options) );
        jest.spyOn(api, '_url').mockImplementation( (url) => mock_url(url) );

        expect.assertions(3);
        return api.cover({ value: id, info: true }).then( data => {
            expect( typeof data ).toBe('object');

            const coverInfo: CoverInformation = data as CoverInformation;
            expect(coverInfo.id).toBe(12547191);
            expect(coverInfo.olid).toBe('OL35615701M');
        });
    });

    afterEach( () => jest.clearAllMocks() );
});

describe('TEST: URL maker', () => {
    beforeAll( () => jest.restoreAllMocks() );

    test('Making basic url', () => {
        const url: string = api.makeURL({ value: id });
        expect(url).toMatch(/https\:\/\/covers\.openlibrary\.org\/b\/[a-z]+\/\w+\-[a-z]\.jpg/i);
        expect(url).toBe(image);
    });
    
    test('Making info url', () => {
        const url: string = api.makeURL({ value: id, info: true });
        expect(url).toMatch(/https\:\/\/covers\.openlibrary\.org\/b\/[a-z]+\/\w+\.json/i);
        expect(url).toBe(valid);
    });
});
