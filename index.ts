import * as coverAPI from "./src/cover";
import * as libraryAPI from "./src/library";

// APIs
export { cover, makeURL as coverURL } from "./src/cover";
export { library, search, books, works, edition, makeURL as libraryURL } from "./src/library";

// Types
export { Size, Key, BookKey, BibKeyPair, Endpoint, KeyValue, NameValue, TypeAndValue, Subject, Identifiers, CoverOptions, LibraryOptions } from "./src/types";

// Models
export { Books, StableBook, RawBook } from "./src/models/book";
export { Cover, CoverInformation } from "./src/models/cover";
export { Edition } from "./src/models/edition";
export { Search, StableDoc, Doc } from "./src/models/search";
export { Works }  from "./src/models/works";

const openlib = {
    cover: coverAPI.cover,
    library: libraryAPI.library
};

export default openlib;
