

export default class EntryTask {
    preQueue = [];
    postQueue = [];
    context = {};
    add (preTask, postTask) {
        this.preQueue.push(preTask);
        this.postQueue.push(postTask);
    }

    start () {
        const queue = [];
        this.preQueue.forEach((task) => {
            if (typeof task === 'function') {
                queue.push(task(this.context));
            }
        });
        Promise.all(queue)
            .then(() => {
                while (this.postQueue.length > 0) {
                    const task = this.postQueue.pop();
                    if (typeof task === 'function') {
                        task(this.context);
                    }
                }
            });
    }
}
