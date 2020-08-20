<template>
  <div class="cont">
    <div class="home_title" style="margin-top: 20px;">
      欢迎使用企程无忧名片推广后台系统
    </div>
    <p class="fwq">确认服务器或虚拟主机开启了伪静态。</p>
    <div class="home_title">
      系统信息：
    </div>
    <table width="100%">
      <tbody class="tpt—index" border='0'>
        <tr>
          <td width="110px">程序版本：</td>
          <td>企程无忧名片推广后台 V2.40</td>
        </tr>
        <tr>
          <td>服务器类型：</td>
          <td>Linux</td>
        </tr>
        <tr>
          <td>PHP版本：</td>
          <td>5.6.20</td>
        </tr>
        <tr>
          <td>Zend版本：</td>
          <td>2.6.0</td>
        </tr>
        <tr>
          <td>服务器解译引擎：</td>
          <td>nginx/1.9.15</td>
        </tr>
        <tr>
          <td>服务器语言：</td>
          <td>zh-CN,zh;q=0.9</td>
        </tr>
        <tr>
          <td>服务器Web端口：</td>
          <td>80</td>
        </tr>
        <tr>
          <td>服务器上传文件大小限制：</td>
          <td>upload_max_files：100M / post_max_size：50M</td>
        </tr>
      </tbody>
    </table>

    <div class="home_title">
      开发团队：
    </div>

    <table width="100%">
      <tbody class="tpt—index" border='0'>
        <tr>
          <td width="110px">版权所有</td>
          <td>亿动华源</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

</script>

<style scoped>
  .home_title {
    margin-bottom: 10px;
    padding: 10px;
    line-height: 22px;
    font-size: 14px;
    color: #333;
    border-left: 5px solid #009688;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
    margin-top: 15px;
    border-radius: 5px;
  }

  .fwq {
    font-size: 14px;
    color: #333;
    margin: 15px auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    color: #333;
  }

  .tpt—index tr {
    font-size: 13px;
    line-height: 38px;
    border-bottom: 1px solid rgb(234, 234, 234);
  }

  .tpt—index td:nth-child(1) {
    width: 170px;
    text-align: left;
    /* background: darkcyan; */
  }
  .cont {
    width: 98%;
    background: #fff;
    height: auto;
    margin: 0 auto;
  }
</style>
