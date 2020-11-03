angular.module('ngmReportHub')
    .factory('ngmCustomConfig',
        ['$location',
            '$q',
            '$http',
            '$filter',
            '$timeout',
            'ngmAuth', '$translate', '$filter',
            function ($location,
                $q,
                $http,
                $filter,
                $timeout,
                ngmAuth,$translate, $filter) {

                $http({
                    method: 'GET',
                        url: ngmAuth.LOCATION + '/api/custom/config/getCustomReportingTypes'
                    }).success(function(x){
                        ngmCustomConfig.staticList.push(...x);
                    });

                var ngmCustomConfig = {
                    staticList: [
                        {
                            admin0pcode: "AF",
                            // cluster_id: "heatlh",
                            report_type_id: "winterization20",
                            report_type_name: "Winterization 2020",
                            version: 'v1',
                            status: 'active',
                            // status: 'completed',
                            // disabled: false,
                            description: 'Dolor', // optional
                            project: {
                                defaults: {
                                    cluster_id: "esnfi",
                                    cluster: "ESNFI",
                                    // cluster_ids: ['esnfi'],
                                    // select_clusters: true
                                    // select_clusters: {
                                    //     list_cluster_ids: ['esnfi'],
                                    //     selected: true
                                    // }
                                },
                                v1: {
                                    description: 'Dolor v1', // optional

                                    set_reporting_period_start: '2020-09-01', // optional to restrict/set project start end dates
                                    set_reporting_period_end: '2021-03-01', // optional to restrict/set project start end dates
                                    min_reporting_period: '2020-10-01', // optional to restrict/set project start end dates
                                    max_reporting_period: '2021-03-01', // optional to restrict/set project start end dates

                                    reporting_period_types: [{ reporting_period_type: 'monthly', reporting_period_name: 'Monthly' },
                                    { reporting_period_type: 'weekly', reporting_period_name: 'Weekly' },
                                    { reporting_period_type: '2weekly', reporting_period_name: '2 Weekly' }
                                    ],
                                    project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                                    project_defaults: {
                                        project_status: 'new',
                                        project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                                        project_description: 'Please, add the project description...',
                                        project_details: [],
                                        // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                                        // project_end_date: moment.utc().add(8, 'M').endOf('M').format('YYYY-MM-DD'),
                                        project_start_date: '2020-01-01',
                                        project_end_date: '2020-12-31',
                                        reporting_period_type: 'monthly',
                                        notes: '',
                                        version: '',
                                        cluster_id: "esnfi",
                                        cluster: "ESNFI",
                                        cluster_ids: [],
                                        clusters: [],
                                        report_type_id: "winterization20",
                                        report_type_name: "Winterization 2020",
                                        version: 'v1',
                                    },
                                    // list_cluster_ids: ['esnfi'],
                                    // select_clusters: true,
                                    list_clusters: [{ cluster_id: 'esnfi', cluster: 'ESNFI' }],
                                    project_download: {
                                        fields: ['planned_families'],
                                        fieldNames: false,
                                        overwriteFields: false
                                    },
                                    beneficiaries: {
                                        template: '/scripts/modules/custom/views/forms/report/template-form-beneficiaries/winterization.v1.beneficiaries.html',
                                        defaults: {
                                            planned_families: 0,
                                            assisted_returnee_families: 0,
                                            assisted_idp_families: 0,
                                            assisted_other_families: 0,
                                            total_assisted_families: 0,
                                            package_returnee_families: 0,
                                            package_idp_families: 0,
                                            package_other_families: 0,
                                            total_package_families: 0,
                                            cash: 0,
                                            blanket: 0,
                                            heating_material: 0,
                                            winter_clothes: 0,
                                            remarks: '',
                                            progress: 0,
                                            beneficiary_type_id: 'b1',
                                            beneficiary_type_name: 'B1',
                                            cluster_id: "esnfi",
                                            cluster: "ESNFI"
                                        },
                                        validate: ['planned_families', 'beneficiary_type_id', 'assisted_returnee_families', 'assisted_idp_families'],
                                        // or
                                        // validate: {
                                        //     planned_families: true,
                                        //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                                        // },
                                        // if custom activities
                                        // activities: [
                                        //     { 
                                        //         activity_type_id: 'test1',
                                        //         activity_type_name: 'Test 1',
                                        //         activity_description_id: 'subtest1',
                                        //         activity_description_name: 'Sub Test 1',
                                        //         defaults: {
                                        //             'families': 0
                                        //         },
                                        //         validate: {
                                        //                 families: { 'gte': 0, 'lte': 100 }
                                        //         },
                                        //         template: 'tes1.beneficiaries.html'
                                        //     }
                                        // ],
                                        lists: {
                                            // beneficiary_types: [
                                            //     {
                                            //         beneficiary_type_id: 'b1',
                                            //         beneficiary_type_name: 'B1'
                                            //     }
                                            // ],
                                            // to count atrribute that needed to coun 
                                            count: [
                                                {
                                                    total: 'total_assisted_families',
                                                    property_count: ['assisted_returnee_families', 'assisted_idp_families', 'assisted_other_families']
                                                },
                                                {
                                                    total: 'total_package_families',
                                                    property_count: ['package_returnee_families', 'package_idp_families', 'package_other_families']
                                                }
                                            ]


                                        },
                                        location: {
                                            total: 'total_package_families'
                                        },
                                        download: {
                                            fields: ['planned_families'],
                                            fieldNames: false,
                                            overwriteFields: false
                                        }
                                    },
                                    admin: { fields: ['planned_families'], fieldNames: false, overwriteFields: false, defaultPeriod: 'month', filter_clusters: ['esnfi'] },
                                    admin_page: {
                                        downloads: [{ indicator_id: 'reports_due', indicator_name: 'Report Todo', type: 'csv' }, { indicator_id: 'reports_submitted', indicator_name: 'Report Completer', type: 'csv' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true
                                    },
                                    // dashboard_page: {
                                    //     min_date: '2020-01-01', start_date: '2020-01-01', downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write: true }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']
                                    // },
                                    dashboard: {
                                        min_date: '2020-09-01', indicator: [{ id: 'beneficiaries', name: 'Total Assisted Families', calculate_indicator: ["$total_assisted_families"] }], fields: ['planned_families'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']
                                    },
                                    // projects_page: {
                                    //     downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                    //     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                    //     fieldNames: false, overwriteFields: false, filter_clusters: ['health']
                                    // },
                                    reports_page: {
                                        start_date: '2020-01-01',
                                        report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' },
                                        { indicator_id: 'winterization_summary', indicator_name: 'Winterization Summary', type: 'excel' }
                                        ],
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                        fieldNames: false, overwriteFields: false,
                                        filter_clusters: ['esnfi'],
                                    }
                                },
                                schedule: {
                                    defaults: {
                                        "schedule": "0/10 * * * * *",
                                        "schedule_period": "month",
                                        "schedule_type": "every",
                                        "schedule_shift_period": 1,
                                        "schedule_shift_days": 0,
                                        "schedule_time": "4:30 PM",
                                        "schedule_datetime": "2020-01-01",
                                        "report_start_date_type": "year",
                                        "report_start_date": "2020-01-01",
                                        "report_end_date": "2020-12-31",
                                        "report_start_date_shift_period": 0,
                                        "report_start_date_shift_days": 0,
                                        "report_end_date_type": "year",
                                        "report_end_date_shift_period": 0,
                                        "report_end_date_shift_days": 0,
                                        "schedule_report_type": "beneficiaries"
                                    },
                                    lists: {
                                        schedule_periodes: ['year',
                                            'quarter',
                                            'month',
                                            'week',
                                            'day',
                                            'custom'],
                                        report_types: [{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' },
                                        { scheduled_report_type: 'winterization_summary', scheduled_report_name: 'Winterization Summary', type: 'excel' }
                                        ],
                                        types: ['every', 'once']
                                    }
                                }
                            }
                        },
                        // {
                        //         admin0pcode: "AF",
                        //         // cluster_id: "heatlh",
                        //         report_type_id: "annualworkplan20",
                        //         report_type_name: "Annual Work Plan 2020",
                        //         version: 'v1',
                        //         status: 'active',
                        //         // status: 'completed',
                        //         // disabled: false,
                        //         description: 'The Output Indicator Tracking', // optional
                        //         project: {
                        //             defaults: {
                        //                 cluster: "Multi-Purpose Cash",
                        //                 cluster_id: "cvwg"
                        //                 // cluster_id: "esnfi",
                        //                 // cluster: "ESNFI",
                        //                 // cluster_ids: ['esnfi'],
                        //                 // select_clusters: true
                        //                 // select_clusters: {
                        //                 //     list_cluster_ids: ['esnfi'],
                        //                 //     selected: true
                        //                 // }
                        //             },
                        //             v1: {
                        //                 description: 'The Output Indicator Tracking', // optional

                        //                 set_reporting_period_start: '2020-01-01', // optional to restrict/set project start end dates
                        //                 set_reporting_period_end: '2020-12-31', // optional to restrict/set project start end dates
                        //                 min_reporting_period: '2020-01-01', // optional to restrict/set project start end dates
                        //                 max_reporting_period: '2021-12-31', // optional to restrict/set project start end dates

                        //                 reporting_period_types: [{ reporting_period_type: 'quarterly', reporting_period_name: 'Quarterly' }
                        //                 ],
                        //                 // project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                        //                 project_defaults: {
                        //                     project_status: 'new',
                        //                     project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                        //                     project_description: 'Please, add the project description...',
                        //                     project_details: [],
                        //                     // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                        //                     // project_end_date: moment.utc().add(12, 'M').endOf('M').format('YYYY-MM-DD'),
                        //                     project_start_date: '2020-01-01',
                        //                     project_end_date: '2020-12-31',
                        //                     reporting_period_type: 'quarterly',
                        //                     notes: '',
                        //                     // cluster_id: "esnfi",
                        //                     // cluster: "ESNFI",
                        //                     // cluster_ids: ['esnfi'],
                        //                     // clusters:[],
                        //                     report_type_id: "annualworkplan20",
                        //                     report_type_name: "Annual Work Plan 2020",
                        //                     version: 'v1',
                        //                 },
                        //                 // list_cluster_ids: ['esnfi'],
                        //                 // select_clusters: true,
                        //                 project_download: {
                        //                     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //                     fieldNames: false,
                        //                     overwriteFields: false
                        //                 },
                        //                 beneficiaries: {
                        //                     template: 'annualworkplan20.v1.beneficiaries.html',
                        //                     defaults: {
                        //                         cluster_id:'',
                        //                         cluster_project_id: '',
                        //                         donor_id:'',
                        //                         target: 0,
                        //                         planned_neutral: 0,
                        //                         planned_m_b: 0,
                        //                         planned_w_g: 0,
                        //                         planned_total: 0,
                        //                         achieved_neutral: 0,
                        //                         achieved_m_b: 0,
                        //                         achieved_w_g: 0,
                        //                         achieved_total: 0,

                        //                         remarks: '',
                        //                         justification: '',

                        //                         pwd: '',
                        //                         children: '',
                        //                         returnee: '',
                        //                         beneficiary_type_id: 'b1',
                        //                         beneficiary_type_name: 'B1',
                        //                         // beneficiary_type_id: 'b1',
                        //                         // beneficiary_type_name: 'B1',
                        //                         // cluster_id: "esnfi",
                        //                         // cluster: "ESNFI"
                        //                     },
                        //                     validate: ['cluster_id', 'indicator_id', 'target', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'achieved_neutral', 'achieved_m_b', 'achieved_w_g'],
                        //                     // or
                        //                     // validate: {
                        //                     //     planned_families: true,
                        //                     //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                        //                     // },
                        //                     // if custom activities
                        //                     // activities: [
                        //                     //     {
                        //                     //         activity_type_id: 'test1',
                        //                     //         activity_type_name: 'Test 1',
                        //                     //         activity_description_id: 'subtest1',
                        //                     //         activity_description_name: 'Sub Test 1',
                        //                     //         defaults: {
                        //                     //             'families': 0
                        //                     //         },
                        //                     //         validate: {
                        //                     //                 families: { 'gte': 0, 'lte': 100 }
                        //                     //         },
                        //                     //         template: 'tes1.beneficiaries.html'
                        //                     //     }
                        //                     // ],
                        //                     lists: {
                        //                         clusters: [
                        //                             {
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                             },
                        //                             {
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                             }, {
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                             }
                        //                         ],

                        //                         projects: [
                        //                             {
                        //                                 cluster_project_id: 'CHNE',
                        //                                 cluster_project_name: 'CHNE',
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                             },
                        //                             {
                        //                                 cluster_project_id: 'Clinic construction',
                        //                                 cluster_project_name: 'Clinic construction',
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                             },
                        //                             {
                        //                                 cluster_project_id: 'Orthopedic Workshop',
                        //                                 cluster_project_name: 'Orthopedic Workshop',
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                             }
                        //                         ],

                        //                         donor: [
                        //                             {
                        //                                 donor_id: 'General Fundraising',
                        //                                 donor_name: 'General Fundraising'
                        //                             },
                        //                             {
                        //                                 donor_id: 'European Union',
                        //                                 donor_name: 'European Union'
                        //                             },
                        //                             {
                        //                                 donor_id: 'SIDA',
                        //                                 donor_name: 'SIDA'
                        //                             }
                        //                         ],

                        //                         indicators: [
                        //                             {
                        //                                 indicator_id: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        //                                 indicator_name: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                                 output_id: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        //                                 output_name: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             },
                        //                             {
                        //                                 indicator_id: 'Number of health facilities repaired/ rehabilitated.',
                        //                                 indicator_name: 'Number of health facilities repaired/ rehabilitated.',
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                                 output_id: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        //                                 output_name: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             },
                        //                             {
                        //                                 indicator_id: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        //                                 indicator_name: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                                 output_id: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        //                                 output_name: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             }
                        //                         ],

                        //                         // to count atrribute that needed to coun
                        //                         count: [
                        //                             {
                        //                                 total: 'planned_total',
                        //                                 property_count: ['planned_neutral', 'planned_m_b', 'planned_w_g']
                        //                             },
                        //                             {
                        //                                 total: 'achieved_total',
                        //                                 property_count: ['achieved_neutral', 'achieved_m_b', 'achieved_w_g']
                        //                             }
                        //                         ]


                        //                     },
                        //                     location: {
                        //                         total: 'achieved_total'
                        //                     },
                        //                     download: {
                        //                         fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //                         fieldNames: false,
                        //                         overwriteFields: false
                        //                     }
                        //                 },
                        //                 admin: { fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true },
                        //                 dashboard: {
                        //                     min_date: '2020-01-01', indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write:true}], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: true
                        //                 }
                        //             }
                        //         }
                        //     },
                        {
                            admin0pcode: "AF",
                            // cluster_id: "heatlh",
                            report_type_id: "annualworkplan20",
                            report_type_name: "Annual Work Plan 2020",
                            version: 'v1',
                            status: 'active',
                            // status: 'completed',
                            // disabled: false,
                            description: 'The Output Indicator Tracking', // optional
                            project: {
                                defaults: {
                                    // cluster: "Multi-Purpose Cash",
                                    // cluster_id: "cvwg"
                                    // cluster_id: "esnfi",
                                    // cluster: "ESNFI",
                                    // cluster_ids: ['esnfi'],
                                    // select_clusters: true
                                    // select_clusters: {
                                    //     list_cluster_ids: ['esnfi'],
                                    //     selected: true
                                    // }
                                },
                                v1: {
                                    description: 'The Output Indicator Tracking', // optional

                                    set_reporting_period_start: '2020-01-01', // optional to restrict/set project start end dates
                                    set_reporting_period_end: '2020-12-31', // optional to restrict/set project start end dates
                                    min_reporting_period: '2020-01-01', // optional to restrict/set project start end dates
                                    max_reporting_period: '2021-12-31', // optional to restrict/set project start end dates

                                    reporting_period_types: [{ reporting_period_type: 'quarterly', reporting_period_name: 'Quarterly' }
                                    ],
                                    project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                                    project_defaults: {
                                        project_status: 'new',
                                        project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                                        project_description: 'Please, add the project description...',
                                        project_details: [],
                                        // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                                        // project_end_date: moment.utc().add(12, 'M').endOf('M').format('YYYY-MM-DD'),
                                        project_start_date: '2020-01-01',
                                        project_end_date: '2020-12-31',
                                        reporting_period_type: 'quarterly',
                                        notes: '',
                                        // cluster_id: "esnfi",
                                        // cluster: "ESNFI",
                                        // cluster_ids: ['esnfi'],
                                        clusters: [],
                                        cluster_ids: [],
                                        report_type_id: "annualworkplan20",
                                        report_type_name: "Annual Work Plan 2020",
                                        version: 'v1',
                                    },
                                    // list_cluster_ids: ['health', 'disability', 'rural_development'],
                                    // select_clusters: true,
                                    list_clusters: [{ cluster_id: 'health', cluster: 'Health' }, { cluster_id: 'disability', cluster: 'Disability' }, { cluster_id: 'rural_development', cluster: 'Rural Development' }],
                                    project_download: {
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                        fieldNames: false,
                                        overwriteFields: false
                                    },
                                    beneficiaries: {
                                        template: '/scripts/modules/custom/views/forms/report/template-form-beneficiaries/annualworkplan20.v1.beneficiaries.html',//ngmAuth.LOCATION + '/report/annualworkplan20.v1.beneficiaries.html',//'annualworkplan20.v1.beneficiaries.html',
                                        template_api: {
                                            method: 'GET',
                                            url: ngmAuth.LOCATION + '/api/custom/config/getCustomBeneficiariesForm',
                                            params: {
                                                form_id: 'test_html2'//'beneficiariesv1'
                                            }
                                        },
                                        defaults: {
                                            cluster_id: '',
                                            cluster_project_id: '',
                                            donor_id: '',
                                            target: 0,
                                            planned_neutral: 0,
                                            planned_m_b: 0,
                                            planned_w_g: 0,
                                            planned_total: 0,
                                            achieved_neutral: 0,
                                            achieved_m_b: 0,
                                            achieved_w_g: 0,
                                            achieved_total: 0,

                                            remarks: '',
                                            justification: '',

                                            pwd: '',
                                            children: '',
                                            returnee: '',
                                            beneficiary_type_id: 'b1',
                                            beneficiary_type_name: 'B1',
                                            // beneficiary_type_id: 'b1',
                                            // beneficiary_type_name: 'B1',
                                            // cluster_id: "esnfi",
                                            // cluster: "ESNFI"
                                        },
                                        validate: ['cluster_id', 'indicator_id', 'target', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'achieved_neutral', 'achieved_m_b', 'achieved_w_g'],
                                        // or
                                        // validate: {
                                        //     planned_families: true,
                                        //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                                        // },
                                        // if custom activities
                                        // activities: [
                                        //     {
                                        //         activity_type_id: 'test1',
                                        //         activity_type_name: 'Test 1',
                                        //         activity_description_id: 'subtest1',
                                        //         activity_description_name: 'Sub Test 1',
                                        //         defaults: {
                                        //             'families': 0
                                        //         },
                                        //         validate: {
                                        //                 families: { 'gte': 0, 'lte': 100 }
                                        //         },
                                        //         template: 'tes1.beneficiaries.html'
                                        //     }
                                        // ],
                                        lists_api:{
                                            first_list_id: { 
                                                api: ngmAuth.LOCATION + '/api/custom/config/getCustomList', 
                                                method:'GET',
                                                params: {
                                                    list_id: 'project'
                                                } 
                                            },
                                            second_list_id: {
                                                api: ngmAuth.LOCATION + '/api/custom/config/getCustomList',
                                                method: 'GET',
                                                params: {
                                                    list_id: 'ksksk',
                                                }
                                            },
                                            third_list_id: {
                                                api: ngmAuth.LOCATION + '/api/custom/config/getCustomList',
                                                method: 'GET',
                                                params: {
                                                    list_id: 'ksksk1',
                                                }
                                            }
                                        },
                                        lists: {
                                            clusters: [
                                                {
                                                    cluster_id: 'health',
                                                    cluster_name: 'Health',
                                                },
                                                {
                                                    cluster_id: 'Rural Development',
                                                    cluster_name: 'Rural Development',
                                                }, {
                                                    cluster_id: 'Disability',
                                                    cluster_name: 'Disability',
                                                }
                                            ],

                                            projects: [
                                                {
                                                    cluster_project_id: 'CHNE',
                                                    cluster_project_name: 'CHNE',
                                                    cluster_id: 'health',
                                                    cluster_name: 'Health',
                                                },
                                                {
                                                    cluster_project_id: 'Clinic construction',
                                                    cluster_project_name: 'Clinic construction',
                                                    cluster_id: 'Rural Development',
                                                    cluster_name: 'Rural Development',
                                                },
                                                {
                                                    cluster_project_id: 'Orthopedic Workshop',
                                                    cluster_project_name: 'Orthopedic Workshop',
                                                    cluster_id: 'Disability',
                                                    cluster_name: 'Disability',
                                                }
                                            ],

                                            donor: [
                                                {
                                                    donor_id: 'General Fundraising',
                                                    donor_name: 'General Fundraising'
                                                },
                                                {
                                                    donor_id: 'European Union',
                                                    donor_name: 'European Union'
                                                },
                                                {
                                                    donor_id: 'SIDA',
                                                    donor_name: 'SIDA'
                                                }
                                            ],

                                            indicators: [
                                                {
                                                    indicator_id: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                                                    indicator_name: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                                                    cluster_id: 'health',
                                                    cluster_name: 'Health',
                                                    output_id: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                                                    output_name: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                                                    outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                                                },
                                                {
                                                    indicator_id: 'Number of health facilities repaired/ rehabilitated.',
                                                    indicator_name: 'Number of health facilities repaired/ rehabilitated.',
                                                    cluster_id: 'Rural Development',
                                                    cluster_name: 'Rural Development',
                                                    output_id: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                                                    output_name: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                                                    outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                                                },
                                                {
                                                    indicator_id: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                                                    indicator_name: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                                                    cluster_id: 'Disability',
                                                    cluster_name: 'Disability',
                                                    output_id: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                                                    output_name: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                                                    outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                                                    so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                                                    set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                                                }
                                            ],

                                            // to count atrribute that needed to coun
                                            count: [
                                                {
                                                    total: 'planned_total',
                                                    property_count: ['planned_neutral', 'planned_m_b', 'planned_w_g']
                                                },
                                                {
                                                    total: 'achieved_total',
                                                    property_count: ['achieved_neutral', 'achieved_m_b', 'achieved_w_g']
                                                }
                                            ]


                                        },
                                        location: {
                                            total: 'achieved_total'
                                        },
                                        download: {
                                            fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                            fieldNames: false,
                                            overwriteFields: false
                                        }
                                    },
                                    default_page: {
                                        pages: ['admin_page', 'dashboard_page', 'projects_page', 'reports_page'], pages: { admin_page: true, dashboard_page: true, 'projects_page': true, 'reports_page': true }, downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: true
                                    },
                                    admin_page: {
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true
                                    },
                                    dashboard_page: {
                                        min_date: '2020-01-01', start_date: '2020-01-01', downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write: true }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']
                                    },
                                    projects_page: {
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                            fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                            fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                        fieldNames: false, overwriteFields: false, filter_clusters: ['health']
                                    },
                                    reports_page: {
                                        start_date: '2020-01-01',
                                            start_date: '2020-01-01', 
                                        start_date: '2020-01-01',
                                            start_date: '2020-01-01', 
                                        start_date: '2020-01-01',
                                        report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                            downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                                        downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                            fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                            fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                                        fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                                        fieldNames: false, overwriteFields: false,
                                            fieldNames: false, overwriteFields: false, 
                                        fieldNames: false, overwriteFields: false,
                                            fieldNames: false, overwriteFields: false, 
                                        fieldNames: false, overwriteFields: false,
                                        filter_clusters: ['esnfi'],
                                            filter_clusters: ['esnfi'],                                            
                                        filter_clusters: ['esnfi'],
                                            filter_clusters: ['esnfi'],                                            
                                        filter_clusters: ['esnfi'],
                                    },
                                    // schedule:{
                                    //     defaults: {
                                    //         schedule_type: 'every',
                                    //         schedule_period: 'quarter',
                                    //         shift_period: 0,
                                    //         shift_days: 0,
                                    //         time: "00:00",
                                    //         scheduled_report_type: 'beneficiaries',
                                    //         report_start_date: 'year',
                                    //         report_start_date_shift_period: 0,
                                    //         report_start_date_shift_days: 0,
                                    //         report_end_date: 'month',
                                    //         report_end_date_shift_period: 1,
                                    //         report_end_date_shift_days: 0,
                                    //         start_date: '2020-01-01',
                                    //         end_date: '2020-01-01'
                                    //     },
                                    //     lists:{
                                    //         schedule_periodes:[ 'year',
                                    //                  'quarter',
                                    //                  'month',
                                    //                  'week',
                                    //                  'day',
                                    //                  'custom'],
                                    //         report_types:[{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' },
                                    //                       { scheduled_report_type: 'indicators_summary', scheduled_report_name: 'Indicators Summary', type: 'excel' }
                                    //                     ]
                                    //     }
                                    // }

                                },
                                schedule: {
                                    defaults: {
                                        // schedule_type: 'every',
                                        // schedule_period: 'quarter',
                                        // shift_period: 0,
                                        // shift_days: 0,
                                        // time: "00:00",
                                        // scheduled_report_type: 'beneficiaries',
                                        // report_start_date: 'year',
                                        // report_start_date_shift_period: 0,
                                        // report_start_date_shift_days: 0,
                                        // report_end_date: 'month',
                                        // report_end_date_shift_period: 1,
                                        // report_end_date_shift_days: 0,
                                        // start_date: '2020-01-01',
                                        // end_date: '2020-01-01'
                                        "schedule": "0/10 * * * * *",
                                        "schedule_period": "month",
                                        "schedule_type": "every",
                                        "schedule_shift_period": 1,
                                        "schedule_shift_days": 0,
                                        "schedule_time": "4:30 PM",
                                        "schedule_datetime": "2020-01-01",
                                        "report_start_date_type": "year",
                                        "report_start_date": "2020-01-01",
                                        "report_end_date": "2020-12-31",
                                        "report_start_date_shift_period": 0,
                                        "report_start_date_shift_days": 0,
                                        "report_end_date_type": "year",
                                        "report_end_date_shift_period": 0,
                                        "report_end_date_shift_days": 0,
                                        "schedule_report_type": "beneficiaries"
                                    },
                                    lists: {
                                        schedule_periodes: ['year',
                                            'quarter',
                                            'month',
                                            'week',
                                            'day',
                                            'custom'],
                                        report_types: [{ schedule_report_type: 'beneficiaries', schedule_report_name: 'Beneficiaries', type: 'csv' },
                                        { schedule_report_type: 'indicators_summary', schedule_report_name: 'Indicators Summary', type: 'excel' }
                                        ],
                                        types: ['every', 'once']
                                    }
                                }
                            }
                        }
                    ],

                    listCustomConfig:function(){
                        // var lists_config = [
                        //     {
                        //     admin0pcode: "AF",
                        //     // cluster_id: "heatlh",
                        //     report_type_id: "winterization20",
                        //     report_type_name: "Winterization 2020",
                        //     version: 'v1',
                        //     status: 'active',
                        //     // status: 'completed',
                        //     // disabled: false,
                        //     description: 'Dolor', // optional
                        //     project: {
                        //         defaults: {
                        //             cluster_id: "esnfi",
                        //             cluster: "ESNFI",
                        //             // cluster_ids: ['esnfi'],
                        //             // select_clusters: true
                        //             // select_clusters: {
                        //             //     list_cluster_ids: ['esnfi'],
                        //             //     selected: true
                        //             // }
                        //         },
                        //         v1: {
                        //             description: 'Dolor v1', // optional

                        //             set_reporting_period_start: '2020-09-01', // optional to restrict/set project start end dates
                        //             set_reporting_period_end: '2021-03-01', // optional to restrict/set project start end dates
                        //             min_reporting_period: '2020-10-01', // optional to restrict/set project start end dates
                        //             max_reporting_period: '2021-03-01', // optional to restrict/set project start end dates

                        //             reporting_period_types: [{ reporting_period_type: 'monthly', reporting_period_name: 'Monthly' },
                        //                                      { reporting_period_type: 'weekly', reporting_period_name: 'Weekly' },
                        //                                      { reporting_period_type: '2weekly', reporting_period_name: '2 Weekly'}
                        //                                     ],
                        //             project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                        //             project_defaults: {
                        //                 project_status: 'new',
                        //                 project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                        //                 project_description: 'Please, add the project description...',
                        //                 project_details: [],
                        //                 // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                        //                 // project_end_date: moment.utc().add(8, 'M').endOf('M').format('YYYY-MM-DD'),
                        //                 project_start_date: '2020-01-01',
                        //                 project_end_date: '2020-12-31',
                        //                 reporting_period_type: 'monthly',
                        //                 notes: '',
                        //                 version:'',
                        //                 cluster_id: "esnfi",
                        //                 cluster: "ESNFI",
                        //                 cluster_ids: [],
                        //                 clusters:[],
                        //                 report_type_id: "winterization20",
                        //                 report_type_name: "Winterization 2020",
                        //                 version: 'v1',
                        //             },
                        //             // list_cluster_ids: ['esnfi'],
                        //             // select_clusters: true,
                        //             list_clusters: [{ cluster_id: 'esnfi', cluster: 'ESNFI' }],
                        //             project_download: {
                        //                 fields: ['planned_families'],
                        //                 fieldNames: false,
                        //                 overwriteFields: false
                        //             },
                        //             beneficiaries: {
                        //                 template: 'winterization.v1.beneficiaries.html',
                        //                 defaults: {
                        //                     planned_families: 0,
                        //                     assisted_returnee_families: 0,
                        //                     assisted_idp_families: 0,
                        //                     assisted_other_families: 0,
                        //                     total_assisted_families: 0,
                        //                     package_returnee_families: 0,
                        //                     package_idp_families: 0,
                        //                     package_other_families: 0,
                        //                     total_package_families: 0,
                        //                     cash: 0,
                        //                     blanket: 0,
                        //                     heating_material: 0,
                        //                     winter_clothes: 0,
                        //                     remarks: '',
                        //                     progress: 0,
                        //                     beneficiary_type_id: 'b1',
                        //                     beneficiary_type_name: 'B1',
                        //                     cluster_id: "esnfi", 
                        //                     cluster: "ESNFI"
                        //                 },
                        //                 validate: ['planned_families', 'beneficiary_type_id', 'assisted_returnee_families', 'assisted_idp_families'],
                        //                 // or
                        //                 // validate: {
                        //                 //     planned_families: true,
                        //                 //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                        //                 // },
                        //                 // if custom activities
                        //                 // activities: [
                        //                 //     { 
                        //                 //         activity_type_id: 'test1',
                        //                 //         activity_type_name: 'Test 1',
                        //                 //         activity_description_id: 'subtest1',
                        //                 //         activity_description_name: 'Sub Test 1',
                        //                 //         defaults: {
                        //                 //             'families': 0
                        //                 //         },
                        //                 //         validate: {
                        //                 //                 families: { 'gte': 0, 'lte': 100 }
                        //                 //         },
                        //                 //         template: 'tes1.beneficiaries.html'
                        //                 //     }
                        //                 // ],
                        //                 lists: {
                        //                     // beneficiary_types: [
                        //                     //     {
                        //                     //         beneficiary_type_id: 'b1',
                        //                     //         beneficiary_type_name: 'B1'
                        //                     //     }
                        //                     // ],
                        //                     // to count atrribute that needed to coun 
                        //                     count: [
                        //                         {   total: 'total_assisted_families', 
                        //                               property_count: ['assisted_returnee_families', 'assisted_idp_families', 'assisted_other_families']
                        //                             },
                        //                         {
                        //                             total: 'total_package_families',
                        //                             property_count: ['package_returnee_families', 'package_idp_families', 'package_other_families']
                        //                         }
                        //                     ]
                                                
                                            
                        //                 },
                        //                 location:{
                        //                     total:'total_package_families'
                        //                 },
                        //                 download:{
                        //                     fields: ['planned_families'],
                        //                     fieldNames: false, 
                        //                     overwriteFields: false
                        //                 }
                        //             },
                        //             admin: { fields: ['planned_families'], fieldNames: false, overwriteFields: false, defaultPeriod: 'month' ,filter_clusters: ['esnfi']},
                        //             admin_page: {
                        //                 downloads: [{ indicator_id: 'reports_due', indicator_name: 'Report Todo', type: 'csv' }, { indicator_id: 'reports_submitted', indicator_name: 'Report Completer', type: 'csv' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true
                        //             },
                        //             // dashboard_page: {
                        //             //     min_date: '2020-01-01', start_date: '2020-01-01', downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write: true }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']
                        //             // },
                        //             dashboard: {
                        //                 min_date: '2020-09-01', indicator: [{ id: 'beneficiaries', name: 'Total Assisted Families', calculate_indicator: ["$total_assisted_families"] }], fields: ['planned_families'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']  },
                        //             // projects_page: {
                        //             //     downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                        //             //     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //             //     fieldNames: false, overwriteFields: false, filter_clusters: ['health']
                        //             // },
                        //             reports_page: {
                        //                 start_date: '2020-01-01',
                        //                 report_types: [{  indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' },
                        //                     { indicator_id: 'winterization_summary', indicator_name: 'Winterization Summary', type: 'excel' }
                        //                 ],
                        //                 downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }],
                        //                 fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //                 fieldNames: false, overwriteFields: false,
                        //                 filter_clusters: ['esnfi'],
                        //             }
                        //         },
                        //         schedule: {
                        //             defaults: {
                        //                 "schedule": "0/10 * * * * *",
                        //                 "schedule_period": "month",
                        //                 "schedule_type": "every",
                        //                 "schedule_shift_period": 1,
                        //                 "schedule_shift_days": 0,
                        //                 "schedule_time": "4:30 PM",
                        //                 "schedule_datetime": "2020-01-01",
                        //                 "report_start_date_type": "year",
                        //                 "report_start_date": "2020-01-01",
                        //                 "report_end_date": "2020-12-31",
                        //                 "report_start_date_shift_period": 0,
                        //                 "report_start_date_shift_days": 0,
                        //                 "report_end_date_type": "year",
                        //                 "report_end_date_shift_period": 0,
                        //                 "report_end_date_shift_days": 0,
                        //                 "schedule_report_type": "beneficiaries"
                        //             },
                        //             lists: {
                        //                 schedule_periodes: ['year',
                        //                     'quarter',
                        //                     'month',
                        //                     'week',
                        //                     'day',
                        //                     'custom'],
                        //                 report_types: [{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' },
                        //                 { scheduled_report_type: 'winterization_summary', scheduled_report_name: 'Winterization Summary', type: 'excel' }
                        //                 ],
                        //                 types: ['every', 'once']
                        //             }
                        //         }
                        //     }
                        // }, 
                        // // {
                        // //         admin0pcode: "AF",
                        // //         // cluster_id: "heatlh",
                        // //         report_type_id: "annualworkplan20",
                        // //         report_type_name: "Annual Work Plan 2020",
                        // //         version: 'v1',
                        // //         status: 'active',
                        // //         // status: 'completed',
                        // //         // disabled: false,
                        // //         description: 'The Output Indicator Tracking', // optional
                        // //         project: {
                        // //             defaults: {
                        // //                 cluster: "Multi-Purpose Cash",
                        // //                 cluster_id: "cvwg"
                        // //                 // cluster_id: "esnfi",
                        // //                 // cluster: "ESNFI",
                        // //                 // cluster_ids: ['esnfi'],
                        // //                 // select_clusters: true
                        // //                 // select_clusters: {
                        // //                 //     list_cluster_ids: ['esnfi'],
                        // //                 //     selected: true
                        // //                 // }
                        // //             },
                        // //             v1: {
                        // //                 description: 'The Output Indicator Tracking', // optional

                        // //                 set_reporting_period_start: '2020-01-01', // optional to restrict/set project start end dates
                        // //                 set_reporting_period_end: '2020-12-31', // optional to restrict/set project start end dates
                        // //                 min_reporting_period: '2020-01-01', // optional to restrict/set project start end dates
                        // //                 max_reporting_period: '2021-12-31', // optional to restrict/set project start end dates

                        // //                 reporting_period_types: [{ reporting_period_type: 'quarterly', reporting_period_name: 'Quarterly' }
                        // //                 ],
                        // //                 // project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                        // //                 project_defaults: {
                        // //                     project_status: 'new',
                        // //                     project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                        // //                     project_description: 'Please, add the project description...',
                        // //                     project_details: [],
                        // //                     // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                        // //                     // project_end_date: moment.utc().add(12, 'M').endOf('M').format('YYYY-MM-DD'),
                        // //                     project_start_date: '2020-01-01',
                        // //                     project_end_date: '2020-12-31',
                        // //                     reporting_period_type: 'quarterly',
                        // //                     notes: '',
                        // //                     // cluster_id: "esnfi",
                        // //                     // cluster: "ESNFI",
                        // //                     // cluster_ids: ['esnfi'],
                        // //                     // clusters:[],
                        // //                     report_type_id: "annualworkplan20",
                        // //                     report_type_name: "Annual Work Plan 2020",
                        // //                     version: 'v1',
                        // //                 },
                        // //                 // list_cluster_ids: ['esnfi'],
                        // //                 // select_clusters: true,
                        // //                 project_download: {
                        // //                     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        // //                     fieldNames: false,
                        // //                     overwriteFields: false
                        // //                 },
                        // //                 beneficiaries: {
                        // //                     template: 'annualworkplan20.v1.beneficiaries.html',
                        // //                     defaults: {
                        // //                         cluster_id:'',
                        // //                         cluster_project_id: '',
                        // //                         donor_id:'',
                        // //                         target: 0,
                        // //                         planned_neutral: 0,
                        // //                         planned_m_b: 0,
                        // //                         planned_w_g: 0,
                        // //                         planned_total: 0,
                        // //                         achieved_neutral: 0,
                        // //                         achieved_m_b: 0,
                        // //                         achieved_w_g: 0,
                        // //                         achieved_total: 0,

                        // //                         remarks: '',
                        // //                         justification: '',

                        // //                         pwd: '',
                        // //                         children: '',
                        // //                         returnee: '',
                        // //                         beneficiary_type_id: 'b1',
                        // //                         beneficiary_type_name: 'B1',
                        // //                         // beneficiary_type_id: 'b1',
                        // //                         // beneficiary_type_name: 'B1',
                        // //                         // cluster_id: "esnfi",
                        // //                         // cluster: "ESNFI"
                        // //                     },
                        // //                     validate: ['cluster_id', 'indicator_id', 'target', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'achieved_neutral', 'achieved_m_b', 'achieved_w_g'],
                        // //                     // or
                        // //                     // validate: {
                        // //                     //     planned_families: true,
                        // //                     //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                        // //                     // },
                        // //                     // if custom activities
                        // //                     // activities: [
                        // //                     //     {
                        // //                     //         activity_type_id: 'test1',
                        // //                     //         activity_type_name: 'Test 1',
                        // //                     //         activity_description_id: 'subtest1',
                        // //                     //         activity_description_name: 'Sub Test 1',
                        // //                     //         defaults: {
                        // //                     //             'families': 0
                        // //                     //         },
                        // //                     //         validate: {
                        // //                     //                 families: { 'gte': 0, 'lte': 100 }
                        // //                     //         },
                        // //                     //         template: 'tes1.beneficiaries.html'
                        // //                     //     }
                        // //                     // ],
                        // //                     lists: {
                        // //                         clusters: [
                        // //                             {
                        // //                                 cluster_id: 'health',
                        // //                                 cluster_name: 'Health',
                        // //                             },
                        // //                             {
                        // //                                 cluster_id: 'Rural Development',
                        // //                                 cluster_name: 'Rural Development',
                        // //                             }, {
                        // //                                 cluster_id: 'Disability',
                        // //                                 cluster_name: 'Disability',
                        // //                             }
                        // //                         ],

                        // //                         projects: [
                        // //                             {
                        // //                                 cluster_project_id: 'CHNE',
                        // //                                 cluster_project_name: 'CHNE',
                        // //                                 cluster_id: 'health',
                        // //                                 cluster_name: 'Health',
                        // //                             },
                        // //                             {
                        // //                                 cluster_project_id: 'Clinic construction',
                        // //                                 cluster_project_name: 'Clinic construction',
                        // //                                 cluster_id: 'Rural Development',
                        // //                                 cluster_name: 'Rural Development',
                        // //                             },
                        // //                             {
                        // //                                 cluster_project_id: 'Orthopedic Workshop',
                        // //                                 cluster_project_name: 'Orthopedic Workshop',
                        // //                                 cluster_id: 'Disability',
                        // //                                 cluster_name: 'Disability',
                        // //                             }
                        // //                         ],

                        // //                         donor: [
                        // //                             {
                        // //                                 donor_id: 'General Fundraising',
                        // //                                 donor_name: 'General Fundraising'
                        // //                             },
                        // //                             {
                        // //                                 donor_id: 'European Union',
                        // //                                 donor_name: 'European Union'
                        // //                             },
                        // //                             {
                        // //                                 donor_id: 'SIDA',
                        // //                                 donor_name: 'SIDA'
                        // //                             }
                        // //                         ],

                        // //                         indicators: [
                        // //                             {
                        // //                                 indicator_id: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        // //                                 indicator_name: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        // //                                 cluster_id: 'health',
                        // //                                 cluster_name: 'Health',
                        // //                                 output_id: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        // //                                 output_name: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        // //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        // //                             },
                        // //                             {
                        // //                                 indicator_id: 'Number of health facilities repaired/ rehabilitated.',
                        // //                                 indicator_name: 'Number of health facilities repaired/ rehabilitated.',
                        // //                                 cluster_id: 'Rural Development',
                        // //                                 cluster_name: 'Rural Development',
                        // //                                 output_id: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        // //                                 output_name: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        // //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        // //                             },
                        // //                             {
                        // //                                 indicator_id: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        // //                                 indicator_name: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        // //                                 cluster_id: 'Disability',
                        // //                                 cluster_name: 'Disability',
                        // //                                 output_id: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        // //                                 output_name: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        // //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        // //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        // //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        // //                             }
                        // //                         ],

                        // //                         // to count atrribute that needed to coun
                        // //                         count: [
                        // //                             {
                        // //                                 total: 'planned_total',
                        // //                                 property_count: ['planned_neutral', 'planned_m_b', 'planned_w_g']
                        // //                             },
                        // //                             {
                        // //                                 total: 'achieved_total',
                        // //                                 property_count: ['achieved_neutral', 'achieved_m_b', 'achieved_w_g']
                        // //                             }
                        // //                         ]


                        // //                     },
                        // //                     location: {
                        // //                         total: 'achieved_total'
                        // //                     },
                        // //                     download: {
                        // //                         fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        // //                         fieldNames: false,
                        // //                         overwriteFields: false
                        // //                     }
                        // //                 },
                        // //                 admin: { fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true },
                        // //                 dashboard: {
                        // //                     min_date: '2020-01-01', indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write:true}], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: true
                        // //                 }
                        // //             }
                        // //         }
                        // //     },
                        //     {
                        //         admin0pcode: "AF",
                        //         // cluster_id: "heatlh",
                        //         report_type_id: "annualworkplan20",
                        //         report_type_name: "Annual Work Plan 2020",
                        //         version: 'v1',
                        //         status: 'active',
                        //         // status: 'completed',
                        //         // disabled: false,
                        //         description: 'The Output Indicator Tracking', // optional
                        //         project: {
                        //             defaults: {
                        //                 // cluster: "Multi-Purpose Cash",
                        //                 // cluster_id: "cvwg"
                        //                 // cluster_id: "esnfi",
                        //                 // cluster: "ESNFI",
                        //                 // cluster_ids: ['esnfi'],
                        //                 // select_clusters: true
                        //                 // select_clusters: {
                        //                 //     list_cluster_ids: ['esnfi'],
                        //                 //     selected: true
                        //                 // }
                        //             },
                        //             v1: {
                        //                 description: 'The Output Indicator Tracking', // optional

                        //                 set_reporting_period_start: '2020-01-01', // optional to restrict/set project start end dates
                        //                 set_reporting_period_end: '2020-12-31', // optional to restrict/set project start end dates
                        //                 min_reporting_period: '2020-01-01', // optional to restrict/set project start end dates
                        //                 max_reporting_period: '2021-12-31', // optional to restrict/set project start end dates

                        //                 reporting_period_types: [{ reporting_period_type: 'quarterly', reporting_period_name: 'Quarterly' }
                        //                 ],
                        //                 project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                        //                 project_defaults: {
                        //                     project_status: 'new',
                        //                     project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                        //                     project_description: 'Please, add the project description...',
                        //                     project_details: [],
                        //                     // project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                        //                     // project_end_date: moment.utc().add(12, 'M').endOf('M').format('YYYY-MM-DD'),
                        //                     project_start_date: '2020-01-01',
                        //                     project_end_date: '2020-12-31',
                        //                     reporting_period_type: 'quarterly',
                        //                     notes: '',
                        //                     // cluster_id: "esnfi",
                        //                     // cluster: "ESNFI",
                        //                     // cluster_ids: ['esnfi'],
                        //                     clusters:[],
                        //                     cluster_ids: [],
                        //                     report_type_id: "annualworkplan20",
                        //                     report_type_name: "Annual Work Plan 2020",
                        //                     version: 'v1',
                        //                 },
                        //                 // list_cluster_ids: ['health', 'disability', 'rural_development'],
                        //                 // select_clusters: true,
                        //                 list_clusters: [{ cluster_id: 'health', cluster: 'Health' }, { cluster_id: 'disability', cluster: 'Disability' }, { cluster_id: 'rural_development', cluster: 'Rural Development' }],
                        //                 project_download: {
                        //                     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //                     fieldNames: false,
                        //                     overwriteFields: false
                        //                 },
                        //                 beneficiaries: {
                        //                     template: 'annualworkplan20.v1.beneficiaries.html',
                        //                     defaults: {
                        //                         cluster_id: '',
                        //                         cluster_project_id: '',
                        //                         donor_id: '',
                        //                         target: 0,
                        //                         planned_neutral: 0,
                        //                         planned_m_b: 0,
                        //                         planned_w_g: 0,
                        //                         planned_total: 0,
                        //                         achieved_neutral: 0,
                        //                         achieved_m_b: 0,
                        //                         achieved_w_g: 0,
                        //                         achieved_total: 0,

                        //                         remarks: '',
                        //                         justification: '',

                        //                         pwd: '',
                        //                         children: '',
                        //                         returnee: '',
                        //                         beneficiary_type_id: 'b1',
                        //                         beneficiary_type_name: 'B1',
                        //                         // beneficiary_type_id: 'b1',
                        //                         // beneficiary_type_name: 'B1',
                        //                         // cluster_id: "esnfi",
                        //                         // cluster: "ESNFI"
                        //                     },
                        //                     validate: ['cluster_id', 'indicator_id', 'target', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'achieved_neutral', 'achieved_m_b', 'achieved_w_g'],
                        //                     // or
                        //                     // validate: {
                        //                     //     planned_families: true,
                        //                     //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                        //                     // },
                        //                     // if custom activities
                        //                     // activities: [
                        //                     //     {
                        //                     //         activity_type_id: 'test1',
                        //                     //         activity_type_name: 'Test 1',
                        //                     //         activity_description_id: 'subtest1',
                        //                     //         activity_description_name: 'Sub Test 1',
                        //                     //         defaults: {
                        //                     //             'families': 0
                        //                     //         },
                        //                     //         validate: {
                        //                     //                 families: { 'gte': 0, 'lte': 100 }
                        //                     //         },
                        //                     //         template: 'tes1.beneficiaries.html'
                        //                     //     }
                        //                     // ],
                        //                     lists: {
                        //                         clusters: [
                        //                             {
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                             },
                        //                             {
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                             }, {
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                             }
                        //                         ],

                        //                         projects: [
                        //                             {
                        //                                 cluster_project_id: 'CHNE',
                        //                                 cluster_project_name: 'CHNE',
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                             },
                        //                             {
                        //                                 cluster_project_id: 'Clinic construction',
                        //                                 cluster_project_name: 'Clinic construction',
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                             },
                        //                             {
                        //                                 cluster_project_id: 'Orthopedic Workshop',
                        //                                 cluster_project_name: 'Orthopedic Workshop',
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                             }
                        //                         ],

                        //                         donor: [
                        //                             {
                        //                                 donor_id: 'General Fundraising',
                        //                                 donor_name: 'General Fundraising'
                        //                             },
                        //                             {
                        //                                 donor_id: 'European Union',
                        //                                 donor_name: 'European Union'
                        //                             },
                        //                             {
                        //                                 donor_id: 'SIDA',
                        //                                 donor_name: 'SIDA'
                        //                             }
                        //                         ],

                        //                         indicators: [
                        //                             {
                        //                                 indicator_id: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        //                                 indicator_name: 'Number of community nurses graduated from SCA supported Community Health Nursing Education (CHNE) schools.',
                        //                                 cluster_id: 'health',
                        //                                 cluster_name: 'Health',
                        //                                 output_id: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        //                                 output_name: 'Output 1.1.1: Qualified and competent health and rehabilitation staff (men and women) are available at SCA coverage area.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             },
                        //                             {
                        //                                 indicator_id: 'Number of health facilities repaired/ rehabilitated.',
                        //                                 indicator_name: 'Number of health facilities repaired/ rehabilitated.',
                        //                                 cluster_id: 'Rural Development',
                        //                                 cluster_name: 'Rural Development',
                        //                                 output_id: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        //                                 output_name: 'Output 1.1.3: Health facilities are constructed and rehabilitated to make health services available to SCA\'s target groups.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             },
                        //                             {
                        //                                 indicator_id: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        //                                 indicator_name: 'Number of needy persons with disability attending  orthoaedic workshop provided with transport support.',
                        //                                 cluster_id: 'Disability',
                        //                                 cluster_name: 'Disability',
                        //                                 output_id: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        //                                 output_name: 'Output 1.1.5: Effective referral and transport system is in place to ensure that clients receive appropriate and timely health services.',
                        //                                 outcome_id: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 outcome_name: 'Outcome 1.1: Improved access to quality health care and utilization of health services.',
                        //                                 so_id: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 so_name: 'Strategic Objective 1: The health and nutrition conditions of SCA target groups are improved.',
                        //                                 set_attributes: ['so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name']
                        //                             }
                        //                         ],

                        //                         // to count atrribute that needed to coun
                        //                         count: [
                        //                             {
                        //                                 total: 'planned_total',
                        //                                 property_count: ['planned_neutral', 'planned_m_b', 'planned_w_g']
                        //                             },
                        //                             {
                        //                                 total: 'achieved_total',
                        //                                 property_count: ['achieved_neutral', 'achieved_m_b', 'achieved_w_g']
                        //                             }
                        //                         ]


                        //                     },
                        //                     location: {
                        //                         total: 'achieved_total'
                        //                     },
                        //                     download: {
                        //                         fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'],
                        //                         fieldNames: false,
                        //                         overwriteFields: false
                        //                     }
                        //                 },
                        //                 default_page: {
                        //                     pages: ['admin_page', 'dashboard_page', 'projects_page', 'reports_page'], pages: { admin_page: true, dashboard_page: true, 'projects_page': true, 'reports_page': true }, downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: true
                        //                 },
                        //                 admin_page: {
                        //                     downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, defaultPeriod: 'quarter', filter_clusters: true
                        //                 },
                        //                 dashboard_page: {
                        //                     min_date: '2020-01-01', start_date: '2020-01-01', downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], indicator: [{ id: 'beneficiaries', name: 'Achieved Total', calculate_indicator: ["$achieved_total"], write: true }], fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']
                        //                 },
                        //                 projects_page: {
                        //                     downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                        //                     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                        //                     fieldNames: false, overwriteFields: false, filter_clusters: ['health']
                        //                 },
                        //                 reports_page: {
                        //                     start_date: '2020-01-01', 
                        //                     report_types: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                        //                     downloads: [{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }], 
                        //                     fields: ['indicator_id', 'indicator_name', 'so_id', 'so_name', 'outcome_id', 'outcome_name', 'output_id', 'output_name', 'cluster_project_id', 'cluster_project_name', 'donor_id', 'donor_name', 'planned_neutral', 'planned_m_b', 'planned_w_g', 'planned_total', 'achieved_neutral', 'achieved_m_b', 'achieved_total'], 
                        //                     fieldNames: false, overwriteFields: false, 
                        //                     filter_clusters: ['esnfi'],                                            
                        //                 },
                        //                 // schedule:{
                        //                 //     defaults: {
                        //                 //         schedule_type: 'every',
                        //                 //         schedule_period: 'quarter',
                        //                 //         shift_period: 0,
                        //                 //         shift_days: 0,
                        //                 //         time: "00:00",
                        //                 //         scheduled_report_type: 'beneficiaries',
                        //                 //         report_start_date: 'year',
                        //                 //         report_start_date_shift_period: 0,
                        //                 //         report_start_date_shift_days: 0,
                        //                 //         report_end_date: 'month',
                        //                 //         report_end_date_shift_period: 1,
                        //                 //         report_end_date_shift_days: 0,
                        //                 //         start_date: '2020-01-01',
                        //                 //         end_date: '2020-01-01'
                        //                 //     },
                        //                 //     lists:{
                        //                 //         schedule_periodes:[ 'year',
                        //                 //                  'quarter',
                        //                 //                  'month',
                        //                 //                  'week',
                        //                 //                  'day',
                        //                 //                  'custom'],
                        //                 //         report_types:[{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' },
                        //                 //                       { scheduled_report_type: 'indicators_summary', scheduled_report_name: 'Indicators Summary', type: 'excel' }
                        //                 //                     ]
                        //                 //     }
                        //                 // }

                        //             },
                        //             schedule: {
                        //                 defaults: {
                        //                     // schedule_type: 'every',
                        //                     // schedule_period: 'quarter',
                        //                     // shift_period: 0,
                        //                     // shift_days: 0,
                        //                     // time: "00:00",
                        //                     // scheduled_report_type: 'beneficiaries',
                        //                     // report_start_date: 'year',
                        //                     // report_start_date_shift_period: 0,
                        //                     // report_start_date_shift_days: 0,
                        //                     // report_end_date: 'month',
                        //                     // report_end_date_shift_period: 1,
                        //                     // report_end_date_shift_days: 0,
                        //                     // start_date: '2020-01-01',
                        //                     // end_date: '2020-01-01'
                        //                     "schedule": "0/10 * * * * *",
                        //                     "schedule_period": "month",
                        //                     "schedule_type": "every",
                        //                     "schedule_shift_period": 1,
                        //                     "schedule_shift_days": 0,
                        //                     "schedule_time": "4:30 PM",
                        //                     "schedule_datetime": "2020-01-01",
                        //                     "report_start_date_type": "year",
                        //                     "report_start_date": "2020-01-01",
                        //                     "report_end_date": "2020-12-31",
                        //                     "report_start_date_shift_period": 0,
                        //                     "report_start_date_shift_days": 0,
                        //                     "report_end_date_type": "year",
                        //                     "report_end_date_shift_period": 0,
                        //                     "report_end_date_shift_days": 0,
                        //                     "schedule_report_type": "beneficiaries"
                        //                 },
                        //                 lists: {
                        //                     schedule_periodes: ['year',
                        //                         'quarter',
                        //                         'month',
                        //                         'week',
                        //                         'day',
                        //                         'custom'],
                        //                     report_types: [{ schedule_report_type: 'beneficiaries', schedule_report_name: 'Beneficiaries', type: 'csv' },
                        //                     { schedule_report_type: 'indicators_summary', schedule_report_name: 'Indicators Summary', type: 'excel' }
                        //                     ],
                        //                     types: ['every', 'once']
                        //                 }
                        //             }
                        //         }
                        //     }
                        // ]
                        // return lists_config
                        return ngmCustomConfig.staticList
                    },


                    getCustomConfig: function (admin0pcode) {
                        return ngmCustomConfig.listCustomConfig().filter(x=>x.admin0pcode === admin0pcode);

                    },

                    getReportTypesList: function (admin0pcode){
                        var list = ngmCustomConfig.listCustomConfig()
                        if (admin0pcode){
                            list = list.filter(x => x.admin0pcode === admin0pcode).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } });
                        }
                        return list;
                    },
                    getCustomProjectConfig: function(report_type_id){
                        
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        var report_type =  ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } })[0];
                        var config_project_version = config_project[version];

                        config_project_version = angular.merge({}, config_project.defaults, config_project_version,report_type);

                        if (config_project_version && config_project_version.beneficiaries){
                            delete config_project_version.beneficiaries; 
                        }

                        return config_project_version ? config_project_version:{};

                    },
                    setNewProjectDefault: function (report_type_id){
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;

                        // var default_project = angular.merge({}, config[0].project.defaults, config_project[version].project_defaults);
                        var default_project = config_project[version].project_defaults;

                        return default_project
                    
                    },
                    getCustomProjectConfigWithVersion: function (report_type_id,version) {
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var report_type = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } })[0];
                        var config_project_version = config_project[version];

                        config_project_version = angular.merge({}, config_project.defaults, config_project_version, report_type);

                        if (config_project_version && config_project_version.beneficiaries) {
                            delete config_project_version.beneficiaries;
                        }

                        return config_project_version ? config_project_version : {};

                    },
                    getCustomConfigProjectDownload:function(report_type_id, version){
                        var download ={};
                        if(version){
                           download = ngmCustomConfig.getCustomProjectConfigWithVersion(report_type_id, version).project_download;
                        }else{
                            download = ngmCustomConfig.getCustomProjectConfig(report_type_id).project_download;
                        }
                        return download;

                    },
                    getCustomBeneficiariesConfig: function (report_type_id,version){
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        // var version = config[0].version;
                        var config_beneficiaries_version = config_project[version].beneficiaries;

                        return config_beneficiaries_version

                    },
                    // get attribute for Beneficiaries
                    getCustomBeneficiariesConfigAttribute: function (report_type_id,version){

                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).defaults;

                    },
                    // get validate for Beneficiaries
                    getCustomBeneficiariesConfigValidate: function (report_type_id,version) {

                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).validate;

                    },
                    // get List for Beneficiaries 
                    getCustomBeneficiariesConfigLists: function (report_type_id,version) {
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).lists;

                    },
                    // get template for Beneficiaries
                    getCustomBeneficiariesConfigTemplate: function (report_type_id,version) {
                        // check template that need to return 
                        if (ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).template_api){
                            // if template_api is exist then return template_api
                            return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).template_api
                        }
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).template;

                    },

                    getCustomBeneficiariesConfigTotal: function (report_type_id, version){
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).location.total;
                    },

                    getCustomBeneficiariesConfigDownload: function (report_type_id, version){
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).download;
                    },

                    // get dashboard config
                    getCustomDashboardConfig:function(report_type_id){

                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        if (config_project[version].dashboard_page) {
                            if (!config_project[version].dashboard_page.downloads) {
                                config_project[version].dashboard_page.downloads = config_project[version].default_page.downloads
                            }
                            var config_dashboard_version = config_project[version].dashboard_page;
                        }else{
                            var config_dashboard_version = config_project[version].dashboard;
                        }
                        return config_dashboard_version

                    },

                    getCustomAdminDashboardConfig: function (report_type_id){

                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        if (config_project[version].admin_page){
                            if(!config_project[version].admin_page.downloads){
                                config_project[version].admin_page.downloads = config_project[version].default_page.downloads
                            }
                            var config_admin_version = config_project[version].admin_page;
                        }else{
                             var config_admin_version = config_project[version].admin;
                        }
                       

                        return config_admin_version

                    },


                    getCustomProjectListDashboardConfig: function (report_type_id) {

                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        var config_admin_version = config_project[version].projects_page;
                

                        return config_admin_version

                    },

                    getCustomReportsFileConfig: function (report_type_id){
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        // console.log(config_project)
                        var config_admin_version = config_project[version].reports_page;


                        return config_admin_version
                    },
                    getCustomScheduleConfig: function (report_type_id) {
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        // var version = config[0].version;
                        var config_beneficiaries_version = config_project.schedule;

                        return config_beneficiaries_version

                    },
                    getCustomScheduleConfigLists: function (report_type_id) {
                        return ngmCustomConfig.getCustomScheduleConfig(report_type_id).lists;
                    },

                    getCustomScheduleConfigAttribute: function (report_type_id) {

                        return ngmCustomConfig.getCustomScheduleConfig(report_type_id).defaults;

                    },

                   

                };

                return ngmCustomConfig;

            }]);
