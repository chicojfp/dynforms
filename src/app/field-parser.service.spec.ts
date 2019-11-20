import { TestBed, inject } from '@angular/core/testing';

import { FieldParserService } from './field-parser.service';

describe('FieldParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldParserService]
    });
  });

  it('should be created', inject([FieldParserService], (service: FieldParserService) => {
    expect(service).toBeTruthy();
  }));
});
