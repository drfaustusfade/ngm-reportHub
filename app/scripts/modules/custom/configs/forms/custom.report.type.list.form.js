angular.module('ngm.widget.form.report.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.report.type.list', {
                title: 'Report Type Activities Form List',
                description: 'Report Type Activities Form List',
                controller: 'ReportTypeFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/report.type.list.html'
            });
    })
    .controller('ReportTypeFormListCtrl', [
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
                newConfig: $route.current.params.id === 'new'? true: false,
                validate: function () {
                    json = JSON.parse($scope.master.definition)
                    missing = '';

                    if(!json.definition){
                        if ($scope.master.newConfig){
                            missing += 'definition </br>'
                        }
                    }else{
                        if(!json.definition.admin0pcode){
                            missing += 'admin0pcode </br>'
                        }
                        if(!json.definition.reporting_type_id){
                            missing += 'reporting_type_id </br>'
                        }
                        if(!json.definition.config){
                            missing += 'config </br>'
                        }
                    }
                    if(missing !== ''){
                        M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                    }else{
                        $scope.master.definition = json;
                        $scope.master.save()
                    }
                },
                remove:function(id){
                    // setReportRequest
                    // var setReportRequest = {
                    //     method: 'POST',
                    //     url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomReportingType/:id',
                    //     params:{id : id}
                    // }

                    // // set report
                    // $http(setReportRequest).success(function () {

                    // })
                    var removeConfig = JSON.parse($scope.master.definition)
                    var setReportRequest = {
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomReportingType/' + removeConfig.id,
                        // params: { id: removeConfig.id }
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if (!response.err) {
                            $timeout(function(){
                                $location.path('/custom/config/report-types/' + $route.current.params.admin0pcode)
                                M.toast({ html: 'Success Delete List', displayLength: 3000, classes: 'success' });
                            },2000)

                        } else {
                            M.toast({ html: 'Error!', displayLength: 3000, classes: 'success' });
                        }

                    })
                },
                cancel:function(){
                    if ($scope.master.newConfig) {
                        M.toast({ html: 'Cancel create new Config', displayLength: 3000, classes: 'success' });
                        $location.path('/custom/config/report-types/' + $route.current.params.admin0pcode)
                    } else {
                        M.toast({ html: 'Cancel Update', displayLength: 3000, classes: 'success' });
                        $location.path('/custom/config/report-type-menu/' + $route.current.params.id)
                    }

                    
                },
                save: function () {

                    // setReportRequest
                    if (!$scope.master.newConfig){
                        $scope.master.definition = { definition: $scope.master.definition};
                        
                    }
                    var setReportRequest = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/config/saveCustomReportingType',
                        data: $scope.master.definition
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if(!response.err){
                            $timeout(function(){
                                if ($scope.master.newConfig) {
                                    M.toast({ html: 'Success Create New Config', displayLength: 3000, classes: 'success' });
                                    $location.path('/custom/config/report-types/' + $route.current.params.admin0pcode)
                                } else {
                                    // $scope.master.definition = response
                                    // $scope.master.definition = JSON.stringify($scope.master.definition)
                                    $scope.master.definition = JSON.stringify(response)
                                    M.toast({ html: 'Success Update Config', displayLength: 3000, classes: 'success' });
                                }
                            },2000)
                        }
                        
                    })
                   

                },
                init: function () {
                    $scope.master.definition = JSON.stringify($scope.master.definition)
                }
            }

            $scope.master.init();

        }])