import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { environment } from '../../../../environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {
    it('should call POST on correct URL with form data', () => {
      const mockFormData = new FormData();
      mockFormData.append('username', 'testuser');
      mockFormData.append('password', '123456');

      service.registerUser(mockFormData).subscribe(response => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne(`${environment.apiUrl}register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(mockFormData);

      req.flush({ success: true });
    });
  });

  describe('getProvinces', () => {
    it('should GET the provinces from assets JSON', () => {
      const mockProvinces = [
        { name: 'Province1' },
        { name: 'Province2' },
      ];

      service.getProvinces().subscribe(provinces => {
        expect(provinces.length).toBe(2);
        expect(provinces).toEqual(mockProvinces);
      });

      const req = httpMock.expectOne('/assets/data/provinces.json');
      expect(req.request.method).toBe('GET');

      req.flush(mockProvinces);
    });
  });
});
