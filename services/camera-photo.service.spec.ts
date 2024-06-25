import { TestBed } from '@angular/core/testing';

import { CameraPhotoService } from './camera-photo.service';

describe('CameraPhotoService', () => {
  let service: CameraPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
