const authGuardMiddleware = require('../../src/middleware/authGuard.middleware');
const { verifyToken } = require('../../src/utils/jwt');

jest.mock('../../src/utils/jwt');
// verifyToken = jest.fn()

describe('authentication guard middleware', () => {
  it('should return 401 if authorization header is not defined', () => {
    // setup
    const req = {
      header: jest.fn(),
    };
    const res = {
      formatResponse: jest.fn(),
    };
    const next = jest.fn();
    // exctute
    authGuardMiddleware(req, res, next);
    // compare
    expect(res.formatResponse).toHaveBeenCalledWith(
      'Missing authorization header',
      401
    );
  });

  it('should pass the authentication check', () => {
    // setup
    const token = 'token';
    const payload = { user: '123' };
    const req = {
      header: jest.fn(),
    };
    const res = {
      formatResponse: jest.fn(),
    };
    const next = jest.fn();

    req.header.mockReturnValue(`Bearer ${token}`);
    verifyToken.mockImplementation((token) => {
      return payload;
    });

    // exctute
    authGuardMiddleware(req, res, next);
    // compare
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
  });
});
