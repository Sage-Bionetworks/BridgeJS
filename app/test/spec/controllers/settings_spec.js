describe('SettingsModalController', function() {

    var $controller, $httpBackend, $log, controller, scope, formService, modalInstance, modalService;

    beforeEach(module('bridge'));

    beforeEach(inject(function($injector) {
        $log = $injector.get('$log');
        scope = $injector.get('$rootScope').$new();
        scope.setMessage = jasmine.createSpy('scope.setMessage');
        authService = jasmine.createSpyObj( 'authService', ['initScope'] );
        formService = jasmine.createSpyObj( 'formService', ['initScope', 'formToJSON'] );
        modalInstance = jasmine.createSpyObj( 'modalInstance', ['close', 'dismiss'] );
        modalService = jasmine.createSpyObj( 'modalService', ['openModal'] );

        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/v1/profile').respond({
            firstName: 'first name',
            lastName: 'last name',
            username: 'username',
            email: 'username@email.com'
        });
        $httpBackend.expect('GET', '/api/v1/profile');

        $controller = $injector.get('$controller');
        controller = $controller('SettingsModalController', {
            '$log': $log,
            '$modalInstance': modalInstance,
            '$scope': scope,
            'authService': authService,
            'formService': formService,
            'modalService': modalService
        });
    }));

    afterEach(function() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should instantiate the controller and retreive the user profile.', function() {
        expect(controller).toBeDefined();
        expect(formService.initScope).toHaveBeenCalled();
    });

    it('should dismiss the modalInstance when calling close() in the current scope.', function() {
        scope.cancel();

        expect(modalInstance.dismiss).toHaveBeenCalled();
    });

    it('should open the RequestResetPassword Modal when calling changePassword() in the current scope.', function() {
        scope.changePassword();

        expect(modalService.openModal).toHaveBeenCalledWith('RequestResetPasswordModalController', 'sm', '/shared/views/requestResetPassword.html');
    });

    it('should POST when we submit the form.', function() {
        $httpBackend.when('POST', '/api/v1/profile').respond({
            message: 'Profile updated.'
        });
        $httpBackend.expect('POST', '/api/v1/profile');

        scope.submit();
    });

    it('should POST when we submit the form and leave the modal instance open if an error occurred.', function() {
        $httpBackend.when('POST', '/api/v1/profile').respond(500);
        $httpBackend.expect('POST', '/api/v1/profile');

        scope.submit();

        expect(formService.formToJSON).toHaveBeenCalled();
        expect(modalInstance.close).not.toHaveBeenCalled();
    });

    it('should POST when we call suspend or resume data sharing.', function() {
        $httpBackend.when('POST', '/api/v1/consent/dataSharing/resume').respond({
            message: 'Resuming data sharing.'
        });
        $httpBackend.when('POST', '/api/v1/consent/dataSharing/suspend').respond({
            message: 'Suspended data sharing.'
        });

        $httpBackend.expect('POST', '/api/v1/consent/dataSharing/resume');
        $httpBackend.expect('POST', '/api/v1/consent/dataSharing/suspend');

        scope.resumeDataSharing();
        scope.suspendDataSharing();
    });

});