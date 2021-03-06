
import Vue from 'vue';
import bkMagicVue from 'bk-magic-vue';
import 'bk-magic-vue/dist/bk-magic-vue.min.css';

import VueProgressBar from 'vue-progressbar';
// 使用vue3语法
import VueCompositionAPI from '@vue/composition-api';

import AuthRouterLink from '@components/auth/router-link';
import AuthButton from '@components/auth/button';
import AuthOption from '@components/auth/option';
// 自定义render函数,根据权限用v-cursor改变鼠标指针
import AuthCompontent from '@components/auth/component';
// 搜索结果为空
import Empty from '@components/empty';
// 300ms后再渲染出子组件 或 直到元素滚动到顶部不到30才显示出来
import LowerComponent from '@components/lower-component';
// 404（页面找不到了！）、403（Sorry，您的权限不足）、500（）、building(功能正在建设中···)
import Exception from '@/components/exception';
// svg的方式使用 job-svg-icon
import Icon from '@components/icon';

import JbDiff from '@components/jb-diff';// 用diff diff2html highlight库
import JbRouterView from '@components/jb-router-view';// 某几个页面显示页面指导,骨架图, EventBus接收全局的页面权限提示
import JbForm from '@components/jb-form';// 动态计算label的宽度,处理表单项的自动聚焦,标记用户是否主动操作过表单项去增加返回提示,验证表单自动滚到表单错误的地方
import JbFormItem from '@components/jb-form/item';
import JbInput from '@components/jb-input';// 显示已输入字数/限制字数
import JbTextarea from '@components/jb-textarea';// 显示已输入字数/限制字数, 聚焦时显示placeholder到后面
import JbPopoverConfirm from '@components/jb-popover-confirm';// 跟bk-popconfirm差不多
import JbSideslider from '@components/jb-sideslider';// 处理 bk-sideslider 的一些bug
import JbDialog from '@components/jb-dialog';// 解决 bk-dialog 跟window.changeAlert冲突的 bug
import JbBreadcrumb from '@components/jb-breadcrumb';// render函数手撸breadcrumb
import JbBreadcrumbItem from '@components/jb-breadcrumb/jb-breadcrumb-item';

// 优美的内容区局部滚动,当有出现滚动条才用它, 先隐藏原来的滚动条,再用两个假的滚动条通过鼠标时间模拟
// 移到滚动条边缘才显示假的小滚动条,移到滚动条上时滚动条才变大, 鼠标一进内容区容器就计算虚拟滚动条的宽度, 进入/离开内容区显示/隐藏小滚动条
// 移到滚动条上滚动条变大,虚拟滚动条的滚动跟内容区的scrollLeft,scrollTop联动
import ScrollFaker from '@components/scroll-faker';
// 内容+下面两个按钮(action区)
import SmartAction from '@components/smart-action';
// 传送移动 slot 到指定的 target, slot的childNodes.forEach targetParent.appendChild(childNode)
import ElementTeleport from '@components/element-teleport';
// 注入$request, 用 Promise.race 限制请求超时时间
import Request from '@components/request';
// vue插件, 注册指令v-cursor, 鼠标后面跟一个小锁头
import Cursor from '@components/cursor';
// 元素:tippy-tips="提示内容" 即可注入悬浮提示
import TippyTips from '@components/tippy-tips';
// 拖拽分割条-动态设置父元素宽度
import ResizeableBox from '@components/resizeable-box';
// v-test指令,dom调试用, 在元素属性添加提示信息 在directive的bind和update时,setAttribute data-test-id 的值为binding.value

import Test from '@components/test';

Vue.use(bkMagicVue);
Vue.use(VueProgressBar, {
    color: '#3A84FF',
    failedColor: 'red',
    height: '2px',
    inverse: false,
    transition: {
        speed: '0.1s',
        opacity: '0.6s',
        termination: 100,
    },
    position: 'absolute',
    autoFinish: false,
});
Vue.use(VueCompositionAPI);

Vue.component('AuthRouterLink', AuthRouterLink);
Vue.component('AuthButton', AuthButton);
Vue.component('AuthOption', AuthOption);
Vue.component('AuthComponent', AuthCompontent);
Vue.component('Empty', Empty);
Vue.component('LowerComponent', LowerComponent);
Vue.component('AppException', Exception);
Vue.component('Icon', Icon);
Vue.component('JbDiff', JbDiff);
Vue.component('JbRouterView', JbRouterView);
Vue.component('JbForm', JbForm);
Vue.component('JbFormItem', JbFormItem);
Vue.component('JbInput', JbInput);
Vue.component('JbTextarea', JbTextarea);
Vue.component('JbPopoverConfirm', JbPopoverConfirm);
Vue.component('JbSideslider', JbSideslider);
Vue.component('JbDialog', JbDialog);
Vue.component('JbBreadcrumb', JbBreadcrumb);
Vue.component('JbBreadcrumbItem', JbBreadcrumbItem);
Vue.component('ScrollFaker', ScrollFaker);
Vue.component('SmartAction', SmartAction);
Vue.component('ElementTeleport', ElementTeleport);
Vue.component('ResizeableBox', ResizeableBox);
Vue.use(Cursor);
Vue.use(Request);
Vue.use(TippyTips);
Vue.use(Test);

/*
account-select
app-select
apply-permission
    通过permissionInstance = new Vue(ApplyPermissionDialog).$mount();
    document.body.appendChild(permissionInstance.$el);实例化后插入
back-top
choose-ip
compose-form-item
detail-layout
global-variable
jb-collapse-item
jb-edit
jb-menu
jb-search-select
jb-tag-select
jb-user-selector
list-action-layout
list-operation-extend
operation-tag
render-file-list-column 函数式组件 动态表单渲染列
render-list
render-server-agent
render-strategy
router-back
site-frame
smart-input
system-log
task-step
*/
