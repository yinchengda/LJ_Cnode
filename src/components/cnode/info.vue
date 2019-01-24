<template>
  <div id="box">

    <!-- new html -->
    <div id="main">

      <div class="main-left" v-if="infoData != ''">
        <!-- 标题及帖子信息 -->
        <div id="top">
          <h1>
            <span class="ding" v-if="infoData.top">置顶</span>
            <span v-show="!infoData.top && infoData.good" class="ding">精华</span>{{infoData.title}}
          </h1>
          <p id="message">
            <ul v-if="infoData.author">
              <li>发布于 {{infoData.create_at | getLastReplyTime}}</li>
              <li>作者 {{infoData.author.loginname}} </li>
              <li>{{infoData.visit_count}} 次浏览</li>
              <li>来自 分享</li>
            </ul>
          </p>
          <p>
            <img src="../../../static/image/bian.png" alt="" title="编辑" @click="issue" />
          </p>
          <button id="collect" v-show="!four" @click="collect"> 收 藏 </button>
          <button id="clearCollect" v-show="four" @click=" clearCollect">取消收藏</button>
        </div>

        <!-- 帖子内容 -->
        <div id="content">
          <div v-html="infoData.content" id="txt"></div>
          <!-- Lodding -->
            <animation v-if="dong" id="dong"></animation>
        </div>

        <!-- 评论 -->
        <div id="discuss">

          <div class="repliesAllNum" v-if="!four">
            {{num}}条回复
          </div>

          <div class="replies" v-for="(item,index) in infoData.replies" :key="index">

            <router-link :to="'/user/'+item.author.loginname">
              <img :src="item.author.avatar_url" alt="" />
              <span id="lan">{{item.author.loginname}}</span>
            </router-link>

            <!-- 点赞 -->
            <div id="shitPraise" v-if="item.ups.length">
              <div class="praise" @click="praise(item.id)"></div>
              {{item.ups.length}}
            </div>

            <div class="text">
              <a href="javascript:" class="user"></a>
              <a href="javascript:" class="message"> {{index+1}}楼•{{item.create_at | getLastReplyTime}}</a>
            </div>

            <!-- 帖子内容 -->
            <div class="repliesTxt" v-html="item.content"></div>
            
          </div>
        </div>

        <!-- 新建评论 -->
        <div id="ping">

          <div class="tou">
            添加回复
          </div>
          <div class="img">
            <img src="../../../static/image/inp.png" alt="" style="cursor: pointer;" title="别点，这只是个装饰品  别当真." />
          </div>
          <textarea v-model="content"></textarea><br/>
          <button class="btn" @click="end" title="提交评论">回 &nbsp;复</button>
        </div>

        
      </div>

      <div class="main-left" v-if="infoData == ''">
        <!-- 标题及帖子信息 -->
        <div id="top">
        <!-- Lodding -->
            <animation v-if="dong" id="dong"></animation>
        </div>
        <!-- 超时显示 -->
          <div id="content" v-if="this.remove">
          <h1>响应超时！</h1>
          <h2>请检查网络连接,或稍后再次打开.</h2>
          <br />
          <h5 color="blue">网络没有问题？</h5>
          <h6>那就是该话题不存在或已被作者删除.</h6>
        </div>



      </div>
      
      <div class="main-right">

        <!-- 个人信息 -->
        <div class="user" v-if="infoData.author">
          <p>个人信息</p>
          <div class="user-content">
            <router-link :to="'/user/'+infoData.author.loginname">
              <img :src="infoData.author.avatar_url" alt="" />
            </router-link>
            <span>{{infoData.author.loginname}}</span>
            <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
          </div>
        </div>

        <!-- 广告 -->
        <div class="banner">
          <a href="https://0x7.me/UDyj"><img src="../../../static/image/banner3.jpg" alt=""></a>
          <a href="https://www.aliyun.com/product/nodejs?ref=cnode"><img src="../../../static/image/banner4.jpg" alt=""></a>
          <a href="https://render.alipay.com/p/s/taobaonpm_click/image_click_25"><img src="../../../static/image/banner1.jpg" alt=""></a>
          <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&utm_medium=content_pic_pc_540_130&utm_campaign=huodong&utm_content=gift&ytag=cnodejs"><img src="../../../static/image/banner2.jpg" alt=""></a>
        </div>

        <!-- 作者其他话题 -->
        <div class="wuren">
          <div class="hua">作者的其他话题</div>
          <div class="content">
            <router-link tag="p" v-for="(item,index) in author" :to="'/info/'+item.id" :key="index" v-if="index <= 4 && infoData.title!= item.title " :title="item.title" onclick="javascript:location.reload()">{{item.title}}</router-link>
            <p v-if="author.length == 1" style="color:#000">无</p>
          </div>
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

      </div>
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
      infoData: "",
      num: "",
      author: [],
      content: "",
      /* 判断收藏 */
      four: false,
      remove:false,
      dong:true
    };
  },
  created() {
    let id = this.$route.params.id;

    //获取主题详情
    axios.get("https://cnodejs.org/api/v1/topic/" + id).then(res => {
      let { data } = res.data;
      this.infoData = data;
      if(res){
        this.dong =  false
      }
      //为何写在这里而不是直接写在标签中?  解决偶尔加载时获取不到length问题
      this.num = this.infoData.replies.length;
      //作者的其他话题...
      var name = data.author.loginname;
      axios.get("https://cnodejs.org/api/v1/user/" + name).then(res => {
        let { data } = res.data;
        this.author = data.recent_topics;
      });

      //判断收藏
      axios
        .post("https://cnodejs.org/api/v1/topic_collect/collect", {
          accesstoken: this.$store.state.accesstoken,
          topic_id: this.infoData.id
        })
        .then(res => {
          if (!res.data.success) {
            this.four = true;
          } else {
            axios
              .post("https://cnodejs.org/api/v1/topic_collect/de_collect", {
                accesstoken: this.$store.state.accesstoken,
                topic_id: this.infoData.id
              })
              .then(res => {});
          }
        });
    })
    
    //响应超时
    setTimeout(()=>{
      if(this.infoData == []){
        this.remove = true;
        console.log('ok')
        this.dong =  false

      } 
    },10000)
    
    
  },
  //时间
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
        return Math.round(hour) + "小时前";
      } else if (hour < 720) {
        return Math.round(hour / 24) + "天前";
      } else if (parseInt(hour / 24) < 365) {
        return Math.round(hour / 24 / 30) + "个月前";
      } else {
        return Math.round(hour / 24 / 30 / 12) + "年前";
      }
    }
  },
  methods: {
    //评论
    end() {
      if (this.$store.state.accesstoken == "") {
        alert("请登录后在进行该操作.");
      } else {
        axios
          .post(
            "https://cnodejs.org/api/v1/topic/" + this.infoData.id + "/replies",
            {
              accesstoken: this.$store.state.accesstoken,
              content: this.content
            }
          )
          .then(res => {
            if (res.data.success) {
              alert("回复成功!");
              this.content = "";
            } else {
              alert("未知错误.");
            }
          });
      }
    },
    //编辑（发送）
    issue() {
      if (this.$store.state.user == "") {
        alert("请登录后在进行该操作.");
      } else if (this.$store.state.user != this.infoData.author.loginname) {
        alert("只有发布者才可以编辑哦.");
      } else {
        this.$router.push({
          path: "/issue",
          query: {
            tab: this.infoData.tab,
            title: this.infoData.title,
            content: this.infoData.content,
            id: this.infoData.id
          }
        });
      }
    },
    //收藏
    collect() {
      if (this.$store.state.accesstoken == "") {
        alert("请登录后在进行该操作.");
      } else {
        axios
          .post("https://cnodejs.org/api/v1/topic_collect/collect", {
            accesstoken: this.$store.state.accesstoken,
            topic_id: this.infoData.id
          })
          .then(res => {
            if (res.data.success) {
              this.$store.commit("getCang", false);
              this.four = true;
            } else {
              alert("未知错误o(╥﹏╥)o");
            }
          });
      }
    },
    //取消收藏
    clearCollect() {
      axios
        .post("https://cnodejs.org/api/v1/topic_collect/de_collect", {
          accesstoken: this.$store.state.accesstoken,
          topic_id: this.infoData.id
        })
        .then(res => {
          if (res.data.success) {
            this.$store.commit("getCang", true);
            this.four = false;
          }
        });
    },

    //点赞 -------(未完成)
    praise(id) {
      if (this.$store.state.accesstoken == "") {
        alert("需要登录后才可以点赞哦.");
      } else {
        axios
          .post("https://cnodejs.org/api/v1/reply/" + id + "/ups", {
            accesstoken: this.$store.state.accesstoken
          })
          .then(res => {
            console.log(res);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#dong{
  position:fixed;
  top:50%;
  left:35%;

}
#collect {
  text-align: center;
  position: absolute;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 53px;
  height: 35px;
  outline: none;
  border: 1px solid;
  color: #ffffff;
  background: #80bd01;
  right: 1.5%;
  bottom: 6%;
}
#collect:active {
  border: 1px solid #5c9aa6;
}
#collect:hover {
  background: #6ba44e;
  color: #ffffe3;
}
#clearCollect {
  position: absolute;
  right: 1.5%;
  bottom: 6%;
  padding: 0px 10px;
  border: none;
  height: 35px;
  cursor: pointer;
  letter-spacing: 2px;
  border-radius: 3px;
  background-color: #e5e5e5;
  font-size: 14px;
  background: hsla;
  font-weight: 400;
  align-items: flex-start;
  text-align: center;
}
#clearCollect:hover {
  background: #909090;
  color: #fff;
}

a {
  text-decoration: none;
}
#top {
  position: relative;
  background: #fff;
  padding: 18px 10px 10px 10px;
  border-bottom: 1px solid #e5e5e5;
  h1 {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 24px;
    .ding {
      padding: 2px 4px;
      background: #80bd01;
      display: inline-block;
      color: white;
      border-radius: 3px;
      font-size: 12px;
    }
  }
  #message {
    color: #838383;
    font-size: 13px;
    overflow: hidden;
    margin: 0 0 0 -30px;
    ul > li {
      float: left;
      margin: 0 15px;
      text-indent: -0.6em;
    }
  }
  p {
    img {
      cursor: pointer;
    }
  }
}
#content {
  padding-top: 10px;
  background: #fff;
  padding: 10px 22px;
  color: #333333;
  #txt {
    line-height: 30px;
    overflow: hidden;
  }
}
#ping {
  margin-top: 20px;
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  .tou {
    background: #f6f6f6;
    font-size: 14px;
    color: #444;
    padding: 10px;
  }
  .img {
    margin-top: 6px;
    img {
      width: 100%;
    }
  }
  textarea {
    width: 100%;
    height: 190px;
    border: none;
    border-bottom: 1px solid #ece9e9;
    outline: none;
    resize: none;
  }
  .btn {
    width: 52px;
    height: 34px;
    text-align: center;
    cursor: pointer;
    background: #0088cc;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    font-size: 13px;
    margin: 8px 0 10px 10px;
  }
  .btn:hover {
    background: #0055cc;
  }
}
#discuss {
  margin-top: 20px;
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
  .repliesAllNum {
    background: #f6f6f6;
    font-size: 14px;
    color: #444;
    padding: 10px;
  }
  #shitPraise {
    position: absolute;
    right: 3%;
    color: #808080;
    font-size: 12px;
    text-indent: 0.5em;
    .praise {
      width: 15px;
      height: 17px;
      background: url(../../../static/image/zan.png) no-repeat 100% 100%;
      vertical-align: middle;
      cursor: pointer;
      float: left;
    }
    .praise:hover {
      background: url(../../../static/image/zanhover.png) no-repeat 100% 100%;
    }
    .zhih {
      background: url(../../../static/image/zantrue.png) no-repeat 100% 100%;
    }
  }

  .replies {
    border-top: 1px solid #f0f0f0;
    padding: 10px;
    background: #fff;
    overflow: hidden;
    a {
      float: left;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      #lan {
        color: #666666;
        font-size: 14px;
        margin-top: -10px;
      }
    }
    .text {
      overflow: hidden;
      .user {
        float: left;
        font-size: 13px;
        color: #666666;
        margin-left: 1%;
      }
      .message {
        float: left;
        font-size: 13px;
        color: #0088cc;
        margin-left: 1%;
      }
      .message:hover {
        color: #005580;
        border-bottom: 1px solid #005580;
      }
    }
  }
  .replies:nth-child(2) {
    background: #f4fcf0;
  }
  .repliesTxt {
    margin-top: 20px;
    color: #333333;
  }
}
@media (max-width: 979px) {
  #discuss {
    margin-top: 0px;
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

    .user {
      color: #333333;
      background: #fff;
      p {
        padding: 10px;
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
          font-style: italic;
          font-size: 13px;
          font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
            "Hiragino Sans GB", STHeiti, sans-serif !important;
          word-break: break-word;
          color: #333;
          background: #fff;
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

    .wuren {
      width: 100%;

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
          overflow: hidden;
          // white-space: nowrap;   /* o(╥﹏╥)o */
          text-overflow: ellipsis;
        }
        a {
          color: #778087;
        }
        a:hover {
          text-decoration: underline;
        }
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
