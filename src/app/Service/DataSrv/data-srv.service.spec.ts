import { TestBed, inject } from '@angular/core/testing';

import { DataSrvService } from './data-srv.service';

describe('DataSrvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DataSrvService ]
    });
  });

  it('should create an instance', inject([DataSrvService], (service: DataSrvService) => {
    expect(service).toBeTruthy();
  }));
});
