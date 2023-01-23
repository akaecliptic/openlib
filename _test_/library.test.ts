import * as api from "../src/library";
import { Works, Doc, RawBook } from "../index";
import { mock_query, mock_makeURL } from "./mocks/library.mock";

const lotrURL = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings';
const lotr = 'The Lord of the Rings';
const isbnURL = 'https://openlibrary.org/api/books?bibkeys=isbn:0380440652&jscmd=data&format=json';
const isbn = '0380440652';
const workURL = 'https://openlibrary.org/works/OL45846W.json';
const works = 'OL45846W';

describe('TEST: Query functionality', () => {
    jest.spyOn(api, '_query').mockImplementation( (url) => mock_query(url) );
    jest.spyOn(api, 'makeURL').mockImplementation( (options) => mock_makeURL(options) );

    test('Using general purpose query', () => {
        expect.assertions(3);
        api.library({ endpoint: 'works', parameter: works }).then( data => {
            expect( typeof data ).toBe('object');

            const work: Works = data as Works;
            expect(work.title).toBe('Matilda');
            expect(work.key).toBe('/works/OL45846W');
        });
    });

    test('Using search function', () => {
        expect.assertions(3);
        const url: string = mock_makeURL({ endpoint: 'search', parameter: lotr });
        api.search(url).then( data => {
            expect(data.docs.length).toBeGreaterThan(0);
            const doc: Doc = data.docs[0];
            expect(doc.key).toBe('/works/OL27448W');
            expect(doc.title).toBe('The Lord of the Rings');
        });
    });

    test('Using book function', () => {
        expect.assertions(3);
        const url: string = mock_makeURL({ endpoint: 'books', bibkeys: [[ 'isbn', isbn ]] });
        api.books(url).then( data => {
            expect( typeof data['ISBN:0380440652'] ).toBe('object');
            const doc: RawBook = data['ISBN:0380440652'];
            expect(doc.key).toBe('/books/OL7431780M');
            expect(doc.title).toBe('Foundation');
        });
    });
});

describe('TEST: URL maker', () => {
    beforeAll( () => jest.restoreAllMocks() );

    test('Making search url', () => {
        const url: string = api.makeURL({ endpoint: 'search', parameter: lotr });
        expect(url).toMatch(/https\:\/\/openlibrary\.org\/search\.json\?title\=([a-z]+\+)*[a-z]+/i);
        expect(url).toBe(lotrURL);
    });

    test('Making books api url', () => {
        const url: string = api.makeURL({ endpoint: 'books', bibkeys: [[ 'isbn', isbn ]] });
        expect(url).toMatch(/https\:\/\/openlibrary\.org\/api\/books\?bibkeys\=((\w+\:\w+\,)*(\w+\:\w+))\&jscmd\=data\&format\=json/i);
        expect(url).toBe(isbnURL);
    });

    test('Making generic url', () => {
        const url: string = api.makeURL({ endpoint: 'works', parameter: works });
        expect(url).toMatch(/https\:\/\/openlibrary\.org\/works\/\w+\.json/i);
        expect(url).toBe(workURL);
    });

    test('Making url with only endpoints passed', () => {
        const url: string = api.makeURL({ endpoint: 'works' });
        const booksURL: string = api.makeURL({ endpoint: 'books' });
        const searchURL: string = api.makeURL({ endpoint: 'search' });

        expect(url).toMatch(/https\:\/\/openlibrary\.org\/works\/\.json/i);
        expect(booksURL).toMatch(/https\:\/\/openlibrary\.org\/api\/books\?bibkeys\=\&jscmd\=data\&format\=json/i);
        expect(searchURL).toMatch(/https\:\/\/openlibrary\.org\/search\.json\?title\=/i);
    });
});
