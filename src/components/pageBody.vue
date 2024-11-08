<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs'
import { Lunar } from 'lunar-javascript'


// 搜索内容
const searchValue = ref(' ')
const search = () => {
    window.location.href = `https://www.google.com/search?q=${searchValue.value}`
}



// 日期
const timeData = ref({
    month: null, // 月
    day: null, // 日
    week: null, // 周
    hour: null, // 小时
    minute: null, // 分钟
    lunarMonth: null, // 农历月
    lunarDay: null, // 农历日
})
// 获取今天星期几
const getWeek = () => {
    let datas = dayjs().day();
    let week = ['日', '一', '二', '三', '四', '五', '六'];
    return '星期' + week[datas];
}
// 获取日期
const getTime = () => {
    let lunar = Lunar.fromDate(new Date());
    timeData.value.month = dayjs().month() + 1 >= 10 ? dayjs().month() + 1 : `0${dayjs().month() + 1}`
    timeData.value.day = dayjs().date() >= 10 ? dayjs().date() : `0${dayjs().date()}`
    timeData.value.week = getWeek()
    timeData.value.hour = dayjs().hour() >= 10 ? dayjs().hour() : `0${dayjs().hour()}`
    timeData.value.minute = dayjs().minute() >= 10 ? dayjs().minute() : `0${dayjs().minute()}`
    timeData.value.lunarMonth = lunar.getMonthInChinese() // 农历月
    timeData.value.lunarDay = lunar.getDayInChinese() // 农历日
}



onMounted(() => {
    getTime() // 获取日期
})
</script>
<template>
    <div class="app">
        <div class="time-box">
            <div class="time">
                {{ timeData.hour }}:{{ timeData.minute }}
            </div>
            <div class="date">
                {{ timeData.month }}月{{ timeData.day }}日 {{ timeData.week }} {{ timeData.lunarMonth }}月{{
                    timeData.lunarDay }}
            </div>
        </div>
        <div class="search-box">
            <div class="logo">
                <img class="img" src="https://files.codelife.cc/itab/search/google.svg" alt="">
                <div class="arrows">
                    <img src="@/assets/icon/down.svg" alt="">
                </div>
            </div>
            <div class="input">
                <input type="text" placeholder="输入搜索内容" v-model="searchValue" @keyup.enter.native="search" name="" />
            </div>
            <div class="search" @click="search">
                <img src="@/assets/icon/search.svg" alt="">
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.app {
    // border: 1px solid blue;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .time-box {
        // border: 1px solid #ff0000;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-shadow: 0 2px 6px rgb(0 0 0 / 16%);

        .time {
            font-size: 70px;
            font-family: "HarmonyOS_Sans_Regular";
        }

        .date {
            font-size: 14px;
            font-family: "HarmonyOS_Sans_Light";
            margin-top: -10px;
            opacity: 0.88;
        }
    }

    .search-box {
        width: 600px;
        height: 46px;
        z-index: 1;
        border-radius: 23px;
        backdrop-filter: blur(18px);
        box-shadow: 0 0 10px 3px #0000001a;
        background-color: rgba(255, 255, 255, 0.7);
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;

        .logo {
            width: 50px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            backdrop-filter: blur(18px);
            background-color: rgba(255, 255, 255, 0.7);
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }

            img {
                width: 20px;
                height: 20px;
            }

            .arrows {
                // border: 1px solid #ff0000;
                position: absolute;
                width: 14px;
                height: 14px;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 14px;
                    height: 14px;
                }
            }
        }

        .input {
            // border: 1px solid #ff0000;
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            padding: 0 10px;
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(18px);

            input {
                outline: none;
                border: none;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                color: #222;
                font-size: 14px;
                font-family: "HarmonyOS_Sans_Regular";
                background-color: rgba(255, 255, 255, 0.7);
                padding: 0 0 0 5px;

                &::placeholder {
                    color: rgba(0, 0, 0, 0.3);
                    padding: 0 0 0 3px;
                }
            }
        }

        .search {
            width: 50px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(18px);
            background-color: rgba(255, 255, 255, 0.7);
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }

            &:active {
                img {
                    transform: scale(0.92);
                }
            }

            img {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>