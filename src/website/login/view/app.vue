<template>
  <div class="login-box">
    <h1>登 陆</h1>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input v-model="loginForm.password" placeholder="请填写登陆密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="login">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fnencrypt, fndecrypt } from 'src/common/assets/js/rsa-key.js'
import Banner from 'src/common/assets/images/banner.jpeg'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const mchtInfEnterprise = {
        busiScope:'文化艺术交流策划咨询、商务信息咨询\u0028除经纪\u0029设计制作代理发布各类广告展览展示服务会务服务礼仪服务包装服务市场营销策划企业形象策划公关活动策划舞台设计建筑设计动漫设计室内外装潢设计网页设计制作自有设备租赁\u0028不得从事金融租赁\u0029工艺礼品照明器材音响设备销售[依法须经批准的项目经相关部门批准后方可开展经营活动]登记机关★2016年09月27日',
        companyType:'02',
        docInfList:[
          {
            docDesc:'',
            docFileKey:'685065302882385920',
            docName:'照片营业执照-1.3M.jpg',
            docType:'04A'
          }
        ],
        expiryDateBegin:1404316800000,
        expiryDateEnd:2035382400000,
        foundDate:1404316800000,
        longEffective:'0',
        mchtNo:'LG2002000061',
        nameEn:'shanghai junhang company',
        nameZh:'上海君杭文化传播有限公司',
        regAddr:'上海市金山区枫泾镇环东一路65弄2号3598室',
        regCapital:'1234.56',
        regCapitalCurrency:'CNY',
        regCountryCode:'CHN',
        signinId:'000001',
        usciCode:'91310116398747728K'
      }
      const legalInfList = [
        {
          address:'庆市大庆区大庆路1号',
          agentRelate:'01',
          birthDate:848764800000,
          certNo:'123456199611245678',
          certRegion:'CHN',
          certType:'01',
          docInfList:[
            {
              docDesc:'',
              docFileKey:'686620590341095424',
              docName:'身份证反面.png',
              docType:'01A'
            },
            {
              docDesc:'',
              docFileKey:'686620621995507712',
              docName:'身份证正面.png',
              docType:'01B'
            }
          ],
          expiryDateBegin:1127145600000,
          expiryDateEnd:1758297600000,
          gender:'0',
          id:'686888107055775744',
          infType:'01',
          longEffective:'0',
          mchtNo:'LG2002000061',
          nameEn:'xiaoyi yang',
          nameZh:'小易',
          orderNo:'0',
          signinId:'000001',
          soleBeneficiary:'00'
        },
        {
          address:'甘肃省临泽县新华镇大寨村社39号',
          birthDate:568051200000,
          certNo:'622224198801025028',
          certRegion:'CHN',
          certType:'01',
          docInfList:[
            {
              docDesc:'',
              docFileKey:'686602878407671808',
              docName:'身份证反面02.png',
              docType:'01A'
            },
            {
              docDesc:'',
              docFileKey:'686602943062867968',
              docName:'身份证正面02.png',
              docType:'01B'
            }
          ],
          expiryDateBegin:1490976000000,
          expiryDateEnd:1806508800000,
          gender:'1',
          id:'686888107055775745',
          infType:'02',
          longEffective:'0',
          mchtNo:'LG2002000061',
          nameEn:'zhao ping',
          nameZh:'赵萍',
          orderNo:'0',
          signinId:'000001'
        },
        {
          address:'甘肃省临泽县新华镇大寨村社39号',
          birthDate:568051200000,
          certNo:'622224198801025028',
          certRegion:'CHN',
          certType:'01',
          docInfList:[
            {
              docDesc:'',
              docFileKey:'686887265430929408',
              docName:'身份证反面02.png',
              docType:'01A'
            },
            {
              docDesc:'',
              docFileKey:'686887367872610304',
              docName:'身份证正面02.png',
              docType:'01B'
            },
            {
              docDesc:'',
              docFileKey:'686887402144268288',
              docName:'手持身份证.jpeg',
              docType:'01C'
            },
            {
              docFileKey:'686887457341308928',
              docName:'手持身份证.jpg',
              docType:'08A'
            }
          ],
          expiryDateBegin:1490976000000,
          expiryDateEnd:1806508800000,
          gender:'1',
          id:'686888107055775746',
          infType:'03',
          longEffective:'0',
          mchtNo:'LG2002000061',
          nameEn:'zhao ping',
          nameZh:'赵萍',
          orderNo:'0',
          signinId:'000001'
        }
      ]
      const password = {
        username: 'test08@lakala.com',
        password: '1234#abc',
        challenge: 'f2e76282438da32bce8730ccdb8bcf04m8',
        validate: '096973736378807bcc9b7e9a792ab201',
        seccode: '096973736378807bcc9b7e9a792ab201|jordan'
      };
      const encryptedEnterprise = fnencrypt(JSON.stringify(mchtInfEnterprise))
      const encryptedLegalList = fnencrypt(JSON.stringify(legalInfList))
      const passwordObj = fnencrypt(JSON.stringify(password))
      const origialParams = {
        mchtInfEnterpriseRespDto: encryptedEnterprise,
        legalInfListDto: encryptedLegalList
      }
      // console.group()
      // console.log(encryptedEnterprise)
      // console.log(encryptedLegalList)
      // console.log(origialParams)
      // console.groupEnd()

      const { mchtInfEnterpriseRespDto, legalInfListDto } = origialParams
      const unencryptedEnterprise = JSON.parse(fndecrypt(mchtInfEnterpriseRespDto))
      const unencryptedLegalList = JSON.parse(fndecrypt(legalInfListDto))
      const unencryptedPassword = JSON.parse(fndecrypt(passwordObj))
      const parsedParams = {
        unencryptedEnterprise,
        unencryptedLegalList
      }
      console.group()
      console.log(unencryptedEnterprise)
      console.log(unencryptedLegalList)
      console.log(parsedParams)
      console.log(unencryptedPassword)
      console.groupEnd()
      if (this.loginForm.password === '1234#abc') {
        location.href = '../console/home.html'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 270px;
  height: 280px;
  > h1 {
    text-align: center;
  }
}
</style>
