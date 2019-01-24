<template>
  <div>
    <div class="container">
      <section>
        <div class="loader loader-2">
          <svg class="loader-star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <polygon points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 " fill="#18ffff" />
          </svg>
          <div class="loader-circles"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 100px;
  text-align: center;
  background: #fff;
}
.loader-2 .loader-star {
  position: absolute;
  left: calc(33% - 4px);
  top: calc(46% - 4px);
  width: 60px;
  height: 60px;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  -webkit-animation: loader-2-star 1s ease alternate infinite;
  animation: loader-2-star 1s ease alternate infinite;
}
.loader-2 .loader-circles {
  width: 8px;
  height: 8px;
  /* 中心点颜色 */
  background: #18ffff; /*#18ffff*/
  border-radius: 50%;
  position: absolute;
  /* 圈圈的位置 */
  left: calc(35% - 4px);
  top: calc(50% - 4px);
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
  -webkit-animation: loader-2-circles 1s ease-in-out alternate infinite;
  animation: loader-2-circles 1s ease-in-out alternate infinite;
}

@-webkit-keyframes loader-2-circles {
  0% {
    box-shadow: 0 0 0 #18ffff;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    box-shadow: 24px -22px #18ffff, 30px -15px 0 -3px #18ffff, 31px 0px #18ffff,
      29px 9px 0 -3px #18ffff, 24px 23px #18ffff, 17px 30px 0 -3px #18ffff,
      0px 33px #18ffff, -10px 28px 0 -3px #18ffff, -24px 22px #18ffff,
      -29px 14px 0 -3px #18ffff, -31px -3px #18ffff, -30px -11px 0 -3px #18ffff,
      -20px -25px #18ffff, -12px -30px 0 -3px #18ffff, 5px -29px #18ffff,
      13px -25px 0 -3px #18ffff;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 25px -22px #18ffff, 15px -22px 0 -3px black, 31px 2px #18ffff,
      21px 2px 0 -3px black, 23px 25px #18ffff, 13px 25px 0 -3px black,
      0px 33px #18ffff, -10px 33px 0 -3px black, -26px 24px #18ffff,
      -19px 17px 0 -3px black, -32px 0px #18ffff, -23px 0px 0 -3px black,
      -25px -23px #18ffff, -16px -23px 0 -3px black, 0px -31px #18ffff,
      -2px -23px 0 -3px black;
  }
}
@keyframes loader-2-circles {
  0% {
    box-shadow: 0 0 0 #18ffff;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    box-shadow: 24px -22px #18ffff, 30px -15px 0 -3px #18ffff, 31px 0px #18ffff,
      29px 9px 0 -3px #18ffff, 24px 23px #18ffff, 17px 30px 0 -3px #18ffff,
      0px 33px #18ffff, -10px 28px 0 -3px #18ffff, -24px 22px #18ffff,
      -29px 14px 0 -3px #18ffff, -31px -3px #18ffff, -30px -11px 0 -3px #18ffff,
      -20px -25px #18ffff, -12px -30px 0 -3px #18ffff, 5px -29px #18ffff,
      13px -25px 0 -3px #18ffff;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 25px -22px #18ffff, 15px -22px 0 -3px black, 31px 2px #18ffff,
      21px 2px 0 -3px black, 23px 25px #18ffff, 13px 25px 0 -3px black,
      0px 33px #18ffff, -10px 33px 0 -3px black, -26px 24px #18ffff,
      -19px 17px 0 -3px black, -32px 0px #18ffff, -23px 0px 0 -3px black,
      -25px -23px #18ffff, -16px -23px 0 -3px black, 0px -31px #18ffff,
      -2px -23px 0 -3px black;
  }
}
@-webkit-keyframes loader-2-star {
  0% {
    -webkit-transform: scale(0) rotate(0deg);
    transform: scale(0) rotate(0deg);
  }
  100% {
    -webkit-transform: scale(0.7) rotate(360deg);
    transform: scale(0.7) rotate(360deg);
  }
}
@keyframes loader-2-star {
  0% {
    -webkit-transform: scale(0) rotate(0deg);
    transform: scale(0) rotate(0deg);
  }
  100% {
    -webkit-transform: scale(0.7) rotate(360deg);
    transform: scale(0.7) rotate(360deg);
  }
}
</style>
