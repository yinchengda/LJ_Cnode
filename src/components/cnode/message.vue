<template>
    <div>

        <div id="main">

            <div class="main-left">
                <div class="top">
                    <div class="top-header">
                        <a href="http://localhost:8080/#/?tab=all" class="zhu">主页</a>
                        <span class="gang">/</span>
                        <span class="huiz">新消息</span>
                    </div>
                    <div class="message">

                        <div v-if="unread.length" v-for="(item,index) in unread" :key="index">
                            <router-link :to="'/user/'+item.author.loginname">{{item.author.loginname}}</router-link>
                            回复了你的话题
                            <a href="javascript:">{{item.topic.title}}</a>
                        </div>

                        <div v-if="!unread.length">
                            无
                        </div>
                    </div>
                </div>

                <!-- 过往信息 -->
                <div class="topic">
                    <div class="topic-header">
                        <span class="title">过往信息</span>
                    </div>
                    <div class="list">
                        <div class="message">
                            <div v-for="(item,index) in comeAndGo" :key="index">
                                <router-link :to="'/user/'+item.author.loginname">{{item.author.loginname}}</router-link>
                                回复了你的话题

                                <router-link :to="'/info/'+item.topic.id">{{item.topic.title}}</router-link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="main-right">

                <!-- 个人信息 -->
                <div class="user" v-if="userDateList.avatar_url">
                    <div class="tou">个人信息</div>
                    <div class="user-content">
                        <router-link :to="'/user/'+userDateList.loginname">
                            <img :src="userDateList.avatar_url" alt="" />
                        </router-link>
                        <span>{{userDateList.loginname}}</span>
                        <p class="jifen">积分：{{userDateList.score}}</p>
                        <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
                    </div>
                </div>
                <!-- 发布话题 -->
                <div class="fabu">
                    <router-link tag="button" to="/issue" id="btn">发布话题</router-link>
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
      comeAndGo: [],
      unread: []
    };
  },
  created() {
    let userName = this.$store.state.user;
    //用户信息
    axios.get("https://cnodejs.org/api/v1/user/" + userName).then(res => {
      let { data } = res.data;
      this.userDateList = data;
    });

    //获取消息信息
    axios
      .get(
        "https://cnodejs.org/api/v1/messages?accesstoken=" +
          this.$store.state.accesstoken +
          "&mdrender=" +
          false
      )
      .then(res => {
        //已读
        this.comeAndGo = res.data.data.has_read_messages;
        //未读
        this.unread = res.data.data.hasnot_read_messages;
      });
  }
  
};
</script>

<style lang="scss" scoped>
.huiz {
  font-size: 14px;
  color: #999999;
}
a {
  text-decoration: none;
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
    .message {
      font-size: 14px;
      background: #fff;
      color: #333333;
      div {
        padding: 10px;
        border-bottom: 1px solid #e5e5e5;
        a:hover {
          color: #005580;
          text-decoration: underline;
        }
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
      .message {
        font-size: 14px;
        background: #fff;
        color: #333333;
        div {
          padding: 10px;
          border-bottom: 1px solid #e5e5e5;
          a:hover {
            color: #005580;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .main-right {
    flex: 0 0 20.7%;
    margin-left: 1.5%;
    margin-right: 6.1%;
    font-size: 13px;
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
</style>
