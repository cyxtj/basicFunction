'use strict';

/* Filters */

angular.module('Veterans.filters', []).
    filter('bool2cn', function() {
        return function(input) {
            return input ? "是" : "否";
        }
    });
