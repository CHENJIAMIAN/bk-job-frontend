

import Vue from 'vue';
export const scriptErrorAlert = () => {
    let confirmInfo = null;
    const handleClose = () => {
        confirmInfo.close();
    };
    const vm = new Vue();
    const h = vm.$createElement;
    confirmInfo = vm.$bkInfo({
        title: '脚本中出现高危语句',
        showFooter: false,
        width: 450,
        subHeader: (h => (
            <div>
                <div style="font-size: 14px; line-height: 22px; color: #63656E; text-align: center">
                    <span>{ '请按脚本编辑框左侧' } </span>
                    <img src="/static/images/ace-editor/error-tips.png" style="width: 14px; vertical-align: middle;" />
                    <span> { '图标的提示处理后重试' }</span>
                </div>
                <div style="padding: 24px 0 21px; text-align: center">
                    <bk-button
                        onClick={handleClose}
                        style="width: 96px"
                        theme="primary">
                        { '好的' }
                    </bk-button>
                </div>
            </div>
        ))(h),
    });
};
