(self.webpackChunkjob=self.webpackChunkjob||[]).push([[1871],{55818:function(e,t,a){"use strict";a(87147),a(59241),a(20767);var r=a(70534);Object.defineProperty(t,"X",{value:!0}),t.Z=void 0,a(79951),a(45680),a(32106),a(14408),a(72090),a(84367),a(13118),a(41336),a(91981),a(63898),a(70616),a(94354),a(25910);var i=r(a(68203)),n=r(a(64096)),l=r(a(25992)),s=r(a(30723)),o=a(73199),c=r(a(45131)),d=a(11986);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){(0,i.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p={name:"",components:{OperationTag:r(a(29656)).default},props:{data:{type:Object,required:!0}},setup(e,t){var a=this,r=(0,o.reactive)({isLoading:!0,isShowCreateTag:!1,newTagList:[{},{},{}],wholeTagList:[{},{},{}],search:"",formData:{resourceTypeList:[1,5],operationList:[{},{},{}]}});r.formData.operationList=[e.data.id];var i=(0,o.ref)(null),u=(0,o.ref)(null),p=(0,o.computed)((function(){return e.data.relatedTaskTemplateNum+e.data.relatedScriptNum<1})),f=(0,o.getCurrentInstance)().proxy,m=(0,o.computed)((function(){var e=[...r.newTagList,...r.wholeTagList];if(!r.search)return e;var t=new RegExp((0,d.encodeRegexp)(r.search),"i"),a=e.filter((function(e){return t.test(e.name)}));return Object.freeze(a)})),b=(0,s.default)((function(e){r.search=(0,l.default)(e)}),300);return(0,o.onBeforeMount)((function(){f.$request(c.default.fetchWholeList(),(function(){r.isLoading=!0})).then((function(t){r.wholeTagList=Object.freeze(t.reduce((function(t,a){return a.id===e.data.id?t.unshift(a):t.push(a),t}),[]))})).finally((function(){r.isLoading=!1}))})),h(h({},(0,o.toRefs)(r)),{},{isSubmitDisable:p,formRef:i,scrollRef:u,rules:{resourceTypeList:[{validator:function(e){return e.length>0},message:"范围不能为空",trigger:"blur"}]},renderList:m,refresh:function(){a.fetchData()},handleSearch:b,handleClearSearch:function(){r.search=""},handleNew:function(){r.isShowCreateTag=!0},handleTagOperationChange:function(e){e.isNew=!0,r.newTagList.unshift(e),u.value&&u.value.scrollTo(0,0)},submit:function(){if(p.value)return Promise.resolve();var a=r.formData,l=a.operationList,s=a.resourceTypeList,o=l,d=[];return l.includes(e.data.id)||d.push(e.data.id),(0,n.default)(o,(function(t){return t===e.data.id})),i.value.validate().then((function(){return c.default.batchUpdate({id:e.data.id,resourceTypeList:s,addTagIdList:o,deleteTagIdList:d})})).then((function(){f.messageSuccess("批量流转关联项成功"),t.emit("on-change")}))}})}};t.Z=p},44373:function(e,t,a){"use strict";var r=a(70534);Object.defineProperty(t,"X",{value:!0}),t.Z=void 0,a(70616),a(41336);var i=r(a(31752)),n=r(a(45131)),l=a(15513),s=r(a(27898)),o=r(a(84366)),c=r(a(88792)),d=r(a(29656)),u=r(a(87821)),h="tag_manage_columns",p={components:{ListActionLayout:s.default,RenderList:o.default,JbSearchSelect:c.default,OperationTag:d.default,BatchEditRelate:u.default},data:()=>({isShowOperation:!0,isShowEditRelate:!1,editData:{},tagList:[{},{},{}],searchParams:[],searchValue:[],selectedTableColumn:[],tableSize:"small"}),computed:{isSkeletonLoading(){return this.$refs.list.isLoading},operationDialogInfo:()=>({}),allRenderColumnMap(){return this.selectedTableColumn.reduce((function(e,t){return e[t.id]=!0,e}),{})}},created(){this.dataSource=n.default.fetchTagList,this.searchSelect=[{name:"标签名",id:"name",default:!0},{name:"创建人",id:"creator",remoteMethod:i.default.fetchUsersOfSearch,inputInclude:!0},{name:"更新人",id:"lastModifyUser",remoteMethod:i.default.fetchUsersOfSearch,inputInclude:!0}],this.tableColumn=[{id:"id",label:"ID"},{id:"name",label:"标签名",disabled:!0},{id:"description",label:"描述",disabled:!0},{id:"relatedTaskTemplateNum",label:"关联作业量",disabled:!0},{id:"relatedScriptNum",label:"关联脚本量",disabled:!0},{id:"creator",label:"创建人"},{id:"createTime",label:"创建时间"},{id:"lastModifyUser",label:"更新人"},{id:"lastModifyTime",label:"更新时间"}];var e=l.listColumnsCache.getItem(h);e?(this.selectedTableColumn=Object.freeze(e.columns),this.tableSize=e.size):this.selectedTableColumn=Object.freeze([{id:"name"},{id:"description"},{id:"relatedTaskTemplateNum"},{id:"relatedScriptNum"},{id:"lastModifyUser"},{id:"lastModifyTime"}])},methods:{fetchData(){this.$refs.list.$emit("onFetch",this.searchParams)},handleListChange(e){this.tagList=Object.freeze(e.data)},handleSettingChange(e){var t=e.fields,a=e.size;this.selectedTableColumn=Object.freeze(t),this.tableSize=a,l.listColumnsCache.setItem(h,{columns:t,size:a})},handleSearch(e){this.searchParams=e,this.fetchData()},handleCreate(){this.editData={},this.isShowOperation=!0},handleOperationChange(){this.fetchData(),this.$refs.batchEditRelate&&this.$refs.batchEditRelate.refresh()},handleRelateChange(){this.fetchData(),this.$refs.batchEditRelate&&this.$refs.batchEditRelate.refresh()},handleEdit(e){this.editData=Object.freeze(e),this.isShowOperation=!0},handleEditRelate(e){this.editData=e,this.isShowEditRelate=!0},handleDelete(e){var t=this;return n.default.remove({id:e}).then((function(){t.fetchData(),t.messageSuccess("删除成功")}))}}};t.Z=p},52284:function(){},87821:function(e,t,a){"use strict";a.r(t),a.d(t,{__esModule:function(){return i.X},default:function(){return s}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:e.isLoading},expression:"{ isLoading }"}],staticClass:"batch-edit-relate-box"},[a("jb-form",{ref:"formRef",attrs:{"form-type":"vertical",model:e.formData,rules:e.rules}},[a("jb-form-item",{attrs:{label:"范围",required:"",property:"resourceTypeList"}},[a("bk-checkbox-group",{model:{value:e.formData.resourceTypeList,callback:function(t){e.$set(e.formData,"resourceTypeList",t)},expression:"formData.resourceTypeList"}},[a("bk-checkbox",{staticClass:"mr10",attrs:{value:5}},[e._v("\n                    "+e._s("作业")+"（"+e._s(e.data.relatedTaskTemplateNum)+"）\n                ")]),e._v(" "),a("bk-checkbox",{attrs:{value:1}},[e._v("\n                    "+e._s("脚本")+"（"+e._s(e.data.relatedScriptNum)+"）\n                ")])],1)],1),e._v(" "),a("jb-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"标签"}},[a("div",{staticClass:"tag-panel"},[a("bk-input",{staticClass:"tag-search",attrs:{value:e.search,spellcheck:!1,"left-icon":"bk-icon icon-search"},on:{change:e.handleSearch}}),e._v(" "),a("div",{staticClass:"wrapper",staticStyle:{height:"210px"}},[e.renderList.length>0?a("scroll-faker",{ref:"scrollRef"},[a("bk-checkbox-group",{staticClass:"tag-list",model:{value:e.formData.operationList,callback:function(t){e.$set(e.formData,"operationList",t)},expression:"formData.operationList"}},e._l(e.renderList,(function(t){return a("bk-checkbox",{key:t.id,staticClass:"tag-item",attrs:{value:t.id}},[e._v("\n                                "+e._s(t.name)+"\n                                "),t.isNew?a("Icon",{staticClass:"new-tag-flag",attrs:{type:"new",svg:""}}):e._e()],1)})),1)],1):e.search?a("Empty",{staticStyle:{"margin-top":"20px"},attrs:{type:"search"}},[a("span",[e._v(e._s("搜索结果为空")+"，")]),e._v(" "),a("bk-button",{attrs:{text:""},on:{click:e.handleClearSearch}},[e._v("\n                            "+e._s("清空搜索")+"\n                        ")])],1):e._e()],1),e._v(" "),a("auth-component",{attrs:{auth:"tag/create"}},[a("div",{staticClass:"tag-create",on:{click:e.handleNew}},[a("bk-icon",{staticStyle:{"margin-right":"8px","font-size":"16px"},attrs:{type:"plus-circle"}}),e._v(" "),a("span",[e._v(e._s("新建标签"))])],1),e._v(" "),a("div",{staticClass:"tag-create",attrs:{slot:"forbid"},slot:"forbid"},[a("bk-icon",{staticStyle:{"margin-right":"8px","font-size":"16px"},attrs:{type:"plus-circle"}}),e._v(" "),a("span",[e._v(e._s("新建标签"))])],1)])],1)])],1),e._v(" "),a("lower-component",{attrs:{level:"custom",custom:e.isShowCreateTag}},[a("operation-tag",{on:{"on-change":e.handleTagOperationChange},model:{value:e.isShowCreateTag,callback:function(t){e.isShowCreateTag=t},expression:"isShowCreateTag"}})],1)],1)};r._withStripped=!0;var i=a(55818),n=i.Z,l=(a(7551),(0,a(51900).Z)(n,r,[],!1,null,null,null));l.options.__file="src/views/tag-manage/index/components/batch-edit-relate.vue";var s=l.exports},81871:function(e,t,a){"use strict";a.r(t),a.d(t,{__esModule:function(){return i.X},default:function(){return s}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("list-action-layout",{scopedSlots:e._u([{key:"right",fn:function(){return[a("jb-search-select",{ref:"search",staticStyle:{width:"420px"},attrs:{data:e.searchSelect,placeholder:"请输入"},on:{"on-change":e.handleSearch}})]},proxy:!0}])},[a("auth-button",{directives:[{name:"test",rawName:"v-test",value:{type:"button",value:"createTag"},expression:"{ type: 'button', value: 'createTag' }"}],staticClass:"w120",attrs:{auth:"tag/create",theme:"primary"},on:{click:e.handleCreate}},[e._v("\n            "+e._s("新建")+"\n        ")])],1),e._v(" "),a("render-list",{directives:[{name:"test",rawName:"v-test",value:{type:"list",value:"tag"},expression:"{ type: 'list', value: 'tag' }"}],ref:"list",attrs:{"data-source":e.dataSource,size:e.tableSize,"search-control":function(){return e.$refs.search}},on:{"on-refresh":e.handleListChange}},[e.allRenderColumnMap.id?a("bk-table-column",{key:"id",attrs:{label:"ID",width:"60",prop:"id",align:"left"}}):e._e(),e._v(" "),a("bk-table-column",{key:"name",attrs:{label:"标签名",prop:"name",sortable:"","min-width":"200","show-overflow-tooltip":"",align:"left"}}),e._v(" "),e.allRenderColumnMap.description?a("bk-table-column",{key:"descriptionText",attrs:{label:"描述",prop:"descriptionText","min-width":"200","show-overflow-tooltip":"",align:"left"}}):e._e(),e._v(" "),e.allRenderColumnMap.relatedTaskTemplateNum?a("bk-table-column",{key:"relatedTaskTemplateNum",attrs:{label:"关联作业量",prop:"relatedTaskTemplateNum",width:"150",align:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.relatedTaskTemplateNum>0?a("router-link",{attrs:{target:"_blank",to:{name:"taskList",query:{tags:4}}}},[e._v("\n                    "+e._s(r.relatedTaskTemplateNum)+"\n                ")]):a("bk-button",{attrs:{text:"",disabled:""}},[e._v("\n                    "+e._s(r.relatedTaskTemplateNum)+"\n                ")])]}}],null,!1,1580795216)}):e._e(),e._v(" "),e.allRenderColumnMap.relatedScriptNum?a("bk-table-column",{key:"relatedScriptNum",attrs:{label:"关联脚本量",prop:"relatedScriptNum",width:"170",align:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[r.relatedScriptNum>0?a("router-link",{attrs:{target:"_blank",to:{name:"scriptList",query:{tags:4}}}},[e._v("\n                    "+e._s(r.relatedScriptNum)+"\n                ")]):a("bk-button",{attrs:{text:"",disabled:""}},[e._v("\n                    "+e._s(r.relatedScriptNum)+"\n                ")])]}}],null,!1,1212164544)}):e._e(),e._v(" "),e.allRenderColumnMap.creator?a("bk-table-column",{key:"creator",attrs:{label:"创建人",prop:"creator",width:"120",align:"left"}}):e._e(),e._v(" "),e.allRenderColumnMap.createTime?a("bk-table-column",{key:"createTime",attrs:{label:"创建时间",prop:"createTime",width:"180",align:"left"}}):e._e(),e._v(" "),e.allRenderColumnMap.lastModifyUser?a("bk-table-column",{key:"lastModifyUser",attrs:{label:"更新人",prop:"lastModifyUser",width:"160",align:"left"}}):e._e(),e._v(" "),e.allRenderColumnMap.lastModifyTime?a("bk-table-column",{key:"lastModifyTime",attrs:{label:"更新时间",prop:"lastModifyTime",width:"180",align:"left"}}):e._e(),e._v(" "),a("bk-table-column",{key:"action",attrs:{label:"操作",resizable:!1,fixed:"right",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("auth-button",{directives:[{name:"test",rawName:"v-test",value:{type:"button",value:"editTag"},expression:"{ type: 'button', value: 'editTag' }"}],attrs:{theme:"primary",permission:r.canManage,auth:"tag/edit","resource-id":r.id,text:""},on:{click:function(t){return e.handleEdit(r)}}},[e._v("\n                    "+e._s("编辑")+"\n                ")]),e._v(" "),a("bk-button",{directives:[{name:"test",rawName:"v-test",value:{type:"button",value:"editTagRelate"},expression:"{ type: 'button', value: 'editTagRelate' }"}],staticClass:"mr10",attrs:{theme:"primary",text:""},on:{click:function(t){return e.handleEditRelate(r)}}},[e._v("\n                    "+e._s("批量流转关联项")+"\n                ")]),e._v(" "),a("jb-popover-confirm",{attrs:{title:"确认删除该标签？",content:"关联的作业、脚本，将同时移除本标签","confirm-handler":function(){return e.handleDelete(r.id)}}},[a("auth-button",{directives:[{name:"test",rawName:"v-test",value:{type:"button",value:"deleteTag"},expression:"{ type: 'button', value: 'deleteTag' }"}],attrs:{text:"",permission:r.canManage,auth:"tag/delete","resource-id":r.id}},[e._v("\n                        "+e._s("删除")+"\n                    ")])],1)]}}])}),e._v(" "),a("bk-table-column",{attrs:{type:"setting"}},[a("bk-table-setting-content",{attrs:{fields:e.tableColumn,selected:e.selectedTableColumn,size:e.tableSize},on:{"setting-change":e.handleSettingChange}})],1)],1),e._v(" "),a("lower-component",{attrs:{level:"custom",custom:e.isShowOperation}},[a("operation-tag",{attrs:{data:e.editData},on:{"on-change":e.handleOperationChange},model:{value:e.isShowOperation,callback:function(t){e.isShowOperation=t},expression:"isShowOperation"}})],1),e._v(" "),a("jb-dialog",{attrs:{width:480,title:"批量流转关联项","ok-text":"提交","header-position":"left"},model:{value:e.isShowEditRelate,callback:function(t){e.isShowEditRelate=t},expression:"isShowEditRelate"}},[e.isShowEditRelate?a("batch-edit-relate",{ref:"batchEditRelate",attrs:{data:e.editData},on:{"on-change":e.handleRelateChange,"on-create":e.handleCreate}}):e._e()],1)],1)};r._withStripped=!0;var i=a(44373),n=i.Z,l=(0,a(51900).Z)(n,r,[],!1,null,null,null);l.options.__file="src/views/tag-manage/index/index.vue";var s=l.exports},7551:function(e,t,a){var r=a(52284);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals);(0,a(18086).Z)("1c22e32b",r,!1,{})}}]);