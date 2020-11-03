angular.module('ngm.widget.report.type.form.beneficiaries', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('report.type.form.beneficiaries', {
                title: 'Report Type Beneficiaries Form',
                description: 'Report Type Beneficiaries Form',
                controller: 'ReportTypeBeneficiariesFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/beneficiaries.list.html'
            });
    })
    .controller('ReportTypeBeneficiariesFormCtrl', [
        '$scope',
        'config',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
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
            $filter,
            $location,
            $route
        ) {

            $scope.inputString = true;

            $scope.master = {
                // current user
                user: ngmUser.get(),
                definition: config.definition,
                newForm: $route.current.params.id === 'new' ? true : false,
                validate: function () {
                    if ($scope.inputString) {
                        json = JSON.parse($scope.master.definition)
                    } else {
                        json = $scope.master.definition;
                    }
                    if(!$scope.master.newForm){
                        json = {form: json}
                    }
                    missing = '';
                    if (!json.form) {
                        missing += 'form </br>'
                    } else {
                        if (!json.form.admin0pcode) {
                            missing += 'admin0pcode </br>'
                        }
                        if (!json.form.form_id) {
                            missing += ' form_id </br>'
                        }
                        if (!json.form.form_type_id || json.form.form_type_id !== 'project') {
                            missing += 'form_type_id</br>'

                            if (json.form.form_type_id !== 'project') {
                                missing += 'form_type_id value should be "project"</br>'
                            }
                        }
                        if (!json.form.type) {
                            missing += 'type </br>'
                        }
                        if (!json.form.config) {
                            missing += 'config </br>'
                        }
                    }

                    if (missing !== '') {
                        M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                    } else {
                        if ($scope.inputString) {
                            $scope.master.definition = JSON.parse($scope.master.definition)
                        } else {
                            $scope.master.definition = $scope.master.definition;
                        }
                        $scope.master.save();
                    }
                },
                switchInputFile: function () {
                    $scope.inputString = !$scope.inputString;
                    if ($scope.inputString && typeof $scope.master.definition === 'object') {
                        $scope.master.definition = JSON.parse($scope.master.definition)
                    }
                },

                uploadFileConfig: {
                    previewTemplate: `	<div class="dz-preview dz-processing dz-image-preview dz-success dz-complete">
																			<div class="dz-image">
																				<img data-dz-thumbnail>
																			</div>
																			<div class="dz-details">
																				<div class="dz-size">
																					<span data-dz-size>
																				</div>
																				<div class="dz-filename">
																					<span data-dz-name></span>
																				</div>
																			</div>
																			<div data-dz-remove class=" remove-upload btn-floating red" style="margin-left:35%; "><i class="material-icons">clear</i></div>
																		</div>`,
                    completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">' + $filter('translate')('complete') + '</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
                    acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
                    maxFiles: 1,
                    parallelUploads: 1,
                    url: ngmAuth.LOCATION + '/api/uploadGDrive',
                    dictDefaultMessage:
                        `<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !',
                    notSupportedFile: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + $filter('translate')('not_supported_file_type') + ' ',
                    errorMessage: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Error`,
                    addRemoveLinks: false,
                    autoProcessQueue: false,
                    init: function () {
                        drop_zone = this;
                        // upload_file and delete_file is ID for button upload and cancel
                        $("#upload_file").attr("disabled", true);
                        $("#delete_file").attr("disabled", true);

                        document.getElementById('upload_file').addEventListener("click", function () {
                            var ext = drop_zone.getAcceptedFiles()[0].name.split('.').pop();
                            if (ext === 'csv') {
                                var file = drop_zone.getAcceptedFiles()[0],
                                    read = new FileReader();

                                read.readAsBinaryString(file);

                                read.onloadend = function () {
                                    var csv_string = read.result
                                    csv_array = Papa.parse(csv_string).data;
                                }

                                var previews = document.querySelectorAll(".dz-preview");
                                previews.forEach(function (preview) {
                                    preview.style.display = 'none';
                                })
                                document.querySelector(".dz-default.dz-message").style.display = 'none';
                                document.querySelector(".percent-upload").style.display = 'block';

                                $timeout(function () {
                                    document.querySelector(".percent-upload").style.display = 'none';
                                    drop_zone.removeAllFiles(true);
                                    $scope.master.definition ='{"activity":"a"}'
                                    $scope.master.validate()
                                }, 2000)

                            } else {
                                file = drop_zone.getAcceptedFiles()[0]
                                const wb = new ExcelJS.Workbook();
                                drop_zone.getAcceptedFiles()[0].arrayBuffer().then((data) => {
                                    var result = []
                                    wb.xlsx.load(data).then(workbook => {
                                        const book = [];
                                        var book_obj = [];

                                        workbook.eachSheet((sheet, index) => {
                                            // get only the first sheet
                                            if (index === 1) {
                                                const sh = [];
                                                sheet.eachRow(row => {
                                                    sh.push(row.values);
                                                });
                                                book.push(sh);
                                            }
                                        });

                                        var previews = document.querySelectorAll(".dz-preview");
                                        previews.forEach(function (preview) {
                                            preview.style.display = 'none';
                                        })
                                        document.querySelector(".dz-default.dz-message").style.display = 'none';
                                        document.querySelector(".percent-upload").style.display = 'block';

                                        $timeout(function () {
                                            document.querySelector(".percent-upload").style.display = 'none';
                                            drop_zone.removeAllFiles(true);
                                            $scope.master.definition = '{"activity":"a"}'
                                            $scope.master.validate()
                                        }, 2000)
                                    })
                                })
                            }
                        });

                        document.getElementById('delete_file').addEventListener("click", function () {
                            drop_zone.removeAllFiles(true);
                        });

                        // when add file
                        drop_zone.on("addedfile", function (file) {

                            document.querySelector(".dz-default.dz-message").style.display = 'none';
                            var ext = file.name.split('.').pop();
                            //change preview if not image/*
                            $(file.previewElement).find(".dz-image img").attr("src", "images/elsedoc.png");
                            $("#upload_file").attr("disabled", false);
                            $("#delete_file").attr("disabled", false);

                        });

                        // when remove file
                        drop_zone.on("removedfile", function (file) {

                            if (drop_zone.files.length < 1) {
                                // upload_file and delete_file is ID for button upload and cancel
                                $("#upload_file").attr("disabled", true);
                                $("#delete_file").attr("disabled", true);

                                document.querySelector(".dz-default.dz-message").style.display = 'block';
                                $('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !');
                            }

                            if ((drop_zone.files.length < 2) && (drop_zone.files.length > 0)) {
                                document.querySelector(".dz-default.dz-message").style.display = 'none';
                                $("#upload_file").attr("disabled", false);
                                $("#delete_file").attr("disabled", false);
                                document.getElementById("upload_file").style.pointerEvents = "auto";
                                document.getElementById("delete_file").style.pointerEvents = "auto";

                            }
                        });

                        drop_zone.on("maxfilesexceeded", function (file) {
                            document.querySelector(".dz-default.dz-message").style.display = 'none';
                            $('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + 'Please, import just one file at the time and remove exceeded file');
                            document.querySelector(".dz-default.dz-message").style.display = 'block'
                            // Materialize.toast("Too many file to upload", 6000, "error")
                            M.toast({ html: "Too many file to upload", displayLength: 2000, classes: 'error' });
                            $("#upload_file").attr("disabled", true);
                            document.getElementById("upload_file").style.pointerEvents = "none";
                            $("#delete_file").attr("disabled", true);
                            document.getElementById("delete_file").style.pointerEvents = "none";
                        });

                        // reset
                        this.on("reset", function () {
                            // upload_file and delete_file is ID for button upload and cancel
                            document.getElementById("upload_file").style.pointerEvents = 'auto';
                            document.getElementById("delete_file").style.pointerEvents = 'auto';
                        });
                    },

                },

                init: function () {
                    if ($scope.inputString && typeof $scope.master.definition === 'object') {
                        // console.log($scope.master.definition)
                        $scope.master.definition = JSON.stringify($scope.master.definition)
                    }

                },
                removeForm: function () {
                    if (typeof $scope.master.definition === 'string') {
                        $scope.master.definition = JSON.parse($scope.master.definition)
                    }

                    // setReportRequest
                    var setReportRequest = {
                        method: 'DELETE',
                        url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomBeneficiariesForm/' + $scope.master.definition.id,
                        // params: { id: $scope.master.definition.id }
                    }

                    // set report
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    $http(setReportRequest).success(function (response) {
                        if (!response.err) {
                            $timeout(function(){
                                M.toast({ html: 'Success Delete Form', displayLength: 3000, classes: 'success' });
                                $location.path('/custom/config/report-beneficiaries-forms/' + $route.current.params.report_type_id);
                            },2000)
                            

                        } 
                    }).error(function (err) {
                        
                            if (typeof $scope.master.definition === 'object') {
                                $scope.master.definition = JSON.stringify($scope.master.definition)
                            }
                            M.toast({ html: 'Error!', displayLength: 3000, classes: 'error' });
                    })
                },
                cancel: function () {
                    if ($scope.master.newForm) {
                        M.toast({ html: 'Cancel create new list', displayLength: 3000, classes: 'success' });
                    } else {
                        M.toast({ html: 'Cancel Update', displayLength: 3000, classes: 'success' });
                    }

                    $location.path('/custom/config/report-beneficiaries-forms/'+$route.current.params.report_type_id);
                },
                save: function () {
                    // setReportRequest
                    if (typeof $scope.master.definition === 'string') {
                        $scope.master.definition = JSON.parse($scope.master.definition)
                    }
                    if(!$scope.master.newForm){
                        $scope.master.definition = { form: $scope.master.definition }
                    }
                    var setReportRequest = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/config/saveCustomBeneficiariesForm',
                        data: $scope.master.definition
                    }
                    M.toast({ html: 'Processing...', displayLength: 2000, classes: 'note' });
                    // set report
                    $http(setReportRequest).success(function (response) {
                        if (!response.err) {
                            if (typeof $scope.master.definition === 'object') {
                                $scope.master.definition = JSON.stringify(response)
                            } else {
                                $scope.master.definition = response
                            }
                            $timeout(function(){
                                if ($scope.master.newForm) {
                                    M.toast({ html: 'Success Create New Form', displayLength: 3000, classes: 'success' });
                                    $location.path('/custom/config/report-beneficiaries-forms/' + $route.current.params.report_type_id);
                                } else {
                                    M.toast({ html: 'Successfully Update Form', displayLength: 3000, classes: 'success' });
                                }
                            },2000)
                            

                        }

                    })

                }
            }

            $scope.master.init();

        }])