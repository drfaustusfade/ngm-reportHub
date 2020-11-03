angular.module('ngm.widget.form.global.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.global.list', {
                title: 'Global Form List',
                description: 'Global Form List',
                controller: 'GlobalFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/global.list.html'
            });
    })
    .controller('GlobalFormListCtrl', [
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
                newList: $route.current.params.id === 'new' ? true: false,
                validate:function(){
                    json = JSON.parse($scope.master.definition)
                    json = {list: json};
                    missing='';
                    if(!json.list){

                        missing += 'list </br>'
                    }else{
                        if (!json.list.admin0pcode) {
                            missing += 'admin0pcode </br>'

                        }
                        if (!json.list.list_id) {
                            missing += 'list_type_id </br>'

                        }
                        if (!json.list.list_type_id || json.list.list_type_id !== 'global') {
                            missing += 'list_type_id </br>'
                            if (json.list.list_type_id === 'global') {
                                missing += 'please put this value attribute to "global"'
                            }

                        }
                        if (!json.list.list){
                            missing += 'list </br>'
                        }
                    }
                    if(missing){
                        M.toast({ html: 'Please Put The missing atribute below </br>'+ missing, displayLength: 4000, classes: 'error' });
                    }else{
                        $scope.master.definition = JSON.parse($scope.master.definition);
                        $scope.master.save()
                    }
                },
                cancel:function(){
                    if ($scope.master.newList){
                        M.toast({ html: 'Cancel create new list', displayLength: 3000, classes: 'success' });
                    }else{
                        M.toast({ html: 'Cancel Update', displayLength: 3000, classes: 'success' });
                    }
                   
                    $location.path('/custom/config/global/' + $route.current.params.admin0pcode)

                },
                removeList:function(){
                   var removeList = JSON.parse($scope.master.definition)
                    var setReportRequest = {
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomList/' + removeList.id,
                        // params: { id: removeList.id}
                    }

                    // set report
                    $http(setReportRequest).success(function (response) {
                        M.toast({ html: 'Processing...', displayLength: 3000, classes: 'note' });
                        if (!response.err) {
                            $timeout(function(){
                                $location.path('/custom/config/global/' + $route.current.params.admin0pcode)
                                M.toast({ html: 'Success Delete List', displayLength: 3000, classes: 'success' });
                            },2000)

                        }else{
                            M.toast({ html: 'Error!', displayLength: 3000, classes: 'success' });
                        }

                    })

                },
                save:function(){
                    if (!$scope.master.newList) {
                        $scope.master.definition = { list: $scope.master.definition };

                    }
                    // setReportRequest
                    var setReportRequest = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/config/saveCustomList',
                        data: $scope.master.definition
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if(!response.err){
                            $scope.master.definition = JSON.stringify(response)
                            $timeout(function(){
                                if ($scope.master.newList) {
                                    M.toast({ html: 'Success Create New List', displayLength: 3000, classes: 'success' });
                                    $location.path('/custom/config/global/' + $route.current.params.admin0pcode)
                                } else {
                                    M.toast({ html: 'Successfully Update List', displayLength: 3000, classes: 'success' });
                                }
                            },2000)
                           
                        }
                        
                    })
                },
                init: function () {
                    // change object to String
                    $scope.master.definition = JSON.stringify($scope.master.definition);

                }
            }

            $scope.master.init();

        }])