import {GeolocationProvider} from './geolocation'

describe('MockBackend GeolocationProvider', () => {

  beforeEach(() => {
    this.geolocationProvider = this.injector.get(GeolocationProvider);
  });

})