

export default {
    created () {
        this.stopPollingRun = false;
        this._pollingTaskQueue = []; // eslint-disable-line no-underscore-dangle
        this._stepTimer = [ // eslint-disable-line no-underscore-dangle
            1000, 1000, 1000, 1000, 2000, 2000, 2000,
        ];
        this.startPollingQueueRun();
    },
    beforeDestroy () {
        this.stopPollingQueueRun();
    },
    methods: {
        $pollingQueueRun (task) {
            this._pollingTaskQueue = [ // eslint-disable-line no-underscore-dangle
                task,
            ];
        },
        startPollingQueueRun () {
            if (this.stopPollingRun) {
                return;
            }
            let timer = 1000;
            if (this._pollingTaskQueue.length > 0) { // eslint-disable-line no-underscore-dangle
                const nextStep = this._pollingTaskQueue.shift(); // eslint-disable-line no-underscore-dangle
                nextStep();
                timer = this._stepTimer.shift(); // eslint-disable-line no-underscore-dangle
            }
            if (!timer) {
                timer = 3000;
            }
            setTimeout(() => {
                this.startPollingQueueRun();
            }, timer);
        },
        stopPollingQueueRun () {
            this.stopPollingRun = true;
            this._pollingTaskQueue = []; // eslint-disable-line no-underscore-dangle
        },
    },
};
