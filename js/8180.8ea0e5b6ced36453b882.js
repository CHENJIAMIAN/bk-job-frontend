(self.webpackChunkjob=self.webpackChunkjob||[]).push([[8180],{17977:function(t,e,a){"use strict";var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(75328),a(41336),a(91981),a(63898),a(79951),a(45680),a(7145),a(32106),a(14408),a(84367);var i=s(a(36106)),n=a(15513),o=s(a(81881)),r=s(a(13042)),l=s(a(3614)),c=s(a(16090)),p=s(a(91622)),d={name:"",data(){return{isLoading:!0,currentStep:parseInt(this.$route.query.step,10)||1}},computed:{pageCom(){return this.isLoading?"div":{1:o.default,2:r.default,3:l.default,4:c.default,5:p.default}[this.currentStep]}},created(){this.steps=[{title:"用户须知.header",icon:1},{title:"文件包上传",icon:2},{title:"导入内容确认",icon:3},{title:"导入设置",icon:4},{title:"开始导入",icon:5}],this.fetchData()},methods:{fetchData(){var t=this;this.isLoading=!0,i.default.fetchInfo().then((function(e){var a=e.importJob;if(a.length>0)t.handleStepChange(5),n.taskImport.clearItem(),n.taskImport.setItem("id",a[0].id);else{var s=n.taskImport.getItem();if(!s)return void t.handleStepChange(1);if(!s.id)return void t.handleStepChange(1);!s.templateInfo&&t.currentStep>3&&t.handleStepChange(3)}})).finally((function(){t.isLoading=!1}))},handleStepChange(t){this.currentStep=t;var e=new URLSearchParams(window.location.search);e.set("step",t),window.history.replaceState({},"","?".concat(e.toString()))},handleCancle(){this.routerBack()},routerBack(){this.$router.push({name:"taskList"})}}};e.Z=d},3368:function(t,e,a){"use strict";var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var i={name:"",components:{ActionBar:s(a(44485)).default},methods:{handleCancel(){this.$emit("on-cancle")},handleNext(){this.$emit("on-change",2)}}};e.Z=i},50559:function(t,e,a){"use strict";a(87147),a(13118),a(59241),a(20767);var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var i=s(a(68203));a(32106),a(36380),a(41336),a(91981),a(63898),a(94354),a(98495);var n=s(a(36106)),o=a(11986),r=a(15513),l=s(a(44485));function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){(0,i.default)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var d=function(t){return t.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},u=0,m=5,f=8,h={name:"",components:{ActionBar:l.default},data:()=>({isShowPassword:!1,isShowLog:!1,isLogLoading:!1,isPasswordSubmiting:!1,id:"",importInfo:{id:"",log:[],status:0,templateInfo:[]},passwordFormData:{password:""},uploadProgress:"0",uploadFilename:"",uploadStatus:""}),computed:{isUploadSuccess(){return 1===this.importInfo.status}},created(){this.fileMemo=null,this.uploadErrorMsg="",this.pollingQueue=[],this.rules={password:[{required:!0,message:"请输入文件包密码",trigger:"blur"}]},this.uploadRequestCancelSource=null;var t=r.taskImport.getItem()||{},e=t.id,a=t.uploadFilename;e&&a&&(this.uploadFilename=a,this.uploadStatus="success",this.importInfo.status=1,this.id=e,this.fetchImportInfo(),this.startTimer())},beforeDestroy(){this.clearTimer()},methods:{fetchImportInfo(){var t=this;this.isShowLog=!0,this.$request(n.default.fetchImportInfo({id:this.id}),(function(){t.isLogLoading=!0})).then((function(e){t.isClearTimer||(t.importInfo=Object.freeze(e),2!==e.status?3!==e.status&&[u,m,f].includes(e.status)&&t.pollingQueue.push(t.fetchImportInfo):t.handleInputPassword())})).finally((function(){t.isLogLoading=!1}))},renderLogRow(t,e,a){var s='<span class="log-header">[ '.concat(d(t.timestamp)," ]</span> ").concat(d(t.content)),i={6:'<span class="action" data-action="passwordRetry">'.concat("输入密码","</span>"),7:'<span class="action" data-action="passwordRetry">'.concat("重新输入密码","</span>")};return 2===t.type?'<span class="error">'.concat(s,"</span>"):e===a.length-1&&i[t.type]?'<span class="error">'.concat(s).concat(i[t.type],"</span>"):e===a.length-1&&this.isUploadSuccess?"<span>".concat(s,"请点",'<span class="action" data-action="success">',"下一步","</span></span>"):s},startTimer(){var t=this;if(!this.isClearTimer){var e=this.pollingQueue.pop();e&&e(),setTimeout((function(){t.startTimer()}),1e3)}},clearTimer(){this.isClearTimer=!0},handleUploadRequest(t){var e=this;if(this.uploadFilename=t.fileObj.name,!/\.jobexport$/.test(t.fileObj.name))return this.uploadStatus="error",void(this.uploadErrorMsg="文件类型不支持");this.fileMemo=t,this.isShowLog=!1,this.uploadStatus="waiting";var a=new FormData;a.append("uploadFile",t.fileObj.origin),n.default.uploadImportFile(a,{onUploadProgress:function(t){var a=t.loaded,s=t.total;e.uploadProgress="".concat(Math.ceil(a/s*100),"%")},setCancelSource:function(t){e.uploadRequestCancelSource=t}}).then((function(t){e.id=t.id,r.taskImport.setItem("id",t.id),r.taskImport.setItem("uploadFilename",e.uploadFilename),e.fetchImportInfo(),e.startTimer(),e.uploadStatus="success"})).catch((function(){e.uploadStatus="failed"}))},handleFileRefresh(){this.handleUploadRequest(this.fileMemo)},hanleFileDelete(){this.uploadRequestCancelSource&&this.uploadRequestCancelSource.cancel("上传任务已取消"),this.uploadStatus="",this.uploadFilename="",this.id="",this.importInfo={id:"",log:[],status:0,templateInfo:[]},this.isShowLog=!1,r.taskImport.clearItem()},handleInputPassword(){this.passwordFormData.password="",this.isShowPassword=!0},handleClosePassword(){this.isShowPassword=!1,window.changeAlert=!1,this.$refs.passwordForm.clearError(),this.importInfo.log.push({content:"导入任务已取消！需要重试请点击",linkText:null,linkUrl:null,planId:null,templateId:null,timestamp:(0,o.prettyDateTimeFormat)(Date.now()),type:7})},handleEnter(t,e){e.isComposing||13===e.keyCode&&this.handleSubmitPassword()},handleSubmitPassword(){var t=this;this.isPasswordSubmiting=!0,this.$refs.passwordForm.validate().then((function(){return n.default.checkImportPassword(p(p({},t.passwordFormData),{},{id:t.id})).then((function(){t.isShowPassword=!1,window.changeAlert=!1,t.fetchImportInfo()}))})).finally((function(){t.isPasswordSubmiting=!1}))},handleLogAction(t){var e=t.target;if(e.classList.contains("action"))switch(e.getAttribute("data-action")){case"passwordRetry":this.handleInputPassword();break;case"success":this.handleNext()}},handleCancel(){this.hanleFileDelete(),this.$emit("on-cancle")},handleLast(){this.$emit("on-change",1)},handleNext(){this.$emit("on-change",3)}}};e.Z=h},58990:function(t,e,a){"use strict";a(87147),a(13118),a(20767);var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var i=s(a(68203));a(41336),a(91981),a(63898),a(70616),a(79951),a(45680),a(59241),a(85376);var n=s(a(36106)),o=a(15513),r=s(a(89888)),l=s(a(44485));function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){(0,i.default)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var d={name:"",components:{Empty:r.default,ActionBar:l.default},data:()=>({id:"",isLoading:!1,activeTemplateId:0,templateInfoOrigin:[{},{},{}],templateInfoMap:{},planNameMap:{},templateNameMap:{}}),computed:{currentPlanList:()=>[]||0},created(){this.id=o.taskImport.getItem("id"),this.fetchData()},methods:{fetchData(){var t=this;this.$request(n.default.fetchImportInfo({id:this.id}),(function(){t.isLogLoading=!0})).then((function(e){var a=e.idNameInfo,s=e.templateInfo;t.templateInfoOrigin=Object.freeze(s),t.templateInfoMap=s.reduce((function(t,e){var a=e.planId||[];return t[e.id]={checked:!0,id:e.id,planIdOrigin:[...a],planIdMap:a.reduce((function(t,e){return t[e]=!0,t}),{}),exportAll:1},t}),{}),s.length>0&&(t.activeTemplateId=s[0].id),t.planNameMap=Object.freeze(a.planNameMap),t.templateNameMap=Object.freeze(a.templateNameMap)})).finally((function(){t.isLogLoading=!1}))},handleSelectTemplate(t){this.activeTemplateId=t},handleTemplateChange(t,e){this.templateInfoMap[e].checked=t},handleCancelWholePlan(){this.templateInfoMap[this.activeTemplateId].planIdMap={},this.templateInfoMap[this.activeTemplateId].exportAll=0},handleSelectWholePlan(){var t=p({},this.templateInfoMap)[this.activeTemplateId];t.planIdOrigin.forEach((function(e){t.planIdMap[e]=!0})),t.exportAll=1},handleTogglePlan(t){if(this.templateInfoMap[this.activeTemplateId].checked){var e=p({},this.templateInfoMap),a=e[this.activeTemplateId];a.planIdMap[t]?(delete a.planIdMap[t],a.exportAll=0):(a.planIdMap[t]=!0,a.exportAll=Number(Object.keys(a.planIdMap).length===a.planIdOrigin.length)),this.templateInfoMap=e}},handleCancel(){this.$emit("on-cancle")},handleLast(){this.$emit("on-change",2)},handleNext(){var t=[];for(var e in this.templateInfoMap){var a=this.templateInfoMap[e];a.checked&&t.push({id:a.id,exportAll:a.exportAll,planId:Object.keys(a.planIdMap)})}o.taskImport.setItem("id",this.id),o.taskImport.setItem("templateInfo",t),this.$emit("on-change",4)}}};e.Z=d},71658:function(t,e,a){"use strict";var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;s(a(36106));var i=a(15513),n={name:"",components:{ActionBar:s(a(44485)).default},data:()=>({isSubmiting:!1,formData:{duplicateSuffix:"_imported",duplicateIdHandler:0}}),created(){this.id=i.taskImport.getItem("id"),this.templateInfo=i.taskImport.getItem("templateInfo"),this.rules={duplicateSuffix:[{required:!0,message:"请输入重名后缀",trigger:"blur"}]}},methods:{handleCancel(){this.$emit("on-cancle")},handleLast(){this.$emit("on-change",3)},handleNext(){window.changeAlert=!1,this.$emit("on-change",5)}}};e.Z=n},60515:function(t,e,a){"use strict";var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(94354),a(41336),a(91981),a(63898);var i=s(a(36106)),n=a(11986),o=a(15513),r=s(a(44485)),l=0,c=5,p=6,d=7,u=8,m={name:"",components:{ActionBar:r.default},data:()=>({isLoading:!0,status:0,log:[]}),computed:{isImportSuccess(){return[p,u].includes(this.status)},isImportFailed(){return[d].includes(this.status)}},created(){var t=this;this.id=o.taskImport.getItem("id"),this.pollingQueue=[],o.taskImport.clearItem(),this.fetchData(),this.startTimer(),this.$once("hook:beforeDestroy",(function(){t.clearTimer()}))},methods:{fetchData(){var t=this;i.default.fetchImportInfo({id:this.id}).then((function(e){t.isClearTimer||(t.log=Object.freeze(e.log),t.status=e.status,[l,c].includes(e.status)&&t.pollingQueue.push(t.fetchData))})).finally((function(){t.isLoading=!1}))},startTimer(){var t=this;if(!this.isClearTimer){var e=this.pollingQueue.pop();e&&e(),setTimeout((function(){t.startTimer()}),2e3)}},clearTimer(){this.isClearTimer=!0},handleLocationTemplate(t){var e=this.$router.resolve({name:"templateDetail",params:{id:t.templateId}}).href;window.open(e)},handleLocationPlan(t){var e=this.$router.resolve({name:"viewPlan",params:{templateId:t.templateId},query:{viewPlanId:t.planId}}).href;window.open(e)},handleCopyLog(){(0,n.execCopy)(this.$refs.log.innerText)},handleFinish(){this.$emit("on-cancle")}}};e.Z=m},49583:function(){},11720:function(){},39957:function(){},56465:function(){},83674:function(){},10492:function(){},13313:function(){},44485:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return n}});var s=function(t,e){return(0,e._c)("div",{staticClass:"import-action-bar"},[e._t("default")],2)};s._withStripped=!0;a(16504);var i=(0,a(51900).Z)({},s,[],!0,null,"007c0d32",null);i.options.__file="src/views/task-manage/import/components/action-bar.vue";var n=i.exports},58180:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"task-import-page"},[a("div",{staticClass:"header"},[a("bk-steps",{attrs:{steps:t.steps,"cur-step":t.currentStep},on:{"update:curStep":function(e){t.currentStep=e},"update:cur-step":function(e){t.currentStep=e}}})],1),t._v(" "),a("div",{staticClass:"content"},[a("scroll-faker",[a(t.pageCom,{tag:"component",on:{"on-change":t.handleStepChange,"on-cancle":t.handleCancle}})],1)],1)])};s._withStripped=!0;var i=a(17977),n=i.Z,o=(a(69304),(0,a(51900).Z)(n,s,[],!1,null,null,null));o.options.__file="src/views/task-manage/import/index.vue";var r=o.exports},81881:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-import-step1"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("action-bar",[a("bk-button",{staticClass:"mr10",on:{click:t.handleCancel}},[t._v(t._s("取消"))]),t._v(" "),a("bk-button",{staticClass:"w120",attrs:{theme:"primary"},on:{click:t.handleNext}},[t._v(t._s("我知道了"))])],1)],1)};s._withStripped=!0;var i=a(3368),n=i.Z,o=(a(80173),(0,a(51900).Z)(n,s,[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flag"},[a("img",{attrs:{src:"/static/images/notice.svg"}}),t._v(" "),a("div",{staticClass:"title"},[t._v(t._s("用户须知"))])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tips"},[a("p",[t._v(t._s("1. 作业内文件分发步骤中带有“本地文件”的会一并导出，没有大小限制！但导入时会受到目标环境的文件上传大小限制，请知悉；"))]),t._v(" "),a("p",[t._v(t._s("2. 作业内引用的脚本会保留其原始ID，但如果在导入时目标环境找不到对应ID的脚本，将自动转换为「手工录入」的方式导入；"))]),t._v(" "),a("p",[t._v(t._s("3. 由于导出和导入环境的服务器 IP 地址、人工确认的用户名、通知渠道可能存在差异，请在后续导入后修改对应的信息，以免造成作业不可用的问题；"))]),t._v(" "),a("p",[t._v(t._s("4. 为了保证步骤信息一致性，作业中使用的「执行账号」会以账号名称导出，并在导入时在目标环境中挑选其中一个相同名称的账号进行保存；如果没有相同的账号名存在，请记得导入后及时更改步骤信息，以免造成作业不可用的问题；"))]),t._v(" "),a("p",[t._v(t._s("5. 如作业的脚本步骤中使用了「公共函数」，请确保导入的环境中也同样存在对应的函数，以免造成脚本执行逻辑错误；"))]),t._v(" "),a("p",[t._v(t._s("6. 导出的作业模板会保存其原始ID，如需在导入的环境中完全保留作业ID，请在导入作业的流程中按指引进行设置；"))]),t._v(" "),a("p",[t._v(t._s("7. 因蓝鲸权限中心的规则中对实例的唯一标识是ID，如在导入时选择保留作业ID，请根据需要选择是否回收原有的权限策略；"))]),t._v(" "),a("p",[t._v(t._s("8. 在导入时选择保留作业原始ID的前提下，请确保导入的环境中不存在已配置了相同作业ID的定时任务，以免造成影响；"))]),t._v(" "),a("p",[t._v(t._s('9. 若导入的作业模板或执行方案名称与目标环境的作业存在冲突的情况，会根据导入时设置的"重名后缀"自动在作业名称后面追加命名。'))])])}],!1,null,"1791abac",null));o.options.__file="src/views/task-manage/import/pages/step1.vue";var r=o.exports},13042:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-import-step2"},[a("div",{staticClass:"package-upload"},[t.uploadFilename?t._e():a("bk-upload",{attrs:{tip:"仅支持上传来自作业平台专属导出的压缩包",multiple:!1,"custom-request":t.handleUploadRequest,size:1/0,url:"/"}}),t._v(" "),t.uploadFilename?a("div",{staticClass:"upload-result",class:t.uploadStatus},[t._m(0),t._v(" "),a("div",{staticClass:"file-info"},[a("div",{staticClass:"file-name"},[t._v(t._s(t.uploadFilename))]),t._v(" "),"waiting"===t.uploadStatus?a("div",{staticClass:"upload-progress"},[a("div",{staticClass:"progress-bar",style:{width:t.uploadProgress}})]):t._e(),t._v(" "),"success"===t.uploadStatus?a("div",{staticClass:"file-status"},[t._v(t._s("上传成功"))]):t._e(),t._v(" "),"failed"===t.uploadStatus?a("div",{staticClass:"file-status"},[t._v(t._s("上传失败"))]):t._e(),t._v(" "),"error"===t.uploadStatus?a("div",{staticClass:"file-status"},[t._v(t._s(t.uploadErrorMsg))]):t._e()]),t._v(" "),"failed"===t.uploadStatus?a("Icon",{staticClass:"file-refresh",attrs:{type:"refresh"},on:{click:t.handleFileRefresh}}):t._e(),t._v(" "),a("Icon",{staticClass:"file-delete",attrs:{type:"close-big"},on:{click:t.hanleFileDelete}})],1):t._e()],1),t._v(" "),t.isShowLog?a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLogLoading},expression:"{ isLoading: isLogLoading }"}],staticClass:"upload-log-box",on:{click:t.handleLogAction}},[t._l(t.importInfo.log,(function(e,s){return[a("div",{key:s,domProps:{innerHTML:t._s(t.renderLogRow(e,s,t.importInfo.log))}})]}))],2):t._e(),t._v(" "),a("action-bar",[a("bk-button",{staticClass:"mr10",on:{click:t.handleCancel}},[t._v(t._s("取消"))]),t._v(" "),a("bk-button",{staticClass:"mr10",on:{click:t.handleLast}},[t._v(t._s("上一步"))]),t._v(" "),a("bk-button",{staticClass:"w120",attrs:{theme:"primary"},on:{click:t.handleNext}},[t._v("\n            "+t._s("下一步")+"\n        ")])],1),t._v(" "),a("lower-component",{attrs:{level:"custom",custom:t.isShowPassword}},[a("jb-dialog",{staticClass:"setting-password-dialog",attrs:{title:"文件包解密确认","header-position":"left","render-directive":"if","mask-close":!1,"esc-close":!1,width:480},model:{value:t.isShowPassword,callback:function(e){t.isShowPassword=e},expression:"isShowPassword"}},[a("jb-form",{ref:"passwordForm",attrs:{model:t.passwordFormData,"form-type":"vertical",rules:t.rules}},[a("jb-form-item",{attrs:{label:"文件包密码",required:"",property:"password"}},[a("bk-input",{attrs:{type:"password","native-attributes":{autofocus:"autofocus"},placeholder:"请输入上传的文件包密码，完成后点提交验证"},on:{keydown:t.handleEnter},model:{value:t.passwordFormData.password,callback:function(e){t.$set(t.passwordFormData,"password",e)},expression:"passwordFormData.password"}})],1)],1),t._v(" "),a("div",{staticClass:"setting-password-footer",attrs:{slot:"footer"},slot:"footer"},[a("bk-button",{staticClass:"mr10",attrs:{theme:"primary",loading:t.isPasswordSubmiting},on:{click:t.handleSubmitPassword}},[t._v("\n                    "+t._s("提交")+"\n                ")]),t._v(" "),a("bk-button",{on:{click:t.handleClosePassword}},[t._v(t._s("取消"))])],1)],1)],1)],1)};s._withStripped=!0;var i=a(50559),n=i.Z,o=(a(99906),(0,a(51900).Z)(n,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"file-pic"},[e("img",{attrs:{src:"/static/images/package.svg"}})])}],!1,null,null,null));o.options.__file="src/views/task-manage/import/pages/step2.vue";var r=o.exports},3614:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"task-import-step3"},[a("div",{staticClass:"layout-wraper"},[a("div",{staticClass:"layout-left"},[a("scroll-faker",[t._l(t.templateInfoOrigin,(function(e){return[a("div",{key:e.id,staticClass:"task-box",class:{active:e.id===t.activeTemplateId},on:{click:function(a){return t.handleSelectTemplate(e.id)}}},[a("div",{staticClass:"task-name"},[t._v(t._s(t.templateNameMap[e.id]))]),t._v(" "),a("bk-switcher",{attrs:{size:"small",theme:"primary"},on:{click:function(t){t.stopPropagation()},change:function(a){return t.handleTemplateChange(a,e.id)}}})],1)]}))],2)],1),t._v(" "),a("div",{staticClass:"layout-right"},[a("scroll-faker",[a("div",{staticClass:"wraper"},[a("div",{staticClass:"task-header"},[a("span",[t._v(t._s(t.templateNameMap[t.activeTemplateId]))]),t._v(" "),a("span",{staticClass:"invalid-flag"},[t._v("\n                            "+t._s("不导入")+"\n                        ")])]),t._v(" "),t.currentPlanList.length>0?[a("div",{staticClass:"task-plan-header"},[a("span",[t._v(t._s("选择要导入的作业执行方案"))]),t._v(" "),t.templateInfoMap[t.activeTemplateId].exportAll?a("bk-button",{staticClass:"whole-check",attrs:{text:""},on:{click:t.handleCancelWholePlan}},[t._v("\n                                "+t._s("取消全选")+"\n                            ")]):a("bk-button",{staticClass:"whole-check",attrs:{text:""},on:{click:t.handleSelectWholePlan}},[t._v("\n                                "+t._s("全选")+"\n                            ")])],1),t._v(" "),a("div",{staticClass:"task-plan-list"},[t._l(t.currentPlanList,(function(e){return[a("div",{key:e,staticClass:"plan-box",class:{invalid:!t.templateInfoMap[t.activeTemplateId].planIdMap[e]},on:{click:function(a){return t.handleTogglePlan(e)}}},[a("div",{staticClass:"plan-name"},[t._v(t._s(t.planNameMap[e]))]),t._v(" "),a("div",{staticClass:"plan-check",class:{active:t.templateInfoMap[t.activeTemplateId].planIdMap[e]}})])]}))],2)]:a("empty",{staticStyle:{"margin-top":"100px"},attrs:{title:"暂无执行方案"}})],2)])],1)]),t._v(" "),a("action-bar",[a("bk-button",{staticClass:"mr10",on:{click:t.handleCancel}},[t._v(t._s("取消"))]),t._v(" "),a("bk-button",{staticClass:"mr10",on:{click:t.handleLast}},[t._v(t._s("上一步"))]),t._v(" "),a("bk-button",{staticClass:"w120",attrs:{theme:"primary"},on:{click:t.handleNext}},[t._v(t._s("下一步"))])],1)],1)};s._withStripped=!0;var i=a(58990),n=i.Z,o=(a(86263),(0,a(51900).Z)(n,s,[],!1,null,null,null));o.options.__file="src/views/task-manage/import/pages/step3.vue";var r=o.exports},16090:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-import-step4"},[a("jb-form",{ref:"form",staticClass:"form",attrs:{model:t.formData,rules:t.rules}},[a("jb-form-item",{attrs:{label:"重名后缀",required:"",property:"duplicateSuffix"}},[a("bk-input",{staticClass:"input",model:{value:t.formData.duplicateSuffix,callback:function(e){t.$set(t.formData,"duplicateSuffix","string"==typeof e?e.trim():e)},expression:"formData.duplicateSuffix"}})],1),t._v(" "),a("jb-form-item",{attrs:{label:"作业ID处理",required:""}},[a("bk-select",{staticClass:"input",attrs:{clearable:!1},model:{value:t.formData.duplicateIdHandler,callback:function(e){t.$set(t.formData,"duplicateIdHandler",e)},expression:"formData.duplicateIdHandler"}},[a("bk-option",{attrs:{id:0,name:"不保留，全部按自增处理"}}),t._v(" "),a("bk-option",{attrs:{id:1,name:"保留，ID 冲突时自增处理"}}),t._v(" "),a("bk-option",{attrs:{id:2,name:"保留，ID 冲突时不导入"}})],1)],1)],1),t._v(" "),a("action-bar",[a("bk-button",{staticClass:"mr10",on:{click:t.handleCancel}},[t._v(t._s("取消"))]),t._v(" "),a("bk-button",{staticClass:"mr10",on:{click:t.handleLast}},[t._v(t._s("上一步"))]),t._v(" "),a("bk-button",{staticClass:"w120",attrs:{loading:t.isSubmiting,theme:"primary"},on:{click:t.handleNext}},[t._v(t._s("下一步"))])],1)],1)};s._withStripped=!0;var i=a(71658),n=i.Z,o=(a(85557),(0,a(51900).Z)(n,s,[],!1,null,null,null));o.options.__file="src/views/task-manage/import/pages/step4.vue";var r=o.exports},91622:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return r}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"task-import-step5"},[t._m(0),t._v(" "),a("div",{staticClass:"title"},[t.isImportSuccess?a("span",[t._v(t._s("作业导入完成！请及时检查。"))]):[t.isImportFailed?a("span",[t._v(t._s("作业导入出现异常，请稍后再试..."))]):a("span",[t._v(t._s("正在导入作业，请稍候")),a("span",{staticClass:"loading"})])]],2),t._v(" "),a("div",{staticClass:"log-container"},[a("div",{ref:"log",staticClass:"log-box"},[t._l(t.log,(function(e,s){return[a("div",{key:s},[a("span",[t._v("[ "+t._s(e.timestamp)+" ]")]),t._v(" "+t._s(e.content)+"\n                    "),4===e.type?a("span",{staticClass:"action",on:{click:function(a){return t.handleLocationTemplate(e)}}},[t._v("\n                        "+t._s("查看详情")+"\n                        "),a("Icon",{attrs:{type:"jump"}})],1):t._e(),t._v(" "),5===e.type?a("span",{staticClass:"action",on:{click:function(a){return t.handleLocationPlan(e)}}},[t._v("\n                        "+t._s("查看详情")+"\n                        "),a("Icon",{attrs:{type:"jump"}})],1):t._e()])]}))],2),t._v(" "),a("Icon",{staticClass:"log-copy",attrs:{"tippy-tips":"复制日志",type:"log-copy"},on:{click:t.handleCopyLog}})],1),t._v(" "),a("action-bar",[a("bk-button",{staticClass:"w120",attrs:{theme:"primary"},on:{click:t.handleFinish}},[t._v("\n            "+t._s("完成")+"\n        ")])],1)],1)};s._withStripped=!0;var i=a(60515),n=i.Z,o=(a(5477),(0,a(51900).Z)(n,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flag"},[e("img",{attrs:{src:"/static/images/import.svg"}})])}],!1,null,null,null));o.options.__file="src/views/task-manage/import/pages/step5.vue";var r=o.exports},16504:function(t,e,a){var s=a(49583);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("bd5e2e62",s,!1,{})},69304:function(t,e,a){var s=a(11720);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("1bf62dd6",s,!1,{})},80173:function(t,e,a){var s=a(39957);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("513cf0cf",s,!1,{})},99906:function(t,e,a){var s=a(56465);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("3916eeb9",s,!1,{})},86263:function(t,e,a){var s=a(83674);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("1ed062bb",s,!1,{})},85557:function(t,e,a){var s=a(10492);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("0489d6bd",s,!1,{})},5477:function(t,e,a){var s=a(13313);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("2b796a82",s,!1,{})}}]);