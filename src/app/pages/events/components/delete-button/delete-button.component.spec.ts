import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteButtonComponent } from './delete-button.component';
import { CommunicationEventsService } from '../../services/communication-events.service';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let communicationEventsServiceMock: Partial<CommunicationEventsService>;

  beforeEach(async () => {
    communicationEventsServiceMock = {
      emitEventIdToDelete: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DeleteButtonComponent],
      providers: [
        { provide: CommunicationEventsService, useValue: communicationEventsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set eventId from event input', () => {
      component.event = { id: 123, date: '', start_time: '', owner_id: 0 } as any;
      component.ngOnInit();
      expect(component.eventId).toBe(123);
    });
  });

  describe('sendEventId', () => {
    it('should call emitEventIdToDelete with event.id', () => {
      component.event = { id: 5, date: '', start_time: '', owner_id: 0 } as any;
      component.sendEventId();
      expect(communicationEventsServiceMock.emitEventIdToDelete).toHaveBeenCalledWith(5);
    });
  });

  describe('hideButton', () => {
    beforeEach(() => {
      localStorage.setItem('userId', '10');
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should return true if event datetime is in the past', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60).toISOString().split('T')[0];
      component.event = {
        date: pastDate,
        start_time: '10:00:00',
        owner_id: 10,
      } as any;

      expect(component.hideButton()).toBe(true);
    });

    it('should return false if event is in future and owner_id matches userId', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const futureDate = tomorrow.toISOString().split('T')[0];
      component.event = {
        date: futureDate,
        start_time: '10:00:00',
        owner_id: 10,
      } as any;

      expect(component.hideButton()).toBe(false);
    });

    it('should return true if event is in future but owner_id does not match userId', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60).toISOString().split('T')[0];
      component.event = {
        date: futureDate,
        start_time: '10:00:00',
        owner_id: 5,
      } as any;

      expect(component.hideButton()).toBe(true);
    });
  });
});
