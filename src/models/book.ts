import { Identifiers, NameValue, Subject } from "../types";

export interface Books {
    [ key: `${string}:${string}` ]: RawBook;
}

export interface StableBook {
    url: string;
    key: string;

    title: string;
    number_of_pages: number;

    authors: Subject[];
    publishers: NameValue[];
    publish_date: string;

    identifiers: Identifiers;
    cover: Cover;
}

export interface RawBook extends Partial<BookDefinition> {}

interface BookDefinition {
    url: string;
    key: string;
    title: string;
    authors: Subject[];
    number_of_pages: number;
    identifiers: Identifiers;
    publishers: NameValue[];
    publish_places: NameValue[];
    pagination: string;
    weight: string;
    by_statement: string;
    notes: string;
    publish_date: string;
    subjects: Subject[];
    subject_places: Subject[];
    subject_people: Subject[];
    subject_times: Subject[];
    excerpts: Excerpts[];
    table_of_contents: Content[];
    links: Link[];
    ebooks: Ebook[];
    cover: Cover;
}

interface Cover {
    small: string;
    medium: string;
    large: string;
}

interface Content {
    level: number;
    label: string;
    title: string;
    pagenum: string;
}

interface Link {
    title: string;
    url: string;
}

interface Excerpts {
    text: string;
    comment: string;
    first_sentence: boolean;
}

interface Ebook {
    preview_url: string;
    availability: string;
    formats: object; // TODO: Update - Can't find example
    borrow_url: string;
    checkedout: boolean;
}
