<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs'
import { Lunar } from 'lunar-javascript'
// 搜索引擎类型数据
import { searchTypeData } from '@/api/searchTypeData.js'

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


// 选择的搜索引擎
const activeSearchType = ref({})
// 获取初始搜索引擎
const getInitialSearchType = () => {
    searchTypeData.map(item => {
        if (item.name == '必应') {
            activeSearchType.value = item
        }
    })
}
// 搜索内容
const searchValue = ref('')
const search = () => {
    window.location.href = `${activeSearchType.value.link}${searchValue.value}`
}




// 抽屉的展开/收起状态
const drawerState = ref(false)



console.log(searchTypeData);

// 控制输入框背景色
const isInputFocused = ref(false)
const onFocus = () => {
    isInputFocused.value = true;
}
const onBlur = () => {
    isInputFocused.value = false;
}

onMounted(() => {
    getTime() // 获取日期
    getInitialSearchType() // 初始化搜索引擎
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
        <div class="search-box"
            :style="{ backgroundColor: isInputFocused ? 'rgba(255, 255, 255, 0.7)' : '' }">
            <div class="search-logo" @click="drawerState = !drawerState">
                <img class="img" :src="activeSearchType.logo" alt="">
                <div class="arrows">
                    <img src="@/assets/icon/down.svg" alt="">
                </div>
            </div>
            <div class="search-input">
                <input type="text" placeholder="输入搜索内容" v-model="searchValue" @keyup.enter.native="search"
                    @focus="onFocus" @blur="onBlur" name="" />
            </div>
            <div class="search-button" @click="search">
                <img src="@/assets/icon/search.svg" alt="">
            </div>
            <div class="drawer-box" :style="[{ transform: (drawerState ? 'scaleY(1)' : 'scaleY(0)') }]">
                <div class="li" v-for="(item, index) in searchTypeData" :key="index" :title="item.name"
                    @click="activeSearchType = item">
                    <div class="logo">
                        <img :src="item.logo" alt="">
                    </div>
                    <div class="name">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.app {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .time-box {
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-shadow: 0 2px 6px rgb(0 0 0 / 16%);
        margin-top: -380px;

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
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(18px);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 3px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        transition: all 0.2s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.7);
        }

        .search-logo {
            width: 50px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            // background-color: rgba(255, 255, 255, 0.5);
            border-radius: 23px 0 0 23px;
            cursor: pointer;

            img {
                width: 20px;
                height: 20px;
            }

            .arrows {
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

        .search-input {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            padding: 0 10px;
            // background-color: rgba(255, 255, 255, 0.5);

            input {
                outline: none;
                border: none;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                color: #222;
                font-size: 14px;
                font-family: "HarmonyOS_Sans_Regular";
                background-color: transparent;
                padding: 0 0 0 5px;
                z-index: 9999;

                &::placeholder {
                    color: rgba(0, 0, 0, 0.3);
                    padding: 0 0 0 3px;
                }
            }
        }

        .search-button {
            width: 50px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            // background-color: rgba(255, 255, 255, 0.5);
            transition: 0.2s;
            border-radius: 0 23px 23px 0;
            cursor: pointer;

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

        .drawer-box {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: auto;
            background-color: #fefefe;
            border-radius: 23px;
            padding: 10px;
            box-sizing: border-box;
            margin: 6px 0;
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: 72px;
            background-color: rgba(255, 255, 255, 0.8);
            transition: all 0.2s;

            .li {
                width: 100%;
                height: 72px;
                padding: 5px 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                border-radius: 15px;
                transition: background 0.2s;
                cursor: pointer;
                box-sizing: border-box;

                &:hover {
                    background-color: #f1f1f2;
                }

                .logo {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px 3px #0000000d;

                    img {
                        width: 20px;
                        height: 20px;
                    }
                }

                .name {
                    width: 55px;
                    text-align: center;
                    font-size: 12px;
                    color: #222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>