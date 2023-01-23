export interface Cover {
    source: string,
    width?: number,
    height?: number,
}

export interface CoverInformation extends Cover {
    id: number,
    category_id: number,
    olid: string,
    filename: string,
    author: string, // Nullable
    ip: string,
    source_url: string,
    source: string, // Nullable
    isbn: string, // Nullable
    created: string,
    last_modified: string,
    archived: boolean,
    deleted: boolean,
    width: number, // Nullable
    height: number, // Nullable
    filename_s: string,
    filename_m: string,
    filename_l: string,
    isbn13: string, // Nullable
}
