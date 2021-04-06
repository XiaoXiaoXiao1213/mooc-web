/**
 * cmommon.js 依赖 jquery
 */
(function () {

  // 选项卡切换
  function Tab(option, active, tabObj, siblingObj) {
    var $bp = $(option)
    $bp.click(function () {
      $(this).addClass(active).siblings().removeClass(active)
      var index = $bp.index(this)
      $(tabObj).eq(index).show().siblings(siblingObj).hide()
    })
  }

  window.Tab = function (option, active, tabObj, siblingObj) {
    return new Tab(option, active, tabObj, siblingObj)
  }

})()

$(function () {

  // 全站头部菜单js
  let navbarToggler = $('.navbar-toggler')
  let navbar = $('.header .navbar')
  navbarToggler.on('click', () => {
    navbar.slideToggle(250)
  })

  // 右侧在线报名关闭弹窗
  let applyOnline = $('.apply-online')
  let applyOnlineCloseBtn = $('.apply-online .close')
  applyOnline && applyOnlineCloseBtn && applyOnlineCloseBtn.on('click', function () {
    applyOnline.hide()
  })

})
