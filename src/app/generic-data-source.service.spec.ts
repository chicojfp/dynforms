import { TestBed, inject } from '@angular/core/testing';

import { GenericDataSourceService } from './generic-data-source.service';

describe('GenericDataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericDataSourceService]
    });
  });

  it('should be created', inject([GenericDataSourceService], (service: GenericDataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
