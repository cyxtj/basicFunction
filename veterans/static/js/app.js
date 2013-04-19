'use strict';

// Declare app level module which depends on filters, and services
var veterans = angular.module('Veterans', ['Veterans.filters', 'Veterans.services', 'Veterans.directives', 'ui.bootstrap']);

veterans.config(['$routeProvider', function($routeProvider) {
    // welcome
    $routeProvider.when('/welcome', {templateUrl: 'static/page/welcome.html'});
    // druginfo   
    $routeProvider.when('/drug-list', {templateUrl: 'static/page/drug-list.html', controller: DrugListCtrl});
    
    $routeProvider.when('/fixedrecipe', {templateUrl: 'static/page/fixedrecipe.html', controller:FixedrecipeCtrl});
    
    $routeProvider.when('/western_disease', {templateUrl: 'static/page/western_disease.html', controller: WesternDiseaseCtrl});
   
    $routeProvider.when('/chinese_disease', {templateUrl: 'static/page/chinese_disease.html', controller: ChineseDiseaseCtrl});
    
    $routeProvider.when('/semiotic', {templateUrl: 'static/page/semiotic.html', controller: SemioticCtrl});
    // addinfo
    $routeProvider.when('/dmethod', {templateUrl: 'static/page/dmethod.html', controller: DmethodCtrl});
    
    $routeProvider.when('/symptom', {templateUrl: 'static/page/symptom.html', controller: SymptomCtrl});
    // sizhen connect action
    
    $routeProvider.when('/dtemplate', {templateUrl: 'static/page/dtemplate.html', controller: DtemplateCtrl});
    
    $routeProvider.when('/examination', {templateUrl: 'static/page/examination.html', controller: ExaminationCtrl});
   
    // otherwise
    $routeProvider.otherwise({redirectTo: '/welcome'});
}]);

