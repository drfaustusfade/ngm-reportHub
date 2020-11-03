/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomReportCtrl
 * @description
 * # CustomReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.custom.report', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('custom.report', {
                title: 'Custom Reports Form',
                description: 'Custom Reports Form',
                controller: 'CustomReportCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/report/form.html'
            });
    })
    .controller('CustomReportCtrl', [
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

            // page scrolled
						$scope._top_scrolled = 0

            // project
            $scope.project = {
								beneficiariesFormConfig: {
									"keys": { "key": "beneficiariesv1" },
									"beneficiariesv1": {
										"config": {
											"rows": [
													{
															"columns": [
																	{
																			"input_type": "select",
																			"class": "s12 m4 l4",
																			"id": "cluster_id",
																			"model": "cluster_id",
																			"name": "cluster_name",
																			"label": "Cluster/Unit *",
																			"options": "cluster.cluster_id as cluster.cluster_name for cluster in project.beneficiaries_lists.clusters",
																			"list": "clusters"
																	},
																	{
																			"input_type": "select",
																			"watch": "true",
																			"class": "s12 m4 l4",
																			"id": "cluster_project_id",
																			"name": "cluster_project_name",
																			"model": "cluster_project_id",
																			"label": "Project",
																			"options": "project.cluster_project_id as project.cluster_project_name for project in project.beneficiaries_lists.projects | filter: { cluster_id: beneficiary.cluster_id }:true",
																			"list": "projects",
																			"noselection": "true"
																	},
																	{
																			"input_type": "select",
																			"class": "s12 m4 l4",
																			"id": "donor_id",
																			"name": "donor_name",
																			"model": "donor_id",
																			"label": "Donor",
																			"options": "donor.donor_id as donor.donor_name for donor in project.beneficiaries_lists.donor",
																			"list": "donor",
																			"noselection": "true"
																	}
															]
													},
													{
														"columns": [
																{
																		"input_type": "select",
																		"class": "s12 m12 l12",
																		"id": "indicator_id",
																		"model": "indicator_id",
																		"name": "indicator_name",
																		"label": "Indicator *",
																		"options": "indicator.indicator_id as indicator.indicator_name for indicator in project.beneficiaries_lists.indicators | filter: { cluster_id: beneficiary.cluster_id }:true",
																		"list": "clusters",
																		"disabled": "!beneficiary.cluster_id",
																		"set_attributes": true
																}
														]
												},
												{
													"columns": [
															{
																	"input_type": "input",
																	"type": "number",
																	"id": "target",
																	"model": "target",
																	"label": "Target",
																	"min": "0",
																	"required": true
															}
													]
												},
												{
													"tag": "Target Groups",
													"style": "dotted",
													"columns": [
														{
																"input_type": "checkbox",
																"class": "s12 m4 l4",
																"id": "pwd",
																"model": "pwd",
																"label": "PWD"
														},
															{
																"input_type": "checkbox",
																"class": "s12 m4 l4",
																"id": "children",
																"model": "children",
																"label": "Children"
															},
															{
																"input_type": "checkbox",
																"class": "s12 m4 l4",
																"id": "returnee",
																"model": "returnee",
																"label": "Returnee"
															}
													]
												},
												{
													"tag": "Planned",
													"columns": [
														{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "planned_neutral",
																"model": "planned_neutral",
																"label": "Neutral",
																"min": "0",
																"required": true,
																"countTotal": true
														},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "planned_m_b",
																"model": "planned_m_b",
																"label": "M/B",
																"min": "0",
																"required": true,
																"countTotal": true
															},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "planned_w_g",
																"model": "planned_w_g",
																"label": "W/G",
																"min": "0",
																"required": true,
																"countTotal": true
															},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "planned_total",
																"model": "planned_total",
																"label": "Total",
																"min": "0",
																"required": true,
																"disabled": true
															}
													]
												},
												{
													"tag": "Acheived",
													"columns": [
														{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "achieved_neutral",
																"model": "achieved_neutral",
																"label": "Returnee",
																"min": "0",
																"required": true,
																"countTotal": true
														},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "achieved_m_b",
																"model": "achieved_m_b",
																"label": "M/B",
																"min": "0",
																"required": true,
																"countTotal": true
															},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "achieved_w_g",
																"model": "achieved_w_g",
																"label": "W/G",
																"min": "0",
																"required": true,
																"countTotal": true
															},
															{
																"input_type": "input",
																"class": "s12 m3 l3",
																"type": "number",
																"id": "achieved_total",
																"model": "achieved_total",
																"label": "Total",
																"min": "0",
																"required": true,
																"disabled": true
															}
													]
												},
												{
													"columns": [
															{
																	"input_type": "input",
																	"type": "text",
																	"id": "remarks",
																	"model": "remarks",
																	"label": "{{'remarks' | translate }}",
																	"placeholder": "{{ 'remarks_go_here' | translate }}",
																	"required": true
															}
													]
												},
												{
													"card": true,
													"columns": [
															{
																	"input_type": "textarea",
																	"type": "text",
																	"id": "justification",
																	"model": "justification",
																	"label": "Justification",
																	"required": true,
																	"classInput": "materialize-textarea"
															}
													]
												}
											]
									}
                                }
                            },
                            // configById: { "cluster_id": { "input_type": "select", "class": "s12 m4 l4", "id": "cluster_id", "model": "cluster_id", "name": "cluster_name", "label": "Cluster/Unit *", "options": "b.cluster_id as b.cluster_name for b in project.beneficiaries_lists.clusters", "list": "clusters" }, "cluster_project_id": { "input_type": "select", "watch": "true", "class": "s12 m4 l4", "id": "cluster_project_id", "name": "cluster_project_name", "model": "cluster_project_id", "label": "Project", "options": "b.cluster_project_id as b.cluster_project_name for b in project.beneficiaries_lists.projects | filter: { cluster_id: beneficiary.cluster_id }:true", "list": "projects", "noselection": "true" }, "donor_id": { "input_type": "select", "class": "s12 m4 l4", "id": "donor_id", "name": "donor_name", "model": "donor_id", "label": "Donor", "options": "b.donor_id as b.donor_name for b in project.beneficiaries_lists.donor", "list": "donor", "noselection": "true" } },

								// beneficiariesFormConfigKeys: { key: 'beneficiaries.v1' },

                /**** DEFAULTS ****/
                user: ngmUser.get(),
                style: config.style,
                definition: config.project,
                report: config.report,
                location_limit: config.report.locations.length,
                canEdit: ngmAuth.canDo('EDIT', { adminRpcode: config.project.adminRpcode, admin0pcode: config.project.admin0pcode, cluster_id: config.project.cluster_id, organization_tag: config.project.organization_tag }),
                updatedAt: moment(config.report.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a'),
                monthlyTitleFormat: moment.utc([config.report.report_year, config.report.report_month, 1]).format('MMMM, YYYY'),
                monthNameFormat: moment.utc([config.report.report_year, config.report.report_month, 1]).format('MMM'),
                previousMonth: moment.utc([config.report.report_year, config.report.report_month, 1]).subtract(1, 'month').format("MMMM, YYYY"),
                nonProjectDates: moment.utc(config.project.project_start_date).startOf('month') > moment.utc(config.report.reporting_period).startOf('month')
                    || moment.utc(config.project.project_end_date).endOf('month') < moment.utc(config.report.reporting_period).startOf('month'),

                // lists ( project, mpc transfers )
                lists: ngmCustomLists.setLists(config.project, moment(config.report.reporting_period).startOf('month'), moment(config.report.reporting_period).endOf('month'), 10),


                /**** TEMPLATES ****/

                // url
                templatesUrl: '/scripts/modules/custom/views/forms/report/',
                // templates
                locationsUrl: 'location.html',
                addLocationUrl: 'add.location.html',
                beneficiariesUrl: 'beneficiaries.html',
                // formBeneficiariesUrl: $scope.project.formBeneficiaries(),

                // init lists
                init: function () {

                    // sort locations
                    $scope.project.report.locations = $filter('orderBy')($scope.project.report.locations, ['site_type_name', 'admin1name', 'admin2name', 'admin3name', 'admin4name', 'admin5name', 'site_name']);
                    // set location / beneficiaries limits
                    $scope.project.setLocationsLimit($scope.project.lists, $scope.project.report.locations);
                    // set beneficiaries form
                    // ngmCustomBeneficiaries.setLocationsForm($scope.project.lists, $scope.project.report.locations);

                    // set list users
                    ngmCustomLists.setOrganizationUsersList($scope.project.lists, config.project);

                    $scope.detailBeneficiaries = {};
                    $scope.project.beneficiary_search;
                    $scope.beneficiary_search_input = false;


                    // SET LIST for Beneficiries;
                    $scope.project.beneficiaries_lists = ngmCustomConfig.getCustomBeneficiariesConfigLists($scope.project.definition.report_type_id, $scope.project.definition.version);
                    $scope.project.checkListBeneficiariesFromAPI()
                    // variable to indentify template type
                    $scope.templateBeneficiariesFormUrl = false;
                    $scope.templateBeneficiariesFormAPIString = false;
                    $scope.templateBeneficiariesFormAPIJSON = false;
                    // to get template Beneficiaries form
                    $scope.project.formBeneficiaries()





                    // page limits
                    angular.forEach($scope.project.report.locations, function (e, i) {
                        $scope.detailBeneficiaries[i] = $scope.project.report.locations[i].beneficiaries.length ?
                            new Array($scope.project.report.locations[i].beneficiaries.length).fill(false) : new Array(0).fill(false);
                        if ($scope.project.report.locations[i].beneficiaries.length) {
                            $scope.detailBeneficiaries[i][0] = true;
                        }
                    })
                },

                // sets title for each location / activity
                getBeneficiaryTitle: function ($locationIndex, $beneficiaryIndex) {
                    // beneficiary
                    var beneficiary = $scope.project.report.locations[$locationIndex].beneficiaries[$beneficiaryIndex];
                    // title
                    var title = beneficiary.activity_type_name;
                    // activity_description_id
                    if (beneficiary.activity_description_id) {
                        title += ', ' + beneficiary.activity_description_name;
                    }
                    // activity_detail_id
                    if (beneficiary.activity_detail_id) {
                        title += ', ' + beneficiary.activity_detail_name;
                    }
                    return title;
                },

                // set location / beneficiaries limits
                setLocationsLimit: function () {

                    // if beneficiaries, set init load limit to help rendering of elements on big forms
                    var set_limit = true;
                    $scope.project.limitToShowSearch = 0
                    angular.forEach($scope.project.report.locations, function (l, i) {
                        if (set_limit && l.beneficiaries.length) {
                            set_limit = false;
                            $scope.project.location_limit = i + 1;
                            $scope.project.limitToShowSearch = l.beneficiaries.length;
                        }
                    });

                    // if rendered all locations
                    if ($scope.project.report.locations.length === $scope.project.location_limit) {
                        $scope.project.allRendered = true;
                    }

                    // onscroll, update incrementLocationLimit
                    $window.onscroll = function () {

                        // if form is not fully rendered
                        if (!$scope.project.allRendered) {

                            // height, position
                            var top = $(window).scrollTop();

                            if (top > $scope._top_scrolled) {
                                // scroll down
                                // save total traversed from top
                                $scope._top_scrolled = top;
                                var scrollHeight = $(document).height();
                                var scrollPosition = $(window).height() + top;

                                // 0.50 of scrolling height, add location_limit
                                if ((scrollHeight - scrollPosition) / scrollHeight < 0.50) {
                                    // when scroll to bottom of the page
                                    $scope.project.incrementLocationLimitByOneAutoSelect();
                                }
                            }
                        }

                    }
                },

                // incrementLocationLimit by one location if using materializeSelect directive
                incrementLocationLimitByOneAutoSelect: function () {

                    // increment
                    if ($scope.project.report.locations.length > $scope.project.location_limit) {
                        $scope.project.location_limit += 1;
                        // timeout
                        $timeout(function () {
                            $scope.$apply();
                            // expand beneficiaries form
                            $scope.detailBeneficiaries[$scope.project.report.locations.length - 1] = [];
                            $scope.detailBeneficiaries[$scope.project.report.locations.length - 1][0] = true;
                        }, 0);
                    }

                    // if all rendered
                    if ($scope.project.report.locations.length === $scope.project.location_limit) {
                        // and all last location beneficiaries rendered
                        $scope.project.allRendered = true;
                    }

                },

                cancelEdit: function ($parent, $index) {
                    if (!$scope.project.report.locations[$parent].beneficiaries[$index].id) {
                        $scope.project.report.locations[$parent].beneficiaries.splice($index, 1);
                        // ngmCustomBeneficiaries.form[$parent].splice($index, 1);
                        //  ngmCustomBeneficiaries.updateSelectById('ngm-' + $parent);
                    }
                },

                // cancel monthly report
                cancel: function () {
                    $timeout(function () {
                        // $location.path('/cluster/adhoc-reports/new/'); 
                        $location.path('/custom/custom-reports/' + $scope.project.definition.id);
                    }, 400);
                },

                // save form on enter
                keydownSaveForm: function () {
                    $timeout(function () {
                        $('.editable-input').keydown(function (e) {
                            var keypressed = e.keyCode || e.which;
                            if (keypressed == 13) {
                                $('.save').trigger('click');
                            }
                        });
                    }, 0);
                },

                // update inidcators ( place into array on update )
                updateInput: function ($parent, $index, indicator, $data) {
                    $scope.project.report.locations[$parent].beneficiaries[$index][indicator] = $data;
                },

                // cofirm exit if changes
                modalConfirm: function (modal) {
                    // if not pristine, confirm exit
                    if (modal === 'complete-modal') {
                        // $( '#' + modal ).openModal( { dismissible: false } );
                        $('#' + modal).modal({ dismissible: false });
                        $('#' + modal).modal('open');
                    } else {
                        $scope.project.cancel();
                    }
                },

                // return monthly report title for location
                getReportTitle: function (target_location) {

                    // default admin 1,2
                    var title = '';

                    // location_type_id

                    // admin1, admin2
                    title += target_location.admin1name + ', ' + target_location.admin2name;

                    // admin levels 3,4,5
                    if (target_location.admin3name) {
                        title += ', ' + target_location.admin3name;
                    }
                    if (target_location.admin4name) {
                        title += ', ' + target_location.admin4name;
                    }
                    if (target_location.admin5name) {
                        title += ', ' + target_location.admin5name;
                    }

                    // site_name
                    title += ', ' + target_location.site_name;


                    return title;
                },


                /**** BENEFICIARIES ****/

                // add beneficiary
                addBeneficiary: function ($parent) {
                    var beneficiary = ngmCustomBeneficiaries.addAddHocBeneficiary($scope.project, $scope.project.report.locations[$parent], $scope.project.report.locations[$parent].beneficiaries);
                    $scope.project.setBeneficiary($parent, beneficiary);
                },

                setBeneficiary: function ($parent, beneficiary) {
                    // set implementing if location has set implementing partner;
                    $scope.project.report.locations[$parent].beneficiaries.push(beneficiary);
                    // Open card panel detail beneficiaries form
                    if (!$scope.detailBeneficiaries[$parent]) {
                        $scope.detailBeneficiaries[$parent] = [];
                    }
                    $scope.detailBeneficiaries[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1] = true;
                    // set form display for new rows
                    // ngmCustomBeneficiaries.setBeneficiariesInputs($scope.project.lists, $parent, $scope.project.report.locations[$parent].beneficiaries.length - 1, beneficiary);
                },

                // remove beneficiary nodal
                removeBeneficiaryModal: function ($parent, $index) {
                    // if ( ngmCustomValidation.validateBeneficiaries($scope.project.report.locations, $scope.detailBeneficiaries) ){
                    if (!$scope.project.report.locations[$parent].beneficiaries[$index].id) {
                        $scope.project.report.locations[$parent].beneficiaries.splice($index, 1);
                    } else {
                        $scope.project.locationIndex = $parent;
                        $scope.project.beneficiaryIndex = $index;
                        // $( '#beneficiary-modal' ).openModal({ dismissible: false });
                        $('#beneficiary-modal').modal({ dismissible: false });
                        $('#beneficiary-modal').modal('open');
                    }
                    // }
                },

                formBeneficiaries:function(){
                    var template = ngmCustomConfig.getCustomBeneficiariesConfigTemplate($scope.project.definition.report_type_id, $scope.project.definition.version)

                    // link_file = 'template-form-beneficiaries/'+template;
                    // if template is return string path file
                    if(typeof template === 'string'){
                        $scope.templateBeneficiariesFormUrl = true;
                        link_file = template;
                        return link_file;
                    }else{
                        // if template is return object that contain API
                        ngmData.get(template).then(function (result) {
                            if(!result.err){
                                if (result.type === 'html') {
                                    $scope.templateBeneficiariesFormAPIString = true;
                                    $scope.project.beneficiariesFormConfig = result.config;
                                }

                                if (result.type === 'json') {
                                    $scope.project.beneficiariesFormConfig = result.config
                                    $scope.templateBeneficiariesFormAPIJSON = true;
                                }

                            }
                            if (!result ||result === '') { 
                                
                                $scope.templateBeneficiariesFormAPInotDefined = true; 
                                M.toast({ html: 'Error! The form is not defined', displayLength: 6000, classes: 'error' });
                            }
                            
                        })
                    }
                   
                },
                
                // countTotalBeneficiary:function(total_attr,array_attribut_to_count,beneficiary){
                countTotalBeneficiary:function(beneficiary){
                    // beneficiary[total_attr] = 0;
                    
                    // angular.forEach(array_attribut_to_count,function(e){
                    //     beneficiary[total_attr] += beneficiary[e];
                    // })
                    
                    angular.forEach($scope.project.beneficiaries_lists.count,function(t){
                        beneficiary[t.total] = 0;
                        angular.forEach(t.property_count,function(p){
                            beneficiary[t.total] += beneficiary[p];
                        })
                    })
                },

                getTotalBeneficiary:function(beneficiary){
                    attr = ngmCustomConfig.getCustomBeneficiariesConfigTotal($scope.project.definition.report_type_id, $scope.project.definition.version)
                    return beneficiary[attr] ? beneficiary[attr]:0;
                    
                },

                countTotalBeneficiaryPerLocation:function(locationIndex){
                    var total_attr = ngmCustomConfig.getCustomBeneficiariesConfigTotal($scope.project.definition.report_type_id, $scope.project.definition.version);//attr;
                    var count = 0;
                    angular.forEach($scope.project.report.locations[locationIndex].beneficiaries,function(b){
                        if (b[total_attr]){
                            count+= b[total_attr]
                        }
                    })

                    return count;
                },

                checkedYesOrNo: function(beneficiary,att){
                    if(beneficiary[att] === 'yes'){
                        return true
                    }
                    return false
                },
                setYesOrNo: function (beneficiary, att, id) {

                    if (document.getElementById(id).checked) {
                        beneficiary[att] = 'yes'

                    }else{
                        beneficiary[att] ='no'
                    }

                    console.log(beneficiary[att])

                },

                checkListBeneficiariesFromAPI:function(){
                    var beneficiaries_lists_api = ngmCustomConfig.getCustomBeneficiariesConfig($scope.project.definition.report_type_id, $scope.project.definition.version).lists_api
                    // if (beneficiaries_lists_api.some_list_id) {
                    //     $http({
                    //         method: beneficiaries_lists_api.some_list_id.method,
                    //         url: beneficiaries_lists_api.some_list_id.api,
                    //         params: beneficiaries_lists_api.some_list_id.params
                    //     }).success(function (x) {
                    //         api_list = x[0].list
                    //         $scope.project.beneficiaries_lists = angular.merge({}, $scope.project.beneficiaries_lists, ...api_list)
                    //     })
                    // }
                    // second
                    var array_list_api=[];
                    if (beneficiaries_lists_api && Object.keys(beneficiaries_lists_api).length){
                        name_list = Object.keys(beneficiaries_lists_api)
                        for (i in beneficiaries_lists_api) {
                           var req= $http({
                                    method: beneficiaries_lists_api[i].method,
                                    url: beneficiaries_lists_api[i].api,
                                    params: beneficiaries_lists_api[i].params
                            });
                            array_list_api.push(req);
                        }
                        $q.all(array_list_api).then(function (result) { 
                            result_api ={}
                            for(i=0;i<name_list.length;i++){
                                result_api[name_list[i]]=result[i].data.list;
                            }
                            $scope.project.beneficiaries_lists = angular.merge({}, $scope.project.beneficiaries_lists, result_api)
                            
                        })
                    }
                },

                // remove beneficiary
                removeBeneficiary: function () {
                    var id = $scope.project.report.locations[$scope.project.locationIndex].beneficiaries[$scope.project.beneficiaryIndex].id;
                    $scope.project.report.locations[$scope.project.locationIndex].beneficiaries.splice($scope.project.beneficiaryIndex, 1);
                    // ngmCustomBeneficiaries.updateSelectById('ngm-' + $scope.project.locationIndex);
                    ngmCustomBeneficiaries.removeBeneficiaryAdhoc($scope.project, id);

                    // API to remove Beneficiary
                },


                // openClose: true,
                openCloseDetailBeneficiaries: function ($parent, $index) {
                    $scope.detailBeneficiaries[$parent][$index] = !$scope.detailBeneficiaries[$parent][$index];
                },


                // remove report modal
                removeReportModal: function () {
                    // $('#remove-report-modal').openModal({ dismissible: false });
                    $('#remove-report-modal').modal({ dismissible: false });
                    $('#remove-report-modal').modal('open');
                },

                // remove report
                removeReport: function () {
                    ngmCustomBeneficiaries.removeReportAdhoc($scope.project, $scope.project.report.id, function (err) {
                        if (!err) {
                            $timeout(function () {
                                $location.path('/custom/custom-reports/' + $scope.project.definition.id);
                            }, 400);
                        }
                    });
                },

                validateAddNewLocation: function () {
                    var result = ngmCustomValidation.validateAddNewLocationMonthlyReport(ngmCustomLocations.new_location)
                    if (result.complete) {
                        ngmCustomLocations.addAdhocNewLocation($scope.project, ngmCustomLocations.new_location);
                        $scope.project.incrementLocationLimitByOneAutoSelect()
                    } else {
                        var elements = result.divs
                        $(elements[0]).animatescroll();
                    };

                },
                validateBeneficiariesAdhocForm: function (complete, display_modal) {
                    var _prop = ngmCustomConfig.getCustomBeneficiariesConfigValidate($scope.project.definition.report_type_id, $scope.project.definition.version)//Object.keys(attr); 
                    if (ngmCustomValidation.validateBeneficiariesAdhoc($scope.project.report.locations, $scope.detailBeneficiaries, _prop)) {
                        if (complete) {
                            // $( '#complete-modal' ).openModal( { dismissible: false } );
                            $('#complete-modal').modal({ dismissible: false });
                            $('#complete-modal').modal('open');
                        } else if (display_modal) {
                            // $( '#save-modal' ).openModal( { dismissible: false } );
                            $('#save-modal').modal({ dismissible: false });
                            $('#save-modal').modal('open');
                        } else {
                            // arg1: set report status from 'todo' to 'complete' & re-direct
                            // arg2: save & re-direct
                            // arg3: alert admin via email of user edit of 'complete' report
                            $scope.project.save(false, false, false);
                        }
                    }
                },
                // save
                save: function (complete, display_modal) {
                    $scope.project.isSaving = true;
                    // set labels to active (green)
                    $('label').removeClass('invalid').addClass('active');
                    $('input').removeClass('invalid').addClass('active');
                    // if textarea
                    $('textarea[name="notes"]').removeClass('invalid').addClass('active');

                    // report
                    // $scope.project.report.submit = true;
                    $scope.project.report.report_status = complete ? 'complete' : 'todo';
                    $scope.project.report.report_submitted = moment().format();
                    // set validation to null after click button edit report
                    // if (!complete) {
                    //     if ($scope.project.report.report_validation) {
                    //         $scope.project.report.report_validation = null;
                    //     }
                    // }


                    // msg
                    // Materialize.toast( $filter('translate')('processing_report') , 6000, 'note');
                    M.toast({ html: $filter('translate')('processing_report'), displayLength: 6000, classes: 'note' });

                    // setReportRequest
                    var setReportRequest = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/report/setReport',
                        data: { report: $scope.project.report }
                    }

                    // set report
                    $http(setReportRequest).success(function (report) {


                        if (report.err) {
                            // update
                            $scope.project.isSaving = false;
                            M.toast({ html: 'Error! ' + $filter('translate')('please_correct_the_row_and_try_again'), displayLength: 6000, classes: 'error' });
                        }

                        if (!report.err) {

                            // updated report
                            $scope.project.report = report;
                            $scope.project.report.submit = false;

                            // sort locations
                            $scope.project.report.locations = $filter('orderBy')($scope.project.report.locations, ['site_type_name', 'admin1name', 'admin2name', 'admin3name', 'admin4name', 'admin5name', 'site_name']);

                            $scope.project.isSaving = false;

                            // user msg
                            var msg = $filter('translate')('project_report_for') + '  ' + moment.utc($scope.project.report.reporting_period).format('MMMM, YYYY') + ' ';
                            msg += complete ? $filter('translate')('submitted') + '!' : $filter('translate')('saved_mayus1') + '!';

                            // msg
                            $timeout(function () {
                                // Materialize.toast( msg , 6000, 'success');
                                M.toast({ html: msg, displayLength: 6000, classes: 'success' });
                            }, 400);

                            // set trigger
                            // $('.modal-trigger').leanModal();
                            $('.modal-trigger').modal();

                            // Re-direct to summary
                            if ($scope.project.report.report_status !== 'complete') {

                                // notification modal
                                if (display_modal) {
                                    $timeout(function () {
                                        $location.path('/custom/custom-reports/' + $scope.project.definition.id);

                                    }, 400);
                                }

                            } else {
                                $timeout(function () {
                                    $location.path('/custom/custom-reports/' + $scope.project.definition.id);

                                }, 400);
                            }
                        }
                    }).error(function (err) {
                        //                 } else {
                        // update
                        $scope.project.isSaving = false;
                        M.toast({ html: 'Error', displayLength: 6000, classes: 'error' });
                    });;

                }

            }

            // init project
            $scope.project.init();


        }

    ]);
