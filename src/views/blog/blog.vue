<template>
  <div class="blog-div">
    <div class="blog-content">
      <div class="blog-align">
        <div class="blog-logo"></div>
        <h2>谷维陌</h2>
        <ul class="clearfix blog-ul">
          <li v-for="item in urlList" v-bind:key="item.title">
            <a :href="item.url" :target="item.target" v-text="item.title"></a>
            <!-- <router-link :to="item.url" v-text="item.title"></router-link> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="blog-footer">
      <div class="copyright">
        <a href="http://www.beian.miit.gov.cn" target="_blank">
          粤ICP备19020764号-1
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      urlList: [
        // {
        //   url: 'https://github.com/guweimo',
        //   title: 'github',
        //   target: '_blank',
        // },
        // {
        //   url: 'https://www.jianshu.com/u/bdaa10098256',
        //   title: '简书',
        //   target: '_blank',
        // },
        {
          url: '/home',
          title: 'Blog',
          target: '_self',
        },
      ],
    }
  },
  mounted() {
    let body = document.querySelector('body')
    body.classList.add('body-no-padding')
    let app = document.querySelector('#app')
    app.classList.add('h100p')
  },
  destroyed() {
    this.FALSE_BLOG_ROUTER()
    let body = document.querySelector('body')
    body.classList.remove('body-no-padding')
    let app = document.querySelector('#app')
    app.classList.remove('h100p')
  },
}
</script>

<style lang="less" scoped>
@px-10: 10px;
@color-default: #52bab3; // #52bab3
@font-color: #fff; // .blog-div {text-align: center;}

.blog-div {
  background-color: @color-default;
  min-height: 100%;
  .blog-content {
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
}

.blog-align {
  h2 {
    color: @font-color;
    text-align: center;
    margin-bottom: 20px;
  }
}

.blog-ul {
  text-align: center;

  a {
    text-decoration: none;
    color: @font-color;
  }

  li {
    display: inline;

    &:not(:last-of-type) {
      margin-right: @px-10;

      &::after {
        content: '|';
        padding-left: @px-10;
        color: @font-color;
      }
    }
  }
}

.blog-logo {
  height: 200px;
  width: 200px;
  background-image: url('~@/assets/picture.jpg');
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #ccc;
}

.blog-footer {
  padding: 30px 0;
  text-align: center;

  .copyright {
    font-size: 15px;
  }

  a,
  a:hover {
    color: #fff;
  }
}
</style>
