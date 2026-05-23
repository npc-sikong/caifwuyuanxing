const statusMap = {
  "00": { label: "成功", className: "success" },
  "01": { label: "处理中", className: "info" },
  "09": { label: "失败", className: "fail" },
  "10": { label: "待处理", className: "pending" },
  "80": { label: "已归档", className: "muted" },
  "90": { label: "已停用", className: "muted" }
};

const ledgerStatusMap = {
  pending_confirm: { label: "待确认", className: "pending" },
  active: { label: "生效中", className: "info" },
  partial: { label: "部分还款", className: "purple" },
  overdue: { label: "已逾期", className: "fail" },
  settled: { label: "已结清", className: "success" },
  written_off: { label: "已核销", className: "muted" }
};

const settlementStatusMap = {
  pending: { label: "待扣款", className: "pending" },
  calculating: { label: "试算中", className: "info" },
  deducted: { label: "已扣款", className: "success" },
  insufficient: { label: "资金不足", className: "fail" },
  returned: { label: "退回调整", className: "purple" },
  closed: { label: "已关闭", className: "muted" }
};

const poolStatusMap = {
  normal: { label: "充足", className: "success" },
  low: { label: "偏低", className: "pending" },
  insufficient: { label: "不足", className: "fail" },
  frozen: { label: "冻结", className: "muted" }
};

const quotaStatusMap = {
  pending: { label: "待确认", className: "pending" },
  applied: { label: "已生效", className: "success" },
  rejected: { label: "已驳回", className: "fail" }
};

const dictionaries = {
  accountType: { "10": "余额", "20": "积分", "30": "资金池" },
  accountObject: { "10": "商户", "20": "代理", "30": "通道", "40": "私有", "70": "合伙人", "80": "用户" },
  bookCategory: { "1": "资产", "2": "负债", "3": "所有者权益", "4": "其他收入", "5": "主营成本", "6": "主营收入" },
  direction: { "10": "借方", "20": "贷方" },
  tradeType: { recharge_10: "存款", withdraw: "取款", top_up_20: "积分充值" },
  poolChangeType: { site_recharge: "站点充值", agent_recharge: "代理充值", member_recharge: "会员充值", head_add: "总站增加额度", site_withdraw: "站点提现", agent_withdraw: "代理提现", member_withdraw: "会员提现", head_reduce: "总站减少额度", settlement_deduct: "月结扣款" },
  listType: { "10": "黑名单", "20": "红名单" },
  subjectType: { site: "站点", parentAgent: "上级代理", agent: "代理", childAgent: "下级代理" },
  ledgerType: { siteLoan: "站点借出", agentDebt: "代理欠款", agentLoan: "代理借出", repayment: "还款核销" }
};

const quickActions = {
  cash: [
    { label: "查看收银流水", target: "cashOrder" },
    { label: "处理待审申请", target: "cashRequest" },
    { label: "查看异常预警", target: "exceptionCenter", tone: "danger" }
  ],
  account: [
    { label: "查看余额明细", target: "balance" },
    { label: "账户开通演示", target: "accountRegister" }
  ],
  book: [
    { label: "查看记账凭证", target: "bookOrder" },
    { label: "试算平衡检查", target: "trialBalance" }
  ],
  risk: [
    { label: "风控命中", target: "riskHit" },
    { label: "黑/红名单", target: "blackList" }
  ],
  ledger: [
    { label: "往来总览", target: "ledgerOverview" },
    { label: "站点借款", target: "siteLoanLedger" },
    { label: "代理欠款", target: "agentDebtLedger", tone: "danger" },
    { label: "还款核销", target: "repaymentLedger" }
  ],
  settlement: [
    { label: "月结总览", target: "settlementOverview" },
    { label: "月结账单", target: "monthlySettlement" },
    { label: "站点资金池", target: "siteFundPool" },
    { label: "额度调整", target: "quotaAdjust" }
  ],
  config: [
    { label: "交易字典", target: "master" },
    { label: "收银策略", target: "cashPolicy" },
    { label: "记账策略", target: "bookPolicy" },
    { label: "策略总览", target: "strategyConfig" }
  ]
};

const fieldGroups = {
  user: ["userId", "userMobile", "userName", "toUserId", "toUserName", "objectId", "objectName"],
  trade: ["cashOrderId", "requestId", "relationId", "tradeType", "bookCode", "scene", "bizType"],
  amount: ["amount", "transAmt", "discount", "balance", "openBalance", "occurredAmount", "debitAmount", "creditAmount", "cashAmount", "poolBalance", "frozenAmount", "availableAmount", "rechargeIncrease", "withdrawDecrease", "headAddAmount", "headReduceAmount", "settlementDeductAmount", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "beforeBalance", "afterBalance", "changeAmount"],
  status: ["status", "level", "riskLevel", "owner", "handler", "handlerStatus", "deadline", "sla", "settlementStatus", "poolStatus", "quotaStatus", "approvalResult", "approvalTime", "approvalRemark", "repaymentPlanStatus", "writeOffStatus"],
  book: ["bookOrderId", "bookTitle", "batchId", "batchDetailId", "accountId", "accountType", "accountObject", "bookCategory", "direction", "processId"],
  identity: ["siteId", "siteName", "siteLevel", "principal", "agentCount", "availableCredit"],
  ledger: ["ledgerId", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "dueDate", "overdueDays", "ledgerStatus", "relatedLedgerId"],
  settlement: ["settlementId", "settlementMonth", "billNo", "sourceType", "changeType", "formulaDesc", "operatorType", "operateTime"],
  tech: ["route", "permission", "tableName", "beanName", "riskBean", "policyBean", "messageId", "consumer", "suggestion", "remark"]
};

const menuGroups = [
  { title: "工作台", domainKey: "workbench", kind: "support", items: ["dashboard", "todoCenter", "exceptionCenter", "workflow", "auditLog"] },
  { title: "出入款帐户", domainKey: "paymentAccount", kind: "domain", items: ["paymentAccountHome", "privateAccount", "siteFundPool", "settlementOverview", "settlementTrial", "monthlySettlement", "fundPoolFlow", "quotaAdjust"] },
  { title: "收银流水", domainKey: "cashFlow", kind: "domain", items: ["cashFlowHome", "cashRequest", "cashOrder", "cashHistory", "cashScenario", "cashPolicy", "master", "riskTemplate", "blackList", "riskHit"] },
  { title: "记账模板", domainKey: "bookTemplateDomain", kind: "domain", items: ["bookTemplateHome", "bookTemplate", "bookPolicy", "bookOrder", "trialBalance", "bookHistory", "category"] },
  { title: "客户余额", domainKey: "customerBalance", kind: "domain", items: ["customerBalanceHome", "accountOverview", "balance", "accountRegister", "accountType", "objectAccount", "siteIdentity", "ledgerOverview", "siteLoanLedger", "agentDebtLedger", "agentLoanLedger", "repaymentLedger"] },
  { title: "研发参考", domainKey: "reference", kind: "support", items: ["relation", "statusDict", "riskReport", "strategyConfig"] }
];

const pageActionDefaults = {
  management: { search: true, detail: true, add: true, edit: true, delete: true, export: true },
  overview: { search: true, detail: true, add: false, edit: false, delete: false, export: true },
  workflow: { search: true, detail: true, add: false, edit: false, delete: false, export: true },
  check: { search: true, detail: true, add: false, edit: false, delete: false, export: true },
  reference: { search: true, detail: true, add: false, edit: false, delete: false, export: true }
};

const moduleCatalog = {
  dashboard: {
    title: "财务总览",
    subtitle: "工作台",
    pageType: "overview",
    desc: "财务中心驾驶舱，用一屏说明今日收银、记账、余额更新、风控和配置健康度。",
    table: "overview",
    route: "/dashboard",
    permission: "demo:finance:overview",
    scenario: "运营负责人每日进入后台后，先看总览，再进入待办、异常或具体流水。",
    summary: [
      metric("今日收银金额", "¥428,560.00", "较昨日 +8.2%", "success"),
      metric("待更新余额批次", "12", "队列待消费", "warning"),
      metric("失败流水", "5", "需排障", "danger"),
      metric("风控命中", "18", "含黑名单 3 笔", "info"),
      metric("模板异常", "2", "试算不平衡", "danger"),
      metric("待处理申请", "24", "提现申请为主", "warning"),
      metric("往来未结清", "¥188,000.00", "站点/代理台账", "danger"),
      metric("本月待扣", "¥156,000.00", "总站月结", "warning"),
      metric("资金池不足", "1", "阻断扣款", "danger")
    ],
    quickActions: [...quickActions.cash, ...quickActions.account, ...quickActions.settlement, ...quickActions.ledger, ...quickActions.book],
    columns: ["item", "bizType", "level", "owner", "status"],
    filters: ["item", "bizType", "status"],
    fields: commonFields(["item", "bizType", "level", "owner", "status", "suggestion", "route"]),
    rows: [
      row({ item: "提现申请待审核", bizType: "交易收银", level: "高", owner: "财务审核", status: "10", suggestion: "优先处理超 30 分钟申请", route: "#/cashRequest" }),
      row({ item: "收银流水验签失败", bizType: "异常预警", level: "高", owner: "研发/运营", status: "09", suggestion: "查看签名串与密钥配置", route: "#/exceptionCenter" }),
      row({ item: "提现模板试算不平衡", bizType: "记账中心", level: "高", owner: "财务运营", status: "10", suggestion: "检查 K0700 模板借贷金额", route: "#/trialBalance" }),
      row({ item: "黑名单规则待复核", bizType: "风控合规", level: "中", owner: "风控运营", status: "10", suggestion: "确认 type 与 * 记账码规则", route: "#/blackList" }),
      row({ item: "代理欠款逾期 3 笔", bizType: "往来台账", level: "高", owner: "站点财务", status: "10", suggestion: "进入代理欠款台账处理还款计划", route: "#/agentDebtLedger" }),
      row({ item: "华南站点月结资金池不足", bizType: "月结中心", level: "高", owner: "总站财务", status: "10", suggestion: "阻断扣款并补充站点资金池", route: "#/monthlySettlement" })
    ],
    flow: [
      ["交易进入", "业务系统提交收银申请或收银流水。", "cashRequest"],
      ["收银记账", "匹配交易字典，生成收银流水。", "cashOrder"],
      ["模板凭证", "按记账模板生成借贷凭证并试算平衡。", "bookOrder"],
      ["余额落账", "通过队列更新账户余额并归档流水。", "balance"],
      ["风控复核", "命中规则进入风控处理和审计。", "riskHit"],
      ["月结扣款", "总站按月结账单扣减站点资金池。", "monthlySettlement"],
      ["往来追踪", "站点和代理借欠台账进入还款核销。", "ledgerOverview"]
    ],
    help: pageHelp("财务总览", "运营驾驶舱", ["overview"], ["通过摘要卡片判断今日财务中心整体状态。", "通过流程卡快速跳转到收银、记账、余额、风控和往来台账模块。", "往来台账为产品补充原型，会员/用户不进入借款和欠款主体。"], ["真实开发可聚合收银流水、记账凭证、队列、风控告警和往来台账接口。"])
  },
  todoCenter: operationalModule({
    title: "待办中心",
    subtitle: "工作台",
    pageType: "overview",
    desc: "聚合财务审核、异常处理、配置补齐和风险确认任务，避免运营在多个表格里找待办。",
    table: "todo_center_demo",
    route: "/finance/demo/todo",
    permission: "demo:finance:todo",
    scenario: "财务运营每天按优先级处理待办，先高风险、再超时、最后普通配置补齐。",
    summary: [metric("待审核", "24", "收银申请", "warning"), metric("待排障", "7", "失败流水/队列", "danger"), metric("待扣月结", "3", "总站账单", "warning"), metric("待确认借款", "5", "站点/代理", "warning"), metric("待核销", "3", "还款记录", "info"), metric("今日已处理", "96", "模拟数据", "success")],
    quickActions: [quick("收银申请", "cashRequest"), quick("月结账单", "monthlySettlement", "danger"), quick("站点资金池", "siteFundPool"), quick("代理欠款", "agentDebtLedger", "danger"), quick("还款核销", "repaymentLedger"), quick("收银策略", "cashPolicy"), quick("记账策略", "bookPolicy")],
    columns: ["item", "bizType", "level", "handler", "deadline", "status"],
    filters: ["item", "bizType", "level", "status"],
    fields: commonFields(["item", "bizType", "level", "handler", "deadline", "status", "suggestion", "route"]),
    rows: [
      row({ item: "提现申请 CASHREQ20260522001", bizType: "交易审核", level: "高", handler: "财务审核", deadline: "10 分钟内", status: "10", suggestion: "核对用户余额和黑名单命中", route: "#/cashRequest" }),
      row({ item: "余额更新队列积压 12 批次", bizType: "队列处理", level: "高", handler: "研发值班", deadline: "立即", status: "01", suggestion: "检查 batch_id 和消费者日志", route: "#/exceptionCenter" }),
      row({ item: "华南站点 2026-05 月结待扣款", bizType: "总站月结", level: "高", handler: "总站财务", deadline: "今日", status: "10", suggestion: "资金池不足，需先补足额度或退回调整", route: "#/monthlySettlement" }),
      row({ item: "站点借款待代理确认", bizType: "借款确认", level: "高", handler: "站点财务", deadline: "30 分钟内", status: "10", suggestion: "确认借款主体和还款计划", route: "#/siteLoanLedger" }),
      row({ item: "还款记录待财务核销", bizType: "还款核销", level: "中", handler: "财务运营", deadline: "今日", status: "10", suggestion: "核对关联台账未结清金额", route: "#/repaymentLedger" }),
      row({ item: "收银策略变更待复核", bizType: "配置变更", level: "中", handler: "系统管理员", deadline: "今日", status: "10", suggestion: "策略变更需要独立权限审核", route: "#/cashPolicy" })
    ],
    help: pageHelp("待办中心", "运营任务聚合", ["fin_cash_request", "fin_cash_order", "fin_book_template", "ledger_demo", "settlement_demo"], ["先处理高风险和超时项。", "月结待扣和资金池不足应进入总站财务待办。", "待办只做演示聚合，真实系统需由后端任务中心提供。", "审批类待办只跳转到对应管理页，不在聚合页直接编辑。"])
  }),
  exceptionCenter: operationalModule({
    title: "异常预警",
    subtitle: "工作台",
    pageType: "check",
    desc: "集中展示验签失败、余额更新失败、模板不平衡、黑名单命中等运营需要立刻处理的异常。",
    table: "exception_center_demo",
    route: "/finance/demo/exception",
    permission: "demo:finance:exception",
    scenario: "财务运营和研发值班共同使用，按异常类型定位影响模块和下一步处理动作。",
    summary: [metric("高风险", "9", "优先处理", "danger"), metric("处理中", "5", "已有负责人", "info"), metric("今日新增", "14", "模拟告警", "warning"), metric("资金池不足", "1", "月结阻断", "danger"), metric("往来逾期", "3", "代理欠款", "danger"), metric("已关闭", "32", "今日处理", "success")],
    quickActions: [quick("代码风险", "riskReport"), quick("月结账单", "monthlySettlement", "danger"), quick("站点资金池", "siteFundPool"), quick("试算平衡", "trialBalance"), quick("风控命中", "riskHit"), quick("代理欠款", "agentDebtLedger", "danger")],
    columns: ["item", "module", "riskLevel", "owner", "handlerStatus", "sla", "status", "suggestion"],
    filters: ["item", "module", "riskLevel", "handlerStatus", "status"],
    fields: commonFields(["item", "module", "riskLevel", "owner", "handlerStatus", "sla", "status", "suggestion", "processRecord", "route", "tableName"]),
    rows: [
      row({ item: "收银流水验签失败", module: "UpdateCashOrder", riskLevel: "高", owner: "研发/运营", handlerStatus: "排查中", sla: "30 分钟", status: "09", suggestion: "核对 cash.publicKey/cash.privateKey 和签名字段顺序", processRecord: "已定位签名字段顺序，待复测", route: "#/cashOrder", tableName: "fin_cash_order" }),
      row({ item: "余额更新查询不到账户", module: "UpdateBalanceListener", riskLevel: "高", owner: "研发值班", handlerStatus: "处理中", sla: "立即", status: "01", suggestion: "检查 accountType/accountObject 字段设置", processRecord: "已拉取队列批次，待补账户配置", route: "#/balance", tableName: "fin_balance" }),
      row({ item: "提现模板试算不平衡", module: "BookOrderProcess", riskLevel: "高", owner: "财务运营", handlerStatus: "待处理", sla: "2 小时", status: "10", suggestion: "检查 K0700 借贷模板配置", processRecord: "等待财务确认模板变更", route: "#/bookTemplate", tableName: "fin_book_template" }),
      row({ item: "用户命中提现黑名单", module: "RiskCheck", riskLevel: "中", owner: "风控运营", handlerStatus: "复核中", sla: "今日", status: "10", suggestion: "复核名单生效范围", processRecord: "已通知风控运营复核", route: "#/blackList", tableName: "fin_black_list" }),
      row({ item: "华南站点资金池不足", module: "MonthlySettlement", riskLevel: "高", owner: "总站财务", handlerStatus: "待补足", sla: "今日", status: "10", suggestion: "月结扣款已阻断，先增加额度或退回调整", processRecord: "最终应扣 62000 元，可用资金池 48000 元", route: "#/monthlySettlement", tableName: "settlement_demo" }),
      row({ item: "代理欠款到期未还", module: "LedgerReminder", riskLevel: "高", owner: "站点财务", handlerStatus: "催收中", sla: "1 小时", status: "10", suggestion: "进入还款核销确认计划", processRecord: "已生成逾期待办，等待还款计划", route: "#/agentDebtLedger", tableName: "ledger_demo" })
    ],
    help: pageHelp("异常预警", "异常定位和排障", ["fin_cash_order", "fin_book_order", "fin_balance", "fin_black_list", "ledger_demo", "settlement_demo"], ["异常页不替代日志系统，只提供运营可理解的处理入口。", "高风险异常应展示影响金额、批次和负责人。", "月结资金池不足必须阻断扣款，不允许扣成负数。", "代理欠款逾期属于往来台账补充规则，真实开发需由后端提醒任务产生。"])
  }),
  workflow: operationalModule({
    title: "流程看板",
    subtitle: "工作台",
    pageType: "workflow",
    desc: "按运营视角展示从交易进入到余额落账的完整链路，突出每一步的输入、输出和失败处理。",
    table: "process_demo",
    route: "/finance/demo/workflow",
    permission: "demo:finance:workflow",
    scenario: "用于培训、需求评审和研发对齐，解释财务中心如何把交易转换为余额。",
    summary: [metric("流程步骤", "6", "收银到落账", "info"), metric("关键状态", "3", "待处理/成功/失败", "warning"), metric("核心表", "5", "字典/流水/凭证/余额/风控", "success")],
    quickActions: [quick("收银流水", "cashOrder"), quick("记账凭证", "bookOrder"), quick("余额明细", "balance")],
    columns: ["step", "module", "input", "output", "status"],
    filters: ["step", "module", "status"],
    fields: commonFields(["step", "module", "input", "output", "status", "suggestion"]),
    rows: [
      row({ step: "1. 接收交易", module: "FinanceCashService.cash", input: "FinCashOrder JSON", output: "PipeContext", status: "00", suggestion: "校验 user_id、trade_type、amount" }),
      row({ step: "2. 匹配记账码", module: "GetBookCode", input: "trade_type", output: "book_code", status: "00", suggestion: "统一 trade 字典编码" }),
      row({ step: "3. 风控检查", module: "RiskCheck", input: "user_id + book_code", output: "通过/拒绝", status: "10", suggestion: "先黑名单，后动态风控 Bean" }),
      row({ step: "4. 生成凭证", module: "BookOrderProcess", input: "book_code + template", output: "fin_book_order", status: "10", suggestion: "必须试算平衡" }),
      row({ step: "5. 余额更新", module: "UpdateBalanceListener", input: "batch_id", output: "fin_balance", status: "01", suggestion: "队列消费必须幂等" })
    ],
    flow: [
      ["收银申请", "业务提交交易请求", "cashRequest"],
      ["收银流水", "保存交易主流水", "cashOrder"],
      ["记账凭证", "按模板生成借贷明细", "bookOrder"],
      ["余额更新", "队列异步落账", "balance"]
    ],
    help: pageHelp("流程看板", "流程培训和研发对齐", ["comm_code_master", "fin_cash_order", "fin_book_template", "fin_book_order", "fin_balance"], ["每个步骤要明确输入、输出、失败后去哪里排查。"])
  }),
  paymentAccountHome: paymentAccountHomeModule(),
  cashFlowHome: cashFlowHomeModule(),
  bookTemplateHome: bookTemplateHomeModule(),
  customerBalanceHome: customerBalanceHomeModule(),
  accountOverview: operationalModule({
    title: "账户总览",
    subtitle: "资金账户",
    pageType: "overview",
    desc: "按账户对象和账户类型汇总余额、账户数量和异常账户，减少运营直接看明细表的成本。",
    table: "fin_balance",
    route: "/finance/demo/accountOverview",
    permission: "demo:finance:accountOverview",
    scenario: "财务运营先看账户总览判断资金结构，再下钻余额明细。",
    summary: [metric("总余额", "¥1,181,888.00", "模拟汇总", "success"), metric("站点资金池", "¥304,000.00", "可提现金额", "success"), metric("账户数量", "386", "商户/代理/私有", "info"), metric("负余额账户", "2", "需复核", "danger"), metric("今日变动", "¥62,000.00", "借贷发生额", "warning"), metric("代理往来未结清", "¥188,000.00", "不含会员", "danger")],
    quickActions: [...quickActions.account, quick("站点资金池", "siteFundPool"), quick("月结账单", "monthlySettlement", "danger"), quick("往来总览", "ledgerOverview"), quick("站点身份", "siteIdentity")],
    columns: ["accountObject", "accountType", "accountCount", "balance", "occurredAmount", "status"],
    filters: ["accountObject", "accountType", "status"],
    fields: commonFields(["accountObject", "accountType", "accountCount", "balance", "occurredAmount", "status", "suggestion"]),
    rows: [
      row({ accountObject: "40", accountType: "10", accountCount: "8", balance: "860000.00", occurredAmount: "40000.00", status: "00", suggestion: "系统私有账户余额稳定" }),
      row({ accountObject: "20", accountType: "30", accountCount: "42", balance: "320000.00", occurredAmount: "20000.00", status: "00", suggestion: "代理资金池余额充足" }),
      row({ accountObject: "80", accountType: "10", accountCount: "336", balance: "1888.00", occurredAmount: "-1000.00", status: "10", suggestion: "部分用户提现待落账" })
    ],
    help: pageHelp("账户总览", "资金账户汇总", ["fin_balance", "ledger_demo", "fund_pool_demo"], ["总览页展示汇总指标，明细和技术字段放到余额明细。", "站点资金池表示单个站点可提现金额，月结扣款只扣站点资金池。", "按账户对象、账户类型统一组织信息。", "往来未结清金额来自新增台账原型，不直接等同账户余额。"])
  }),
  balance: tableModule("余额明细", "资金账户", "查询账户余额明细，保留账套、账户类型、账户对象、记账主体等完整字段。", "fin_balance", "/finance/balance", "finance:balance", ["accountId", "accountType", "accountObject", "userName", "processId", "balance", "occurredAmount", "status"], ["accountId", "accountType", "accountObject", "processId"], [
    row({ accountId: "1", accountType: "10", accountObject: "40", userName: "系统现金", processId: "100210", balance: "860000.00", openBalance: "820000.00", occurredAmount: "40000.00", direction: "10", closeOrder: "BOOK202605220001", status: "00" }),
    row({ accountId: "site:100100100", accountType: "30", accountObject: "20", userName: "华东代理", processId: "site:100100100", balance: "320000.00", openBalance: "300000.00", occurredAmount: "20000.00", direction: "10", closeOrder: "BOOK202605220002", status: "00" }),
    row({ accountId: "1142889689825594113", accountType: "10", accountObject: "80", userName: "演示用户", processId: "1142889689825594113", balance: "1888.00", openBalance: "2888.00", occurredAmount: "-1000.00", direction: "20", closeOrder: "BOOK202605220003", status: "10" })
  ], "余额明细用于排查账户维度的真实余额，建议生产环境限制直接修改。"),
  accountRegister: operationalModule({
    title: "账户开通",
    subtitle: "资金账户",
    pageType: "workflow",
    desc: "演示商户、代理、通道、私有账户开通流程，展示入参和生成账户结果。",
    table: "fin_object_account / fin_private_account / fin_balance",
    route: "/finance/demo/accountRegister",
    permission: "demo:finance:accountRegister",
    scenario: "新商户或代理接入时，运营确认对象类型和账套后开通财务账户。",
    summary: [metric("今日开通", "18", "商户 15 / 代理 3", "success"), metric("待补配置", "2", "账户对象未配置", "warning"), metric("重复开通拦截", "4", "模拟数据", "info")],
    quickActions: [quick("账户对象配置", "objectAccount"), quick("余额明细", "balance")],
    columns: ["objectType", "objectId", "objectName", "siteId", "resultAccount", "status"],
    filters: ["objectType", "objectId", "status"],
    fields: commonFields(["objectType", "objectId", "objectName", "siteId", "resultAccount", "status", "suggestion"]),
    rows: [
      row({ objectType: "商户", objectId: "1142889689825594113", objectName: "演示商户", siteId: "site:100100100", resultAccount: "余额/积分", status: "00", suggestion: "按 fin_object_account 创建账户" }),
      row({ objectType: "代理", objectId: "100100100", objectName: "华东代理", siteId: "site:100100100", resultAccount: "资金池", status: "00", suggestion: "按代理账户对象创建资金池" }),
      row({ objectType: "私有", objectId: "100210", objectName: "系统现金", siteId: "1", resultAccount: "余额", status: "10", suggestion: "按 fin_private_account 创建系统账户" })
    ],
    help: pageHelp("账户开通", "账户注册演示", ["fin_object_account", "fin_private_account", "fin_balance"], ["开通页不直接替代真实注册接口，只展示字段和结果。", "真实开发前需修复 PRD 中记录的重复判断疑似反向问题。"])
  }),
  privateAccount: tableModule("私有账户", "资金账户", "维护系统现金、银行存款、主营收入、主营成本等系统级账户。", "fin_private_account", "/finance/privateAccount", "finance:privateAccount", ["title", "processId", "accountType", "bookCategory", "status"], ["title", "processId", "bookCategory"], [
    row({ title: "系统现金", processId: "100210", accountType: "10", bookCategory: "1", status: "00" }),
    row({ title: "工行存款", processId: "100220", accountType: "10", bookCategory: "1", status: "00" }),
    row({ title: "主营收入", processId: "600110", accountType: "10", bookCategory: "6", status: "00" }),
    row({ title: "主营成本", processId: "640110", accountType: "10", bookCategory: "5", status: "00" })
  ], "私有账户影响记账模板中的固定 process_id，修改前应确认关联模板。"),
  settlementOverview: settlementOverviewModule(),
  siteFundPool: siteFundPoolModule(),
  settlementTrial: settlementTrialModule(),
  monthlySettlement: monthlySettlementModule(),
  fundPoolFlow: fundPoolFlowModule(),
  quotaAdjust: quotaAdjustModule(),
  ledgerOverview: operationalModule({
    title: "往来总览",
    subtitle: "往来台账",
    pageType: "overview",
    desc: "按站点和代理汇总站点借出、代理欠款、代理借出和还款核销，帮助运营快速识别未结清和逾期风险。",
    table: "ledger_overview_demo",
    route: "/finance/demo/ledger/overview",
    permission: "demo:finance:ledger:overview",
    scenario: "站点财务和代理运营每日查看往来总览，先定位逾期和大额未结清，再进入明细台账处理。",
    summary: [metric("应收合计", "¥268,000.00", "站点/代理借出", "success"), metric("应付合计", "¥188,000.00", "代理欠款", "warning"), metric("逾期金额", "¥42,000.00", "3 笔", "danger"), metric("已还金额", "¥80,000.00", "本月", "info")],
    quickActions: quickActions.ledger,
    columns: ["siteName", "subjectType", "subjectName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "overdueDays", "ledgerStatus"],
    filters: ["siteName", "subjectName", "ledgerType", "ledgerStatus"],
    fields: commonFields(["ledgerId", "siteId", "siteName", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "dueDate", "overdueDays", "ledgerStatus", "suggestion", "relatedLedgerId"]),
    rows: [
      row({ ledgerId: "LEDGER-SITE-20260522001", siteId: "site:100100100", siteName: "华东站点", subjectType: "site", subjectName: "华东站点", counterpartyType: "agent", counterpartyName: "华东一级代理A", ledgerType: "siteLoan", loanAmount: "120000.00", debtAmount: "120000.00", repaidAmount: "50000.00", outstandingAmount: "70000.00", dueDate: "2026-06-10", overdueDays: "0", ledgerStatus: "partial", suggestion: "按期跟进剩余还款", relatedLedgerId: "" }),
      row({ ledgerId: "LEDGER-DEBT-20260522002", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东二级代理B", counterpartyType: "parentAgent", counterpartyName: "华东一级代理A", ledgerType: "agentDebt", loanAmount: "48000.00", debtAmount: "48000.00", repaidAmount: "6000.00", outstandingAmount: "42000.00", dueDate: "2026-05-15", overdueDays: "7", ledgerStatus: "overdue", suggestion: "进入还款核销并确认逾期计划", relatedLedgerId: "LEDGER-LOAN-20260522003" }),
      row({ ledgerId: "LEDGER-LOAN-20260522003", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东一级代理A", counterpartyType: "childAgent", counterpartyName: "华东二级代理B", ledgerType: "agentLoan", loanAmount: "48000.00", debtAmount: "48000.00", repaidAmount: "6000.00", outstandingAmount: "42000.00", dueDate: "2026-05-15", overdueDays: "7", ledgerStatus: "overdue", suggestion: "上级代理视角为应收", relatedLedgerId: "LEDGER-DEBT-20260522002" })
    ],
    flow: [
      ["站点身份", "确认站点主体和可借出额度。", "siteIdentity"],
      ["借款创建", "站点或代理创建借出记录。", "siteLoanLedger"],
      ["欠款确认", "代理视角形成应付台账。", "agentDebtLedger"],
      ["还款核销", "登记还款并关闭台账。", "repaymentLedger"]
    ],
    help: pageHelp("往来总览", "站点与代理往来汇总", ["ledger_overview_demo"], ["站点可借款给代理；代理可欠上级代理或站点，也可借给下级代理。", "会员/用户不允许出现在借款、欠款或还款核销主体中。", "汇总金额用于运营风险识别，明细以各台账页面为准。"], ["当前为产品补充原型，后端未实现；真实开发建议新增独立往来台账表、还款表、审批流和操作审计。"])
  }),
  siteIdentity: operationalModule({
    title: "站点身份",
    subtitle: "往来台账",
    pageType: "overview",
    desc: "展示站点作为财务运营和账套主体的身份、负责人、关联代理和可借出额度。",
    table: "site_identity_demo",
    route: "/finance/demo/ledger/site",
    permission: "demo:finance:ledger:site",
    scenario: "站点财务在创建借款前确认站点身份、额度和代理覆盖范围。",
    summary: [metric("站点数量", "2", "演示站点", "info"), metric("可借出额度", "¥500,000.00", "模拟额度", "success"), metric("关联代理", "18", "不含会员", "warning"), metric("风险站点", "1", "存在逾期", "danger")],
    quickActions: [quick("站点借款", "siteLoanLedger"), quick("往来总览", "ledgerOverview")],
    columns: ["siteId", "siteName", "siteLevel", "principal", "agentCount", "availableCredit", "outstandingAmount", "ledgerStatus"],
    filters: ["siteId", "siteName", "principal", "ledgerStatus"],
    fields: commonFields(["siteId", "siteName", "siteLevel", "principal", "agentCount", "availableCredit", "outstandingAmount", "ledgerStatus", "suggestion"]),
    rows: [
      row({ siteId: "site:100100100", siteName: "华东站点", siteLevel: "总站", principal: "站点财务A", agentCount: "12", availableCredit: "300000.00", outstandingAmount: "112000.00", ledgerStatus: "active", suggestion: "可继续向低风险代理提供借款" }),
      row({ siteId: "site:200200200", siteName: "华南站点", siteLevel: "区域站点", principal: "站点财务B", agentCount: "6", availableCredit: "200000.00", outstandingAmount: "42000.00", ledgerStatus: "overdue", suggestion: "先处理逾期台账再开放新增借款" })
    ],
    help: pageHelp("站点身份", "站点主体管理演示", ["site_identity_demo"], ["站点身份用于运营和往来台账视角，不改变现有 account_object 编码。", "站点可作为借出方，借给代理；站点不是会员账户。", "会员/用户不参与借款和欠款台账。"], ["当前为静态演示，真实开发需对接站点、代理层级、额度和权限接口。"])
  }),
  siteLoanLedger: operationalModule({
    title: "站点借款台账",
    subtitle: "往来台账",
    desc: "记录站点借给代理的款项，站点视角为应收，代理视角为应付。",
    table: "site_loan_ledger_demo",
    route: "/finance/demo/ledger/site-loan",
    permission: "demo:finance:ledger:siteLoan",
    scenario: "站点财务查看每笔借给代理的款项、到期日、已还金额和未结清金额。",
    summary: [metric("站点借出", "¥120,000.00", "2 笔", "success"), metric("未结清", "¥70,000.00", "待回款", "warning"), metric("逾期", "¥0.00", "当前无逾期", "success")],
    quickActions: [quick("代理欠款", "agentDebtLedger"), quick("还款核销", "repaymentLedger"), quick("站点身份", "siteIdentity")],
    columns: ["ledgerId", "siteName", "counterpartyName", "loanAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "dueDate", "ledgerStatus"],
    filters: ["ledgerId", "siteName", "counterpartyName", "ledgerStatus"],
    fields: commonFields(["ledgerId", "siteId", "siteName", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "dueDate", "overdueDays", "ledgerStatus", "suggestion", "relatedLedgerId"]),
    rows: [
      row({ ledgerId: "LEDGER-SITE-20260522001", siteId: "site:100100100", siteName: "华东站点", subjectType: "site", subjectName: "华东站点", counterpartyType: "agent", counterpartyName: "华东一级代理A", ledgerType: "siteLoan", loanAmount: "120000.00", debtAmount: "120000.00", repaidAmount: "50000.00", outstandingAmount: "70000.00", repaymentProgress: "42", dueDate: "2026-06-10", overdueDays: "0", ledgerStatus: "partial", suggestion: "剩余 70000 元按期回款", relatedLedgerId: "LEDGER-DEBT-20260522004" }),
      row({ ledgerId: "LEDGER-SITE-20260522004", siteId: "site:100100100", siteName: "华东站点", subjectType: "site", subjectName: "华东站点", counterpartyType: "agent", counterpartyName: "华东一级代理C", ledgerType: "siteLoan", loanAmount: "30000.00", debtAmount: "30000.00", repaidAmount: "30000.00", outstandingAmount: "0.00", repaymentProgress: "100", dueDate: "2026-05-20", overdueDays: "0", ledgerStatus: "settled", suggestion: "可提交财务核销", relatedLedgerId: "LEDGER-REPAY-20260522002" })
    ],
    help: pageHelp("站点借款台账", "站点借出明细", ["site_loan_ledger_demo"], ["站点可以借款给代理，站点视角展示为应收。", "对手方必须是代理，不允许选择会员/用户。", "已结清台账可进入还款核销，逾期台账应进入异常预警。"], ["当前为产品补充原型，后端未实现；真实开发建议接口支持创建、确认、部分还款、结清、核销和作废。"])
  }),
  agentDebtLedger: operationalModule({
    title: "代理欠款台账",
    subtitle: "往来台账",
    desc: "记录代理欠上级代理或站点的款项，代理视角为应付，用于催收和还款计划跟踪。",
    table: "agent_debt_ledger_demo",
    route: "/finance/demo/ledger/agent-debt",
    permission: "demo:finance:ledger:agentDebt",
    scenario: "站点财务和上级代理查看代理欠款、逾期天数和处理建议。",
    summary: [metric("代理欠款", "¥188,000.00", "4 笔", "warning"), metric("逾期金额", "¥42,000.00", "3 笔", "danger"), metric("本月已还", "¥56,000.00", "部分还款", "info")],
    quickActions: [quick("还款核销", "repaymentLedger"), quick("代理借款", "agentLoanLedger"), quick("异常预警", "exceptionCenter", "danger")],
    columns: ["ledgerId", "subjectName", "counterpartyName", "debtAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "repaymentPlanStatus", "dueDate", "overdueDays", "ledgerStatus"],
    filters: ["ledgerId", "subjectName", "counterpartyName", "repaymentPlanStatus", "ledgerStatus"],
    fields: commonFields(["ledgerId", "siteId", "siteName", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "repaymentPlanStatus", "dueDate", "overdueDays", "ledgerStatus", "suggestion", "processRecord", "relatedLedgerId"]),
    rows: [
      row({ ledgerId: "LEDGER-DEBT-20260522002", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东二级代理B", counterpartyType: "parentAgent", counterpartyName: "华东一级代理A", ledgerType: "agentDebt", loanAmount: "48000.00", debtAmount: "48000.00", repaidAmount: "6000.00", outstandingAmount: "42000.00", repaymentProgress: "13", repaymentPlanStatus: "待确认计划", dueDate: "2026-05-15", overdueDays: "7", ledgerStatus: "overdue", suggestion: "优先确认还款计划", processRecord: "已进入逾期催收，等待下级代理提交计划", relatedLedgerId: "LEDGER-LOAN-20260522003" }),
      row({ ledgerId: "LEDGER-DEBT-20260522004", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东一级代理A", counterpartyType: "site", counterpartyName: "华东站点", ledgerType: "agentDebt", loanAmount: "120000.00", debtAmount: "120000.00", repaidAmount: "50000.00", outstandingAmount: "70000.00", repaymentProgress: "42", repaymentPlanStatus: "按期还款", dueDate: "2026-06-10", overdueDays: "0", ledgerStatus: "partial", suggestion: "跟进剩余回款", processRecord: "站点财务已确认首笔还款", relatedLedgerId: "LEDGER-SITE-20260522001" })
    ],
    help: pageHelp("代理欠款台账", "代理应付明细", ["agent_debt_ledger_demo"], ["代理欠款表示代理欠上级代理或站点的款项。", "欠款方必须是代理；会员/用户不允许产生欠款台账。", "逾期欠款需要进入待办和异常预警。"], ["当前为产品补充原型，后端未实现；真实开发需校验代理上下级关系和站点归属。"])
  }),
  agentLoanLedger: operationalModule({
    title: "代理借款台账",
    subtitle: "往来台账",
    desc: "记录代理借给下级代理的款项，当前代理视角为应收，下级代理视角为应付。",
    table: "agent_loan_ledger_demo",
    route: "/finance/demo/ledger/agent-loan",
    permission: "demo:finance:ledger:agentLoan",
    scenario: "上级代理查看自己借给下级代理的款项，站点可监督代理层级往来风险。",
    summary: [metric("代理借出", "¥48,000.00", "1 笔", "success"), metric("未结清", "¥42,000.00", "下级代理欠款", "danger"), metric("还款进度", "13%", "部分还款", "warning")],
    quickActions: [quick("代理欠款", "agentDebtLedger"), quick("还款核销", "repaymentLedger")],
    columns: ["ledgerId", "subjectName", "counterpartyName", "loanAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "dueDate", "overdueDays", "ledgerStatus"],
    filters: ["ledgerId", "subjectName", "counterpartyName", "ledgerStatus"],
    fields: commonFields(["ledgerId", "siteId", "siteName", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "repaymentProgress", "dueDate", "overdueDays", "ledgerStatus", "suggestion", "relatedLedgerId"]),
    rows: [
      row({ ledgerId: "LEDGER-LOAN-20260522003", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东一级代理A", counterpartyType: "childAgent", counterpartyName: "华东二级代理B", ledgerType: "agentLoan", loanAmount: "48000.00", debtAmount: "48000.00", repaidAmount: "6000.00", outstandingAmount: "42000.00", repaymentProgress: "13", dueDate: "2026-05-15", overdueDays: "7", ledgerStatus: "overdue", suggestion: "上级代理应催收下级代理还款", relatedLedgerId: "LEDGER-DEBT-20260522002" })
    ],
    help: pageHelp("代理借款台账", "代理借出明细", ["agent_loan_ledger_demo"], ["代理可借款给下级代理，借出方和欠款方都必须是代理。", "会员/用户不允许作为借款方或欠款方。", "代理借出与代理欠款应通过 relatedLedgerId 互相关联，避免重复录入。"], ["当前为产品补充原型，后端未实现；真实开发需校验代理层级、额度、审批和还款关系。"])
  }),
  repaymentLedger: operationalModule({
    title: "还款核销",
    subtitle: "往来台账",
    desc: "记录站点与代理、代理与代理之间的还款和核销动作，追踪未结清金额变化。",
    table: "repayment_ledger_demo",
    route: "/finance/demo/ledger/repayment",
    permission: "demo:finance:ledger:repayment",
    scenario: "财务运营在代理还款后登记还款金额，确认未结清金额为 0 后进行核销。",
    summary: [metric("本月还款", "¥86,000.00", "3 笔", "success"), metric("待核销", "1", "已结清待确认", "warning"), metric("部分还款", "2", "仍有未结清", "info")],
    quickActions: [quick("往来总览", "ledgerOverview"), quick("站点借款", "siteLoanLedger"), quick("代理欠款", "agentDebtLedger")],
    columns: ["ledgerId", "relatedLedgerId", "subjectName", "counterpartyName", "repaidAmount", "outstandingAmount", "repaymentProgress", "writeOffStatus", "ledgerStatus"],
    filters: ["ledgerId", "relatedLedgerId", "subjectName", "writeOffStatus", "ledgerStatus"],
    fields: commonFields(["ledgerId", "relatedLedgerId", "siteId", "siteName", "subjectType", "subjectName", "counterpartyType", "counterpartyName", "ledgerType", "repaidAmount", "outstandingAmount", "repaymentProgress", "writeOffStatus", "dueDate", "overdueDays", "ledgerStatus", "suggestion", "processRecord"]),
    rows: [
      row({ ledgerId: "REPAY-20260522001", relatedLedgerId: "LEDGER-SITE-20260522001", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东一级代理A", counterpartyType: "site", counterpartyName: "华东站点", ledgerType: "repayment", repaidAmount: "50000.00", outstandingAmount: "70000.00", repaymentProgress: "42", writeOffStatus: "未满足核销", dueDate: "2026-06-10", overdueDays: "0", ledgerStatus: "partial", suggestion: "还需继续跟进剩余金额", processRecord: "部分还款已登记，未进入核销" }),
      row({ ledgerId: "REPAY-20260522002", relatedLedgerId: "LEDGER-SITE-20260522004", siteId: "site:100100100", siteName: "华东站点", subjectType: "agent", subjectName: "华东一级代理C", counterpartyType: "site", counterpartyName: "华东站点", ledgerType: "repayment", repaidAmount: "30000.00", outstandingAmount: "0.00", repaymentProgress: "100", writeOffStatus: "待核销", dueDate: "2026-05-20", overdueDays: "0", ledgerStatus: "settled", suggestion: "可由财务确认核销", processRecord: "已结清，等待财务核销确认" })
    ],
    help: pageHelp("还款核销", "还款与关闭台账", ["repayment_ledger_demo"], ["还款核销必须关联原始借款或欠款台账。", "未结清金额为 0 后才可进入已结清或已核销。", "会员/用户不作为还款台账主体。"], ["当前为产品补充原型，后端未实现；真实开发需设计还款凭证、审批、反核销和操作审计。"])
  }),
  cashRequest: cashRequestModule(),
  cashOrder: cashOrderModule("收银流水", "fin_cash_order", "/finance/cashOrder", "finance:cashOrder", "记录外部交易请求，是交易进入财务中心后的主流水。", "交易收银"),
  cashScenario: operationalModule({
    title: "充值/提现场景",
    subtitle: "交易收银",
    pageType: "workflow",
    desc: "把充值和提现以业务场景方式呈现，展示交易类型、记账码、风控、模板和余额影响。",
    table: "fin_cash_request / fin_cash_order / fin_book_template",
    route: "/finance/demo/cashScenario",
    permission: "demo:finance:cashScenario",
    scenario: "运营配置或验收充值、提现流程时，用场景页检查每一步是否完整。",
    summary: [metric("充值场景", "K0100", "模板 4 条", "success"), metric("提现场景", "K0700", "模板 4 条", "warning"), metric("待确认手续费", "1", "PRD 未完整体现", "info")],
    quickActions: [quick("收银流水", "cashOrder"), quick("记账模板", "bookTemplate"), quick("风控规则", "riskTemplate")],
    columns: ["scene", "tradeType", "bookCode", "cashAmount", "riskPoint", "balanceImpact", "status"],
    filters: ["scene", "tradeType", "bookCode", "status"],
    fields: commonFields(["scene", "tradeType", "bookCode", "cashAmount", "riskPoint", "balanceImpact", "status", "suggestion"]),
    rows: [
      row({ scene: "余额充值", tradeType: "recharge_10", bookCode: "K0100", cashAmount: "500.00", riskPoint: "字典映射/模板平衡", balanceImpact: "用户余额增加，系统现金增加", status: "00", suggestion: "确认 trade 字典和 K0100 模板" }),
      row({ scene: "用户提现", tradeType: "withdraw", bookCode: "K0700", cashAmount: "1000.00", riskPoint: "余额/限额/黑名单", balanceImpact: "用户负债减少，系统现金减少", status: "10", suggestion: "确认 K0700 风控和模板" })
    ],
    help: pageHelp("充值/提现场景", "业务场景验收", ["fin_cash_order", "fin_book_template", "fin_risk_template"], ["按场景串联收银、风控、记账和余额影响。", "不实现真实提交，只展示验收路径。"])
  }),
  cashHistory: cashOrderModule("收银历史", "fin_cash_order_history", "/finance/cashHistory", "finance:cashHistory", "归档后的收银流水，用于审计、查询和导出。", "交易收银"),
  bookOrder: bookOrderModule("记账凭证", "fin_book_order", "/finance/bookOrder", "finance:bookOrder", "展示由收银流水和记账模板生成的借贷凭证。", "记账中心"),
  bookTemplate: bookTemplateModule(),
  trialBalance: operationalModule({
    title: "试算平衡",
    subtitle: "记账中心",
    pageType: "check",
    desc: "按批次展示借方合计、贷方合计和平衡状态，帮助运营快速定位模板配置问题。",
    table: "fin_book_order / fin_book_template",
    route: "/finance/demo/trialBalance",
    permission: "demo:finance:trialBalance",
    scenario: "财务运营新增或调整记账模板后，先用试算平衡确认凭证是否能落账。",
    summary: [metric("待检查批次", "6", "余额未更新", "warning"), metric("不平衡批次", "2", "需修复模板", "danger"), metric("今日通过", "118", "模拟数据", "success")],
    quickActions: [quick("记账模板", "bookTemplate"), quick("记账凭证", "bookOrder")],
    columns: ["batchId", "bookCode", "debitAmount", "creditAmount", "diffAmount", "status", "suggestion"],
    filters: ["batchId", "bookCode", "status"],
    fields: commonFields(["batchId", "bookCode", "debitAmount", "creditAmount", "diffAmount", "status", "suggestion"]),
    rows: [
      row({ batchId: "CASH202605220001", bookCode: "K0700", debitAmount: "1000.00", creditAmount: "1000.00", diffAmount: "0.00", status: "00", suggestion: "可进入余额更新" }),
      row({ batchId: "CASH202605220009", bookCode: "K0700", debitAmount: "800.00", creditAmount: "700.00", diffAmount: "100.00", status: "09", suggestion: "检查提现模板手续费或成本科目" }),
      row({ batchId: "CASH202605220010", bookCode: "K0100", debitAmount: "500.00", creditAmount: "0.00", diffAmount: "500.00", status: "09", suggestion: "缺少用户负债贷方明细" })
    ],
    help: pageHelp("试算平衡", "记账质量检查", ["fin_book_order", "fin_book_template"], ["借方合计必须等于贷方合计。", "不平衡批次不得进入余额更新。"])
  }),
  bookHistory: bookOrderModule("记账历史", "fin_book_order_history", "/finance/bookHistory", "finance:bookHistory", "归档后的记账凭证，用于审计和导出。", "记账中心"),
  riskTemplate: tableModule("风控规则", "风控合规", "按记账码配置风控 Bean、操作符、策略值和执行顺序。", "fin_risk_template", "/finance/riskTemplate", "finance:riskTemplate", ["title", "riskBean", "bookCode", "operators", "value", "sort", "status"], ["title", "bookCode", "status"], [
    row({ title: "提现日限额", riskBean: "RiskDayWithdrawalLimiBean", bookCode: "K0700", operators: "<=", value: "1000000", sort: "10", status: "00" }),
    row({ title: "余额充足校验", riskBean: "CheckUserBalance", bookCode: "K0700", operators: ">=", value: "amount", sort: "20", status: "00" }),
    row({ title: "代理资金池校验", riskBean: "CheckAgentPoolBalance", bookCode: "K0700", operators: ">=", value: "amount", sort: "30", status: "10" })
  ], "风控规则影响交易是否能继续进入收银和记账。"),
  blackList: tableModule("黑/红名单", "风控合规", "按用户、手机号和记账码配置交易准入规则。", "fin_black_list", "/finance/list", "finance:list", ["title", "userId", "userMobile", "bookCode", "type", "status", "remark"], ["title", "userId", "bookCode", "type", "status"], [
    row({ title: "提现黑名单", userId: "1142889689825594113", userMobile: "13800000000", bookCode: "K0700", type: "10", status: "00", remark: "演示拒绝提现" }),
    row({ title: "全交易黑名单", userId: "1142889689825594000", userMobile: "13900000000", bookCode: "*", type: "10", status: "00", remark: "PRD 提到支持 *，代码待确认" }),
    row({ title: "充值红名单", userId: "1142889689825594222", userMobile: "13700000000", bookCode: "K0100", type: "20", status: "10", remark: "演示预留规则" })
  ], "真实开发需确认 type 与 book_code=* 的匹配规则。"),
  riskHit: operationalModule({
    title: "风险命中",
    subtitle: "风控合规",
    pageType: "check",
    desc: "展示风控规则和黑名单命中的交易，帮助运营复核拒绝原因和后续处理动作。",
    table: "fin_risk_template / fin_black_list / fin_cash_order",
    route: "/finance/demo/riskHit",
    permission: "demo:finance:riskHit",
    scenario: "风控运营按命中记录复核是否误杀，必要时调整名单或规则。",
    summary: [metric("今日命中", "18", "提现 15 / 充值 3", "warning"), metric("黑名单", "3", "直接拒绝", "danger"), metric("待复核", "6", "需人工确认", "info")],
    quickActions: quickActions.risk,
    columns: ["cashOrderId", "userId", "bookCode", "riskPoint", "riskLevel", "status", "suggestion"],
    filters: ["cashOrderId", "userId", "bookCode", "status"],
    fields: commonFields(["cashOrderId", "userId", "bookCode", "riskPoint", "riskLevel", "status", "suggestion"]),
    rows: [
      row({ cashOrderId: "CASH202605220001", userId: "1142889689825594113", bookCode: "K0700", riskPoint: "提现黑名单", riskLevel: "高", status: "09", suggestion: "拒绝提现并复核名单有效期" }),
      row({ cashOrderId: "CASH202605220008", userId: "1142889689825594222", bookCode: "K0700", riskPoint: "单日提现超限", riskLevel: "中", status: "10", suggestion: "进入人工复核" })
    ],
    help: pageHelp("风险命中", "风控复核", ["fin_risk_template", "fin_black_list"], ["展示命中原因、风险等级、处理建议。", "不做真实审批，只演示复核路径。"])
  }),
  auditLog: operationalModule({
    title: "操作审计",
    subtitle: "风控合规",
    pageType: "reference",
    desc: "模拟展示关键财务配置和风险处理的操作审计，帮助说明合规留痕要求。",
    table: "audit_log_demo",
    route: "/finance/demo/auditLog",
    permission: "demo:finance:auditLog",
    scenario: "合规或管理人员查看谁在何时修改了关键配置。",
    summary: [metric("今日操作", "42", "配置/审核/处理", "info"), metric("敏感操作", "8", "模板和名单", "warning"), metric("失败登录", "0", "演示数据", "success")],
    quickActions: [quick("黑/红名单", "blackList"), quick("收银策略", "cashPolicy"), quick("记账策略", "bookPolicy")],
    columns: ["operator", "action", "module", "target", "operateTime", "status"],
    filters: ["operator", "module", "action", "status"],
    fields: commonFields(["operator", "action", "module", "target", "operateTime", "status", "remark"]),
    rows: [
      row({ operator: "财务运营A", action: "修改记账模板", module: "记账模板", target: "K0700", operateTime: "2026-05-22 10:20:00", status: "00", remark: "调整提现成本科目" }),
      row({ operator: "风控运营B", action: "新增黑名单", module: "收银流水", target: "1142889689825594113", operateTime: "2026-05-22 10:28:00", status: "00", remark: "提现异常复核" }),
      row({ operator: "系统管理员", action: "调整收银策略", module: "收银流水", target: "withdraw", operateTime: "2026-05-22 10:35:00", status: "00", remark: "收银策略独立权限变更" }),
      row({ operator: "站点财务A", action: "确认代理借款", module: "客户余额", target: "LEDGER-SITE-20260522001", operateTime: "2026-05-22 10:42:00", status: "00", remark: "确认代理借款和还款计划" }),
      row({ operator: "财务运营B", action: "还款核销", module: "客户余额", target: "REPAY-20260522002", operateTime: "2026-05-22 10:55:00", status: "10", remark: "待负责人复核" }),
      row({ operator: "总站财务", action: "确认月结扣款", module: "出入款帐户", target: "SETTLE-202604-HED01", operateTime: "2026-05-01 09:20:00", status: "00", remark: "扣减华东站点资金池" }),
      row({ operator: "总站财务", action: "增加站点额度", module: "出入款帐户", target: "QUOTA-20260518001", operateTime: "2026-05-18 14:10:00", status: "00", remark: "华南站点资金池加额" }),
      row({ operator: "研发值班", action: "关闭异常", module: "工作台", target: "UpdateCashOrder", operateTime: "2026-05-22 11:05:00", status: "00", remark: "签名字段已修正" })
    ],
    help: pageHelp("操作审计", "合规留痕演示", ["操作日志演示，无实际表"], ["真实项目应记录关键配置变更、审核动作和异常处理动作。"])
  }),
  master: tableModule("交易字典", "配置中心", "维护交易类型、记账码和通用参数，是收银流程获取 book_code 的来源。", "comm_code_master", "/finance/master", "finance:master", ["title", "code", "codeKey", "value1", "status", "updateTime"], ["code", "codeKey", "status"], [
    row({ title: "绿色积分充值", code: "finance_trade", codeKey: "top_up_20", value1: "K1002", status: "00", updateTime: "2024-10-27 10:27:18" }),
    row({ title: "余额充值", code: "trade", codeKey: "recharge_10", value1: "K0100", status: "00", updateTime: "2026-03-22 09:30:00" }),
    row({ title: "用户提现", code: "trade", codeKey: "withdraw", value1: "K0700", status: "00", updateTime: "2026-03-22 09:35:00" })
  ], "交易字典影响 GetBookCode，需统一 code 是 trade 还是 finance_trade。"),
  accountType: tableModule("账户类型", "配置中心", "维护余额、积分、资金池等账户类型编码。", "fin_account_type", "/finance/accountType", "finance:accountType", ["title", "accountType", "status"], ["title", "accountType"], [
    row({ title: "余额", accountType: "10", status: "00" }),
    row({ title: "积分", accountType: "20", status: "00" }),
    row({ title: "资金池", accountType: "30", status: "00" })
  ], "账户类型影响余额账户和记账模板，不建议随意修改编码。"),
  objectAccount: tableModule("账户对象", "配置中心", "维护账户对象与账户类型组合，账户开通时按该配置创建余额账户。", "fin_object_account", "/finance/objectAccount", "finance:objectAccount", ["title", "accountObject", "accountType", "status"], ["title", "accountObject", "accountType"], [
    row({ title: "商户余额账户", accountObject: "10", accountType: "10", status: "00" }),
    row({ title: "商户积分账户", accountObject: "10", accountType: "20", status: "00" }),
    row({ title: "代理资金池", accountObject: "20", accountType: "30", status: "00" }),
    row({ title: "通道资金池", accountObject: "30", accountType: "30", status: "00" })
  ], "账户对象配置影响账户开通结果。"),
  category: tableModule("记账分类", "配置中心", "维护资产、负债、收入、成本等会计分类，并影响余额借贷方向。", "fin_book_category", "/finance/category", "finance:category", ["title", "bookCategory", "rule", "status"], ["title", "bookCategory"], [
    row({ title: "资产", bookCategory: "1", rule: "借增贷减", status: "00" }),
    row({ title: "负债", bookCategory: "2", rule: "借减贷增", status: "00" }),
    row({ title: "所有者权益", bookCategory: "3", rule: "借减贷增", status: "00" }),
    row({ title: "主营成本", bookCategory: "5", rule: "借增贷减", status: "00" }),
    row({ title: "主营收入", bookCategory: "6", rule: "借减贷增", status: "00" })
  ], "记账分类影响余额更新方向，属于高影响配置。"),
  cashPolicy: cashPolicyModule(),
  bookPolicy: bookPolicyModule(),
  strategyConfig: strategyModule(),
  relation: relationModule(),
  statusDict: statusDictModule(),
  riskReport: riskReportModule()
};

applyDomainMetadata();

const appState = {
  activeKey: "dashboard",
  data: {},
  filters: {},
  collapsedMenuGroups: loadCollapsedMenuGroups()
};

function metric(label, value, note, tone = "info") {
  return { label, value, note, tone };
}

function quick(label, target, tone = "") {
  return { label, target, tone };
}

function row(data) {
  return data;
}

function operationalModule(config) {
  return {
    type: "operational",
    pageType: "management",
    actions: null,
    summary: [],
    quickActions: [],
    filters: [],
    rows: [],
    fields: [],
    columns: [],
    ...config
  };
}

function tableModule(title, subtitle, desc, table, route, permission, columns, filters, rows, note) {
  return operationalModule({
    pageType: "management",
    title,
    subtitle,
    desc,
    table,
    route,
    permission,
    scenario: note,
    summary: [
      metric("演示数据", String(rows.length), "本地 Mock", "info"),
      metric("关联表", table, "详情可查看字段", "success"),
      metric("操作能力", "查/增/改/删/导", "仅演示", "warning")
    ],
    quickActions: [quick("查看功能说明", "__help")],
    columns,
    filters,
    fields: commonFields([...new Set([...columns, ...filters, "suggestion", "remark", "route", "permission", "tableName"])]),
    rows,
    help: pageHelp(title, "配置/明细管理", [table], [
      desc,
      "列表默认展示运营高频字段，完整字段在详情弹窗中查看。",
      "新增、编辑、删除和导出均为前端演示，不调用真实接口。"
    ], [note])
  });
}

function paymentAccountHomeModule() {
  return operationalModule({
    title: "出入款帐户总览",
    subtitle: "出入款帐户",
    pageType: "overview",
    desc: "把私有账户、站点资金池、总站月结和额度调整收拢到出入款帐户域，突出资金池可提现与月结扣款边界。",
    table: "payment_account_home_demo",
    route: "/finance/demo/paymentAccount/home",
    permission: "demo:finance:paymentAccount:home",
    scenario: "总站财务和财务运营先看站点可提现资金池，再进入月结账单或额度调整处理。",
    summary: [
      metric("可用资金池", "¥304,000.00", "站点可提现", "success"),
      metric("待扣月结", "3", "总站账单", "warning"),
      metric("资金池不足", "1", "阻断扣款", "danger"),
      metric("待确认额度", "2", "加额/减额", "info")
    ],
    quickActions: [quick("站点资金池", "siteFundPool"), quick("月结账单", "monthlySettlement", "danger"), quick("月结试算", "settlementTrial"), quick("额度调整", "quotaAdjust"), quick("资金池流水", "fundPoolFlow"), quick("私有账户", "privateAccount")],
    columns: ["item", "bizType", "owner", "status", "suggestion", "route"],
    filters: ["item", "bizType", "status"],
    fields: commonFields(["item", "bizType", "owner", "status", "suggestion", "route", "permission", "tableName"]),
    rows: [
      row({ item: "私有账户", bizType: "系统出入款账户", owner: "财务配置", status: "00", suggestion: "维护系统现金、银行存款、收入和成本账户", route: "#/privateAccount", permission: "finance:privateAccount", tableName: "fin_private_account" }),
      row({ item: "站点资金池", bizType: "站点可提现金额", owner: "总站财务", status: "10", suggestion: "查看站点可用、冻结和不足状态", route: "#/siteFundPool", permission: "demo:finance:fundPool:site", tableName: "fund_pool_demo" }),
      row({ item: "月结账单", bizType: "总站月结扣款", owner: "总站财务", status: "10", suggestion: "资金池充足才允许确认扣款", route: "#/monthlySettlement", permission: "demo:finance:settlement:monthly", tableName: "monthly_settlement_demo" }),
      row({ item: "额度调整", bizType: "总站增减额度", owner: "总站财务", status: "10", suggestion: "确认后只更新演示资金池和流水", route: "#/quotaAdjust", permission: "demo:finance:fundPool:quota", tableName: "fund_pool_quota_adjust_demo" })
    ],
    flow: [
      ["查看资金池", "确认单站点可提现金额和冻结金额。", "siteFundPool"],
      ["月结试算", "按充值、提现和总站额度调整形成建议扣款。", "settlementTrial"],
      ["确认扣款", "只扣站点资金池，不扣代理或会员个人余额。", "monthlySettlement"],
      ["流水留痕", "每次加额、减额、扣款都形成资金池流水。", "fundPoolFlow"]
    ],
    help: pageHelp("出入款帐户总览", "出入款帐户域入口", ["fin_private_account", "fund_pool_demo", "monthly_settlement_demo", "fund_pool_flow_demo"], ["出入款帐户域关注系统账户、站点资金池、月结扣款和总站额度调整。", "总览页只做汇总和跳转，不合并私有账户、月结账单和额度调整的管理权限。", "站点资金池是单个站点可提现金额，资金不足时阻断月结扣款。"], ["四大模块整合的是运营导航，不代表后端 Controller、权限或表结构合并。"])
  });
}

function cashFlowHomeModule() {
  return operationalModule({
    title: "收银流水总览",
    subtitle: "收银流水",
    pageType: "overview",
    desc: "把收银申请、收银流水、历史归档、充值提现场景、收银策略和交易风控收拢到收银流水域。",
    table: "cash_flow_home_demo",
    route: "/finance/demo/cashFlow/home",
    permission: "demo:finance:cashFlow:home",
    scenario: "财务审核和风控运营从这里进入待审核申请、失败流水和风控命中排障。",
    summary: [
      metric("待审申请", "24", "存款/取款", "warning"),
      metric("今日流水", "132", "收银主流水", "success"),
      metric("失败流水", "5", "验签/风控", "danger"),
      metric("风控命中", "18", "名单和规则", "info")
    ],
    quickActions: [quick("收银申请", "cashRequest", "danger"), quick("收银流水", "cashOrder"), quick("收银历史", "cashHistory"), quick("充值/提现场景", "cashScenario"), quick("收银策略", "cashPolicy"), quick("交易字典", "master"), quick("风险命中", "riskHit", "danger")],
    columns: ["item", "bizType", "owner", "status", "suggestion", "route"],
    filters: ["item", "bizType", "status"],
    fields: commonFields(["item", "bizType", "owner", "status", "suggestion", "route", "permission", "tableName"]),
    rows: [
      row({ item: "收银申请", bizType: "存款/取款审核", owner: "财务审核", status: "10", suggestion: "保留通过/驳回确认弹窗，审核后进入本地 Mock 状态流转", route: "#/cashRequest", permission: "finance:request", tableName: "fin_cash_request" }),
      row({ item: "收银流水", bizType: "交易主流水", owner: "财务运营", status: "00", suggestion: "重点查看交易类型、记账码、金额和失败原因", route: "#/cashOrder", permission: "finance:cashOrder", tableName: "fin_cash_order" }),
      row({ item: "收银策略", bizType: "处理链配置", owner: "系统管理员", status: "10", suggestion: "独立权限维护，不和记账策略合并编辑", route: "#/cashPolicy", permission: "finance:cashPolicy", tableName: "fin_cash_policy" }),
      row({ item: "交易字典", bizType: "交易类型映射", owner: "系统管理员", status: "00", suggestion: "维护 trade_type 到 book_code 的映射，影响收银转记账", route: "#/master", permission: "finance:master", tableName: "comm_code_master" }),
      row({ item: "风控命中", bizType: "交易准入复核", owner: "风控运营", status: "10", suggestion: "黑/红名单和风控规则就近归入收银流水域", route: "#/riskHit", permission: "demo:finance:riskHit", tableName: "fin_risk_template / fin_black_list" })
    ],
    flow: [
      ["申请审核", "存款/取款申请二次确认。", "cashRequest"],
      ["生成流水", "按交易类型和记账码保存收银流水。", "cashOrder"],
      ["风控复核", "命中黑/红名单或风控规则时进入复核。", "riskHit"],
      ["历史归档", "完成后的收银流水进入历史查询。", "cashHistory"]
    ],
    help: pageHelp("收银流水总览", "收银流水域入口", ["comm_code_master", "fin_cash_request", "fin_cash_order", "fin_cash_order_history", "fin_cash_policy", "fin_risk_template", "fin_black_list"], ["收银流水域关注交易进入财务中心后的申请、流水、失败原因、交易字典、策略和风控。", "收银申请保留存款/取款审核按钮和确认弹窗。", "收银策略与记账策略不可合并编辑。"], ["总览页只做汇总和跳转，真实处理仍进入独立页面。"])
  });
}

function bookTemplateHomeModule() {
  return operationalModule({
    title: "记账模板总览",
    subtitle: "记账模板",
    pageType: "overview",
    desc: "把记账模板、记账策略、记账凭证、试算平衡、记账历史和记账分类收拢到记账模板域。",
    table: "book_template_home_demo",
    route: "/finance/demo/bookTemplate/home",
    permission: "demo:finance:bookTemplate:home",
    scenario: "财务配置和研发排障先看模板影响范围，再进入模板、策略或试算平衡页面。",
    summary: [
      metric("启用模板", "4", "充值/提现", "success"),
      metric("待复核策略", "2", "高影响配置", "warning"),
      metric("不平衡批次", "2", "需修复模板", "danger"),
      metric("今日凭证", "118", "模拟数据", "info")
    ],
    quickActions: [quick("记账模板", "bookTemplate", "danger"), quick("记账策略", "bookPolicy"), quick("记账凭证", "bookOrder"), quick("试算平衡", "trialBalance", "danger"), quick("记账分类", "category")],
    columns: ["item", "bizType", "owner", "status", "suggestion", "route"],
    filters: ["item", "bizType", "status"],
    fields: commonFields(["item", "bizType", "owner", "status", "suggestion", "route", "permission", "tableName"]),
    rows: [
      row({ item: "记账模板", bizType: "借贷凭证模板", owner: "财务配置", status: "10", suggestion: "按记账码配置借贷方向、科目和金额 Bean", route: "#/bookTemplate", permission: "finance:bookTemplate", tableName: "fin_book_template" }),
      row({ item: "记账策略", bizType: "记账处理规则", owner: "系统管理员", status: "10", suggestion: "独立权限维护，不和收银策略合并编辑", route: "#/bookPolicy", permission: "finance:bookPolicy", tableName: "fin_book_policy" }),
      row({ item: "试算平衡", bizType: "记账质量检查", owner: "财务运营", status: "09", suggestion: "借方合计必须等于贷方合计，不平衡不得落账", route: "#/trialBalance", permission: "demo:finance:trialBalance", tableName: "fin_book_order / fin_book_template" }),
      row({ item: "记账分类", bizType: "会计分类配置", owner: "财务配置", status: "00", suggestion: "影响余额借贷方向，属于高影响配置", route: "#/category", permission: "finance:category", tableName: "fin_book_category" })
    ],
    flow: [
      ["配置模板", "按记账码维护借贷模板。", "bookTemplate"],
      ["策略校验", "按记账策略生成或转换凭证。", "bookPolicy"],
      ["生成凭证", "收银流水按模板生成记账凭证。", "bookOrder"],
      ["试算平衡", "借贷平衡后才允许余额更新。", "trialBalance"]
    ],
    help: pageHelp("记账模板总览", "记账模板域入口", ["fin_book_template", "fin_book_policy", "fin_book_order", "fin_book_order_history", "fin_book_category"], ["记账模板域关注模板配置、策略、凭证生成和试算平衡。", "记账模板、记账策略和记账分类均为高影响配置，必须保留独立权限。", "总览页不承载模板编辑动作。"], ["四大模块整合后，记账相关配置不再散落在配置中心。"])
  });
}

function customerBalanceHomeModule() {
  return operationalModule({
    title: "客户余额总览",
    subtitle: "客户余额",
    pageType: "overview",
    desc: "把账户总览、余额明细、账户开通、账户类型/对象、站点身份和往来台账收拢到客户余额域。",
    table: "customer_balance_home_demo",
    route: "/finance/demo/customerBalance/home",
    permission: "demo:finance:customerBalance:home",
    scenario: "财务运营先看客户余额和账户结构，再下钻余额明细、账户开通或站点/代理往来台账。",
    summary: [
      metric("总余额", "¥1,181,888.00", "账户汇总", "success"),
      metric("账户数量", "386", "站点/代理/会员", "info"),
      metric("往来未结清", "¥188,000.00", "不含会员", "danger"),
      metric("负余额账户", "2", "需复核", "warning")
    ],
    quickActions: [quick("账户总览", "accountOverview"), quick("余额明细", "balance"), quick("账户开通", "accountRegister"), quick("往来总览", "ledgerOverview", "danger"), quick("代理欠款", "agentDebtLedger", "danger"), quick("还款核销", "repaymentLedger")],
    columns: ["item", "bizType", "owner", "status", "suggestion", "route"],
    filters: ["item", "bizType", "status"],
    fields: commonFields(["item", "bizType", "owner", "status", "suggestion", "route", "permission", "tableName"]),
    rows: [
      row({ item: "余额明细", bizType: "客户账户余额", owner: "财务运营", status: "00", suggestion: "查询账套、账户类型、账户对象和发生额", route: "#/balance", permission: "finance:balance", tableName: "fin_balance" }),
      row({ item: "账户开通", bizType: "账户注册演示", owner: "运营配置", status: "10", suggestion: "只读流程页，真实开通需后端接口和幂等校验", route: "#/accountRegister", permission: "demo:finance:accountRegister", tableName: "fin_object_account / fin_private_account / fin_balance" }),
      row({ item: "站点身份", bizType: "站点账套主体", owner: "站点财务", status: "00", suggestion: "用于往来台账主体识别，不改变现有账户对象编码", route: "#/siteIdentity", permission: "demo:finance:ledger:site", tableName: "site_identity_demo" }),
      row({ item: "往来台账", bizType: "站点/代理借欠", owner: "站点财务", status: "10", suggestion: "会员/用户不允许进入借款、欠款或核销台账", route: "#/ledgerOverview", permission: "demo:finance:ledger:overview", tableName: "ledger_overview_demo" })
    ],
    flow: [
      ["账户配置", "维护账户类型和账户对象。", "accountType"],
      ["账户开通", "按对象和类型生成余额账户。", "accountRegister"],
      ["余额查询", "按账套、对象和账户类型查询余额。", "balance"],
      ["往来追踪", "站点和代理借欠关系进入台账管理。", "ledgerOverview"]
    ],
    help: pageHelp("客户余额总览", "客户余额域入口", ["fin_balance", "fin_account_type", "fin_object_account", "ledger_overview_demo", "site_identity_demo"], ["客户余额域关注余额查询、账户开通、账户配置和站点/代理往来。", "会员/用户只参与充值、提现、余额和交易流水，不允许产生借款或欠款台账。", "往来台账是产品补充原型，真实后端未实现。"], ["账户余额和往来台账不可混为一张表，真实落地需明确资金余额、应收应付和核销的边界。"])
  });
}

function settlementOverviewModule() {
  return operationalModule({
    title: "月结总览",
    subtitle: "月结中心",
    pageType: "overview",
    desc: "总站按月查看各站点月结进度、待扣金额、资金池不足和异常账单。",
    table: "settlement_overview_demo",
    route: "/finance/demo/settlement/overview",
    permission: "demo:finance:settlement:overview",
    scenario: "总站财务每月先看月结总览，再进入试算、账单和资金池页面处理。",
    summary: [metric("待结站点", "3", "2026-05", "warning"), metric("已结站点", "1", "已扣款", "success"), metric("待扣金额", "¥156,000.00", "最终应扣", "warning"), metric("资金池不足", "1", "阻断扣款", "danger"), metric("异常账单", "2", "需复核", "danger")],
    quickActions: quickActions.settlement,
    columns: ["settlementMonth", "siteName", "finalDeductAmount", "availableAmount", "afterBalance", "settlementStatus", "suggestion"],
    filters: ["settlementMonth", "siteName", "settlementStatus"],
    fields: commonFields(["settlementMonth", "siteId", "siteName", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "availableAmount", "afterBalance", "settlementStatus", "suggestion", "route"]),
    rows: [
      row({ settlementMonth: "2026-05", siteId: "site:100100100", siteName: "华东站点", systemTrialAmount: "34000.00", manualAdjustAmount: "2000.00", finalDeductAmount: "36000.00", availableAmount: "256000.00", afterBalance: "220000.00", settlementStatus: "pending", suggestion: "资金池充足，可确认扣款", route: "#/monthlySettlement" }),
      row({ settlementMonth: "2026-05", siteId: "site:200200200", siteName: "华南站点", systemTrialAmount: "57000.00", manualAdjustAmount: "5000.00", finalDeductAmount: "62000.00", availableAmount: "48000.00", afterBalance: "-14000.00", settlementStatus: "insufficient", suggestion: "资金池不足，阻断扣款", route: "#/monthlySettlement" }),
      row({ settlementMonth: "2026-04", siteId: "site:100100100", siteName: "华东站点", systemTrialAmount: "30000.00", manualAdjustAmount: "0.00", finalDeductAmount: "30000.00", availableAmount: "286000.00", afterBalance: "256000.00", settlementStatus: "deducted", suggestion: "已扣款归档", route: "#/fundPoolFlow" })
    ],
    flow: [
      ["月结试算", "汇总充值、提现和总站额度调整。", "settlementTrial"],
      ["账单确认", "确认最终应扣金额。", "monthlySettlement"],
      ["扣资金池", "只扣站点资金池，不扣会员或代理余额。", "siteFundPool"],
      ["流水留痕", "生成资金池月结扣款流水。", "fundPoolFlow"]
    ],
    help: pageHelp("月结总览", "总站月结进度总览", ["settlement_overview_demo", "fund_pool_demo"], ["月结由总站对下属站点发起。", "资金池不足时阻断扣款并进入异常预警。", "总览页只看进度和跳转，不直接扣款。"], ["当前为静态演示，真实开发需新增月结单、资金池流水、扣款服务和操作审计。"])
  });
}

function siteFundPoolModule() {
  return operationalModule({
    title: "站点资金池",
    subtitle: "月结中心",
    pageType: "management",
    desc: "展示单个站点可提现资金池余额，以及充值、提现、总站额度调整和月结扣款对资金池的影响。",
    table: "fund_pool_demo",
    route: "/finance/demo/fundPool/site",
    permission: "demo:finance:fundPool:site",
    scenario: "总站财务在月结扣款前确认站点可用资金池是否足够。",
    summary: [metric("资金池合计", "¥332,000.00", "含冻结", "success"), metric("可用资金池", "¥304,000.00", "可提现", "success"), metric("冻结金额", "¥28,000.00", "风控/待清算", "warning"), metric("不足站点", "1", "华南站点", "danger")],
    quickActions: [quick("月结账单", "monthlySettlement", "danger"), quick("资金池流水", "fundPoolFlow"), quick("额度调整", "quotaAdjust")],
    columns: ["siteId", "siteName", "poolBalance", "frozenAmount", "availableAmount", "rechargeIncrease", "withdrawDecrease", "headAddAmount", "headReduceAmount", "settlementDeductAmount", "poolStatus"],
    filters: ["siteId", "siteName", "poolStatus"],
    fields: commonFields(["siteId", "siteName", "poolBalance", "frozenAmount", "availableAmount", "rechargeIncrease", "withdrawDecrease", "headAddAmount", "headReduceAmount", "settlementDeductAmount", "poolStatus", "suggestion"]),
    rows: [
      row({ siteId: "site:100100100", siteName: "华东站点", poolBalance: "280000.00", frozenAmount: "24000.00", availableAmount: "256000.00", rechargeIncrease: "420000.00", withdrawDecrease: "184000.00", headAddAmount: "50000.00", headReduceAmount: "12000.00", settlementDeductAmount: "30000.00", poolStatus: "normal", suggestion: "可覆盖本月月结扣款" }),
      row({ siteId: "site:200200200", siteName: "华南站点", poolBalance: "52000.00", frozenAmount: "4000.00", availableAmount: "48000.00", rechargeIncrease: "180000.00", withdrawDecrease: "111000.00", headAddAmount: "20000.00", headReduceAmount: "9000.00", settlementDeductAmount: "30000.00", poolStatus: "insufficient", suggestion: "可用资金池低于本月最终应扣金额" })
    ],
    help: pageHelp("站点资金池", "站点可提现金额管理", ["fund_pool_demo"], ["站点资金池是单个站点可提现金额。", "增加来源为站点/代理/会员充值和总站增加额度。", "减少来源为站点/代理/会员提现、总站减少额度和月结扣款。", "月结扣款只扣站点资金池。"], ["当前为产品补充原型，后端未实现；真实开发建议资金池余额与资金池流水分表。"])
  });
}

function settlementTrialModule() {
  return operationalModule({
    title: "月结试算",
    subtitle: "月结中心",
    pageType: "check",
    desc: "展示站点月结的自动试算口径：充值、提现、总站额度调整和最终建议扣款。",
    table: "settlement_trial_demo",
    route: "/finance/demo/settlement/trial",
    permission: "demo:finance:settlement:trial",
    scenario: "总站财务在生成正式月结账单前，先检查试算来源是否合理。",
    summary: [metric("试算站点", "2", "2026-05", "info"), metric("系统试算", "¥91,000.00", "合计", "warning"), metric("人工调整", "¥7,000.00", "复核后", "info"), metric("建议扣款", "¥98,000.00", "最终应扣", "danger")],
    quickActions: [quick("月结账单", "monthlySettlement"), quick("资金池流水", "fundPoolFlow"), quick("站点资金池", "siteFundPool")],
    columns: ["settlementMonth", "siteName", "siteRechargeAmount", "agentRechargeAmount", "memberRechargeAmount", "siteWithdrawAmount", "agentWithdrawAmount", "memberWithdrawAmount", "headAddAmount", "headReduceAmount", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "settlementStatus"],
    filters: ["settlementMonth", "siteName", "settlementStatus"],
    fields: commonFields(["settlementMonth", "siteId", "siteName", "siteRechargeAmount", "agentRechargeAmount", "memberRechargeAmount", "siteWithdrawAmount", "agentWithdrawAmount", "memberWithdrawAmount", "headAddAmount", "headReduceAmount", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "settlementStatus", "formulaDesc", "suggestion"]),
    rows: [
      row({ settlementMonth: "2026-05", siteId: "site:100100100", siteName: "华东站点", siteRechargeAmount: "30000.00", agentRechargeAmount: "180000.00", memberRechargeAmount: "210000.00", siteWithdrawAmount: "20000.00", agentWithdrawAmount: "84000.00", memberWithdrawAmount: "80000.00", headAddAmount: "50000.00", headReduceAmount: "12000.00", systemTrialAmount: "34000.00", manualAdjustAmount: "2000.00", finalDeductAmount: "36000.00", settlementStatus: "pending", formulaDesc: "充值增加资金池，提现和总站减额减少资金池，月结以账单结果扣站点资金池", suggestion: "试算无异常，可生成账单" }),
      row({ settlementMonth: "2026-05", siteId: "site:200200200", siteName: "华南站点", siteRechargeAmount: "18000.00", agentRechargeAmount: "76000.00", memberRechargeAmount: "86000.00", siteWithdrawAmount: "16000.00", agentWithdrawAmount: "40000.00", memberWithdrawAmount: "55000.00", headAddAmount: "20000.00", headReduceAmount: "9000.00", systemTrialAmount: "57000.00", manualAdjustAmount: "5000.00", finalDeductAmount: "62000.00", settlementStatus: "insufficient", formulaDesc: "最终应扣金额高于当前可用资金池", suggestion: "确认扣款前需要补足站点资金池" })
    ],
    help: pageHelp("月结试算", "月结账单生成前检查", ["settlement_trial_demo", "fund_pool_flow_demo"], ["试算页同时展示系统试算、人工调整和最终应扣金额。", "试算页只读，不直接扣款。", "资金池不足应在月结账单页阻断确认扣款。"], ["当前为静态演示，真实开发需由后端按照确定公式生成试算数据。"])
  });
}

function monthlySettlementModule() {
  return operationalModule({
    title: "月结账单",
    subtitle: "月结中心",
    pageType: "management",
    actions: { confirmSettle: true, rejectSettle: true },
    desc: "展示总站对站点的月结账单结果，支持确认扣款和退回调整演示。",
    table: "monthly_settlement_demo",
    route: "/finance/demo/settlement/monthly",
    permission: "demo:finance:settlement:monthly",
    scenario: "总站财务确认每个站点月结账单，资金池足够时扣款，资金不足时阻断并预警。",
    summary: [metric("待扣款", "2", "2026-05", "warning"), metric("已扣款", "1", "2026-04", "success"), metric("最终应扣", "¥128,000.00", "列表合计", "danger"), metric("资金不足", "1", "华南站点", "danger")],
    quickActions: [quick("月结试算", "settlementTrial"), quick("站点资金池", "siteFundPool"), quick("额度调整", "quotaAdjust"), quick("资金池流水", "fundPoolFlow")],
    columns: ["settlementId", "settlementMonth", "siteName", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "availableAmount", "afterBalance", "settlementStatus", "handler"],
    filters: ["settlementId", "settlementMonth", "siteName", "settlementStatus"],
    fields: commonFields(["settlementId", "settlementMonth", "siteId", "siteName", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "poolBalance", "availableAmount", "beforeBalance", "afterBalance", "settlementStatus", "handler", "approvalTime", "approvalRemark", "suggestion"]),
    rows: [
      row({ settlementId: "SETTLE-202605-HED01", settlementMonth: "2026-05", siteId: "site:100100100", siteName: "华东站点", systemTrialAmount: "34000.00", manualAdjustAmount: "2000.00", finalDeductAmount: "36000.00", poolBalance: "280000.00", availableAmount: "256000.00", beforeBalance: "256000.00", afterBalance: "220000.00", settlementStatus: "pending", handler: "总站财务", approvalTime: "", approvalRemark: "", suggestion: "资金池充足，可确认扣款" }),
      row({ settlementId: "SETTLE-202605-SOU01", settlementMonth: "2026-05", siteId: "site:200200200", siteName: "华南站点", systemTrialAmount: "57000.00", manualAdjustAmount: "5000.00", finalDeductAmount: "62000.00", poolBalance: "52000.00", availableAmount: "48000.00", beforeBalance: "48000.00", afterBalance: "-14000.00", settlementStatus: "pending", handler: "总站财务", approvalTime: "", approvalRemark: "", suggestion: "资金池不足，确认扣款会被阻断" }),
      row({ settlementId: "SETTLE-202604-HED01", settlementMonth: "2026-04", siteId: "site:100100100", siteName: "华东站点", systemTrialAmount: "30000.00", manualAdjustAmount: "0.00", finalDeductAmount: "30000.00", poolBalance: "286000.00", availableAmount: "286000.00", beforeBalance: "286000.00", afterBalance: "256000.00", settlementStatus: "deducted", handler: "总站财务", approvalTime: "2026-05-01 09:20:00", approvalRemark: "已完成月结扣款", suggestion: "已归档" })
    ],
    help: pageHelp("月结账单", "总站月结扣款管理", ["monthly_settlement_demo", "fund_pool_demo", "fund_pool_flow_demo"], ["月结账单展示系统试算金额、人工调整金额和最终应扣金额。", "确认扣款只扣站点资金池，不扣代理或会员个人余额。", "资金池不足时阻断扣款，月结单标记资金不足并进入异常预警。"], ["当前为静态演示，真实开发需增加扣款接口、幂等校验、审批日志和资金池流水落库。"])
  });
}

function fundPoolFlowModule() {
  return operationalModule({
    title: "资金池流水",
    subtitle: "月结中心",
    pageType: "management",
    desc: "记录站点资金池的每一笔增加和减少来源，支撑月结扣款追踪。",
    table: "fund_pool_flow_demo",
    route: "/finance/demo/fundPool/flow",
    permission: "demo:finance:fundPool:flow",
    scenario: "总站财务排查资金池余额时，按流水来源追踪充值、提现、额度调整和月结扣款。",
    summary: [metric("本月增加", "¥670,000.00", "充值/加额", "success"), metric("本月减少", "¥416,000.00", "提现/减额/月结", "warning"), metric("月结扣款", "¥30,000.00", "已发生", "danger"), metric("流水笔数", "8", "演示数据", "info")],
    quickActions: [quick("站点资金池", "siteFundPool"), quick("月结账单", "monthlySettlement"), quick("额度调整", "quotaAdjust")],
    columns: ["flowId", "siteName", "changeType", "changeAmount", "beforeBalance", "afterBalance", "operateTime", "operatorType", "settlementId"],
    filters: ["flowId", "siteName", "changeType", "settlementId"],
    fields: commonFields(["flowId", "siteId", "siteName", "changeType", "changeAmount", "beforeBalance", "afterBalance", "operateTime", "operatorType", "settlementId", "remark"]),
    rows: [
      row({ flowId: "POOLFLOW-20260522001", siteId: "site:100100100", siteName: "华东站点", changeType: "member_recharge", changeAmount: "210000.00", beforeBalance: "70000.00", afterBalance: "280000.00", operateTime: "2026-05-22 10:00:00", operatorType: "会员充值", settlementId: "", remark: "会员充值增加站点资金池" }),
      row({ flowId: "POOLFLOW-20260522002", siteId: "site:100100100", siteName: "华东站点", changeType: "agent_withdraw", changeAmount: "-84000.00", beforeBalance: "364000.00", afterBalance: "280000.00", operateTime: "2026-05-22 10:10:00", operatorType: "代理提现", settlementId: "", remark: "代理提现减少站点资金池" }),
      row({ flowId: "POOLFLOW-20260522003", siteId: "site:100100100", siteName: "华东站点", changeType: "settlement_deduct", changeAmount: "-30000.00", beforeBalance: "286000.00", afterBalance: "256000.00", operateTime: "2026-05-01 09:20:00", operatorType: "总站月结", settlementId: "SETTLE-202604-HED01", remark: "2026-04 月结扣款" }),
      row({ flowId: "POOLFLOW-20260522004", siteId: "site:200200200", siteName: "华南站点", changeType: "head_add", changeAmount: "20000.00", beforeBalance: "32000.00", afterBalance: "52000.00", operateTime: "2026-05-18 14:10:00", operatorType: "总站增加额度", settlementId: "", remark: "总站临时增加站点额度" })
    ],
    help: pageHelp("资金池流水", "站点资金池增减追踪", ["fund_pool_flow_demo"], ["资金池增加来源：站点充值、代理充值、会员充值、总站增加额度。", "资金池减少来源：站点提现、代理提现、会员提现、总站减少额度、月结扣款。", "月结扣款必须生成资金池流水用于审计。"], ["当前为静态演示，真实开发需保证流水幂等和余额一致性。"])
  });
}

function quotaAdjustModule() {
  return operationalModule({
    title: "额度调整",
    subtitle: "月结中心",
    pageType: "management",
    actions: { applyQuota: true },
    desc: "演示总站给站点资金池增加或减少额度，确认后更新本地 Mock 资金池和流水。",
    table: "fund_pool_quota_adjust_demo",
    route: "/finance/demo/fundPool/quota",
    permission: "demo:finance:fundPool:quota",
    scenario: "总站财务在月结扣款前后对站点资金池做人工额度调整。",
    summary: [metric("待确认", "2", "加额/减额", "warning"), metric("本月加额", "¥70,000.00", "总站操作", "success"), metric("本月减额", "¥21,000.00", "总站操作", "danger")],
    quickActions: [quick("站点资金池", "siteFundPool"), quick("月结账单", "monthlySettlement"), quick("资金池流水", "fundPoolFlow")],
    columns: ["adjustId", "siteName", "changeType", "changeAmount", "beforeBalance", "afterBalance", "quotaStatus", "handler"],
    filters: ["adjustId", "siteName", "changeType", "quotaStatus"],
    fields: commonFields(["adjustId", "siteId", "siteName", "changeType", "changeAmount", "beforeBalance", "afterBalance", "quotaStatus", "handler", "approvalTime", "approvalRemark", "remark"]),
    rows: [
      row({ adjustId: "QUOTA-20260522001", siteId: "site:200200200", siteName: "华南站点", changeType: "head_add", changeAmount: "20000.00", beforeBalance: "48000.00", afterBalance: "68000.00", quotaStatus: "pending", handler: "总站财务", approvalTime: "", approvalRemark: "", remark: "补足月结扣款资金池" }),
      row({ adjustId: "QUOTA-20260522002", siteId: "site:100100100", siteName: "华东站点", changeType: "head_reduce", changeAmount: "-12000.00", beforeBalance: "256000.00", afterBalance: "244000.00", quotaStatus: "pending", handler: "总站财务", approvalTime: "", approvalRemark: "", remark: "回收临时额度" }),
      row({ adjustId: "QUOTA-20260518001", siteId: "site:200200200", siteName: "华南站点", changeType: "head_add", changeAmount: "20000.00", beforeBalance: "32000.00", afterBalance: "52000.00", quotaStatus: "applied", handler: "总站财务", approvalTime: "2026-05-18 14:10:00", approvalRemark: "已增加额度", remark: "历史额度调整" })
    ],
    help: pageHelp("额度调整", "总站调整站点资金池额度", ["fund_pool_quota_adjust_demo", "fund_pool_demo", "fund_pool_flow_demo"], ["总站增加额度会增加站点资金池。", "总站减少额度会减少站点资金池，不能扣成负数。", "额度调整必须生成资金池流水。"], ["当前为静态演示，真实开发需增加审批、权限、原因、反向冲正和操作审计。"])
  });
}

function cashRequestModule() {
  return operationalModule({
    title: "收银申请",
    subtitle: "交易收银",
    desc: "保存业务侧提交的交易申请，运营可从这里处理待审核、待流转的申请。",
    table: "fin_cash_request",
    route: "/finance/request",
    permission: "finance:request",
    scenario: "提现、充值等业务先进入申请池，再流转到收银流水。",
    actions: { approve: true, reject: true },
    summary: [metric("待审核", "24", "存款/取款", "warning"), metric("今日通过", "86", "模拟数据", "success"), metric("驳回", "3", "余额或风控原因", "danger")],
    quickActions: [quick("收银流水", "cashOrder"), quick("充值/提现场景", "cashScenario")],
    columns: ["requestId", "userId", "tradeType", "amount", "status", "handler"],
    filters: ["requestId", "userId", "tradeType", "status"],
    fields: commonFields(["requestId", "userId", "userMobile", "userName", "tradeType", "amount", "toUserId", "details", "status", "handler", "approvalResult", "approvalTime", "approvalRemark", "remark"]),
    rows: [
      row({ requestId: "REQ202605220001", userId: "1142889689825594113", userMobile: "13800000000", userName: "取款用户", tradeType: "withdraw", amount: "1000.00", toUserId: "system", details: "取款申请", status: "10", handler: "财务审核", approvalResult: "待审核", approvalTime: "", approvalRemark: "", remark: "等待风控复核" }),
      row({ requestId: "REQ202605220002", userId: "1142889689825594222", userMobile: "13700000000", userName: "存款用户", tradeType: "recharge_10", amount: "500.00", toUserId: "system", details: "存款申请", status: "10", handler: "财务审核", approvalResult: "待审核", approvalTime: "", approvalRemark: "", remark: "等待财务确认到账" }),
      row({ requestId: "REQ202605220003", userId: "1142889689825594333", userMobile: "13600000000", userName: "已审用户", tradeType: "recharge_10", amount: "800.00", toUserId: "system", details: "存款申请", status: "00", handler: "系统", approvalResult: "通过", approvalTime: "2026-05-22 10:30:00", approvalRemark: "到账确认后通过", remark: "已流转收银流水" })
    ],
    help: pageHelp("收银申请", "存款/取款申请审核和流转", ["fin_cash_request"], ["存款、取款申请需要财务审核，通过后才进入收银流水和记账流程。", "驳回时必须填写原因，便于运营回溯和用户沟通。", "当前代码只有 CRUD，未明确申请到收银流水的正式服务；原型仅演示审核、驳回、流转入口，不实现真实 API。"])
  });
}

function cashOrderModule(title, table, route, permission, desc, subtitle) {
  return tableModule(title, subtitle, desc, table, route, permission, ["cashOrderId", "userId", "tradeType", "bookCode", "amount", "status", "fail"], ["cashOrderId", "userId", "tradeType", "bookCode", "status"], [
    row({ cashOrderId: "CASH202605220001", userId: "1142889689825594113", userMobile: "13800000000", userName: "演示用户", relationId: "ORDER10001", tradeType: "withdraw", bookCode: "K0700", transAmt: "1000.00", discount: "0.00", amount: "1000.00", status: "10", fail: "", toUserName: "系统", remark: "提现演示" }),
    row({ cashOrderId: "CASH202605220002", userId: "1142889689825594222", userMobile: "13700000000", userName: "充值用户", relationId: "ORDER10002", tradeType: "recharge_10", bookCode: "K0100", transAmt: "500.00", discount: "0.00", amount: "500.00", status: "00", fail: "", toUserName: "演示用户", remark: "充值演示" }),
    row({ cashOrderId: "CASH202605220003", userId: "1142889689825594333", userMobile: "13600000000", userName: "异常用户", relationId: "ORDER10003", tradeType: "withdraw", bookCode: "K0700", transAmt: "800.00", discount: "0.00", amount: "800.00", status: "09", fail: "签名不一致", toUserName: "系统", remark: "失败演示" })
  ], "流水类页面重点关注状态来源、失败原因和排障路径。");
}

function bookOrderModule(title, table, route, permission, desc, subtitle) {
  return tableModule(title, subtitle, desc, table, route, permission, ["bookOrderId", "batchId", "bookCode", "bookTitle", "debitAmount", "creditAmount", "direction", "status"], ["bookOrderId", "batchId", "bookCode", "status"], [
    row({ bookOrderId: "BOOK202605220001", bookTitle: "提现-系统现金", accountId: "1", batchId: "CASH202605220001", batchDetailId: "1", bookCode: "K0700", accountType: "10", accountObject: "40", bookCategory: "1", processId: "100210", debitAmount: "0.00", creditAmount: "1000.00", direction: "20", status: "10" }),
    row({ bookOrderId: "BOOK202605220001", bookTitle: "提现-主营成本", accountId: "1", batchId: "CASH202605220001", batchDetailId: "2", bookCode: "K0700", accountType: "10", accountObject: "40", bookCategory: "5", processId: "640110", debitAmount: "1000.00", creditAmount: "0.00", direction: "10", status: "10" }),
    row({ bookOrderId: "BOOK202605220002", bookTitle: "充值-系统现金", accountId: "1", batchId: "CASH202605220002", batchDetailId: "1", bookCode: "K0100", accountType: "10", accountObject: "40", bookCategory: "1", processId: "100210", debitAmount: "500.00", creditAmount: "0.00", direction: "10", status: "00" }),
    row({ bookOrderId: "BOOK202605220002", bookTitle: "充值-用户负债", accountId: "site:100100100", batchId: "CASH202605220002", batchDetailId: "4", bookCode: "K0100", accountType: "10", accountObject: "80", bookCategory: "2", processId: "1142889689825594222", debitAmount: "0.00", creditAmount: "500.00", direction: "20", status: "00" })
  ], "记账凭证必须借贷平衡，余额更新前需验签。");
}

function bookTemplateModule() {
  return tableModule("记账模板", "记账中心", "按记账码配置多条借贷凭证模板，是模板记账的核心配置。", "fin_book_template", "/finance/bookTemplate", "finance:bookTemplate", ["bookTitle", "bookCode", "batchDetailId", "accountType", "accountObject", "bookCategory", "direction"], ["bookTitle", "bookCode", "accountType", "accountObject"], [
    row({ bookTitle: "充值-系统现金", bookCode: "K0100", batchDetailId: "1", processId: "100210", processBean: "", accountType: "10", accountObject: "40", bookCategory: "1", direction: "10", debitAmountBean: "finance.book.cash_amount", creditAmountBean: "" }),
    row({ bookTitle: "充值-用户负债", bookCode: "K0100", batchDetailId: "4", processId: "", processBean: "UserNumber", accountType: "10", accountObject: "80", bookCategory: "2", direction: "20", debitAmountBean: "", creditAmountBean: "finance.book.cash_amount" }),
    row({ bookTitle: "提现-系统现金", bookCode: "K0700", batchDetailId: "1", processId: "100210", processBean: "", accountType: "10", accountObject: "40", bookCategory: "1", direction: "20", debitAmountBean: "", creditAmountBean: "finance.book.cash_amount" }),
    row({ bookTitle: "提现-用户负债", bookCode: "K0700", batchDetailId: "4", processId: "", processBean: "UserNumber", accountType: "10", accountObject: "80", bookCategory: "2", direction: "10", debitAmountBean: "finance.book.cash_amount", creditAmountBean: "" })
  ], "配置类页面需要说明影响范围：记账模板会影响后续所有同记账码交易。");
}

function cashPolicyModule() {
  return tableModule("收银策略", "配置中心", "按交易类型维护收银处理链，独立对应收银策略 Controller 和权限。", "fin_cash_policy", "/finance/cashPolicy", "finance:cashPolicy", ["policyName", "tradeType", "beanName", "sort", "status", "remark"], ["policyName", "tradeType", "beanName", "status"], [
    row({ policyName: "充值收银处理链", tradeType: "recharge_10", beanName: "CashOrderProcess", sort: "10", status: "00", remark: "充值收银主流程", tableName: "fin_cash_policy" }),
    row({ policyName: "提现风控链", tradeType: "withdraw", beanName: "RiskCheck", sort: "20", status: "00", remark: "提现前置风控", tableName: "fin_cash_policy" }),
    row({ policyName: "提现记账处理链", tradeType: "withdraw", beanName: "BookOrderProcess", sort: "30", status: "10", remark: "演示待复核策略", tableName: "fin_cash_policy" })
  ], "收银策略与记账策略不可合并编辑，真实开发应分别校验权限、排序和启用状态。");
}

function bookPolicyModule() {
  return tableModule("记账策略", "配置中心", "按记账码维护记账策略 Bean、操作符、策略值和执行顺序。", "fin_book_policy", "/finance/bookPolicy", "finance:bookPolicy", ["policyName", "bookCode", "beanName", "operators", "value", "sort", "status"], ["policyName", "bookCode", "beanName", "status"], [
    row({ policyName: "提现金额策略", bookCode: "K0700", beanName: "WithdrawAmountPolicy", operators: ">=", value: "amount", sort: "10", status: "00", tableName: "fin_book_policy" }),
    row({ policyName: "充值模板转换", bookCode: "K0100", beanName: "RechargeBookPolicy", operators: "=", value: "cash_amount", sort: "20", status: "90", tableName: "fin_book_policy" }),
    row({ policyName: "代理资金池策略", bookCode: "K0700", beanName: "AgentPoolBookPolicy", operators: ">=", value: "agent_pool", sort: "30", status: "10", tableName: "fin_book_policy" })
  ], "记账策略属于高影响配置，应独立审批，不能和收银策略共用编辑权限。");
}

function strategyModule() {
  return operationalModule({
    title: "跨模块策略总览",
    subtitle: "研发参考",
    pageType: "overview",
    desc: "只读汇总收银策略和记账策略，帮助运营理解跨模块策略影响范围；具体维护必须进入独立管理页。",
    table: "strategy_overview_demo",
    route: "/finance/demo/strategyOverview",
    permission: "demo:finance:strategyOverview",
    scenario: "配置评审或排障时先看跨模块策略总览，再跳转到收银策略或记账策略独立页面处理。",
    summary: [metric("收银策略", "3", "独立权限", "info"), metric("记账策略", "3", "独立权限", "warning"), metric("待复核", "2", "高影响配置", "danger")],
    quickActions: [quick("收银策略", "cashPolicy"), quick("记账策略", "bookPolicy")],
    columns: ["policyName", "bizType", "tradeType", "bookCode", "beanName", "status", "suggestion"],
    filters: ["policyName", "bizType", "status"],
    fields: commonFields(["policyName", "bizType", "tradeType", "bookCode", "beanName", "status", "suggestion", "route", "permission", "tableName"]),
    rows: [
      row({ policyName: "充值收银处理链", bizType: "收银策略", tradeType: "recharge_10", bookCode: "", beanName: "CashOrderProcess", status: "00", suggestion: "进入收银策略维护", route: "#/cashPolicy", permission: "finance:cashPolicy", tableName: "fin_cash_policy" }),
      row({ policyName: "提现风控链", bizType: "收银策略", tradeType: "withdraw", bookCode: "", beanName: "RiskCheck", status: "00", suggestion: "进入收银策略维护", route: "#/cashPolicy", permission: "finance:cashPolicy", tableName: "fin_cash_policy" }),
      row({ policyName: "提现金额策略", bizType: "记账策略", tradeType: "", bookCode: "K0700", beanName: "WithdrawAmountPolicy", status: "00", suggestion: "进入记账策略维护", route: "#/bookPolicy", permission: "finance:bookPolicy", tableName: "fin_book_policy" }),
      row({ policyName: "代理资金池策略", bizType: "记账策略", tradeType: "", bookCode: "K0700", beanName: "AgentPoolBookPolicy", status: "10", suggestion: "待复核，不在总览页编辑", route: "#/bookPolicy", permission: "finance:bookPolicy", tableName: "fin_book_policy" })
    ],
    help: pageHelp("跨模块策略总览", "策略只读汇总", ["fin_cash_policy", "fin_book_policy"], ["收银策略和记账策略拥有不同 Controller、路径和权限，不允许合并编辑。", "聚合页只做查看和跳转，不提供新增、编辑、删除。"], ["真实开发时应对策略变更加入审批和操作审计。"])
  });
}

function relationModule() {
  const tables = [
    ["comm_code_master", "收银流水", "trade_type -> book_code", "参数字典和记账码映射"],
    ["fin_account_type", "客户余额", "account_type", "余额/积分/资金池类型"],
    ["fin_object_account", "客户余额", "account_object + account_type", "账户开通模板"],
    ["fin_book_category", "记账模板", "book_category", "会计科目分类"],
    ["fin_private_account", "出入款帐户", "process_id", "系统私有账户"],
    ["fin_balance", "客户余额", "process_id + account_type + account_object", "账户余额"],
    ["fin_cash_request", "收银流水", "user_id + trade_type", "收银申请"],
    ["fin_cash_order", "收银流水", "cash_order_id/batch_id", "收银流水"],
    ["fin_cash_order_history", "收银流水", "cash_order_id", "收银历史"],
    ["fin_cash_policy", "收银流水", "trade_type", "收银策略"],
    ["fin_book_template", "记账模板", "book_code", "记账模板"],
    ["fin_book_order", "记账模板", "batch_id + book_code", "记账凭证"],
    ["fin_book_order_history", "记账模板", "batch_id", "记账历史"],
    ["fin_book_policy", "记账模板", "book_code", "记账策略"],
    ["fin_risk_template", "收银流水", "book_code", "风控规则"],
    ["fin_black_list", "收银流水", "user_id + book_code", "名单控制"],
    ["ledger_demo", "客户余额", "site_id + subject + counterparty", "产品补充原型，真实开发需新增表"],
    ["settlement_demo", "出入款帐户", "settlement_month + site_id", "产品补充原型，真实开发需新增月结表"],
    ["fund_pool_demo", "出入款帐户", "site_id", "产品补充原型，真实开发需新增资金池和流水表"]
  ];
  const mod = tableModule("表关系", "研发参考", "以运营业务域重新组织 16 张表，保留主要关联键和用途。", "schema_relation_demo", "/finance/demo/relation", "demo:finance:relation", ["tableName", "domain", "relation", "usage"], ["tableName", "domain"], tables.map(item => row({ tableName: item[0], domain: item[1], relation: item[2], usage: item[3], status: "00" })), "表关系页给研发参考，不作为日常运营入口。");
  mod.pageType = "reference";
  return mod;
}

function statusDictModule() {
  const mod = tableModule("状态字典", "研发参考", "集中展示账户、流水、凭证、方向、对象、分类等常用编码。", "status_dict_demo", "/finance/demo/status", "demo:finance:status", ["dict", "code", "name", "scene"], ["dict", "code", "name"], [
    row({ dict: "状态", code: "00", name: "成功/启用", scene: "收银流水、记账凭证、字典启用" }),
    row({ dict: "状态", code: "10", name: "待处理", scene: "收银流水、记账凭证初始状态" }),
    row({ dict: "状态", code: "09", name: "失败", scene: "验签失败或处理异常" }),
    row({ dict: "账户类型", code: "10", name: "余额", scene: "用户和系统余额账户" }),
    row({ dict: "账户对象", code: "80", name: "用户", scene: "用户余额/负债账户" }),
    row({ dict: "借贷方向", code: "20", name: "贷方", scene: "记账模板和凭证" }),
    row({ dict: "往来主体", code: "site", name: "站点", scene: "站点可借款给代理" }),
    row({ dict: "往来主体", code: "agent", name: "代理", scene: "代理可欠上级或借给下级" }),
    row({ dict: "往来限制", code: "member", name: "会员不参与", scene: "会员/用户不得进入借欠台账" }),
    row({ dict: "台账状态", code: "overdue", name: "已逾期", scene: "到期未结清的代理欠款" }),
    row({ dict: "月结状态", code: "pending", name: "待扣款", scene: "月结账单可确认扣款" }),
    row({ dict: "月结状态", code: "insufficient", name: "资金不足", scene: "资金池不足时阻断扣款" }),
    row({ dict: "资金池变动", code: "settlement_deduct", name: "月结扣款", scene: "减少站点资金池" })
  ], "状态字典建议后续沉淀为前端公共字典或后端枚举接口。");
  mod.pageType = "reference";
  return mod;
}

function riskReportModule() {
  const mod = tableModule("代码风险", "研发参考", "集中展示 PRD 中识别的实现风险，避免演示原型误导研发。", "code_risk_demo", "/finance/demo/risks", "demo:finance:risks", ["risk", "module", "level", "suggestion", "status"], ["risk", "module", "level", "status"], [
    row({ risk: "字典 code 不一致", module: "GetBookCode", level: "高", suggestion: "统一 trade/finance_trade 编码", status: "10" }),
    row({ risk: "batchId 键可能错误", module: "SendBalanceQueue", level: "高", suggestion: "统一使用 cash_order_id 或 batch_id", status: "10" }),
    row({ risk: "模板循环越界", module: "BookOrderProcess", level: "高", suggestion: "将 <= size 改为 < size", status: "10" }),
    row({ risk: "余额更新状态筛选不正确", module: "UpdateBalanceListener", level: "高", suggestion: "查询待处理状态 10，成功后改 00", status: "10" }),
    row({ risk: "金额单位混用", module: "全链路", level: "中", suggestion: "明确分制或 BigDecimal 元制", status: "10" }),
    row({ risk: "测试接口暴露", module: "/finance/test", level: "中", suggestion: "仅开发环境启用或删除", status: "09" }),
    row({ risk: "往来台账未实现", module: "ledger_demo", level: "中", suggestion: "新增表、审批流、还款核销接口后再接真实数据", status: "10" }),
    row({ risk: "月结中心未实现", module: "settlement_demo", level: "中", suggestion: "新增月结单、资金池、资金池流水和扣款接口后再接真实数据", status: "10" })
  ], "高风险项应在真实 API 接入前优先修复。");
  mod.pageType = "reference";
  return mod;
}

function pageHelp(title, positioning, tables, rules, notes = []) {
  return {
    positioning,
    scenes: [`${title}用于${positioning}，面向财务运营、财务审核、风控运营或研发参考人员。`],
    operations: ["查看摘要", "条件筛选", "查看详情", "新增/编辑演示", "删除演示", "导出演示", "打开功能说明"],
    fieldGroups,
    tables,
    rules,
    notes
  };
}

function commonFields(keys) {
  const labels = {
    item: "事项", bizType: "业务类型", level: "等级", owner: "负责人", handler: "处理人", deadline: "时限",
    status: "状态", suggestion: "处理建议", route: "跳转路径", module: "模块", riskLevel: "风险等级",
    handlerStatus: "处理状态", sla: "SLA", processRecord: "处理记录", repaymentPlanStatus: "还款计划", writeOffStatus: "核销状态",
    tableName: "表名", accountObject: "账户对象", accountType: "账户类型", accountCount: "账户数量",
    balance: "余额", openBalance: "期初余额", occurredAmount: "发生额", accountId: "账套号",
    userName: "用户名", processId: "记账主体", direction: "方向", closeOrder: "最近流水",
    objectType: "对象类型", objectId: "对象 ID", objectName: "对象名称", siteId: "站点/账套", siteName: "站点名称", siteLevel: "站点层级", principal: "负责人", agentCount: "关联代理数", availableCredit: "可借出额度", resultAccount: "生成账户",
    settlementId: "月结单号", settlementMonth: "月结月份", billNo: "账单号", poolBalance: "资金池余额", frozenAmount: "冻结金额", availableAmount: "可用资金池",
    rechargeIncrease: "充值增加", withdrawDecrease: "提现减少", headAddAmount: "总站加额", headReduceAmount: "总站减额", settlementDeductAmount: "月结扣款",
    systemTrialAmount: "系统试算金额", manualAdjustAmount: "人工调整金额", finalDeductAmount: "最终应扣金额", beforeBalance: "扣/调前余额", afterBalance: "扣/调后余额",
    siteRechargeAmount: "站点充值", agentRechargeAmount: "代理充值", memberRechargeAmount: "会员充值", siteWithdrawAmount: "站点提现", agentWithdrawAmount: "代理提现", memberWithdrawAmount: "会员提现",
    settlementStatus: "月结状态", poolStatus: "资金池状态", quotaStatus: "额度状态", flowId: "流水号", adjustId: "调整单号", sourceType: "来源类型", changeType: "变动类型", changeAmount: "变动金额", operatorType: "操作类型", formulaDesc: "试算口径",
    requestId: "申请 ID", userId: "用户 ID", userMobile: "手机号", tradeType: "交易类型", amount: "金额",
    approvalResult: "审核结果", approvalTime: "审核时间", approvalRemark: "审核备注",
    toUserId: "目标用户 ID", toUserName: "目标用户", details: "详情", cashOrderId: "收银流水 ID",
    relationId: "关联 ID", bookCode: "记账码", transAmt: "交易金额", discount: "优惠", fail: "失败原因",
    scene: "场景", cashAmount: "交易金额", riskPoint: "风险点", balanceImpact: "余额影响",
    bookOrderId: "凭证 ID", bookTitle: "标题", batchId: "批次 ID", batchDetailId: "明细 ID",
    debitAmount: "借方金额", creditAmount: "贷方金额", diffAmount: "差额", title: "标题",
    riskBean: "风控 Bean", operators: "操作符", value: "策略值", sort: "排序", type: "名单类型",
    remark: "备注", policyName: "策略名称", beanName: "Bean 名称", bookCategory: "记账分类",
    code: "参数大类", codeKey: "参数键", value1: "属性1/记账码", updateTime: "更新时间",
    rule: "借贷规则", dict: "字典", name: "含义", code: "编码", usage: "用途", relation: "主要关联",
    domain: "业务域", risk: "风险点", operator: "操作人", action: "动作", target: "对象", operateTime: "操作时间",
    input: "输入", output: "输出", step: "步骤",
    ledgerId: "台账编号", subjectType: "当前主体类型", subjectName: "当前主体", counterpartyType: "对手方类型",
    counterpartyName: "对手方", ledgerType: "台账类型", loanAmount: "借出金额", debtAmount: "欠款金额",
    repaidAmount: "已还金额", outstandingAmount: "未结清金额", dueDate: "到期日", overdueDays: "逾期天数",
    ledgerStatus: "台账状态", relatedLedgerId: "关联台账", repaymentProgress: "还款进度"
  };
  return keys.map(key => ({ key, label: labels[key] || key, type: inferType(key) }));
}

function inferType(key) {
  if (key === "status") return "status";
  if (key === "accountType") return "accountType";
  if (key === "accountObject") return "accountObject";
  if (key === "bookCategory") return "bookCategory";
  if (key === "direction") return "direction";
  if (key === "tradeType") return "tradeType";
  if (key === "changeType") return "poolChangeType";
  if (key === "settlementStatus") return "settlementStatus";
  if (key === "poolStatus") return "poolStatus";
  if (key === "quotaStatus") return "quotaStatus";
  if (key === "type") return "listType";
  if (key === "subjectType" || key === "counterpartyType") return "subjectType";
  if (key === "ledgerType") return "ledgerType";
  if (key === "ledgerStatus") return "ledgerStatus";
  if (key === "repaymentProgress") return "progress";
  if (key === "overdueDays") return "overdue";
  if (["amount", "transAmt", "discount", "balance", "openBalance", "occurredAmount", "debitAmount", "creditAmount", "diffAmount", "cashAmount", "loanAmount", "debtAmount", "repaidAmount", "outstandingAmount", "availableCredit", "poolBalance", "frozenAmount", "availableAmount", "rechargeIncrease", "withdrawDecrease", "headAddAmount", "headReduceAmount", "settlementDeductAmount", "systemTrialAmount", "manualAdjustAmount", "finalDeductAmount", "beforeBalance", "afterBalance", "changeAmount", "siteRechargeAmount", "agentRechargeAmount", "memberRechargeAmount", "siteWithdrawAmount", "agentWithdrawAmount", "memberWithdrawAmount"].includes(key)) return "money";
  if (["level", "riskLevel"].includes(key)) return "level";
  return "text";
}

function applyDomainMetadata() {
  menuGroups.forEach(group => {
    group.items.forEach(key => {
      const mod = moduleCatalog[key];
      if (!mod) return;
      mod.domainKey = group.domainKey;
      mod.domainTitle = group.title;
      mod.menuKind = group.kind || "domain";
    });
  });
}

function initData() {
  Object.entries(moduleCatalog).forEach(([key, mod]) => {
    appState.data[key] = (mod.rows || []).map((item, index) => ({ __id: `${key}-${index + 1}`, ...item }));
    appState.filters[key] = {};
  });
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatValue(value, type) {
  const raw = value ?? "";
  if (type === "status") {
    const status = statusMap[raw] || { label: raw || "未设置", className: "muted" };
    return `<span class="status ${status.className}">${escapeHtml(status.label)}</span>`;
  }
  if (type === "accountType") return codeText(raw, dictionaries.accountType[raw]);
  if (type === "accountObject") return codeText(raw, dictionaries.accountObject[raw]);
  if (type === "bookCategory") return codeText(raw, dictionaries.bookCategory[raw]);
  if (type === "direction") return `<span class="status purple">${escapeHtml(dictionaries.direction[raw] || raw)}</span>`;
  if (type === "tradeType") return codeText(raw, dictionaries.tradeType[raw]);
  if (type === "poolChangeType") {
    const outTypes = ["site_withdraw", "agent_withdraw", "member_withdraw", "head_reduce", "settlement_deduct"];
    const className = outTypes.includes(raw) ? "fail" : "success";
    return `<span class="status ${className}">${escapeHtml(dictionaries.poolChangeType[raw] || raw)}</span>`;
  }
  if (type === "settlementStatus") {
    const status = settlementStatusMap[raw] || { label: raw || "未设置", className: "muted" };
    return `<span class="status ${status.className}">${escapeHtml(status.label)}</span>`;
  }
  if (type === "poolStatus") {
    const status = poolStatusMap[raw] || { label: raw || "未设置", className: "muted" };
    return `<span class="status ${status.className}">${escapeHtml(status.label)}</span>`;
  }
  if (type === "quotaStatus") {
    const status = quotaStatusMap[raw] || { label: raw || "未设置", className: "muted" };
    return `<span class="status ${status.className}">${escapeHtml(status.label)}</span>`;
  }
  if (type === "listType") return `<span class="status info">${escapeHtml(dictionaries.listType[raw] || raw)}</span>`;
  if (type === "subjectType") return `<span class="identity-pill">${escapeHtml(dictionaries.subjectType[raw] || raw)}</span>`;
  if (type === "ledgerType") return `<span class="status info">${escapeHtml(dictionaries.ledgerType[raw] || raw)}</span>`;
  if (type === "ledgerStatus") {
    const status = ledgerStatusMap[raw] || { label: raw || "未设置", className: "muted" };
    return `<span class="status ${status.className}">${escapeHtml(status.label)}</span>`;
  }
  if (type === "progress") return renderProgress(raw);
  if (type === "overdue") {
    const days = Number(raw) || 0;
    return `<span class="status ${days > 0 ? "fail" : "success"}">${days > 0 ? `${days} 天` : "未逾期"}</span>`;
  }
  if (type === "money") return `<span class="money ${parseMoney(raw) < 0 ? "negative" : ""}">${escapeHtml(raw)}</span>`;
  if (type === "level") {
    const cls = raw === "高" ? "fail" : raw === "中" ? "pending" : "success";
    return `<span class="status ${cls}">${escapeHtml(raw)}</span>`;
  }
  if (String(raw).startsWith("#/")) return `<a class="inline-link" href="${escapeHtml(raw)}">${escapeHtml(raw)}</a>`;
  return escapeHtml(raw);
}

function renderProgress(value) {
  const num = Math.max(0, Math.min(100, Number(value) || 0));
  return `<span class="progress"><i style="width:${num}%"></i><b>${num}%</b></span>`;
}

function codeText(code, text) {
  return `<span class="code">${escapeHtml(code)}</span>${text ? ` ${escapeHtml(text)}` : ""}`;
}

function activeModule() {
  return moduleCatalog[appState.activeKey] || moduleCatalog.dashboard;
}

function render() {
  appState.activeKey = (location.hash || "#/dashboard").replace("#/", "") || "dashboard";
  if (!moduleCatalog[appState.activeKey]) appState.activeKey = "dashboard";
  const mod = activeModule();
  const domainTitle = mod.domainTitle || mod.subtitle;
  const familyTitle = mod.subtitle && mod.subtitle !== domainTitle ? ` / ${mod.subtitle}` : "";
  document.getElementById("breadcrumb").textContent = `${domainTitle}${familyTitle} / ${mod.title}`;
  document.getElementById("pageTitle").textContent = mod.title;
  expandActiveMenuGroup();
  renderMenu();
  renderModule(mod);
}

function renderMenu() {
  const html = menuGroups.map(group => {
    const collapsed = isMenuGroupCollapsed(group);
    const groupId = group.domainKey || group.title;
    return `
    <div class="menu-group ${escapeHtml(group.kind || "")} ${collapsed ? "collapsed" : ""}">
      <button class="menu-group-title" type="button" data-action="toggle-menu-group" data-group="${escapeHtml(groupId)}" aria-expanded="${collapsed ? "false" : "true"}">
        <span>${escapeHtml(group.title)}</span>
        <b class="menu-arrow">${collapsed ? "›" : "⌄"}</b>
      </button>
      <div class="menu-children">
      ${group.items.map(key => {
        const mod = moduleCatalog[key];
        if (!mod) return "";
        return `<a class="menu-link ${key === appState.activeKey ? "active" : ""}" href="#/${key}" title="${escapeHtml(group.title)} / ${escapeHtml(mod.title)}" data-short="${escapeHtml(shortMenuLabel(mod.title))}">
          <span>${escapeHtml(mod.title)}</span>
          <span class="menu-tag">${menuBadge(mod)}</span>
        </a>`;
      }).join("")}
      </div>
    </div>
  `;
  }).join("");
  document.getElementById("menu").innerHTML = html;
}

function isMenuGroupCollapsed(group) {
  return Boolean(appState.collapsedMenuGroups[group.domainKey || group.title]);
}

function toggleMenuGroup(groupId) {
  appState.collapsedMenuGroups[groupId] = !appState.collapsedMenuGroups[groupId];
  saveCollapsedMenuGroups();
  renderMenu();
}

function expandActiveMenuGroup() {
  const group = menuGroups.find(item => item.items.includes(appState.activeKey));
  if (!group) return;
  const groupId = group.domainKey || group.title;
  if (!appState.collapsedMenuGroups[groupId]) return;
  delete appState.collapsedMenuGroups[groupId];
  saveCollapsedMenuGroups();
}

function loadCollapsedMenuGroups() {
  try {
    return JSON.parse(localStorage.getItem("financeDemoCollapsedMenuGroups") || "{}");
  } catch {
    return {};
  }
}

function saveCollapsedMenuGroups() {
  try {
    localStorage.setItem("financeDemoCollapsedMenuGroups", JSON.stringify(appState.collapsedMenuGroups));
  } catch {
    // localStorage may be unavailable when opened in a restricted preview.
  }
}

function menuBadge(mod) {
  if (mod.domainKey === "reference" || mod.subtitle === "研发参考") return "参考";
  if (mod.domainKey === "workbench") return "支撑";
  if (mod.pageType === "overview") return "看板";
  if (mod.pageType === "workflow") return "流程";
  if (mod.pageType === "check") return "检查";
  if (mod.pageType === "reference") return "参考";
  if (mod.table && mod.table.includes("_demo")) return "看板";
  if (mod.table && mod.table.includes(" / ")) return "组合";
  return "管理";
}

function shortMenuLabel(title) {
  const clean = String(title || "").replace(/总览|台账|明细|演示|中心|管理|配置|历史|模板/g, "");
  return (clean || title || "").slice(0, 2);
}

function moduleActions(mod) {
  return { ...(pageActionDefaults[mod.pageType || "management"] || pageActionDefaults.management), ...(mod.actions || {}) };
}

function canAction(mod, action) {
  return Boolean(moduleActions(mod)[action]);
}

function rowActionMeta(action) {
  return {
    detail: { label: "详情", className: "" },
    approve: { label: "通过", className: "success" },
    reject: { label: "驳回", className: "danger" },
    confirmSettle: { label: "确认扣款", className: "success" },
    rejectSettle: { label: "退回调整", className: "danger" },
    applyQuota: { label: "确认调整", className: "success" },
    edit: { label: "编辑", className: "" },
    delete: { label: "删除", className: "danger" }
  }[action] || { label: action, className: "" };
}

function shouldShowRowAction(action, row) {
  if (action === "approve" || action === "reject") return row.status === "10";
  if (action === "confirmSettle" || action === "rejectSettle") return ["pending", "insufficient"].includes(row.settlementStatus);
  if (action === "applyQuota") return row.quotaStatus === "pending";
  return true;
}

function renderModule(mod) {
  const rows = filteredRows(mod);
  const hasFlow = Array.isArray(mod.flow) && mod.flow.length;
  const domainTitle = mod.domainTitle || mod.subtitle;
  const kicker = [domainTitle, mod.subtitle && mod.subtitle !== domainTitle ? mod.subtitle : "", mod.table].filter(Boolean).join(" · ");
  document.getElementById("app").innerHTML = `
    <section class="page-head">
      <div>
        <div class="page-kicker">${escapeHtml(kicker)}</div>
        <h1 class="page-heading">${escapeHtml(mod.title)}</h1>
        <p class="page-desc">${escapeHtml(mod.desc)}</p>
      </div>
      <div class="page-head-actions">
        <button class="btn primary" type="button" data-action="help">功能说明</button>
      </div>
    </section>
    ${renderSummary(mod)}
    ${renderScenario(mod)}
    ${hasFlow ? renderFlow(mod.flow) : ""}
    ${renderQuickActions(mod)}
    ${renderQuery(mod)}
    ${renderTablePanel(mod, rows)}
  `;
}

function renderSummary(mod) {
  if (!mod.summary || !mod.summary.length) return "";
  return `<section class="metric-grid">${mod.summary.map(item => `
    <div class="metric-card ${item.tone || ""}">
      <div class="metric-label">${escapeHtml(item.label)}</div>
      <div class="metric-value">${escapeHtml(item.value)}</div>
      <div class="metric-note">${escapeHtml(item.note)}</div>
    </div>
  `).join("")}</section>`;
}

function renderScenario(mod) {
  if (!mod.scenario) return "";
  return `<section class="scenario-strip">
    <div>
      <div class="scenario-title">适用场景</div>
      <div class="scenario-text">${escapeHtml(mod.scenario)}</div>
    </div>
    <span class="env-pill">演示模式 · 不调用 API</span>
  </section>`;
}

function renderQuickActions(mod) {
  const actions = mod.quickActions || [];
  if (!actions.length) return "";
  return `<section class="quick-panel">
    <div class="quick-title">快捷操作</div>
    <div class="quick-actions">
      ${actions.map(action => action.target === "__help"
        ? `<button class="btn" type="button" data-action="help">${escapeHtml(action.label)}</button>`
        : `<a class="btn ${action.tone || ""}" href="#/${escapeHtml(action.target)}">${escapeHtml(action.label)}</a>`).join("")}
    </div>
  </section>`;
}

function renderFlow(flow) {
  return `<section class="flow-panel">
    ${flow.map((item, index) => `
      <a class="flow-step" href="#/${escapeHtml(item[2])}">
        <span class="flow-index">${index + 1}</span>
        <strong>${escapeHtml(item[0])}</strong>
        <small>${escapeHtml(item[1])}</small>
      </a>
    `).join("")}
  </section>`;
}

function renderQuery(mod) {
  const filters = mod.filters || [];
  if (!filters.length || !canAction(mod, "search")) return "";
  return `<section class="panel">
    <div class="panel-inner">
      <div class="query-grid">
        ${filters.map(key => {
          const field = findField(mod, key);
          const value = appState.filters[appState.activeKey][key] || "";
          return `<div class="field"><label>${escapeHtml(field.label)}</label><input data-filter="${escapeHtml(key)}" value="${escapeHtml(value)}" placeholder="输入${escapeHtml(field.label)}" /></div>`;
        }).join("")}
        <div class="query-actions">
          <button class="btn primary" type="button" data-action="search">查询</button>
          <button class="btn" type="button" data-action="reset">清空</button>
        </div>
      </div>
    </div>
  </section>`;
}

function renderTablePanel(mod, rows) {
  const toolbarButtons = [
    canAction(mod, "add") ? `<button class="btn primary" type="button" data-action="add">新增演示</button>` : "",
    canAction(mod, "export") ? `<button class="btn" type="button" data-action="export">导出演示</button>` : "",
    canAction(mod, "search") ? `<button class="btn" type="button" data-action="reset">重置筛选</button>` : ""
  ].filter(Boolean).join("");
  return `<section class="panel">
    <div class="toolbar">
      <div class="toolbar-left">
        ${toolbarButtons || `<span class="badge">只读页面</span>`}
      </div>
      <div class="toolbar-right">
        <span class="badge">${escapeHtml(mod.route)}</span>
        <span class="badge">${escapeHtml(mod.permission)}:list</span>
      </div>
    </div>
    ${renderTable(mod, rows)}
    <div class="pager">
      <span>共 ${rows.length} 条演示数据</span>
      <span>低频技术字段在详情中查看</span>
    </div>
  </section>`;
}

function renderTable(mod, rows) {
  const cols = mod.columns || [];
  const rowActions = ["detail", "approve", "reject", "confirmSettle", "rejectSettle", "applyQuota", "edit", "delete"].filter(action => canAction(mod, action));
  if (!rows.length) return `<div class="empty">暂无匹配的演示数据</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr>${cols.map(key => `<th>${escapeHtml(findField(mod, key).label)}</th>`).join("")}${rowActions.length ? `<th class="sticky-action">操作</th>` : ""}</tr></thead>
    <tbody>
      ${rows.map(row => `<tr>
        ${cols.map(key => `<td class="${isMoneyField(key) ? "align-right" : ""}">${formatValue(row[key], findField(mod, key).type)}</td>`).join("")}
        ${rowActions.length ? `<td class="sticky-action"><div class="row-actions">
          ${rowActions.filter(action => shouldShowRowAction(action, row)).map(action => {
            const meta = rowActionMeta(action);
            return `<button class="link-btn ${meta.className}" type="button" data-action="${escapeHtml(action)}" data-id="${row.__id}">${escapeHtml(meta.label)}</button>`;
          }).join("")}
        </div></td>` : ""}
      </tr>`).join("")}
    </tbody>
  </table></div>`;
}

function findField(mod, key) {
  return (mod.fields || []).find(item => item.key === key) || { key, label: key, type: inferType(key) };
}

function isMoneyField(key) {
  return inferType(key) === "money";
}

function filteredRows(mod) {
  const rows = appState.data[appState.activeKey] || [];
  const filters = appState.filters[appState.activeKey] || {};
  return rows.filter(row => Object.entries(filters).every(([key, value]) => !value || String(row[key] ?? "").toLowerCase().includes(String(value).toLowerCase())));
}

function openDetail(rowId) {
  const mod = activeModule();
  const row = findRow(rowId);
  const groups = buildDetailGroups(mod, row);
  const body = Object.entries(groups).map(([title, items]) => {
    if (!items.length) return "";
    return `<section class="detail-section"><h3>${escapeHtml(title)}</h3><div class="detail-grid">
      ${items.map(field => `<div class="detail-item"><div class="detail-label">${escapeHtml(field.label)}</div><div class="detail-value">${formatValue(row[field.key], field.type)}</div></div>`).join("")}
    </div></section>`;
  }).join("") + `<section class="detail-section"><h3>后端参考</h3><div class="detail-grid">
    <div class="detail-item"><div class="detail-label">路径</div><div class="detail-value">${escapeHtml(mod.route)}</div></div>
    <div class="detail-item"><div class="detail-label">权限</div><div class="detail-value">${escapeHtml(mod.permission)}</div></div>
    <div class="detail-item"><div class="detail-label">关联表</div><div class="detail-value">${escapeHtml(mod.table)}</div></div>
  </div></section>`;
  openModal(`${mod.title}详情`, body, `<button class="btn primary" type="button" data-action="close-modal">关闭</button>`);
}

function buildDetailGroups(mod, row) {
  const used = new Set();
  const fields = mod.fields || [];
  const titleMap = { user: "用户信息", trade: "交易信息", amount: "金额信息", status: "状态信息", book: "记账信息", identity: "站点身份", ledger: "往来台账", settlement: "月结/资金池", tech: "技术信息", other: "其他信息" };
  const groups = {};
  Object.entries(fieldGroups).forEach(([group, keys]) => {
    groups[titleMap[group]] = fields.filter(field => keys.includes(field.key) && row[field.key] !== undefined);
    groups[titleMap[group]].forEach(field => used.add(field.key));
  });
  groups["其他信息"] = fields.filter(field => !used.has(field.key) && row[field.key] !== undefined);
  return groups;
}

function openForm(rowId = "") {
  const mod = activeModule();
  if (!canAction(mod, rowId ? "edit" : "add")) {
    showToast("当前页面为只读聚合/检查页，请进入独立管理页操作");
    return;
  }
  const row = rowId ? findRow(rowId) : {};
  const fields = (mod.columns || []).map(key => findField(mod, key));
  const body = `<form id="demoForm" class="form-grid">${fields.map(field => `<div class="field"><label>${escapeHtml(field.label)}</label><input name="${escapeHtml(field.key)}" value="${escapeHtml(row[field.key] ?? "")}" placeholder="请输入${escapeHtml(field.label)}" /></div>`).join("")}</form>`;
  const footer = `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn primary" type="button" data-action="save-form" data-id="${escapeHtml(rowId)}">保存演示</button>`;
  openModal(rowId ? `编辑${mod.title}` : `新增${mod.title}`, body, footer);
}

function saveForm(rowId) {
  const key = appState.activeKey;
  const values = {};
  new FormData(document.getElementById("demoForm")).forEach((value, field) => { values[field] = value; });
  if (rowId) {
    const index = appState.data[key].findIndex(item => item.__id === rowId);
    appState.data[key][index] = { ...appState.data[key][index], ...values };
    showToast("已保存编辑演示");
  } else {
    appState.data[key].unshift({ __id: `${key}-${Date.now()}`, ...values });
    showToast("已新增演示数据");
  }
  closeModal();
  render();
}

function openHelp() {
  const mod = activeModule();
  const help = mod.help || pageHelp(mod.title, mod.desc, [mod.table], [mod.desc]);
  const statusFlow = mod.subtitle === "月结中心"
    ? ["试算中 -> 待扣款 -> 已扣款；资金池不足时进入资金不足，退回时进入退回调整。"]
    : mod.subtitle === "往来台账"
    ? ["待确认 -> 生效中 -> 部分还款/已逾期 -> 已结清 -> 已核销。"]
    : ["待处理 -> 处理中 -> 成功/失败 -> 已归档；配置类可启用或停用。"];
  const body = `
    ${helpBlock("页面定位", [help.positioning || mod.desc])}
    ${helpBlock("模块归属", [`业务域：${mod.domainTitle || mod.subtitle}`, `页面类型：${pageTypeName(mod.pageType || "management")}`, "四大模块整合只调整运营导航，不合并独立 Controller、权限或表结构。"])}
    ${helpBlock("运营使用场景", help.scenes || [mod.scenario || mod.desc])}
    ${helpBlock("核心操作", operationsForModule(mod))}
    ${helpBlock("字段分组", Object.entries(fieldGroups).map(([key, fields]) => `${groupName(key)}：${fields.join("、")}`))}
    ${helpBlock("状态流转", statusFlow)}
    ${helpBlock("关联模块", (mod.quickActions || []).filter(item => item.target && item.target !== "__help").map(item => `${item.label}：#/${item.target}`))}
    ${helpBlock("后端路径与权限", [`路径：${mod.route}`, `权限：${mod.permission}`, `关联表：${(help.tables || [mod.table]).join("、")}`])}
    ${helpBlock("业务规则", help.rules || [mod.desc])}
    ${helpBlock("实现注意事项", help.notes && help.notes.length ? help.notes : ["当前为纯静态演示，不调用真实 API；真实接入时应补充接口、字典、权限和表单校验。"])}
  `;
  openModal(`${mod.title}功能说明`, body, `<button class="btn primary" type="button" data-action="close-modal">我知道了</button>`);
}

function groupName(key) {
  return { user: "用户信息", trade: "交易信息", amount: "金额信息", status: "状态信息", book: "记账信息", identity: "站点身份", ledger: "往来台账", settlement: "月结/资金池", tech: "技术信息" }[key] || key;
}

function pageTypeName(type) {
  return { management: "管理页", overview: "总览页", workflow: "流程页", check: "检查页", reference: "研发参考页" }[type] || type;
}

function operationsForModule(mod) {
  const actions = moduleActions(mod);
  const labels = [];
  if (actions.search) labels.push("条件筛选");
  if (actions.detail) labels.push("查看详情");
  if (actions.approve) labels.push("审核通过确认");
  if (actions.reject) labels.push("审核驳回确认");
  if (actions.confirmSettle) labels.push("确认月结扣款");
  if (actions.rejectSettle) labels.push("退回月结调整");
  if (actions.applyQuota) labels.push("确认额度调整");
  if (actions.add) labels.push("新增演示");
  if (actions.edit) labels.push("编辑演示");
  if (actions.delete) labels.push("删除演示");
  if (actions.export) labels.push("导出演示");
  labels.push("打开功能说明");
  if (mod.pageType !== "management") labels.push("通过快捷入口跳转到独立管理页");
  return labels;
}

function helpBlock(title, items) {
  const list = items && items.length ? items : ["无"];
  return `<section class="help-section"><h3>${escapeHtml(title)}</h3><ul>${list.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`;
}

function findRow(rowId) {
  return (appState.data[appState.activeKey] || []).find(row => row.__id === rowId) || {};
}

function openDelete(rowId) {
  const mod = activeModule();
  if (!canAction(mod, "delete")) {
    showToast("当前页面为只读聚合/检查页，不支持删除演示");
    return;
  }
  const row = findRow(rowId);
  const labelKey = (mod.columns || [])[0];
  const label = row[labelKey] || rowId;
  openModal("删除确认", `<p>确认删除演示数据 <span class="code">${escapeHtml(label)}</span> 吗？刷新页面后 mock 数据会恢复。</p>`, `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn danger" type="button" data-action="confirm-delete" data-id="${escapeHtml(rowId)}">删除</button>`);
}

function openApproval(rowId, result) {
  const mod = activeModule();
  const action = result === "approve" ? "approve" : "reject";
  const row = findRow(rowId);
  if (!canAction(mod, action) || row.status !== "10") {
    showToast("只有待处理的存款/取款申请可以审核");
    return;
  }
  const isApprove = result === "approve";
  const tradeName = dictionaries.tradeType[row.tradeType] || row.tradeType || "交易";
  const body = `
    <section class="detail-section">
      <h3>${isApprove ? "确认审核通过" : "确认审核驳回"}</h3>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">申请 ID</div><div class="detail-value">${escapeHtml(row.requestId)}</div></div>
        <div class="detail-item"><div class="detail-label">交易类型</div><div class="detail-value">${escapeHtml(tradeName)}</div></div>
        <div class="detail-item"><div class="detail-label">用户</div><div class="detail-value">${escapeHtml(row.userName || row.userId)}</div></div>
        <div class="detail-item"><div class="detail-label">金额</div><div class="detail-value">${formatValue(row.amount, "money")}</div></div>
      </div>
    </section>
    <div class="field">
      <label>${isApprove ? "审核备注" : "驳回原因"}</label>
      <textarea id="approvalRemark" placeholder="${isApprove ? "例如：到账确认，准予流转收银流水" : "请输入驳回原因，例如：未到账、余额不足、风控不通过"}"></textarea>
    </div>
  `;
  const footer = `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn ${isApprove ? "primary" : "danger"}" type="button" data-action="${isApprove ? "confirm-approve" : "confirm-reject"}" data-id="${escapeHtml(rowId)}">${isApprove ? "确认通过" : "确认驳回"}</button>`;
  openModal(`${tradeName}申请审核`, body, footer);
}

function confirmApproval(rowId, result) {
  const row = findRow(rowId);
  const isApprove = result === "approve";
  const remark = document.getElementById("approvalRemark")?.value.trim() || "";
  if (!isApprove && !remark) {
    showToast("驳回申请需要填写原因");
    return;
  }
  const tradeName = dictionaries.tradeType[row.tradeType] || row.tradeType || "交易";
  row.status = isApprove ? "01" : "09";
  row.handler = isApprove ? "财务审核（已通过）" : "财务审核（已驳回）";
  row.approvalResult = isApprove ? "通过" : "驳回";
  row.approvalTime = formatDateTime(new Date());
  row.approvalRemark = remark || `${tradeName}审核通过，等待生成收银流水`;
  row.remark = isApprove ? `${tradeName}审核通过，待流转收银流水` : `${tradeName}审核驳回：${remark}`;
  closeModal();
  render();
  showToast(`${tradeName}申请已${isApprove ? "审核通过" : "驳回"}`);
}

function openSettlementConfirm(rowId) {
  const row = findRow(rowId);
  const pool = findPoolBySite(row.siteId);
  const available = pool ? parseMoney(pool.availableAmount) : parseMoney(row.availableAmount);
  const finalAmount = parseMoney(row.finalDeductAmount);
  const after = available - finalAmount;
  const warning = after < 0
    ? `<div class="settlement-warning">当前可用资金池不足，确认后会阻断扣款并标记为资金不足，不会扣成负数。</div>`
    : `<div class="settlement-preview">资金池充足，确认后将扣减站点资金池并生成资金池流水。</div>`;
  const body = `
    ${warning}
    <section class="detail-section">
      <h3>确认月结扣款</h3>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">月结单号</div><div class="detail-value">${escapeHtml(row.settlementId)}</div></div>
        <div class="detail-item"><div class="detail-label">站点</div><div class="detail-value">${escapeHtml(row.siteName)}</div></div>
        <div class="detail-item"><div class="detail-label">月结月份</div><div class="detail-value">${escapeHtml(row.settlementMonth)}</div></div>
        <div class="detail-item"><div class="detail-label">当前可用资金池</div><div class="detail-value">${formatValue(toMoney(available), "money")}</div></div>
        <div class="detail-item"><div class="detail-label">最终应扣金额</div><div class="detail-value">${formatValue(row.finalDeductAmount, "money")}</div></div>
        <div class="detail-item"><div class="detail-label">扣后余额</div><div class="detail-value">${formatValue(toMoney(after), "money")}</div></div>
      </div>
    </section>
    <div class="field">
      <label>扣款备注</label>
      <textarea id="settlementRemark" placeholder="例如：确认 2026-05 月结账单，扣减站点资金池"></textarea>
    </div>
  `;
  const footer = `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn primary" type="button" data-action="confirm-settle" data-id="${escapeHtml(rowId)}">确认扣款</button>`;
  openModal("月结扣款确认", body, footer);
}

function confirmSettlement(rowId) {
  const row = findRow(rowId);
  const pool = findPoolBySite(row.siteId);
  const available = pool ? parseMoney(pool.availableAmount) : parseMoney(row.availableAmount);
  const finalAmount = parseMoney(row.finalDeductAmount);
  const after = available - finalAmount;
  const remark = document.getElementById("settlementRemark")?.value.trim() || "总站确认月结扣款";
  row.beforeBalance = toMoney(available);
  row.availableAmount = toMoney(available);
  row.afterBalance = toMoney(after);
  row.approvalTime = formatDateTime(new Date());
  row.approvalRemark = remark;
  if (after < 0) {
    row.settlementStatus = "insufficient";
    row.suggestion = `资金池不足，缺口 ${toMoney(Math.abs(after))} 元，已阻断扣款`;
    closeModal();
    render();
    showToast("资金池不足，已阻断月结扣款");
    return;
  }
  row.settlementStatus = "deducted";
  row.handler = "总站财务（已扣款）";
  row.suggestion = "月结扣款完成，已生成资金池流水";
  if (pool) {
    pool.availableAmount = toMoney(after);
    pool.poolBalance = toMoney(parseMoney(pool.poolBalance) - finalAmount);
    pool.settlementDeductAmount = toMoney(parseMoney(pool.settlementDeductAmount) + finalAmount);
    pool.poolStatus = after < finalAmount ? "low" : "normal";
    pool.suggestion = after < finalAmount ? "扣款后资金池偏低，需关注提现" : "资金池充足";
  }
  addFundPoolFlow({
    siteId: row.siteId,
    siteName: row.siteName,
    changeType: "settlement_deduct",
    changeAmount: toMoney(-finalAmount),
    beforeBalance: toMoney(available),
    afterBalance: toMoney(after),
    operatorType: "总站月结",
    settlementId: row.settlementId,
    remark
  });
  closeModal();
  render();
  showToast("月结扣款已完成");
}

function openSettlementReturn(rowId) {
  const row = findRow(rowId);
  const body = `
    <section class="detail-section">
      <h3>退回月结调整</h3>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">月结单号</div><div class="detail-value">${escapeHtml(row.settlementId)}</div></div>
        <div class="detail-item"><div class="detail-label">站点</div><div class="detail-value">${escapeHtml(row.siteName)}</div></div>
        <div class="detail-item"><div class="detail-label">最终应扣金额</div><div class="detail-value">${formatValue(row.finalDeductAmount, "money")}</div></div>
        <div class="detail-item"><div class="detail-label">当前状态</div><div class="detail-value">${formatValue(row.settlementStatus, "settlementStatus")}</div></div>
      </div>
    </section>
    <div class="field">
      <label>退回原因</label>
      <textarea id="settlementReturnReason" placeholder="请输入退回原因，例如：试算来源需复核、人工调整金额待确认"></textarea>
    </div>
  `;
  const footer = `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn danger" type="button" data-action="confirm-return-settle" data-id="${escapeHtml(rowId)}">确认退回</button>`;
  openModal("月结退回调整", body, footer);
}

function confirmSettlementReturn(rowId) {
  const row = findRow(rowId);
  const reason = document.getElementById("settlementReturnReason")?.value.trim() || "";
  if (!reason) {
    showToast("退回调整需要填写原因");
    return;
  }
  row.settlementStatus = "returned";
  row.handler = "总站财务（已退回）";
  row.approvalTime = formatDateTime(new Date());
  row.approvalRemark = reason;
  row.suggestion = `已退回调整：${reason}`;
  closeModal();
  render();
  showToast("月结账单已退回调整");
}

function openQuotaConfirm(rowId) {
  const row = findRow(rowId);
  const body = `
    <section class="detail-section">
      <h3>确认额度调整</h3>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">调整单号</div><div class="detail-value">${escapeHtml(row.adjustId)}</div></div>
        <div class="detail-item"><div class="detail-label">站点</div><div class="detail-value">${escapeHtml(row.siteName)}</div></div>
        <div class="detail-item"><div class="detail-label">变动类型</div><div class="detail-value">${formatValue(row.changeType, "poolChangeType")}</div></div>
        <div class="detail-item"><div class="detail-label">变动金额</div><div class="detail-value">${formatValue(row.changeAmount, "money")}</div></div>
        <div class="detail-item"><div class="detail-label">调整前可用资金池</div><div class="detail-value">${formatValue(row.beforeBalance, "money")}</div></div>
        <div class="detail-item"><div class="detail-label">调整后可用资金池</div><div class="detail-value">${formatValue(row.afterBalance, "money")}</div></div>
      </div>
    </section>
    <div class="field">
      <label>确认备注</label>
      <textarea id="quotaRemark" placeholder="例如：总站确认增加额度，补足月结扣款"></textarea>
    </div>
  `;
  const footer = `<button class="btn" type="button" data-action="close-modal">取消</button><button class="btn primary" type="button" data-action="confirm-quota" data-id="${escapeHtml(rowId)}">确认调整</button>`;
  openModal("额度调整确认", body, footer);
}

function confirmQuota(rowId) {
  const row = findRow(rowId);
  const pool = findPoolBySite(row.siteId);
  const change = parseMoney(row.changeAmount);
  const before = pool ? parseMoney(pool.availableAmount) : parseMoney(row.beforeBalance);
  const after = before + change;
  const remark = document.getElementById("quotaRemark")?.value.trim() || "总站确认额度调整";
  if (after < 0) {
    showToast("总站减少额度不能使资金池为负数");
    return;
  }
  row.beforeBalance = toMoney(before);
  row.afterBalance = toMoney(after);
  row.quotaStatus = "applied";
  row.approvalTime = formatDateTime(new Date());
  row.approvalRemark = remark;
  if (pool) {
    pool.availableAmount = toMoney(after);
    pool.poolBalance = toMoney(parseMoney(pool.poolBalance) + change);
    if (row.changeType === "head_add") pool.headAddAmount = toMoney(parseMoney(pool.headAddAmount) + Math.abs(change));
    if (row.changeType === "head_reduce") pool.headReduceAmount = toMoney(parseMoney(pool.headReduceAmount) + Math.abs(change));
    pool.poolStatus = after < 60000 ? "low" : "normal";
    pool.suggestion = "总站额度调整已生效";
  }
  syncSettlementPool(row.siteId);
  addFundPoolFlow({
    siteId: row.siteId,
    siteName: row.siteName,
    changeType: row.changeType,
    changeAmount: toMoney(change),
    beforeBalance: toMoney(before),
    afterBalance: toMoney(after),
    operatorType: dictionaries.poolChangeType[row.changeType] || "总站额度调整",
    settlementId: "",
    remark
  });
  closeModal();
  render();
  showToast("额度调整已生效");
}

function findPoolBySite(siteId) {
  return (appState.data.siteFundPool || []).find(item => item.siteId === siteId);
}

function syncSettlementPool(siteId) {
  const pool = findPoolBySite(siteId);
  if (!pool) return;
  (appState.data.monthlySettlement || []).forEach(item => {
    if (item.siteId !== siteId || !["pending", "insufficient"].includes(item.settlementStatus)) return;
    const available = parseMoney(pool.availableAmount);
    const finalAmount = parseMoney(item.finalDeductAmount);
    item.poolBalance = pool.poolBalance;
    item.availableAmount = toMoney(available);
    item.beforeBalance = toMoney(available);
    item.afterBalance = toMoney(available - finalAmount);
    if (available >= finalAmount && item.settlementStatus === "insufficient") {
      item.settlementStatus = "pending";
      item.suggestion = "资金池已补足，可重新确认扣款";
    }
  });
}

function addFundPoolFlow(data) {
  if (!appState.data.fundPoolFlow) return;
  appState.data.fundPoolFlow.unshift({
    __id: `fundPoolFlow-${Date.now()}`,
    flowId: `POOLFLOW-${Date.now()}`,
    operateTime: formatDateTime(new Date()),
    ...data
  });
}

function parseMoney(value) {
  const parsed = Number(String(value ?? "0").replace(/[¥,]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toMoney(value) {
  return (Number(value) || 0).toFixed(2);
}

function formatDateTime(date) {
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function confirmDelete(rowId) {
  appState.data[appState.activeKey] = appState.data[appState.activeKey].filter(row => row.__id !== rowId);
  closeModal();
  showToast("已删除演示数据");
  render();
}

function collectFilters() {
  const values = {};
  document.querySelectorAll("[data-filter]").forEach(input => { values[input.dataset.filter] = input.value.trim(); });
  appState.filters[appState.activeKey] = values;
  render();
}

function resetFilters() {
  appState.filters[appState.activeKey] = {};
  render();
}

function openModal(title, body, footer = "") {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modalFooter").innerHTML = footer;
  document.getElementById("modalBackdrop").classList.add("open");
  document.getElementById("modalBackdrop").setAttribute("aria-hidden", "false");
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.getElementById("modalBackdrop").setAttribute("aria-hidden", "true");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function handleGlobalSearch() {
  const value = document.getElementById("globalSearch").value.trim().toLowerCase();
  if (!value) return;
  const found = Object.entries(moduleCatalog).find(([, mod]) => `${mod.domainTitle || ""} ${mod.subtitle || ""} ${mod.title} ${mod.desc} ${mod.table}`.toLowerCase().includes(value));
  if (found) {
    location.hash = `#/${found[0]}`;
  } else {
    showToast("未找到匹配模块");
  }
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const rowId = target.dataset.id || "";
  if (action === "toggle-menu-group") {
    toggleMenuGroup(target.dataset.group || "");
    return;
  }
  if (action === "help") openHelp();
  if (action === "search") collectFilters();
  if (action === "reset") resetFilters();
  if (action === "detail") openDetail(rowId);
  if (action === "add") openForm();
  if (action === "edit") openForm(rowId);
  if (action === "delete") openDelete(rowId);
  if (action === "approve") openApproval(rowId, "approve");
  if (action === "reject") openApproval(rowId, "reject");
  if (action === "confirmSettle") openSettlementConfirm(rowId);
  if (action === "rejectSettle") openSettlementReturn(rowId);
  if (action === "applyQuota") openQuotaConfirm(rowId);
  if (action === "confirm-approve") confirmApproval(rowId, "approve");
  if (action === "confirm-reject") confirmApproval(rowId, "reject");
  if (action === "confirm-settle") confirmSettlement(rowId);
  if (action === "confirm-return-settle") confirmSettlementReturn(rowId);
  if (action === "confirm-quota") confirmQuota(rowId);
  if (action === "confirm-delete") confirmDelete(rowId);
  if (action === "save-form") saveForm(rowId);
  if (action === "export") {
    if (canAction(activeModule(), "export")) showToast("导出演示：真实项目应调用后端 Excel 导出接口");
    else showToast("当前页面不支持导出");
  }
  if (action === "close-modal") closeModal();
  if (action === "global-search") handleGlobalSearch();
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.id === "globalSearch") handleGlobalSearch();
  if (event.key === "Escape") closeModal();
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", event => {
  if (event.target.id === "modalBackdrop") closeModal();
});
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("sidebarCollapse").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  const collapsed = sidebar.classList.toggle("collapsed");
  const button = document.getElementById("sidebarCollapse");
  button.textContent = collapsed ? "›" : "‹";
  button.title = collapsed ? "展开菜单" : "收起菜单";
  button.setAttribute("aria-label", collapsed ? "展开菜单" : "收起菜单");
});
window.addEventListener("hashchange", () => {
  document.getElementById("sidebar").classList.remove("open");
  render();
});

initData();
if (!location.hash) location.hash = "#/dashboard";
render();
