/*
 * @Description:
 * @Autor: fy
 * @Date: 2021-09-16 15:11:42
 * @LastEditors: fy
 * @LastEditTime: 2021-09-17 10:03:38
 */
export const customJson = [
  {
    id: 1,
    required: true,
    name: '单行文本',
    type: 'text',
    placeholder: '单行文本',
    max: '140',
    value: '今天',
  },
  {
    id: 2,
    name: '多行文本',
    type: 'textarea',
    placeholder: '多行文本',
    max: '140',
  },
  { id: 3, name: '数字', type: 'number', placeholder: '数字', isInput: true },
  { id: 4, name: '金额', type: 'money', placeholder: '金额', isInput: true },
  {
    id: 5,
    name: '单选框',
    type: 'radio',
    placeholder: '单选框',
    items: [
      { id: 1, value: '单选框1' },
      { id: 2, value: '单选框2' },
    ],
  },
  {
    id: 6,
    name: '多选框',
    type: 'checkbox',
    placeholder: '多选框',
    items: [
      { id: 1, value: '多选框1' },
      { id: 2, value: '多选框2' },
      { id: 3, value: '多选框3' },
      { id: 4, value: '多选框4' },
      { id: 5, value: '多选框5' },
    ],
  },
  { id: 7, name: '日期', type: 'date', placeholder: '日期' },
  {
    id: 8,
    name: '开始时间',
    type: 'dateArea',
    startText: '开始时间',
    endText: '结束时间',
    placeholder: '请选择',
    overToday: true,
  },
  { id: 9, name: '附件', type: 'file', placeholder: '附件' },
  { id: 21, name: '部门', type: 'department', placeholder: '部门' },
  { id: 22, name: '员工', type: 'partner', placeholder: '员工' },
  { id: 23, name: '城市', type: 'city', placeholder: '城市' },
  {
    id: 26,
    name: '总',
    type: 'money',
    placeholder: '自动计算',
    count: [
      { index: 13, fIndex: 0 },
      { value: '+', type: 'operator' },
      { index: 13, fIndex: 1 },
    ],
    linked: [],
  },
  {
    id: 24,
    name: '明细',
    type: 'multiple',
    placeholder: '明细',
    conf: [
      {
        id: 10,
        name: '数字',
        text: 'A',
        type: 'money',
        placeholder: '自动计算',
        isInput: false,
        editMode: 0,
        data: [],
        count: [
          { index: 13, fIndex: 1 },
          { value: '+', type: 'operator' },
          { index: 13, fIndex: 2 },
        ],
        linked: [{ index: 12 }],
      },
      {
        id: 11,
        name: '金额',
        text: 'B',
        type: 'money',
        placeholder: '金额',
        isInput: true,
        data: [],
        linked: [{ index: 12 }, { index: 13, fIndex: 0 }],
      },
      {
        id: 12,
        name: '金额',
        text: 'C',
        type: 'money',
        placeholder: '金额',
        isInput: true,
        data: [],
        linked: [{ index: 13, fIndex: 0 }],
      },
    ],
  },
]

export const flowJson = [
  {
    id: '432158441147076608',
    activated: 1,
    createBy: null,
    createAt: null,
    updateBy: null,
    updateAt: null,
    billId: null,
    sort: 0,
    status: null,
    wayVal: null,
    workVal: null,
    workPeople: null,
    type: 'APPLY',
    auditUserType: null,
    billFlowCheckDTOList: [
      {
        id: '432158441147076609',
        activated: 1,
        createBy: null,
        createAt: null,
        updateBy: null,
        updateAt: null,
        billId: null,
        billFlowId: '432158441147076608',
        userId: '428967346779066368',
        status: null,
        reason: null,
        isReplace: null,
        userDTO: {
          id: '428967346779066368',
          activated: 1,
          createBy: '428967346779066368',
          createAt: '1631082095300',
          updateBy: '428967346779066368',
          updateAt: '1631781635379',
          unionid: null,
          phone: '13823308546',
          password:
            '$2a$10$ihjgh3kfRP/4.7E.WmEqsuLB/35kUjOrZ35rrdwih/YZyIy0Qyzxm',
          avatar:
            'https://renhua-invoice-oss.oss-cn-shenzhen.aliyuncs.com/file/defaultAvatar/dev/428967346779066368.png?number=0.1820078443311156',
          realname: '13823308546-北京锦益网络科技有限公司',
          nickname: null,
          gender: 0,
          data: null,
          token: null,
          roles: [],
          company: null,
          roleId: null,
          roleName: null,
          departmentName: null,
          dingUnionid: null,
          hasPassword: null,
          companyList: null,
          dingData: null,
          corpid: null,
          dingStatus: null,
          userId: '428967346779066368',
          level: 1,
          departmentId: null,
          superAdmin: null,
          jobNumber: null,
          userActivated: true,
          appleUserid: null,
          authorities: null,
          name: '13823308546-北京锦益网络科技有限公司',
          isMainDepartment: null,
          dnameAndPName: null,
        },
        auditAt: null,
        isSee: null,
        fileJson: null,
        canDelUser: false,
        statusName: null,
        fileList: null,
      },
    ],
    isReplace: false,
    approvalDirection: 'APPLY',
    reason: null,
    flowName: '发起人',
    typeName: '发起人',
    canAddUser: false,
    defaultUserIdList: null,
    defaultUserList: null,
    customUserIdList: null,
    customUserList: null,
    nodeId: null,
    approvalEdit: null,
    wayValName: null,
    statusName: null,
  },
  {
    id: '432158441134493696',
    activated: 1,
    createBy: '428967346779066368',
    createAt: null,
    updateBy: '428967346779066368',
    updateAt: null,
    billId: null,
    sort: 1,
    status: 'WAIT',
    wayVal: 'ORDINAL',
    workVal: null,
    workPeople: null,
    type: 'VERIFY',
    auditUserType: null,
    billFlowCheckDTOList: [
      {
        userDTO: {
          id: '428967346779066368',
          activated: 1,
          createBy: null,
          createAt: '1631082292475',
          updateBy: null,
          updateAt: '1631781635387',
          companyId: '428968169764425728',
          roleId: '94067898653500332',
          roleType: 'ADMIN',
          roleName: '超级管理员',
          userId: '428967346779066368',
          status: 1,
          role: 'ADMIN',
          jobNumber: '001',
          name: '13823308546',
          allowedLogin: 1,
          phone: '13823308546',
          departmentId: '0',
          departmentName: null,
          avatar:
            'https://renhua-invoice-oss.oss-cn-shenzhen.aliyuncs.com/file/defaultAvatar/dev/428967346779066368.png?number=0.1820078443311156',
          level: 1,
          isLeader: 0,
          canSee: null,
          positionName: '普通员工',
          userActivated: true,
          pid: null,
          departmentIds: ['0'],
          departmentDTOS: null,
          manageDepartmentIds: null,
          manageDepartmentDTOS: null,
          roleIds: ['94067898653500332'],
          roleDTOS: [
            {
              id: '94067898653500332',
              name: '超级管理员',
              list: null,
              isDefault: false,
              companyId: '0',
              roleType: 'ADMIN',
              viewType: null,
            },
          ],
          realname: '13823308546',
          select: true,
          disabled: false,
        },
        canDelUser: true,
        userId: '428967346779066368',
      },
    ],
    isReplace: false,
    approvalDirection: null,
    reason: null,
    flowName: '主管审批',
    typeName: '主管审批',
    canAddUser: true,
    defaultUserIdList: null,
    defaultUserList: null,
    customUserIdList: null,
    customUserList: null,
    nodeId: '345653208544317442',
    approvalEdit: false,
    wayValName: '依次审批',
    statusName: '等待',
  },
  {
    id: '432158441134493697',
    activated: 1,
    createBy: '428967346779066368',
    createAt: null,
    updateBy: '428967346779066368',
    updateAt: null,
    billId: null,
    sort: 1,
    status: 'WAIT',
    wayVal: 'ORDINAL',
    workVal: null,
    workPeople: null,
    type: 'VERIFY',
    auditUserType: null,
    billFlowCheckDTOList: [
      {
        userDTO: {
          id: '428967346779066368',
          activated: 1,
          createBy: null,
          createAt: '1631082292475',
          updateBy: null,
          updateAt: '1631781635387',
          companyId: '428968169764425728',
          roleId: '94067898653500332',
          roleType: 'ADMIN',
          roleName: '超级管理员',
          userId: '428967346779066368',
          status: 1,
          role: 'ADMIN',
          jobNumber: '001',
          name: '13823308546',
          allowedLogin: 1,
          phone: '13823308546',
          departmentId: '0',
          departmentName: null,
          avatar:
            'https://renhua-invoice-oss.oss-cn-shenzhen.aliyuncs.com/file/defaultAvatar/dev/428967346779066368.png?number=0.1820078443311156',
          level: 1,
          isLeader: 0,
          canSee: null,
          positionName: '普通员工',
          userActivated: true,
          pid: null,
          departmentIds: ['0'],
          departmentDTOS: null,
          manageDepartmentIds: null,
          manageDepartmentDTOS: null,
          roleIds: ['94067898653500332'],
          roleDTOS: [
            {
              id: '94067898653500332',
              name: '超级管理员',
              list: null,
              isDefault: false,
              companyId: '0',
              roleType: 'ADMIN',
              viewType: null,
            },
          ],
          realname: '13823308546',
          select: true,
          disabled: false,
        },
        canDelUser: true,
        userId: '428967346779066368',
      },
    ],
    isReplace: false,
    approvalDirection: null,
    reason: null,
    flowName: '财务审批',
    typeName: '财务审批',
    canAddUser: true,
    defaultUserIdList: null,
    defaultUserList: null,
    customUserIdList: null,
    customUserList: null,
    nodeId: '345653208544317443',
    approvalEdit: false,
    wayValName: '依次审批',
    statusName: '等待',
  },
  {
    id: '432158441205796864',
    activated: 1,
    createBy: '428967346779066368',
    createAt: null,
    updateBy: '428967346779066368',
    updateAt: null,
    billId: null,
    sort: 3,
    status: null,
    wayVal: null,
    workVal: null,
    workPeople: null,
    type: 'CC',
    auditUserType: null,
    billFlowCheckDTOList: [],
    isReplace: false,
    approvalDirection: null,
    reason: null,
    flowName: '抄送人',
    typeName: '抄送人',
    canAddUser: true,
    defaultUserIdList: [],
    defaultUserList: [],
    customUserIdList: [],
    customUserList: [],
    nodeId: null,
    approvalEdit: null,
    wayValName: null,
    statusName: null,
  },
]