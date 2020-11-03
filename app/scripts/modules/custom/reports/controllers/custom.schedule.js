/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomScheduleCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomScheduleCtrl', [
        '$scope',
        '$q',
        '$http',
        '$location',
        '$route',
        '$rootScope',
        '$window',
        '$timeout',
        '$filter',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        'ngmCustomHelper',
        'ngmCustomLists',
        'ngmCustomConfig',
        'ngmLists',
        '$translate',
        '$filter',
        function ($scope, $q, $http, $location, $route, $rootScope, $window, $timeout, $filter, ngmUser, ngmAuth, ngmData, ngmCustomHelper, ngmCustomLists, ngmCustomConfig, ngmLists, $translate, $filter) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            // init empty model
            $scope.model = $scope.$parent.ngm.dashboard.model;

            // create dews object
            $scope.dashboard = {

                // parent
                ngm: $scope.$parent.ngm,

                // current user
                user: ngmUser.get(),

                // when 'hq'
                pageLoadTime: 18900,

                // report start
                startDate: moment($route.current.params.start).format('YYYY-MM-DD'),

                // report end
                endDate: moment($route.current.params.end).format('YYYY-MM-DD'),

                // last update
                updatedAt: '',

                // current report
                report: $location.$$path.replace(/\//g, '_') + '-extracted-',

                // lists
                lists: {
                    clusters: ngmCustomLists.getClusters($route.current.params.admin0pcode).filter(cluster => cluster.filter !== false),
                    admin1: ngmLists.getObject('lists') ? ngmLists.getObject('lists').admin1List : [],
                    admin2: ngmLists.getObject('lists') ? ngmLists.getObject('lists').admin2List : [],
                    admin3: ngmLists.getObject('lists') ? ngmLists.getObject('lists').admin3List : []
                },

                // filtered data
                data: {
                    cluster: false,
                    admin1: false,
                    admin2: false,
                    admin3: false
                },

                menu_items: ngmAuth.getMenuParams('DASHBOARD'),

                menu: [
                    {
                        'id': 'search-region',
                        'icon': 'person_pin',
                        'title': $filter('translate')('region'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'HQ',
                            'param': 'adminRpcode',
                            'active': 'all',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/all/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'AFRO',
                            'param': 'adminRpcode',
                            'active': 'afro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/afro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'AMER',
                            'param': 'adminRpcode',
                            'active': 'amer',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/amer/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'EMRO',
                            'param': 'adminRpcode',
                            'active': 'emro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/emro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'SEARO',
                            'param': 'adminRpcode',
                            'active': 'searo',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/searo/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'EURO',
                            'param': 'adminRpcode',
                            'active': 'euro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/euro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }, {
                            'title': 'WPRO',
                            'param': 'adminRpcode',
                            'active': 'wpro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/file/wpro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                        }
                        ]
                    }
                ],

                // admin
                getPath: function (cluster_id, report_type_id, report_type, organization_tag) {
                    var path = '/custom/file/' + $scope.dashboard.adminRpcode.toLowerCase() +
                        '/' + $scope.dashboard.admin0pcode.toLowerCase() +
                        '/' + cluster_id +
                        '/' + organization_tag +
                        '/' + report_type +
                        '/' + report_type_id +
                        '/' + $scope.dashboard.startDate +
                        '/' + $scope.dashboard.endDate;

                    return path;
                },
                getRequest: function (obj) {
                    var request = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/indicator',
                        data: {
                            cluster_id: $scope.dashboard.cluster_id,
                            organization_tag: $scope.dashboard.organization_tag,
                            adminRpcode: $scope.dashboard.adminRpcode,
                            admin0pcode: $scope.dashboard.admin0pcode,
                            admin1pcode: 'all',
                            admin2pcode: 'all',
                            report_type: $scope.dashboard.report_type,
                            report_type_id: $scope.dashboard.report_type_id,
                            start_date: $scope.dashboard.startDate,
                            end_date: $scope.dashboard.endDate
                        }
                    }

                    request.data = angular.merge(request.data, obj);
                    return request;
                },

                getQueryParams: function () {

                    var x = {
                        // cluster_id: $scope.dashboard.cluster_id,
                        // organization_tag: $scope.dashboard.organization_tag,
                        // adminRpcode: $scope.dashboard.adminRpcode,
                        // admin0pcode: $scope.dashboard.admin0pcode,
                        // report_type_id: $scope.dashboard.report_type_id,
                        // start_date: $scope.dashboard.startDate,
                        // end_date: $scope.dashboard.endDate
                        cluster_id: $scope.dashboard.cluster_id,
                        organization_tag: $scope.dashboard.organization_tag,
                        adminRpcode: $scope.dashboard.adminRpcode,
                        admin0pcode: $scope.dashboard.admin0pcode,
                        admin1pcode: 'all',
                        admin2pcode: 'all',
                        report_type: $scope.dashboard.report_type,
                        report_type_id: $scope.dashboard.report_type_id,
                        start_date: $scope.dashboard.startDate,
                        end_date: $scope.dashboard.endDate
                    }

                    var queryString = Object.keys(x).map(key => key + '=' + x[key]).join('&');
                    return queryString

                },

                // // metrics
                getMetrics: function (theme, format) {
                    return {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/metrics/set',
                        data: {
                            organization: $scope.dashboard.user.organization,
                            username: $scope.dashboard.user.username,
                            email: $scope.dashboard.user.email,
                            dashboard: 'custom_dashboard',
                            theme: theme,
                            format: format,
                            url: $location.$$path
                        }
                    }
                },

                // downloads
                getDownloads: function () {

                    var downloads = [{
                        id: 'cluster_dashboard_pdf',
                        type: 'pdf',
                        color: 'blue',
                        icon: 'picture_as_pdf',
                        hover: $filter('translate')('download_dashboard_as_pdf'),
                        request: {
                            method: 'POST',
                            url: ngmAuth.LOCATION + '/api/print',
                            data: {
                                report: $scope.dashboard.cluster_id + '_cluster_dashboard-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'),
                                printUrl: $location.absUrl(),
                                downloadUrl: ngmAuth.LOCATION + '/report/',
                                user: $scope.dashboard.user,
                            }
                        },
                        metrics: $scope.dashboard.getMetrics('cluster_dashboard_pdf', 'pdf')
                    }, {
                        type: 'csv',
                        color: 'blue lighten-2',
                        icon: 'group',
                        hover: $filter('translate')('download_beneficiary_data_as_csv'),
                        request: $scope.dashboard.getRequest({
                            csv: true, fields: $scope.dashboard.config.fields,
                            fieldNames: $scope.dashboard.config.fieldNames,
                            overwriteFields: $scope.dashboard.config.overwriteFields,
                            indicator: $scope.dashboard.config.indicator[0].id,
                            write: $scope.dashboard.config.indicator[0].write ? true : false,
                            calculate_indicator: $scope.dashboard.config.indicator[0].calculate_indicator,
                            report: $scope.dashboard.filename + '_beneficiary_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm')
                        }),
                        metrics: $scope.dashboard.getMetrics('beneficiary_data', 'csv')
                    }];

                    // NG, wash and Admin
                    if ($scope.dashboard.admin0pcode === 'ng' &&
                        $scope.dashboard.cluster_id === 'wash' &&
                        ($scope.dashboard.user.roles.indexOf('ADMIN') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('COUNTRY_ADMIN') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('CLUSTER') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('SUPERADMIN') !== -1
                        )
                    ) {
                        downloads = downloads.concat(ng_wash_dl);
                    }

                    // blocking download
                    const canDownload = ngmAuth.canDo('DASHBOARD_DOWNLOAD', {
                        adminRpcode: $scope.dashboard.adminRpcode.toUpperCase(),
                        admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
                        cluster_id: $scope.dashboard.cluster_id,
                        organization_tag: $scope.dashboard.organization_tag
                    })
                    // filter downloads list
                    if (!canDownload) {
                        downloads = downloads.filter(x => x.id === 'cluster_dashboard_pdf')
                    }
                    // remove download that not relate to country
                    angular.forEach(downloads, function (d, i) {
                        if (d.not_show && (d.not_show.indexOf($scope.dashboard.admin0pcode.toUpperCase()) > -1)) {
                            downloads.splice(i, 1);
                        }
                    })
                    return downloads;
                },

                //
                setMenu: function () {

                    // rows
                    var orgRows = [],
                        clusterRows = [],
                        request = $scope.dashboard.getRequest({ list: true, indicator: 'organizations' });

                    if ($scope.dashboard.menu_items.includes('adminRpcode')) {
                        $scope.model.menu = $scope.dashboard.menu;
                    }

                    if ($scope.dashboard.menu_items.includes('admin0pcode')) {
                        if ($scope.dashboard.adminRpcode !== 'all') {

                            var menu = {
                                'afro': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country_mayus'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Democratic Republic of Congo',
                                        'param': 'admin0pcode',
                                        'active': 'cd',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/afro/cd/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Ethiopia',
                                        'param': 'admin0pcode',
                                        'active': 'et',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/afro/et/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Nigeria',
                                        'param': 'admin0pcode',
                                        'active': 'ng',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/afro/ng/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'South Sudan',
                                        'param': 'admin0pcode',
                                        'active': 'ss',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/afro/ss/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }]
                                },
                                'emro': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country_mayus'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Afghanistan',
                                        'param': 'admin0pcode',
                                        'active': 'af',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/emro/af/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Somalia',
                                        'param': 'admin0pcode',
                                        'active': 'so',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/emro/so/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Syria',
                                        'param': 'admin0pcode',
                                        'active': 'sy',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/emro/sy/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Yemen',
                                        'param': 'admin0pcode',
                                        'active': 'ye',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/emro/ye/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }]
                                },
                                'searo': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country_mayus'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Bangladesh',
                                        'param': 'admin0pcode',
                                        'active': 'bd',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/searo/bd/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Cox Bazar',
                                        'param': 'admin0pcode',
                                        'active': 'cb',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/searo/cb/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }]
                                },
                                'euro': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country_mayus'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Ukraine',
                                        'param': 'admin0pcode',
                                        'active': 'ua',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/euro/ua/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    },]
                                },
                                'amer': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country_mayus'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Colombia',
                                        'param': 'admin0pcode',
                                        'active': 'col',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/amer/col/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    },]
                                },
                                'wpro': {
                                    'id': 'search-country',
                                    'icon': 'person_pin',
                                    'title': $filter('translate')('country'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': [{
                                        'title': 'Papua New Guinea',
                                        'param': 'admin0pcode',
                                        'active': 'pg',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/wpro/pg/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }, {
                                        'title': 'Philippines',
                                        'param': 'admin0pcode',
                                        'active': 'phl',
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#/custom/file/wpro/phl/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end
                                    }]
                                }
                            }
                            $scope.model.menu.push(menu[$scope.dashboard.adminRpcode]);
                        }
                    }

                    // get orgs
                    ngmData.get(request).then(function (organizations) {

                        // set organization
                        if ($scope.dashboard.organization_tag !== 'all') {
                            var org = $filter('filter')(organizations, { organization_tag: $scope.dashboard.organization_tag });
                            if (org.length) {
                                $scope.dashboard.organization = org[0].organization;
                                $scope.dashboard.setTitle();
                                $scope.dashboard.setSubtitle();
                            }
                        }

                        // clusters
                        var filter_config = [];
                        // $scope.dashboard.config.filter_clusters
                        // $scope.dashboard.lists.clusters
                        if ($scope.dashboard.config.filter_clusters && $scope.dashboard.config.filter_clusters.length) {
                            angular.forEach($scope.dashboard.lists.clusters, function (c, i) {
                                if ($scope.dashboard.config.filter_clusters.indexOf(c.cluster_id) > -1) {
                                    filter_config.push(c)
                                }
                            })

                            filter_config.unshift({ cluster_id: 'all', cluster: 'ALL' });
                            angular.forEach(filter_config, function (d, i) {
                                var path = $scope.dashboard.getPath(d.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                                clusterRows.push({
                                    'title': d.cluster,
                                    'param': 'cluster_id',
                                    'active': d.cluster_id,
                                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                    'href': '/desk/#' + path
                                });
                            });

                            // add to menu
                            $scope.model.menu.push({
                                'search': true,
                                'id': 'search-cluster-cluster',
                                'icon': 'camera',
                                'title': $filter('translate')('cluster'),
                                'class': 'teal lighten-1 white-text',
                                'rows': clusterRows
                            });
                        }
                        // organizations
                        organizations.forEach(function (d, i) {
                            if (d) {
                                var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, d.organization_tag);
                                orgRows.push({
                                    'title': d.organization,
                                    'param': 'organization_tag',
                                    'active': d.organization_tag,
                                    'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                    'href': '/desk/#' + path
                                });
                            }
                        });

                        // organization & disable if public
                        if ($scope.dashboard.menu_items.includes('organization_tag') && $scope.dashboard.user.username !== 'welcome') {

                            $scope.model.menu.push({
                                'search': true,
                                'id': 'search-cluster-organization',
                                'icon': 'supervisor_account',
                                'title': $filter('translate')('organization'),
                                'class': 'teal lighten-1 white-text',
                                'rows': orgRows
                            });

                        }

                    });

                },

                setCluster: function () {
                    if ($scope.dashboard.cluster_id === 'cvwg') {
                        $scope.dashboard.cluster = { cluster_id: 'cvwg', cluster: 'MPC' };
                    } else {
                        $scope.dashboard.cluster = $filter('filter')($scope.dashboard.lists.clusters,
                            { cluster_id: $scope.dashboard.cluster_id }, true)[0];
                    }
                },
                //
                setTitle: function () {
                    // title
                    $scope.dashboard.title = 'Scheduling';


                    // admin0
                    if ($scope.dashboard.admin0pcode === 'all') {
                        $scope.dashboard.title = 'Scheduling | ' + $scope.dashboard.adminRpcode.toUpperCase()
                    }

                    if ($scope.dashboard.admin0pcode !== 'all') {
                        $scope.dashboard.title += ' | ' + $scope.dashboard.admin0pcode.toUpperCase();
                    }
                    if ($scope.dashboard.cluster_id !== 'all') {
                        $scope.dashboard.title += ' | ' + $scope.dashboard.cluster.cluster;
                    }

                    // org
                    if ($scope.dashboard.organization_tag !== 'all') {
                        var org = $scope.dashboard.organization ? ' | ' + $scope.dashboard.organization : '';
                        $scope.dashboard.title += org;
                    }
                    // report_type
                    $scope.dashboard.title += ' | ' + ($scope.dashboard.report_type_name.replace(/\b\w/g, l => l.toUpperCase()))
                    // update of rendered title
                    if ($scope.model.header && $scope.model.header.title) {
                        $scope.model.header.title.title = $scope.dashboard.title;
                    }
                },

                // subtitle
                setSubtitle: function () {


                    // subtitle
                    $scope.dashboard.subtitle = 'Scheduling For ' + $filter('translate')('for') + ' ';
                    // admin0
                    if ($scope.dashboard.admin0pcode === 'all') {
                        $scope.dashboard.subtitle = $filter('translate')('5wdashboard') + ' ' + $filter('translate')('for') + ' ' + $scope.dashboard.adminRpcode.toUpperCase();
                    }

                    if ($scope.dashboard.admin0pcode !== 'all') {
                        $scope.dashboard.subtitle += $scope.dashboard.admin0pcode.toUpperCase();
                    }
                    // cluster
                    if ($scope.dashboard.cluster_id === 'all') {
                        $scope.dashboard.subtitle += ', ' + $filter('translate')('all_clusters');
                    } else {
                        $scope.dashboard.subtitle += ', ' + $scope.dashboard.cluster.cluster.toUpperCase() + ' cluster';
                    }
                    // org
                    if ($scope.dashboard.organization_tag === 'all') {
                        $scope.dashboard.subtitle += ', ' + $filter('translate')('all_organizations');
                    } else {
                        var org = $scope.dashboard.organization ? ', ' + $scope.dashboard.organization + ' ' + $filter('translate')('organization') : '';
                        $scope.dashboard.subtitle += org;
                    }
                    $scope.dashboard.subtitle += ', ' + ($scope.dashboard.report_type_name.replace(/\b\w/g, l => l.toUpperCase()))
                    // update of rendered title
                    if ($scope.model.header && $scope.model.header.subtitle) {
                        $scope.model.header.subtitle.title = $scope.dashboard.subtitle;
                    }
                },

                setBeneficiariesStats: function (indicator_array) {
                    var benef_row = [];
                    var grid_style = '';
                    if (indicator_array.length > 2) {
                        grid_style = 'm4 l4'
                    } else if (indicator_array.length > 1) {
                        grid_style = 'm6 l6'
                    } else {
                        grid_style = 'm12 l12'
                    }

                    angular.forEach(indicator_array, function (e) {

                        benef_row.push({
                            styleClass: 's12' + grid_style,
                            widgets: [{
                                type: 'stats',
                                style: 'text-align: center;',
                                card: 'card-panel stats-card white grey-text text-darken-2',
                                config: {
                                    title: e.name,
                                    request: $scope.dashboard.getRequest({ indicator: e.id, calculate_indicator: e.calculate_indicator })
                                }
                            }]
                        })
                    })

                    return benef_row;
                },

                // set dashboard
                init: function (data) {

                    $scope.dashboard.adminRpcode = $route.current.params.adminRpcode;
                    $scope.dashboard.admin0pcode = $route.current.params.admin0pcode;
                    $scope.dashboard.cluster_id = $route.current.params.cluster_id;
                    $scope.dashboard.organization_tag = $route.current.params.organization_tag;
                    $scope.dashboard.report_type = $route.current.params.report_type;
                    $scope.dashboard.report_type_id = $route.current.params.report_type_id;

                    var report_types = ngmCustomConfig.getReportTypesList()
                    $scope.dashboard.report_type_name = report_types.filter(x => $route.current.params.report_type_id === x.report_type_id)[0].report_type_name;

                    $scope.dashboard.config = ngmCustomConfig.getCustomDashboardConfig($scope.dashboard.report_type_id);

                    // plus dashboard_visits
                    $scope.dashboard.user.dashboard_visits++;
                    localStorage.setObject('auth_token', $scope.dashboard.user);
                    ngmLists.setObject('auth_token', $scope.dashboard.user);

                    // report name
                    $scope.dashboard.report += moment().format('YYYY-MM-DDTHHmm');

                    // filename cluster needs to be mpc for cvwg
                    // TODO refactor/update cvwg
                    $scope.dashboard.cluster_id_filename = $scope.dashboard.cluster_id !== 'cvwg' ? $scope.dashboard.cluster_id : 'mpc'

                    $scope.dashboard.filename = $route.current.params.report_type_id + '_';
                    $scope.dashboard.beneficiaries_row = $scope.dashboard.setBeneficiariesStats($scope.dashboard.config.indicator)

                    // model
                    $scope.model = {
                        name: 'custom_dashboard',
                        header: {
                            div: {
                                'class': 'col s12 m12 l12 report-header',
                                'style': 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
                            },
                            title: {
                                'class': 'col s12 m8 l8 report-title truncate',
                                'style': 'color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
                                'title': $scope.dashboard.title,
                            },
                            subtitle: {
                                'class': 'col hide-on-small-only report-subtitle truncate m7 l9',
                                'title': $scope.dashboard.subtitle,
                            },
                            // datePicker: {
                            //     'class': 'col s12 m5 l3',
                            //     dates: [{
                            //         style: 'float:left;',
                            //         label: $filter('translate')('from'),
                            //         format: 'd mmm, yyyy',
                            //         min: $scope.dashboard.config.min_date ? $scope.dashboard.config.min_date : '2017-01-01',
                            //         max: $scope.dashboard.endDate,
                            //         currentTime: $scope.dashboard.startDate,
                            //         onClose: function () {
                            //             // set date
                            //             var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
                            //             if (date !== $scope.dashboard.startDate) {
                            //                 // set new date
                            //                 $scope.dashboard.startDate = date;
                            //                 var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                            //                 $location.path(path);
                            //             }
                            //         }
                            //     }, {
                            //         style: 'float:right',
                            //         label: $filter('translate')('to'),
                            //         format: 'd mmm, yyyy',
                            //         min: $scope.dashboard.startDate,
                            //         currentTime: $scope.dashboard.endDate,
                            //         onClose: function () {
                            //             // set date
                            //             var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
                            //             if (date !== $scope.dashboard.endDate) {
                            //                 // set new date
                            //                 $scope.dashboard.endDate = date;
                            //                 var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                            //                 $location.path(path);
                            //             }
                            //         }
                            //     }]
                            // },
                            // download: {
                            //     'class': 'col s12 m4 l4 hide-on-small-only',
                            //     downloads: $scope.dashboard.getDownloads()
                            // }
                        },
                        menu: [],
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'html',
                                    card: 'white grey-text text-darken-2',
                                    style: 'margin:15px; padding-bottom:30px;',
                                    config: {
                                        id: 'dashboard-btn',
                                        toMainMenu: function () {
                                            var path = '/custom/file/' + $scope.dashboard.adminRpcode.toLowerCase() + '/' + $scope.dashboard.user.admin0pcode.toLowerCase() + '/' + $scope.dashboard.cluster_id + '/' + $scope.dashboard.organization_tag + '/' + $scope.dashboard.report_type + '/' + $scope.dashboard.report_type_id + '/' + moment($route.current.params.start).format('YYYY-MM-DD') + '/' + moment($route.current.params.end).format('YYYY-MM-DD');
                                            $location.path(path)
                                            // var path = '/custom/custom-main/' + $scope.dashboard.user.adminRpcode.toLowerCase() + '/' + $scope.dashboard.user.admin0pcode.toLowerCase() + '/' + $scope.dashboard.user.organization_tag + '/' + $scope.dashboard.report_type_id;
                                            // // update new date
                                            // $location.path(path);
                                        },
                                        request: $scope.dashboard.getRequest({ indicator: 'latest_update' }),
                                        templateUrl: '/scripts/widgets/ngm-html/template/custom.dashboard.html'
                                    }
                                }]
                            }]
                        }, {
                             columns: [{
                                    styleClass: 's12 m12 l12',
                                    widgets: [{
                                        type: 'custom.schedule',
                                        config: {
                                            schedules:data
                                        }
                                    }]
                                }]
                            },{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'html',
                                    card: 'card-panel',
                                    style: 'padding:0px; height: 90px; padding-top:10px;',
                                    config: {
                                        templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                        lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                        defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                    }
                                }]
                            }]
                        }]
                    }

                    // set
                    // $scope.dashboard.setUrl();
                    // $scope.dashboard.setMenu();
                    // $scope.dashboard.setCluster();
                    $scope.dashboard.setTitle();
                    $scope.dashboard.setSubtitle();

                    setTimeout(() => {
                        $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                    }, 0);
                }

            };
            ngmData.get({
                method: 'GET',
                url: ngmAuth.LOCATION + '/api/custom/config/jobs',
                params: {
                    admin0pcode: $route.current.params.admin0pcode,
                    reporting_type_id: $route.current.params.report_type_id,
                    // organization_tag: $route.current.params.organization_tag,
                    // cluster_id: $route.current.params.cluster_id
                }
            }).then(function (result) {
                // set dashboard
                $scope.dashboard.init(result.jobs);

                // assign to ngm app scope ( for menu )
                $scope.dashboard.ngm.dashboard.model = $scope.model;
            })
            
        }

    ]);
