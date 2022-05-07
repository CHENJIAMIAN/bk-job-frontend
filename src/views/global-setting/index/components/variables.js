

export const InternalVariables = {
    general: [
        {
            name: '{{ task.id }}',
            meaning: '任务的ID',
            examples: '127',
        },
        {
            name: '{{ task.name }}',
            meaning: '任务的名称',
            examples: '获取所有主机的设备型号',
        },
        {
            name: '{{ task.bk_biz_id }}',
            meaning: '任务所属业务的 ID',
            examples: '100147',
        },
        {
            name: '{{ task.bk_biz_name }}',
            meaning: '任务所属业务的名称',
            examples: '王者荣耀',
        },
        {
            name: '{{ task.operator }}',
            meaning: '任务的操作人',
            examples: 'admin',
        },
        {
            name: '{{ task.start_time }}',
            meaning: '任务开始时间',
            examples: '2020-05-10 20:32:18 (+0800)',
        },
        {
            name: '{{ task.type }}',
            meaning: '任务的类型',
            examples: '快速执行脚本 / 作业任务 / 定时任务 / ...',
        },
        {
            name: '{{ task.url }}',
            meaning: '任务的详情链接',
            examples: 'https://cloud-job.blueking.com/127/crons/...',
        },
    ],
    job: [
        {
            name: '{{ task.step.name }}',
            meaning: '任务当前步骤的名称',
            examples: '这是检查配置文件语法的步骤',
        },
        {
            name: '{{ task.step.type }}',
            meaning: '任务当前步骤的类型',
            examples: '脚本执行 or 文件分发 or 人工确认',
        },
        {
            name: '{{ task.step.total_seq_cnt }}',
            meaning: '任务的步骤总数',
            examples: '12',
        },
        {
            name: '{{ task.step.current_seq_id }}',
            meaning: '任务当前步骤的序号',
            examples: '7',
        },
        {
            name: '{{ task.step.duration }}',
            meaning: '任务当前步骤执行耗时',
            examples: '12.375',
        },
        {
            name: '{{ task.total_duration }}',
            meaning: '任务执行总耗时',
            examples: '65.831',
        },
        {
            name: '{{ task.step.failed_cnt }}',
            meaning: '任务当前步骤执行失败数',
            examples: '83',
        },
        {
            name: '{{ task.step.success_cnt }}',
            meaning: '任务当前步骤执行成功数',
            examples: '146',
        },
        {
            name: '{{ task.step.confirm_info }}',
            meaning: '任务的人工确认描述',
            examples: '请确认以上执行步骤是否执行正常',
        },
        {
            name: '{{ task.step.confirmer }}',
            meaning: '任务的确认步骤的干系人',
            examples: 'admin',
        },
    ],
    cron: [
        {
            name: '{{ task.cron.plan_name }}',
            meaning: '定时关联的执行方案名',
            examples: '这是一个测试的作业执行方案',
        },
        {
            name: '{{ task.cron.plan_id }}',
            meaning: '定时关联的执行方案ID',
            examples: '10000058',
        },
        {
            name: '{{ task.cron.repeat_freq }}',
            meaning: '定时任务的执行策略',
            examples: '单次执行 or 周期执行',
        },
        {
            name: '{{ task.cron.time_set }}',
            meaning: '定时任务的执行时间',
            examples: '* * * * * or 2020-05-12 23:31:00',
        },
        {
            name: '{{ task.cron.notify_time }}',
            meaning: '定时任务提前通知时间',
            examples: '30',
        },
    ],
};
