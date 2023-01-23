// Cover API
export type Size = 'S' | 'M' | 'L';
export type Key = 'id' | 'isbn' | 'oclc' | 'lccn' | 'olid';

// Books API
export type BookKey =  'isbn' | 'oclc' | 'lccn' | 'olid';
export type BibKeyPair =  [ key: BookKey, value: string ];
export type Endpoint = 'isbn' | 'works' | 'editions' | 'books' | 'search';

// Commons
export type KeyValue = { key: string };
export type NameValue = { name: string };
export type TypeAndValue = { type: string; value: string; };
export type Subject = { name: string; url: string; };
export type Identifiers = { [ key: string ]: string[]; };

// Options
export type CoverOptions = {
    key?: Key;
    size?: Size;
    info?: boolean;
    value: string;
};

export type LibraryOptions = {
    endpoint: Endpoint;
    parameter?: string;
    bibkeys?: BibKeyPair[];
};
