<template>
  <div class="weather-box">
    <a-popover placement="topLeft" trigger="hover" overlayClassName="kk">
      <template slot="content">
         <transition name="plus-icon">
      <div class="container">
        <!-- 左边部分 -->
        <div class="weather-side">
          <!-- 渐变 -->
          <div class="gradient"></div>
          <div class="date-container">
            <h2 class="date-dayname">{{ da.day }}</h2>
            <span class="date-day">{{ da.year }}年{{ da.date }}</span>
            <!-- icon图标 -->
            <span class="iconfont" id="location">&#xe60f;{{ da.city }}</span>
          </div>
          <div
            class="weather-conteiner"
            v-for="(weather, index) in today"
            :key="index"
          >
            <!-- 天气图标 -->
            <span
              class="iconfont"
              id="weather-1"
              v-html="weathericon(weather.weather)"
            ></span>
            <div class="weather-temp">{{ weather.temp }}</div>
            <div class="weather-desc">{{ weather.weather }}</div>
          </div>
        </div>

        <!-- 右边部分 -->
        <div class="info-side">
          <div class="today-info-container">
            <div class="today-info" v-for="(wind, index) in today" :key="index">
              <!-- PM -->
              <div class="pm clear">
                <span class="title">PM2.5</span>
                <span class="value">暂无</span>
              </div>
              <!-- 湿度 -->
              <div class="humidity clear">
                <span class="title">湿度</span>
                <span class="value">暂无</span>
              </div>
              <!-- 风速 -->
              <div class="wind clear">
                <span class="title">风速</span>
                <span class="value">{{ wind.wind }} </span>
              </div>
            </div>
          </div>
          <div class="week-container">
            <ul
              class="week-list"
              :style="{ transform: `translate3d(${x}px, 0px, 0px)` }"
            >
              <li v-for="(item, index) in future" :key="index">
                <!-- 天气图标 -->
                <span
                  class="iconfont"
                  v-html="weathericon(item.weather)"
                ></span>
                <span class="day-name">{{ item.date }}</span>
                <span class="day-temp">{{ item.temp }}</span>
                <span class="day-wea">{{ item.weather }}</span>
              </li>
            </ul>
          </div>
          <div>
            <span
              class="iconfont but-left"
              @click="but1"
              onselectstart="return false"
              >&#xe620;</span
            >
            <span
              class="iconfont but-right"
              @click="but2"
              onselectstart="return false"
              >&#xe621;</span
            >
          </div>
        </div>
      </div>
    </transition>
      </template>
      <div
        class="tag-list"
        v-for="(tags, index) in today"
        :key="index"
        @mouseenter="flag = true"
      >
        <span class="tag-city">{{ da.city }}</span>
        <span class="iconfont" v-html="weathericon(tags.weather)"></span>
        <span class="tags-temp">{{ tags.temp }}</span>
      </div>
    </a-popover>

  
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: -35.5,
      today: new Array(),
      future: {},
      da: {},
      icon: "",
      opp: "",
      flag: false,
    };
  },
  methods: {
    but1() {
      if (this.x <= -117.5) this.x += 82;
    },
    but2() {
      if (this.x >= -855.5) this.x -= 82;
    },
    Tmap() {},
    cityid() {},
    weathericon(t) {
      switch (t) {
        case "晴":
          return "&#xe61f;";
        case "多云":
          return "&#xe624;";
        case "阴转多云":
          return "&#xe619;";
        case "多云转阵雨":
          return "&#xe60e;";
        case "阵雨转小雨":
          return "&#xe60e;";
        case "小雨":
          return "&#xe622;";
        case "小雨转雨":
          return "&#xe622;";
        case "阴转雨":
          return "&#xe622;";
        case "雨":
          return "&#xe6f6;";
        case "雨转多云":
          return "&#xe622;";
        default:
          return "&#xe624;";
      }
    },
    async fetch() {
      const data = await this.$jsonp(
        "https://query.asilu.com/weather/weather/",
        {
          id: 101250301,
        }
      );
      this.today.push(data.list[0]);
      this.future = data.list;
      this.da.city = data.city;
      this.da.date = data.date;
      this.da.day = "星期" + "日一二三四五六".charAt(new Date().getDay());
      this.da.year = new Date().getFullYear();
    },
  },
  created() {
    this.fetch();
    this.Tmap();
    this.cityid();
  },
};
</script>

<style scoped>
@import "../plugins/css/weather.css";
</style>
