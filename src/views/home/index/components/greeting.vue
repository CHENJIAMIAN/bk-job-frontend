
<template>
    <div class="greeting-box time-tips">
        {{ setAnalysisGreeting() }}
    </div>
</template>
<script>
   
    export default {
        methods: {
            setAnalysisGreeting () {
                const txtOne = (currentHour, currentMin) => {
                    if (currentHour >= 1 && currentHour < 4) {
                        return `home.现在是凌晨 {HH:MM}！切忌劳累过度，影响身体还容易误操作，赶紧休息吧..., { 'HH:MM': ${currentHour}:${currentMin} }`;
                    }
                    return false;
                };
                const txtTwo = (currentHour, currentMin) => {
                    if (currentHour === 4) {
                        return '感谢你来见证凌晨4点的作业平台，Mamba Forever！曼巴精神！共勉！';
                    }
                    return false;
                };
                const txtThree = (currentHour, currentMin) => {
                    if (currentHour >= 5 && currentHour < 7) {
                        return `home.一年之计在于春、一日之计在于晨！早起的鸟儿有虫吃~ 伙计，加油！', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };
                const txtFour = (currentHour, currentMin) => {
                    if ((currentHour >= 7 && currentHour <= 10) || (currentHour === 11 && currentMin < 40)) {
                        return `home.上午好！专注工作之时别忘了多饮水，促进身体新陈代谢，有益身体健康噢~', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };
                const txtFive = (currentHour, currentMin) => {
                    if ((currentHour === 11 && currentMin >= 40) || (currentHour === 12 && currentMin < 30)) {
                        return '午饭时间到了，肠胃很重要！记得按时就餐喔~';
                    }
                    return false;
                };
                const txtSix = (currentHour, currentMin) => {
                    if ((currentHour === 12 && currentMin >= 30) || currentHour === 13) {
                        return '午饭过后，闲庭几步、小憩片刻，下午办公精神更佳！';
                    }
                    return false;
                };
                const txtSeven = (currentHour, currentMin) => {
                    if (currentHour >= 14 && currentHour < 18) {
                        return `home.下午好！预防「久坐成疾」，记得多起来走动走动，松松肩颈，放松片刻。', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };
                const txtEight = (currentHour, currentMin) => {
                    if (currentHour === 18 || (currentHour === 19 && currentMin < 30)) {
                        return `home.晚上好！夜间人体内消化能力偏弱，饮食切忌太饱，健康绿色膳食为宜。', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };
                const txtNight = (currentHour, currentMin) => {
                    if ((currentHour === 19 && currentMin >= 30) || (currentHour >= 20 && currentHour < 23)) {
                        return `home.晚上好！少加班，多锻炼噢~ 只要每天做好规划，不怕事情做不好！', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };
                const txtTen = (currentHour, currentMin) => {
                    if (currentHour >= 23 || currentHour < 1) {
                        return `home.现在是晚上 {HH:MM}，夜深了... 为了自己的身体健康，请早点休息，保持足够睡眠！', { 'HH:MM': ${currentHour}:${currentMin} })`;
                    }
                    return false;
                };

                const greetingMap = {
                    txtOne,
                    txtTwo,
                    txtThree,
                    txtFour,
                    txtFive,
                    txtSix,
                    txtSeven,
                    txtEight,
                    txtNight,
                    txtTen,
                };
                const currentHour = new Date().getHours();
                const currentMin = new Date().getMinutes() > 10 ? new Date().getMinutes() : `0${new Date().getMinutes()}`;
                for (const greet in greetingMap) {
                    const curTxt = greetingMap[greet](currentHour, currentMin);
                    if (curTxt) {
                        return curTxt;
                    }
                }
                return '--';
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .time-tips {
        max-height: 40px;
        min-height: 20px;
        margin-top: 15px;
        margin-bottom: 15px;
        overflow: hidden;
    }
</style>
