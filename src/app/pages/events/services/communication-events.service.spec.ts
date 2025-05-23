import { CommunicationEventsService } from './communication-events.service';

describe('CommunicationEventsService', () => {
  let service: CommunicationEventsService;

  beforeEach(() => {
    service = new CommunicationEventsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit event ID on eventId$', (done) => {
    const testId = 42;
    service.eventId$.subscribe(id => {
      expect(id).toBe(testId);
      done();
    });

    service.emitEventId(testId);
  });

  it('should emit event ID to delete on eventIdToDelete$', (done) => {
    const testId = 99;
    service.eventIdToDelete$.subscribe(id => {
      expect(id).toBe(testId);
      done();
    });

    service.emitEventIdToDelete(testId);
  });

  it('should get and set eventsJoinedIds correctly', (done) => {
    const joinedIds = [1, 2, 3];

    service.getEventsJoinedIds().subscribe(ids => {
      // El primer valor que emite BehaviorSubject es [], lo ignoramos
      if (ids.length > 0) {
        expect(ids).toEqual(joinedIds);
        done();
      }
    });

    service.setEventsJoinedIds(joinedIds);
  });
});
