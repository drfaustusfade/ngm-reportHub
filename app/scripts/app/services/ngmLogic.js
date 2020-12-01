angular.module('ngmReportHub')
    .factory('ngmConditionalLogic', function () {

        // const list_config_ui ={
        //     // cluster.home.page.html or /desk/#/cluster/organization
        //     projects_menu:{
        //         admin0pcode: ['AF','COL','ET','CB','NG','PG','PHL','SO','SS']
        //     }

        // }

        var ngmConditionalLogic = {
        //   showUI:(type,src)=>{
        //     var conditions = list_config_ui[type];
        //         if (Object.keys(conditions)){
        //             var show = false;
        //             for(i in conditions){
        //                 if(src[i] &&  conditions[i].indexOf(src[i]> -1)){
        //                     show = true;
        //                 }else{
        //                     show = false;
        //                 }
        //             }
        //         }
        //     }
            showUI: (type,params)=>{
                switch (type) {
                    //INDEX.HTML
                    case'record_admin_menu':
                        var list_admin0pcode = ['AF'];
                        
                        if (params && list_admin0pcode.indexOf(params.admin0pcode) > -1) {
                            return true
                        }
                        return false
                        break
                    case 'epr_menu':
                        var list_admin0pcode = ['AF'];
                        if (list_admin0pcode.indexOf(params.admin0pcode) > -1 && (params.organization.toLowerCase() === 'immap' ||
                            params.organization.toLowerCase() === 'moph' ||
                            params.organization.toLowerCase() === 'who' ||
                            params.organization.toLowerCase() === 'dews')) {
                            return true
                        }
                        return false
                        break
                    case 'nutrition_weekly_menu':
                        var list_admin0pcode = ['AF'];
                        
                        if (list_admin0pcode.indexOf(params.admin0pcode) > -1 && (params.cluster_id.toLowerCase() === 'nutrition' || params.organization.toLowerCase() === 'usaid')) {
                            return true
                        }
                        return false
                        break
                    case '5w_dashboard_menu':
                        
                        if (params.admin0pcode !== 'COL') {
                            return true
                        }
                        return false
                        break
                    case 'dews_dashboard_menu':
                        if (params.admin0pcode === 'AF' &&(params.organization.toLowerCase() === 'immap' ||
                            params.organization.toLowerCase() === 'who' ||
                            params.organization.toLowerCase() === 'dews'))
                        return false
                        break
                    case 'drought_menu':
                        
                        var list_admin0pcode = ['AF'];
                        if (list_admin0pcode.indexOf(params.admin0pcode) > -1) {
                            return true
                        }
                        return false
                        break
                    case 'assessment_menu':

                        if (params.welcome !== 'welcome' &&params.user.admin0pcode.toLowerCase() === 'et' &&
                            params.user.organization.toLowerCase() === 'who') {
                            return true
                        }
                        return false
                        break
                    case 'immap_menu':
                        
                        if (params.welcome !== 'welcome' && params.user.organization === 'iMMAP') {
                            return true
                        }
                        return false
                        break
                    //PROFILE
                    case 'profile_program_field':
                        if (params.organization === 'iMMAP' &&
                            (params.admin0pcode === 'CD' || params.admin0pcode === 'ET')){
                                return true;
                        }
                        return false; 
                    case 'profile_date_field':
                        if (params.organization === 'iMMAP' &&
                            (params.admin0pcode === 'CD' || params.admin0pcode === 'ET')) {
                            return true;
                        }
                        return false;
                    // HOME
                    case 'home_project_menu_img':
                        var list_admin0pcode = ['AF', 'COL', 'ET', 'CB', 'NG', 'PG', 'PHL', 'SO', 'SS']
                        if(list_admin0pcode.indexOf(params.admin0pcode)>-1){
                            return true;
                        }
                        return false;
                        
                        break;
                    case 'home_project_menu_btn':
                        if(params.admin0pcode === 'AF'){
                            return true
                        }
                        return false
                        break ;
                    case 'home_stock_menu':
                        var list_admin0pcode = ['COL', 'PHL']
                        if (list_admin0pcode.indexOf(params.admin0pcode)<0){
                            return true
                        }
                        return false
                        break;
                    // STOCK LIST
                    case 'stock_warehouse_location_import_btn':
                        if (params.admin0pcode === 'AF'){
                            return true
                        }
                        return false
                        break
                    // STOCK REPORT
                    case 'stock_report_field_stock_purpose':
                        if(params.admin0pcode==='ET'){
                            return true
                        }
                        return false
                        break;
                    case 'stock_report_field_stock_type':
                        if (params.admin0pcode === 'ET') {
                            return true
                        }
                        return false
                        break;
                    case 'stock_report_field_implementing_partner':
                        if (params.admin0pcode === 'ET') {
                            return true
                        }
                        return false
                        break;
                    case 'stock_report_field_donor':
                        if (params.admin0pcode === 'ET') {
                            return true
                        }
                        return false
                        break;
                    case 'stock_report_field_households':
                        if (params.admin0pcode === 'ET') {
                            return true
                        }
                        return false
                        break;
                    // PROJECT DETAIL
                    case 'project_detail_so':
                        if(params.admin0pcode === 'AF'){
                            return true
                        }
                        return false
                        break
                    case 'project_detail_classification':
                        if(params.admin0pcode === 'COL'){
                            return true
                        }
                        return false
                        break
                    case 'project_detail_title':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_import_btn':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_copy_btn':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_hrp_jrp':
                        if (params.admin0pcode === 'COL') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_hrp_code':
                        if (params.admin0pcode === 'SO') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_gender':
                        if (params.admin0pcode === 'COL') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_response_comment':
                        if (params.admin0pcode === 'COL') {
                            return true
                        }
                        return false
                        break
                    case 'project_detail_activity_type':
                        if (params.admin0pcode === 'CB'){
                            if(params.cluster_id !=='health'){
                                return true 
                            }
                             return false;                          
                        }else{
                            return true
                        }
                        break
                    case 'project_detail_donor_col':
                        if (params.admin0pcode === 'COL') {
                            return true
                        }
                        return false
                        break
                    // PROJECT DETAIL TARGET LOCATION
                    case 'target_location_title':
                        if(params.admin0pcode === 'AF'){
                            return true
                        }
                        return false
                        break
                    case 'target_location_import_btn':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    case 'target_location_group':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    //PROJECT DETAIL TARGET BENEFICIARIES
                    case 'target_showrespons_notif':
                        if (params.cluster_id === 'wash' && params.admin0pcode === 'AF') {
                            return true
                        }
                        return
                    case 'target_beneficiary_default':

                        if (params.activity_description_id) {
                            if (!params.display_activity_detail) {
                                return true
                            }
                        } else {
                            return true
                        }
                        return false
                    case'target_beneficiary_type':
                        if (params.activity_description_id &&
                            !params.form['beneficiary_category_type_id'] &&
                            !params.project.project_hrp_project){

                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_category':
                        if (params.activity_description_id &&
                            params.form['beneficiary_category_type_id'] &&
                            !params.project.project_hrp_project) {

                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_hrp':
                        if (params.activity_description_id &&
                            !params.form['beneficiary_category_type_id'] && !params.form['hrp_beneficiary_type_id'] &&
                            params.project.project_hrp_project && params.project.admin0pcode === 'AF') {

                            return true
                        }
                        return false
                        break 
                    case 'target_beneficiary_hrp_not':
                        if (params.activity_description_id &&
                            !params.form['beneficiary_category_type_id'] &&
                            params.project.project_hrp_project && (params.form['hrp_beneficiary_type_id'] || params.project.admin0pcode !== 'AF')) {

                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_category_hrp':
                        if (params.activity_description_id &&
                            params.form['beneficiary_category_type_id'] && !params.form['hrp_beneficiary_type_id'] &&
                            params.project.project_hrp_project && params.project.admin0pcode === 'AF') {

                            return true
                        }
                        return false
                        break 
                    case 'target_beneficiary_category_hrp_not':
                        if (params.activity_description_id &&
                            params.form['beneficiary_category_type_id'] &&
                            params.project.project_hrp_project && (params.form['hrp_beneficiary_type_id'] || params.project.admin0pcode !== 'AF')) {

                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_response':
                        if (params['response'] && params['response'].length) {
                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_mpc_delivery_mechanism':
                        if (params['mpc_delivery_type_id'] && params['mpc_mechanism_type_id'] && !params['mpc_package_type_id']) {
                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_mpc_delivery_package':
                        if (params['mpc_delivery_type_id'] && params['mpc_mechanism_type_id'] && params['mpc_package_type_id']) {
                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_mpc_delivery':
                        if (params['mpc_delivery_type_id'] && !params['mpc_mechanism_type_id'] && !params['mpc_package_type_id'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_mpc_delivery_package_without_transfer':
                        if (params['mpc_delivery_type_id'] && !params['mpc_mechanism_type_id'] && params['mpc_package_type_id'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                        break
                    case 'target_beneficiary_mpc_transfer_category_grant':
                        if (params['mpc_transfer_category_id'] && params['mpc_grant_type_id']) {
                            return true
                        }
                        return false
                    case 'target_beneficiary_unit_transfer':
                        if (params['unit_type_id'] && params['units'] && params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                    case 'target_beneficiary_unit_without_transfer':
                        if (params['unit_type_id'] && params['units'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                    case 'target_beneficiary_sadd_age_breakdown_male':
                        if (params['boys_0_5'] && params['boys_6_11'] && params['boys_12_17'] && params['men'] && params['elderly_men'] && params['total_male']) {
                            return true
                        }
                        return false
                    case 'target_beneficiary_sadd_age_breakdown_female':
                        if (params['girls_0_5'] && params['girls_6_11'] && params['girls_12_17'] && params['women'] && params['elderly_women'] && params['total_female']) {
                            return true
                        }
                        return false
                    case 'target_beneficary_sadd_boys_girl_men_women':
                        if ((params['boys'] || params['girls'] || params['men'] || params['women']) &&
                            (!params['boys_0_5'] && !params['boys_6_11'] && !params['boys_12_17'] && !params['girls_0_5'] && !params['girls_6_11'] && !params['girls_12_17']) &&
                            (!params['elderly_men'] && !params['elderly_women'])) {
                            return true
                        }
                        return false
                    case 'target_beneficary_sadd_boys_girl_men_women_elderly':
                        if ((params['boys'] &&
                            params['girls'] &&
                            params['men'] &&
                            params['women'] &&
                            params['elderly_men'] &&
                            params['elderly_women']) &&
                            (!params['boys_0_5'] &&
                                !params['boys_6_11'] &&
                                !params['boys_12_17'] &&
                                !params['girls_0_5'] &&
                                !params['girls_6_11'] &&
                                !params['girls_12_17'])) {
                            return true
                        }
                        return false
                    case 'target_beneficary_sadd_men_women_elderly':
                        if ((
                            params['men'] &&
                            params['women'] &&
                            params['elderly_men'] &&
                            params['elderly_women']) &&
                            (!params['boys_0_5'] &&
                                !params['boys_6_12'] &&
                                !params['boys_13_17'] &&
                                !params['girls_0_5'] &&
                                !params['girls_6_12'] &&
                                !params['girls_13_17'] &&
                                !params['boys'] &&
                                !params['girls'])) {
                            return true
                        }
                        return false
                    // MONTHLY REPORT
                    case 'monthly_report_edit_btn':
                        if (params.definition.project_status === 'active' &&
                            params.report.report_year >= params.reportingYear() - 1 &&
                            params.report.report_status === 'complete' &&
                            params.canEdit){
                                return true
                            }
                            return false
                    case 'monthly_report_import_btn':
                        if ((params.project.report.admin0pcode !== 'AF') ||
                            params.deactivedCopybutton ||
                            (!params.project.canEdit || params.project.definition.project_status === 'complete' || params.project.report.report_status === 'complete')){
                                return true
                            }
                            return false
                    case 'monthly_report_copy_previous_month_btn':
                        if ((params.project.report.admin0pcode === 'ET' && params.project.report.cluster_id === 'esnfi') ||
                            params.deactivedCopybutton ||
                            (!params.project.canEdit || params.project.definition.project_status === 'complete' || params.project.report.report_status === 'complete')){
                                return true
                            }
                        return false
                    case 'monthly_report_add_new_location_btn':
                        if (((params.definition.admin0pcode === 'ET' &&
                            params.definition.cluster_id === 'esnfi') || params.definition.admin0pcode === 'AF') &&
                            params.definition.project_status !== 'complete' &&
                            params.report.report_status !== 'complete'){
                                return true
                        }
                        return false
                    case 'monthly_report_submit':
                        if(params.admin0pcode === 'NG'){
                            return true
                        }
                        return false
                        break
                    case 'monthly_report_validation':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                        break
                    case 'monthly_report_showrespons_notif':
                        if (params.cluster_id === 'wash' && params.admin0pcode === 'AF'){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_default':
                        
                        if (params.activity_description_id){
                            if (!params.display_activity_detail){
                                return true
                            }
                        }else{
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_label':
                        if(params.admin0pcode === 'SO'){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_implementing_partner':
                        var list_admin0pcode = ['AF', 'ET']
                        if (list_admin0pcode.indexOf(params.admin0pcode) > -1 ){
                            if (params.implementing_partners && params.implementing_partners.length >0){
                                return true
                            }
                            return false
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_nohrp':
                        if (!params.form['beneficiary_category_type_id'] && !params.form['beneficiary_delivery_type_id'] && !params.project.project_hrp_project){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_delivery_nohrp':
                        if (!params.form['beneficiary_category_type_id'] && params.form['beneficiary_delivery_type_id'] && !params.project.project_hrp_project) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_hrp':
                        if (!params.form['beneficiary_category_type_id'] && !params.form['beneficiary_delivery_type_id'] && params.project.project_hrp_project && !params.form['hrp_beneficiary_type_id'] && params.project.admin0pcode === 'AF') {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_delivery_hrp':
                        if (!params.form['beneficiary_category_type_id'] && params.form['beneficiary_delivery_type_id'] && params.project.project_hrp_project && !params.form['hrp_beneficiary_type_id'] && params.project.admin0pcode === 'AF') {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_hrp_not':
                        if (!params.form['beneficiary_category_type_id'] && !params.form['beneficiary_delivery_type_id'] && params.project.project_hrp_project && (params.form['hrp_beneficiary_type_id'] || params.project.admin0pcode !== 'AF')) {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_delivery_hrp_not':
                        if (!params.form['beneficiary_category_type_id'] && params.form['beneficiary_delivery_type_id'] && params.project.project_hrp_project && (params.form['hrp_beneficiary_type_id'] || params.project.admin0pcode !== 'AF')) {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_category_delivery_nohrp':
                        if (params.form['beneficiary_category_type_id'] && !params.project.project_hrp_project && params.form['beneficiary_delivery_type_id']) {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_category_delivery_hrp':
                        if (params.form['beneficiary_category_type_id'] && params.form['beneficiary_delivery_type_id']&& params.project.project_hrp_project && !params.form['hrp_beneficiary_type_id'] && params.project.admin0pcode === 'AF') {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficiary_activity_description_category_delivery_hrp_not':
                        if (params.form['beneficiary_category_type_id'] && params.form['beneficiary_delivery_type_id'] && params.project.project_hrp_project && (params.form['hrp_beneficiary_type_id'] || params.project.admin0pcode !== 'AF')) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_response':
                        if (params['response'] && params['response'].length ) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_mpc_delivery_mechanism':
                        if (params['mpc_delivery_type_id'] && params['mpc_mechanism_type_id'] && !params['mpc_package_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_mpc_delivery_package':
                        if (params['mpc_delivery_type_id'] && params['mpc_mechanism_type_id'] && params['mpc_package_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_mpc_delivery':
                        if (params['mpc_delivery_type_id'] && !params['mpc_mechanism_type_id'] && !params['mpc_package_type_id'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_mpc_delivery_package_without_transfer':
                        if (params['mpc_delivery_type_id'] && !params['mpc_mechanism_type_id'] && params['mpc_package_type_id'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_mpc_transfer_category_grant':
                        if (params['mpc_transfer_category_id'] && params['mpc_grant_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_unit_transfer':
                        if (params['unit_type_id'] && params['units'] && params['mpc_transfer_type_id']){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_unit_without_transfer':
                        if (params['unit_type_id'] && params['units'] && !params['mpc_transfer_type_id']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_sadd_age_breakdown_male':
                        if(params['boys_0_5'] && params['boys_6_11'] && params['boys_12_17'] && params['men'] && params['elderly_men'] && params['total_male']){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_sadd_age_breakdown_female':
                        if (params['girls_0_5'] && params['girls_6_11'] && params['girls_12_17'] && params['women'] && params['elderly_women'] && params['total_female']) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficiary_slightly_sadd_age_breakdown':
                        if (params.admin0pcode === 'NG' && (params.cluster_id === 'child_protection' || params.cluster_id === 'gbv' )) {
                                return true
                        }
                        return false
                    case 'monthly_report_beneficary_sadd_boys_girl_men_women':
                        if ((params['boys'] || params['girls'] || params['men'] || params['women']) && 
                        (!params['boys_0_5'] && !params['boys_6_11'] && !params['boys_12_17'] &&  !params['girls_0_5'] && !params['girls_6_11'] && !params['girls_12_17']) && 
                        (!params['elderly_men'] &&     !params['elderly_women']))
                        {
                            return true
                                    }
                        return false
                    case 'monthly_report_beneficary_sadd_boys_girl_men_women_elderly':
                        if ((params['boys'] &&
                            params['girls'] &&
                            params['men'] &&
                            params['women'] &&
                            params['elderly_men'] &&
                            params['elderly_women']) &&
                            (!params['boys_0_5'] &&
                                !params['boys_6_11'] &&
                                !params['boys_12_17'] &&
                                !params['girls_0_5'] &&
                                !params['girls_6_11'] &&
                                !params['girls_12_17'])) {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficary_sadd_men_women_elderly':
                        if ((
                            params.form['men'] &&
                            params.form['women'] &&
                            params.form['elderly_men'] &&
                            params.form['elderly_women']) &&
                            (!params.form['boys_0_5'] &&
                                !params.form['boys_6_12'] &&
                                !params.form['boys_13_17'] &&
                                !params.form['girls_0_5'] &&
                                !params.form['girls_6_12'] &&
                                !params.form['girls_13_17'] &&
                                !params.form['boys'] &&
                                !params.form['girls'])
                            && (params.project.admin0pcode !== 'NG' && params.project.cluster_id !== 'gbv')){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficary_add_wash_activity_btn':
                        if (params.admin0pcode === 'NG' && params.cluster_id === 'wash'){
                            return true
                        }
                        return false
                    case 'monthly_report_beneficary_add_ng_activity_btn':
                        if (params.admin0pcode === 'NG' && params.cluster_id !== 'wash') {
                            return true
                        }
                        return false
                    case 'monthly_report_beneficary_add_activity_btn':
                        if (params.admin0pcode !== 'NG') {
                            return true
                        }
                        return false
                    case 'project_summary_btn':
                        if (params.admin0pcode === 'AF') {
                            return true
                        }
                        return false
                    default:
                        return false;
                }
            },
            checkCondition(type,params){
               
                switch (type) {
                     // HOMEPAGE JS
                    case 'ctrl_homepage_set_template':
                        var list_admin0pcode = [ 'CB','PHL','SY'];

                        if (list_admin0pcode.indexOf(params.admin0pcode) > -1) {
                            return true
                        }
                        return false
                        break;
                    // FORM DETAIL JS
                    case 'ctrl_show_location_groupings_option':

                        if (params.admin0pcode === 'CB' &&
                            (params.organization === 'WFP' ||
                                params.organization === 'FAO' ||
                                params.organization === 'IOM' ||
                                params.organization === 'UNHCR')) {
                            return true
                        }
                        return false
                        break;
                    case 'ctrl_authentication_path_after_update_delete':
                        if (params.organization === 'iMMAP' && (params.admin0pcode === 'CD' || params.admin0pcode === 'ET')){
                            return true
                        }
                        return false
                    default:
                        break;
                }
            },
            getDefaults(type,params){
                switch (type) {
                    case 'form_stock_row_save_disabled':
                        if (params.implementing_partners && params.donors ){
                            if ((params.implementing_partners && !params.implementing_partners[0] || !params.implementing_partners[0].organization_tag) || (params.donors && !params.donors[0] || !params.donors[0].donor_id) || params.detailRowDisabled){
                                return true
                            }
                        }
                        return false
                        
                        break;
                
                    default:
                        break;
                }

            }
        }
       
        return ngmConditionalLogic
    });