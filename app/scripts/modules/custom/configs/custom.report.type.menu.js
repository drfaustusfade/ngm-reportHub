/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomReportTypeMenuCtrl
 * @description
 * # CustomReportTypeMenuCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomReportTypeMenuCtrl', ['$scope', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', 'ngmCustomConfig', function ($scope, $route, $http, $location, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope, ngmCustomConfig) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.menu = {

            // ngm
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            title: '',

            // set summary
            init: function (data) {
                $scope.menu.title = 'Reporting Type Menu';
                var subtitle = 'configuration';

                // report dashboard model
                $scope.model = {
                    name: 'custom_type_menu',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.menu.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m12 l12 report-title truncate',
                            style: 'color: ' + $scope.menu.ngm.style.defaultPrimaryColor,
                            title: $scope.menu.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle truncate',
                            'title': subtitle
                        }
                    },
                    rows: [{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 20px;',
                                config: {
                                    html: '<a class="btn-flat waves-effect waves-teal left" href="#/custom/config/report-types/"><i class="material-icons mirror left">keyboard_return</i>' + 'BACK' + '</a>'
                                }
                            }]
                        }]
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 0px;',
                                config: {
                                    templateUrl: '/scripts/widgets/ngm-html/template/custom.type.menu.html',
                                    // report_type_id: $route.current.params.report_type_id,
                                    // admin0pcode: 'all',
                                    reporting_config: data,
                                    markActive: function (report_type_config) {
                                        // mark report_type_config active
                                        report_type_config.status = 'active';

                                        // timeout
                                        $timeout(function () {
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 6000, classes: 'note' });
                                        }, 200);

                                        // Submit project for save
                                        ngmData.get({
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/config/saveCustomReportingType',
                                            data: report_type_config
                                        }).then(function (data) {
                                            // redirect on success
                                            $timeout(function () {
                                                $location.path('/custom/config/report-types/');
                                                // Materialize.toast( $filter('translate')('project_market_as_complete_congratulations')+'!', 6000, 'success');
                                                M.toast({ html: 'Congratulation Report Type Configuration Mark as Active!', displayLength: 6000, classes: 'success' });
                                            },2000)
                                            
                                        });

                                    },

                                    // mark poject complete
                                    markComplete: function (report_type_config) {
                                        // mark report_type_config complete
                                        report_type_config.status = 'complete';

                                        report_type_config = { definition: report_type_config }

                                        // timeout
                                        $timeout(function () {
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 6000, classes: 'note' });
                                        }, 200);

                                        // Submit project for save
                                        ngmData.get({
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/config/saveCustomReportingType',
                                            data: report_type_config
                                        }).then(function (data) {
                                            $timeout(function(){
                                                // redirect on success
                                                $location.path('/custom/config/report-types/');
                                                // Materialize.toast( $filter('translate')('project_market_as_complete_congratulations')+'!', 6000, 'success');
                                                M.toast({ html: 'Congratulation Report Type Configuration Mark as Complete!', displayLength: 6000, classes: 'success' });
                                            },2000)
                                            
                                        });

                                    },
                                    delete: function (report_type_config) {

                                        // timeout
                                        
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 3000, classes: 'note' });
                                        

                                        // Submit project for save
                                        $http({
                                            method: 'DELETE',
                                            url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomReportingType/' + report_type_config.id,
                                        }).success(function (data) {

                                            // redirect on success
                                            if (data.err) {
                                                // Materialize.toast( $filter('translate')('project_delete_error_please_try_again'), 6000, 'error');
                                                M.toast({ html: 'Repor Type Deleted Error, Please Try again', displayLength: 6000, classes: 'error' });
                                            }
                                            if (!data.err) {
                                                $timeout(function(){
                                                    $location.path('/custom/config/report-types/');
                                                    // Materialize.toast( $filter('translate')('project_deleted')+'!', 6000, 'success');
                                                    M.toast({ html: 'Report Type Deleted!', displayLength: 6000, classes: 'success' });
                                                },2000)
                                                
                                            }
                                        }).error(function (err) {
                                            // redirect on success
                                            // Materialize.toast( $filter('translate')('project_delete_error_please_try_again'), 6000, 'error');
                                            M.toast({ html: 'Error,', displayLength: 6000, classes: 'error' });
                                        });
                                    }
                                }
                            }]
                        }]
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'card-panel',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    // html: $scope.menu.ngm.footer
                                    templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                    lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                    defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                }
                            }]
                        }]
                    }]
                };

                // assign to ngm app scope
                $scope.menu.ngm.dashboard.model = $scope.model;

            }

        }
        ngmData.get( {
            method: 'GET',
            url: ngmAuth.LOCATION + '/api/custom/config/getCustomReportingType?reporting_type_id=' + $route.current.params.report_type_id
        }).then(function (data) {
            $scope.menu.init(data)
        });
        

    }]);