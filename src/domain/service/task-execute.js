

/* eslint-disable no-param-reassign */
import TaskExecuteSource from '../source/task-execute';
import TaskInstanceModel from '@model/execution/task-instance';
import StepExecutionResultModel from '@model/execution/step-execution-result';
import TaskExecutionResultModel from '@model/execution/task-execution-result';
import TaskInstanceDetailModel from '@model/execution/task-instance-detail';
import OperationLogModel from '@model/execution/operation-log';
import GlobalVariableModel from '@model/task/global-variable';

export default {
    taskExecution (params) {
        return TaskExecuteSource.taskExecution(params)
            .then(({ data }) => data);
    },
    executeScript (params) {
        return TaskExecuteSource.executeScript(params)
            .then(({ data }) => data);
    },
    pushFile (params) {
        return TaskExecuteSource.pushFile(params)
            .then(({ data }) => data);
    },
    redoTask (params) {
        return TaskExecuteSource.updateRedoTask(params)
            .then(({ data }) => data);
    },
    fetchExecutionHistoryList (params) {
        return TaskExecuteSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(item => Object.freeze(new TaskInstanceModel(item)));
                return data;
            });
    },
    fetchTaskExecutionResult (params, payload) {
        return TaskExecuteSource.getOneTaskById(params, payload)
            .then(({ data }) => Object.freeze(new TaskExecutionResultModel(data)));
    },
    fetchTaskInstance (params) {
        return TaskExecuteSource.getOneTaskInstanceById(params)
            .then(({ data }) => new TaskInstanceDetailModel(data));
    },
    fetchStepExecutionResult (params, payload) {
        return TaskExecuteSource.getOneStep(params, payload)
            .then(({ data }) => new StepExecutionResultModel(data));
    },
    fetchLogContentOfIp (params) {
        return TaskExecuteSource.getLogByIp(params)
            .then(({ data }) => data);
    },
    fetchFileLogOfIp (params = {}) {
        return TaskExecuteSource.getFileLogByIP(params)
            .then(({ data }) => data);
    },
    fetchFileLogOfFile (params = {}) {
        return TaskExecuteSource.getFileLogByFileId(params)
            .then(({ data }) => data);
    },
    fetchStepInstance (params = {}) {
        return TaskExecuteSource.getOneStepInstance(params)
            .then(({ data }) => data);
    },
    fetchStepInstanceParam (params) {
        return TaskExecuteSource.getAllStepInstanceParam(params)
            .then(({ data }) => data);
    },
    getUploadFileContent (params, payload) {
        return TaskExecuteSource.uploadFileGetContent(params, payload)
            .then(({ data }) => Object.freeze(data));
    },
    updateTaskExecutionStepOperate (params) {
        return TaskExecuteSource.taskExecutionStepOperate(params)
            .then(({ data }) => Object.freeze(data));
    },
    updateTaskExecutionStepOperateTerminate (params) {
        return TaskExecuteSource.terminateTaskById(params)
            .then(({ data }) => data);
    },
    fetchTaskOperationLog (params) {
        return TaskExecuteSource.getTaskOperationLog(params)
            .then(({ data }) => Object.freeze(data.map(item => new OperationLogModel(item))));
    },
    fetchStepVariables (params) {
        return TaskExecuteSource.getStepVariables(params)
            .then(({ data }) => data.map(_ => new GlobalVariableModel(_)));
    },
    fetchLogFilePackageResult (params) {
        return TaskExecuteSource.getLogFilePackageInfo(params)
            .then(({ data }) => data);
    },
    fetchStepExecutionLogFile (params) {
        return TaskExecuteSource.getLogFile(params);
    },
    fetchTaskInstanceFromAllApp (params) {
        return TaskExecuteSource.getTaskInstanceFromAllApp(params)
            .then(({ data }) => new TaskInstanceModel(data));
    },
    fetchStepGroupHost (params) {
        return TaskExecuteSource.getStepGroupHost(params)
            .then(({ data }) => data);
    },
    fetchStepExecutionHistory (params) {
        return TaskExecuteSource.getStepExecutionHistory(params)
            .then(({ data }) => data);
    },
};
