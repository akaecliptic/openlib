import { Identifiers, KeyValue, TypeAndValue } from "../types"

export interface Edition extends Partial<EditionDefintion> {}

interface EditionDefintion {
    publishers: string[];
    number_of_pages: number;
    isbn_10: string[];
    isbn_13: string[];
    covers: number[];
    key: string;
    authors: KeyValue[];
    ocaid: string;
    contributions: string[];
    languages: KeyValue[];
    classifications: {};
    source_records: string[];
    title: string;
    identifiers: Identifiers;
    local_id: string[];
    publish_date: string;
    works: KeyValue[];
    type: KeyValue;
    first_sentence: TypeAndValue;
    latest_revision: number;
    revision: number;
    created: TypeAndValue;
    last_modified: TypeAndValue;
}
