<template>
  <div>

    <!-- new html -->
    <div id="main">

      <div class="main-left">
        <div class="top">
          <div class="top-header">
            <a href="http://localhost:8080/#/?tab=all" class="zhu">主页</a>
            <span class="gang">/</span>
          </div>
          <div class="user">
            <div class="userName">
              <img :src="userDateList.avatar_url" alt="" />
              <span class="name">{{userDateList.loginname}}</span>
            </div>
            <p class="integral">{{userDateList.score}}积分</p>

            <router-link :to="'/collector/'+userDateList.loginname" class="collect" v-if="collectorNum != 0">{{collectorNum}}个话题收藏</router-link>

            <div v-if="false">
              <p>网址</p>
              <p>住址</p>
              <p>github</p>
              <p>微博</p>
            </div>
            <p class="register">注册时间 {{userDateList.create_at | getLastReplyTime}}</p>
          </div>
        </div>

        <!-- 最近创建 -->
        <div class="topic">
          <div class="topic-header">
            <span class="title">最近创建的话题</span>
          </div>
          <div class="list">

            <div class="content" v-for="(item,index) in userDateList.recent_topics" v-if="index <= 4" :key="index">
              <div class="item">
                <div class="item-content">
                  <router-link :to="'/user/'+item.author.loginname">
                    <img :src="item.author.avatar_url" alt="" />
                  </router-link>
                  <span class="textNum">
                    <span class="num">94</span>
                    <span class="xie">/</span>
                    <span class="numAll">15647</span>
                  </span>
                  <span class="ding">置顶</span>

                  <router-link :to="'/info/'+item.id" class="aa">
                    {{item.title}}
                  </router-link>

                  <div class="fang">

                    <span>{{item.last_reply_at | getLastReplyTime}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="more">
            <a href="javascript:#;">查看更多>></a>
          </div>
        </div>

        <!-- 最近参与 -->
        <div class="topic">
          <div class="topic-header">
            <span class="title">最近参与的话题</span>
          </div>
          <div class="list">

            <div class="content" v-for="(item,index) in userDateList.recent_replies" :key="index">
              <div class="item">
                <div class="item-content">
                  <router-link :to="'/user/'+item.author.loginname">
                    <img :src="item.author.avatar_url" alt="" />
                  </router-link>
                  <span class="textNum">
                    <span class="num">94</span>
                    <span class="xie">/</span>
                    <span class="numAll">15647</span>
                  </span>
                  <span class="ding">置顶</span>

                  <router-link :to="'/info/'+item.id" class="aa">
                    {{item.title}}
                  </router-link>

                  <div class="fang">

                    <span>{{item.last_reply_at | getLastReplyTime}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="more">
            <a href="javascript:#;">查看更多>></a>
          </div>
        </div>

      </div>

      <div class="main-right">

        <!-- 个人信息 -->
        <div class="user" v-if="userDateList.avatar_url">
          <div class="tou">个人信息</div>
          <div class="user-content">
            <img :src="userDateList.avatar_url" alt="" />
            <span>{{userDateList.loginname}}</span>
            <p class="jifen">积分：{{userDateList.score}}</p>
            <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
          </div>
        </div>

        <div class="banner">
          <a href="https://0x7.me/UDyj"><img src="../../../static/image/banner3.jpg" alt=""></a>
          <a href="https://www.aliyun.com/product/nodejs?ref=cnode"><img src="../../../static/image/banner4.jpg" alt=""></a>
          <a href="https://render.alipay.com/p/s/taobaonpm_click/image_click_25"><img src="../../../static/image/banner1.jpg" alt=""></a>
          <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&utm_medium=content_pic_pc_540_130&utm_campaign=huodong&utm_content=gift&ytag=cnodejs"><img src="../../../static/image/banner2.jpg" alt=""></a>

        </div>

        <div class="banner">
          <img src="../../../static/image/she1.png" alt="">
          <img src="../../../static/image/she2.png" alt="">
          <img src="../../../static/image/she3.png" alt="">
          <img src="../../../static/image/she4.png" alt="">
        </div>

        <div class="wuren">
          <div class="hua">客户端二维码</div>
          <div class="content">
            <img src="../../../static/image/FtG0YVgQ6iginiLpf9W4_ShjiLfU.png" alt="" />
            <a href="javascript:#">客户端源码地址</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userDateList: [],
      collectorNum: ""
    };
  },
  created() {
    let userName = this.$route.params.userName;
    //用户信息
    axios.get("https://cnodejs.org/api/v1/user/" + userName).then(res => {
      let { data } = res.data;
      this.userDateList = data;
    });

    //收藏信息
    axios
      .get("http://cnodejs.org/api/v1/topic_collect/" + userName)
      .then(res => {
        this.collectorNum = res.data.data.length;
      });
  },
  filters: {
    getLastReplyTime(ele) {
      var original = new Date(ele);
      var now = new Date();
      var tdoa = now - original;
      var second = tdoa / 1000;
      var minute = second / 60;
      var hour = minute / 60;

      if (second < 60) {
        return parseInt(second) + "秒前";
      } else if (minute < 60) {
        return parseInt(minute) + "分钟前";
      } else if (hour < 24) {
        return parseInt(hour) + "小时前";
      } else if (hour < 168) {
        return parseInt(hour / 24) + "天前";
      } else if (hour < 720) {
        return parseInt(hour / 24 / 7) + "周前";
      } else if (parseInt(hour / 24) < 365) {
        return parseInt(hour / 24 / 30) + "个月前";
      } else {
        return parseInt(hour / 24 / 30 / 12) + "年前";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#aa::before {
  content: " \f09b ";
}
a {
  text-decoration: none;
}

.top {
  .top-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 8px 10px;
    background: #f6f6f6;
    .zhu {
      font-weight: bolder;
      font-size: 13px;
      color: #80bd01;
    }
    .gang {
      font-size: 13px;
      color: #cfcfd8;
    }
    border-bottom: 1px solid #e5e5e5;
  }
  .user {
    padding: 10px 10px 20px 10px;
    background: #fff;
    .userName {
      img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 6px;
      }
      .name {
        color: #969da3;
        font-size: 13px;
      }
    }
    .integral {
      color: #333;
      font-size: 14px;
      margin-top: 10px;
    }
    .collect {
      color: #778087;
      font-size: 14px;
      margin-top: 10px;
    }
    .register {
      color: #999999;
      font-size: 15px;
      margin-top: 10px;
    }
  }
}

.topic {
  margin-top: 13px;
  .topic-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #f6f6f6;
    border-bottom: 1px solid #f0f0f0;
    padding: 8px 10px;
  }
  .title {
    color: #444444;
    font-size: 15px;
  }
  .more {
    overflow: hidden;

    padding: 8px 10px;
    margin-top: -10px;
    background: #fff;
    a {
      color: #666666;
      font-size: 14px;
    }
  }
  .list {
    .content {
      .item {
        background: #fff;
        padding: 10px 0 10px 10px;
        .item-content {
          position: relative;
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
          .textNum {
            position: absolute;
            left: 4%;
            top: 12%;
            display: inline-block;
            width: 70px;
            height: 24px;
            text-align: center;
            span {
              padding: 0;
              font-size: 10px;
              // letter-spacing: -1px;
              text-align: center;
              letter-spacing: -1.5px;
            }
            .num {
              color: #9e78c0;
            }
            .xie {
              color: #b06d6e;
            }
            .numAll {
              color: #b4b4b4;
            }
          }
          .ding {
            position: absolute;
            top: 22%;
            left: 12.8%;
            padding: 2px 4px;
            background: #80bd01;
            display: inline-block;
            color: white;
            border-radius: 3px;
            font-size: 12px;
          }
          .wen,
          .fen {
            position: absolute;
            top: 22%;
            left: 12.8%;
            background: #e5e5e5;
            color: #999999;
            padding: 2px 4px;
            display: inline-block;
            border-radius: 3px;
            font-size: 12px;
          }
          .aa {
            position: absolute;
            top: 22%;
            left: 18%;
            width: 66%;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
            font-size: 1rem;
          }
          .aa:hover {
            display: inline-block;
            text-decoration: underline;
          }
          .fang {
            cursor: pointer;
            position: absolute;
            right: 3%;
            bottom: 30%;
            text-align: right;
            img {
              width: 18px;
              height: 18px;
            }
            span {
              text-indent: 5em;
              font-size: 12px;
              color: #778087;
            }
          }
        }
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
}
@media (max-width: 979px) {
  .content {
    .item {
      .item-content {
        .textNum {
          top: 70%;
          left: 7.5%;
        }
        .wen,
        .fen,
        .ding {
          left: 5%;
        }
        .aa {
          font-size: 14px;
          left: 9.5%;
        }
        .fimg {
          display: none;
        }
      }
    }
  }
}
@media (max-width: 414px) {
  .content {
    .item {
      .item-content {
        .textNum {
          bottom: -40%;
          left: 12.5%;
        }
        .wen,
        .fen,
        .ding {
          left: 10%;
        }
        .aa {
          width: 60%;
          font-size: 14px;
          left: 18.8%;
        }
        .fimg {
          display: none;
        }
      }
    }
  }
}

/* new style */
#main {
  display: flex;
  justify-content: space-between;
  background: #e1e1e1;
  padding: 15px 0;
  .main-left {
    margin-left: 5%;
    flex: 0 0 66.8%;
    overflow: hidden;
  }
  .main-right {
    flex: 0 0 20.7%;
    margin-left: 1.5%;
    margin-right: 6.1%;
    font-size: 13px;

    .deng {
      color: #333333;
      padding: 10px;
      background: #fff;

      p {
        font-size: 15px;
        margin-bottom: 22px;
      }
      a {
        text-decoration: none;
        color: #778087;
      }
      a:hover {
        text-decoration: underline;
      }
      button {
        background: #5bc0de;
        color: white;
        border: none;
        outline: none;
        border-radius: 3px;
        width: 151px;
        height: 34px;
        margin-top: 5px;
        cursor: pointer;
      }
    }

    .user {
      color: #333333;
      background: #fff;
      .tou {
        padding: 8px;
        background: #f6f6f6;
      }
      .user-content {
        padding: 10px;
        img {
          width: 48px;
          height: 48px;
          vertical-align: middle;
          margin-right: 10px;
        }
        span {
          color: #778087;
          font-size: 15px;
        }
        p {
          margin-top: -1px;
          padding: 10px;
          background: #f6f6f6;
          font-style: italic;
          font-size: 13px;
          font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
            "Hiragino Sans GB", STHeiti, sans-serif !important;
          word-break: break-word;
          color: #333;
          background: #fff;
        }
        .jifen {
          font-style: normal;
          padding-bottom: 0;
          font-family: Arial, Helvetica, sans-serif;
        }
      }
    }

    .banner {
      background: #fff;
      margin-top: 13px;
      padding: 10px;
      a {
        img {
          width: 100%;
          margin-bottom: 6px;
          cursor: pointer;
        }
      }
      a:nth-last-child(1) {
        img {
          margin-bottom: 0;
        }
      }
    }
    .banner:nth-child(3) {
      img {
        width: 150px;
        cursor: pointer;
      }
    }
    .wuren {
      background: #fff;
      margin-top: 13px;
      color: #333;
      font-size: 13px;
      .hua {
        padding: 10px;
        background: #f6f6f6;
      }
      .content {
        padding: 10px;
        p {
          margin-bottom: 10px;
          color: #778087;
          font-size: 13px;
          cursor: pointer;
        }
        a {
          color: #778087;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
    .wuren:nth-last-child(1) {
      img {
        width: 200px;
        height: 200px;
        margin: 0px 30px;
      }
      .content {
        text-align: center;
      }
    }
  }
}
@media (max-width: 979px) {
  #main {
    padding: 15px 3px;
  }
  #main .main-left {
    margin-left: 0;
    flex: 0 0 100%;
    border-top-left-radius: 5px;
    .menu {
      border-top-left-radius: 5px;
      border-top-right-radius: 0px;
    }
    .content {
      .item {
        .item-content {
          .textNum {
            top: 70%;
            left: 7.5%;
          }
          .wen,
          .fen,
          .ding {
            left: 5%;
          }
          .aa {
            font-size: 14px;
            left: 9.5%;
          }
          .fimg {
            display: none;
          }
        }
      }
    }
  }
  #main .main-right {
    display: none;
  }
}
@media (max-width: 414px) {
  #main .main-left {
    margin-left: 0;
    flex: 0 0 100%;
    border-top-left-radius: 5px;
    .content {
      .item {
        .item-content {
          .textNum {
            bottom: -40%;
            left: 12.5%;
          }
          .ding {
            left: 10%;
          }
          .aa {
            width: 60%;
            font-size: 14px;
            left: 18.8%;
          }
          .fimg {
            display: none;
          }
        }
      }
    }
  }
}
</style>
