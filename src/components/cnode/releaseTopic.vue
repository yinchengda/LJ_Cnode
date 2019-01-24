<template>
  <div>
    <div id="main">

      <div class="main-left">
        <div class="top-header">
          <a href="http://localhost:8080/#/?tab=all" class="zhu">主页</a>
          <span class="gang">/</span>
          <span class="fa" v-if="!data"> 发布话题</span>
          <span class="fa" v-if="data">编辑话题</span>
        </div>
        <div class="content">
          <span class="xuan"> 选择板块：</span>
          <select v-model="type">
            <option>请选择</option>
            <option value="ask">问答</option>
            <option value="share">分享</option>
            <option value="job">招聘</option>
            <option value="dev">客户端测试</option>
          </select>
          <input type="text" v-model="title" class="title" placeholder="标题字数10字以上" />
          <div class="img">
            <img src="../../../static/image/inp.png" alt="" style="cursor: pointer;" title="别点，这只是个装饰品  别当真." />
          </div>
          <textarea v-model="content"></textarea>
          <button class="btn" @click="end">提 &nbsp;交</button>
        </div>
      </div>

      <div class="main-right">

        <div class="wuren">
          <div class="hua">Markdown语法参考</div>
          <div class="content">
            <p>### 单行的标题</p>
            <p>**粗体**</p>
            <p>console.log('行内代码')</p>
            <p>```js\n code \n```标记代码块</p>
            <p>[内容](链接)</p>
            <p>![文字说明](图片链接)</p>
            <a class="di">Markdown文档</a>
          </div>
        </div>

        <div class="wuren">
          <div class="hua">话题发布指南</div>
          <div class="content">
            <p class="pp">尽量把话题要点浓缩到标题里</p>
            <p class="pp">代码含义和报错可在
              <a>SegmentFault</a>提问</p>
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
      type: "请选择",
      title: "",
      content: "",
      data: false
    };
  },
  mounted() {
    if (this.$route.query.title) {
      this.data = true;
      let author = this.$route.query;
      this.type = author.tab;
      this.title = author.title;
      this.content = author.content;
    }
  },
  methods: {
    end() {
      //一顿判断 吧啦吧啦...
      if (this.type == "请选择" || this.type == "") {
        alert("请选择要发布的版块！");
      } else if (this.title == "") {
        alert("标题不能为空.");
      } else if (this.title.length < 6) {
        alert("标题长度不能小于6位");
      } else if (this.content == "") {
        alert("内容不能为空!");
      } else if (!this.data) {
        //发送请求
        axios
          .post(" https://cnodejs.org/api/v1/topics", {
            accesstoken: this.$store.state.accesstoken,
            title: this.title,
            tab: this.type,
            content: this.content
          })
          .then(res => {
            if (res.data.success) {
              alert("发布成功!");
              //再加一个跳转
              this.$router.push("/?tab=" + this.type);
            } else {
              alert("未知错误.");
            }
          });
      } else {
        //发送请求
        axios
          .post(" https://cnodejs.org/api/v1/topics/update", {
            accesstoken: this.$store.state.accesstoken,
            topic_id: this.$route.query.id,
            title: this.title,
            tab: this.type,
            content: this.content
          })
          .then(res => {
            if (res.data.success) {
              alert("编辑成功!");
              //再加一个跳转
              this.$router.push("/info/" + this.$route.query.id);
              initalize = true;
            } else {
              alert("未知错误.");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
      .fa {
        font-size: 13px;
        color: #999999;
      }
      border-bottom: 1px solid #e5e5e5;
    }
    .content {
      background: #fff;
      padding: 10px;
      .xuan {
        font-size: 14px;
      }
      select {
        width: 220px;
        height: 30px;
        border: solid 1px #ccc;
        border-radius: 3px;
        text-indent: 0.5em;
      }
      .title {
        height: 28px;
        width: 100%;
        // border: solid 1px #ccc;
        border: none;
        resize: none;
        outline: none;
        border-radius: 3px;
        box-shadow: 0 0 2px rgba(60, 60, 60, 0.5);
        margin: 16px 0;
        text-indent: 0.5em;
      }
      textarea {
        width: 100%;
        height: 480px;
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
      }
      .btn:hover {
        background: #0055cc;
      }
    }
  }
  .main-right {
    flex: 0 0 20.7%;
    margin-left: 1.5%;
    margin-right: 6.1%;
    font-size: 13px;

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
          color: #000;
          font-size: 13px;
          cursor: pointer;
        }
        .di {
          color: #778087;
          cursor: pointer;
        }
        .pp {
          a {
            color: #778087;
          }
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
