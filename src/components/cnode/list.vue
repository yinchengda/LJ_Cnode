<template>
  <div>

    <div id="main">

      <div class="main-left">

        <div class="menu">
          <router-link to="/?tab=all" exact>全部</router-link>
          <router-link to="/?tab=good" exact>精华</router-link>
          <router-link to="/?tab=share" exact>分享</router-link>
          <router-link to="/?tab=ask" exact>问答</router-link>
          <router-link to="/?tab=job" exact>招聘</router-link>
          <router-link to="/?tab=dev" exact>客户端测试</router-link>
        </div>

        <div class="content">
          <div class="item" v-for="(item,index) in (data,itemList)" :key="index">
            <div class="item-content">
              <!-- 用户详情跳转 -->
              <router-link :to="'/user/'+item.author.loginname">
                <img :src="item.author.avatar_url" alt="" />
              </router-link>
              <!-- 留言 / 访问 数 -->
              <span class="textNum">
                <span class="num">{{item.reply_count}}</span>
                <span class="xie">/</span>
                <span class="numAll">{{item.visit_count}}</span>
              </span>
              <!-- 判断帖子类型 -->
              <span class="ding" v-if="item.top">置顶</span>
              <span v-show="!item.top && item.good" class="ding">精华</span>
              <span v-show="!item.top &&!item.good &&item.tab == 'ask'" class="wen">问答</span>
              <span v-show="!item.top &&!item.good &&item.tab == 'share'" class="fen">分享</span>

              <!-- 跳转详情 -->
              <router-link :to="'/info/'+item.id" class="aa">
                {{item.title}}
              </router-link>

              <!-- 最后评论时间 -->
              <div class="fang">
                <span>{{item.last_reply_at|getLastReplyTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-right">

        <!-- 登录 -->
        <div class="deng">
          <!-- 未登录时显示页面 -->
          <div v-if="!userDate.loginname" v-show="!chulai">
            <p>CNode：Node.js中文社区</p>
            <div>
              您可以
              <a href="https://cnodejs.org/signin">登录 </a>
              或
              <a href="https://github.com/login?client_id=0625d398dd9166a196e9&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D0625d398dd9166a196e9%26redirect_uri%3Dhttps%253A%252F%252Fcnodejs.org%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode">注册</a>,也可以

              <button @click="aha" title="点我登录">通过 accesstoken 登录</button>
            </div>
          </div>
          <!-- 登录信息 -->
          <div v-if="!userDate.loginname" v-show="chulai">
            <input type="text" class="inp" v-model="accesstoken" />
            <button class="bnt" @click="login">登录</button>
          </div>
        </div>

        <!-- 个人信息 -->
        <div class="user" v-if="userDate.loginname">
          <div class="tou">个人信息</div>
          <div class="user-content">
            <router-link :to="'/user/'+userDate.loginname">
              <img :src="userDate.avatar_url" alt="" />
            </router-link>
            <span>{{userDate.loginname}}</span>
            <p class="jifen">积分：{{userDate.score}}</p>
            <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
          </div>
        </div>

        <!-- 发布话题 -->
        <div class="fabu" v-show="userDate.loginname">
          <router-link tag="button" to="/issue" id="btn">发布话题</router-link>
        </div>

        <div class="banner">
          <a href="https://0x7.me/UDyj"><img src="../../../static/image/banner3.jpg" alt=""></a>
          <a href="https://www.aliyun.com/product/nodejs?ref=cnode"><img src="../../../static/image/banner4.jpg" alt=""></a>
          <a href="https://render.alipay.com/p/s/taobaonpm_click/image_click_25"><img src="../../../static/image/banner1.jpg" alt=""></a>
          <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&utm_medium=content_pic_pc_540_130&utm_campaign=huodong&utm_content=gift&ytag=cnodejs"><img src="../../../static/image/banner2.jpg" alt=""></a>

        </div>

        <div class="wuren">
          <div class="hua">无人回复的话题</div>
          <div class="content">
            <p>推荐一款前端测试工具</p>
            <p>AI考拉技术分享会—手把手教你入门UI 自...</p>
            <p>sequelize 折腾笔记1</p>
            <p>express 如何在其他函数中终止本次请求...</p>
            <p>express-session 两次req，为什么创建了...</p>
          </div>
        </div>

        <div class="wuren">
          <div class="hua">积分榜 &nbsp;&nbsp;&nbsp;Top 100 >></div>
          <div class="content">
            <p>
              <span>21240</span>
              &nbsp;&nbsp;
              <a href="javascript:">i5ting</a>
            </p>
            <p>
              <span>15025</span>
              &nbsp;&nbsp;
              <a href="javascript:">alsotang</a>
            </p>
            <p>
              <span>9350</span>
              &nbsp;&nbsp;
              <a href="javascript:">leapon</a>
            </p>
            <p>
              <span>8760</span>
              &nbsp;&nbsp;
              <a href="javascript:">jiyinyiyong</a>
            </p>
            <p>
              <span>6985</span>
              &nbsp;&nbsp;
              <a href="javascript:">yakczh</a>
            </p>
            <p>
              <span>6605</span>
              &nbsp;&nbsp;
              <a href="javascript:">im-here</a>
            </p>
            <p>
              <span>6385</span>
              &nbsp;&nbsp;
              <a href="javascript:">atian25</a>
            </p>
            <p>
              <span>6025</span>
              &nbsp;&nbsp;
              <a href="javascript:">DevinXian</a>
            </p>
            <p>
              <span>5320</span>
              &nbsp;&nbsp;
              <a href="javascript:">magicdawn</a>
            </p>
            <p>
              <span>4915</span>
              &nbsp;&nbsp;
              <a href="javascript:">chapgaga</a>
            </p>
          </div>
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
            <a href="javascript:">客户端源码地址</a>
          </div>
        </div>

      </div>
      <!-- Loding -->
      <animation v-show="hua"></animation>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import animation from "./animation";
export default {
  components: {
    animation
  },
  data() {
    return {
      itemList: [],
      chulai: false,
      accesstoken: "0965dc35-b021-4d49-8930-1bbd06ba9107",
      userDate: [],
      hua: true
    };
  },
  created() {
    //默认显示
    let tab = this.$route.query.tab;
    if (!tab) {
      axios.get("https://cnodejs.org/api/v1/topics").then(res => {
        let { data } = res.data;
        this.itemList = data;
        this.hua = false;
      });
    }
  },
  computed: {
    data() {
      let tab = this.$route.query.tab;

      if (tab) {
        this.hua = true;
        axios.get("https://cnodejs.org/api/v1/topics/?tab=" + tab).then(res => {
          let { data } = res.data;
          this.itemList = data;
          this.hua = false;
        });
      }
    },
    //未读消息
    weiNum() {
      let tab = this.$route.query.tab;
      // console.log("ok");
      axios
        .get(
          " https://cnodejs.org/api/v1/message/count/?accesstoken=" +
            this.$store.state.accesstoken
        )
        .then(res => {
          this.$store.commit("getMessage", res.data.data);
          // console.log(this.$store.state.weidu);
          return;
        });
    }
  },
  mounted() {
    //加载已登录用户信息
    if (this.$store.state.user != "") {
      axios
        .get("https://cnodejs.org/api/v1/user/" + this.$store.state.user)
        .then(res => {
          if (res.data.success) {
            let { data } = res.data;
            this.userDate = data;
          }
        });
    }
  },
  methods: {
    aha() {
      this.chulai = true;
    },
    //登录
    login() {
      if (this.accesstoken == "") {
        alert("请输入访问令牌.");
      } else {
        this.hua = true;
        axios
          .post("https://cnodejs.org/api/v1/accesstoken", {
            accesstoken: this.accesstoken
          })
          .then(res => {
            if (res.data.success) {
              //请求用户信息
              axios
                .get("https://cnodejs.org/api/v1/user/" + res.data.loginname)
                .then(res => {
                  if (res.data.success) {
                    this.hua = false;
                    let { data } = res.data;
                    this.userDate = data;
                    //仓库保存用户信息
                    this.$store.commit("getUserName", this.userDate.loginname);
                    this.$store.commit("getToken", this.accesstoken);

                    alert("登陆成功!");
                  }
                });
            }
          });
      }
    }
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
a {
  text-decoration: none;
}
.fabu {
  padding: 10px;
  margin-top: 13px;
  background: #fff;
  #btn {
    cursor: pointer;
    background: #80bd01;
    color: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    width: 84px;
    height: 34px;
  }
  #btn:hover {
    background: #6ba44e;
    color: #f8f8f8;
  }
}
.router-link-active {
  padding: 3px 5px;
  border-radius: 4px;
  color: white !important;
  background: #80bd01;
}
a {
  text-decoration: none;
}
#main {
  display: flex;
  justify-content: space-between;
  background: #e1e1e1;
  padding: 15px 0;
  .main-left {
    margin-left: 5%;
    flex: 0 0 66.8%;
    .menu {
      background: #f6f6f6;
      padding: 8px 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      a {
        text-decoration: none;
        cursor: pointer;
        margin-right: 22px;
        color: #80bd01;
        font-size: 13.5px;
      }
      .a-active {
        padding: 3px 5px;
        border-radius: 4px;
        background: #80bd01;
        color: #fff;
      }
    }
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
            width: 70%;
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
      }
      .item:hover {
        background: #f6f6f6;
      }
    }
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
      .inp {
        border: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        width: 100%;
        height: 30px;
      }
      .bnt {
        margin: 10px 16%;
      }
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
      margin-top: -20px;
      .tou {
        padding: 10px 8px;
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
    .banner:nth-last-child(2) {
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

/* Loding */
.spinner {
  margin: 100px auto;
  width: 20px;
  height: 20px;
  position: relative;
}

.container1 > div,
.container2 > div,
.container3 > div {
  width: 6px;
  height: 6px;
  background-color: #333;

  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.circle1 {
  top: 0;
  left: 0;
}
.circle2 {
  top: 0;
  right: 0;
}
.circle3 {
  right: 0;
  bottom: 0;
}
.circle4 {
  left: 0;
  bottom: 0;
}

.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.container3 .circle1 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
