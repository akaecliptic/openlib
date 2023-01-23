import { KeyValue, TypeAndValue } from "../types"

export interface Works extends Partial<WorksDefinition> {}

interface WorksDefinition {
    title: string;
    key: string;
    authors: Author[];
    type: KeyValue;
    description: string;
    covers: number[];
    subject_places: string[];
    subjects: string[];
    subject_people: string[];
    subject_times: string[];
    location: string;
    latest_revision: number;
    revision: number;
    created: TypeAndValue;
    last_modified: TypeAndValue;
}

interface Author {
    author: KeyValue;
    type: KeyValue;
}
