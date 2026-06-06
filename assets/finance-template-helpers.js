const accountSubjectTypeOptions = ['总站','三方支付通道','站点','代理','会员','资金池'];
function accountFlowBusinessRows(){
  return [
    ['AF202605280001P','用户充值','充值模块','PAY20260528001','资金池','站点 S-01 资金池','SP70001','站点资金池账户 / 真实现金池汇总','增加','994.00','620,000.00','620,994.00','CASH202605280001','通过'],
    ['AF202605280001','用户充值','充值模块','PAY20260528001','会员','会员 U10001','U10001','会员余额账户','增加','994.00','127,800.00','128,794.00','CASH202605280001','通过'],
    ['AF202605280001A','用户充值','充值模块','PAY20260528001','站点','站点 S-01','FEE-RECHARGE','充提手续费收入账户','增加','6.00','0.00','6.00','CASH202605280001','通过'],
    ['AF202605280001B','用户充值','充值模块','PAY20260528001','三方支付通道','Pay-A 收款账号','PAY60001','三方收款账号','增加','1,000.00','100,000.00','101,000.00','CASH202605280001','通过'],
    ['AF202605280002P','用户提现','提现模块','WD20260528002','资金池','站点 S-01 资金池','SP70001','站点资金池账户 / 真实现金池汇总','减少','495.00','620,994.00','620,499.00','CASH202605280002','通过'],
    ['AF202605280003','用户提现','提现模块','WD20260528002','会员','会员 U10002','U10002','会员余额账户','减少','500.00','9,000.00','8,500.00','CASH202605280002','通过'],
    ['AF202605280003A','用户提现','提现模块','WD20260528002','站点','站点 S-01','FEE-WITHDRAW','充提手续费收入账户','增加','5.00','6.00','11.00','CASH202605280002','通过'],
    ['AF202605280003B','用户提现','提现模块','WD20260528002','三方支付通道','WD-B 付款账号','PAY-WD-B','三方付款账号','减少','495.00','50,000.00','49,505.00','CASH202605280002','通过'],
    ['AF202605280004','投注建仓','体育模块','BETOPEN20260528003','会员','会员 U10001','U10001','会员余额账户','减少','300.00','128,800.00','128,500.00','CASH202605280003','通过'],
    ['AF202605280005','中奖结算','体育模块','WIN20260528004','会员','会员 U10001','U10001','会员余额账户','增加','520.00','128,500.00','129,020.00','CASH202605280004','通过'],
    ['AF202605280008','礼金发放','运营活动','BONUS20260528009','会员','会员 U10004','U10004','会员余额账户','增加','88.00','1,120.00','1,208.00','CASH202605280009','通过'],
    ['AF202605280015','推广返水收益','推广模块','PROMO_REBATE20260528012','会员','会员 U10005','U10005','会员余额账户','增加','168.80','2,000.00','2,168.80','BATCH202605280012','通过'],
    ['AF202605280016','推广充值收益','推广模块','PROMO_RECHARGE20260528013','会员','会员 U10006','U10006','会员余额账户','增加','120.00','860.00','980.00','BATCH202605280013','通过'],
    ['AF202605280017','推广首充收益','推广模块','PROMO_FIRST20260528014','会员','会员 U10007','U10007','会员余额账户','增加','300.00','0.00','300.00','BATCH202605280014','通过'],
    ['AF202605280018','VIP周礼金','VIP权益','VIPWEEK20260528015','会员','会员 U10001','U10001','会员余额账户','增加','58.00','129,020.00','129,078.00','BATCH202605280015','通过'],
    ['AF202605280019','晋升礼金','VIP权益','VIPUP20260528016','会员','会员 U10002','U10002','会员余额账户','增加','188.00','8,500.00','8,688.00','BATCH202605280016','通过'],
    ['AF202605280020','投注返水收益','返水结算','BETREBATE20260528017','会员','会员 U10003','U10003','会员余额账户','增加','96.60','3,800.00','3,896.60','BATCH202605280017','通过'],
    ['AF202605280006','代理分润','代理模块','COMM20260528005','代理','代理 parentA','A20001','代理余额账户','增加','78.50','56,152.00','56,230.50','CASH202605280005','通过'],
    ['AF202605280009','分销返点','分销模块','REBATE20260528010','代理','代理 parentB','A20002','代理余额账户','增加','45.60','0.00','45.60','CASH202605280010','通过'],
    ['AF202605280010','运营费用','运营后台','OPS20260528011','总站','平台自有账户','P40002','平台自有账户','减少','3,000.00','1,583,000.00','1,580,000.00','CASH202605280011','通过'],
    ['AF202605280011','三方手续费','支付渠道','FEE20260528006','三方支付通道','渠道 Pay-A','PAY60001','三方支付账户','减少','12.00','100,012.00','100,000.00','CASH202605280006','待复核'],
    ['AF202605280021','站点充值','站点结算','SITEPAY20260528020','站点','站点 S-01','S30001','站点余额账户','增加','5,000.000000','13,930.00','18,930.00','BATCH202605280020','通过'],
    ['AF202605280022','资金池归集','资金池','POOL20260528024','资金池','站点 S-01 资金池','SP70001','站点资金池账户','增加','100,000.00','520,000.00','620,000.00','BATCH202605280024','通过'],
    ['AFHQ20260530001','总站资金调入','总站资金调拨','HQPOOL20260530001','代理','代理 parentA','A20001','代理余额账户','增加','20,000.00','56,230.50','76,230.50','BATCH-HQPOOL20260530001','通过'],
    ['AFHQ20260530002','总站资金调入','总站资金调拨','HQPOOL20260530001','资金池','站点 S-01 资金池','SP70001','站点资金池账户 / 真实现金池汇总','增加','20,000.00','620,000.00','640,000.00','BATCH-HQPOOL20260530001','通过'],
    ['AFHQ20260530003','总站资金调出','总站资金调拨','HQPOOL20260530002','会员','会员 U10002','U10002','会员余额账户','减少','30,000.00','38,500.00','8,500.00','BATCH-HQPOOL20260530002','待复核'],
    ['AFHQ20260530004','总站资金调出','总站资金调拨','HQPOOL20260530002','资金池','站点 S-02 资金池','SP70002','站点资金池账户 / 真实现金池汇总','减少','30,000.00','180,000.00','150,000.00','BATCH-HQPOOL20260530002','待复核'],
    ['AF202605M001','站点盈亏月结','月结中心','MONTHLY-SITE-PNL-202605','站点','站点 S-01','S30001','站点月结应付账户','增加','128,600.00','0.00','128,600.00','MONTHLY-BATCH202605-SITEPNL','待复核'],
    ['AF202605M002','站点手续费月结','月结中心','MONTHLY-SITE-FEE-202605','站点','站点 S-01','S30001','站点月结应收账户','增加','18,420.00','0.00','18,420.00','MONTHLY-BATCH202605-SITEFEE','待复核'],
    ['AF202605M003','三方场馆费用月结','三方场馆','MONTHLY-VENUE-FEE-202605','三方支付通道','场馆 AG','V50001','三方场馆往来账户','增加','48,900.00','320,090.20','368,990.20','MONTHLY-BATCH202605-VENUEFEE','通过'],
    ['AF202605M004','运营费用月结','运营后台','MONTHLY-OPS-202605','总站','总站运营费用','P40002','运营费用应付账户','增加','36,800.00','0.00','36,800.00','MONTHLY-BATCH202605-OPS','待复核'],
    ['AF202605M005','代理分润月结','代理模块','MONTHLY-AGENT-COMM-202605','代理','代理 parentA','A20001','代理月结应付账户','增加','56,780.00','0.00','56,780.00','MONTHLY-BATCH202605-AGENT','通过'],
    ['AF202605M006','级差佣金月结','月结中心','MONTHLY-DIFF-COMM-202605','代理','代理 ParentB','A20004','代理余额账户','增加','300.00','2,000.00','2,300.00','MONTHLY-BATCH202605-DIFF','通过'],
    ['AF202605M007','充正垫付','充正结算','CORRECT202605-C001','代理','代理 C','AR-C-001','代理台账应收账户','增加','250.00','0.00','250.00','ADV-BATCH202605-CORRECT','通过'],
    ['AF202605M008','充正垫付','充正结算','CORRECT202605-C001','三方支付通道','WD-B 付款账号','PAY-WD-B','三方付款账号','减少','250.00','49,505.00','49,255.00','ADV-BATCH202605-CORRECT','通过'],
    ['AF202605M009','台账补回','台账追偿','REPAY202605-C001','三方支付通道','Pay-A 收款账号','PAY60001','三方收款账号','增加','250.00','101,000.00','101,250.00','REPAY-BATCH202605-CORRECT','通过'],
    ['AF202605M010','台账补回','台账追偿','REPAY202605-C001','代理','代理 C','AR-C-001','代理台账应收账户','减少','250.00','250.00','0.00','REPAY-BATCH202605-CORRECT','已清欠'],
    ['AF202605M011','站点利润分配','月结中心','MONTHLY-SITE-PROFIT-202605','资金池','站点 S-01 资金池','SP70001','站点资金池账户 / 真实现金池汇总','增加','85,000.00','640,000.00','725,000.00','MONTHLY-BATCH202605-SITEPROFIT','通过'],
    ['AF202605M012','总站分润','月结中心','MONTHLY-HQ-PROFIT-202605','总站','总站分润账户','P40002','总站分润收入账户','增加','5,000.00','1,580,000.00','1,585,000.00','MONTHLY-BATCH202605-HQPROFIT','通过'],
    ['AF202605280014','手动上分','运营后台','ADJ20260528007','会员','会员 U10003','U10003','会员余额账户','增加','200.00','3,600.00','3,800.00','CASH202605280007','待复核'],
    ['AF202605280007','代理欠款清偿','代理模块','CLEAR20260528008','代理','代理 A20002','A20002','代理信用/欠款账户','增加','2,000.00','-2,000.00','0.00','CASH202605280008','通过'],
    ['AF202605280013','冲正/回退','财务后台','CASH202605280001','会员','会员 U10001','U10001','会员余额账户','减少','1,000.00','129,020.00','128,020.00','REV202605280001','通过']
  ];
}
const accountFlowDates = ['2026-05-30 10:26','2026-05-30 10:18','2026-05-30 10:06','2026-05-30 09:58','2026-05-30 09:42','2026-05-30 09:36','2026-05-30 09:32','2026-05-30 09:28','2026-05-30 09:24','2026-05-30 09:18','2026-05-30 09:12','2026-05-30 09:06','2026-05-30 08:58','2026-05-30 08:46','2026-05-30 08:34','2026-05-30 08:22','2026-05-30 08:12','2026-05-30 08:02','2026-05-30 07:54','2026-05-30 07:46','2026-05-30 07:38','2026-05-30 07:30','2026-05-29 18:40','2026-05-29 16:12','2026-05-28 14:33'];
function accountFlowRowsWithDate(){
  return accountFlowBusinessRows().map((row,i)=>[accountFlowDates[i] || '2026-05-30 10:26', ...row]);
}
function accountFlowToolbar(){
  return toolbar([
    `<select class="select" id="accountFlowTimeFilter" onchange="filterAccountFlow()"><option>时间筛选</option><option>今日</option><option>昨日</option><option>近7日</option><option>本月</option></select>`,
    `<select class="select" id="accountFlowSubjectFilter" onchange="filterAccountFlow()"><option>主体类型</option>${accountSubjectTypeOptions.map(o=>`<option>${o}</option>`).join('')}</select>`,
    `<select class="select" id="accountFlowBusinessFilter" onchange="filterAccountFlow()"><option>业务类型</option>${businessTypeOptions.map(o=>`<option>${o}</option>`).join('')}</select>`,
    `<select class="select" id="accountFlowStatusFilter" onchange="filterAccountFlow()"><option>流水状态</option><option>通过</option><option>待复核</option><option>异常</option></select>`,
    `<input class="input" id="accountFlowKeyword" placeholder="业务单号 / 收银流水ID" oninput="filterAccountFlow()" />`
  ],'<button class="btn primary">导出账户流水</button>');
}
function accountFlowDateMatched(dateText, filter){
  const day = dateText.slice(0,10);
  if(filter === '今日') return day === '2026-05-30';
  if(filter === '昨日') return day === '2026-05-29';
  if(filter === '近7日') return day >= '2026-05-24' && day <= '2026-05-30';
  if(filter === '本月') return day.startsWith('2026-05');
  return true;
}
function financeFriendlyAmountLabel(value){
  const text = String(value || '').trim();
  const exact = {
    G:'交易毛额',
    F:'手续费',
    A:'实际入账',
    W:'提现金额',
    N:'实际出款',
    bonus:'奖励金额',
    commission:'佣金金额',
    settle:'月结金额',
    mainShare:'总站分润',
    siteShare:'站点分润',
    rent:'月租',
    VF:'场馆费用',
    OF:'运营/手续费分摊'
  };
  if(exact[text]) return exact[text];
  if(text === 'G/F/A') return '交易毛额 / 手续费 / 实际入账';
  if(text === 'W/F/N') return '提现金额 / 手续费 / 实际出款';
  if(text.includes('settle')) return '月结账单金额';
  if(text.includes('commission')) return '佣金金额';
  if(text.includes('bonus')) return '奖励金额';
  if(text.includes('fee') || text.includes('Fee')) return '费用金额';
  if(/[A-Za-z_*()]/.test(text)) return '按业务规则计算';
  return text || '-';
}
function accountFlowDirectionLabel(direction){
  const text = String(direction || '');
  const map = {借:'借方', 贷:'贷方', 增加:'增加', 减少:'减少', 冻结:'冻结', 解冻:'解冻', 控制:'控制', 状态变更:'状态变更'};
  return map[text] || text || '-';
}
function accountFlowEffectText(row){
  const account = String(row[8] || '账户/台账');
  const direction = accountFlowDirectionLabel(row[9]);
  if(account.includes('资金池额度')) return `额度控制项${direction}`;
  if(account.includes('资金池')) return `资金池余额${direction}`;
  if(account.includes('余额')) return `账户余额${direction}`;
  if(account.includes('应收')) return `应收台账${direction}`;
  if(account.includes('应付')) return `应付台账${direction}`;
  if(account.includes('成本')) return `成本科目${direction}`;
  if(account.includes('收入')) return `收入科目${direction}`;
  if(account.includes('手续费')) return `手续费清算${direction}`;
  return `${account}${direction}`;
}
function renderAccountFlowTable(rows=accountFlowRowsWithDate()){
  const displayRows = rows.map(row=>[
    row[0],
    row[5],
    row[6],
    row[2],
    row[8],
    accountFlowDirectionLabel(row[9]),
    financeFriendlyAmountLabel(row[10]),
    accountFlowEffectText(row),
    row[14]
  ]);
  return renderTable(['时间','主体类型','主体','业务类型','账户/科目','方向','金额口径','余额/台账影响','状态'], displayRows, '<button class="btn" onclick="openTrace(\'CASH202605280001\')">追踪</button>');
}
function accountBalanceLedgerRows(){
  return [
    ['1','会员余额账户','用户','U10001','会员 Allen','P1101','13864959612','129,078.00','128,020.00','1,058.00','BATCH202605280015','贷','2026-05-30 10:26'],
    ['1','会员余额账户','用户','U10002','会员 Betty','P1101','13805070055','8,688.00','8,500.00','188.00','BATCH202605280016','贷','2026-05-30 10:18'],
    ['1','代理余额账户','代理','A20001','parentA','P2101','18653979318','76,230.50','56,230.50','20,000.00','BATCH-HQPOOL20260530001','贷','2026-05-30 08:02'],
    ['1','站点资金池账户','站点资金池','SP70001','站点 S-01 资金池','S0101','-','640,000.00','620,000.00','20,000.00','BATCH-HQPOOL20260530001','借','2026-05-30 07:54'],
    ['1','站点月结应付账户','站点','S30001','站点 S-01','S0101','-','128,600.00','0.00','128,600.00','MONTHLY-BATCH202605-SITEPNL','贷','2026-05-29 18:40'],
    ['1','三方支付账户','企业','PAY60001','支付通道 Pay-A','C0101','-','100,000.00','100,012.00','-12.00','BATCH202605280006','贷','2026-05-30 08:34']
  ];
}
function entrySide(direction, subject, account, effect){
  const cls = direction === '借' ? 'debit' : 'credit';
  return `<div class="entry-side"><span class="entry-direction ${cls}">${direction}</span><div><strong>${subject}</strong><span>${account}</span><em>${effect}</em></div></div>`;
}
let postingDetailRowsState;
function postingDetailSourceRows(){
  if(!postingDetailRowsState){
    postingDetailRowsState = [
    ['USER_RECHARGE','BATCH202605280001','CASH202605280001','会员充值','GRP-RECHARGE-001','1','账户中心 / 账户流水','站点资金池账户 / 真实现金池汇总','站点 S-01 资金池','汇总','充值净入账纳入站点资金池现金汇总','994.00','-','交易金额 - 手续费','资金池现金 +994.00','是','否','已更新','资金池汇总'],
    ['USER_RECHARGE','BATCH202605280001','CASH202605280001','会员充值','GRP-RECHARGE-001','2','账户中心 / 账户流水','会员余额账户','会员 U10001','负债','充值净额形成站点对会员的应付余额','-','994.00','交易金额 - 手续费','会员余额 +994.00','是','否','已更新','平衡'],
    ['USER_RECHARGE','BATCH202605280001','CASH202605280001','会员充值','GRP-RECHARGE-001','3','报表中心 / 收入成本统计','充提手续费收入账户','站点 S-01','收入','确认充值手续费由发起方承担','-','6.00','交易金额 × 0.6%','手续费收入 +6.00','否','是','已更新','平衡'],
    ['USER_RECHARGE','BATCH202605280001','CASH202605280001','会员充值','GRP-RECHARGE-001','4','账户中心 / 账户流水','三方收款账号','Pay-A 收款账号','资产','三方真实收款账号收到充值款','1,000.00','-','交易金额','三方收款账号 +1,000.00','是','否','已更新','平衡'],
    ['USER_WITHDRAW','BATCH202605280002','CASH202605280002','会员提现','GRP-WITHDRAW-001','1','账户中心 / 账户流水','站点资金池账户 / 真实现金池汇总','站点 S-01 资金池','汇总','提现实际出款从站点资金池现金汇总扣减','-','495.00','提现金额 - 手续费','资金池现金 -495.00','是','否','已更新','资金池汇总'],
    ['USER_WITHDRAW','BATCH202605280002','CASH202605280002','会员提现','GRP-WITHDRAW-001','2','账户中心 / 账户流水','会员余额账户','会员 U10002','负债','提现申请扣减发起方余额','500.00','-','提现金额','会员余额 -500.00','是','否','已更新','平衡'],
    ['USER_WITHDRAW','BATCH202605280002','CASH202605280002','会员提现','GRP-WITHDRAW-001','3','报表中心 / 收入成本统计','充提手续费收入账户','站点 S-01','收入','确认提现手续费由发起方承担','-','5.00','提现手续费','手续费收入 +5.00','否','是','已更新','平衡'],
    ['USER_WITHDRAW','BATCH202605280002','CASH202605280002','会员提现','GRP-WITHDRAW-001','4','账户中心 / 账户流水','三方付款账号','WD-B 付款账号','资产','三方真实付款账号完成代付出款','-','495.00','提现金额 - 手续费','三方付款账号 -495.00','是','否','已更新','平衡'],
    ['WIN_SETTLE','BATCH202605280004','CASH202605280004','投注赢钱 / 中奖结算','GRP-WIN-001','1','报表中心 / 成本账本','派奖/中奖成本账户','站点 S-01','成本','确认中奖派发成本','520.00','-','中奖派发金额','中奖成本 +520.00','否','是','已更新','平衡'],
    ['WIN_SETTLE','BATCH202605280004','CASH202605280004','投注赢钱 / 中奖结算','GRP-WIN-001','2','账户中心 / 账户流水','会员余额账户','会员 U10001','负债','中奖金额进入会员余额','-','520.00','中奖派发金额','会员余额 +520.00','是','否','已更新','平衡'],
    ['BONUS_GRANT','BATCH202605280009','CASH202605280009','礼金发放 / 网站福利','GRP-BONUS-001','1','报表中心 / 成本账本','福利/礼金成本账户','站点 S-01','成本','确认网站福利成本','88.00','-','福利发放金额','福利成本 +88.00','否','是','已更新','平衡'],
    ['BONUS_GRANT','BATCH202605280009','CASH202605280009','礼金发放 / 网站福利','GRP-BONUS-001','2','账户中心 / 账户流水','会员余额账户','会员 U10004','负债','福利金额进入会员余额','-','88.00','福利发放金额','会员余额 +88.00','是','否','已更新','平衡'],
    ['PROMO_REBATE','BATCH202605280012','PROMO_REBATE20260528012','推广返水收益','GRP-PROMO-REBATE-001','1','报表中心 / 成本账本','推广奖励成本账户','站点 S-01','成本','确认推广返水奖励成本','168.80','-','推广返水金额','推广奖励成本 +168.80','否','是','已更新','平衡'],
    ['PROMO_REBATE','BATCH202605280012','PROMO_REBATE20260528012','推广返水收益','GRP-PROMO-REBATE-001','2','账户中心 / 账户流水','会员余额账户','会员 U10005','负债','推广返水进入会员余额','-','168.80','推广返水金额','会员余额 +168.80','是','否','已更新','平衡'],
    ['PROMO_RECHARGE_REWARD','BATCH202605280013','PROMO_RECHARGE20260528013','推广充值收益','GRP-PROMO-RECHARGE-001','1','报表中心 / 成本账本','推广奖励成本账户','站点 S-01','成本','确认推广充值奖励成本','120.00','-','被推广充值金额 × 奖励比例','推广奖励成本 +120.00','否','是','已更新','平衡'],
    ['PROMO_RECHARGE_REWARD','BATCH202605280013','PROMO_RECHARGE20260528013','推广充值收益','GRP-PROMO-RECHARGE-001','2','账户中心 / 账户流水','会员余额账户','会员 U10006','负债','推广充值奖励进入会员余额','-','120.00','推广充值奖励金额','会员余额 +120.00','是','否','已更新','平衡'],
    ['PROMO_FIRST_RECHARGE','BATCH202605280014','PROMO_FIRST20260528014','推广首充收益','GRP-PROMO-FIRST-001','1','报表中心 / 成本账本','推广首充奖励成本账户','站点 S-01','成本','确认推广首充奖励成本','300.00','-','首充奖励金额','推广首充成本 +300.00','否','是','已更新','平衡'],
    ['PROMO_FIRST_RECHARGE','BATCH202605280014','PROMO_FIRST20260528014','推广首充收益','GRP-PROMO-FIRST-001','2','账户中心 / 账户流水','会员余额账户','会员 U10007','负债','推广首充奖励进入会员余额','-','300.00','首充奖励金额','会员余额 +300.00','是','否','已更新','平衡'],
    ['VIP_WEEKLY_BONUS','BATCH202605280015','VIPWEEK20260528015','VIP周礼金','GRP-VIP-WEEK-001','1','报表中心 / 成本账本','VIP礼金成本账户','站点 S-01','成本','确认VIP周礼金成本','58.00','-','VIP等级周礼金','VIP礼金成本 +58.00','否','是','已更新','平衡'],
    ['VIP_WEEKLY_BONUS','BATCH202605280015','VIPWEEK20260528015','VIP周礼金','GRP-VIP-WEEK-001','2','账户中心 / 账户流水','会员余额账户','会员 U10001','负债','VIP周礼金进入会员余额','-','58.00','VIP等级周礼金','会员余额 +58.00','是','否','已更新','平衡'],
    ['VIP_UPGRADE_BONUS','BATCH202605280016','VIPUP20260528016','晋升礼金','GRP-VIP-UP-001','1','报表中心 / 成本账本','VIP晋升礼金成本账户','站点 S-01','成本','确认VIP晋升礼金成本','188.00','-','晋升礼金金额','VIP晋升成本 +188.00','否','是','已更新','平衡'],
    ['VIP_UPGRADE_BONUS','BATCH202605280016','VIPUP20260528016','晋升礼金','GRP-VIP-UP-001','2','账户中心 / 账户流水','会员余额账户','会员 U10002','负债','晋升礼金进入会员余额','-','188.00','晋升礼金金额','会员余额 +188.00','是','否','已更新','平衡'],
    ['BET_REBATE','BATCH202605280017','BETREBATE20260528017','投注返水收益','GRP-BET-REBATE-001','1','报表中心 / 成本账本','投注返水成本账户','站点 S-01','成本','确认有效投注返水成本','96.60','-','有效投注额 × 返水比例','投注返水成本 +96.60','否','是','已更新','平衡'],
    ['BET_REBATE','BATCH202605280017','BETREBATE20260528017','投注返水收益','GRP-BET-REBATE-001','2','账户中心 / 账户流水','会员余额账户','会员 U10003','负债','投注返水进入会员余额','-','96.60','投注返水金额','会员余额 +96.60','是','否','已更新','平衡'],
    ['AGENT_COMMISSION','BATCH202605280005','CASH202605280005','代理分润','GRP-AGENT-001','1','报表中心 / 成本账本','代理分润成本账户','站点 S-01','成本','确认代理分润成本','78.50','-','有效盈利 × ParentA比例','分润成本 +78.50','否','是','已更新','平衡'],
    ['AGENT_COMMISSION','BATCH202605280005','CASH202605280005','代理分润','GRP-AGENT-001','2','账户中心 / 账户流水','代理余额账户','代理 parentA','负债','代理分润进入代理余额','-','78.50','ParentA 分润金额','代理余额 +78.50','是','否','已更新','平衡'],
    ['AGENT_COMMISSION_MONTHLY','MONTHLY-BATCH202605-AGENT','MONTHLY-AGENT-COMM-202605','代理实际佣金月结','GRP-AGENT-MONTHLY-001','1','报表中心 / 收入成本统计','代理实际佣金成本账户','站点','成本','本期会员亏损进入等效毛盈利后，扣除台账偿还再确认代理实际佣金成本','150.00','-','max((等效毛盈利 - 台账偿还) × 佣金率, 0)','代理佣金成本 +150.00','否','是','已更新','平衡'],
    ['AGENT_COMMISSION_MONTHLY','MONTHLY-BATCH202605-AGENT','MONTHLY-AGENT-COMM-202605','代理实际佣金月结','GRP-AGENT-MONTHLY-001','2','账户中心 / 账户流水','代理余额账户','代理','负债','代理实际佣金进入代理余额','-','150.00','本期实际佣金','代理余额 +150.00','是','否','已更新','平衡'],
    ['AGENT_DIFF_COMMISSION','MONTHLY-BATCH202605-DIFF','MONTHLY-DIFF-COMM-202605','级差佣金月结','GRP-DIFF-001','1','报表中心 / 收入成本统计','级差佣金成本账户','站点','成本','按下级会员净亏损与上下级佣金率差额确认级差佣金','300.00','-','下级会员净亏损 × (本级佣金率 - 下级佣金率)','级差佣金成本 +300.00','否','是','已更新','平衡'],
    ['AGENT_DIFF_COMMISSION','MONTHLY-BATCH202605-DIFF','MONTHLY-DIFF-COMM-202605','级差佣金月结','GRP-DIFF-001','2','账户中心 / 账户流水','代理余额账户','代理','负债','级差佣金进入代理余额，可优先用于充正份额','-','300.00','本期可用级差佣金','代理余额 +300.00','是','否','已更新','平衡'],
    ['CORRECTION_ADVANCE','ADV-BATCH202605-CORRECT','CORRECT202605-C001','充正垫付','GRP-CORRECT-001','1','账户中心 / 账户流水','代理台账应收账户','代理','资产','会员赢钱份额缺口由站点兜底，形成对代理的台账应收','250.00','-','会员赢钱 × 站点分成占比缺口','台账欠款 +250.00','是','否','已更新','平衡'],
    ['CORRECTION_ADVANCE','ADV-BATCH202605-CORRECT','CORRECT202605-C001','充正垫付','GRP-CORRECT-001','2','账户中心 / 账户流水','三方付款账号','三方支付通道','资产','站点通过三方付款账号垫付充正缺口','-','250.00','站点兜底垫付金额','三方付款账号 -250.00','是','否','已更新','平衡'],
    ['LEDGER_REPAYMENT','REPAY-BATCH202605-CORRECT','REPAY202605-C001','台账补回','GRP-REPAY-001','1','账户中心 / 账户流水','三方收款账号','三方支付通道','资产','代理未来等效毛盈利优先补回站点兜底款','250.00','-','min(台账欠款余额, 本期等效毛盈利)','三方收款账号 +250.00','是','否','已更新','平衡'],
    ['LEDGER_REPAYMENT','REPAY-BATCH202605-CORRECT','REPAY202605-C001','台账补回','GRP-REPAY-001','2','账户中心 / 账户流水','代理台账应收账户','代理','资产','冲减代理对站点的台账欠款','-','250.00','本期实际补回金额','台账欠款 -250.00','是','否','已更新','平衡'],
    ['SITE_PROFIT_SHARE','MONTHLY-BATCH202605-SITEPROFIT','MONTHLY-SITE-PROFIT-202605','站点利润分配','GRP-SITE-PROFIT-001','1','账户中心 / 账户流水','站点资金池账户 / 真实现金池汇总','站点资金池','资产','站点所得分润留存进入真实资金池汇总','85,000.00','-','站点总盈利 - 总站分润 - 代理佣金 - 费用分摊','资金池现金 +85,000.00','是','否','已更新','平衡'],
    ['SITE_PROFIT_SHARE','MONTHLY-BATCH202605-SITEPROFIT','MONTHLY-SITE-PROFIT-202605','站点利润分配','GRP-SITE-PROFIT-001','2','报表中心 / 收入成本统计','站点利润分润收入账户','站点','收入','确认站点分润收入','-','85,000.00','站点所得分润','站点利润 +85,000.00','否','是','已更新','平衡'],
    ['HQ_PROFIT_SHARE','MONTHLY-BATCH202605-HQPROFIT','MONTHLY-HQ-PROFIT-202605','总站分润','GRP-HQ-PROFIT-001','1','账户中心 / 账户流水','三方收款账号','三方支付通道','资产','总站分润从真实资金载体归集','5,000.00','-','总站分成比例 × 可分润利润','三方收款账号 +5,000.00','是','否','已更新','平衡'],
    ['HQ_PROFIT_SHARE','MONTHLY-BATCH202605-HQPROFIT','MONTHLY-HQ-PROFIT-202605','总站分润','GRP-HQ-PROFIT-001','2','报表中心 / 收入成本统计','总站分润收入账户','总站','收入','确认总站分润收入','-','5,000.00','总站分成比例 × 可分润利润','总站分润收入 +5,000.00','否','是','已更新','平衡'],
    ['HQ_POOL_INCREASE','BATCH-HQPOOL20260530001','HQPOOL20260530001','总站资金调入','GRP-HQ-INCREASE-001','1','账户中心 / 账户流水','站点资金池账户 / 真实现金池','站点资金池','资产','总站向归属站点资金池调入真实资金','20,000.00','-','总站资金调入金额','资金池现金 +20,000.00','是','否','已更新','平衡'],
    ['HQ_POOL_INCREASE','BATCH-HQPOOL20260530001','HQPOOL20260530001','总站资金调入','GRP-HQ-INCREASE-001','2','账户中心 / 账户流水','代理余额账户','代理','负债','目标主体余额增加','-','20,000.00','总站资金调入金额','代理余额 +20,000.00','是','否','已更新','平衡'],
    ['REVERSAL_COPY','REV-BATCH202605280001','REV202605280001','会员充值冲正','GRP-REV-RECHARGE-001','1','账户中心 / 账户流水','站点资金池账户 / 真实现金池汇总','站点资金池','汇总','反向冲减原充值带来的资金池现金汇总','-','994.00','原资金池现金汇总金额','资金池现金 -994.00','是','否','已更新','资金池汇总'],
    ['REVERSAL_COPY','REV-BATCH202605280001','REV202605280001','会员充值冲正','GRP-REV-RECHARGE-001','2','账户中心 / 账户流水','会员余额账户','会员 U10001','负债','反向冲减原充值净入账余额','994.00','-','原会员余额贷方金额','会员余额 -994.00','是','否','已更新','平衡'],
    ['REVERSAL_COPY','REV-BATCH202605280001','REV202605280001','会员充值冲正','GRP-REV-RECHARGE-001','3','报表中心 / 收入成本统计','充提手续费收入账户','站点 S-01','收入','反向冲减原充值手续费收入','6.00','-','原手续费收入贷方金额','手续费收入 -6.00','否','是','已更新','平衡'],
    ['REVERSAL_COPY','REV-BATCH202605280001','REV202605280001','会员充值冲正','GRP-REV-RECHARGE-001','4','账户中心 / 账户流水','三方收款账号','三方支付通道','资产','反向冲减原三方收款账号入账','-','1,000.00','原三方收款账号借方金额','三方收款账号 -1,000.00','是','否','已更新','平衡']
    ];
    postingDetailRowsState.forEach(normalizePostingStepOptions);
  }
  return postingDetailRowsState;
}
function normalizeModuleOption(value, ledger=''){
  if(value === '账户中心 / 账户流水') return '流水中心 / 账户流水';
  if(value === '报表中心 / 成本账本') return '报表中心 / 收入成本统计';
  if(value === '待选择模块') return '流水中心 / 账户流水';
  if(moduleOptions().includes(value)) return value;
  if(String(ledger).includes('成本') || String(ledger).includes('收入')) return '报表中心 / 收入成本统计';
  return '流水中心 / 账户流水';
}
function normalizePostingStepOptions(row){
  row[6] = normalizeModuleOption(row[6], row[7]);
  if(!ledgerOptions().includes(row[7])) row[7] = '待配置账本/账户';
  if(!row[8]) row[8] = '待配置对象';
  return row;
}
function uniqueOptions(items){
  return Array.from(new Set(items.filter(Boolean)));
}
function moduleOptions(){
  return uniqueOptions(menuConfig.flatMap(group=>group.items.map(([,label])=>`${group.group} / ${label}`)));
}
function ledgerOptions(){
  const base = [
    '待配置账本/账户',
    '会员余额账户','代理余额账户','站点余额账户','站点资金池账户','站点资金池账户 / 真实现金池','站点资金池账户 / 真实现金池汇总',
    '站点/通道到账资产','站点/代付资产账户','三方支付账户','三方收款账号','三方付款账号','三方场馆往来账户',
    '平台收款渠道账户','平台自有账户','平台资金池账户',
    '充提手续费收入账户','三方手续费成本账户','派奖/中奖成本账户','福利/礼金成本账户',
    '推广奖励成本账户','推广首充奖励成本账户','VIP礼金成本账户','VIP晋升礼金成本账户',
    '投注返水成本账户','代理分润成本账户','代理实际佣金成本账户','级差佣金成本账户','分销返点成本账户','运营费用账户',
    '站点月结应收账户','站点月结应付账户','代理月结应付账户','运营费用应付账户',
    '站点手续费收入账户','站点利润分润收入账户','总站分润收入账户','总站分润账户','投注收入账户',
    '代理台账应收账户','上级垫付台账账户','站点兜底台账账户','充正垫付账户','台账补回账户'
  ];
  const accountLedgers = [...tableRows.accounts, ...sitePoolRows()].flatMap(row=>[row[1], row[2]]);
  const editableRows = typeof accountingEditablePostingRowsState !== 'undefined' && accountingEditablePostingRowsState ? accountingEditablePostingRowsState : [];
  const excelSubjectLedgers = typeof accountingSubjects !== 'undefined' ? accountingSubjects.map(row=>accountingValue(row,'科目名称')) : [];
  const postingLedgers = [...(postingDetailRowsState || []), ...editableRows].map(row=>row[7]);
  return uniqueOptions([...base, ...accountLedgers, ...excelSubjectLedgers, ...postingLedgers]);
}
function objectOptions(){
  return ['待配置对象','总站','站点','站点资金池','三方支付通道','代理','会员','场馆'];
}
function normalizeObjectOption(value){
  const text = String(value || '');
  if(objectOptions().includes(text)) return text;
  if(!text || text === '自定义对象') return '待配置对象';
  if(text.includes('资金池')) return '站点资金池';
  if(text.includes('会员') || /^U\d+/.test(text)) return '会员';
  if(text.includes('代理') || text.includes('parent') || text.includes('Parent') || text.includes('ancestor')) return '代理';
  if(text.includes('场馆') || text.includes(' AG') || text.includes(' PG')) return '场馆';
  if(text.includes('站点') || /^S[-\d]/.test(text)) return '站点';
  if(text.includes('三方支付') || text.includes('通道') || text.includes('Pay-') || text.includes('WD-') || text.includes('USDT')) return '三方支付通道';
  if(text.includes('总站') || text.includes('平台')) return '总站';
  return '待配置对象';
}
function selectOptions(options, current){
  const normalized = uniqueOptions(current && !options.includes(current) ? [current, ...options] : options);
  return normalized.map(option=>`<option value="${option}" ${option===current?'selected':''}>${option}</option>`).join('');
}
function closedSelectValue(id, options, fallback){
  const value = document.getElementById(id)?.value;
  return options.includes(value) ? value : fallback;
}
function templatePostingStepRows(){
  return postingDetailSourceRows().map(row=>[
    row[0], row[5], row[6], row[7], normalizeObjectOption(row[8]), row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16],
    `<button class="btn" onclick="openTemplateStepEditor('${row[0]}','${row[5]}')">编辑</button>`
  ]);
}
function templateStepRows(templateCode){
  return postingDetailSourceRows().filter(row=>row[0]===templateCode);
}
function templateStepStats(templateCode){
  const rows = templateStepRows(templateCode);
  const balanceRows = rows.filter(isBalancePostingRow);
  const debit = balanceRows.reduce((sum,row)=>sum + parseAmount(row[11] === '-' ? '0' : row[11]), 0);
  const credit = balanceRows.reduce((sum,row)=>sum + parseAmount(row[12] === '-' ? '0' : row[12]), 0);
  return {
    rows,
    stepCount: rows.length,
    ledgerCount: new Set(rows.map(row=>row[7])).size,
    debit,
    credit,
    status: rows.length ? (amountsEqual(debit, credit) ? '平衡' : '不平衡') : '待配置'
  };
}
function templateStepSummaryLink(templateCode){
  const stats = templateStepStats(templateCode);
  const text = stats.stepCount ? `${stats.stepCount}步 / ${stats.ledgerCount}账本` : '待配置';
  return `<span class="link" onclick="openTemplateStepDetail('${templateCode}')">${text}</span> ${tag(stats.status)}`;
}
function templateCodes(){
  return Array.from(new Set(templateListRows().map(row=>row[0])));
}
function billSuffix(batchId){
  return String(batchId)
    .replace(/^MONTHLY-BATCH-?/, 'MONTHLY-')
    .replace(/^REV-BATCH-?/, 'REV-')
    .replace(/^BATCH-?/, '');
}
function mainBillIdForBatch(batchId){
  return `MBILL-${billSuffix(batchId)}`;
}
function subBillIdFor(batchId, stepNo){
  return `${mainBillIdForBatch(batchId)}-S${String(stepNo).padStart(2,'0')}`;
}
function postingDirection(row){
  return row[11] !== '-' ? '借' : '贷';
}
function postingAmount(row){
  return row[11] !== '-' ? row[11] : row[12];
}
function isBalancePostingRow(row){
  return !(['USER_RECHARGE','USER_WITHDRAW','REVERSAL_COPY'].includes(row[0]) && (row[9] === '汇总' || row[9] === '额度' || String(row[7]).includes('资金池')));
}
function amountsEqual(left,right){
  return Math.abs(left - right) < 0.001;
}
function entryLedgerDetailRows(){
  return postingDetailSourceRows().map(row=>[
    mainBillIdForBatch(row[1]),
    subBillIdFor(row[1], row[5]),
    row[1],
    row[0],
    row[5],
    row[3],
    row[2],
    row[6],
    row[7],
    row[8],
    row[9],
    postingDirection(row),
    money(postingAmount(row)),
    row[10],
    row[13],
    row[14],
    row[17]
  ]);
}
function postingBatchCheckRows(){
  const grouped = {};
  postingDetailSourceRows().forEach(row=>{
    const key = row[1];
    if(!grouped[key]) grouped[key] = {business:row[3], source:row[2], ledgers:new Set(), count:0, debit:0, credit:0, status:row[17]};
    grouped[key].count += 1;
    grouped[key].ledgers.add(row[7]);
    if(isBalancePostingRow(row)){
      grouped[key].debit += parseAmount(row[11] === '-' ? '0' : row[11]);
      grouped[key].credit += parseAmount(row[12] === '-' ? '0' : row[12]);
    }
  });
  return Object.entries(grouped).map(([batch,item])=>[
    mainBillIdForBatch(batch),
    batch,
    item.source,
    item.business,
    `${item.count} 条`,
    `${item.ledgers.size} 个`,
    formatAmount(item.debit),
    formatAmount(item.credit),
    amountsEqual(item.debit, item.credit) ? '平衡' : '不平衡',
    item.status
  ]);
}
function postingDetailIdFor(sourceId, ledgerName){
  const found = postingDetailSourceRows().find(row=>row[2]===sourceId && row[7]===ledgerName) || postingDetailSourceRows().find(row=>row[1]===sourceId && row[7]===ledgerName) || postingDetailSourceRows().find(row=>row[2]===sourceId || row[1]===sourceId);
  return found ? `${found[1]}-D${String(found[5]).padStart(2,'0')}` : '-';
}
function entryRelationRows(){
  return tableRows.entries.map(row=>{
    const [batch,business,source,debitSubject,debitAccount,debitEffect,creditSubject,creditAccount,creditEffect,amount,currency,relation,status] = row;
    return [
      batch,
      business,
      source,
      entrySide('借', debitSubject, debitAccount, debitEffect),
      entrySide('贷', creditSubject, creditAccount, creditEffect),
      `${amount} ${currency}`,
      `<div class="relation-note">${relation}</div>`,
      status
    ];
  });
}
function billDetailRows(){
  const objectMeta = {
    '会员 U10001':['用户','会员 Allen','P1101','13864959612'],
    '会员 U10002':['用户','会员 Betty','P1101','13805070055'],
    '会员 U10003':['用户','会员 Carol','P1101','13864959613'],
    '会员 U10004':['用户','会员 Dora','P1101','13864959614'],
    '会员 U10005':['用户','会员 Eve','P1101','13864959615'],
    '会员 U10006':['用户','会员 Frank','P1101','13864959616'],
    '会员 U10007':['用户','会员 Grace','P1101','13864959617'],
    '代理 parentA':['代理','parentA','P2101','18653979318'],
    '站点 S-01':['企业','站点 S-01','S0101','-'],
    '站点 S-01 / Pay-A':['企业','站点 S-01 / Pay-A','S0101','-'],
    '站点 S-01 / WD-B':['企业','站点 S-01 / WD-B','S0101','-'],
    '站点 S-01 资金池':['站点资金池','站点 S-01 资金池','S0101','-']
  };
  return postingDetailSourceRows().map(row=>{
    const direction = row[11] !== '-' ? '借' : '贷';
    const meta = objectMeta[row[8]] || ['企业', row[8], '-', '-'];
    return [
      row[1],
      `${row[5]}.0000`,
      row[9],
      row[8],
      row[7],
      meta[0],
      meta[1],
      meta[2],
      meta[3],
      row[11] === '-' ? '0.00' : row[11],
      row[12] === '-' ? '0.00' : row[12],
      direction,
      row[2],
      row[10],
      row[18] === '平衡' ? '已记账' : row[18],
      row[17],
      row[0] === 'REVERSAL_COPY' ? 'CASH202605280001' : '-',
      '2026-05-30 09:12',
      '2026-05-30 09:12'
    ];
  });
}
function billDetailSingleRows(){
  return billDetailRows().map(row=>{
    const stepNo = String(parseInt(row[1], 10) || row[1]);
    const amount = row[11] === '借' ? row[9] : row[10];
    return [
      mainBillIdForBatch(row[0]),
      subBillIdFor(row[0], stepNo),
      row[0],
      row[1],
      row[2],
      row[3],
      row[4],
      row[5],
      row[6],
      row[7],
      row[8],
      row[11],
      amount,
      row[12],
      row[13],
      row[14],
      row[15],
      row[16],
      row[17],
      row[18]
    ];
  });
}
function monthlyTemplateConfigRows(){
  const periods = ['每月最后一日 23:59','每月最后一日 23:50','场馆账单月结日','每月 28 日 18:00','每月最后一日 22:00'];
  const targets = ['站点 S-01 / S-02','站点 S-01 / S-02','场馆 AG / PG','总站运营费用','代理 ParentA/B/C'];
  const sources = ['站点输赢净额','站点手续费汇总','场馆账单费用','运营费用申请汇总','代理团队月度分润'];
  return monthlyTemplateRows.map((row,i)=>{
    const entry = monthlyEntryRows[i];
    return [
      row[0],
      periods[i],
      targets[i],
      sources[i],
      entrySide('借', entry[3], entry[4], entry[5]),
      entrySide('贷', entry[6], entry[7], entry[8]),
      '财务+主管双审'
    ];
  });
}
function financialTemplateMappingRows(){
  return [
    ['K2108','1','包车支付宝支付','640100','资产','企业','SystemBean','TransRealAmount','-','640100','借','打开','2023-07-12 15:46'],
    ['K2003','1','顺风车余额支付','220100','负债','用户','UserNumber','-','TransRealAmount','-','借','打开','2023-06-28 16:05'],
    ['K2011','1','顺风车银行卡支付','640100','资产','企业','SystemBean','TransRealAmount','-','640100','借','打开','2023-06-28 15:59'],
    ['K0868','1','打车券打顺风车','220100','负债','用户','UserNumber','-','TransRealAmount','-','借','打开','2024-07-12 00:58'],
    ['HQPOOL','1','总站资金调拨','100210','资产','站点资金池','StationPoolBean','PoolCashAmount','PoolCashAmount','100210','借/贷','打开','2026-05-30 10:36'],
    ['MONTHLY_SITE_FEE','1','站点手续费月结','112210','资产','站点','StationBean','MonthlyFeeAmount','MonthlyFeeAmount','112210','借','打开','2026-05-30 10:36']
  ];
}
function userTariffRows(){
  return [
    ['46720572322936264','ext_pay_reward','DirectRecommend','','内部直推奖励','','','','','','','','','', '2025-03-06 21:27:58'],
    ['46720572322936266','ext_pay_reward','P2203','0.0800','','','','','','','','','','P2203','2025-03-06 11:57:51'],
    ['46720572322936265','ext_pay_reward','P2202','0.0500','','','','','','','','','','P2202','2025-03-06 11:57:47'],
    ['46720572322936262','ext_pay_reward','P2107','0.0000','','','','','','','','','','P2107','2025-03-06 11:57:25'],
    ['46720572322936261','ext_pay_reward','P2106','0.0000','','','','','','','','','','P2106','2025-03-06 11:57:13'],
    ['46720572322936258','vip_week_bonus','P1101','58.00','VIP周礼金','','','','','','','','','P1101','2026-05-30 10:36:00'],
    ['46720572322936257','vip_upgrade_bonus','P1101','188.00','晋升礼金','','','','','','','','','P1101','2026-05-30 10:36:00'],
    ['46720572322936256','bet_rebate','P1101','0.0120','有效投注返水','','','','','','','','','P1101','2026-05-30 10:36:00']
  ];
}
function templateListRows(){
  const rows = [
    ['USER_RECHARGE','用户充值模板','充值成功','V1.3','已启用'],
    ['USER_WITHDRAW','用户提现模板','提现成功','V1.2','已启用'],
    ['BET_OPEN','投注建仓模板','下注建仓','V2.0','已启用'],
    ['WIN_SETTLE','中奖结算模板','注单中奖结算','V1.4','已启用'],
    ['BONUS_GRANT','礼金发放模板','运营礼金','V1.0','已启用'],
    ['PROMO_REBATE','推广返水收益模板','推广返水结算','V1.0','已启用'],
    ['PROMO_RECHARGE_REWARD','推广充值收益模板','推广充值奖励','V1.0','已启用'],
    ['PROMO_FIRST_RECHARGE','推广首充收益模板','推广首充奖励','V1.0','已启用'],
    ['VIP_WEEKLY_BONUS','VIP周礼金模板','VIP周礼金','V1.0','已启用'],
    ['VIP_UPGRADE_BONUS','晋升礼金模板','VIP等级晋升','V1.0','已启用'],
    ['BET_REBATE','投注返水收益模板','有效投注返水','V1.0','已启用'],
    ['AGENT_COMMISSION','固定级代理分润模板','ParentA/B/C 分润','V1.8','灰度'],
    ['AGENT_DYNAMIC','无限级代理分润自定义','动态上级链路','V0.9','灰度'],
    ['AGENT_DIFF_COMMISSION','级差佣金模板','下级净亏损级差结算','V1.0','已启用'],
    ['CORRECTION_ADVANCE','充正垫付模板','会员赢钱份额缺口垫付','V1.0','已启用'],
    ['LEDGER_REPAYMENT','台账补回模板','未来盈利优先还款','V1.0','已启用'],
    ['SITE_PROFIT_SHARE','站点利润分配模板','站点净利润留存','V1.0','待月结'],
    ['HQ_PROFIT_SHARE','总站分润模板','总站分成收入','V1.0','已启用'],
    ...quotaTemplateRows,
    ...monthlyTemplateRows,
    ['DISTRIBUTION_REBATE','分销返点模板','分销返点','V1.1','已启用'],
    ['OPS_EXPENSE','运营费用模板','运营支出','V1.0','已启用'],
    ['CHANNEL_FEE','三方手续费模板','渠道扣费','V1.1','已启用'],
    ['CREDIT_CLEAR','代理/站点清欠模板','入金先清欠','V1.0','已启用']
  ];
  return rows.map(row=>[
    ...row,
    templateStepSummaryLink(row[0]),
    `<button class="btn" onclick="openTemplateStepEditor('${row[0]}','1')">编辑明细</button>`
  ]);
}
function pageShell(title, desc, body, label='演示原型'){
  return body;
}
function docList(items){
  return `<ul class="feature-list">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
}
function docSection(title, content){
  const body = Array.isArray(content) ? docList(content) : `<p>${content}</p>`;
  return `<div class="feature-section"><h4>${title}</h4>${body}</div>`;
}
function metric(name,value,delta,icon,cls=''){
  return `<div class="card metric"><div><div class="name">${name}</div><div class="value">${value}</div><div class="delta">${delta}</div></div><div class="icon ${cls}">${icon}</div></div>`;
}
function toolbar(filters=[], btn=''){
  return `<div class="toolbar"><div class="filters">${filters.join('')}</div><div>${btn}</div></div>`;
}
function select(label, opts){return `<select class="select"><option>${label}</option>${opts.map(o=>`<option>${o}</option>`).join('')}</select>`}
function input(ph){return `<input class="input" placeholder="${ph}" />`}
const reportMinute = '2026-05-30 10:30';
function datedRows(rows, date=reportMinute){return rows.map(row=>[date,...row]);}
function parseAmount(value){return Number(String(value).replace(/,/g,'')) || 0;}
function formatAmount(value){return value.toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});}
function formatCurrencyTotals(totals){
  return Object.entries(totals).map(([currency,total])=>`${currency==='CNY'?'¥':currency} ${formatAmount(total)}`).join(' / ') || '¥ 0.00';
}
function accountSubject(row){
  const [id,type,name] = row;
  if(id.startsWith('SP') || type.includes('站点资金池')) return '资金池';
  if(id.startsWith('U') || type.includes('会员') || name.includes('会员')) return '会员';
  if(id.startsWith('A') || type.includes('代理') || name.includes('代理')) return '代理';
  if(id.startsWith('S') || type.includes('站点') || name.includes('站点')) return '站点';
  if(type.includes('三方') || name.includes('支付通道')) return '三方支付通道';
  if(id.startsWith('P') || id.startsWith('L') || type.includes('平台') || type.includes('资金池') || name.includes('平台')) return '总站';
  return '';
}
function accountSummaryCards(active='总站'){
  const defs = [
    ['总站','blue','总'],
    ['三方支付通道','orange','通'],
    ['站点','green','站'],
    ['代理','purple','代'],
    ['会员','blue','会']
  ];
  const summary = Object.fromEntries(defs.map(([name])=>[name,{count:0,totals:{}}]));
  tableRows.accounts.forEach(row=>{
    const subject = accountSubject(row);
    if(!summary[subject]) return;
    const currency = row[4];
    summary[subject].count += 1;
    summary[subject].totals[currency] = (summary[subject].totals[currency] || 0) + parseAmount(row[5]);
  });
  const pools = sitePoolRows();
  const poolTotal = formatCurrencyTotals({CNY:pools.reduce((sum,row)=>sum + parseAmount(row[5]),0)});
  const poolCount = pools.length;
  return `<div class="summary-grid" id="accountTypeFilters">${defs.map(([name,cls,icon])=>`
    <button type="button" class="summary-card ${name===active?'active':''}" data-account-type="${name}" onclick="filterAccountList('${name}')">
      <div>
        <div class="summary-head">
          <div>
            <div class="summary-title">${name}</div>
            <div class="summary-kicker">账户总余额</div>
          </div>
          <div class="icon ${cls}">${icon}</div>
        </div>
        <div class="summary-value">${formatCurrencyTotals(summary[name].totals)}</div>
      </div>
      <div class="summary-count">帐户数 ${summary[name].count} 个</div>
    </button>`).join('')}
    <button type="button" class="summary-card ${active==='资金池'?'active':''}" data-account-type="资金池" onclick="filterAccountList('资金池')">
      <div>
        <div class="summary-head">
          <div>
            <div class="summary-title">资金池总余额</div>
            <div class="summary-kicker">按站点资金池汇总</div>
          </div>
          <div class="icon green">池</div>
        </div>
        <div class="summary-value">${poolTotal}</div>
      </div>
      <div class="summary-count">资金池数量 ${poolCount} 个 / 对应站点 ${poolCount} 个</div>
    </button>
  </div>`;
}
