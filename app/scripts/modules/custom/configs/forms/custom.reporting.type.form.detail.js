angular.module('ngm.widget.reporting.type.form.detail', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('reporting.type.form.detail', {
                title: 'Reporting Type Detail Form',
                description: 'Reporting Type Detail Form',
                controller: 'ReportingTypeDetailFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/activities.list.html'
            });
    })
    .controller('ReportingTypeDetailFormCtrl', [
        '$scope',
        'config',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$location',
        '$route',
        function (
            $scope,
            config,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $location,
            $route
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                definition: config.definition,
                newList: $route.current.params.id === 'new' ? true : false,
                validate: function () {
                    json = JSON.parse($scope.master.definition)
                    if (!$scope.master.newList){
                        json = { list: json }
                    }
                    missing = '';
                    if (!json.list && !$scope.master.newList) {
                        


                        missing += 'list </br>'
                    } else {
                        if (!json.list.admin0pcode) {
                            missing += 'admin0pcode </br>'

                        }
                        if (!json.list.list_id) {
                            missing += 'list_id </br>'

                        }
                        if (!json.list.list_type_id || json.list.list_type_id !== 'project') {
                            missing += 'list_type_id </br>'
                            if (json.list.list_type_id !== 'project') {

                                missing += 'please put this value attribute to "project"'
                                console.log(missing)
                            }

                        }
                        if (!json.list.list) {
                            missing += 'list </br>'
                        }
                    }
                    if(missing ===''){
                        $scope.master.definition = JSON.parse($scope.master.definition);
                        $scope.master.save()
                    }else{
                        M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                    }
                },
                cancel: function () {
                    if ($scope.master.newList) {
                        M.toast({ html: 'Cancel create new list', displayLength: 3000, classes: 'success' });
                    } else {
                        M.toast({ html: 'Cancel Update', displayLength: 3000, classes: 'success' });
                    }

                    $location.path('/custom/config/reporting-types/' + $route.current.params.report_type_id)

                },
                remove: function (id) {
                    var removeList = JSON.parse($scope.master.definition)
                    var setReportRequest = {
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomList/' + removeList.id,
                        // params: { id: removeList.id }
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if (!response.err) {
                            $timeout(function(){
                                $location.path('/custom/config/reporting-types/' + $route.current.params.report_type_id)
                                M.toast({ html: 'Success Delete List', displayLength: 3000, classes: 'success' });
                            },2000)

                        } else {
                            M.toast({ html: 'Error!', displayLength: 3000, classes: 'success' });
                        }

                    })
                },
                save: function () {
                    if (!$scope.master.newList) {
                        $scope.master.definition = { list: $scope.master.definition };

                    }
                    // setReportRequest
                    var setReportRequest = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/config/saveCustomList',
                        data:  $scope.master.definition
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if (!response.err) {
                           
                            $scope.master.definition = JSON.stringify(response)
                            $timeout(function () {
                                if ($scope.master.newList) {
                                    M.toast({ html: 'Success Create New List', displayLength: 3000, classes: 'success' });
                                    $location.path('/custom/config/reporting-types/' + $route.current.params.report_type_id)
                                } else {
                                    M.toast({ html: 'Successfully Update List', displayLength: 3000, classes: 'success' });
                                }
                            }, 2000)

                        }

                    })
                    // console.log($scope.master.config, json)
                },
                init: function () {
                    // change object to String
                    $scope.master.definition = JSON.stringify($scope.master.definition);
                }
            }

            $scope.master.init();

        }])