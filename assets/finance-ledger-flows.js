function tag(text){
  const map = {正常:'green', 已记账:'green', 已入账:'green', 平衡:'green', 已配对:'green', 通过:'green', 已启用:'green', 已通过:'green', 已清欠:'green', 已处理:'green', 已完成:'green', 已发送:'green', 已更新:'green', 成功:'green', 是:'green', 低:'green', 资金池汇总:'blue', 控制台账:'blue', 部分:'orange', 部分覆盖:'orange', 需补记:'orange', 缺官方账户源:'orange', 待审批:'orange', 待审核:'orange', 待对账:'orange', 待复核:'orange', 待清欠:'orange', 待发送:'orange', 待盘账:'orange', 待月结:'orange', 待处理:'orange', 待配置:'orange', 待优化:'orange', 关注:'orange', 中:'orange', 停用:'gray', 已锁定:'gray', 不更新:'gray', 否:'gray', 历史兼容:'gray', 已冲正:'purple', 不跑模板:'purple', 灰度:'blue', 草稿:'gray', 异常:'red', 不平衡:'red', 未实现:'red', 失败:'red', 告警:'red', 高:'red'};
  return `<span class="tag ${map[text]||'blue'}">${text}</span>`;
}
function money(v){return `<strong>${v}</strong>`}
function renderTable(headers, rows, actions=''){
  return `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}${actions?'<th>操作</th>':''}</tr></thead><tbody>${rows.map((r,i)=>`<tr>${r.map(c=>`<td>${String(c).match(/^(正常|已记账|已入账|平衡|已配对|通过|已启用|已通过|已清欠|已处理|已完成|已发送|已更新|成功|是|否|低|资金池汇总|控制台账|部分|部分覆盖|需补记|缺官方账户源|待审批|待审核|待对账|待复核|待清欠|待发送|待盘账|待月结|待处理|待配置|待优化|关注|中|停用|已锁定|不更新|历史兼容|已冲正|不跑模板|异常|不平衡|未实现|失败|告警|高|灰度|草稿)$/)?tag(c):c}</td>`).join('')}${actions?`<td>${actions.replaceAll('{i}',i)}</td>`:''}</tr>`).join('')}</tbody></table></div>`;
}
const monthlyTemplateRows = [
  ['SITE_PNL_MONTHLY','站点盈亏月结模板','站点月度盈亏结算','V1.0','待月结'],
  ['SITE_FEE_MONTHLY','站点手续费月结模板','站点手续费月结','V1.0','待月结'],
  ['VENUE_FEE_MONTHLY','三方场馆费用月结模板','三方场馆费用月结','V1.0','已启用'],
  ['OPS_EXPENSE_MONTHLY','运营费用月结模板','运营费用月结','V1.0','待审批'],
  ['AGENT_COMMISSION_MONTHLY','代理分润月结模板','代理分润月结','V1.0','已启用']
];
const monthlyBusinessTypes = monthlyTemplateRows.map(row=>row[1].replace('模板',''));
const monthlyEntryRows = [
  ['MONTHLY-BATCH202605-SITEPNL','站点盈亏月结','MONTHLY-SITE-PNL-202605','总站','站点盈亏月结成本账户','成本增加','站点 S-01','站点月结应付账户','负债增加','128,600.00','CNY','SITE_PNL_MONTHLY 按站点月度盈亏净额生成：总站确认站点盈亏成本，同时形成对站点的月结应付。','平衡'],
  ['MONTHLY-BATCH202605-SITEFEE','站点手续费月结','MONTHLY-SITE-FEE-202605','站点 S-01','站点月结应收账户','资产增加','总站','站点手续费收入账户','收入增加','18,420.00','CNY','SITE_FEE_MONTHLY 按站点月度手续费生成：平台确认站点应收手续费，同时确认手续费收入。','平衡'],
  ['MONTHLY-BATCH202605-VENUEFEE','三方场馆费用月结','MONTHLY-VENUE-FEE-202605','总站','三方场馆费用成本账户','成本增加','场馆 AG','三方场馆往来账户','负债增加','48,900.00','CNY','VENUE_FEE_MONTHLY 按场馆账单费用生成：总站确认场馆费用成本，同时形成场馆应付往来。','平衡'],
  ['MONTHLY-BATCH202605-OPS','运营费用月结','MONTHLY-OPS-202605','总站','运营费用月结成本账户','成本增加','总站','运营费用应付账户','负债增加','36,800.00','CNY','OPS_EXPENSE_MONTHLY 汇总当月运营费用：先确认月结成本和应付，审批后再付款。','平衡'],
  ['MONTHLY-BATCH202605-AGENT','代理分润月结','MONTHLY-AGENT-COMM-202605','站点 S-01','代理分润月结成本账户','成本增加','代理 parentA','代理月结应付账户','负债增加','56,780.00','CNY','AGENT_COMMISSION_MONTHLY 按月汇总代理分润：保留实时分润模板，同时形成月结分润应付。','平衡']
];
const monthlyBatchRows = [
  ['MONTHLY-BATCH202605-SITEPNL','MONTHLY-SITE-PNL-202605','SITE_PNL_MONTHLY','V1.0','128,600.00','128,600.00','平衡','待审批'],
  ['MONTHLY-BATCH202605-SITEFEE','MONTHLY-SITE-FEE-202605','SITE_FEE_MONTHLY','V1.0','18,420.00','18,420.00','平衡','待月结'],
  ['MONTHLY-BATCH202605-VENUEFEE','MONTHLY-VENUE-FEE-202605','VENUE_FEE_MONTHLY','V1.0','48,900.00','48,900.00','平衡','已入账'],
  ['MONTHLY-BATCH202605-OPS','MONTHLY-OPS-202605','OPS_EXPENSE_MONTHLY','V1.0','36,800.00','36,800.00','平衡','待审批'],
  ['MONTHLY-BATCH202605-AGENT','MONTHLY-AGENT-COMM-202605','AGENT_COMMISSION_MONTHLY','V1.0','56,780.00','56,780.00','平衡','已入账']
];
const accountTypeMeta = [
  ['总站','4 个账户','¥ 21,000,000.00'],
  ['三方支付通道','2 个账户','¥ 420,090.20'],
  ['站点','2 个账户','USDT 18,930.00 / ¥ -8,600.00'],
  ['代理','2 个账户','¥ 54,230.50'],
  ['会员','2 个账户','¥ 137,300.00']
];
function accountCategory(row){
  const id = row[0];
  const type = row[1];
  if(id.startsWith('SP') || type.includes('站点资金池')) return '资金池';
  if(id.startsWith('U')) return '会员';
  if(id.startsWith('A')) return '代理';
  if(id.startsWith('S')) return '站点';
  if(id.startsWith('PAY') || type.includes('场馆') || type.includes('三方')) return '三方支付通道';
  return '总站';
}
function sitePoolRows(){
  return [
    ['SP70001','站点资金池账户','站点 S-01 资金池','资产','CNY','640,000.00','0.00','640,000.00','正常'],
    ['SP70002','站点资金池账户','站点 S-02 资金池','资产','CNY','150,000.00','20,000.00','130,000.00','关注']
  ];
}
function accountRowsByCategory(category){
  if(category === '资金池') return sitePoolRows();
  if(category === '全部') return [...tableRows.accounts, ...sitePoolRows()];
  return tableRows.accounts.filter(row=>accountSubject(row)===category);
}
function accountAdvanceDebt(row){
  const id = row[0];
  const type = row[1];
  if(id === 'A20001') return ['¥ 5,000.00','¥ 0.00'];
  if(id === 'A20002') return ['¥ 2,000.00','¥ 2,000.00'];
  if(id === 'S30002') return ['¥ 8,600.00','¥ 8,600.00'];
  if(type.includes('信用/欠款')) return ['¥ 0.00', row[5].startsWith('-') ? `¥ ${row[5].replace('-','')}` : '¥ 0.00'];
  return ['¥ 0.00','¥ 0.00'];
}
function accountQuotaNote(row){
  const id = row[0];
  if(id === 'A20001') return 'HQPOOL20260530001 总站资金调入 +20,000.00；S-01 资金池现金 +20,000.00';
  if(id === 'U10002') return 'HQPOOL20260530002 总站资金调出 -30,000.00；S-02 资金池现金 -30,000.00';
  if(id === 'S30001') return 'HQPOOL20260530004 总站资金调入 +50,000.00；S-01 资金池现金 +50,000.00';
  if(id === 'SP70001') return '站点 S-01 独立真实资金池；最近现金调入 20,000.00';
  if(id === 'SP70002') return '站点 S-02 独立真实资金池；最近现金调出 30,000.00';
  return '-';
}
function accountReportRows(rows){
  return rows.map(row=>[row[0],row[1],row[2],row[4],row[5],row[6],row[7],...accountAdvanceDebt(row),accountQuotaNote(row),row[8]]);
}
function renderAccountTypeTabs(active='总站'){
  return `<div class="account-type-tabs">${accountTypeMeta.map(([key,count,total])=>`
    <button class="account-type-tab ${key===active?'active':''}" onclick="filterAccountList('${key}')">
      <strong>${key}</strong><span>${count}</span><span>${total}</span>
    </button>`).join('')}</div>`;
}
function renderAccountListTable(category='总站'){
  const rows = accountRowsByCategory(category);
  return renderTable(['更新时间','账户ID','账户类型','账户名称','币种','账户余额','冻结金额','可用余额','垫付金额','欠款金额','最近资金调拨','状态'], datedRows(accountReportRows(rows), '2026-05-30 10:28'), '<button class="btn" onclick="go(\'account-detail\')">详情</button> <button class="btn" onclick="openTrace(\'ACC-{i}\')">流水</button>');
}
function accountFilterSelect(active='总站'){
  return `<select class="select" id="accountFilterSelect" onchange="filterAccountList(this.value)">
    ${['全部','总站','三方支付通道','站点','代理','会员','资金池'].map(type=>`<option value="${type}" ${type===active?'selected':''}>账号筛选：${type}</option>`).join('')}
  </select>`;
}
function cashierFlowRows(){
  return [
    ['会员 U10001','2026-05-30 09:12','会员','CASH202605280001','充值','Pay-A 支付通道','PAY-A-20260528001','PAY20260528001','1,000.00','CNY','已记账','BATCH202605280001'],
    ['会员 U10002','2026-05-30 09:18','会员','CASH202605280002','提现','WD-B 代付通道','WD-B-20260528002','WD20260528002','500.00','CNY','已记账','BATCH202605280002'],
    ['代理 parentA','2026-05-30 09:26','代理','CASH202605280018','充值','Pay-A 支付通道','PAY-A-20260528018','AGPAY20260528018','20,000.00','CNY','已记账','BATCH202605280018'],
    ['代理 parentB','2026-05-30 09:34','代理','CASH202605280019','提现','WD-B 代付通道','WD-B-20260528019','AGWD20260528019','8,000.00','CNY','待审批','-'],
    ['站点 S-01','2026-05-30 09:42','站点','CASH202605280020','充值','USDT-TRC20 通道','TRC20-20260528020','SITEPAY20260528020','5,000.000000','USDT','已记账','BATCH202605280020'],
    ['站点 S-02','2026-05-30 09:48','站点','CASH202605280021','提现','WD-B 代付通道','WD-B-20260528021','SITEWD20260528021','30,000.00','CNY','待审批','-'],
    ['Pay-A 通道账户','2026-05-30 10:02','三方支付通道','CASH202605280022','充值','Pay-A 支付通道','PAY-A-SETTLE-28022','CHPAY20260528022','100,000.00','CNY','已记账','BATCH202605280022'],
    ['WD-B 代付账户','2026-05-30 10:08','三方支付通道','CASH202605280023','提现','WD-B 代付通道','WD-B-SETTLE-28023','CHWD20260528023','50,000.00','CNY','已记账','BATCH202605280023'],
    ['总站资金池','2026-05-30 10:16','总站','CASH202605280024','充值','Pay-C 支付通道','PAY-C-POOL-28024','HQPAY20260528024','300,000.00','CNY','已记账','BATCH202605280024'],
    ['平台自有账户','2026-05-30 10:22','总站','CASH202605280025','提现','Pay-A 代付通道','PAY-A-HQWD-28025','HQWD20260528025','120,000.00','CNY','失败','-'],
    ['会员 U10003','2026-05-29 16:20','会员','CASH202605290001','充值','Pay-A 支付通道','PAY-A-20260529001','PAY20260529001','800.00','CNY','已记账','BATCH202605290001'],
    ['代理 parentA','2026-05-29 17:10','代理','CASH202605290002','提现','WD-B 代付通道','WD-B-20260529002','AGWD20260529002','5,000.00','CNY','已记账','BATCH202605290002'],
    ['站点 S-01','2026-05-29 18:05','站点','CASH202605290003','充值','USDT-TRC20 通道','TRC20-20260529003','SITEPAY20260529003','2,000.000000','USDT','已记账','BATCH202605290003'],
    ['Pay-C 通道账户','2026-05-29 18:44','三方支付通道','CASH202605290004','充值','Pay-C 支付通道','PAY-C-SETTLE-29004','CHPAY20260529004','80,000.00','CNY','已记账','BATCH202605290004'],
    ['总站资金池','2026-05-28 10:30','总站','CASH202605280026','提现','Pay-A 代付通道','PAY-A-HQWD-28026','HQWD20260528026','60,000.00','CNY','已记账','BATCH202605280026']
  ];
}
const cashFlowSubjectTypes = ['总站','三方支付通道','站点','代理','会员'];
const cashFlowSubjectIcons = {总站:['总','blue'], 三方支付通道:['通','orange'], 站点:['站','green'], 代理:['代','purple'], 会员:['会','blue']};
function cashFlowDateSelect(active='今日'){
  const opts = ['今日','昨日','近7日','本月'];
  return `<select class="select" id="cashFlowDateFilter" onchange="filterCashFlow()">${opts.map(o=>`<option ${o===active?'selected':''}>${o}</option>`).join('')}</select>`;
}
function cashFlowMatchedDate(dateText, filter){
  if(filter === '昨日') return dateText.slice(0,10) === '2026-05-29';
  if(filter === '近7日') return dateText.slice(0,10) >= '2026-05-24' && dateText.slice(0,10) <= '2026-05-30';
  if(filter === '本月') return dateText.startsWith('2026-05');
  return dateText.slice(0,10) === '2026-05-30';
}
function cashFlowAddTotal(target, currency, amount){
  target[currency] = (target[currency] || 0) + amount;
}
function cashFlowBalanceTotals(){
  const balances = Object.fromEntries(cashFlowSubjectTypes.map(subject=>[subject,{}]));
  tableRows.accounts.forEach(row=>{
    const subject = accountSubject(row);
    if(!balances[subject]) return;
    cashFlowAddTotal(balances[subject], row[4], parseAmount(row[5]));
  });
  return balances;
}
function cashFlowSubjectSummary(dateFilter='今日'){
  const balances = cashFlowBalanceTotals();
  const summary = Object.fromEntries(cashFlowSubjectTypes.map(subject=>[subject,{recharge:{},withdraw:{},net:{},balance:balances[subject] || {}}]));
  cashierFlowRows().filter(row=>cashFlowMatchedDate(row[1], dateFilter)).forEach(row=>{
    const subject = row[2];
    if(!summary[subject] || row[10] === '失败') return;
    const amount = parseAmount(row[8]);
    const currency = row[9];
    if(row[4] === '充值'){
      cashFlowAddTotal(summary[subject].recharge, currency, amount);
      cashFlowAddTotal(summary[subject].net, currency, amount);
    }
    if(row[4] === '提现'){
      cashFlowAddTotal(summary[subject].withdraw, currency, amount);
      cashFlowAddTotal(summary[subject].net, currency, -amount);
    }
  });
  return `<div class="summary-grid five">${cashFlowSubjectTypes.map(subject=>{
    const [icon,cls] = cashFlowSubjectIcons[subject];
    const item = summary[subject];
    return `<div class="summary-card info">
      <div>
        <div class="summary-head">
          <div>
            <div class="summary-title">${subject}</div>
            <div class="summary-kicker">${dateFilter}充提汇总</div>
          </div>
          <div class="icon ${cls}">${icon}</div>
        </div>
        <div class="summary-value">${formatCurrencyTotals(item.net)}</div>
        <div class="summary-lines">
          <div class="summary-line"><span>充值总额</span><strong>${formatCurrencyTotals(item.recharge)}</strong></div>
          <div class="summary-line"><span>提现总额</span><strong>${formatCurrencyTotals(item.withdraw)}</strong></div>
          <div class="summary-line"><span>总余额</span><strong>${formatCurrencyTotals(item.balance)}</strong></div>
        </div>
      </div>
      <div class="summary-count">充提差 ${formatCurrencyTotals(item.net)}</div>
    </div>`;
  }).join('')}</div>`;
}
function cashFlowToolbar(){
  return toolbar([
    `<select class="select" id="cashFlowBusinessFilter" onchange="filterCashFlow()"><option>业务类型</option><option>充值</option><option>提现</option></select>`,
    `<select class="select" id="cashFlowSubjectFilter" onchange="filterCashFlow()"><option>主体类型</option>${cashFlowSubjectTypes.map(o=>`<option>${o}</option>`).join('')}</select>`,
    `<select class="select" id="cashFlowChannelFilter" onchange="filterCashFlow()"><option>渠道类型</option><option>支付通道</option><option>代付通道</option><option>USDT 通道</option></select>`,
    `<select class="select" id="cashFlowStatusFilter" onchange="filterCashFlow()"><option>流水状态</option><option>已记账</option><option>待审批</option><option>失败</option></select>`,
    `<input class="input" id="cashFlowKeyword" placeholder="主体 / 渠道 / 状态" oninput="filterCashFlow()" />`
  ],'<button class="btn primary">导出流水</button>');
}
function cashFlowFilteredRows(){
  const dateFilter = document.getElementById('cashFlowDateFilter')?.value || '今日';
  const business = document.getElementById('cashFlowBusinessFilter')?.value || '业务类型';
  const subject = document.getElementById('cashFlowSubjectFilter')?.value || '主体类型';
  const channel = document.getElementById('cashFlowChannelFilter')?.value || '渠道类型';
  const status = document.getElementById('cashFlowStatusFilter')?.value || '流水状态';
  const keyword = (document.getElementById('cashFlowKeyword')?.value || '').trim().toLowerCase();
  return cashierFlowRows().filter(row=>{
    const matchedDate = cashFlowMatchedDate(row[1], dateFilter);
    const matchedBusiness = business === '业务类型' || row[4] === business;
    const matchedSubject = subject === '主体类型' || row[2] === subject;
    const matchedChannel = channel === '渠道类型' || cashFlowChannelLabel(row) === channel;
    const matchedStatus = status === '流水状态' || row[10] === status;
    const matchedKeyword = !keyword || `${row[0]} ${row[2]} ${row[4]} ${cashFlowChannelLabel(row)} ${row[10]}`.toLowerCase().includes(keyword);
    return matchedDate && matchedBusiness && matchedSubject && matchedChannel && matchedStatus && matchedKeyword;
  });
}
function cashFlowFee(row){
  const channel = row[5];
  const amount = parseAmount(row[8]);
  if(channel.includes('WD-B')) return 2;
  if(channel.includes('Pay-A')) return amount * 0.0012;
  if(channel.includes('Pay-C')) return amount * 0.0015;
  return 0;
}
function cashFlowUserMeta(row){
  const subject = row[0];
  if(row[2] === '会员') return ['U' + row[7].replace(/\D/g,'').slice(-5), subject.replace('会员 ',''), '2026012200' + row[7].replace(/\D/g,'').slice(-2)];
  if(row[2] === '代理') return ['A' + row[7].replace(/\D/g,'').slice(-5), subject.replace('代理 ',''), '186539793' + row[7].replace(/\D/g,'').slice(-2)];
  if(row[2] === '站点') return ['S' + row[7].replace(/\D/g,'').slice(-4), subject, '-'];
  if(row[2] === '三方支付通道') return ['CH' + row[7].replace(/\D/g,'').slice(-4), subject, '-'];
  return ['HQ' + row[7].replace(/\D/g,'').slice(-4), subject, '-'];
}
function cashFlowMerchantFeeCode(row){
  if(row[5].includes('Pay-A')) return row[4] === '提现' ? 'WD_FEE_A' : 'PAY_FEE_A';
  if(row[5].includes('Pay-C')) return 'PAY_FEE_MANUAL';
  if(row[5].includes('WD-B')) return 'WD_FEE_B';
  if(row[5].includes('USDT')) return 'USDT_TRC20_FEE';
  return '-';
}
function cashFlowChannelLabel(row){
  const channel = row[5];
  if(channel.includes('WD-B')) return '代付通道';
  if(channel.includes('USDT')) return 'USDT 通道';
  if(channel.includes('Pay')) return '支付通道';
  return '其他通道';
}
function cashFlowDisplayRows(rows){
  return rows.map(row=>{
    const amount = parseAmount(row[8]);
    const fee = cashFlowFee(row);
    const received = row[4] === '充值' ? Math.max(amount - fee, 0) : amount;
    const actualLabel = row[4] === '充值' ? '到账' : '出款';
    return [
      row[1],
      row[0],
      row[2],
      row[4],
      cashFlowChannelLabel(row),
      `${row[8]} ${row[9]}`,
      fee ? `${formatAmount(fee)} ${row[9]}` : '-',
      `${actualLabel} ${formatAmount(received)} ${row[9]}`,
      row[10]
    ];
  });
}
function renderCashFlowTable(rows=cashierFlowRows().filter(row=>cashFlowMatchedDate(row[1], '今日'))){
  return renderTable(['时间','主体','主体类型','业务类型','渠道类型','交易金额','手续费','到账/出款','状态'], cashFlowDisplayRows(rows), '<button class="btn" onclick="openTrace(\'CASH202605280001\')">追踪</button> <button class="btn" onclick="go(\'third-reconcile\')">对账</button>');
}
const businessTypeOptions = ['用户充值','用户提现','投注建仓','中奖结算','礼金发放','推广返水收益','推广充值收益','推广首充收益','VIP周礼金','晋升礼金','投注返水收益','代理分润','分销返点','运营费用','三方手续费','手动上分','总站资金调入','总站资金调出','代理欠款清偿','站点充值','资金池归集','站点盈亏月结','站点手续费月结','三方场馆费用月结','运营费用月结','代理分润月结','级差佣金月结','充正垫付','台账补回','站点利润分配','总站分润','冲正/回退'];
