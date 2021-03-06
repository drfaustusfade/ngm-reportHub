/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:Dashboard4wplusCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('Dashboard4wPlusCtrl', [
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
			'ngmClusterHelper',
			'ngmClusterLists',
			'ngmLists',
			'$translate',
		function ( $scope, $q, $http, $location, $route, $rootScope, $window, $timeout, $filter, ngmUser, ngmAuth, ngmData, ngmClusterHelper, ngmClusterLists, ngmLists, $translate ) {
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
				startDate: moment( $route.current.params.start ) .format( 'YYYY-MM-DD' ),

				// report end
				endDate: moment( $route.current.params.end ).format( 'YYYY-MM-DD' ),

				// last update
				updatedAt: '',

				// current report
				report: $location.$$path.replace(/\//g, '_') + '-extracted-',

				// lists
				lists: {
					clusters: ngmClusterLists.getClusters( $route.current.params.admin0pcode ).filter(cluster=>cluster.filter!==false),
					admin1: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin1List : [],
					admin2: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin2List : [],
					admin3: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin3List : [],

				},




				// filtered data
				data: {
					cluster: false,
					admin1: false,
					admin2: false,
					admin3: false
				},

				menu_items: ngmAuth.getMenuParams('DASHBOARD'),

				menu: [{
					'id': 'search-region',
					'icon': 'person_pin',
					'title': $filter('translate')('region'),
					'class': 'teal lighten-1 white-text',
					'rows': [{
						'title': 'HQ',
						'param': 'adminRpcode',
						'active': 'hq',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/hq/all'
					},{
						'title': 'AFRO',
						'param': 'adminRpcode',
						'active': 'afro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/afro/all'
					},{
						'title': 'AMER',
						'param': 'adminRpcode',
						'active': 'amer',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/amer/all'
					},{
						'title': 'EMRO',
						'param': 'adminRpcode',
						'active': 'emro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/emro/all'
					},{
						'title': 'SEARO',
						'param': 'adminRpcode',
						'active': 'searo',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/searo/all'
					},{
						'title': 'WPRO',
						'param': 'adminRpcode',
						'active': 'wpro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/dashboard4wplus/wpro/all'
					}
					]
				}],

				// admin
				getPath: function( cluster_id, activity_type_id, organization_tag, project_type_component, hrpplan, implementer, donor, admin1pcode, admin2pcode, startDate, endDate  ){

					if ( cluster_id !== 'rnr_chapter' ) {

						//console.log(implementer);

						var path = '/cluster/dashboard4wplus/' + $scope.dashboard.adminRpcode +
																	'/' + $scope.dashboard.admin0pcode +
																	'/' + admin1pcode +
																	'/' + admin2pcode +
																	'/' + cluster_id +
																	'/' + activity_type_id +
																	'/' + organization_tag +
																	'/' + project_type_component +
																    '/' + hrpplan +
																	'/' + implementer +
																	'/' + donor +
																//	'/' + $scope.dashboard.beneficiaries.join('+') +
																	/*'/' + $scope.dashboard.startDate +
																	'/' + $scope.dashboard.endDate;*/
																	'/'+startDate+
																	'/'+endDate;
					} else {
						var path = '/cluster/dashboard4wplus/' + $scope.dashboard.adminRpcode +
																	'/' + $scope.dashboard.admin0pcode +
																	'/' + admin1pcode +
																	'/' + admin2pcode +
																	'/' + cluster_id +
																	'/' + activity_type_id +
																	'/' + organization_tag +
																	'/' + project_type_component +
																	'/' + hrpplan +
																	'/' + implementer +
																	'/' + donor +
																	'/returnee_undocumented+returnee_documented+refugee_pakistani' +
																	'/' + $scope.dashboard.startDate +
																	'/' + $scope.dashboard.endDate;
					}

					return path;
				},

        // set URL based on user rights
				setUrl: function(){

					// get url
					var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );

					// if current location is not equal to path
					if ( path !== $location.$$path ) {
						$location.path( path );
					}

				},

				//
				getRequest: function( obj ){
					//console.log("GET REQUEST",obj);
					//console.log("ACTIVITY TYPE ID",$scope.dashboard.activity_type_id);

					var request = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/indicator4wplusdashboard',
						data: {
							adminRpcode: $scope.dashboard.adminRpcode,
							admin0pcode: $scope.dashboard.admin0pcode,
							admin1pcode: $scope.dashboard.admin1pcode,
							admin2pcode: $scope.dashboard.admin2pcode,
							cluster_id: $scope.dashboard.cluster_id,
							organization_tag: $scope.dashboard.organization_tag,
							project_type_component: $scope.dashboard.project_type_component,
							hrpplan: $scope.dashboard.hrpplan,
							implementer: $scope.dashboard.implementer_tag,
							donor: $scope.dashboard.donor_tag,
							activity_type_id: $scope.dashboard.activity_type_id,


							//beneficiaries: $scope.dashboard.beneficiaries,
							start_date: $scope.dashboard.startDate,
							end_date: $scope.dashboard.endDate,

							//exchange rate from COP to USD
							cop: 3200,
							//exchange rate from EUR to USD
							eur: $scope.dashboard.eurotousd
						}
					}


					request.data = angular.merge(request.data, obj);
					//console.log("DATA: ", request.data);


					return request;
				},

				newgetRequest: function( obj ){
					//console.log("GET REQUEST",obj);
					//console.log("ACTIVITY TYPE ID",$scope.dashboard.activity_type_id);
					$scope.dashboard.beneficiaries = ["all"];

					var request = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/indicator',
						data: {
							adminRpcode: $scope.dashboard.adminRpcode,
							admin0pcode: $scope.dashboard.admin0pcode,
							admin1pcode: $scope.dashboard.admin1pcode,
							admin2pcode: $scope.dashboard.admin2pcode,
							cluster_id: $scope.dashboard.cluster_id,
							organization_tag: $scope.dashboard.organization_tag,
							activity_type_id: $scope.dashboard.activity_type_id,
							donor: $scope.dashboard.donor_tag,
							implementer: $scope.dashboard.implementer_tag,
							project_type_component: $scope.dashboard.project_type_component,
							hrpplan: $scope.dashboard.hrpplan,
							beneficiaries: $scope.dashboard.beneficiaries,
							start_date: $scope.dashboard.startDate,
							end_date: $scope.dashboard.endDate,
						}
					}


					request.data = angular.merge(request.data, obj);
					//console.log("DATA: ", request.data);


					return request;
				},

				//activitiesActivityType = getRequest( { list: true, indicator: 'activities_activity_type'}),


				// metrics
				getMetrics: function( theme, format ){
					return {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/metrics/set',
						data: {
							organization: $scope.dashboard.user.organization,
							username: $scope.dashboard.user.username,
							email: $scope.dashboard.user.email,
							dashboard: 'cluster_dashboard',
							theme: theme,
							format: format,
							url: $location.$$path
						}
					}
				},

				// downloads
				getDownloads: function(){

					var downloads = [
					/*{
						id: 'cluster_dashboard_pdf',
						type: 'pdf',
						color: 'blue',
						icon: 'picture_as_pdf',
						hover: $filter('translate')('download_dashboard_as_pdf'),
						request: {
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/print',
							data: {
								report:  $scope.dashboard.cluster_id + '_cluster_dashboard-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ),
								printUrl: $location.absUrl(),
								downloadUrl: ngmAuth.LOCATION + '/report/',
								user: $scope.dashboard.user,
								pageLoadTime: $scope.dashboard.pageLoadTime,
								viewportWidth: 1400
							}
						},
						metrics: $scope.dashboard.getMetrics( 'cluster_dashboard_pdf', 'pdf' )
					},{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'call',
						hover: $filter('translate')('download_cluster_contact_list_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'contacts', report: $scope.dashboard.cluster_id_filename + '_contacts_list-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_contact_list', 'csv' )
					},{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'assignment_turned_in',
						hover: $filter('translate')('download_ocha_hrp_report_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'ocha_report', report: $scope.dashboard.cluster_id_filename + '_ocha_hrp_report-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_ocha_report', 'csv' )
					},*/{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'attach_money',
						hover: $filter('translate')('download_ocha_financial_report_as_csv'),
						request: $scope.dashboard.newgetRequest( { csv: true, indicator: 'financial_report', report: $scope.dashboard.cluster_id_filename + '_ocha_financial_report-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_financial_report', 'csv' )
					}/*,{
						id: 'training_participants',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'wc',
						hover: $filter('translate')('download_training_participants_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'training_participants', report: $scope.dashboard.cluster_id_filename + '_training_participants_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'training_participants', 'csv' )
					},*/,{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'group',
						hover: $filter('translate')('download_beneficiary_data_as_csv'),
						request: $scope.dashboard.newgetRequest( { csv: true, indicator: 'beneficiaries', report:  $scope.dashboard.cluster_id_filename + '_beneficiary_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'beneficiary_data', 'csv' )
					}/*,{
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'show_chart',
						hover: $filter('translate')('download_stock_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'stocks', report: $scope.dashboard.cluster_id_filename + '_stock_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'stocks', 'csv' )
					}];

					// ng wash dls
					var ng_wash_dl = [{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'compare_arrows',
						hover: $filter('translate')('download_accountability_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'accountability', report: $scope.dashboard.activity_filename + $scope.dashboard.cluster_id_filename + '_accountability_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'accountability_data', 'csv' )
					},{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'radio_button_checked',
						hover: $filter('translate')('download_borehol_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'boreholes', report: $scope.dashboard.cluster_id_filename + '_boreholes_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'borehole_data', 'csv' )
					},{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'local_activity',
						hover: $filter('translate')('download_cash_programming_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'cash', report: $scope.dashboard.cluster_id_filename + '_cash_programming-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cash_programming', 'csv' )
					},{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'spa',
						hover: $filter('translate')('download_hygiene_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'hygiene', report: $scope.dashboard.cluster_id_filename + '_hygiene_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'hygiene_data', 'csv' )
					},{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'wc',
						hover: $filter('translate')('download_sanitarian_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'sanitation', report: $scope.dashboard.cluster_id_filename + '_sanitation_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'sanitation_data', 'csv' )
					},{
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'local_drink',
						hover: $filter('translate')('download_water_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'water', report: $scope.dashboard.cluster_id_filename + '_water_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'water_data', 'csv' )
					}*/];

					// NG, wash and Admin
					if ( $scope.dashboard.admin0pcode === 'ng' &&
								$scope.dashboard.cluster_id === 'wash' &&
							(	$scope.dashboard.user.roles.indexOf( 'ADMIN' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'COUNTRY_ADMIN' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'CLUSTER' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'SUPERADMIN' ) !== -1
							)
						) {
						downloads = downloads.concat ( ng_wash_dl );
					}

					// blocking download
					const canDownload = ngmAuth.canDo( 'DASHBOARD_DOWNLOAD', {
															adminRpcode: $scope.dashboard.adminRpcode ? $scope.dashboard.adminRpcode.toUpperCase():'',
															admin0pcode: $scope.dashboard.admin0pcode ? $scope.dashboard.admin0pcode.toUpperCase():'',
															cluster_id: $scope.dashboard.cluster_id,
															organization_tag: $scope.dashboard.organization_tag } )
					// filter downloads list
					if (!canDownload){
						downloads = downloads.filter(x => x.id === 'cluster_dashboard_pdf')
					}
					return downloads;
				},

				//
				setMenu: function(){

					// rows
					var orgRows = [],
							clusterRows = [],
							project_type_componentRows = [],
							ishrpoptions = [],
							provinceRows = [],
							districtRows = [],
							activitiesRows = [],
							yearRows = [],
							implementingPartnersRows = [],
							donorsRows = [],



						//	request = $scope.dashboard.getRequest( { list: true, indicator: 'organizations' } );
						request = $scope.dashboard.getRequest( { list: true, indicator: 'organizations_4wplusdashboard' } );
						//console.log("REQUEST: ",request);



					if ($scope.dashboard.menu_items.includes('adminRpcode')){
						$scope.model.menu = $scope.dashboard.menu;
					}

					if ($scope.dashboard.menu_items.includes('admin0pcode')){
						if ( $scope.dashboard.adminRpcode !== 'hq' ) {

							var menu = {
								'afro': {
									'id': 'search-country',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Democratic Republic of Congo',
										'param': 'admin0pcode',
										'active': 'cd',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/afro/cd'
									},{
										'title': 'Ethiopia',
										'param': 'admin0pcode',
										'active': 'et',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/afro/et'
									},{
										'title': 'Nigeria',
										'param': 'admin0pcode',
										'active': 'ng',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/afro/ng'
									},{
										'title': 'South Sudan',
										'param': 'admin0pcode',
										'active': 'ss',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/afro/ss'
									}]
								},
								'emro': {
									'id': 'search-country',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Afghanistan',
										'param': 'admin0pcode',
										'active': 'af',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/emro/af'
									},{
										'title': 'Iraq',
										'param': 'admin0pcode',
										'active': 'iq',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/emro/iq'
									},{
										'title': 'Somalia',
										'param': 'admin0pcode',
										'active': 'so',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/emro/so'
									},{
										'title': 'Syria',
										'param': 'admin0pcode',
										'active': 'sy',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/emro/sy'
									},{
										'title': 'Yemen',
										'param': 'admin0pcode',
										'active': 'ye',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/emro/ye'
									}]
								},
								'searo': {
									'id': 'search-country',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Bangladesh',
										'param': 'admin0pcode',
										'active': 'bd',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/searo/bd'
									},{
										'title': 'Cox Bazar',
										'param': 'admin0pcode',
										'active': 'cb',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/searo/cb'
									}]
								},
								'amer': {
									'id': 'search-country',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),

									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Colombia',
										'param': 'admin0pcode',
										'active': 'col',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/amer/col'
									}]
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
										'href': '/desk/#/cluster/dashboard4wplus/wpro/pg'
									},{
										'title': 'Philippines',
										'param': 'admin0pcode',
										'active': 'phl',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/dashboard4wplus/wpro/phl'
									}]
								}
							}
							$scope.model.menu.push(menu[$scope.dashboard.adminRpcode]);
						}
					}

					// get orgs
					ngmData.get( request ).then( function( organizations  ){


						/*if($scope.dashboard.user.roles.indexOf('COUNTRY_ADMIN')  !== -1  )  {


						 		$scope.dashboard.organization_tag = 'all';

					       }else{
                      }*/

						// set organization
						if ( $scope.dashboard.organization_tag !== 'all' ) {
							var org = $filter( 'filter' )( organizations, { organization_tag: $scope.dashboard.organization_tag } );
							if ( org.length ) {
								$scope.dashboard.organization = org[0].organization;
								$scope.dashboard.setTitle();
								$scope.dashboard.setSubtitle();
							}
						}

						//years
						yearsList = [
						{'year_id':'2010','year_name':'2010'},
						{'year_id':'2011','year_name':'2011'},
						{'year_id':'2012','year_name':'2012'},
						{'year_id':'2013','year_name':'2013'},
						{'year_id':'2014','year_name':'2014'},
						{'year_id':'2015','year_name':'2015'},
						{'year_id':'2016','year_name':'2016'},
						{'year_id':'2017','year_name':'2017'},
						{'year_id':'2018','year_name':'2018'},
						{'year_id':'2019','year_name':'2019'},
						{'year_id':'2020','year_name':'2020'},
						{'year_id':'2021','year_name':'2021'},
						{'year_id':'2022','year_name':'2022'},
						{'year_id':'2023','year_name':'2023'},
						{'year_id':'2024','year_name':'2024'},
						{'year_id':'2025','year_name':'2025'},
						{'year_id':'2026','year_name':'2026'},
						{'year_id':'2027','year_name':'2027'},
						{'year_id':'2028','year_name':'2028'},
						{'year_id':'2029','year_name':'2029'},
						{'year_id':'2030','year_name':'2030'}];

						angular.forEach( yearsList, function(d,i){

							//startDate = moment( d.year_id+'-01-01' ) .format( 'YYYY-MM-DD' );
							startDate = moment(new Date(d.year_id+'-01-01')).format('YYYY-MM-DD')

							endDate = moment( d.year_id+'-12-31' ) .format( 'YYYY-MM-DD' );

							var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, startDate, endDate);


							yearRows.push({
								'title':d.year_name,
								'param':'year_id',
								'active':d.year_id,
								'class':'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': '/desk/#' + path,

							});

						});

						$scope.model.menu.push({
							'search': true,
							'id': 'search-cluster-year',
							'icon': 'date_range',
							'title': $filter('translate')('year'),
							'class': 'teal lighten-1 white-text',
							'rows': yearRows
						});


						// clusters
						$scope.dashboard.lists.clusters.unshift({ cluster_id: 'all', cluster: $filter('translate')('all_mayus') });
						angular.forEach( $scope.dashboard.lists.clusters, function(d,i){
							var path = $scope.dashboard.getPath( d.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode , $scope.dashboard.startDate, $scope.dashboard.endDate);
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
							'title': $filter('filter')('cluster'),
							'class': 'teal lighten-1 white-text',
							'rows': clusterRows
						});



						// organizations
						organizations.forEach(function( d, i ){
							if ( d ) {
								var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, d.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
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
						//if ($scope.dashboard.menu_items.includes('organization_tag') && $scope.dashboard.user.username !== 'welcome') {

							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-organization',
								'icon': 'supervisor_account',
								'title': $filter('translate')('executor'),
								'class': 'teal lighten-1 white-text',
								'rows': orgRows
							});


					   // };



					   //implementing_partners

					 implementingPartners = $scope.dashboard.getRequest({list:true, indicator: 'implementing_partners'});

					ngmData.get( implementingPartners ).then( function( partners  ){

						  	partners.data.unshift({
												id : 'all',
						   		organization_tag: 'all',
						   		organization: $filter('translate')('all_mayus'),
						   		organization_type:'all',
						   		admin0pcode:'COL',
						   		organization_name : $filter('translate')('all_mayus')
										});
						  	///console.log("ACTIVIDADES: ",partners.data);


						angular.forEach(partners.data,function(d,i){
					   		if(d){
					   			var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, d.organization_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate);
					   			implementingPartnersRows.push({
					   				'title':d.organization,
					   				'param':'organization_tag',
					   				'active':d.organization_tag,
					   				'class':'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					   				'href':'/desk/#'+path

					   			});

					   		}


					   	});

					   		//console.log("PARTNERS ROWS: ",implementingPartnersRows);


					   		$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-implementingpartners',
								'icon': 'people',
								'title': $filter('translate')('implementer'),
								'class': 'teal lighten-1 white-text',
								'rows': implementingPartnersRows
							});
							//console.log("MENU: ",$scope.model.menu);

					   	if ( $scope.dashboard.implementer_tag !== 'all' ) {
							var implementer_tag = $filter( 'filter' )( partners.data, { organization_tag: $scope.dashboard.implementer_tag } );
							if ( implementer_tag.length ) {
								$scope.dashboard.implementer_tag = implementer_tag[0].organization_tag;

							}
						}



					});



					   	//DONORS



					//donorsProject = $scope.dashboard.getRequest({list:true, indicator: 'project_donors'});

					ngmData.get( $scope.dashboard.donorsProject ).then( function( donors  ){
					//	console.log("DONANTES: ",donors.data);

						 	donors.data.unshift({
								project_donor_id : 'all',
						   		project_donor_name: $filter('translate')('all_mayus'),

								})

						angular.forEach(donors.data,function(d,i){
					   		if(d){
					   			var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, d.project_donor_id, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate);
					   		 donorsRows.push({
					   				'title':d.project_donor_name,
					   				'param':'project_donor_id',
					   				'active':d.project_donor_id,
					   				'class':'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
					   				'href':'/desk/#'+path

					   			});

					   		}


					   	});

					   		//console.log("DONORS ROWS: ",donorsRows);


					   		$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-donorsproject',
								'icon': 'attach_money',
								'title': $filter('translate')('donor'),
								'class': 'teal lighten-1 white-text',
								'rows': donorsRows
							});
						//	console.log("MENU: ",$scope.model.menu);

					   	if ( $scope.dashboard.donor_tag !== 'all' ) {
							var donor_tag = $filter( 'filter' )( donors.data, { project_donor_id: $scope.dashboard.donor_tag } );
							if ( donor_tag.length ) {
								$scope.dashboard.donor_tag = donor_tag[0].project_donor_id;

							}
						}


					});


					  //Activity Type

					   activitiesActivityType = $scope.dashboard.getRequest( { list: true, indicator: 'activities_activity_type'});

					   ngmData.get( activitiesActivityType ).then( function( activities  ){

					   	activities.data.unshift({
					   		activity_type_id: 'all',
					   		activity_type_name: $filter('translate')('all_mayus')

					   	});


					   	angular.forEach(activities.data , function(d,i){


					   if(d){
					    		var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, d.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate)
                                activitiesRows.push({
                                	'title': d.activity_type_name,
                                	'param': 'activity_type_id',
                                	'active': d.activity_type_id,
                                	'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                	'href': '/desk/#'+path

                                });
					    	}
					    });




							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-activitytype',
								'icon': 'supervisor_account',
								'title': $filter('translate')('activity_type'),
								'class': 'teal lighten-1 white-text',
								'rows': activitiesRows
							});

							if ( $scope.dashboard.activity_type_id !== 'all' ) {
							var activity_type = $filter( 'filter' )( activities.data, { activity_type_id: $scope.dashboard.activity_type_id } );
							if ( activity_type.length ) {
								//$scope.dashboard.hrpplan = hrpoption[0].option_id;
								$scope.dashboard.activity_type_title = activity_type[0].activity_type_name;
								$scope.dashboard.setTitle();
								$scope.dashboard.setSubtitle();
							}
						}

					   });

					   //Project Type component

					  if($scope.dashboard.admin0pcode === 'col'){


					  project_type_components_list = [
					   {project_type_component_id:'all',project_type_component_name:$filter('translate')('all_mayus')},
					   {project_type_component_id:'hrp_plan',project_type_component_name:'Humanitario'},
					   {project_type_component_id:'interagencial_plan',project_type_component_name:'Paz y Desarrollo'},
					   {project_type_component_id:'rmrp_plan',project_type_component_name:'Flujos Migratorios Mixtos'}
					   ];

					   }else{
					   	project_type_components_list = [
						   {project_type_component_id:'all',project_type_component_name:$filter('translate')('all_mayus')}
						   ]

					   }



					   angular.forEach( project_type_components_list, function(d,i){
							var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, d.project_type_component_id, $scope.dashboard.hrpplan , $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
							project_type_componentRows.push({
								'title': d.project_type_component_name,
								'param': 'project_type_component_id',
								'active': d.project_type_component_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': '/desk/#' + path
							});
						});

							$scope.model.menu.push({
								'search': false,
								'id': 'search-cluster-projecttypecomponent',
								'icon': 'supervisor_account',
								'title': $filter('translate')('project_type'),
								'class': 'teal lighten-1 white-text',
								'rows': project_type_componentRows
							});

							// set hrpplan
						if ( $scope.dashboard.project_type_component !== 'all' ) {
							var projtypecomp = $filter( 'filter' )( project_type_components_list, { project_type_component_id: $scope.dashboard.project_type_component } );
							//console.log(hrpoption);
							if ( projtypecomp.length ) {
								$scope.dashboard.project_type_component = projtypecomp[0].project_type_component_id;
								/*$scope.dashboard.hrpplantitle = hrpoption[0].option_name;
								$scope.dashboard.setTitle();
								$scope.dashboard.setSubtitle();*/
							}
						}








					    //is hrp ?

						if($scope.dashboard.admin0pcode === 'col'){
					    	 ishrpoptionsList = [
								    {'option_name':$filter('translate')('all_mayus'),'option_id':'all'}
								    ,{'option_name': 'Si','option_id':true},
								    {'option_name': 'No','option_id':false}
								    ];
					    }else{


					    	ishrpoptionsList = [{'option_name':$filter('translate')('all_mayus'),'option_id':'all'}];


       					 };


					    //console.log("FECHA INICIO EN HRP OPTIONS: ",$scope.dashboard.startDate);
					    angular.forEach( ishrpoptionsList, function(d,i){
							var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, d.option_id, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
							ishrpoptions.push({
								'title': d.option_name,
								'param': 'option_id',
								'active': d.option_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': '/desk/#' + path
							});
						});

							$scope.model.menu.push({
								'search': false,
								'id': 'search-cluster-ishrpoption',
								'icon': 'supervisor_account',
								'title': 'HRP ?',
								'class': 'teal lighten-1 white-text',
								'rows': ishrpoptions
							});

							// set hrpplan
						if ( $scope.dashboard.hrpplan !== 'all' ) {
							var hrpoption = $filter( 'filter' )( ishrpoptionsList, { option_id: $scope.dashboard.hrpplan } );
							//console.log(hrpoption);
							if ( hrpoption.length ) {
								$scope.dashboard.hrpplan = hrpoption[0].option_id;
								$scope.dashboard.hrpplantitle = hrpoption[0].option_name;
								$scope.dashboard.setTitle();
								$scope.dashboard.setSubtitle();
							}
						}





						// if country selected
						if ( $scope.dashboard.admin0pcode !== 'all' ) {

							// admin1
							var admin1List = $filter( 'filter' )( $scope.dashboard.lists.admin1, { admin0pcode: $scope.dashboard.admin0pcode.toUpperCase() }, true );
							// add all
							admin1List.unshift({
								admin1pcode: 'all',
								admin1name: $filter('translate')('all_mayus'),
							});
							angular.forEach( admin1List, function(d,i){
								var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, d.admin1pcode, 'all', $scope.dashboard.startDate, $scope.dashboard.endDate );
								provinceRows.push({
									'title': d.inactive ? d.admin1name + ' (Old)' : d.admin1name,
									'param': 'admin1pcode',
									'active': d.admin1pcode,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								});
							});
							var title = $filter( 'filter' )( $scope.dashboard.lists.admin1, { admin0pcode: $scope.dashboard.admin0pcode.toUpperCase() }, true )[0];
							$scope.dashboard.admin1type_name = title.admin1type_name;

							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-admin1',
								'icon': 'location_on',
								'title': title.admin1type_name,
								'class': 'teal lighten-1 white-text',
								'rows': provinceRows
							});

						}

						// if country selected
						if ( $scope.dashboard.admin1pcode !== 'all' ) {

							// admin1
							var admin2List = $filter( 'filter' )( $scope.dashboard.lists.admin2, { admin1pcode: $scope.dashboard.admin1pcode.toUpperCase() }, true );
							// add all
							admin2List.unshift({
								admin2pcode: 'all',
								admin2name: $filter('translate')('all_mayus'),
							});
							angular.forEach( admin2List, function(d,i){
								var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id,  $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, d.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
								districtRows.push({
									'title': d.admin2name,
									'param': 'admin2pcode',
									'active': d.admin2pcode,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								});
							});
							var title = $filter( 'filter' )( $scope.dashboard.lists.admin2, { admin1pcode: $scope.dashboard.admin1pcode.toUpperCase() }, true )[0];
							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-admin2',
								'icon': 'location_on',
								'title': title.admin2type_name,
								'class': 'teal lighten-1 white-text',
								'rows': districtRows
							});

						}

					});

				},

				setCluster: function(){
					if ( $scope.dashboard.cluster_id === 'cvwg' ) {
						$scope.dashboard.cluster = { cluster_id: 'cvwg', cluster: 'MPC' };
					} else {
						$scope.dashboard.cluster = $filter( 'filter' )( $scope.dashboard.lists.clusters,
														{ cluster_id: $scope.dashboard.cluster_id }, true )[0];

					//	$scope.dashboard.activitiesActivityType = $scope.dashboard.getRequest( { list: true, indicator: 'activities_activity_type'});

					}
				},

				// filter
				setAdmin1: function(){
					$scope.dashboard.data.admin1 = $filter( 'filter' )( $scope.dashboard.lists.admin1,
														{ admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
															admin1pcode: $scope.dashboard.admin1pcode }, true )[0];
				},

				setAdmin2: function(){
					$scope.dashboard.data.admin2 = $filter( 'filter' )( $scope.dashboard.lists.admin2,
														{ admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
															admin1pcode: $scope.dashboard.admin1pcode,
															admin2pcode: $scope.dashboard.admin2pcode }, true )[0];
				},

				//
				setTitle: function(){
					// title
					//$scope.dashboard.title = $filter('translate')('4W')
					$scope.dashboard.title = $filter('translate')('activities_dashboard');

					// admin0
					if ( $scope.dashboard.admin0pcode === 'all' ) {
						//$scope.dashboard.title = $filter('translate')('4W')+' | ' + $scope.dashboard.adminRpcode.toUpperCase()
					   $scope.dashboard.title = $filter('translate')('activities_dashboard')+ ' | ' + $scope.dashboard.adminRpcode.toUpperCase()

					}

					if ( $scope.dashboard.admin0pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.admin0pcode.toUpperCase();
					}
					// cluster
					if ( $scope.dashboard.cluster_id !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.cluster.cluster.toUpperCase();
					}

					// org
					if ( $scope.dashboard.organization_tag !== 'all' ) {
						var org = $scope.dashboard.organization ? ' | ' + $scope.dashboard.organization : '';
						$scope.dashboard.title += org;
					}
					// admin1
					if ( $scope.dashboard.admin1pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.data.admin1.admin1name;
					}
					// admin2
					if ( $scope.dashboard.admin2pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.data.admin2.admin2name;
					}
					// update of rendered title
					if ( $scope.model.header && $scope.model.header.title ){
						$scope.model.header.title.title = $scope.dashboard.title;
					}

				},


				// subtitle
				setSubtitle: function(){
					// subtitle
					//$scope.dashboard.subtitle = $filter('translate')('4WDASHBOARD')+' '+ $filter('translate')('for')+' ';
					$scope.dashboard.subtitle = $filter('translate')('activities_dashboard') +' ' + $filter('translate')('for')+' ';

					// admin0
					if ( $scope.dashboard.admin0pcode === 'all' ) {
						//$scope.dashboard.subtitle = $filter('translate')('4WDASHBOARD')+' '+ $filter('translate')('for') + ' ' + $scope.dashboard.adminRpcode.toUpperCase();
						$scope.dashboard.subtitle = $filter('translate')('activities_dashboard')+ ' '+ $filter('translate')('for') + ' ' + $scope.dashboard.adminRpcode.toUpperCase();

					}

					if ( $scope.dashboard.admin0pcode !== 'all' ) {
						$scope.dashboard.subtitle +=  $scope.dashboard.admin0pcode.toUpperCase();
					}
					// cluster
					if ( $scope.dashboard.cluster_id === 'all' ) {
						$scope.dashboard.subtitle += ', '+$filter('translate')('all_clusters');
					}	else {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.cluster.cluster.toUpperCase() + ' cluster';
					}

							// activity
					if ( $scope.dashboard.activity_type_id !== 'all' ) {
						$scope.dashboard.subtitle += ' , ' +$filter('translate')('activity_type')+': '+ $scope.dashboard.activity_type_title;

					}

					// org
					if ( $scope.dashboard.organization_tag === 'all' ) {
						$scope.dashboard.subtitle += ', '+ $filter('translate')('all_organizations');
					} else {
						var org =  $scope.dashboard.organization ? ', ' + $scope.dashboard.organization + ' ' + $filter('translate')('organization') : '';
						$scope.dashboard.subtitle += org;
					}

					// admin1
					if ( $scope.dashboard.admin1pcode === 'all' ) {
						$scope.dashboard.subtitle += ', '+ $filter('translate')('all_provinces');
					} else {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin1.admin1name.toUpperCase() + ' '+ $filter('translate')('province');
					}
					// admin2
					if ( $scope.dashboard.admin2pcode !== 'all' ) {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin2.admin2name.toUpperCase() + ' ' + $filter('translate')('district');
					}
					// update of rendered title
					if ( $scope.model.header && $scope.model.header.subtitle ){
						$scope.model.header.subtitle.title = $scope.dashboard.subtitle;
					}
				},

				// set dashboard
				init: function(){

					// variables
					$scope.dashboard.adminRpcode = $route.current.params.adminRpcode;
					$scope.dashboard.admin0pcode = $route.current.params.admin0pcode;
					$scope.dashboard.admin1pcode = $route.current.params.admin1pcode;
					$scope.dashboard.admin2pcode = $route.current.params.admin2pcode;
					$scope.dashboard.cluster_id = $route.current.params.cluster_id;
					$scope.dashboard.organization_tag = $route.current.params.organization_tag;
					$scope.dashboard.project_type_component = $route.current.params.project_type_component;
					$scope.dashboard.hrpplan = $route.current.params.hrpplan;
					$scope.dashboard.implementer_tag = $route.current.params.implementer_tag;
					$scope.dashboard.donor_tag = $route.current.params.donor_tag;
				//	$scope.dashboard.beneficiaries = $route.current.params.beneficiaries.split('+');
					$scope.dashboard.activity_type_id = $route.current.params.activity_type_id;

					$scope.dashboard.donorsProject = $scope.dashboard.getRequest({list:true, indicator: 'project_donors'});


					// plus dashboard_visits
					$scope.dashboard.user.dashboard_visits++;
					localStorage.setObject( 'auth_token', $scope.dashboard.user );
					ngmLists.setObject( 'auth_token', $scope.dashboard.user );

					// report name
					$scope.dashboard.report += moment().format( 'YYYY-MM-DDTHHmm' );



					// filename cluster needs to be mpc for cvwg
					// TODO refactor/update cvwg
					$scope.dashboard.cluster_id_filename = $scope.dashboard.cluster_id !== 'cvwg' ? $scope.dashboard.cluster_id : 'mpc';

					if ($route.current.params.organization_tag!=='all'){
						$scope.dashboard.cluster_id_filename = $route.current.params.organization_tag + '_' + $scope.dashboard.cluster_id_filename;
					}

					if($scope.dashboard.admin0pcode === 'col'){
						$scope.dashboard.finalnote = 'Nota: Los valores que requieran cambio de moneda de Pesos Colombianos (COP) a Dólar Estadounidense (USD) se calculan actualmente con tasa de cambio de $3.200 COP por cada $1 USD. Y los valores que requieran cambio de moneda de Euros (EUR) a Dólar Estadounidense (USD) se basan en la tasa de cambio del día.' + '</p>'
					}
					else{
						$scope.dashboard.finalnote = '';
					}

					/*$scope.dashboard.beneficiaries_row = [

					{
						styleClass: 's12 m12 l6',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('other_implementing_partners'),
								request: $scope.dashboard.getRequest({ indicator: 'total_implementing_partners_4wplus' })
							}
						}]
					},
					{
						styleClass: 's12 m12 l6',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('donors'),
								request: $scope.dashboard.getRequest({ indicator: 'total_donors_4wplusdashboard' })
							}
						}]
					} ];*/



					// model
					$scope.model = {
						name: 'cluster_dashboard',
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
								'class': 'col hide-on-small-only m7 l9 report-subtitle truncate',
								'title': $scope.dashboard.subtitle,
							},
							datePicker: {
								'class': 'col s12 m5 l3',
								dates: [{
									style: 'float:left;',
									label: $filter('translate')('from'),
									format: 'd mmm, yyyy',
									min: '2017-01-01',
									max: $scope.dashboard.endDate,
									currentTime: $scope.dashboard.startDate,
									onClose: function(){
										// set date
										var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
										if ( date !== $scope.dashboard.startDate ) {
											// set new date
											$scope.dashboard.startDate = date;
											var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag, $scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
											$location.path( path );
										}
									}
								},{
									style: 'float:right',
									label: $filter('translate')('to'),
									format: 'd mmm, yyyy',
									min: $scope.dashboard.startDate,
									currentTime: $scope.dashboard.endDate,
									onClose: function(){
										// set date
										var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
										if ( date !== $scope.dashboard.endDate ) {
											// set new date
											$scope.dashboard.endDate = date;
											var path = $scope.dashboard.getPath( $scope.dashboard.cluster_id,  $scope.dashboard.activity_type_id, $scope.dashboard.organization_tag, $scope.dashboard.project_type_component, $scope.dashboard.hrpplan, $scope.dashboard.implementer_tag,$scope.dashboard.donor_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.startDate, $scope.dashboard.endDate );
											$location.path( path );
										}
									}
								}]
							},
							download: {
								'class': 'col s12 m4 l4 hide-on-small-only',
								downloads: $scope.dashboard.getDownloads()
							}
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
										request: $scope.dashboard.getRequest( { indicator: 'latest_update' } ),
										templateUrl: '/scripts/widgets/ngm-html/template/cluster.4wplusdashboard.html'
									}
								}]
							}]
						},{
							columns: [
							{
								styleClass: 's12 m4 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										//title: $filter('translate')('projects_mayus1'),
										title: $filter('translate')('projects_number'),
										request: $scope.dashboard.getRequest( { indicator: 'projects_4wplusdashboard' } )
									}
								}]
							},
							{
								styleClass: 's12 m4 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('population_beneficiaries'),
										request: $scope.dashboard.getRequest( { indicator: 'beneficiaries_4wplusdashboard' } )
									}
								}]
							},
							{
								styleClass: 's12 m4 l4',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('total_financing')+' (US$)',
										request: $scope.dashboard.getRequest( { indicator: 'budgetprogress_4wplusdashboard' } )
									}
								}]
							},
							{
								styleClass: 's12 m4 l6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										//title: $filter('translate')('organizations'),
										title: $filter('translate')('number_executing_agencies'),
										request: $scope.dashboard.getRequest( { indicator: 'organizations_4wplusdashboard' } )
									}
								}]
							},
							{
								styleClass: 's12 m4 l6',
						     	widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										//title: $filter('translate')('other_implementing_partners'),
										title: $filter('translate')('number_implementing_agencies'),
										request: $scope.dashboard.getRequest({ indicator: 'total_implementing_partners_4wplus' })
							        }
						        }]
							}


							]
						}/*,{
							columns: $scope.dashboard.beneficiaries_row
						}*//*,{
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('children'),
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							},{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('adult')
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('adult'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'adult' })
											}]
										}
									}
								}]
							},{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('elderly')
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('elderly'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'elderly' })
											}]
										}
									}
								}]
							}]
						}*/,{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 5px; font-size: 2.2rem; color: #2196F3; border-bottom: 3px #2196F3 solid;">'+$filter('translate')('project_locations')+'</h2>'
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('project_locations'),
										request: $scope.dashboard.getRequest( { indicator: 'locations_4wplusDashboard' } )
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'leaflet',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										height: '490px',
										display: {
											type: 'marker',
											zoomToBounds: true,
										},
										defaults: {
											zoomToBounds: true
										},
										layers: {
											baselayers: {
												osm: {
													name: 'Mapbox',
													type: 'xyz',
													url: 'https://api.mapbox.com/styles/v1/reporthub/ckg6rf3um0w2319qom5jnv1nd/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVwb3J0aHViIiwiYSI6ImNrZzZxeDhwYTAwMW4ydXBtbWp0ZzhseGEifQ.uRwnl0E6kRZZhducGRK6vQ',
													layerOptions: {
														continuousWorld: true
													}
												}
											},
											overlays: {
												projects: {
													name: 'Projects',
													type: 'markercluster',
													visible: true,
													layerOptions: {
															maxClusterRadius: 90
													}
												}
											}
										},
										//request: $scope.dashboard.getRequest( { indicator: 'markers' } )
										request: $scope.dashboard.getRequest( { indicator: 'markers4wplusDasbhboard' } )

									}
								}]
							}]
						},
						{
							columns: $scope.dashboard.beneficiaries_row
						},
						{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 5px; font-size: 3.0rem; color: #2196F3; border-bottom: 3px #2196F3 solid;">'+$filter('translate')('beneficiaries_mayus')+'</h2>'
									}
								}]
							}]
						},
						{
							columns: [
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('sex_title_dashboard_graphic')+" (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardpie.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 50px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 150,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin:0,
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												//name: "SEX # - %",
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							   },
								{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('age_title_dashboard_graphic')+" (# - %)"
										},

										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 250,
													//margin: [0,0,0,0],
												//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>#{point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type:'category',
										        title: {
										            text: $filter('translate')('ages_mayus1')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_age_and_percent_of_total')
										        }
										    }

											},
											title: {
													text: '',
													margin: 0
											},
											series: [{
												//name: $filter('translate')('children'),
												name: $filter('translate')('age_mayus'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										               // format: '{point.y} - {point.label:.1f}%'
										               format: '#{point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
												//request: $scope.dashboard.getRequest({ indicator: 'BarChartAges', chart_for:'ages'})	,
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartAges', chart_for:'ages'}),
											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('province_mayus')+ " TOP 5 (# - %)",

										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>#{point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type:'category',
										        title: {
										            text: $filter('translate')('province')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_province_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												name: 	$filter('translate')('province_mayus'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '#{point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											    // request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryAdmin1pcode', chart_for:'beneficiaryAdmin1pcode'}),
												request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryAdmin1pcode', chart_for:'beneficiaryAdmin1pcode'}),

											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l6',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('type_mayus')+ " (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>#{point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type:'category',
										        title: {
										            text: $filter('translate')('beneficiary_type')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_type_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												name: $filter('translate')('beneficiary_type'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '#{point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryType', chart_for:'beneficiaryType'}),
											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l6',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: "CLUSTER (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>#{point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type:'category',
										        title: {
										            text: 'Cluster'
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_cluster_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												//name: $filter('translate')('children'),
												name: "Cluster",
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '#{point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryCluster', chart_for:'beneficiaryCluster'}),
											}]
										}
									}
								}]
							}/*,
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: "Departamento (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'bar',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: "Categoría Beneficiario (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'bar',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: "Cluster (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'bar',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							}*/]
						 },


						{
							columns: $scope.dashboard.financial_row
						},
						{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 5px; font-size: 3.0rem; color: #2196F3; border-bottom: 3px #2196F3 solid;">'+$filter('translate')('financing_mayus')+'</h2>'
									}
								}]
							}]
						},
						{
							columns: [
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('executor_organizations_mayus')+" TOP 5 (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>${point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type: 'category',
										        title: {
										            text: $filter('translate')('executor_organizations')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_organization_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												//name: $filter('translate')('children'),
												name: $filter('translate')('organization'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '${point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartFinancingTop5ExecutorOrganizations', chart_for:'FinancingExecutorOrganization'}),
											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('province_mayus')+ " TOP 5 (# - %)",

										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>${point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type: 'category',
										        title: {
										            text: $filter('translate')('province')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_province_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												name: 	$filter('translate')('province_mayus'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '${point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											    // request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryAdmin1pcode', chart_for:'beneficiaryAdmin1pcode'}),
												request: $scope.dashboard.getRequest({ indicator: 'BarChartFinancingAdmin1pcode', chart_for:'financingAdmin1pcode'}),

											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: "CLUSTER (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>${point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type: 'category',
										        title: {
										            text: 'Cluster'
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_cluster_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												//name: $filter('translate')('children'),
												name: "Cluster",
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '{point.label:.1f}<br>%'
										                //inside: true
										            },
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartFinancingCluster', chart_for:'FinancingCluster'}),
											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l6',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('donors_mayus')+" TOP 5 (# - %)"
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>${point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type: 'category',
										        title: {
										            text: $filter('translate')('donor')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_donor_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												//name: $filter('translate')('children'),
												name: $filter('translate')('donor'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '${point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											     request: $scope.dashboard.getRequest({ indicator: 'BarChartFinancingTop5Donors', chart_for:'FinancingDonors'}),
											}]
										}
									}
								}]
							},
							{
								styleClass: 's12 m6 l6',
								widgets: [{
									type: 'highchart',
									style: 'height: 300px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											//text: $filter('translate')('children'),
											text: $filter('translate')('implementing_organizations_mayus')+ " TOP 5 (# - %)",

										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/4wplusdashboardcolumns.html',
										style: '"text-align:center; width: 80%; height: 80%; position: absolute; top: 0px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'column',
													height: 230,
													//margin: [0,0,0,0],
													//spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: true,
													  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
													  //pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>{point.y} - '+ $filter('translate')('{point.label:.1f}')+'%</b> '+$filter('translate')('of_total')+'<br/>'
													  pointFormat: '<span style="color:{point.color}">{point.name} (# - %): </span> <b>${point.yformat} - {point.label:.1f}%</b> '+$filter('translate')('of_total')+'<br/>'
												},
												xAxis: {
													type: 'category',
										        title: {
										            text: $filter('translate')('implementing_organization')
										        }
										    },
												yAxis: {
										        title: {
										            text: $filter('translate')('total_by_implementing_partner_and_percent_of_total')
										        }
										    }
											},

											title: {
													text: '',
													margin: 0
											},



											series: [{
												name: 	$filter('translate')('implementing_organization'),
												//name: "EDAD (# - %)",
												size: '100%',
												innerSize: '100%',
												showInLegend:false,
												 dataLabels: {
										                enabled: true,
										                 format: '${point.yformat}<br>{point.label:.1f}%'
										                //inside: true
										            },
											    // request: $scope.dashboard.getRequest({ indicator: 'BarChartBeneficiaryAdmin1pcode', chart_for:'beneficiaryAdmin1pcode'}),
												request: $scope.dashboard.getRequest({ indicator: 'BarChartFinancingOrgImplementing', chart_for:'financingOrgImplementing'}),

											}]
										}
									}
								}]
							}
							]
						   },
						   {
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<p class="col s12 report-title" style="margin-top: 20px; padding-bottom: 5px; font-size: 1.4rem">'+
										$scope.dashboard.finalnote+ '</p>'
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
										html: $scope.dashboard.ngm.footer
									}
								}]
							}]
						}]
					},



					$('#highcharts-13').css("height","280px");
										$('div.highchart-container > svg').css({height:'280px'});


					// set
					$scope.dashboard.setUrl();
					$scope.dashboard.setMenu();
					$scope.dashboard.setCluster();
					$scope.dashboard.setAdmin1();
					$scope.dashboard.setAdmin2();
					$scope.dashboard.setTitle();
					$scope.dashboard.setSubtitle();

					// dashboard metrics
					var visit = angular.merge( $scope.dashboard.getMetrics( $scope.dashboard.cluster_id + '_cluster_dashboard', 'view' ), { async: true } );
					$http( visit ).then( function( data ) {;
		         // success
		      }).catch( function( data ) {;
		       //  console.log('error!');
		      });

				}

			};

			// if lists
			if ( $scope.dashboard.lists.admin1.length ) {

				var requests = {

					//call to back and return exchange rate from EURO to USD
					currenciees: ngmAuth.LOCATION + '/api/cluster/exchangeRatesCurrencies'


				};

				$q.all([
					$http.get( requests.currenciees   )]).then(function(results){
						//exchange rate from EURO to USD
						$scope.dashboard.eurotousd = results[0].data[0];

						// set dashboard
						$scope.dashboard.init();

						// assign to ngm app scope ( for menu )
						$scope.dashboard.ngm.dashboard.model = $scope.model;
						setTimeout(() => {
							$('.fixed-action-btn').floatingActionButton({ direction: 'left' });
						}, 0);
					});


			}

			// if none
			if ( !$scope.dashboard.lists.admin1.length ) {

				// lists
				var requests = {
					getAdmin1List: ngmAuth.LOCATION + '/api/list/getAdmin1List',
					getAdmin2List: ngmAuth.LOCATION + '/api/list/getAdmin2List',
					currenciees: ngmAuth.LOCATION + '/api/cluster/exchangeRatesCurrencies'
					//call to back and return exchange rate from EURO to USD

				}
				// send request
				$q.all([
					$http.get( requests.getAdmin1List ),
					$http.get( requests.getAdmin2List ),
					$http.get( requests.currenciees   ) ]).then( function( results ) {

					// set dashboard lists
					$scope.dashboard.lists.admin1 = results[0].data;
					$scope.dashboard.lists.admin2 = results[1].data;
					//exchange rate from EURO to USD
					$scope.dashboard.eurotousd = results[2].data[0];

					// set in localstorage
					localStorage.setObject( 'lists', { admin1List: results[0].data, admin2List: results[1].data } );
					ngmLists.setObject( 'lists', { admin1List: results[0].data, admin2List: results[1].data } );

					// set dashboard
					$scope.dashboard.init();

					// assign to ngm app scope ( for menu )
					$scope.dashboard.ngm.dashboard.model = $scope.model;
						setTimeout(() => {
							$('.fixed-action-btn').floatingActionButton({ direction: 'left' });
						}, 0);

				});



			}




		}


	]);
