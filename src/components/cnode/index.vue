<template>
  <div>
    <!-- 主页面. -->
    <header>
      <div class="header-main">
        <div class="header-left">
          <a href="javascript:">
            <img src="../../../static/image/logo.svg" alt="" />
          </a>
          <form>
            <input type="text" />
          </form>
        </div>
        <div class="header-right">
          <ul>
            <li>
              <router-link to="/?tab=all">首页</router-link>
            </li>
            <li v-if="this.$store.state.accesstoken != ''" style="position:relative;">
              <span id="weidu" v-if="$store.state.weidu">{{$store.state.weidu}}</span>
              <router-link to="/message">未读消息</router-link>
            </li>
            <li>
              <a href="javascript:">新手入门</a>
            </li>
            <li>
              <a href="javascript:">API</a>
            </li>
            <li>
              <a href="javascript:">关于</a>
            </li>
            <li>
              <a href="javascript:">注册</a>
            </li>
            <li>
              <a href="javascript:">登录</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <!-- 写个脚啊！[○･｀Д´･ ○] -->
    <footer>

    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      num: ""
    };
  },
  mounted() {
    if (this.$store.state.accesstoken != "") {
      axios
        .get(
          " https://cnodejs.org/api/v1/message/count/?accesstoken=" +
            this.$store.state.accesstoken
        )
        .then(res => {
          this.num = res.data.data;
        });
    }z
  }
};
</script>

<style lang="scss" scoped>
#weidu {
  position: absolute;
  background: #80bd01;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  border-radius: 50%;
  top: -8px;
  left: -5px;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
body {
  background: #e1e1e1;
}

header {
  background: #444444;
  height: 50px;
  overflow: hidden;
  .header-main {
    width: 90%;
    height: 100%;
    padding: 5px;
    margin: auto;
    font-size: 13px;
    line-height: 20px;
    color: #333;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    .header-left {
      flex: 50%;
      height: 100%;
      overflow: hidden;
      a {
        img {
          width: 120px;
          height: 28.19px;
          margin-top: 3px;
          float: left;
          margin-left: -1px;
        }
      }
      form {
        width: 233px;
        height: 28px;
        float: left;
        margin-left: 20px;
        input {
          width: 100%;
          height: 24px;
          border: none;
          outline: none;
          margin-top: 8px;
          background: #888888;
          border-radius: 15px;
          background: url("../../../static/image/search.png") 4px 4px no-repeat
            #888;
          text-indent: 2em;
          transition: all 0.5s;
        }
        @keyframes inp {
          from {
            background: url("../../../static/image/search.png") 4px 4px
              no-repeat #888;
          }
          to {
            background: url("../../../static/image/search.png") 4px 4px
              no-repeat #fff;
          }
        }
        input:hover {
          animation: inp 0.5s linear;
          animation-fill-mode: forwards;
        }
      }
    }
    .header-right {
      height: 100%;
      // @media (max-width: 979px) {
      //   header {
      //     height: 100px;
      //     background: #444444;
      //   }
      // .header-right{
      //   flex: 100%;
      //   flex-direction: column;
      //   background: #444444;
      // }
      // }
      ul {
        clear: both;
        margin-right: 16px;
        display: flex;
        li {
          font-size: 12.5px;
          line-height: 15px;
          a {
            text-decoration: none;
            cursor: pointer;

            color: #cccccc;
            padding: 10px 15px;
          }
          a:hover {
            color: #fff;
          }
        }
      }
    }
  }
}

@media (max-width: 979px) {
  header {
    .header-main {
      form {
        position: absolute;
        left: 30%;
      }
      .header-right {
        display: none;
      }
    }
  }
}
</style>
