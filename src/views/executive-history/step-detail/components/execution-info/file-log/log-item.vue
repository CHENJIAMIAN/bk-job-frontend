

<script>
    const statusMap = {
        1: 'waiting',
        2: 'uploading',
        3: 'downloading',
        4: 'finished',
        5: 'failed',
    };

    export default {
        functional: true,
        render (h, context) {
            const { props, listeners, parent } = context;
            const {
                data,
                openMemo,
                renderContentMap,
                isContentLoading,
            } = props;
            const isContentOpen = Boolean(openMemo[data.taskId]);

            const classes = {
                'step-detail-file-log-block': true,
                [statusMap[data.status]]: true,
                toggle: isContentOpen,
            };
            // 异步获取日志的loading状态
            const logContent = renderContentMap[data.taskId] || data.logContent;
            if (isContentLoading && !logContent) {
                classes['content-loading'] = true;
            }
            const renderProgress = () => {
                const wholeProgress = '*******************************************************************************************';
                const process = parseInt(data.progress, 10) / 100;
                return wholeProgress.slice(0, Math.floor(process * wholeProgress.length) || 1);
            };
            const handleToggle = () => {
                listeners['on-toggle'](data.taskId, !isContentOpen);
            };
            return (
            <div class={classes}>
                <div class="log-header" onClick={handleToggle}>
                    <i class="job-icon job-icon-down-small log-toggle" />
                    <span>{'文件名' }：{ data.fileName }</span>
                    <span>{'文件大小' }：{ data.fileSize }</span>
                    <span>{'状态'}：<span class="status">{ data.statusDesc }</span></span>
                    <span>{'源服务器 IP' }：{ data.srcIp }</span>
                    <span>{'速率' }：{ data.speed }</span>
                    <span>{'进度' }：{ data.progress }</span>
                </div>
                {
                    isContentOpen && (
                        <div class="log-body">
                            <div class="log-content">{ logContent }</div>
                            <div class="log-process">{ renderProgress() }</div>
                        </div>
                    )
                }
            </div>
            );
        },
    };
</script>
<style lang='postcss'>
    @keyframes file-loading-ani {
        0% {
            content: "*";
        }

        30% {
            content: "**";
        }

        60% {
            content: "***";
        }
    }

    .step-detail-file-log-block {
        padding-left: 48px;
        margin-top: 10px;
        font-size: 13px;
        line-height: 18px;
        color: #dcdee5;

        &.toggle {
            .log-body {
                display: block;
            }

            .log-toggle {
                transform: rotateZ(0);
            }
        }

        &.waiting,
        &.uploading,
        &.downloading &.content-loading {
            .log-process {
                &::after {
                    display: inline-block;
                    content: "*";
                    animation: file-loading-ani 2s linear infinite;
                }
            }
        }

        &.waiting {
            .status {
                color: #dcdee5;
            }
        }

        &.uploading,
        &.downloading {
            .status {
                color: #3a84ff;
            }
        }

        &.failed {
            .status {
                color: #ea3636;
            }
        }

        &.finished {
            .status {
                color: #3fc06d;
            }
        }

        .log-header {
            position: relative;
            line-height: 24px;
            white-space: nowrap;
            cursor: pointer;

            & > * {
                margin-right: 40px;
            }
        }

        .log-toggle {
            position: absolute;
            top: 0;
            left: -34px;
            font-size: 24px;
            transform: rotateZ(-90deg);
            transition: transform 0.15s;
        }

        .log-body {
            display: none;
        }

        .log-content {
            margin-top: 2px;
            line-height: 22px;
            color: #979ba5;
            white-space: pre;
        }
    }
</style>
