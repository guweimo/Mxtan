<template>
  <header id="header">
    <div class="container">
      <nav>
        <ul class="menu">
          <li id="logo">
            <router-link to="/home">Mxtan</router-link>
          </li>
          <li v-for="item in navList" :key="item.title">
            <router-link
              :to="item.url"
              v-text="item.title"
              :class="{ select: selectType == item.title.toLowerCase() }"
            ></router-link>
          </li>
          <li class="search">
            <input
              type="text"
              class="form-control"
              v-model="searchData.title"
              placeholder="请搜索博文"
              @keyup.13="searchTitle"
            />
          </li>
          <li>
            <mt-button class="mt-primary" @click="gotoSave" v-if="userInfo.name"
              >发布</mt-button
            >
          </li>
          <li>
            <!-- <div class="sign" v-if="!userInfo.name">
                            <router-link to="/login" class="a-inline">登录</router-link>
                            <router-link to="/register" class="a-inline">注册</router-link>
            </div>-->
            <div class="user-info" v-if="userInfo.name">
              <a class="user-info-link" @click="showDropdown">
                <img class="avatar" height="20" width="20" :src="getAvatar" />
                <span class="user-info-name">{{ userInfo.name }}</span>
                <span class="dropdown-caret"></span>
              </a>
              <div class="dropdown-menu" v-show="dropdown">
                <span></span>
                <ul>
                  <li @click="goRouter('people')">我的主页</li>
                  <li>设置</li>
                  <li @click="exit">退出</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import picture from '../../assets/picture.jpg'
import { removeStore } from '@/utils/unit'
import { mapState, mapMutations } from 'vuex'
import mtButton from '@/components/common/mtButton'

let dropdownEvent = null

export default {
  components: {
    mtButton,
  },
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchData: {
        title: '',
      },
      dropdown: false,
    }
  },
  computed: {
    ...mapState('user', ['selectType', 'userInfo']),
    getAvatar: function() {
      let avatar = picture
      if (this.userInfo.avatar) {
        avatar = this.userInfo.avatar
      }
      return avatar
    },
  },
  mounted() {
    this.setTitle()
    dropdownEvent = event => {
      let target = event.target
      let userInfoLink = document.querySelector('.user-info-link')
      let userInfoLinkChild = userInfoLink.childNodes
      let hasNode = false
      if (target == userInfoLink) {
        hasNode = true
      }
      for (let item of userInfoLinkChild) {
        if (item == target) {
          hasNode = true
          break
        }
      }
      if (this.dropdown && !hasNode) {
        this.dropdown = false
      }
    }
    window.addEventListener('click', dropdownEvent)
  },
  methods: {
    ...mapMutations('user', ['removeUserinfo', 'updateSearchTitle']),
    gotoSave() {
      this.$router.push('/save')
    },
    searchTitle() {
      if (this.searchData.title.trim()) {
        this.updateSearchTitle(this.searchData.title)
        this.$router.push(`/search/${this.searchData.title}`)
      }
    },
    setTitle() {
      if (this.$route.path.indexOf('/search/') > -1) {
        this.searchData.title = this.$route.params.title
      }
    },
    showDropdown() {
      this.dropdown = !this.dropdown
    },
    exit() {
      removeStore('userinfo')
      this.removeUserinfo()
      this.$router.push('/login')
    },
    goRouter() {
      // this.$router.push('/p')
    },
  },
  destroyed() {
    if (dropdownEvent) {
      window.removeEventListener('click', dropdownEvent)
    }
  },
}
</script>

<style lang="less" scoped>
#header {
  color: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  box-shadow: 0 3px 3px -2px hsla(0, 0%, 0%, 0.13);
  z-index: 2333;
  .container {
    margin-top: 0;
  }
}

.menu {
  display: flex;
  align-items: center;
  li {
    margin: 0 10px;
    vertical-align: middle;
    position: relative;
    &:last-of-type {
      margin-left: auto;
    }
    & input {
      background: #eee;
      display: block;
    }
    &.search {
      margin-left: 20px;
    }
  }
  a {
    display: block;
    color: #ccc;
    padding: 0 10px;
    &:hover {
      color: #fff;
    }
    &.a-inline {
      display: inline-block;
    }
    &.select {
      color: #fff;
    }
  }
}

.user-info {
  position: relative;
  .dropdown-caret {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    content: '';
    border: 4px solid;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    margin-top: 5px;
  }
  .avatar {
    vertical-align: middle;
    margin-right: 3px;
    border-radius: 4px;
  }
  .dropdown-menu {
    cursor: default;
    position: absolute;
    top: 100%;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    margin-top: 20px;
    & li {
      height: 36px;
      color: #888;
      text-align: left;
      padding: 0 20px;
      width: 100px;
      cursor: pointer;
      margin: 0;
      line-height: 36px;
      &:hover {
        color: #333;
        background-color: #c3c3c3;
      }
    }
  }
}

#logo {
  a {
    color: #69e4dc;
    font-weight: bold;
  }
}
</style>
