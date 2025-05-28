import { TestBed } from '@angular/core/testing';
import { EventsService } from './events.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Category } from '../interfaces/Category.interface';
import { Subcategory } from '../interfaces/Subcategory.interface';
import { MyEventRes } from '../interfaces/MyEventRes.interface';
import { City } from '../interfaces/City.interface';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService],
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const mockCategories: Category[] = [{ id: 1, name: 'Music' }];
    service.getCategories().subscribe(res => {
      expect(res).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${apiUrl}categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch subcategories by ID', () => {
    const mockSubcategories: Subcategory[] = [{ id: 1, name: 'Rock', category_id: 1 }];
    service.getSubcategories(1).subscribe(res => {
      expect(res).toEqual(mockSubcategories);
    });

    const req = httpMock.expectOne(`${apiUrl}subcategories/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubcategories);
  });

  it('should fetch all subcategories', () => {
    const mockSubcategories: Subcategory[] = [{ id: 1, name: 'Techno', category_id: 2 }];
    service.getAllSubcategories().subscribe(res => {
      expect(res).toEqual(mockSubcategories);
    });

    const req = httpMock.expectOne(`${apiUrl}subcategories/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubcategories);
  });

  it('should fetch events by city', () => {
    const mockEvents: MyEventRes = { events: [] };
    service.getEventsByCity('Madrid').subscribe(res => {
      expect(res).toEqual(mockEvents);
    });

    const req = httpMock.expectOne(`${apiUrl}events/city/Madrid`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should join an event', () => {
    const mockResponse = { message: 'Joined successfully' };
    service.joinEvent(5).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}eventsUsers/join/5`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(mockResponse);
  });

  it('should get joined events', () => {
    const mockResponse = { events: [] };
    service.getJoinedEvents().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}eventsUsers/joined`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get cities with events', () => {
    const mockResponse: { cities: City[] } = { cities: [{ name: 'Madrid', count: 5 }] };
    service.getCities().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}events/cities`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter events with parameters', () => {
    const mockResponse: MyEventRes = { events: [] };
    const filters = { city: 'Madrid', category_id: 1, subcategory_id: 2 };
    service.filterEvents(filters).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${apiUrl}events/filter` &&
      request.params.get('city') === 'Madrid' &&
      request.params.get('category_id') === '1' &&
      request.params.get('subcategory_id') === '2'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get events created by user', () => {
    const mockResponse: MyEventRes = { events: [] };
    service.getEventsByUser({}).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}events/userEvents`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete event by id', () => {
    const mockResponse = { message: 'Evento borrado correctamente' };
    service.deleteEvent(3).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}events/delete/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
