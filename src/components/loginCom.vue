<template>
  <el-dialog
    @close="closeHandle"
    width="1060px"
    :show-close="true"
    custom-class="login-modal"
    v-model="loginStatusFlag"
  >
    <div class="login-main">
      <div class="login-intro">
        <div class="big-title">入全球5亿用户，即刻开启标书制作</div>
        <div class="bracket-info">(标书制作神器 / 1小时做出好标书)</div>
        <div class="intro-wrapper">
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>10万+模版、素材，每日更新</div>
          </div>
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>上传素材，收藏模版、素材，提高工作效率</div>
          </div>
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>公司资质管理，一次管理，永久使用</div>
          </div>
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>上传素材，收藏模版、素材，轻松管理</div>
          </div>
        </div>

        <div class="big-title">丰富的标书模版库</div>
        <div class="bracket-info">(常见标书一键导入 / 常见标书一键导入)</div>

        <div class="big-title">格式统一</div>
        <div class="intro-wrapper">
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>标书格式统一配置，防止多人协作标书格式混乱</div>
          </div>
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>打印格式统一设置，满足各种打印需求</div>
          </div>
          <div class="intro-item">
            <div class="circle-point"></div>
            <div>支持多人在线编辑，工作更高效</div>
          </div>
        </div>
      </div>
      <div class="login-info">
        <div class="login-main-wrapper">
          <!--密码登录-->
          <div v-if="loginWay === 'pwdLogin'" class="pwd-login-part">
            <div class="part-name">密码登录</div>
            <el-form ref="pwdLoginForm" :model="form" :rules="rules">
              <el-form-item prop="tel">
                <el-input
                  v-model="form.tel"
                  :autocomplete="true"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  @keydown.enter="loginHandle('pwdForm')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="flex-wrapper">
                  <el-checkbox v-model="form.rememberPwd">记住登录</el-checkbox>
                  <div @click="changeLoginWay('forgetPwd')" class="forget-btn">
                    忘记密码
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="gray-tips">
                  *未注册的手机号或第三方账号验证后将自动创建账号
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loginFlag"
                  :disabled="loginFlag"
                  class="login-btn"
                  type="primary"
                  @click="loginHandle(pwdLoginForm)"
                  >登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="login-way-text">
              <div class="gray-line"></div>
              <div class="login-txt">登录方式</div>
              <div class="gray-line"></div>
            </div>
            <div class="login-type-choose">
              <div @click="changeLoginWay('wxLogin')" class="choose-item">
                <img src="../assets/login/login_wx.png" alt="" />
                <div>微信</div>
              </div>
              <div @click="changeLoginWay('codeLogin')" class="choose-item">
                <img src="../assets/login/login_code.png" alt="" />
                <div>验证码登录</div>
              </div>
            </div>
          </div>
          <!--验证码登录-->
          <div v-if="loginWay === 'codeLogin'" class="pwd-login-part">
            <div class="part-name">验证码登录</div>
            <el-form
              ref="codeLoginForm"
              :model="form"
              :rules="rules"
              @submit.prevent
            >
              <el-form-item prop="tel">
                <el-input
                  v-model="form.tel"
                  autocomplete="off"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <div class="validate-code-wrapper">
                  <el-input
                    @keydown.enter="loginHandle(codeLoginForm)"
                    v-model="form.code"
                    maxlength="4"
                    minlength="4"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <div
                    @click="sendValidateCode(codeLoginForm)"
                    :class="{ 'code-btn': true, isSend: sendFlag }"
                  >
                    {{ validatorText }}
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="gray-tips code-login-tips">
                  *未注册的手机号或第三方账号验证后将自动创建账号
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loginFlag"
                  :disabled="loginFlag"
                  class="login-btn"
                  type="primary"
                  @click="loginHandle(codeLoginForm)"
                  >登录
                </el-button>
              </el-form-item>
            </el-form>
            <div class="login-way-text">
              <div class="gray-line"></div>
              <div class="login-txt">登录方式</div>
              <div class="gray-line"></div>
            </div>

            <div class="login-type-choose">
              <div @click="changeLoginWay('wxLogin')" class="choose-item">
                <img src="../assets/login/login_wx.png" alt="" />
                <div>微信</div>
              </div>
              <div @click="changeLoginWay('pwdLogin')" class="choose-item">
                <img src="../assets/login/login_pwd.png" alt="" />
                <div>密码登录</div>
              </div>
            </div>
          </div>
          <!--微信扫码登录/注册-->
          <div v-if="loginWay === 'wxLogin'" class="pwd-login-part">
            <div class="part-name">微信扫码登录/注册</div>
            <img
              class="wx-login-code"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fandroid-artworks.25pp.com%2Ffs08%2F2019%2F02%2F26%2F7%2F110_8559bd4db400e4565c4baa228475ef4a_con.png&refer=http%3A%2F%2Fandroid-artworks.25pp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631945267&t=c6a9081640f9525e97921ac2fffb5594"
              alt=""
            />
            <div class="login-way-text">
              <div class="gray-line"></div>
              <div class="login-txt">登录方式</div>
              <div class="gray-line"></div>
            </div>

            <div class="login-type-choose">
              <div @click="changeLoginWay('pwdLogin')" class="choose-item">
                <img src="../assets/login/login_pwd.png" alt="" />
                <div>密码登录</div>
              </div>
              <div @click="changeLoginWay('codeLogin')" class="choose-item">
                <img src="../assets/login/login_code.png" alt="" />
                <div>验证码登录</div>
              </div>
            </div>
          </div>
          <!--忘记密码-->
          <div v-if="loginWay === 'forgetPwd'" class="pwd-login-part">
            <div class="part-name">忘记密码</div>
            <el-form :model="form" :rules="rules" ref="forgetPwdForm">
              <el-form-item prop="tel">
                <el-input
                  v-model="form.tel"
                  autocomplete="off"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <div class="validate-code-wrapper">
                  <el-input
                    v-model="form.code"
                    maxlength="4"
                    minlength="4"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <div
                    @click="sendForPwdValidateCode(forgetPwdForm)"
                    :class="{ 'code-btn': true, isSend: sendForPwdFlag }"
                  >
                    {{ validatorForPwdText }}
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-input
                  @keydown.enter="forPwdHandle(forgetPwdForm)"
                  type="password"
                  v-model="form.password"
                  autocomplete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="back-login" @click="changeLoginWay('pwdLogin')">
                  返回登录
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="forPwdFlag"
                  :disabled="forPwdFlag"
                  @click="forPwdHandle(forgetPwdForm)"
                  class="login-btn"
                  type="primary"
                  >确定
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--注册-->
          <div v-if="loginWay === 'register'" class="pwd-login-part">
            <div class="part-name">手机号注册</div>
            <el-form :model="form" :rules="rules" ref="refisterForm">
              <el-form-item prop="tel">
                <el-input
                  v-model="form.tel"
                  autocomplete="off"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <div class="validate-code-wrapper">
                  <el-input
                    v-model="form.code"
                    maxlength="4"
                    minlength="4"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <div
                    @click="sendRegisterValidateCode(refisterForm)"
                    :class="{ 'code-btn': true, isSend: sendRegisterFlag }"
                  >
                    {{ validatorRegisterText }}
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-input
                  @keydown.enter="registerHandle(refisterForm)"
                  type="password"
                  v-model="form.password"
                  autocomplete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="back-login" @click="changeLoginWay('pwdLogin')">
                  返回登录
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="registerFlag"
                  :disabled="registerFlag"
                  @click="registerHandle(refisterForm)"
                  class="login-btn"
                  type="primary"
                  >注册
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div
          class="agreement-wrapper"
          v-if="loginWay !== 'register' && loginWay !== 'forgetPwd'"
        >
          <div class="agreement">
            登录即同意
            <nuxt-link
              :to="
                '/declarationPage/' +
                userPolicy.articleId +
                '?title=' +
                userPolicy.title
              "
            >
              {{ userPolicy.title }}
            </nuxt-link>
            和
            <nuxt-link
              :to="
                '/declarationPage/' +
                privacyPolicy.articleId +
                '?title=' +
                privacyPolicy.title
              "
            >
              {{ privacyPolicy.title }}
            </nuxt-link>
          </div>
          <div class="no-account">
            没有账号？<span @click="changeLoginWay('register')">手机注册</span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import loginHook from "../hooks/components/login";

export default defineComponent({
  name: "loginCom",
  setup() {
    let loginHooks = loginHook();
    onMounted(() => {});
    return loginHooks;
  },
});
</script>

<style lang="less">
.login-modal {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 20px;
  background: none !important;

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0;
    height: 640px;

    .login-main {
      height: 100%;
      display: flex;

      .login-intro {
        border-radius: 20px 0 0 20px;
        min-width: 530px;
        background: url("../assets/login/login_bj@2x.png");
        background-size: 100% 100%;
        padding-left: 50px;
        color: #ffffff;

        .big-title {
          margin: 71px 0 9px 0;
          font-size: 24px;
          font-weight: bold;
        }

        .bracket-info {
          font-size: 13px;
          font-weight: 500;
        }

        .intro-wrapper {
          margin-top: 26px;

          .intro-item {
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #e4f0ff;
            margin-bottom: 10px;

            &:last-child {
              margin: 0;
            }

            .circle-point {
              width: 3px;
              height: 3px;
              background: #e4f0ff;
              border-radius: 50%;
              margin-right: 6px;
            }
          }
        }
      }

      .login-info {
        background: #fafafa;
        width: 100%;
        border-radius: 0px 20px 20px 0px;
        padding: 65px 65px 0 65px;

        .login-main-wrapper {
          background: #ffffff;
          box-shadow: 0px 13px 22px 2px rgba(196, 204, 212, 0.35);
          border-radius: 10px;
          width: 100%;
          height: 510px;
          padding: 0 50px;

          .pwd-login-part {
            .part-name {
              font-size: 24px;
              font-weight: bold;
              color: #333333;
              text-align: center;
              padding: 40px 0 30px 0;
            }

            .wx-login-code {
              width: 220px;
              height: 220px;
              margin: 15px 0 13px 40px;
            }

            .el-form-item__content {
              line-height: 1;

              .flex-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .el-checkbox {
                  font-size: 14px;
                  color: #333333;
                }

                .forget-btn {
                  cursor: pointer;
                  color: #156bfe;
                }
              }

              .gray-tips {
                font-size: 12px;
                font-weight: 400;
                color: #969696;
                text-align: center;
                margin-top: 10px;

                &.code-login-tips {
                  margin-top: 50px;
                }
              }

              .login-btn {
                width: 289px;
                height: 46px;
                border-radius: 4px;
              }

              .back-login {
                cursor: pointer;
                font-size: 14px;
                font-weight: 400;
                color: #156bfe;
                text-align: right;
                margin-bottom: 14px;
              }

              /*发送验证码*/

              .validate-code-wrapper {
                position: relative;

                .code-btn {
                  position: absolute;
                  top: 14px;
                  right: 21px;
                  cursor: pointer;
                  font-size: 14px;
                  color: #156bfe;
                  border-left: 1px solid #b8b8b8;
                  padding-left: 14px;

                  &.isSend {
                    color: #a9a9a9 !important;
                  }
                }
              }
            }

            .login-way-text {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: #9d9d9d;
              margin: 20px 0 20px 0;

              .gray-line {
                width: 14px;
                height: 2px;
                background: #b8b8b8;
              }

              .login-txt {
                margin: 0 6px;
              }
            }

            .login-type-choose {
              display: flex;
              align-items: center;
              justify-content: center;

              .choose-item {
                cursor: pointer;
                text-align: center;
                width: 80px;
                font-size: 12px;
                font-weight: 400;
                color: #969696;

                &:hover {
                  color: @activeColor;
                }

                img {
                  width: 42px;
                  height: 42px;
                  margin-bottom: 6px;
                }
              }
            }
          }
        }

        .agreement-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 23px 15px 0 15px;
          font-size: 13px;
          font-weight: 500;
          color: #5e6673;

          a {
            color: #0076f7;
            text-decoration: none;
          }

          span {
            cursor: pointer;
            color: #0076f7;
          }
        }
      }
    }
  }
}
</style>
