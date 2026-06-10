function fundValue(row, key, fallback='-'){
  const value = row && row[key];
  return value === undefined || value === null || value === '' ? fallback : value;
}

function fundCountBy(rows, key){
  return rows.reduce((acc,row)=>{
    const value = fundValue(row,key,'未分类');
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function fundStatusTag(text){
  const value = fundValue({v:text}, 'v', text);
  if(value.includes('当前落表') || value === '是') return tag('已入账');
  if(value.includes('部分') || value === '部分') return tag('待复核');
  if(value.includes('未实现') || value.includes('待补') || value === '否') return tag('待审批');
  if(value.includes('控制')) return tag('灰度');
  return tag(value);
}

function fundPriorityTag(text){
  if(text === 'P0') return tag('异常');
  if(text === 'P1') return tag('待对账');
  return tag(text || '关注');
}

function fundIsCovered(row){
  return fundValue(row,'是否实际落表','否') === '是';
}

function fundNeedsPosting(row){
  return !fundIsCovered(row);
}

function fundImpactSummary(){
  const coverage = fundCountBy(fundImpactActions, '覆盖程度');
  const detailStatus = fundCountBy(fundImpactDetails, '是否实际落表');
  const priorities = fundCountBy(fundGapItems, '优先级');
  return {
    actions: fundImpactActions.length,
    details: fundImpactDetails.length,
    modules: fundModuleDictionary.length,
    gaps: fundGapItems.length,
    p0: priorities.P0 || 0,
    p1: priorities.P1 || 0,
    coveredActions: coverage['当前落表'] || 0,
    partialActions: coverage['部分覆盖'] || 0,
    missingDetails: (detailStatus['否'] || 0) + (detailStatus['部分'] || 0)
  };
}

function fundImpactCards(){
  const summary = fundImpactSummary();
  return `
    <div class="grid grid-4" style="margin-bottom:16px">
      ${metric('账变动作矩阵',`${summary.actions} 个`,`当前落表 ${summary.coveredActions} / 部分 ${summary.partialActions}`,'动','blue')}
      ${metric('资金影响明细',`${summary.details} 条`,`待补/部分 ${summary.missingDetails}`,'账','orange')}
      ${metric('资金模块字典',`${summary.modules} 个`,'正式资金 / 控制台账区分','模','green')}
      ${metric('缺口待确认',`${summary.gaps} 项`,`P0 ${summary.p0} / P1 ${summary.p1}`,'缺','red')}
    </div>
  `;
}

function fundActionMatrixRows(limit){
  return fundImpactActions.slice(0, limit || fundImpactActions.length).map(row=>[
    fundValue(row,'类别'),
    fundValue(row,'模块'),
    fundValue(row,'账变动作'),
    fundValue(row,'交易类型/状态'),
    fundValue(row,'触发点/方法'),
    fundValue(row,'实际落表影响摘要'),
    fundValue(row,'应关注但未完整落表'),
    fundStatusTag(fundValue(row,'覆盖程度')),
    fundValue(row,'源码依据')
  ]);
}

function fundImpactDetailRows(rows=fundImpactDetails){
  return rows.map(row=>[
    fundValue(row,'动作编号'),
    fundValue(row,'账变动作'),
    fundValue(row,'主体'),
    fundValue(row,'资金模块'),
    fundValue(row,'表/字段'),
    fundValue(row,'方向'),
    financeFriendlyAmountLabel(fundValue(row,'金额口径')),
    fundStatusTag(fundValue(row,'是否实际落表')),
    fundStatusTag(fundValue(row,'覆盖程度')),
    fundValue(row,'备注')
  ]);
}

function fundGapRows(){
  return fundGapItems.map(row=>[
    fundValue(row,'编号'),
    fundValue(row,'缺口/待确认'),
    fundValue(row,'影响动作'),
    fundValue(row,'当前代码事实'),
    fundValue(row,'风险'),
    fundValue(row,'建议'),
    fundPriorityTag(fundValue(row,'优先级')),
    fundValue(row,'源码依据')
  ]);
}

function fundModuleDictionaryRows(){
  return fundModuleDictionary.map(row=>[
    fundValue(row,'主体分类'),
    fundValue(row,'资金模块'),
    fundValue(row,'当前表/字段'),
    fundValue(row,'资金性质'),
    fundValue(row,'增加含义'),
    fundValue(row,'减少含义'),
    fundStatusTag(fundValue(row,'是否正式资金')),
    fundValue(row,'关键说明')
  ]);
}

function fundRowsByKeyword(rows, keywords){
  return rows.filter(row=>{
    const text = Object.values(row).join(' ');
    return keywords.some(keyword=>text.includes(keyword));
  });
}

function fundSupplementDetails(){
  return fundImpactDetails.filter(fundNeedsPosting);
}

function fundSupplementLedgerRows(limit){
  return fundSupplementDetails().slice(0, limit || fundSupplementDetails().length).map((row,index)=>{
    const actionNo = fundValue(row,'动作编号');
    const subNo = `${actionNo}-SUP-${String(index + 1).padStart(3,'0')}`;
    return [
      `FM-${actionNo}`,
      subNo,
      actionNo,
      fundValue(row,'账变动作'),
      fundValue(row,'主体'),
      fundValue(row,'资金模块'),
      fundValue(row,'表/字段'),
      fundValue(row,'方向'),
      financeFriendlyAmountLabel(fundValue(row,'金额口径')),
      fundValue(row,'是否实际落表') === '部分' ? '部分覆盖补记' : '待补账',
      fundStatusTag(fundValue(row,'覆盖程度')),
      fundStatusTag(fundValue(row,'是否实际落表')),
      fundValue(row,'备注')
    ];
  });
}

function fundSupplementBatchRows(){
  const grouped = fundSupplementDetails().reduce((acc,row)=>{
    const key = `${fundValue(row,'动作编号')}|${fundValue(row,'账变动作')}`;
    if(!acc[key]) acc[key] = {rows:[], modules:new Set(), covered:0, partial:0, missing:0};
    acc[key].rows.push(row);
    acc[key].modules.add(fundValue(row,'资金模块'));
    if(fundValue(row,'是否实际落表') === '部分') acc[key].partial += 1;
    else acc[key].missing += 1;
    return acc;
  }, {});
  return Object.entries(grouped).map(([key,value])=>{
    const [actionNo, actionName] = key.split('|');
    return [
      `SUP-BATCH-${actionNo}`,
      actionNo,
      actionName,
      `${value.rows.length} 条`,
      Array.from(value.modules).slice(0,4).join(' / '),
      `${value.missing} 待补 / ${value.partial} 部分`,
      '生成补记模板 + 回填正式账本',
      tag('待审批')
    ];
  });
}

function fundAccountFlowRows(limit){
  return fundImpactDetails.slice(0, limit || fundImpactDetails.length).map(row=>[
    fundValue(row,'动作编号'),
    fundValue(row,'账变动作'),
    fundValue(row,'主体'),
    fundValue(row,'资金模块'),
    fundValue(row,'方向'),
    financeFriendlyAmountLabel(fundValue(row,'金额口径')),
    fundValue(row,'表/字段'),
    fundStatusTag(fundValue(row,'是否实际落表')),
    fundStatusTag(fundValue(row,'覆盖程度'))
  ]);
}

function fundThirdReconcileRows(){
  const keywords = ['三方','官方','手续费','提现待付','通道','场馆费','收款','出款'];
  return fundRowsByKeyword(fundGapItems, keywords).map(row=>[
    fundValue(row,'编号'),
    fundValue(row,'缺口/待确认'),
    fundValue(row,'影响动作'),
    fundValue(row,'当前代码事实'),
    fundValue(row,'建议'),
    fundPriorityTag(fundValue(row,'优先级'))
  ]);
}

function fundBalanceReportRows(){
  return fundModuleDictionary.map(row=>[
    fundValue(row,'主体分类'),
    fundValue(row,'资金模块'),
    fundValue(row,'资金性质'),
    fundValue(row,'当前表/字段'),
    fundStatusTag(fundValue(row,'是否正式资金')),
    fundValue(row,'关键说明')
  ]);
}

function fundIncomeCostRows(){
  const keywords = ['成本','费用','收入','手续费','佣金','分润','奖励','红包','场馆费','返水'];
  return fundRowsByKeyword(fundImpactDetails, keywords).map(row=>[
    fundValue(row,'动作编号'),
    fundValue(row,'账变动作'),
    fundValue(row,'主体'),
    fundValue(row,'资金模块'),
    fundValue(row,'方向'),
    financeFriendlyAmountLabel(fundValue(row,'金额口径')),
    fundStatusTag(fundValue(row,'是否实际落表')),
    fundValue(row,'备注')
  ]);
}

function fundPageCompletionNote(pageKey){
  const map = {
    dashboard:'已接入账变动作矩阵总览：动作、资金影响、资金模块、缺口优先级作为全局补齐口径。',
    'template-version':'新增账变动作覆盖矩阵、资金影响明细、资金模块字典、缺口清单，模板页可按动作追踪补记建议。',
    'entry-detail':'新增资金影响补记明细，未实际落表或部分覆盖的资金影响以待补账子分录展示。',
    'book-batch':'新增补记批次建议，按动作编号聚合待补账本，避免把流程节点当会计分录。',
    'account-flow':'新增资金模块字典和动作资金影响流水视图，区分真实资金、余额、负债与控制台账。',
    'internal-reconcile':'新增 15 项缺口清单与 P0/P1/P2 治理优先级，作为内部对账补记来源。',
    'third-reconcile':'新增官方账户、三方通道、手续费、提现待付、场馆费等外部资金缺口。',
    'balance-report':'新增资金模块字典报表，明确 fund_pool_balance 是控制额度，不重复计入现金资产。',
    'income-cost-report':'新增成本、费用、收入、佣金、奖励、场馆费等资金影响汇总，区分已落表与待补账。',
    'signature-check':'新增缺口治理审计视角，重点关注绕过正式账本的人工改库和来源缺失。',
    'operation-log':'新增补记治理日志视角，缺口处理必须留痕到动作编号和资金模块。',
    'subject-config':'新增资金模块字典，帮助科目与系统字段建立财务映射。',
    'account-list':'新增资金模块分类口径，账户列表与资金模块字典保持一致。',
    'account-detail':'新增资金影响补记口径，单账户可解释哪些余额来自已落表或待补账。'
  };
  return map[pageKey] || '已按账变动作资金影响矩阵补充页面口径。';
}

function fundCompletionBox(pageKey){
  return `<div class="completion-note"><strong>本次补全说明</strong><span>${fundPageCompletionNote(pageKey)}</span></div>`;
}

function renderFundImpactTemplateTab(){
  return `
    ${fundImpactCards()}
    ${fundCompletionBox('template-version')}
    <div class="card" style="margin-top:16px">
      <h3>账变动作覆盖矩阵</h3>
      ${renderTable(['类别','模块','账变动作','交易类型/状态','触发点/方法','实际落表影响摘要','应关注但未完整落表','覆盖程度','源码依据'], fundActionMatrixRows(), "<button class=\"btn\" onclick=\"showToast('已定位资金影响明细')\">明细</button>")}
    </div>
    <div class="card" style="margin-top:16px">
      <h3>资金影响明细</h3>
      ${renderTable(['动作编号','账变动作','主体','资金模块','表/字段','方向','金额口径','是否实际落表','覆盖程度','备注'], fundImpactDetailRows(), "<button class=\"btn\" onclick=\"go('entry-detail')\">分录</button>")}
    </div>
    <div class="card" style="margin-top:16px">
      <h3>缺口与待确认</h3>
      ${renderTable(['编号','缺口/待确认','影响动作','当前代码事实','风险','建议','优先级','源码依据'], fundGapRows(), "<button class=\"btn\" onclick=\"go('internal-reconcile')\">治理</button>")}
    </div>
  `;
}
