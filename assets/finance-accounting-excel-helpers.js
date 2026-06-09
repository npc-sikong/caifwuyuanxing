var accountingTemplateMap = Object.fromEntries(accountingTemplates.map(row=>[row['模板编码'], row]));

function accountingValue(row, key, fallback=''){
  const value = row?.[key];
  return value === undefined || value === null ? fallback : String(value);
}

function accountingEntriesByTemplate(templateCode){
  return accountingEntries
    .filter(row=>row['模板编码']===templateCode)
    .sort((a,b)=>(Number(a['行号'])||0) - (Number(b['行号'])||0));
}

function isFormalAccountingEntry(entry){
  return accountingValue(entry, '是否正式分录') === '是';
}

function isControlAccountingEntry(entry){
  return accountingValue(entry, '科目类型').includes('控制') || !['借','贷'].includes(accountingValue(entry, '借贷/控制方向'));
}

function accountingTemplateStats(templateCode){
  const template = accountingTemplateMap[templateCode] || {};
  const entries = accountingEntriesByTemplate(templateCode);
  const formal = entries.filter(isFormalAccountingEntry);
  const control = entries.filter(isControlAccountingEntry);
  const debit = formal.filter(row=>accountingValue(row, '借贷/控制方向')==='借').length;
  const credit = formal.filter(row=>accountingValue(row, '借贷/控制方向')==='贷').length;
  const covered = new Set(entries.map(row=>accountingValue(row, '当前是否覆盖')).filter(Boolean));
  return {
    template,
    entries,
    formalCount: formal.length,
    controlCount: control.length,
    debitCount: debit,
    creditCount: credit,
    ledgerCount: new Set(entries.map(row=>accountingValue(row, '科目编码'))).size,
    coverage: accountingValue(template, '覆盖状态') || Array.from(covered).join(' / ') || '待确认',
    diff: accountingValue(template, '差异状态') || '待确认',
  };
}

function accountingTemplateStepLink(templateCode){
  const stats = accountingTemplateStats(templateCode);
  const text = `${stats.entries.length}行 / 正式${stats.formalCount} / 控制${stats.controlCount}`;
  return `<span class="link" onclick="openTemplateStepDetail('${templateCode}')">${text}</span>`;
}

function accountingTemplateRows(){
  return accountingTemplates.map(row=>[
    accountingValue(row,'模板编码'),
    accountingValue(row,'业务名称'),
    accountingValue(row,'触发模块'),
    accountingValue(row,'触发状态'),
    accountingValue(row,'金额表达式'),
    accountingValue(row,'当前系统账变'),
    accountingValue(row,'标准会计处理'),
    accountingValue(row,'差异状态'),
    accountingValue(row,'补记建议'),
    accountingValue(row,'覆盖状态'),
    accountingValue(row,'源代码依据'),
    accountingTemplateStepLink(accountingValue(row,'模板编码')),
    `<button class="btn" onclick="openTemplateStepDetail('${accountingValue(row,'模板编码')}')">分录详情</button> <button class="btn primary" onclick="openTemplateStepEditor('${accountingValue(row,'模板编码')}','1')">编辑分录</button>`
  ]);
}

function templateListRows(){
  return accountingTemplateRows();
}

function templateCodes(){
  return accountingTemplates.map(row=>accountingValue(row,'模板编码'));
}

function accountingEntryRows(){
  return accountingEntries.map(row=>[
    accountingValue(row,'模板编码'),
    accountingValue(row,'行号'),
    accountingValue(row,'借贷/控制方向'),
    accountingValue(row,'科目编码'),
    accountingValue(row,'科目名称'),
    accountingValue(row,'科目类型'),
    accountingValue(row,'金额表达式'),
    accountingValue(row,'主体'),
    accountingValue(row,'来源/去向'),
    accountingValue(row,'源表'),
    accountingValue(row,'源字段'),
    accountingValue(row,'是否正式分录'),
    accountingValue(row,'当前是否覆盖'),
    accountingValue(row,'当前系统事实'),
  ]);
}

function accountingEntryDisplayRows(){
  return accountingEntries.map(row=>{
    const template = accountingTemplateMap[accountingValue(row,'模板编码')] || {};
    return [
      accountingValue(row,'模板编码'),
      accountingValue(template,'业务名称'),
      accountingValue(row,'行号'),
      accountingValue(row,'借贷/控制方向'),
      accountingValue(row,'科目编码'),
      accountingValue(row,'科目名称'),
      accountingValue(row,'科目类型'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'主体'),
      accountingValue(row,'来源/去向'),
      accountingValue(row,'源表'),
      accountingValue(row,'源字段'),
      accountingValue(row,'是否正式分录'),
      accountingValue(row,'当前是否覆盖'),
      accountingValue(row,'当前系统事实'),
    ];
  });
}

function accountingMainOrderNo(templateCode){
  return `MBILL-${templateCode}`;
}

function accountingSubOrderNo(templateCode, lineNo){
  const step = String(lineNo || '0').padStart(3, '0');
  return `${accountingMainOrderNo(templateCode)}-${step}`;
}

function accountingEntryKind(row){
  return isFormalAccountingEntry(row) ? '正式分录' : '控制台账';
}

function accountingEntryAmountLabel(row){
  const amount = accountingValue(row,'金额表达式');
  const friendly = financeFriendlyAmountLabel(amount);
  return friendly && friendly !== amount ? `${friendly}（${amount}）` : amount || '-';
}

function accountingEntrySideAmount(row, side){
  const direction = accountingValue(row,'借贷/控制方向');
  if(side === 'debit') return direction === '借' ? accountingEntryAmountLabel(row) : '-';
  if(side === 'credit') return direction === '贷' ? accountingEntryAmountLabel(row) : '-';
  return !['借','贷'].includes(direction) ? accountingEntryAmountLabel(row) : '-';
}

function accountingLedgerReportRows(){
  return accountingEntries.map(row=>{
    const code = accountingValue(row,'模板编码');
    const template = accountingTemplateMap[code] || {};
    const lineNo = accountingValue(row,'行号');
    return [
      accountingMainOrderNo(code),
      accountingSubOrderNo(code, lineNo),
      lineNo,
      code,
      accountingValue(template,'业务名称'),
      accountingValue(row,'借贷/控制方向'),
      accountingValue(row,'科目编码'),
      accountingValue(row,'科目名称'),
      accountingValue(row,'科目类型'),
      accountingValue(row,'金额表达式'),
      accountingEntryAmountLabel(row),
      accountingEntrySideAmount(row, 'debit'),
      accountingEntrySideAmount(row, 'credit'),
      accountingEntrySideAmount(row, 'control'),
      accountingEntryEffectText(row),
      accountingValue(row,'主体'),
      accountingValue(row,'来源/去向'),
      `${accountingValue(row,'源表')}.${accountingValue(row,'源字段')}`,
      accountingEntryKind(row),
      accountingValue(row,'当前是否覆盖'),
      accountingValue(row,'当前系统事实'),
    ];
  });
}

function accountingMainBillRows(){
  return accountingTemplates.map(template=>{
    const code = accountingValue(template,'模板编码');
    const stats = accountingTemplateStats(code);
    return [
      accountingMainOrderNo(code),
      code,
      accountingValue(template,'业务名称'),
      accountingValue(template,'触发状态'),
      `${stats.entries.length} 条子分录`,
      `${stats.formalCount} 正式`,
      `${stats.controlCount} 控制`,
      `${stats.debitCount} 借 / ${stats.creditCount} 贷`,
      stats.coverage,
      accountingValue(template,'补记建议'),
    ];
  });
}

function accountingBatchRows(){
  return accountingTemplates.map(row=>{
    const code = accountingValue(row,'模板编码');
    const stats = accountingTemplateStats(code);
    return [
      `MBILL-${code}`,
      code,
      accountingValue(row,'业务名称'),
      accountingValue(row,'触发状态'),
      `${stats.formalCount} 行`,
      `${stats.controlCount} 行`,
      `${stats.debitCount} 行`,
      `${stats.creditCount} 行`,
      stats.coverage,
      accountingValue(row,'补记建议'),
    ];
  });
}

function accountingSubjectConfigRows(){
  return accountingSubjects.map(row=>[
    accountingValue(row,'科目编码'),
    accountingValue(row,'科目名称'),
    accountingValue(row,'科目类型'),
    accountingValue(row,'增加方向'),
    accountingValue(row,'减少方向'),
    accountingValue(row,'对应主体'),
    accountingValue(row,'对应系统字段/表'),
    accountingValue(row,'是否进正式分录'),
    accountingValue(row,'备注'),
  ]);
}

function accountingSystemMappingRows(){
  return accountingMappings.map(row=>[
    accountingValue(row,'来源'),
    accountingValue(row,'编码/类型'),
    accountingValue(row,'业务含义'),
    accountingTraceSourceLabel(accountingValue(row,'对应代码/表')),
    accountingValue(row,'财务说明'),
  ]);
}

function accountingTraceSourceLabel(value){
  const text = String(value || '');
  if(!text) return '-';
  if(/Impl|Controller|Service|Constants|BizType|\.[a-zA-Z]/.test(text)) return '源表字段/业务枚举';
  return text;
}

function accountingRiskRows(){
  return accountingRisks.map(row=>[
    accountingValue(row,'风险编号'),
    accountingValue(row,'差异/风险'),
    accountingValue(row,'级别'),
    accountingValue(row,'当前系统事实'),
    accountingValue(row,'补记/治理建议'),
  ]);
}

function accountingCheckRows(){
  return accountingChecks.map(row=>[
    accountingValue(row,'变量'),
    accountingValue(row,'样例值'),
    accountingValue(row,'说明'),
  ]);
}

function accountingTemplateVersionRows(){
  return accountingTemplates.map(row=>[
    accountingValue(row,'模板编码'),
    'v4 2026-06-06',
    accountingValue(row,'业务名称'),
    accountingValue(row,'触发状态'),
    accountingValue(row,'差异状态'),
    accountingValue(row,'覆盖状态'),
    accountingValue(row,'补记建议'),
  ]);
}

function accountingAccountFlowMappingRows(){
  return accountingEntries
    .filter(row=>accountingValue(row,'当前是否覆盖') !== '否' || accountingValue(row,'源表').includes('account'))
    .slice(0, 40)
    .map(row=>[
      accountingValue(row,'模板编码'),
      accountingValue(accountingTemplateMap[accountingValue(row,'模板编码')],'业务名称'),
      accountingValue(row,'主体'),
      accountingValue(row,'科目名称'),
      accountingValue(row,'借贷/控制方向'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'源表'),
      accountingValue(row,'源字段'),
      accountingValue(row,'当前是否覆盖'),
      accountingValue(row,'当前系统事实'),
    ]);
}

function accountingEntryEffectText(row){
  const account = accountingValue(row,'科目名称') || '账户/台账';
  const direction = accountFlowDirectionLabel(accountingValue(row,'借贷/控制方向'));
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

function accountingAccountFlowSummaryRows(){
  return accountingEntries
    .filter(row=>accountingValue(row,'当前是否覆盖') !== '否' || accountingValue(row,'源表').includes('account'))
    .slice(0, 40)
    .map(row=>[
      accountingValue(accountingTemplateMap[accountingValue(row,'模板编码')],'业务名称'),
      accountingValue(row,'主体'),
      accountingValue(row,'科目名称'),
      accountFlowDirectionLabel(accountingValue(row,'借贷/控制方向')),
      financeFriendlyAmountLabel(accountingValue(row,'金额表达式')),
      accountingEntryEffectText(row),
      accountingValue(row,'当前是否覆盖'),
    ]);
}

function accountingSubjectType(subject, accountName=''){
  const text = `${subject} ${accountName}`;
  if(text.includes('总站')) return '总站';
  if(text.includes('支付') || text.includes('官方') || text.includes('三方') || text.includes('场馆')) return '三方支付通道';
  if(text.includes('站点资金池') || text.includes('资金池额度')) return '资金池';
  if(text.includes('站点')) return '站点';
  if(text.includes('代理')) return '代理';
  if(text.includes('会员')) return '会员';
  return '总站';
}

function accountingEntryFlowStatus(row){
  const coverage = accountingValue(row,'当前是否覆盖');
  if(coverage === '是') return '通过';
  if(coverage === '否') return '待复核';
  return coverage || '待复核';
}

function accountFlowBusinessRows(){
  return accountingEntries.map((row,index)=>{
    const code = accountingValue(row,'模板编码');
    const template = accountingTemplateMap[code] || {};
    const subject = accountingValue(row,'主体');
    const accountName = accountingValue(row,'科目名称');
    const type = accountingSubjectType(subject, accountName);
    const lineNo = String(accountingValue(row,'行号')).padStart(2,'0');
    const amount = accountingValue(row,'金额表达式');
    return [
      `AF-${code}-${lineNo}`,
      accountingValue(template,'业务名称'),
      accountingValue(template,'触发模块'),
      `EVT-${code}`,
      type,
      subject,
      accountingValue(row,'科目编码'),
      accountName,
      accountingValue(row,'借贷/控制方向'),
      amount,
      index % 2 ? '按期初快照' : '按源表余额',
      accountingValue(row,'当前系统事实'),
      accountingValue(row,'源表'),
      accountingEntryFlowStatus(row),
    ];
  });
}

function accountFlowRowsWithDate(){
  return accountFlowBusinessRows().map((row,i)=>[
    `2026-06-05 ${String(10 + Math.floor(i / 12)).padStart(2,'0')}:${String((i * 7) % 60).padStart(2,'0')}`,
    ...row,
  ]);
}

function accountFlowToolbar(){
  const businessOptions = accountingTemplates.map(row=>accountingValue(row,'业务名称'));
  return toolbar([
    `<select class="select" id="accountFlowTimeFilter" onchange="filterAccountFlow()"><option>时间筛选</option><option>今日</option><option>昨日</option><option>近7日</option><option>本月</option></select>`,
    `<select class="select" id="accountFlowSubjectFilter" onchange="filterAccountFlow()"><option>主体类型</option>${accountSubjectTypeOptions.map(o=>`<option>${o}</option>`).join('')}</select>`,
    `<select class="select" id="accountFlowBusinessFilter" onchange="filterAccountFlow()"><option>业务类型</option>${businessOptions.map(o=>`<option>${o}</option>`).join('')}</select>`,
    `<select class="select" id="accountFlowStatusFilter" onchange="filterAccountFlow()"><option>流水状态</option><option>通过</option><option>待复核</option><option>部分</option></select>`,
    `<input class="input" id="accountFlowKeyword" placeholder="业务名称 / 主体 / 账户" oninput="filterAccountFlow()" />`
  ],'<button class="btn primary">导出账户流水</button>');
}

function accountFlowDateMatched(dateText, filter){
  const day = dateText.slice(0,10);
  if(filter === '今日') return day === '2026-06-05';
  if(filter === '昨日') return day === '2026-06-04';
  if(filter === '近7日') return day >= '2026-05-30' && day <= '2026-06-05';
  if(filter === '本月') return day.startsWith('2026-06');
  return true;
}

function accountingIncomeCostRows(){
  return accountingEntries
    .filter(row=>['收入','成本'].includes(accountingValue(row,'科目类型')))
    .map(row=>[
      accountingValue(row,'模板编码'),
      accountingValue(accountingTemplateMap[accountingValue(row,'模板编码')],'业务名称'),
      accountingValue(row,'科目编码'),
      accountingValue(row,'科目名称'),
      accountingValue(row,'科目类型'),
      accountingValue(row,'借贷/控制方向'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'主体'),
      accountingValue(row,'是否正式分录'),
      accountingValue(row,'当前是否覆盖'),
    ]);
}

function accountingBalanceRows(){
  const groups = {};
  accountingSubjects.forEach(row=>{
    const type = accountingValue(row,'科目类型') || '未分类';
    if(!groups[type]) groups[type] = [];
    groups[type].push(row);
  });
  return Object.entries(groups).map(([type, rows])=>[
    type,
    `${rows.length} 个科目`,
    rows.map(row=>accountingValue(row,'科目名称')).join(' / '),
    rows.map(row=>accountingValue(row,'对应主体')).filter(Boolean).join(' / '),
    rows.map(row=>accountingValue(row,'对应系统字段/表')).filter(Boolean).join('；'),
  ]);
}

function accountingThirdReconcileRows(){
  return accountingEntries
    .filter(row=>/三方|官方|支付|场馆|通道/.test(`${accountingValue(row,'主体')} ${accountingValue(row,'科目名称')} ${accountingValue(row,'来源/去向')}`))
    .map(row=>[
      accountingValue(row,'模板编码'),
      accountingValue(accountingTemplateMap[accountingValue(row,'模板编码')],'业务名称'),
      accountingValue(row,'科目名称'),
      accountingValue(row,'主体'),
      accountingValue(row,'来源/去向'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'源表'),
      accountingValue(row,'当前是否覆盖'),
    ]);
}

function accountingEntriesByRiskLevel(level){
  return accountingRisks.filter(row=>accountingValue(row,'级别')===level);
}

var accountingEditablePostingRowsState;
function accountingEntryToPostingDetailRow(row){
    const code = accountingValue(row,'模板编码');
    const template = accountingTemplateMap[code] || {};
    const lineNo = accountingValue(row,'行号');
    const direction = accountingValue(row,'借贷/控制方向');
    const amount = accountingValue(row,'金额表达式');
    return [
      code,
      `BATCH-${code}`,
      accountingValue(row,'源表'),
      accountingValue(template,'业务名称'),
      `GRP-${code}`,
      lineNo,
      '流水中心 / 会计分录',
      accountingValue(row,'科目名称'),
      accountingValue(row,'主体'),
      accountingValue(row,'科目类型'),
      `${direction} ${accountingValue(row,'科目名称')}：${accountingValue(row,'来源/去向')}`,
      direction === '借' || isControlAccountingEntry(row) ? amount : '-',
      direction === '贷' ? amount : '-',
      amount,
      accountingValue(row,'当前系统事实'),
      accountingValue(row,'源表').includes('account') ? '是' : '否',
      ['收入','成本'].includes(accountingValue(row,'科目类型')) ? '是' : '否',
      accountingValue(row,'当前是否覆盖') || '待补记',
      isControlAccountingEntry(row) ? '控制类' : '正式分录',
    ];
}
function postingDetailSourceRows(){
  if(!accountingEditablePostingRowsState){
    accountingEditablePostingRowsState = accountingEntries.map(accountingEntryToPostingDetailRow);
    accountingEditablePostingRowsState.forEach(row=>{
      if(typeof normalizePostingStepOptions === 'function') normalizePostingStepOptions(row);
    });
  }
  return accountingEditablePostingRowsState;
}

function entryLedgerDetailRows(){
  return accountingEntryDisplayRows().map(row=>[
    `MBILL-${row[0]}`,
    `${row[0]}-L${String(row[2]).padStart(2,'0')}`,
    `BATCH-${row[0]}`,
    row[0],
    row[2],
    row[1],
    row[9],
    row[10],
    row[5],
    row[8],
    row[6],
    row[3],
    row[7],
    row[14],
    row[13],
  ]);
}

function postingBatchCheckRows(){
  return accountingBatchRows();
}

function billDetailRows(){
  return accountingEntryDisplayRows().map(row=>[
    `BATCH-${row[0]}`,
    `${row[0]}-${String(row[2]).padStart(2,'0')}`,
    row[10],
    row[13],
    '-',
    row[14],
  ]);
}

function billDetailSingleRows(){
  return accountingEntryDisplayRows().map(row=>[
    `MBILL-${row[0]}`,
    `${row[0]}-L${String(row[2]).padStart(2,'0')}`,
    `BATCH-${row[0]}`,
    row[2],
    row[4],
    row[7],
    row[5],
    row[6],
    row[8],
    '-',
    '-',
    row[3],
    row[7],
    row[10],
    row[14],
    row[13] === '是' || row[13] === '部分' ? '已记账' : '待补记',
    row[13],
    '-',
    '2026-06-05 00:00',
    '2026-06-05 00:00',
  ]);
}

function accountBalanceLedgerRows(){
  return accountingAccountFlowMappingRows().slice(0, 12);
}

function financialTemplateMappingRows(){
  return accountingSystemMappingRows();
}

function monthlyTemplateConfigRows(){
  return accountingTemplates
    .filter(row=>accountingValue(row,'业务名称').includes('月结') || accountingValue(row,'模板编码').includes('MONTHLY'))
    .map(row=>[
      accountingValue(row,'模板编码'),
      accountingValue(row,'业务名称'),
      accountingValue(row,'触发模块'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'标准会计处理'),
      accountingValue(row,'覆盖状态'),
      accountingValue(row,'补记建议'),
    ]);
}

function countBy(rows, key){
  return rows.reduce((acc,row)=>{
    const value = accountingValue(row, key, '未分类') || '未分类';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function v4WorkbookSummaryCards(){
  const formal = accountingEntries.filter(isFormalAccountingEntry).length;
  const control = accountingEntries.length - formal;
  return `
    <div class="grid grid-4" style="margin-bottom:16px">
      ${metric('v4 会计模板', `${accountingTemplates.length} 个`, '来自 v4 财务模块开发落地版', '模', 'blue')}
      ${metric('会计分录', `${accountingEntries.length} 条`, `正式 ${formal} / 控制 ${control}`, '录', 'green')}
      ${metric('会计科目', `${accountingSubjects.length} 个`, '资产 / 负债 / 收入 / 成本 / 控制类', '科', 'purple')}
      ${metric('风险与核销', `${accountingRisks.length} 风险`, `${accountingReconciliationRules.length} 条核销关系`, '核', 'orange')}
    </div>
  `;
}

function v4CoverageSummaryRows(){
  const coverage = countBy(accountingTemplates, '覆盖状态');
  const diff = countBy(accountingTemplates, '差异状态');
  return Object.keys({...coverage, ...diff}).sort().map(status=>[
    status,
    `${coverage[status] || 0} 个模板`,
    `${diff[status] || 0} 个差异`,
    status.includes('控制') ? '控制台账独立列示，不进正式借贷' : '按模板分录和风险清单治理'
  ]);
}

function entryGroupHtml(direction, rows){
  if(!rows.length) return '<span class="muted">-</span>';
  return `<div class="entry-group">${rows.map(row=>`
    <div class="entry-group-line">
      <strong>${accountingValue(row,'科目名称')}</strong>
      <span>${accountingValue(row,'金额表达式')} / ${accountingValue(row,'主体')}</span>
      <em>${accountingValue(row,'来源/去向')}</em>
    </div>
  `).join('')}</div>`;
}

function accountingEntryRelationRows(){
  return accountingTemplates.map(template=>{
    const code = accountingValue(template,'模板编码');
    const entries = accountingEntriesByTemplate(code);
    const formal = entries.filter(isFormalAccountingEntry);
    const debits = formal.filter(row=>accountingValue(row,'借贷/控制方向') === '借');
    const credits = formal.filter(row=>accountingValue(row,'借贷/控制方向') === '贷');
    const controls = entries.filter(row=>!isFormalAccountingEntry(row));
    const status = debits.length && credits.length ? '已配对' : (formal.length ? '需复核' : '控制台账');
    return [
      code,
      accountingValue(template,'业务名称'),
      accountingValue(template,'触发状态'),
      entryGroupHtml('借', debits),
      entryGroupHtml('贷', credits),
      entryGroupHtml('控制', controls),
      accountingValue(template,'覆盖状态'),
      status
    ];
  });
}

function accountingThirdReconciliationRuleRows(){
  return accountingReconciliationRuleRows()
    .filter(row=>/三方|支付|提现|手续费|官方|场馆|待付|应收/.test(row.join(' ')));
}

function accountingVoucherRuleRows(){
  return accountingVoucherRules.map(row=>[
    accountingValue(row,'规则ID'),
    accountingValue(row,'关联模板'),
    accountingValue(row,'触发时点'),
    accountingValue(row,'前置校验'),
    accountingValue(row,'生成凭证批次'),
    accountingValue(row,'借方行'),
    accountingValue(row,'贷方行'),
    accountingValue(row,'控制台账行'),
    accountingValue(row,'幂等键'),
    accountingValue(row,'冲正/失败处理'),
    accountingValue(row,'验收'),
  ]);
}

function accountingBusinessMappingRows(){
  return accountingBusinessMappingMatrix.map(row=>[
    accountingValue(row,'映射ID'),
    accountingValue(row,'源表'),
    accountingValue(row,'源类型字段'),
    accountingValue(row,'源类型值'),
    accountingValue(row,'业务事件'),
    accountingValue(row,'模板编码'),
    accountingValue(row,'是否正式凭证'),
    accountingValue(row,'凭证规则'),
    accountingValue(row,'补充表/账本'),
    accountingValue(row,'核销对象'),
    accountingValue(row,'备注'),
  ]);
}

function accountingReconciliationRuleRows(){
  return accountingReconciliationRules.map(row=>[
    accountingValue(row,'核销ID'),
    accountingValue(row,'核销对象'),
    accountingValue(row,'借方/资产端'),
    accountingValue(row,'贷方/负债端'),
    accountingValue(row,'触发核销'),
    accountingValue(row,'核销键'),
    accountingValue(row,'允许部分核销'),
    accountingValue(row,'差异处理'),
    accountingValue(row,'状态'),
    accountingValue(row,'验收标准'),
  ]);
}

function accountingFinanceAcceptanceDisplayRows(){
  return accountingFinanceAcceptanceRows.map(row=>[
    accountingValue(row,'优先级'),
    accountingValue(row,'阶段'),
    accountingValue(row,'开发项'),
    accountingValue(row,'必须完成内容'),
    accountingValue(row,'验收用例'),
    accountingValue(row,'财务验收口径'),
    accountingValue(row,'状态'),
  ]);
}

function accountingFinanceRequirementRows(){
  return accountingFinanceRequirementSummaryRows.map(row=>[
    accountingValue(row,'风险编号'),
    accountingValue(row,'财务补全模块'),
    accountingValue(row,'优先级'),
    accountingValue(row,'必须补的账本/表'),
    accountingValue(row,'触发业务/时点'),
    accountingValue(row,'需要落账的数据'),
    accountingValue(row,'标准借贷/控制口径'),
    accountingValue(row,'验收标准'),
    accountingValue(row,'关联模板'),
  ]);
}

function accountingRiskWithReconcileRows(){
  return accountingRisks.map(risk=>{
    const riskId = accountingValue(risk,'风险编号');
    const matched = accountingReconciliationRules
      .filter(row=>accountingValue(row,'关联风险').includes(riskId))
      .map(row=>`${accountingValue(row,'核销ID')} ${accountingValue(row,'核销对象')}`)
      .join(' / ') || '-';
    return [
      riskId,
      accountingValue(risk,'差异/风险'),
      accountingValue(risk,'级别'),
      accountingValue(risk,'当前系统事实'),
      accountingValue(risk,'补记/治理建议'),
      matched
    ];
  });
}

function accountingTemplateVersionRows(){
  return accountingTemplates.map(row=>[
    accountingValue(row,'模板编码'),
    'v4 2026-06-06',
    accountingValue(row,'业务名称'),
    accountingValue(row,'触发状态'),
    accountingValue(row,'差异状态'),
    accountingValue(row,'覆盖状态'),
    accountingValue(row,'补记建议'),
  ]);
}

function templateVersionListRows(){
  return accountingTemplates.map(row=>{
    const code = accountingValue(row,'模板编码');
    return [
      code,
      'v4 2026-06-06',
      accountingValue(row,'业务名称'),
      accountingValue(row,'金额表达式'),
      accountingValue(row,'差异状态'),
      tag(accountingValue(row,'覆盖状态','待确认')),
      tag('当前生效'),
      accountingTemplateStepLink(code),
      `<button class="btn" onclick="openTemplateStepDetail('${code}')">分录详情</button> <button class="btn primary" onclick="openTemplateVersionSteps('${code}')">编辑分录</button>`
    ];
  });
}
