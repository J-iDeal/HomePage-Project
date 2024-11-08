<script setup>

</script>
<template>
    <div class="app">
        <div class="left">
            <!-- <img src="@/assets/logo/index.svg" alt=""> -->
        </div>
        <div class="right">
            <div class="img-box">
                <img src="@/assets/icon/set.svg" alt="">
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.app {
    // border: 1px solid #ff0000;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    box-sizing: border-box;
    padding: 0 20px 0 35px;
    overflow: hidden;

    .left {
        height: 100%;

        img {
            height: 100%;
            transform: scale(1.6);
        }
    }

    .right {
        height: 100%;
        margin: 0px 4px 0px 32px;
        display: flex;
        align-items: center;

        .img-box {
            // border: 1px solid #ff0000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                backdrop-filter: blur(6px);
                background-color: rgba(0, 0, 0, 0.1);

                img {
                    rotate: (180deg);
                }
            }

            img {
                width: 26px;
                height: 26px;
                transition: all 0.6s;
            }
        }
    }
}
</style>