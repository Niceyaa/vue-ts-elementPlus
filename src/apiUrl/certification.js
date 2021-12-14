export default {
    //营业执照---查询公司基本信息
    getEnterpriseBaseInfo: {
        url: '/smartbiddoc-qualify/api/companyBase/queryCompanyBaseByToken',
        method: 'post'
    },

//营业执照---添加公司基本信息
    addEnterpriseBaseInfo: {
        url: '/smartbiddoc-qualify/api/companyBase/addCompanyBase',
        method: 'post'
    },

//营业执照---编辑公司基本信息
    updateEnterpriseBaseInfo: {
        url: '/smartbiddoc-qualify/api/companyBase/editCompanyBase',
        method: 'post'
    },

//开户许可证---获取详情
    getOpenAccountLicense: {
        url: '/smartbiddoc-qualify/api/accountPermission/queryAccPermissionByToken',
        method: 'post'
    },

//开户许可证---编辑
    addOpenAccountLicense: {
        url: '/smartbiddoc-qualify/api/accountPermission/addAccountPermission',
        method: 'post'
    },

//开户许可证---添加
    updateOpenAccountLicense: {
        url: '/smartbiddoc-qualify/api/accountPermission/editAccountPermission',
        method: 'post'
    },

//法人信息---添加
    addLegalRepresentative: {
        url: '/smartbiddoc-qualify/api/legalPerson/addLegalPerson',
        method: 'post'
    },

//法人信息---编辑
    updateLegalRepresentative: {
        url: '/smartbiddoc-qualify/api/legalPerson/editLegalPerson',
        method: 'post'
    },

//法人信息---查看
    getLegalRepresentative: {
        url: '/smartbiddoc-qualify/api/legalPerson/queryLegalPersonById',
        method: 'post'
    },

//人员列表---查询
    getMemberList: {
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonPageList',
        method: 'post'
    },

//人员列表---基本信息---添加
    addUserBaseInfo: {
        url: '/smartbiddoc-qualify/api/person/addPerson',
        method: 'post'
    },

//人员列表---基本信息---编辑
    updateUserBaseInfo: {
        url: '/smartbiddoc-qualify/api/person/editPersonInfo',
        method: 'post'
    },

//人员列表---基本信息---删除
    deleteUserBaseInfo: {
        url: '/smartbiddoc-qualify/api/person/delPersonInfo',
        method: 'post'
    },

//人员资质分类---自定义---添加
    addUserSelfCerClassify: {
        url: '/smartbiddoc-qualify/api/personQualify/addPersonQualifyType',
        method: 'post'
    },

//人员资质分类---自定义---查询
    getUserSelfCerClassify: {
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyTypeList',
        method: 'post'
    },

//人员资质分类---自定义---编辑
    updateUserSelfCerClassify: {
        url: '/smartbiddoc-qualify/api/personQualify/editPersonQualifyType',
        method: 'post'
    },

//人员资质分类---自定义---删除
    deleteUserSelfCerClassify: {
        url: '/smartbiddoc-qualify/api/personQualify/delPersonQualifyType',
        method: 'post'
    },

//人员资质分类---自定义---树形查询
    getSelfCerClassifyTree: {
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyTree',
        method: 'post'
    },

//人员资质分类---系统分类---身份信息---添加
    addLicenseInfo: {
        url: '/smartbiddoc-qualify/api/person/addPersonIdentity',
        method: 'post'
    },


//人员资质分类---系统分类---身份信息---编辑
    updateLicenseInfo: {
        url: '/smartbiddoc-qualify/api/person/editPersonIdentity',
        method: 'post'
    },


//人员资质分类---系统分类---身份信息---查询
    getLicenseInfo: {
        url: '/smartbiddoc-qualify/api/person/queryPersonIdentity',
        method: 'post'
    },


//人员资质分类---系统分类---学历信息---新增
    addEducationInfo: {
        url: '/smartbiddoc-qualify/api/person/addPersonEdu',
        method: 'post'
    },


//人员资质分类---系统分类---学历信息---编辑
    updateEducationInfo: {
        url: '/smartbiddoc-qualify/api/person/editPersonEdu',
        method: 'post'
    },


//人员资质分类---系统分类---学历信息---查询
    getEducationInfo: {
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonEdu',
        method: 'post'
    },


//人员资质分类---系统分类---基本信息---查询
    getUserBaseInfo: {
        url: '/smartbiddoc-qualify/api/person/apiQueryPerson',
        method: 'post'
    },


//人员资质分类---系统分类---职称信息---新增
    addPositionInfo: {
        url: '/smartbiddoc-qualify/api/person/addPersonPost',
        method: 'post'
    },


//人员资质分类---系统分类---职称信息---编辑
    updatePositionInfo: {
        url: '/smartbiddoc-qualify/api/person/editPersonPost',
        method: 'post'
    },


//人员资质分类---系统分类---职称信息---查询
    getPositionInfo: {
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonPostList',
        method: 'post'
    },


//人员资质分类---系统分类---职称信息---删除
    deletePositionInfo: {
        url: '/smartbiddoc-qualify/api/person/delPersonPost',
        method: 'post'
    },


//人员资质分类---社保信息---添加
    addSocialSecurityInfo: {
        url: '/smartbiddoc-qualify/api/person/addPersonSocialSecurity',
        method: 'post'
    },


//人员资质分类---社保信息---编辑
    updateSocialSecurityInfo: {
        url: '/smartbiddoc-qualify/api/person/editPersonSocialSecurity',
        method: 'post'
    },


//人员资质分类---社保信息---查询
    getSocialSecurityInfo: {
        url: '/smartbiddoc-qualify/api/person/apiQueryPersonSocialSecurity',
        method: 'post'
    },


//人员资质分类---自定义资质分类---添加附件
    addSelfCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/addPersonQualifyEnc',
        method: 'post'
    },


//人员资质分类---自定义资质分类---查询附件
    getSelfCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryPersonQualifyEncList',
        method: 'post'
    },


//人员资质分类---自定义资质分类---删除附件
    deleteSelfCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/delPersonQualifyEnc',
        method: 'post'
    },


//公司资质---财务报表---查询
    getFinancialStatement: {
        url: '/smartbiddoc-qualify/api/reportForm/apiQueryReportFormListPage',
        method: 'post'
    },


//公司资质---财务报表---添加
    addFinancialStatement: {
        url: '/smartbiddoc-qualify/api/reportForm/addReportForm',
        method: 'post'
    },


//公司资质---财务报表---编辑
    updateFinancialStatement: {
        url: '/smartbiddoc-qualify/api/reportForm/editReportForm',
        method: 'post'
    },


//公司资质---财务报表---删除
    deleteFinancialStatement: {
        url: '/smartbiddoc-qualify/api/reportForm/delReportForm',
        method: 'post'
    },


//公司资质---财务报表附件---添加
    addFinancialStatementFile: {
        url: '/smartbiddoc-qualify/api/reportForm/addReportFormEnc',
        method: 'post'
    },


//公司资质---财务报表附件---查询
    getFinancialStatementFile: {
        url: '/smartbiddoc-qualify/api/reportForm/apiQueryReportFormEnc',
        method: 'post'
    },


//公司资质---财务报表附件---删除
    deleteFinancialStatementFile: {
        url: '/smartbiddoc-qualify/api/reportForm/delReportFormEnc',
        method: 'post'
    },


//公司资质---业绩管理---删除
    deletePerformance: {
        url: '/smartbiddoc-qualify/api/perForm/delPerForm',
        method: 'post'
    },


//公司资质---业绩管理---添加
    addPerformance: {
        url: '/smartbiddoc-qualify/api/perForm/addPerForm',
        method: 'post'
    },


//公司资质---业绩管理---删除
    getPerformance: {
        url: '/smartbiddoc-qualify/api/perForm/queryPerFormPageList',
        method: 'post'
    },


//公司资质---业绩管理---删除
    updatePerformance: {
        url: '/smartbiddoc-qualify/api/perForm/editPerForm',
        method: 'post'
    },


//公司资质---业绩类型---树形结构查询
    getPerformanceTypeTree: {
        url: '/smartbiddoc-qualify/api/perFormType/apiQueryPerFormTypeTreeList',
        method: 'post'
    },


//公司资质---业绩类型---添加
    addPerformanceType: {
        url: '/smartbiddoc-qualify/api/perFormType/addPerFormType',
        method: 'post'
    },


//公司资质---业绩类型---删除
    deletePerformanceType: {
        url: '/smartbiddoc-qualify/api/perFormType/delPerFormType',
        method: 'post'
    },


//公司资质---业绩类型---修改
    updatePerformanceType: {
        url: '/smartbiddoc-qualify/api/perFormType/editPerFormType',
        method: 'post'
    },


//公司资质---业绩类型---查询
    getPerformanceType: {
        url: '/smartbiddoc-qualify/api/perFormType/queryPerFormTypeList',
        method: 'post',
    },


//公司资质---业绩类型---查询
    changePerformanceTypeStatus: {
        url: '/smartbiddoc-qualify/api/perFormType/isUseState',
        method: 'post',
    },


//公司资质---业绩附件---查询
    getPerformFile: {
        url: '/smartbiddoc-qualify/api/prFormEnc/apiQueryPerFormEncList',
        method: 'post'
    },


//公司资质---业绩附件---删除
    deletePerformFile: {
        url: '/smartbiddoc-qualify/api/prFormEnc/delPerFormEnc',
        method: 'post'
    },


//公司资质---业绩附件---上传
    uploadPerformFile: {
        url: '/smartbiddoc-qualify/api/prFormEnc/addPerFormEnc',
        method: 'post',
    },

//公司资质类型---新增
    addCompanyCerType: {
        url: '/smartbiddoc-qualify/api/personQualify/addCompanyQualifyType',
        method: 'post',
    },


//公司资质类型---查询
    getCompanyCerTypeTree: {
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryCompanyQualifyTree',
        method: 'post',
    },

//公司资质类型---编辑
    updateCompanyCerType: {
        url: '/smartbiddoc-qualify/api/personQualify/editCompanyQualifyType',
        method: 'post',
    },


//公司资质类型---删除
    deleteCompanyCerType: {
        url: '/smartbiddoc-qualify/api/personQualify/delCompanyQualifyType',
        method: 'post',
    },


//公司资质类型---附件管理---添加
    addCompanyCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/addCompanyQualifyEnc',
        method: 'post',
    },


//公司资质类型---附件管理---查询
    getCompanyCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/queryCompanyQualifyEnc',
        method: 'post',
    },


//公司资质类型---附件管理---添加
    deleteCompanyCerFile: {
        url: '/smartbiddoc-qualify/api/personQualify/delCompanyQualifyEnc',
        method: 'post',
    },


//公司资质类型---排序
    sortApi: {
        url: '/smartbiddoc-qualify/api/personQualify/sortCompanyQualifyType',
        method: 'post'
    },


//人员资质---查询人员信息表字段
    getPersonField: {
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonField',
        method: 'post',
    },


//人员资质---查询人员列表
    getPersonList: {
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonPageList',
        method: 'post',
    },


//人员资质---查询人员资质类别
    getPersonCerType: {
        url: '/smartbiddoc-qualify/api/makingBids/apiQueryPersonalMaterialCategory',
        method: 'post',
    },


//人员资质---插入资质信息，制作标书
    insertCerInfo: {
        url: '/smartbiddoc-qualify/api/makingBids/apiMakingBidsInsertQualification',
        method: 'post',
    },


//业绩---插入业绩信息，制作标书
    insertPerformInfo: {
        url: '/smartbiddoc-qualify/api/makingBids/apiMakingBidsInsertPerformance',
        method: 'post',
    },


//业绩---批量删除类型和附件
    multiplePerformInfo: {
        url: '/smartbiddoc-qualify/api/perFormType/batchDelPerFormTypeAndEnc',
        method: 'post',
    },


//自定义资质查询--每次返回一级
    getSelfCertification: {
        url: '/smartbiddoc-qualify/api/personQualify/apiQueryCompanyQualifyOneList',
        method: 'post',
    },


//业绩类型和附件统一查询--每次返回一级
    getPerformTypeAndFile: {
        url: '/smartbiddoc-qualify/api/perFormType/apiQueryPerFormOneList',
        method: 'post',
    },


//公司资质--批量删除
    multipleDeleteCer: {
        url: '/smartbiddoc-qualify/api/personQualify/batchDelCompanyQualifyTypeAndEnc',
        method: 'post',
    },
}
