import { TestBed } from '@angular/core/testing';

import { EdificisService } from './edificis.service';

describe('EdificisService', () => {
  let service: EdificisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdificisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
