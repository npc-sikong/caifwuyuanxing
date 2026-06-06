function buildMenu(){
  const menu = document.getElementById('menu');
  menu.innerHTML = menuConfig.map(g=>`
    <div class="menu-group">
      <div class="group-title"><span class="dot"></span><span>${g.icon} ${g.group}</span></div>
      ${g.items.map(([key,label])=>`<button class="menu-item" data-key="${key}" onclick="go('${key}')"><span>${label}</span><span class="mini">›</span></button>`).join('')}
    </div>`).join('');
}
function findPath(key){
  for(const g of menuConfig){
    const found = g.items.find(i=>i[0]===key);
    if(found) return [g.group, found[1]];
  }
  return ['财务总览','资金看板'];
}
function normalizePageKey(key){
  return key === 'template-manage' ? 'template-version' : key;
}
function go(key){
  key = normalizePageKey(key);
  if(!pages[key]) key='dashboard';
  document.querySelectorAll('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.key===key));
  const [group,label] = findPath(key);
  document.getElementById('breadcrumb').innerText = `${group} / ${label}`;
  document.getElementById('pageTitle').innerText = label;
  document.getElementById('main').innerHTML = pages[key]();
  location.hash = key;
}
function filterAccountList(category){
  const table = document.getElementById('accountListTable');
  if(table) table.innerHTML = renderAccountListTable(category);
  const accountFilter = document.getElementById('accountFilterSelect');
  if(accountFilter) accountFilter.value = category;
  document.querySelectorAll('#accountTypeFilters .summary-card').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.accountType===category);
  });
}
function filterCashFlow(){
  const dateFilter = document.getElementById('cashFlowDateFilter')?.value || '今日';
  const summary = document.getElementById('cashFlowSubjectSummary');
  if(summary) summary.innerHTML = cashFlowSubjectSummary(dateFilter);
  const table = document.getElementById('cashFlowTable');
  if(table) table.innerHTML = renderCashFlowTable(cashFlowFilteredRows());
}
function filterAccountFlow(){
  const time = document.getElementById('accountFlowTimeFilter')?.value || '时间筛选';
  const subject = document.getElementById('accountFlowSubjectFilter')?.value || '主体类型';
  const business = document.getElementById('accountFlowBusinessFilter')?.value || '业务类型';
  const status = document.getElementById('accountFlowStatusFilter')?.value || '流水状态';
  const keyword = (document.getElementById('accountFlowKeyword')?.value || '').trim().toLowerCase();
  const rows = accountFlowRowsWithDate().filter(row=>{
    const [dateText,,businessType, triggerModule, eventNo, subjectType, subject,, accountName, direction,, balanceEffect, systemFact,, statusText] = row;
    const matchedTime = time === '时间筛选' || accountFlowDateMatched(dateText, time);
    const matchedSubject = subject === '主体类型' || subjectType === subject;
    const matchedBusiness = business === '业务类型' || businessType === business;
    const matchedStatus = status === '流水状态' || statusText === status;
    const matchedKeyword = !keyword || `${businessType} ${triggerModule} ${eventNo} ${subject} ${accountName} ${direction} ${balanceEffect} ${systemFact}`.toLowerCase().includes(keyword);
    return matchedTime && matchedSubject && matchedBusiness && matchedStatus && matchedKeyword;
  });
  const table = document.getElementById('accountFlowTable');
  if(table) table.innerHTML = renderAccountFlowTable(rows);
}
const templateVersionTabs = [
  ['list','模板列表'],
  ['steps','分录详情编辑台'],
  ['subjects','会计科目表'],
  ['mapping','系统账变映射'],
  ['voucher','凭证/业务映射'],
  ['reconcile','核销/验收口径']
];
let templateVersionActiveTab = 'list';
function renderTemplateVersionTabs(active=templateVersionActiveTab){
  return `
    <div class="template-tabs" role="tablist">
      ${templateVersionTabs.map(([key,label])=>`
        <button class="template-tab ${key===active?'active':''}" data-template-tab="${key}" onclick="switchTemplateVersionTab('${key}')">
          ${label}
        </button>
      `).join('')}
    </div>
  `;
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
function renderTemplateVersionListTab(){
  return `
    ${v4WorkbookSummaryCards()}
    <div class="card">
      ${toolbar([select('模板',templateCodes()),select('覆盖状态',['已覆盖','部分覆盖','未实现','需补记','历史兼容','控制台账']),input('模板编码 / 业务名称')],'<button class="btn primary">导出模板版本</button>')}
      ${renderTable(['模板编码','数据版本','业务名称','金额表达式','差异状态','覆盖状态','生效状态','分录行数','操作'], templateVersionListRows())}
    </div>
    <div class="card" style="margin-top:16px">
      <h3>v4 覆盖状态汇总</h3>
      ${renderTable(['状态','模板数量','差异数量','财务处理口径'], v4CoverageSummaryRows())}
    </div>
  `;
}
function renderTemplateVersionStepTab(templateCode){
  const code = templateCode || document.getElementById('templateWorkbenchSelect')?.value || templateCodes()[0];
  return `
    <div class="card" id="templateStepWorkbench">
      ${renderTemplateStepWorkbench(code)}
    </div>
  `;
}
function renderTemplateVersionSubjectTab(){
  return `
    <div class="card">
      <h3>会计科目表</h3>
      <div class="ok-box" style="margin-bottom:14px">科目表是模板分录的底层规则：资产/成本通常借方增加，负债/收入通常贷方增加；控制类科目只做额度或台账复核，不进入正式借贷平衡。</div>
      ${renderTable(['科目编码','科目名称','科目类型','增加方向','减少方向','对应主体','对应系统字段/表','是否进正式分录','备注'], accountingSubjectConfigRows(), '<button class="btn" onclick="go(\'subject-config\')">科目配置</button>')}
    </div>
  `;
}
function renderTemplateVersionMappingTab(){
  return `
    <div class="card">
      <h3>系统账变映射</h3>
      <div class="ok-box" style="margin-bottom:14px">系统账变映射用于说明业务账变来源、业务含义和会计模板关系。这里弱化真实代码实现，只保留财务追溯需要的来源字段和口径说明。</div>
      ${renderTable(['来源','编码/类型','业务含义','财务追溯来源','财务说明'], accountingSystemMappingRows(), '<button class="btn" onclick="showToast(\'已加载 v4 系统账变映射\')">查看映射</button>')}
    </div>
  `;
}
function renderTemplateVersionVoucherTab(){
  return `
    <div class="card">
      <h3>凭证生成规则</h3>
      <div class="ok-box" style="margin-bottom:14px">v4 将记账批次升级为凭证规则口径：每条规则定义触发时点、借方行、贷方行、控制台账、幂等键和失败/冲正处理。</div>
      ${renderTable(['规则ID','关联模板','触发时点','前置校验','生成凭证批次','借方行','贷方行','控制台账行','幂等键','冲正/失败处理','验收'], accountingVoucherRuleRows())}
    </div>
    <div class="card" style="margin-top:16px">
      <h3>业务映射矩阵</h3>
      ${renderTable(['映射ID','源表','源类型字段','源类型值','业务事件','模板编码','是否正式凭证','凭证规则','补充表/账本','核销对象','备注'], accountingBusinessMappingRows())}
    </div>
  `;
}
function renderTemplateVersionReconcileTab(){
  return `
    <div class="card">
      <h3>核销关系设计</h3>
      <div class="ok-box" style="margin-bottom:14px">核销关系用于财务验收：应收、待付、手续费、官方账户、资金池额度、红包待领、站点月结和场馆费用必须能对到对应业务事件。</div>
      ${renderTable(['核销ID','核销对象','借方/资产端','贷方/负债端','触发核销','核销键','允许部分核销','差异处理','状态','验收标准'], accountingReconciliationRuleRows())}
    </div>
    <div class="card" style="margin-top:16px">
      <h3>财务验收口径</h3>
      ${renderTable(['优先级','阶段','开发项','必须完成内容','验收用例','财务验收口径','状态'], accountingFinanceAcceptanceDisplayRows())}
    </div>
  `;
}
function renderTemplateVersionTabContent(tab=templateVersionActiveTab){
  if(tab === 'steps') return renderTemplateVersionStepTab();
  if(tab === 'subjects') return renderTemplateVersionSubjectTab();
  if(tab === 'mapping') return renderTemplateVersionMappingTab();
  if(tab === 'voucher') return renderTemplateVersionVoucherTab();
  if(tab === 'reconcile') return renderTemplateVersionReconcileTab();
  return renderTemplateVersionListTab();
}
function switchTemplateVersionTab(tab){
  if(!templateVersionTabs.some(([key])=>key===tab)) tab = 'list';
  templateVersionActiveTab = tab;
  document.querySelectorAll('[data-template-tab]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.templateTab === tab);
  });
  const content = document.getElementById('templateVersionTabContent');
  if(content) content.innerHTML = renderTemplateVersionTabContent(tab);
}
function openTemplateVersionSteps(templateCode){
  switchTemplateVersionTab('steps');
  switchTemplateStepWorkbench(templateCode);
}
function refreshTemplateManage(){
  const key = currentPageKey ? normalizePageKey(currentPageKey()) : '';
  if(key==='template-version'){
    document.getElementById('main').innerHTML = pages['template-version']();
  }
}
function renderEditableTemplateStepTable(templateCode){
  const rows = postingDetailSourceRows()
    .filter(row=>row[0]===templateCode)
    .sort((a,b)=>(Number(a[5]) || 0) - (Number(b[5]) || 0));
  if(!rows.length) return `<div class="risk-box">该模板暂无可编辑分录步骤，进入编辑弹窗后可从空白步骤开始配置。</div>`;
  return renderTable(
    ['步骤','分录性质','借贷/控制方向','影响模块','科目/账本','主体/对象','科目类型','金额公式','余额影响','更新流水','进报表','覆盖状态','操作'],
    rows.map(row=>[
      row[5],
      row[18],
      postingStepDirection(row),
      row[6],
      row[7],
      normalizeObjectOption(row[8]),
      row[9],
      row[13],
      row[14],
      row[15],
      row[16],
      row[17],
      `<button class="btn" onclick="openTemplateStepEditor('${templateCode}','${row[5]}')">编辑</button>`
    ])
  );
}
function renderTemplateStepWorkbench(templateCode){
  const template = accountingTemplateMap[templateCode] || {};
  const stats = templateStepStats(templateCode);
  const debit = formatAmount(stats.debit || 0);
  const credit = formatAmount(stats.credit || 0);
  return `
    <div class="workbench-head">
      <div>
        <h3>分录详情编辑台</h3>
        <p>按 v4 分录口径查看借方、贷方和控制台账；新增、减少步骤必须打开编辑弹窗后操作，保存后直接生效。</p>
      </div>
      <div class="workbench-actions">
        <select class="select" id="templateWorkbenchSelect" onchange="switchTemplateStepWorkbench(this.value)">
          ${selectOptions(templateCodes(), templateCode)}
        </select>
        <button class="btn primary" onclick="openTemplateStepEditor('${templateCode}','1')">编辑分录</button>
      </div>
    </div>
    <div class="workbench-stats">
      <div><span>当前模板</span><strong>${templateCode}</strong><em>${accountingValue(template,'业务名称','自定义模板')}</em></div>
      <div><span>分录步骤</span><strong>${stats.stepCount} 步</strong><em>${stats.ledgerCount} 个科目/账本</em></div>
      <div><span>借贷合计</span><strong>借 ${debit}</strong><em>贷 ${credit}</em></div>
      <div><span>平衡状态</span><strong>${tag(stats.status)}</strong><em>${accountingValue(template,'覆盖状态','待确认')}</em></div>
    </div>
    ${renderEditableTemplateStepTable(templateCode)}
  `;
}
function optionValuesFromRows(index, fallback=[]){
  return uniqueOptions([...fallback, ...postingDetailSourceRows().map(row=>row[index])]);
}
function sourceTableOptions(){
  const fromEntries = typeof accountingEntries !== 'undefined' ? accountingEntries.map(row=>accountingValue(row,'源表')) : [];
  return uniqueOptions(['member_account','fund_pool','member_account_record','member_recharge_record','member_withdraw_record','commission','prepaid_account','bet_records/game_record', ...fromEntries]);
}
function postingGroupOptions(){
  return optionValuesFromRows(4, ['GRP-CUSTOM','GRP-RECHARGE-001','GRP-WITHDRAW-001','GRP-MONTHLY-001']);
}
function entryKindOptions(){
  return ['正式分录','控制类','资金池汇总','平衡','待处理'];
}
function subjectTypeOptions(){
  const fromSubjects = typeof accountingSubjects !== 'undefined' ? accountingSubjects.map(row=>accountingValue(row,'科目类型')) : [];
  return uniqueOptions(['资产','负债','成本','收入','控制类','汇总', ...fromSubjects]);
}
function postingDirectionOptions(){
  return ['借','贷','增加','减少','冻结','解冻','控制'];
}
function postingStepDirection(row){
  const behavior = String(row[10] || '');
  const fromBehavior = postingDirectionOptions().find(direction=>behavior.startsWith(`${direction} `));
  if(fromBehavior) return fromBehavior;
  if(row[12] !== '-') return '贷';
  if(row[11] !== '-') return '借';
  return '控制';
}
function amountFormulaOptions(){
  const fromTemplates = typeof accountingTemplates !== 'undefined' ? accountingTemplates.map(row=>accountingValue(row,'金额表达式')) : [];
  const fromEntries = typeof accountingEntries !== 'undefined' ? accountingEntries.map(row=>accountingValue(row,'金额表达式')) : [];
  return uniqueOptions(['G','F','A','W','bonus','mainShare','siteShare','agentShare','monthlyAmount','feeAmount','netProfit','commissionAmount','custom_amount', ...fromTemplates, ...fromEntries]);
}
function balanceEffectOptions(){
  return optionValuesFromRows(14, ['会员余额增加','会员余额减少','代理余额增加','代理余额减少','站点余额增加','站点余额减少','资金池现金增加','资金池现金减少','控制额度增加','控制额度减少','进入收入成本报表','不更新余额']);
}
function behaviorOptions(){
  return optionValuesFromRows(10, ['借 资产账户：资金流入','贷 负债账户：余额增加','借 负债账户：余额减少','贷 资产账户：资金流出','确认成本','确认收入','控制类额度增加','控制类额度减少']);
}
function applyStepDirection(row, direction, formula){
  row[13] = formula || row[13];
  if(direction === '贷'){
    row[11] = '-';
    row[12] = row[13];
    return;
  }
  row[11] = row[13];
  row[12] = '-';
}
function switchTemplateStepWorkbench(templateCode){
  const panel = document.getElementById('templateStepWorkbench');
  if(panel) panel.innerHTML = renderTemplateStepWorkbench(templateCode);
}
function nextTemplateStepNo(templateCode){
  const rows = postingDetailSourceRows().filter(row=>row[0]===templateCode);
  const max = rows.reduce((n,row)=>Math.max(n, Number(row[5]) || 0), 0);
  return String(max + 1);
}
function addTemplateStep(templateCode){
  const rows = postingDetailSourceRows();
  const sample = rows.find(row=>row[0]===templateCode) || ['CUSTOM_TEMPLATE','BATCH-CUSTOM','SOURCE-CUSTOM','自定义业务','GRP-CUSTOM','0','账户中心 / 账户流水','自定义账本','自定义对象','资产','配置新步骤','0.00','-','自定义金额公式','待配置','是','否','待更新','待处理'];
  const nextNo = nextTemplateStepNo(templateCode);
  const newRow = [...sample];
  newRow[0] = templateCode;
  newRow[5] = nextNo;
  newRow[6] = '流水中心 / 账户流水';
  newRow[7] = '待配置账本/账户';
  newRow[8] = '待配置对象';
  newRow[9] = '资产';
  newRow[10] = '新增记账步骤';
  newRow[11] = '待配置金额公式';
  newRow[12] = '-';
  newRow[13] = '待配置金额公式';
  newRow[14] = '待配置余额影响';
  newRow[15] = '是';
  newRow[16] = '否';
  newRow[17] = '待更新';
  newRow[18] = '正式分录';
  rows.push(newRow);
  refreshTemplateManage();
  showToast(`已新增 ${templateCode} 第 ${nextNo} 步，保存后立即生效`);
  openTemplateStepEditor(templateCode, nextNo);
}
function deleteLastTemplateStep(templateCode){
  const rows = postingDetailSourceRows().filter(row=>row[0]===templateCode);
  if(!rows.length){
    showToast('该模板暂无可减少的分录步骤');
    return;
  }
  const last = rows.sort((a,b)=>(Number(b[5]) || 0) - (Number(a[5]) || 0))[0];
  deleteTemplateStep(templateCode, last[5]);
}
function deleteTemplateStep(templateCode, stepNo){
  const rows = postingDetailSourceRows();
  const same = rows.filter(row=>row[0]===templateCode);
  if(same.length <= 1){
    showToast('至少保留一个记账步骤');
    return;
  }
  const index = rows.findIndex(row=>row[0]===templateCode && row[5]===String(stepNo));
  if(index >= 0) rows.splice(index, 1);
  refreshTemplateManage();
  closeDrawer();
  showToast(`已删除 ${templateCode} 第 ${stepNo} 步，当前模板已立即生效`);
}
function saveTemplateStep(templateCode, stepNo){
  const row = postingDetailSourceRows().find(item=>item[0]===templateCode && item[5]===String(stepNo));
  if(!row){
    showToast('未找到要保存的步骤');
    return;
  }
  row[2] = closedSelectValue('stepSource', sourceTableOptions(), row[2]);
  row[4] = closedSelectValue('stepGroup', postingGroupOptions(), row[4]);
  row[6] = closedSelectValue('stepModule', moduleOptions(), row[6]);
  row[7] = closedSelectValue('stepLedger', ledgerOptions(), row[7]);
  row[8] = closedSelectValue('stepObject', objectOptions(), normalizeObjectOption(row[8]));
  row[9] = closedSelectValue('stepSubjectType', subjectTypeOptions(), row[9]);
  row[10] = closedSelectValue('stepBehavior', behaviorOptions(), row[10]);
  const direction = closedSelectValue('stepDirection', postingDirectionOptions(), postingStepDirection(row));
  const formula = closedSelectValue('stepFormula', amountFormulaOptions(), row[13]);
  applyStepDirection(row, direction, formula);
  row[14] = closedSelectValue('stepEffect', balanceEffectOptions(), row[14]);
  row[15] = document.getElementById('stepUpdateFlow')?.value || row[15];
  row[16] = document.getElementById('stepReport')?.value || row[16];
  row[17] = document.getElementById('stepUpdateStatus')?.value || row[17];
  row[18] = closedSelectValue('stepEntryKind', entryKindOptions(), row[18]);
  refreshTemplateManage();
  showToast('已保存分录步骤，当前模板规则已立即生效');
  openTemplateStepEditor(templateCode, stepNo);
}
function openTemplateStepDetail(templateCode){
  const template = accountingTemplateMap[templateCode] || {};
  const stats = accountingTemplateStats(templateCode);
  const detailTable = stats.entries.length ? renderTable(
    ['行号','借贷/控制方向','科目编码','科目名称','科目类型','金额表达式','主体','来源/去向','源表','源字段','是否正式分录','当前是否覆盖','当前系统事实'],
    accountingEntriesByTemplate(templateCode).map(row=>[
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
      accountingValue(row,'当前系统事实')
    ])
  ) : `<div class="risk-box">v4 中未找到该模板的会计分录明细。</div>`;
  document.getElementById('drawerTitle').innerText = `记账步骤详情：${templateCode}`;
  document.getElementById('drawerBody').innerHTML = `
    <div class="card" style="box-shadow:none">
      <h3>模板信息</h3>
      <div class="kv">
        <div>模板编码</div><div>${accountingValue(template,'模板编码',templateCode)}</div>
        <div>业务名称</div><div>${accountingValue(template,'业务名称','-')}</div>
        <div>触发模块</div><div>${accountingValue(template,'触发模块','-')}</div>
        <div>触发状态</div><div>${accountingValue(template,'触发状态','-')}</div>
        <div>金额表达式</div><div>${accountingValue(template,'金额表达式','-')}</div>
        <div>正式分录</div><div>${stats.formalCount} 行</div>
        <div>控制类</div><div>${stats.controlCount} 行</div>
        <div>覆盖状态</div><div>${tag(stats.coverage)}</div>
      </div>
      <div style="margin-top:14px"><button class="btn primary" onclick="openTemplateStepEditor('${templateCode}','1')">编辑分录步骤</button></div>
    </div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none">
      <h3>财务可编辑分录步骤</h3>
      ${renderEditableTemplateStepTable(templateCode)}
    </div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none">
      <h3>v4 会计分录明细</h3>
      ${detailTable}
      <div style="margin-top:14px"><button class="btn" onclick="closeDrawer()">关闭</button></div>
    </div>
  `;
  document.getElementById('drawer').classList.add('expanded');
  document.getElementById('drawerMask').classList.add('open');
  document.getElementById('drawer').classList.add('open');
}
function openTemplateStepEditor(templateCode, stepNo='1'){
  const rows = postingDetailSourceRows().filter(row=>row[0]===templateCode);
  const current = rows.find(row=>row[5]===String(stepNo)) || rows[0];
  rows.forEach(normalizePostingStepOptions);
  document.getElementById('drawerTitle').innerText = `编辑记账明细：${templateCode}`;
  document.getElementById('drawerBody').innerHTML = current ? `
    <div class="card" style="box-shadow:none">
	      ${renderTable(['步骤','影响模块','账本/账户','对象','科目类型','借贷/控制方向','金额公式','余额影响','更新账户流水','进入报表','操作'], rows.map(row=>[row[5],row[6],row[7],normalizeObjectOption(row[8]),row[9],postingStepDirection(row),row[13],row[14],row[15],row[16],`<button class="btn" onclick="openTemplateStepEditor('${templateCode}','${row[5]}')">选择</button>`]))}
    </div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none">
      <div class="editor-title-row">
        <h3>编辑步骤 ${current[5]}</h3>
        <select class="select inline-step-picker" id="templateStepPicker" onchange="openTemplateStepEditor('${templateCode}', this.value)">
          ${rows.map(row=>`<option value="${row[5]}" ${row[5]===current[5]?'selected':''}>第 ${row[5]} 步</option>`).join('')}
        </select>
        <button class="btn primary" onclick="addTemplateStep('${templateCode}')">新增步骤</button>
      </div>
      <div class="form-grid">
        <div class="field"><label>分录步骤号</label><div class="readonly-value">${current[5]}</div></div>
	        <div class="field"><label>分录性质</label><select id="stepEntryKind">${selectOptions(entryKindOptions(), current[18])}</select></div>
	        <div class="field"><label>来源/源表</label><select id="stepSource">${selectOptions(sourceTableOptions(), current[2])}</select></div>
	        <div class="field"><label>分录组</label><select id="stepGroup">${selectOptions(postingGroupOptions(), current[4])}</select></div>
	        <div class="field"><label>影响模块</label><select id="stepModule">${selectOptions(moduleOptions(), current[6])}</select></div>
	        <div class="field"><label>账本/账户</label><select id="stepLedger">${selectOptions(ledgerOptions(), current[7])}</select></div>
	        <div class="field"><label>对象</label><select id="stepObject">${selectOptions(objectOptions(), normalizeObjectOption(current[8]))}</select></div>
	        <div class="field"><label>科目类型</label><select id="stepSubjectType">${selectOptions(subjectTypeOptions(), current[9])}</select></div>
	        <div class="field"><label>借贷/控制方向</label><select id="stepDirection">${selectOptions(postingDirectionOptions(), postingStepDirection(current))}</select></div>
	        <div class="field"><label>金额公式</label><select id="stepFormula">${selectOptions(amountFormulaOptions(), current[13])}</select></div>
	        <div class="field span-2"><label>具体行为</label><select id="stepBehavior">${selectOptions(behaviorOptions(), current[10])}</select></div>
	        <div class="field"><label>余额影响</label><select id="stepEffect">${selectOptions(balanceEffectOptions(), current[14])}</select></div>
	        <div class="field"><label>更新账户流水</label><select id="stepUpdateFlow"><option>${current[15]}</option><option>是</option><option>否</option></select></div>
        <div class="field"><label>进入报表</label><select id="stepReport"><option>${current[16]}</option><option>是</option><option>否</option></select></div>
        <div class="field"><label>余额更新状态</label><select id="stepUpdateStatus"><option>${current[17]}</option><option>已更新</option><option>待更新</option></select></div>
      </div>
      <div style="margin-top:14px"><button class="btn primary" onclick="saveTemplateStep('${templateCode}','${current[5]}')">保存并立即生效</button> <button class="btn danger" onclick="deleteTemplateStep('${templateCode}','${current[5]}')">减少当前步骤</button> <button class="btn" onclick="closeDrawer()">取消</button></div>
    </div>
  ` : `
    <div class="risk-box">该模板暂无明细配置样例。后续需按“影响模块、账本/账户、借贷方向、金额公式、余额影响”补齐后才能启用。</div>
  `;
  document.getElementById('drawer').classList.add('expanded');
  document.getElementById('drawerMask').classList.add('open');
  document.getElementById('drawer').classList.add('open');
}
function openTrace(id){
  document.getElementById('drawer').classList.remove('expanded');
  document.getElementById('drawerTitle').innerText = `资金链路追踪：${id}`;
  const traceTemplate = accountingTemplateMap[id] ? id : 'TPL-MDEP-001';
  const traceEntries = accountingEntriesByTemplate(traceTemplate);
  const traceTemplateInfo = accountingTemplateMap[traceTemplate] || {};
  document.getElementById('drawerBody').innerHTML = `
    <div class="ok-box">这条链路按 v4 模板口径展示：业务事件 → 会计模板 → 会计分录 → 账户/控制台账 → 对账治理。控制类资金池额度不进入正式借贷平衡。</div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none"><h3>基础信息</h3><div class="kv"><div>模板编码</div><div>${traceTemplate}</div><div>业务名称</div><div>${accountingValue(traceTemplateInfo,'业务名称','会员充值成功')}</div><div>触发模块</div><div>${accountingValue(traceTemplateInfo,'触发模块','-')}</div><div>触发状态</div><div>${accountingValue(traceTemplateInfo,'触发状态','-')}</div><div>金额表达式</div><div>${accountingValue(traceTemplateInfo,'金额表达式','-')}</div><div>覆盖状态</div><div>${tag(accountingValue(traceTemplateInfo,'覆盖状态','部分覆盖'))}</div></div></div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none"><h3>会计分录明细</h3>${renderTable(['行号','借贷/控制方向','科目编码','科目名称','科目类型','金额表达式','主体','来源/去向','是否正式分录','当前是否覆盖'], traceEntries.map(row=>[accountingValue(row,'行号'),accountingValue(row,'借贷/控制方向'),accountingValue(row,'科目编码'),accountingValue(row,'科目名称'),accountingValue(row,'科目类型'),accountingValue(row,'金额表达式'),accountingValue(row,'主体'),accountingValue(row,'来源/去向'),accountingValue(row,'是否正式分录'),accountingValue(row,'当前是否覆盖')]))}</div>
    <div style="height:16px"></div>
    <div class="card" style="box-shadow:none"><h3>系统事实</h3>${renderTable(['源表','源字段','当前系统事实'], traceEntries.map(row=>[accountingValue(row,'源表'),accountingValue(row,'源字段'),accountingValue(row,'当前系统事实')]))}</div>
    <div style="height:16px"></div>
    <div class="risk-box">v4 风险口径：资金池额度属于控制台账，不能重复算资产；正式借贷凭证以“是否正式分录=是”的分录行为准。</div>
  `;
  document.getElementById('drawerMask').classList.add('open');
  document.getElementById('drawer').classList.add('open');
}
function closeDrawer(){document.getElementById('drawerMask').classList.remove('open');document.getElementById('drawer').classList.remove('open');document.getElementById('drawer').classList.remove('expanded');}
function currentPageKey(){return normalizePageKey((location.hash||'#dashboard').replace('#','') || 'dashboard');}
function openFeatureHelp(){
  const key = pages[currentPageKey()] ? currentPageKey() : 'dashboard';
  const doc = functionDocs[key] || functionDocs.dashboard;
  document.getElementById('featureHelpTitle').innerText = doc.title;
  document.getElementById('featureHelpModule').innerText = `${doc.module} / 模块功能说明`;
  document.getElementById('featureHelpBody').innerHTML = [
    docSection('功能定位', doc.purpose),
    docSection('核心规则', doc.rules),
    docSection('关键字段', doc.fields),
    docSection('异常处理', doc.exceptions)
  ].join('');
  document.getElementById('featureHelpMask').classList.add('open');
}
function closeFeatureHelp(event){
  if(event) event.stopPropagation();
  document.getElementById('featureHelpMask').classList.remove('open');
}
function showToast(text){const t=document.getElementById('toast');t.innerText=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}

buildMenu();
go(normalizePageKey((location.hash||'#dashboard').replace('#','')));
window.addEventListener('hashchange',()=>go(normalizePageKey((location.hash||'#dashboard').replace('#',''))));
window.addEventListener('keydown',(event)=>{if(event.key==='Escape'){closeDrawer();closeFeatureHelp();}});
