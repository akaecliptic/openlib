import { join } from "path";

// Data is taken from open library endopints
export const dataDirectory: string = join(__dirname, '/..', '/data/'); 

// Mocking the expected response field from Axios
export interface HTTPErrorMock extends NodeJS.ErrnoException {
    response: { status: number; };
}
