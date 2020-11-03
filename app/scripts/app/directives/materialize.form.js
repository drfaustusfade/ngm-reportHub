angular.module("ngm.materialize.form", [])
				// based on https://github.com/simpulton/angular-dynamic-templates
        .directive('formBeneficiaries', function ($compile) {
					var getTemplate = function (templates, elem, formid) {

							var template = '';
							switch (elem.input_type) {

										case 'select':
										template = `<form-select formid='${formid}' inputid='${elem.id}' ngmCustomBeneficiaries='ngmCustomBeneficiaries' project='project' beneficiary='beneficiary'></form-select>`;
										break;

										case 'input':
										template = `<form-input formid='${formid}' inputid='${elem.id}' ngmCustomBeneficiaries='ngmCustomBeneficiaries' project='project' beneficiary='beneficiary'></form-input>`;
										break;

										case 'textarea':
										template = `<form-textarea formid='${formid}' inputid='${elem.id}' ngmCustomBeneficiaries='ngmCustomBeneficiaries' project='project' beneficiary='beneficiary'></form-textarea>`;
										break;

										case 'checkbox':
										template = `<form-checkbox formid='${formid}' inputid='${elem.id}' ngmCustomBeneficiaries='ngmCustomBeneficiaries' project='project' beneficiary='beneficiary'></form-checkbox>`;
										break;
							}

							return template;
					};

					var getTag = function(tag){
						return `<div>
        							<p style="font-size: 15px;padding-bottom: 20px;">${tag}</p>
    							 </div>`
					};

					var getStyle = function(style){
						switch (style){
							case 'dotted':
								style = `style="margin-bottom: 20px; margin-left:0px;margin-right:0px; border: 1px dotted rgb(158, 158, 158);"`
							break;
							default:
								style = `style="${style}"`
						}
						return style;
					};

					var linker = function (scope, element, attrs) {

							// TemplateService.getTemplates().then(function (response) {
									// var templates = response.data;
									var templates = [];

									var form = ``;

									if (!scope.project || !scope.project.beneficiariesFormConfig || !attrs.formid || !scope.project.beneficiariesFormConfig[attrs.formid] || !scope.project.beneficiariesFormConfig[attrs.formid].config) {
										form = `<div>beneficiariesFormConfig formid config is not defined</div>`;
									} else {
										var config = scope.project.beneficiariesFormConfig[attrs.formid].config;

										var configById;
										var byId;

										if (!scope.project.beneficiariesFormConfig[attrs.formid].configById) byId = true; configById = {};

										angular.forEach(config.rows, function (row, i) {
											if (row.card) form += `<div class="card" style="padding:20px;">`;

											if (row.tag) form += getTag(row.tag);

											form += `<div class="row" ${row.style ? getStyle(row.style) : ``}>`;
											// angular.forEach(row, function (columns, j) {
												angular.forEach(row.columns, function (elem, k) {
													if (byId) configById[elem.id] = elem;
													form += getTemplate(templates, elem, attrs.formid);
												});
											// })
											form += `</div>`;
											if (row.card) form += `</div>`;
										})
									}
									console.log(form)
									element.html(form);

									if (byId) scope.project.beneficiariesFormConfig[attrs.formid].configById = configById;

									$compile(element.contents())(scope);
							// });
					};

					return {
							restrict: 'E',
							// transclude: true,
							link: linker,
							scope: false,
					};
			})
			.directive('formSelect', function ($compile) {
				var getTemplate = function (templates, elem) {
						var template = '<div>test</div>';
						var template = `<div class="input-field col ${elem.class ? elem.class : `s12 m12 l12`}">
															<select materialize-select ${elem.watch ? `watch ` : ``}
																id="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
																name="${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
																class="validate"
																ng-model="beneficiary.${elem.model}"
																ng-change="ngmCustomBeneficiaries.${elem.set_attributes ? `updateNameAndOther` : `updateName`}( project.beneficiaries_lists.${elem.list}, '${elem.id}', '${elem.name}', beneficiary );
																		ngmCustomBeneficiaries.inputChange( 'ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}' );"
																ng-options="${elem.options}"
																ng-disabled="project.definition.project_status === 'complete' || project.report.report_status === 'complete' ${elem.disabled ? `|| ` + elem.disabled : ``}">
																${elem.noselection ? `<option value="">-</option>` : `<option value="" disabled>{{ 'select' | translate }}</option>`}
															</select>
															<label for="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="active" style="transform:translateY(-10%)">${elem.label}</label>
														</div>`;

						return template;
				};

				var linker = function (scope, element, attrs) {

								var templates = [];

								var form = ``;

								form += getTemplate(templates, scope.project.beneficiariesFormConfig[attrs.formid].configById[attrs.inputid]);

								element.html(form);

								$compile(element.contents())(scope);

				};

				return {
						restrict: 'E',
						// transclude: true,
						link: linker,
						scope: false,
						// scope: {
						// 	formConfig: '=',
						// 	ngmCustomBeneficiaries: '&',
						// 	project: '=',
						// 	beneficiary: '=',
						// 	config: '='
						// }
				};
			})
			.directive('formInput', function ($compile) {
				var getTemplate = function (templates, elem) {
						var template = `<div class="input-field col ${elem.class ? elem.class : `s12 m12 l12`}">
															<input id="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
																	name="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" type=${elem.type} class="validate ${elem.classInput ? elem.classInput : ``}"
																	${elem.placeholder ? `placeholder="` + elem.placeholder + `"` : ``}
																	${elem.min ? `min="` + elem.min + `"` : ``}
																	${elem.max ? `max="` + elem.max + `"` : ``}
																	ng-model="beneficiary.${elem.model}"
																	ng-change="ngmCustomBeneficiaries.inputChange( 'ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}' ); ${elem.countTotal ? ` project.countTotalBeneficiary(beneficiary)` : ``} "
																	ng-disabled="project.definition.project_status === 'complete' || project.report.report_status === 'complete' ${elem.disabled ? `|| ` + elem.disabled : ``}"
																	${elem.required ? `required` : ``}
																	${elem.disabled ? `ng-disabled="true"` : ``}/>
															<label for="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="active">${elem.label}</label>
														</div>`;

						return template;
				};

				var linker = function (scope, element, attrs) {
								var templates = [];

								var form = ``;

								form += getTemplate(templates, scope.project.beneficiariesFormConfig[attrs.formid].configById[attrs.inputid]);

								element.html(form);

								$compile(element.contents())(scope);

				};

				return {
						restrict: 'E',
						// transclude: true,
						link: linker,
						scope: false,
						// scope: {
						// 	formConfig: '=',
						// 	ngmCustomBeneficiaries: '&',
						// 	project: '=',
						// 	beneficiary: '=',
						// 	config: '='
						// }
				};
			})
			.directive('formTextarea', function ($compile) {
				var getTemplate = function (templates, elem) {
						var template = `<div class="input-field col ${elem.class ? elem.class : `s12 m12 l12`}">
																<textarea id="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
																		type="text"
																		class="validate materialize-textarea"
																		name="${elem.id}"
																		ng-model="beneficiary.${elem.id}"
																		ng-disabled="project.definition.project_status === 'complete' || project.report.report_status === 'complete' ${elem.disabled ? `|| ` + elem.disabled : ``}">
																</textarea>
																<label style="transform:translateY(-70%)" for="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" >${elem.label}</label>
														</div>`;

						return template;
				};

				var linker = function (scope, element, attrs) {
								var templates = [];

								var form = ``;

								form += getTemplate(templates, scope.project.beneficiariesFormConfig[attrs.formid].configById[attrs.inputid]);

								element.html(form);

								$compile(element.contents())(scope);

				};

				return {
						restrict: 'E',
						// transclude: true,
						link: linker,
						scope: false,
						// scope: {
						// 	formConfig: '=',
						// 	ngmCustomBeneficiaries: '&',
						// 	project: '=',
						// 	beneficiary: '=',
						// 	config: '='
						// }
				};
			})
			.directive('formCheckbox', function ($compile) {
				var getTemplate = function (templates, elem) {
						var template = `<div class="input-field col ${elem.class ? elem.class : `s12 m12 l12`}">
															<p ng-if="true" style="padding-left:12px;cursor:pointer;">
																	<label class="checkbox-label" for="ngm-yes-no-${elem.id}">
																			<input type="checkbox" class="filled-in" id="ngm-yes-no-${elem.id}"
																					ng-checked="project.checkedYesOrNo(beneficiary,'${elem.id}')"
																					ng-click="project.setYesOrNo(beneficiary,'${elem.id}','ngm-yes-no-${elem.id}')" />
																			<span style="color:#757575 font-size: 1.2rem;">${elem.label}</span>
																	</label>
															</p>
													</div>`;

						return template;
				};

				var linker = function (scope, element, attrs) {
								var templates = [];

								var form = ``;

								form += getTemplate(templates, scope.project.beneficiariesFormConfig[attrs.formid].configById[attrs.inputid]);

								element.html(form);

								$compile(element.contents())(scope);

				};

				return {
						restrict: 'E',
						// transclude: true,
						link: linker,
						scope: false,
						// scope: {
						// 	formConfig: '=',
						// 	ngmCustomBeneficiaries: '&',
						// 	project: '=',
						// 	beneficiary: '=',
						// 	config: '='
						// }
				};
			})
	.directive('formHtmlBeneficiaries', function ($compile) {

		var linker = function (scope, element, attrs) {

			if (!scope.project || !scope.project.beneficiariesFormConfig || !attrs.formid || !scope.project.beneficiariesFormConfig[attrs.formid] || !scope.project.beneficiariesFormConfig[attrs.formid].config || !scope.project.beneficiariesFormConfig[attrs.formid].config.html) {
				// form = `<div>beneficiariesFormConfig formid config is not defined</div>`;
				form=`<div style="text-align: center; border: 3px dotted #888888; background-color: #d6d6d6;">
					<h5 class="white-text">beneficiariesFormConfig formid config is not defined</h5>
				</div>`;
			} else {
				var form = scope.project.beneficiariesFormConfig[attrs.formid].config.html;
			}
			console.log(form);
			element.html(form);

			$compile(element.contents())(scope);
		};

		return {
			restrict: 'E',
			// transclude: true,
			link: linker,
			scope: false,
		};
	});
