(self.webpackChunkjob=self.webpackChunkjob||[]).push([[8821],{85890:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(41336),a(91981),a(63898),a(14309),a(32106),a(9158),a(13118);var s=i(a(84227)),n=i(a(12350)),r=i(a(55434)),o=i(a(29314)),l=i(a(29874)),c=a(11986),u={name:"",components:{SidesliderBox:r.default,ActionExtend:o.default,HostList:l.default},data:()=>({isLoading:!1,isShow:!1,statusType:"",allHostList:[{},{},{}],agentInfo:{}}),computed:{listTitle(){return{normal:"Agent 正常的机器列表：",fail:"Agent 异常的机器列表："}[this.statusType]},defaultHighlight(){return this.agentInfo.abnormalNum||!this.agentInfo.normalNum?"异常":"正常"}},created(){this.fetchStatisticsAgent()},methods:{fetchStatisticsAgent(){var t=this;this.$request(n.default.fetchStatisticsAgent(),(function(){t.isLoading=!0})).then((function(e){t.agentInfo=e,t.initAgentStatistics()})).finally((function(){t.isLoading=!1}))},handleShowAgentDetail(t,e){e&&(this.isShow=!0,this.statusType=t,this.fetchAllAgentStatus())},handleClose(){this.isShow=!1},handleCopyAll(){var t=this.allHostList.map((function(t){return t.split(":").pop()}));(0,c.execCopy)(t.join("\n"),"复制成功".concat("（",t.length,"个IP","）"))},fetchAllAgentStatus(){var t=this,e="fail"===this.statusType?0:1;n.default.fetchAllAgentStatus({agentStatus:e}).then((function(e){t.allHostList=e.data}))},handlePieScale(t){var e=[t],a=["正常","异常"].filter((function(t){return t!==e[0]}));this.myChart.dispatchAction({type:"highlight",name:e}),this.myChart.dispatchAction({type:"downplay",name:a})},initAgentStatistics(){var t=this;this.myChart=s.default.init(this.$refs.agentStatistics);var e={series:[{type:"pie",radius:["43","53"],selectedMode:"single",hoverOffset:5,selectedOffset:0,avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,label:{fontSize:"12",fontWeight:"bold"},formatter:["{value|{d}%}","{b}"].join("\n"),rich:{name:{fontSize:12,lineHieght:16},value:{fontSize:20,fontWeight:600,lineHeight:26,color:"#000"}}}},labelLine:{normal:{show:!1}},data:[{value:this.agentInfo.normalNum,key:"normal",name:"正常",itemStyle:{color:"#2DCB9D"},emphasis:{label:{show:!0}}},{value:this.agentInfo.abnormalNum,key:"fail",name:"异常",itemStyle:{color:"#FF565C"}}]}]};this.myChart.setOption(e),this.myChart.on("click",(function(e){t.handleShowAgentDetail(e.data.key,e.data.value)})),this.myChart.on("mouseover",(function(e){t.handlePieScale(e.data.name)})),this.myChart.dispatchAction({type:"highlight",name:this.defaultHighlight})}}};e.Z=u},58177:function(t,e){"use strict";Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var a={name:"",props:{title:String}};e.Z=a},17606:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(41336),a(91981),a(63898);var s=i(a(12350)),n={data:()=>({isLoading:!0,height:void 0,favorList:[{},{},{}]}),created(){this.fetchMyFavorList()},mounted(){var t=this;this.init(),window.addEventListener("resize",this.init),this.$once("hook:beforeDestroy",(function(){window.removeEventListener("resize",t.init)}))},methods:{fetchMyFavorList(){var t=this;s.default.fetchMyFavorList().then((function(e){t.favorList=Object.freeze(e)})).finally((function(){t.isLoading=!1}))},init(){var t=this.$refs.container.getBoundingClientRect().height;this.height=t}}};e.Z=n},54357:function(t,e,a){"use strict";Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(98495);var i={methods:{setAnalysisGreeting(){var t={txtOne:function(t,e){return t>=1&&t<4&&"home.现在是凌晨 {HH:MM}！切忌劳累过度，影响身体还容易误操作，赶紧休息吧..., { 'HH:MM': ".concat(t,":").concat(e," }")},txtTwo:function(t,e){return 4===t&&"感谢你来见证凌晨4点的作业平台，Mamba Forever！曼巴精神！共勉！"},txtThree:function(t,e){return t>=5&&t<7&&"home.一年之计在于春、一日之计在于晨！早起的鸟儿有虫吃~ 伙计，加油！', { 'HH:MM': ".concat(t,":").concat(e," })")},txtFour:function(t,e){return(t>=7&&t<=10||11===t&&e<40)&&"home.上午好！专注工作之时别忘了多饮水，促进身体新陈代谢，有益身体健康噢~', { 'HH:MM': ".concat(t,":").concat(e," })")},txtFive:function(t,e){return(11===t&&e>=40||12===t&&e<30)&&"午饭时间到了，肠胃很重要！记得按时就餐喔~"},txtSix:function(t,e){return(12===t&&e>=30||13===t)&&"午饭过后，闲庭几步、小憩片刻，下午办公精神更佳！"},txtSeven:function(t,e){return t>=14&&t<18&&"home.下午好！预防「久坐成疾」，记得多起来走动走动，松松肩颈，放松片刻。', { 'HH:MM': ".concat(t,":").concat(e," })")},txtEight:function(t,e){return(18===t||19===t&&e<30)&&"home.晚上好！夜间人体内消化能力偏弱，饮食切忌太饱，健康绿色膳食为宜。', { 'HH:MM': ".concat(t,":").concat(e," })")},txtNight:function(t,e){return(19===t&&e>=30||t>=20&&t<23)&&"home.晚上好！少加班，多锻炼噢~ 只要每天做好规划，不怕事情做不好！', { 'HH:MM': ".concat(t,":").concat(e," })")},txtTen:function(t,e){return(t>=23||t<1)&&"home.现在是晚上 {HH:MM}，夜深了... 为了自己的身体健康，请早点休息，保持足够睡眠！', { 'HH:MM': ".concat(t,":").concat(e," })")}},e=(new Date).getHours(),a=(new Date).getMinutes()>10?(new Date).getMinutes():"0".concat((new Date).getMinutes());for(var i in t){var s=t[i](e,a);if(s)return s}return"--"}}};e.Z=i},21245:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(41336),a(91981),a(63898);var s=i(a(56762)),n=i(a(41652)),r={components:{Empty:i(a(89888)).default},data:()=>({userInfo:{},isLoading:!0,recordOperator:"",recordList:[{},{},{}]}),created(){this.fetchUserInfo(),this.fetchExecuteHistory()},methods:{fetchUserInfo(){var t=this;n.default.fetchUserInfo().then((function(e){t.userInfo=Object.freeze(e)}))},fetchExecuteHistory(){var t=this;this.isLoading=!0;var e={timeRange:30};this.recordOperator&&(e.operator=this.recordOperator,e.startupModes="1,2"),s.default.fetchExecutionHistoryList(e).then((function(e){t.recordList=Object.freeze(e.data)})).finally((function(){t.isLoading=!1}))},handleRecordFilterChange(t){this.recordOperator=t,this.fetchExecuteHistory()},handleViewExecuteDetail(t){t.isTask?this.$router.push({name:"historyTask",params:{id:t.id}}):this.$router.push({name:"historyStep",params:{taskInstanceId:t.id}})}}};e.Z=r},24214:function(t,e,a){"use strict";a(87147),a(13118),a(59241),a(20767);var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var s=i(a(68203));a(75328),a(41336),a(91981),a(63898);var n=i(a(12350));function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){(0,s.default)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var l={props:{statusType:{type:String,default:""}},data:()=>({isLoading:!1,hostList:[{},{},{}],pagination:{count:30,current:1,limit:10}}),created(){this.fetchData()},methods:{fetchData(){var t=this,e=this.pagination.limit,a=parseInt(this.pagination.current-1,10)*e,i={agentStatus:"fail"===this.statusType?0:1,start:a,pageSize:e};this.$request(n.default.fetchAgentStatus(i),(function(){t.isLoading=!0})).then((function(e){t.hostList=e.data,t.pagination=o(o({},t.pagination),{},{count:e.total||0})})).finally((function(){t.isLoading=!1}))},handlePageChange(t){this.pagination.current=t,this.fetchData()},handleLimitChange(t){this.pagination.current=1,this.pagination.limit=t,this.fetchData()}}};e.Z=l},32282:function(t,e,a){"use strict";a(13118),a(20767);var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(41336),a(91981),a(63898),a(79951),a(45680),a(59241),a(32106),a(36380),a(87147),a(63876),a(9158);var s=i(a(17434)),n=i(a(68203)),r=i(a(25992)),o=i(a(25843)),l=i(a(66818)),c=i(a(41652)),u=i(a(14630));function d(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?d(Object(a),!0).forEach((function(e){(0,n.default)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var h={ForbiddenScriptFinder:"使用禁用脚本的作业模板/执行方案",TaskPlanTargetChecker:"存在异常 Agent 的执行方案",TimerTaskFailRateWatcher:"周期成功率低于60%的定时任务",TimerTaskFailWatcher:"近期执行失败的定时任务"},v={ForbiddenScriptFinder:"作业模板/执行方案",TaskPlanTargetChecker:"作业执行方案",TimerTaskFailRateWatcher:"定时任务",TimerTaskFailWatcher:"定时任务"},p={components:{Greeting:u.default},data:()=>({isLoading:!0,isShowList:!1,dialogTitle:"",analysisIndex:0,userInfo:{},analysisList:{},greetingInfo:{},listType:"",listData:[]}),computed:{workTipsStyles(){var t={transform:"translateY(".concat(-100*this.analysisIndex,"%)")};return 0===this.analysisIndex&&(t.transition="unset"),t},listInfo(){return{dialogTitle:h[this.listType],columnName:v[this.listType]}}},created(){var t=this;this.analysisResultTimer="",this.analysisMap={},Promise.all([this.fetchUserInfo(),this.fetchAnalysisResult()]).finally((function(){t.isLoading=!1}))},methods:{fetchUserInfo(){var t=this;return c.default.fetchUserInfo().then((function(e){t.userInfo=Object.freeze(e)}))},fetchAnalysisResult(){var t=this;return l.default.fetchAnalysisResult().then((function(e){var a=[],i={};e.forEach((function(t){var e=(0,r.default)((0,o.default)(t.description).replace(/(?=( href))/g,' target="_blank"'),"\n");h[t.analysisTaskCode]&&(e=e.replace(/(?=<\/p>$)/,'<span data-id="'.concat(t.id,'" class="action-list">',"查看列表","</span>")));var s=f(f({},t),{},{description:e});a.push(s),i[s.id]=s})),t.analysisList=Object.freeze(a),t.analysisMap=i,t.swiperAnalysisResult()}))},handleHideList(){this.isShowList=!1},handleShowList(t){var e=t.target;if("action-list"===e.className){var a=e.getAttribute("data-id");this.listType=this.analysisMap[a].analysisTaskCode,this.listData=Object.freeze(this.analysisMap[a].contents),this.isShowList=!0}},handleGoDetail(t){var e={};if("TEMPLATE"===t.type&&(e=this.$router.resolve({name:"templateDetail",params:{id:t.location.content}})),"TASK_PLAN"===t.type){var a=t.location.content.split(","),i=(0,s.default)(a,2),n=i[0],r=i[1];e=this.$router.resolve({name:"viewPlan",params:{templateId:n},query:{viewPlanId:r}})}"TIMER_TASK"===t.type&&(e=this.$router.resolve({name:"cronList",query:{name:t.location.content,mode:"detail"}})),window.open(e.href)},handleStopSwiper(){clearTimeout(this.analysisResultTimer)},handleBeginSwiper(){this.swiperAnalysisResult()},swiperAnalysisResult(){var t=this;this.analysisList.length<1||(clearTimeout(this.analysisResultTimer),this.analysisResultTimer=setTimeout((function(){t.swiperAnalysisResult(),t.isShowList||(t.analysisIndex<t.analysisList.length-1?t.analysisIndex+=1:t.analysisIndex=0)}),3e3))}}};e.Z=p},4557:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0;var s=i(a(12350)),n={name:"",props:{type:{type:String,default:""},link:{type:String,default:""}},data:()=>({jobNum:0,scriptNum:0}),created(){this.fetchStatisticsJobAndScript()},methods:{fetchStatisticsJobAndScript(){var t=this;s.default.fetchStatisticsJobAndScript().then((function(e){var a=e.jobNum,i=e.scriptNum;t.jobNum=a,t.scriptNum=i}))}}};e.Z=n},64888:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"X",{value:!0}),e.Z=void 0,a(32106),a(36380);var s=i(a(25843)),n=i(a(13030)),r=i(a(43170)),o=i(a(53040)),l=i(a(6254)),c=i(a(62136)),u=i(a(78490)),d=i(a(39044)),f={name:"",components:{LayoutCard:r.default,User:o.default,Agent:l.default,WorkStatistics:c.default,FavorTask:u.default,HistoryRecord:d.default},data:()=>({footerLink:"",footerCopyRight:""}),created(){this.fetchTitleAndFooter()},methods:{fetchTitleAndFooter(){var t=this;n.default.fetchFooterConfig().then((function(e){t.footerLink=(0,s.default)("".concat(e.footerLink)).replace(/(?=( href))/g,' target="_blank"'),t.footerCopyRight=(0,s.default)(e.footerCopyRight)}))}}};e.Z=f},12350:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a(14309);var s=i(a(37065)),n=i(a(67905)),r={fetchAnalysisGreeting:()=>s.default.getAnalysisGreeting().then((function(t){return t.data})),fetchMyFavorList:()=>s.default.getMyFavorList().then((function(t){return t.data.map((function(t){return new n.default(t)}))})),fetchStatisticsAgent:()=>s.default.getStatisticsAgent().then((function(t){return t.data})),fetchStatisticsJobAndScript:()=>s.default.getStatisticsJobAndScript().then((function(t){return t.data})),fetchAgentStatus:t=>s.default.getAgentStatusList(t).then((function(t){return t.data})),fetchAllAgentStatus:t=>s.default.getAllAgentStatusList(t).then((function(t){return t.data}))};e.default=r},66818:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(a(97106)),n={fetchAnalysisResult:()=>s.default.getAnalysisResult().then((function(t){return t.data}))};e.default=n},37065:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a(98495);var s=i(a(37346)),n=i(a(27819));class r extends n.default{constructor(){super(),this.module="/job-manage/web/index"}getAnalysisGreeting(){return s.default.get("".concat(this.path,"/analysis/greeting/list"))}getMyFavorList(){return s.default.get("".concat(this.path,"/jobs/myFavorList"))}getStatisticsAgent(){return s.default.get("".concat(this.path,"/statistics/agent"))}getStatisticsJobAndScript(){return s.default.get("".concat(this.path,"/statistics/jobAndScript"))}getAgentStatusList(t){return s.default.get("".concat(this.path,"/hosts/agentStatus/").concat(t.agentStatus),{params:{start:t.start,pageSize:t.pageSize}})}getAllAgentStatusList(t){var e=t.agentStatus;return s.default.get("".concat(this.path,"/IPs/agentStatus/").concat(e))}}var o=new r;e.default=o},97106:function(t,e,a){"use strict";var i=a(70534);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(a(37346)),n=i(a(27819));class r extends n.default{constructor(){super(),this.module="/job-analysis/web/index"}getAnalysisResult(){return s.default.get("".concat(this.path,"/analysis/result/list"))}}var o=new r;e.default=o},4909:function(){},28040:function(){},21167:function(){},50474:function(){},98270:function(){},24283:function(){},69083:function(){},87278:function(){},829:function(){},6254:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"agent-box"},[a("div",{staticClass:"agent-statistics"},[a("div",{ref:"agentStatistics",staticStyle:{width:"126px",height:"126px"}})]),t._v(" "),a("div",{staticClass:"agent-statistics-detail"},[a("div",{staticClass:"detail-item normal",on:{mouseover:function(e){return t.handlePieScale("正常")},click:function(e){return t.handleShowAgentDetail("normal",t.agentInfo.normalNum)}}},[a("span",[t._v(t._s("正常"))]),t._v(" "),a("span",{staticClass:"detail-value"},[t._v(t._s(t.agentInfo.normalNum))])]),t._v(" "),a("div",{staticClass:"detail-item fail",on:{mouseover:function(e){return t.handlePieScale("异常")},click:function(e){return t.handleShowAgentDetail("fail",t.agentInfo.normalNum)}}},[a("span",[t._v(t._s("异常"))]),t._v(" "),a("span",{staticClass:"detail-value"},[t._v(t._s(t.agentInfo.abnormalNum))])])]),t._v(" "),a("sideslider-box",{attrs:{value:t.isShow},on:{change:t.handleClose}},[a("div",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.listTitle))]),t._v(" "),a("div",{attrs:{slot:"desc"},slot:"desc"},[a("action-extend",[a("div",{staticClass:"action-item",on:{click:t.handleCopyAll}},[t._v(t._s("复制全部"))])])],1),t._v(" "),a("host-list",{attrs:{"status-type":t.statusType}})],1)],1)};i._withStripped=!0;var s=a(85890),n=s.Z,r=(a(28267),(0,a(51900).Z)(n,i,[],!1,null,"1a7b4cef",null));r.options.__file="src/views/home/index/components/agent.vue";var o=r.exports},43170:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"home-card-layout"},[t.title?a("div",{staticClass:"card-title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("default")],2)])};i._withStripped=!0;var s=a(58177),n=s.Z,r=(a(37622),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/components/card.vue";var o=r.exports},78490:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],ref:"container",staticClass:"favor-task-box"},[t.isLoading?t._e():[t.favorList.length>0?a("bk-table",{attrs:{data:t.favorList,height:t.height}},[a("bk-table-column",{attrs:{prop:"name",label:"作业模板名称","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("auth-router-link",{staticClass:"task-name-text",attrs:{permission:i.canView,auth:"job_template/view","resource-id":i.id,to:{name:"templateDetail",params:{id:4}}}},[t._v("\n                        "+t._s(i.name)+"\n                    ")])]}}],null,!1,2391971395)}),t._v(" "),a("bk-table-column",{attrs:{width:"100",prop:"status",label:"状态"}},[t._v("\n                "+t._s("已上线")+"\n            ")]),t._v(" "),a("bk-table-column",{attrs:{width:"180",prop:"lastModifyUser",label:"更新人"}}),t._v(" "),a("bk-table-column",{attrs:{width:"180",prop:"lastModifyTime",label:"更新时间"}}),t._v(" "),a("bk-table-column",{attrs:{label:"操作",width:"200","class-name":"task-action"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("auth-router-link",{attrs:{permission:i.canView,auth:"job_template/view","resource-id":i.id,to:{name:"viewPlan",params:{templateId:4}}}},[t._v("\n                        "+t._s("执行方案")+"\n                    ")]),t._v(" "),a("auth-router-link",{attrs:{permission:i.canDebug,auth:"job_template/debug","resource-id":i.id,to:{name:"debugPlan",params:{id:4}}}},[t._v("\n                        "+t._s("调试")+"\n                    ")]),t._v(" "),a("auth-router-link",{attrs:{permission:i.canEdit,auth:"job_template/edit","resource-id":i.id,to:{name:"templateEdit",params:{id:4}}}},[t._v("\n                        "+t._s("编辑")+"\n                    ")])]}}],null,!1,307404061)})],1):a("div",{staticClass:"list-empty"},[a("img",{staticClass:"empty-flag",attrs:{src:"/static/images/favor-task-empty.png"}}),t._v(" "),a("div",{staticStyle:{"margin-top":"12px","font-size":"14px",color:"#63656e"}},[t._v(t._s("暂无收藏的作业"))]),t._v(" "),a("div",{staticStyle:{"margin-top":"10px","font-size":"12px",color:"#979ba5"}},[t._v(t._s("将鼠标悬浮到作业模板行，点击收藏图标"))])])]],2)};i._withStripped=!0;var s=a(17606),n=s.Z,r=(a(99456),(0,a(51900).Z)(n,i,[],!1,null,"1bc5f9ba",null));r.options.__file="src/views/home/index/components/favor-task.vue";var o=r.exports},14630:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"greeting-box time-tips"},[t._v("\n    "+t._s(t.setAnalysisGreeting())+"\n")])};i._withStripped=!0;var s=a(54357),n=s.Z,r=(a(26728),(0,a(51900).Z)(n,i,[],!1,null,"32bfe33f",null));r.options.__file="src/views/home/index/components/greeting.vue";var o=r.exports},39044:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"history-record-box"},[t.isLoading?t._e():a("div",{staticClass:"history-record"},[t.recordList.length>0?[a("scroll-faker",t._l(t.recordList,(function(e){return a("div",{key:e.id,staticClass:"record-item",class:e.statusClass,on:{click:function(a){return t.handleViewExecuteDetail(e)}}},[a("div",{staticClass:"item-header"},[a("div",{staticClass:"record-name"},[t._v(t._s(e.name))]),t._v(" "),a("div",{staticClass:"record-label",domProps:{innerHTML:t._s(e.statusDescHtml)}})]),t._v(" "),a("div",{staticClass:"item-body"},[a("span",[t._v(t._s(e.startTime))]),t._v(" "),a("span",{staticClass:"record-operator"},[t._v(t._s(e.operator))]),t._v(" "),a("div",{staticClass:"record-total-time"},[t._v(t._s(e.totalTimeText))])])])})),0)]:a("Empty",{staticClass:"record-empty",attrs:{title:"暂无执行记录"}}),t._v(" "),a("div",{staticClass:"record-actions"},[a("bk-radio-group",{staticClass:"record-filter",attrs:{value:t.recordOperator},on:{change:t.handleRecordFilterChange}},[a("bk-radio-button",{attrs:{value:""}},[t._v("\n                    "+t._s("全部")+"\n                ")]),t._v(" "),a("bk-radio-button",{attrs:{value:t.userInfo.username}},[t._v("\n                    "+t._s("我执行")+"\n                ")])],1),t._v(" "),a("router-link",{staticClass:"action-btn",attrs:{to:{name:"historyList"}}},[t._v("\n                "+t._s("更多")+"\n            ")])],1)],2)])};i._withStripped=!0;var s=a(21245),n=s.Z,r=(a(95043),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/components/history-record.vue";var o=r.exports},29874:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"host-list-wrapper"},[a("bk-table",{attrs:{"ext-cls":"host-table",data:t.hostList,pagination:t.pagination,width:"100%"},on:{"page-change":t.handlePageChange,"page-limit-change":t.handleLimitChange}},[a("bk-table-column",{attrs:{prop:"ip",label:"IP","class-name":"ip-item"}}),t._v(" "),a("bk-table-column",{attrs:{label:"云区域"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.cloudAreaInfo.name||"--"))]}}])}),t._v(" "),a("bk-table-column",{attrs:{label:"主机名"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.ipDesc||"--"))]}}])}),t._v(" "),a("bk-table-column",{attrs:{label:"操作系统名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.os||"--"))]}}])})],1)],1)};i._withStripped=!0;var s=a(24214),n=s.Z,r=(a(57825),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/components/host-list.vue";var o=r.exports},53040:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"bkloading",rawName:"v-bkloading",value:{isLoading:t.isLoading},expression:"{ isLoading }"}],staticClass:"user-box"},[a("div",{staticClass:"user-name"},[t._v("Hi, "+t._s(t.userInfo.username))]),t._v(" "),a("greeting"),t._v(" "),a("div",{staticClass:"work-tips",on:{mousemove:t.handleStopSwiper,mouseleave:t.handleBeginSwiper}},[a("div",{staticClass:"work-tips-container",style:t.workTipsStyles},t._l(t.analysisList,(function(e,i){return a("div",{key:i,staticClass:"item"},[a("div",{domProps:{innerHTML:t._s(e.description)},on:{click:t.handleShowList}})])})),0)])],1)};i._withStripped=!0;var s=a(32282),n=s.Z,r=(a(81288),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/components/user.vue";var o=r.exports},62136:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{staticClass:"work-statistics-box",attrs:{to:{name:t.link}}},[a("div",{staticClass:"work-flag"},[a("Icon",{staticClass:"hexagon",attrs:{type:"hexagon",svg:""}}),t._v(" "),a("Icon",{staticClass:"statistics",attrs:{type:t.type,svg:""}})],1),t._v(" "),a("div",{staticClass:"work-total"},[t._t("default",null,{jobNum:t.jobNum,scriptNum:t.scriptNum})],2),t._v(" "),a("div",{staticClass:"work-name"},[t._t("name")],2)])};i._withStripped=!0;var s=a(4557),n=s.Z,r=(a(43747),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/components/work-statistics.vue";var o=r.exports},58821:function(t,e,a){"use strict";a.r(e),a.d(e,{__esModule:function(){return s.X},default:function(){return o}});var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-home"},[a("div",{staticClass:"layout-row"},[a("div",{staticClass:"layout-left"},[a("div",{staticClass:"layout-row content-top"},[a("layout-card",{staticClass:"user-card"},[a("user")],1),t._v(" "),a("layout-card",{staticClass:"agent-card",attrs:{title:"Agent 状态分布"}},[a("agent")],1)],1),t._v(" "),a("div",{staticClass:"layout-row"},[a("layout-card",{staticClass:"my-task",attrs:{title:"我收藏的作业"}},[a("favor-task")],1)],1)]),t._v(" "),a("div",{staticClass:"layout-right"},[a("div",{staticClass:"layout-row content-top"},[a("layout-card",{staticClass:"work-statistics-card"},[a("work-statistics",{attrs:{type:"job-statistics",link:"taskList"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.jobNum;return[a("span",[t._v(t._s(i))])]}}])},[t._v(" "),a("span",{attrs:{slot:"name"},slot:"name"},[t._v(t._s("作业量"))])])],1),t._v(" "),a("layout-card",{staticClass:"work-statistics-card"},[a("work-statistics",{attrs:{type:"script-statistics",link:"scriptList"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.scriptNum;return[a("span",[t._v(t._s(i))])]}}])},[t._v(" "),a("span",{attrs:{slot:"name"},slot:"name"},[t._v(t._s("脚本量"))])])],1)],1),t._v(" "),a("div",{staticClass:"layout-row"},[a("layout-card",{staticClass:"record-card",attrs:{title:"最近执行记录"}},[a("history-record")],1)],1)])]),t._v(" "),a("div",{staticClass:"page-footer"},[a("div",{domProps:{innerHTML:t._s(t.footerLink)}}),t._v(" "),a("div",{domProps:{innerHTML:t._s(t.footerCopyRight)}})])])};i._withStripped=!0;var s=a(64888),n=s.Z,r=(a(60435),(0,a(51900).Z)(n,i,[],!1,null,null,null));r.options.__file="src/views/home/index/index.vue";var o=r.exports},28267:function(t,e,a){var i=a(4909);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("bd7bbe94",i,!1,{})},37622:function(t,e,a){var i=a(28040);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("3acf6198",i,!1,{})},99456:function(t,e,a){var i=a(21167);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("1ce6e438",i,!1,{})},26728:function(t,e,a){var i=a(50474);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("95d09082",i,!1,{})},95043:function(t,e,a){var i=a(98270);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("626323cc",i,!1,{})},57825:function(t,e,a){var i=a(24283);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("6f835638",i,!1,{})},81288:function(t,e,a){var i=a(69083);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("1b5f56e4",i,!1,{})},43747:function(t,e,a){var i=a(87278);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("6da603b8",i,!1,{})},60435:function(t,e,a){var i=a(829);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[t.id,i,""]]),i.locals&&(t.exports=i.locals);(0,a(18086).Z)("72c4b0b0",i,!1,{})}}]);