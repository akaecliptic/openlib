export interface Search {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Doc[];
    num_found: number;
    q: string;
    offset: number
}

export interface StableDoc {
    key: string;
    type: string;
    author: string[];
    
    title: string;
    edition_count: number;
    publish_year: number[];
    number_of_pages_median: number;

    cover_i?: number;
    isbn: string[];

    _version_: number;
}

export interface Doc extends Partial<DocDefinition> {}

interface DocDefinition {
    key: string;
    type: string;
    seed: string[];
    title: string;
    title_suggest: string;
    edition_count: number;
    edition_key: string[];
    publish_date: string[];
    publish_year: number[];
    first_publish_year: number;
    number_of_pages_median: number;
    lccn: string[];
    publish_place: string[];
    oclc: string[];
    contributor: string[];
    lcc: string[];
    ddc: string[];
    isbn: string[];
    last_modified_i: number;
    ebook_count_i: number;
    ebook_access: string;
    has_fulltext: boolean;
    public_scan_b: boolean;
    ia: string[];
    ia_collection: string[];
    ia_collection_s: string;
    lending_edition_s: string;
    lending_identifier_s: string;
    printdisabled_s: string;
    cover_edition_key: string;
    cover_i: number;
    publisher: string[];
    language: string[];
    author_key: string[];
    author_name: string[];
    author_alternative_name: string[];
    person: string[];
    place: string[];
    subject: string[];
    time: string[];
    ia_loaded_id: string[];
    ia_box_id: string[];
    publisher_facet: string[];
    person_key: string[];
    place_key: string[];
    time_facet: string[];
    person_facet: string[];
    subject_facet: string[];
    _version_: number;
    place_facet: string[];
    lcc_sort: string;
    author_facet: string[];
    subject_key: string[];
    ddc_sort: string;
    time_key: string[]

    // Dynamic Field
    [ key: `id_${string}` ]: string[];

    // Fields pulled from schema but not found in queries
    // See - https://github.com/internetarchive/openlibrary/blob/master/openlibrary/plugins/worksearch/code.py#L135-L154
    text: string[]
    subtitle: string;
    title_sort: string;
    redirects: string[];
    by_statement: string[];
    alternative_title: string[];
    alternative_subtitle: string[];
    first_edition: string;
    first_publisher: string;
    first_sentence: string[]; 
}

// For dynamic Ids - https://github.com/microsoft/TypeScript/pull/44512
