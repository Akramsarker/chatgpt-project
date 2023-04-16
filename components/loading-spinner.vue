<template>
  <div class="spinner">
    <div class="dot-pulse"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@charset "UTF-8";
.spinner {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  margin-top: 0.5rem;
  background: #20232b;
  width: 100px;
  padding-left: 1.6rem;
  border-radius: 12px;
  border-bottom-left-radius: 2px;
}
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #009d34c6;
  color: #009d34c6;
  box-shadow: 9999px 0 0 -5px #009d34c6;
  -webkit-animation: dot-pulse 1.5s infinite linear;
  animation: dot-pulse 1.5s infinite linear;
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
}

.dot-pulse::before,
.dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #009d34c6;
  color: #009d34c6;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #009d34c6;
  -webkit-animation: dot-pulse-before 1.5s infinite linear;
  animation: dot-pulse-before 1.5s infinite linear;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #009d34c6;
  -webkit-animation: dot-pulse-after 1.5s infinite linear;
  animation: dot-pulse-after 1.5s infinite linear;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

@-webkit-keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 9984px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #009d34c6;
  }
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 9984px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #009d34c6;
  }
}

@-webkit-keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 9999px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #009d34c6;
  }
}

@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 9999px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #009d34c6;
  }
}

@-webkit-keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 10014px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #009d34c6;
  }
}

@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px #009d34c6;
  }
  30% {
    box-shadow: 10014px 0 0 2px #009d34c6;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #009d34c6;
  }
}
</style>
