'use strict';
// Shared EAF presentation. Existing controls and business handlers remain in place.
function isStandardModule(){return !['home','organization','staff','user-list'].includes(selectedAdmin)&&!goodsPages.includes(selectedAdmin)&&!selectedAdmin.startsWith('code-')&&!selectedAdmin.startsWith('log-')}
function standardModulePage(){
 const enabled=isStandardModule()&&!document.getElementById('pointWorkspace')&&!document.getElementById('wheelWorkspace')&&!document.getElementById('userGroupWorkspace');document.body.classList.toggle('standard-module-screen',enabled);if(!enabled)return;
 const view=$('view'),bar=document.createElement('div');bar.className='module-command-strip';
 const refresh=document.createElement('button');refresh.innerHTML=lineIcon('refresh')+'Сэргээх';refresh.onclick=()=>render();bar.append(refresh);
 const print=document.createElement('button');print.innerHTML=lineIcon('printer')+'Жагсаалт хэвлэх';print.onclick=()=>window.print();bar.append(print);
 view.prepend(bar);
 view.querySelectorAll('.product-toolbar button.primary,.point-selection-bar button').forEach(button=>{button.classList.add('module-command');bar.insertBefore(button,print)});
 view.querySelectorAll(':scope > .help').forEach(help=>{const details=document.createElement('details');details.className='module-help';const summary=document.createElement('summary');summary.textContent='Тайлбар';details.append(summary);help.before(details);details.append(help)});
 view.querySelectorAll('.product-toolbar input,.product-toolbar select').forEach(control=>{if(control.closest('label'))return;const label=document.createElement('label');label.className='module-filter-field';const caption=document.createElement('span');caption.textContent=control.tagName==='SELECT'?control.options[0]?.textContent.replace(/^Бүх /,'')||'Сонголт':control.type==='date'?'Огноо':'Хайх';control.before(label);label.append(caption,control)});
}
function installModuleStandard(){
 const previous=modal;modal=function(title,body){const dialog=$('dialog');dialog.classList.remove('module-standard-dialog','module-maximized');previous(title,body);if(!isStandardModule()||$('goodsPointsForm')||$('endUserGroupForm')||$('rewardProgramForm')||$('pointUserHistoryWorkspace')||$('dialogBody').querySelector('.qr-report-viewer'))return;
 dialog.classList.add('module-standard-dialog');const heading=$('dialogTitle');heading.textContent='';const name=document.createElement('span');name.textContent=title;heading.append(name);
 const max=document.createElement('button');max.type='button';max.textContent='⛶';max.title='Томруулах / буцаах';max.onclick=()=>dialog.classList.toggle('module-maximized');const close=document.createElement('button');close.type='button';close.textContent='×';close.title='Хаах';close.onclick=()=>dialog.close();heading.append(max,close);
 queueMicrotask(()=>{if(!dialog.open||!dialog.classList.contains('module-standard-dialog'))return;const form=$('dialogBody').querySelector('form'),commands=document.createElement('div');commands.className='module-form-commands';$('dialogBody').prepend(commands);
 if(form){const submit=form.querySelector('button[type="submit"],button.primary:not([type="button"])');if(submit){const reopen={wheelForm:()=>openWheelForm(),couponForm:()=>openCouponForm(),engagementForm:()=>openEngagementForm(selectedAdmin.startsWith('survey-')?'survey':'task')}[form.id];if(reopen){const saveNew=document.createElement('button');saveNew.type='button';saveNew.innerHTML=lineIcon('save')+'Хадгалах & Шинэ';saveNew.onclick=()=>{if(!form.reportValidity()||submit.disabled)return;form.requestSubmit(submit);if(!dialog.open)reopen()};commands.append(saveNew)}submit.innerHTML=lineIcon('save')+(reopen?'Хадгалах & Гарах':submit.textContent);submit.setAttribute('form',form.id);commands.append(submit)}
 standardModuleDates(form);form.querySelectorAll('label').forEach(label=>{if(label.closest('.prize-editor')||label.querySelector('label'))return;label.classList.add('module-form-row')});}
 const info=document.createElement('span');info.className='module-form-state';info.textContent=/засах|тохируулах|магадлал/i.test(title)?'ЗАСВАРЛАХ':'БҮРТГЭЛ';commands.append(info);
 });};
}

function standardModuleDates(form){
 form.querySelectorAll('input[type="date"]').forEach(native=>{
 const wrap=document.createElement('span');wrap.className='module-date-control';native.before(wrap);const text=document.createElement('input');text.type='text';text.placeholder='YYYY/MM/DD';text.value=native.value.replaceAll('-','/');text.required=native.required;text.disabled=native.disabled;text.readOnly=native.readOnly;text.setAttribute('aria-label',native.getAttribute('aria-label')||native.closest('label')?.firstChild.textContent||'Огноо');text.maxLength=10;
 const update=()=>{const iso=parseQrDate(text.value);text.setCustomValidity(iso===null?'Огноог YYYY/MM/DD хэлбэрээр зөв оруулна уу.':'');native.value=iso||'';native.dispatchEvent(new Event('change',{bubbles:true}))};text.oninput=()=>{text.setCustomValidity('');update()};text.onchange=update;
 const calendar=document.createElement('button');calendar.type='button';calendar.title='Огноо сонгох';calendar.innerHTML=lineIcon('calendar');calendar.onclick=()=>{try{native.showPicker()}catch{native.focus()}};native.oninput=()=>{text.value=native.value.replaceAll('-','/');text.setCustomValidity('')};native.classList.add('module-native-date');wrap.append(text,native,calendar);
 });
}
