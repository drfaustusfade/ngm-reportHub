/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomReportCtrl
 * @description
 * # CustomReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.custom.schedule', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('custom.schedule', {
                title: 'Custom Schedule Form',
                description: 'Custom Schedule Form',
                controller: 'CustomScheduleFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/schedule/form.html'
            });
    })
    .controller('CustomScheduleFormCtrl', [
        '$scope',
        '$window',
        '$location',
        '$timeout',
        '$filter',
        '$q',
        '$http',
        '$route',
        '$sce',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        'ngmCustomHelper',
        'ngmCustomLists',
        'ngmCustomConfig',
        'ngmCustomLocations',
        'ngmCustomBeneficiaries',
        'ngmCustomValidation',
        // 'NgTableParams',
        'config', '$translate', '$filter',

        function (
            $scope,
            $window,
            $location,
            $timeout,
            $filter,
            $q,
            $http,
            $route,
            $sce,
            ngmUser,
            ngmAuth,
            ngmData,
            ngmCustomHelper,
            ngmCustomLists,
            ngmCustomConfig,
            ngmCustomLocations,
            ngmCustomBeneficiaries,
            ngmCustomValidation,
            // NgTableParams,
            config, $translate, $filter) {


            /**** SERVICES ****/

            // these should be a directive - sorry Steve Jobs!
            $scope.scope = $scope;
            $scope.ngmCustomLists = ngmCustomLists;
            $scope.ngmCustomLocations = ngmCustomLocations;
            $scope.ngmCustomBeneficiaries = ngmCustomBeneficiaries;
            $scope.ngmCustomValidation = ngmCustomValidation;

            // project
            $scope.schedule = {

                /**** DEFAULTS ****/
                user: ngmUser.get(),
                style: config.style,
                list_schedules: config.schedules,

                /**** TEMPLATES ****/

                // init lists
                init: function () {

                    $scope.schedule.report_types =[{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' }, { scheduled_report_type: 'indicators_summary', scheduled_report_name: 'Indicators Summary', type: 'excel' }]
                    $scope.schedule.types = [{ type_id: 'every', type_name: 'Every' },
                                             { type_id: 'once', type_name: 'Once' }];
                    $scope.schedule.types = ['every','once']
                    $scope.schedule.periodes = [{ period_id: 'year', period_name: 'Year' },
                                                { period_id: 'quarter', period_name: 'Quarter' },
                                                { period_id: 'month', period_name: 'Month' },
                                                { period_id: 'week', period_name: 'Week' },
                                                { period_id: 'day', period_name: 'Day' },
                                                { period_id: 'custom', period_name: 'Custom' }]
                    $scope.schedule.schedule_periodes= ['year',
                        'quarter',
                        'month',
                        'week',
                        'day',
                        'custom'];

                    $scope.detailSchedule = [];
                    $scope.detailSchedule = $scope.schedule.list_schedules.length ? new Array($scope.schedule.list_schedules.length).fill(false):new Array(0).fill(false);
                    $scope.schedule.lists = ngmCustomConfig.getCustomScheduleConfigLists($route.current.params.report_type_id)

                    
                },

                addSchedule: function () {

                    // inserted
                    // $scope.inserted = {
                    //    indicator_id:'',
                    //    type_id:'',
                    //    step:0,
                    //    shift:0,
                    //    time:'',
                    //    date: moment().format('YYYY-MM-DD')
                    // };

                    
                    
                    $scope.inserted = {data:ngmCustomConfig.getCustomScheduleConfigAttribute($route.current.params.report_type_id)}
                    var schedule_shift_default_value = {
                        schedule_shift_period: 1,
                        schedule_shift_days: 1,
                        report_start_date_shift_period: 1,
                        report_start_date_shift_days: 1,
                        report_end_date_shift_period: 1,
                        report_end_date_shift_days: 1
                    }
                    var info={
                        reporting_type_id: $route.current.params.report_type_id,
                        admin0pcode:$scope.schedule.user.admin0pcode,
                        organization_tag:$scope.schedule.user.organization_tag,
                        cluster_id:$scope.schedule.user.cluster_id,
                        username: $scope.schedule.user.username,
                        filter:{
                            cluster_id: $scope.schedule.user.cluster_id,
                            adminRpcode: $scope.schedule.user.adminRpcode,
                            admin0pcode: $scope.schedule.user.admin0pcode,
                            organization_tag: $scope.schedule.user.organization_tag,
                            admin1pcode: "all",
                            admin2pcode: "all",
                            report_type: $route.current.params.report_type,
                            report_type_id: $route.current.params.report_type_id,
                            start_date: $route.current.params.start,
                            end_date:$route.current.params.end,
                            indicator: "beneficiaries"
                        }
                    }
                    $scope.inserted.data = angular.merge({}, schedule_shift_default_value,$scope.inserted.data,info)

                    


                    // clone
                    var length = $scope.schedule.list_schedules.length;
                    if (length) {
                        var b = angular.copy($scope.schedule.list_schedules[length - 1]);
                        delete b.data.name
                        delete b.id
                        $scope.inserted = angular.merge(b, $scope.inserted);
                    }

                    // push
                    $scope.schedule.list_schedules.push($scope.inserted);
                    $scope.detailSchedule[$scope.schedule.list_schedules.length - 1] = true;
                    $scope.schedule.initTimePicker()
                   
                },

                initTimePicker:function(){
                    $timeout(function(){
                        const myInput = document.getElementById('timepicker');
                        const timeInstance = M.Timepicker.init(myInput);
                    },100)
                   

                },

                updateName: function (list, key, name, schedule){
                    var obj = {}
                    obj[key] = schedule[key];
                    var select = $filter('filter')(list, obj, true);

                    // set name
                    if (select.length) {
                        // name
                        // beneficiary[name] = select[0][name];
                        schedule = angular.merge({}, schedule, select[0])
                    }
                    // clear name
                    if (schedule[key] === null) {
                        schedule[name] = null;
                    }
                },
                validate: function($index){
                    divs=[]
                    complete = true
                    angular.forEach($scope.schedule.list_schedules,function(s,i){
                        // if (!s.indicator_id) {
                        //     id = "label[for='" + 'ngm-indicator_id-' + i + "']";
                        //     $(id).addClass('error');
                        //     divs.push(id);
                        //     complete = false;
                        // }
                        // if (!s.date) {
                        //     id = "label[for='" + 'ngm-date-' + i + "']";
                        //     $(id).addClass('error');
                        //     divs.push(id);
                        //     complete = false;

                        // }
                    })

                    var schedule = $scope.schedule.list_schedules[$index].data;
                    if (!schedule.schedule_type ) {
                        id = "label[for='" + 'ngm-schedule_type-' + $index + "']";
                        $(id).addClass('error');
                        divs.push(id);
                        complete = false;
                    }
                    if (schedule.schedule_type === 'once' && !schedule.schedule_datetime) {
                        id = "label[for='" + 'ngm-schedule_datetime-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (!schedule.schedule_report_type ) {
                        id = "label[for='" + 'ngm-schedule_report_type-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (!schedule.schedule_period ) {
                        
                        id = "label[for='" + 'ngm-schedule_period-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (!schedule.report_start_date_type ) {
                        
                        id = "label[for='" + 'ngm-report_start_date_type-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (schedule.report_start_date_type === 'custom' && !schedule.report_start_date) {
                        
                        id = "label[for='" + 'ngm-report_start_date-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (!schedule.report_end_date_type) {
                        
                        id = "label[for='" + 'ngm-report_end_date_type-' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    if (schedule.report_end_date_type === 'custom' && !schedule.report_end_date) {
                        
                        id = "label[for='" + 'ngm - report_end_date' + $index + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                    }
                    
                    if(!complete){
                        $(divs[0]).animatescroll();
                    }else{
                        $scope.schedule.save($index);
                    }
                    

                },

                // datepicker
                datepicker: {
                    maxDate: moment().format('YYYY-MM-DD'),
                    onClose: function ($schedule,prop) {
                        // format date on selection
                        $schedule[prop] =
                            moment(new Date($schedule[prop])).format('YYYY-MM-DD');
                    }
                },

                cancelEdit: function ($index) {
                    if (!$scope.schedule.list_schedules[$index].id) {
                        $scope.schedule.list_schedules.splice($index, 1);
                    }
                },
                remove:function($index){
                    $('#remove-schedule-modal').modal({ dismissible: false });
                    $('#remove-schedule-modal').modal('open');
                    $scope.indexSchedule= $index;
                },
                removeSchedule: function () {
                    var nameSchedule = $scope.schedule.list_schedules[$scope.indexSchedule].name;
                    $scope.schedule.isSaving = true;
                    M.toast({ html: 'Removing...', displayLength: 3000, classes: 'note' });
                    $http({
                        method:'DELETE',
                        url: ngmAuth.LOCATION + '/api/custom/config/job/' + nameSchedule
                    }).success(function(result){
                        $timeout(function () {
                            $scope.schedule.list_schedules.splice($scope.indexSchedule, 1);
                            M.toast({ html: 'Schedule Remove' + '!', displayLength: 3000, classes: 'success' });
                            $scope.schedule.isSaving = false;
                            // $scope.schedule.list_schedules = result;
                        }, 2000);
                    })
                   
                    
                },

                openCloseDetailSchedule:function($index){
                    $scope.detailSchedule[$index] = !$scope.detailSchedule[$index];
                    $scope.schedule.initTimePicker()
                },

                save: function($index){
                    $scope.schedule.isSaving = true;
                    M.toast({ html: 'Saving...', displayLength: 3000, classes: 'note' });
                    $http({
                        method:'POST',
                        url: ngmAuth.LOCATION +'/api/custom/config/job',
                        data:{
                            data: $scope.schedule.list_schedules[$index].data
                        }
                    }).success(function(result){
                        $timeout(function () {
                            M.toast({ html: 'Schedule Added' + '!', displayLength: 3000, classes: 'success' });
                            $scope.schedule.isSaving = false;
                            $scope.schedule.list_schedules[$index] = result;
                        }, 2000);
                    })

                    

                }


            }

            // init project
            $scope.schedule.init();


        }

    ]);
