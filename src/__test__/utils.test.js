/** test function imports **/
import {parseJwt} from '../utils';


test('should parse jwt token correctly', () => {

    /** parseJwt function params **/
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const expectedOutput = {
        "iat": 1516239022,
        "name": "John Doe",
        "sub": "1234567890",
    };

    const parsedToken = parseJwt(mockToken);

    /** assertion of function **/
    expect(parsedToken).toStrictEqual(expectedOutput);

});
