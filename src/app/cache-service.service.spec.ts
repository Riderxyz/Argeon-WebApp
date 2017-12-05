import { TestBed, inject } from '@angular/core/testing';
import { CacheServiceService } from './Service/cache-service.service';



describe('CacheServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheServiceService]
    });
  });

  it('should be created', inject([CacheServiceService], (service: CacheServiceService) => {
    expect(service).toBeTruthy();
  }));
});
