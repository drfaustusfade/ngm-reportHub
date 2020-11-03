/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomGlobalBeneficiariesFormDetailCtrl
 * @description
 * # CustomGlobalBeneficiariesFormDetailCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomGlobalBeneficiariesFormDetailCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.config = {

            // ngm
            ngm: $scope.$parent.ngm,

            // user
            user: ngmUser.get(),

            // init
            init: function (data) {

                // report dashboard model
                $scope.model = {
                    name: 'cluster_project_list',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.config.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'font-size: 3.4rem; color: ' + $scope.config.ngm.style.defaultPrimaryColor,
                            title: $route.current.params.id === 'new' ? 'New Beneficiaries Form' : "Form "
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                            title: $route.current.params.id === 'new' ? 'New Form for Beneficiaries' : 'Form : '
                        },
                        // download: {
                        //     'class': 'col s12 m3 l3 hide-on-small-only',
                        //     downloads: [
                        //         {
                        //             type: 'csv',
                        //             color: 'blue lighten-2',
                        //             icon: 'assignment',
                        //             hover: 'Download Organization CSV',
                        //             request: {
                        //                 method: 'GET',
                        //                 url: ngmAuth.LOCATION + '/api/list/organizationsCSV',
                        //                 params: {
                        //                     admin0pcode: $route.current.params.admin0pcode
                        //                 },
                        //                 data: {
                        //                     report: 'list_organization_' + $route.current.params.admin0pcode,
                        //                     csv: true
                        //                 }
                        //             },
                        //             metrics: {
                        //                 method: 'POST',
                        //                 url: ngmAuth.LOCATION + '/api/metrics/set',
                        //                 data: {
                        //                     organization: $scope.config.user.organization,
                        //                     username: $scope.config.user.username,
                        //                     email: $scope.config.user.email,
                        //                     dashboard: 'organization list',
                        //                     theme: 'list_organizations',
                        //                     format: 'csv',
                        //                     url: $location.$$path
                        //                 }
                        //             }
                        //         }
                        //     ]
                        // }
                    },
                    menu: [],
                    rows: [{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 20px;',
                                config: {
                                    html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/custom/config/beneficiaries-forms/"><i class="material-icons left">keyboard_return</i> Back </a>'
                                }
                            }]
                        }]
                    },
                    {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'global.form.beneficiaries',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    style: $scope.config.ngm.style,
                                    definition: data
                                }
                            }]
                        }]
                    },
                    {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'card-panel',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    html: $scope.config.ngm.footer
                                }
                            }]
                        }]
                    }]
                };


                // assign to ngm app scope
                $scope.config.ngm.dashboard.model = $scope.model;

            }

        }
        // run page
        if ($route.current.params.id === 'new') {
            var x = {
                "form": {
                    "admin0pcode": "AF",
                    "form_id": "winterization",
                    "form_type_id": "global",
                    "type": "json",
                    "config": {
                    }
                }
            }
            $scope.config.init(x);
        } else {
            var req = {
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/custom/config/getCustomBeneficiariesForm',
                params:{
                    form_id :$route.current.params.id
                }
            }
            ngmData.get(req).then(function (data) {

                $scope.config.init(data);
            });


        }


    }]);
