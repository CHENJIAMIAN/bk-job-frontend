(self.webpackChunkjob=self.webpackChunkjob||[]).push([[5511],{66123:function(t,e,a){"use strict";var s=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(41336),a(91981),a(63898),a(13118),a(70616),a(59241),a(94354),a(79951),a(45680),a(14309);var i=s(a(41844)),n=s(a(56762)),r=s(a(51391)),l=a(11986),u=s(a(28033)),o=s(a(14590)),d=s(a(35543)),c=s(a(11944)),h={name:"",components:{GlobalVariableLayout:u.default,GlobalVariable:o.default,ToggleDisplay:d.default,BackTop:c.default},data:()=>({isLoading:!0,isSubmiting:!1,hasHostVariable:!1,usedList:[{},{},{}],unusedList:[{},{},{}],planName:""}),computed:{isSkeletonLoading(){return this.isLoading}},created(){this.taskId=this.$route.params.id,this.templateId=this.$route.params.templateId,this.isDebugPlan=Boolean(this.$route.params.debug),this.fetchData()},methods:{fetchData(){var t=this;(this.isDebugPlan?r.default.fetchDebugInfo:r.default.fetchPlanDetailInfo)({id:this.taskId,templateId:this.templateId},{permission:"page"}).then((function(e){var a=e.name,s=e.stepList,n=e.variableList;t.planName=a;var r=s.filter((function(t){return 1===t.enable})),u=(0,l.findUsedVariable)(r).reduce((function(t,e){return t[e]=!0,t}),{}),o=[],d=[];n.forEach((function(t){u[t.name]?o.push(t):d.push(t)})),t.usedList=Object.freeze(o),t.unusedList=Object.freeze(d),t.hasHostVariable=(0,i.default)(n,(function(t){return t.isHost}))>-1})).catch((function(e){[1243009,400].includes(e.code)&&setTimeout((function(){t.$router.push({name:"taskList"})}),3e3)})).finally((function(){t.isLoading=!1}))},handleGoExec(){var t=this,e=[];this.$refs.used&&this.$refs.used.forEach((function(t){e.push(t.validate())})),this.$refs.unused&&this.$refs.unused.forEach((function(t){e.push(t.validate())})),this.isSubmiting=!0,Promise.all(e).then((function(e){return n.default.taskExecution({taskId:t.taskId,taskVariables:e.map((function(t){return{id:t.id,name:t.name,type:t.type,value:t.value,targetValue:t.targetValue}}))}).then((function(e){var a=e.taskInstanceId;t.$bkMessage({theme:"success",message:"执行成功"}),window.changeAlert=!1,t.$router.push({name:"historyTask",params:{id:a},query:{from:"planList"}})}))})).catch((function(){t.isSubmiting=!1}))},handleCancle(){this.routerBack()},handleRemoveAllInvalidHost(){this.$refs.used&&this.$refs.used.forEach((function(t){return t.removeAllInvalidHost()})),this.$refs.unused&&this.$refs.unused.forEach((function(t){return t.removeAllInvalidHost()}))},routerBack(){var t=this.$route.query.from;"debugPlan"!==t?"viewPlan"!==t?this.$router.push({name:"planList",query:{viewTemplateId:this.templateId,viewPlanId:this.taskId}}):this.$router.push({name:"viewPlan",params:{templateId:this.templateId},query:{viewPlanId:this.taskId}}):this.$router.push({name:"debugPlan",params:{id:this.templateId}})}}};e.Z=h},21574:function(){},15511:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return i.X},default:function(){return l}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting-variable-page"},[a("smart-action",{attrs:{"offset-target":"variable-value"},scopedSlots:t._u([{key:"action",fn:function(){return[a("div",{staticClass:"action-wraper"},[a("bk-button",{staticClass:"w120 mr10",attrs:{theme:"primary",loading:t.isSubmiting},on:{click:t.handleGoExec}},[t._v("\n                    "+t._s("执行")+"\n                ")]),t._v(" "),a("bk-button",{on:{click:t.handleCancle}},[t._v("\n                    "+t._s("取消")+"\n                ")]),t._v(" "),t.hasHostVariable?a("bk-button",{staticClass:"remove-all",on:{click:t.handleRemoveAllInvalidHost}},[t._v("\n                    "+t._s("移除无效主机")+"\n                ")]):t._e()],1)]},proxy:!0}])},[a("global-variable-layout",{staticStyle:{"padding-bottom":"20px"},attrs:{type:"vertical"}},[t._l(t.usedList,(function(t){return a("global-variable",{key:t.id,ref:"used",refInFor:!0,attrs:{type:t.type,data:t}})})),t._v(" "),t.usedList.length<1?a("Empty",{key:"empty",staticStyle:{height:"160px","max-width":"960px","background-color":"#f0f1f5"},attrs:{title:"暂无引用的变量"}}):t._e(),t._v(" "),t.unusedList.length>0?a("toggle-display",{staticStyle:{"max-width":"960px","margin-top":"20px"},attrs:{count:t.unusedList.length}},[a("div",{staticStyle:{"margin-top":"20px"}},t._l(t.unusedList,(function(t){return a("global-variable",{key:t.id,ref:"unused",refInFor:!0,attrs:{type:t.type,data:t}})})),1)]):t._e()],2)],1),t._v(" "),a("back-top"),t._v(" "),t.planName?a("element-teleport",[a("div",{staticStyle:{"font-size":"12px",color:"#63656e"}},[t._v("（"+t._s(t.planName)+"）")])]):t._e()],1)};s._withStripped=!0;var i=a(66123),n=i.Z,r=(a(20337),(0,a(51900).Z)(n,s,[],!1,null,null,null));r.options.__file="src/views/task-manage/setting-variable/index.vue";var l=r.exports},20337:function(t,e,a){var s=a(21574);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,a(18086).Z)("f88960ee",s,!1,{})}}]);