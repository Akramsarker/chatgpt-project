<template>
  <nav class="navbar" :style="{ boxShadow: shadow }">
    <div class="container">
      <div class="nav-logo">
        <h1><nuxt-link to="/">Logo will be here</nuxt-link></h1>
      </div>
      <ul class="nav_list">
        <li><nuxt-link class="nav-link" to="/">Home</nuxt-link></li>
        <li><nuxt-link class="nav-link" to="/about">About</nuxt-link></li>
        <li><nuxt-link class="nav-link" to="/contact">Contact</nuxt-link></li>
        <li><nuxt-link class="nav-link" to="/signin">Login</nuxt-link></li>
      </ul>
      <div class="dopdownmenu">
        <img
          src="icon-image/outline_menu.png"
          alt="menu-image"
          width="30"
          @click="showMenu = !showMenu"
        />
      </div>
    </div>
    <div v-if="showMenu" class="mobile-menu">
      <nuxt-link class="nav-link" to="/">Home</nuxt-link>
      <nuxt-link class="nav-link" to="/about">About</nuxt-link>
      <nuxt-link class="nav-link" to="/contact">Contact</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      shadow: true,
      showMenu: false,
    }
  },
  mounted() {
    document.body.onscroll = () => {
      if (window.scrollY > 0) {
        this.shadow = '0 3px 4px 0 rgba(0, 0, 0, 0.1)'
      }
      if (window.scrollY < 10) {
        this.shadow = 'unset'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/style.scss';
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f9f5f5;
  z-index: 9;
  .container {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px 20px 10px;
    .nav_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include responsive(phone) {
        display: none;
      }
      li {
        list-style: none;
        .nav-link {
          text-decoration: none;
          color: #83868b;
          font-size: 20px;
          font-weight: 500;
          padding: 10px;
          transition: 0.3s;

          &:hover {
            color: red;
          }
        }
        .nuxt-link-exact-active {
          color: red;
        }
      }
    }
  }

  // Mobile Menu
  .dopdownmenu {
    display: none;
    @include responsive(phone) {
      display: block;
      justify-self: end;
      align-self: center;
    }
  }
  .mobile-menu {
    .nav-link {
      display: block;
      color: $color-primary;
      padding: 10px 12px;
      text-decoration: none;
      font-size: 20px;
      background-color: #7188f9;
      &:hover {
        background-color: #ddd;
        color: black;
      }
    }
  }
}
</style>
