import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, of} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let setItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;
  let removeItemSpy: jest.SpyInstance;
  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;
    service = new AuthService(httpClientMock);
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('login()', async () => {
    const credentials = {email: 'test@email.com', password: '123456'};
    const mockResponse = {token: 'abc123'};

    httpClientMock.post.mockReturnValue(of(mockResponse));
    const result = await lastValueFrom(service.login(credentials));

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/login',
      credentials
    );
  });

  it('logout()', async () => {
    const mockResponse = {message: 'logout successful'};

    httpClientMock.post.mockReturnValue(of(mockResponse));
    const result = await lastValueFrom(service.logout());

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/logout', {}
    );
  })

  it('setToken()', () => {
    const token = 'abc123';

    service.setToken(token);

    expect(setItemSpy).toHaveBeenCalledWith('token', token);
  })

  it('getToken()', () => {
    const token = 'abc123';
    localStorage.setItem('token', token);

    const result = service.getToken();

    expect(getItemSpy).toHaveBeenCalledWith('token');
    expect(result).toEqual(token);
  })

  it('deleteToken()', () => {
    localStorage.setItem('token', 'abc123');

    service.deleteToken();

    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('debería guardar la información del usuario en localStorage', () => {
    const user = { city: 'New York', id: 1 };

    service.setUserInfo(user);

    expect(setItemSpy).toHaveBeenCalledWith('city', user.city);
    expect(setItemSpy).toHaveBeenCalledWith('userId', user.id);

    expect(localStorage.getItem('city')).toBe(user.city);
    expect(localStorage.getItem('userId')).toBe(user.id.toString());
  });

  it('debería eliminar la información del usuario de localStorage', () => {
    localStorage.setItem('city', 'New York');
    localStorage.setItem('userId', '1');

    service.deleteUserInfo();

    expect(removeItemSpy).toHaveBeenCalledWith('city');
    expect(removeItemSpy).toHaveBeenCalledWith('userId');

    expect(localStorage.getItem('city')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });

  it('debería devolver true si hay un token en localStorage', () => {
    localStorage.setItem('token', 'mockToken');

    expect(service.isAuthenticated()).toBe(true);
  });

  it('debería devolver false si no hay un token en localStorage', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('getUserInfo()', async () => {
    const mockResponse = { data: {user : [] }}

    httpClientMock.get.mockReturnValue(of(mockResponse));
    const result = await lastValueFrom(service.getUserInfo());

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:8000/api/user');
  })
})
