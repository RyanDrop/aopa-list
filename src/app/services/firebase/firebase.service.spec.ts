import { TestBed } from '@angular/core/testing';
import { provideAnalytics } from '@angular/fire/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideDatabase } from '@angular/fire/database';
import { provideFirestore } from '@angular/fire/firestore';
import { AOPA_TEST_USER } from '@aopa/mocks';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'environments/environment.prod';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { instance, mock } from 'ts-mockito';
import { FirebaseService } from '.';

fdescribe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    const hotToastMock = mock(HotToastService);
    const hotToastService = instance(hotToastMock);

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: HotToastService, useValue: hotToastService },
      ],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
      ],
    });

    service = TestBed.inject(FirebaseService);
  });

  it('must call the registration user', () => {
    const sample = spyOn(service, 'register');
    service.register(AOPA_TEST_USER);
    expect(sample).toHaveBeenCalled();
  });

  it('must call the login user', () => {
    const sample = spyOn(service, 'login');
    service.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
    expect(sample).toHaveBeenCalled();
  });

  it('must return user information with logged in user', (done) => {
    service.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
    service.getUser();
    service.user$.subscribe((user) => {
      expect(user).toBeTruthy();
      done();
    });
  });

  it('should not return user information with the user logged out', () => {
    service.logout();
    service.getUser();
    const sample = service.user$.observers.length;
    expect(sample).toBeLessThanOrEqual(0);
  });

  it('must return the logged in user', (done) => {
    service.login(AOPA_TEST_USER.email, AOPA_TEST_USER.password);
    service.hasLogin();
    service.user$.subscribe((user) => {
      expect(user).toBeTruthy();
      done();
    });
  });

  it('should not return value when user is disconnected', () => {
    service.logout();
    service.hasLogin();
    const sample = service.user$.observers.length;
    expect(sample).toBeLessThanOrEqual(0);
  });

  it('must call the update user', () => {
    const sample = spyOn(service, 'updateUser');
    service.updateUser(AOPA_TEST_USER);
    expect(sample).toHaveBeenCalled();
  });

  it('must return wrong user', () => {
    service
      .updateEmail(AOPA_TEST_USER.email, '1234567', 'teste@gmail.com')
      .catch((error) => {
        expect(error).toBeTruthy();
      });
  });

  it('must call the update email', () => {
    const sample = spyOn(service, 'updateEmail');
    service.updateEmail(
      AOPA_TEST_USER.email,
      AOPA_TEST_USER.password,
      AOPA_TEST_USER.email
    );
    expect(sample).toHaveBeenCalled();
  });
});
