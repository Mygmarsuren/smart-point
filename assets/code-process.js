'use strict';
const codeProcessNodes=[
 {state:'inactive',icon:'filePlus',left:60,top:290},
 {state:'scheduled',icon:'calendar',left:330,top:30},
 {state:'active',icon:'codes',left:330,top:290},
 {state:'used',icon:'check',left:600,top:290},
 {state:'expired',icon:'clock',left:330,top:550},
 {state:'cancelled',icon:'powerOff',left:60,top:550}
];
function codeProcessWorkspace(){
 ensureSampleCodeList();ensureSampleHistory();
 return `<section id="codeProcessWorkspace"><div class="qr-toolbar"><button id="refreshCodeProcess">${lineIcon('refresh')} Шүүх</button><button id="codeProcessHelp" class="qr-icon-action" title="Мэдээлэл" aria-label="Кодын төлөвийн тайлбар">${lineIcon('help')}</button></div><div class="code-process-scroll"><div class="code-process-canvas"><svg class="code-process-arrows" viewBox="0 0 940 740" aria-hidden="true"><defs><marker id="codeProcessArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#f9de6d"/></marker></defs><g fill="none" stroke="#f9de6d" stroke-width="3" marker-end="url(#codeProcessArrow)"><path d="M220 370H330"><title>Хугацаа нь эхэлсэн кодыг идэвхжүүлэх</title></path><path d="M490 370H600"><title>Кодыг баталгаажуулж ашиглах</title></path><path d="M410 190V290"><title>Эхлэх огноо болох</title></path><path d="M140 290V110H330"><title>Хугацаа нь эхлээгүй кодыг идэвхжүүлэх</title></path><path d="M410 450V550"><title>Кодын хугацаа дуусах</title></path><path d="M140 450V550"><title>Ашиглаагүй кодын баримтыг цуцлах</title></path></g></svg>${codeProcessNodes.map(node=>`<button class="code-process-node code-process-${node.state}" data-code-process-state="${node.state}" style="left:${node.left}px;top:${node.top}px"><span class="code-process-count" id="codeProcess-${node.state}">0</span><span class="code-process-icon">${lineIcon(node.icon)}</span><span class="code-process-label">${esc(codeStatusLabels[node.state])}</span></button>`).join('')}</div></div><div class="code-process-footer" id="codeProcessTotal"></div></section>`;
}
function updateCodeProcess(){
 const counts=Object.fromEntries(Object.keys(codeStatusLabels).map(state=>[state,0]));const date=qrBusinessDate();for(const record of db.codes)counts[codeStatus(record,date)]++;
 for(const node of codeProcessNodes){$('codeProcess-'+node.state).textContent=fmt(counts[node.state]);const button=document.querySelector('[data-code-process-state="'+node.state+'"]');button.setAttribute('aria-label',codeStatusLabels[node.state]+' · '+fmt(counts[node.state])+' код');button.title=codeStatusLabels[node.state]+' кодын жагсаалт харах'}
 $('codeProcessTotal').textContent='Нийт '+fmt(db.codes.length)+' код';
}
function bindCodeProcess(){
 if(!$('codeProcessWorkspace'))return;installQrDialogStandard();updateCodeProcess();$('refreshCodeProcess').onclick=updateCodeProcess;
 document.querySelectorAll('[data-code-process-state]').forEach(button=>button.onclick=()=>{const state=button.dataset.codeProcessState;qrPage=1;go('code-list');$('codeStatusFilter').value=state;codeRows()});
 $('codeProcessHelp').onclick=()=>modal('Кодын төлөвийн процесс',`<dl class="code-process-definitions"><dt>Идэвхгүй</dt><dd>Үүссэн боловч идэвхжүүлээгүй эсвэл идэвхгүй болгосон код.</dd><dt>Эхлэх хугацаа болоогүй</dt><dd>Идэвхжүүлсэн, ашиглаж эхлэх огноо нь болоогүй код.</dd><dt>Идэвхтэй</dt><dd>Кодын хугацаа эхэлсэн, баталгаажуулж ашиглах боломжтой төлөв. Бараа болон онооны нөхцөлийг ашиглах үед давхар шалгана.</dd><dt>Ашигласан</dt><dd>Хэрэглэгч баталгаажуулсан код. Дахин оноо олгохгүй.</dd><dt>Хугацаа дууссан</dt><dd>Дуусах огноо өнгөрсөн, ашиглагдаагүй код. Оноо олгохгүй.</dd><dt>Цуцалсан</dt><dd>Ашиглаагүй кодын үүсгэсэн баримтыг цуцалсан. Код ашиглах боломжгүй.</dd></dl><p class="qr-action-note">Блок бүр одоогийн төлөвийн кодын тоог харуулна. Блок дээр дарахад тухайн төлөвөөр шүүсэн жагсаалт нээгдэнэ. Сум нь үндсэн явцыг харуулна; идэвхтэй кодыг дахин идэвхгүй болгож болно. Хугацаа дууссан болон ашигласан төлөв нь идэвхтэй/идэвхгүй тохиргооноос давуу үйлчилнэ.</p>`);
}
