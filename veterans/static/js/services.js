'use strict';

/* Services */

var VeteransService = angular.module('Veterans.services', ['ngResource']);

VeteransService.factory('DrugInfo', function($resource){
    return $resource(
        '/api/drug',
        {},
        {
            query: {
                method:'GET',
                isArray:false
            }
        }
    );
});

VeteransService.factory('WdiseaseInfo', function($resource){
    return $resource(
        //'static/mockdata/sizheninfo-:patientID.json',
        '/api/sizheninfo',
        {},
        {
            query: {
                method:'GET',
                //params:{patientID:'list'},
                isArray:true
            }
        }
    );
});

VeteransService.factory('AddInfo', function($resource){
    return $resource(
        'static/mockdata/addinfo-:patientID.json',
        {},
        {
            query: {
                method:'GET',
                params:{patientID:'list'},
                isArray:true
            }
        }
    );
});

