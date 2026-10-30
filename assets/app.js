'use strict';
const $=id=>document.getElementById(id), fmt=n=>Number(n).toLocaleString('en-US'), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>new Date().toISOString().slice(0,10);const seed={balance:24850,rate:100,spinCost:500,codes:[],transactions:[{title:'Шоколад 80 гр',amount:100,date:today(),kind:'Код'},{title:'Купон худалдан авалт',amount:-500,date:today(),kind:'Купон'}],claims:[],completed:[],users:[['Б.Ануударь','9901 2345'],['Г.Энхбат','8811 5678'],['С.Уянга','9966 7788'],['Д.Цэцэг','8800 1122'],['М.Оргил','9911 3344']]};let db,storageAvailable=true;try{db=window.smartPointInitialWorkspace||JSON.parse(localStorage.getItem(currentStorageKey))||structuredClone(seed)}catch{db=structuredClone(seed);storageAvailable=false}let page='home';
function save(){db.orgId=activeOrg;const oldAudit=db.auditEntries;try{const previous=JSON.parse(localStorage.getItem(currentStorageKey)||'null');const changes=captureWorkspaceAudit(previous,db);if(changes.length)db.auditEntries=[...changes,...(db.auditEntries||[])];localStorage.setItem(currentStorageKey,SmartPointCodeStorage.stringify(db));return true}catch{db.auditEntries=oldAudit;storageAvailable=false;toast('Браузер хадгалах боломжгүй. Өгөгдөл зөвхөн энэ хуудсанд үлдэнэ.');return false}}function toast(t){$('toast').textContent=t;$('toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').style.display='none',4000)}function modal(title,body){$('dialog').classList.remove('qr-list-preview-dialog','point-user-history-dialog','point-user-history-maximized','reward-program-dialog','reward-program-maximized','end-user-group-dialog','point-document-dialog','point-document-maximized');$('dialogTitle').textContent=title;$('dialogBody').innerHTML=body;$('dialog').showModal()}$('close').onclick=()=>$('dialog').close();$('menu').onclick=()=>{if(matchMedia('(max-width:600px)').matches){const open=$('sidebar').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open));}else{const collapsed=document.body.classList.toggle('sidebar-collapsed');$('menu').setAttribute('aria-expanded',String(!collapsed));$('menu').title=collapsed?'Цэс дэлгэх':'Цэс хураах';}};

const adminMenu=[
  [
    "system-module",
    "Систем",
    [
      [
        "settings",
        "Тохиргоо",
        [
          [
            "organization",
            "Ерөнхий тохиргоо"
          ]
        ]
      ],
      [
        "audit",
        "Лог",
        [
          [
            "log-records",
            "Бүртгэлийн лог"
          ],
          [
            "log-system",
            "Системийн лог"
          ],
          [
            "log-users",
            "Хэрэглэгчийн лог"
          ]
        ]
      ],
      [
        "import",
        "Импорт"
      ]
    ]
  ],
  [
    "master-data",
    "Мастер дата",
    [
      [
        "users",
        "Эцсийн хэрэглэгч",
        [
          [
            "user-list",
            "Эцсийн хэрэглэгчийн жагсаалт"
          ],
          [
            "user-groups",
            "Эцсийн хэрэглэгчийн бүлэг"
          ],
          [
            "user-details",
            "Эцсийн хэрэглэгчийн дэлгэрэнгүй",
            [
              [
                "user-points",
                "Онооны үлдэгдэл, түүх"
              ],
              [
                "user-codes",
                "Ашигласан код"
              ],
              [
                "user-rewards",
                "Урамшууллын оролцоо"
              ]
            ]
          ]
        ]
      ],
      [
        "products",
        "Бараа",
        [
          [
            "product-list",
            "Бараа"
          ],
          [
            "product-details",
            "Барааны дэлгэрэнгүй жагсаалт"
          ],
          [
            "goods-groups",
            "Барааны бүлэг"
          ],
          [
            "categories",
            "Барааны ангилал"
          ],
          [
            "brands",
            "Бренд"
          ],
          [
            "units",
            "Хэмжих нэгж"
          ]
        ]
      ],
      [
        "staff",
        "Ажилтан"
      ],
      [
        "wheel-references",
        "Хүрд",
        [
          [
            "wheel-list",
            "Хүрдний жагсаалт"
          ],
          [
            "wheel-prizes",
            "Шагнал, магадлал, нөөц"
          ],
          [
            "wheel-rules",
            "Эргүүлэх эрхийн нөхцөл"
          ]
        ]
      ],
      [
        "codes",
        "Unique код / QR",
        [
          [
            "code-list",
            "Кодын жагсаалт"
          ],
          [
            "code-generate",
            "Код үүсгэх баримт"
          ],
          [
            "code-history",
            "Код ашиглалтын түүх"
          ],
          [
            "code-process",
            "Кодын төлөвийн процесс"
          ]
        ]
      ]
    ]
  ],
  [
    "points",
    "Онооны хөтөлбөр",
    [
      [
        "point-rules",
        "Хөтөлбөр"
      ],
      [
        "point-transactions",
        "Онооны гүйлгээ"
      ],
      [
        "point-document",
        "Онооны гүйлгээ бүртгэх"
      ],
      [
        "point-scans",
        "Онооны гүйлгээ /QR-аар/"
      ]
    ]
  ],
  [
    "wheel",
    "Хүрд",
    [
      [
        "wheel-history",
        "Эргэлт, хожлын түүх"
      ]
    ]
  ],
  [
    "coupons",
    "Купон",
    [
      [
        "coupon-list",
        "Купоны жагсаалт"
      ],
      [
        "coupon-purchases",
        "Худалдан авалтын түүх"
      ],
      [
        "coupon-usage",
        "Купоны ашиглалт"
      ]
    ]
  ],
  [
    "surveys",
    "Судалгаа",
    [
      [
        "survey-list",
        "Судалгааны жагсаалт"
      ],
      [
        "survey-answers",
        "Оролцогчид, хариулт"
      ],
      [
        "survey-results",
        "Үр дүн"
      ]
    ]
  ],
  [
    "tasks",
    "Даалгавар",
    [
      [
        "task-list",
        "Даалгаврын жагсаалт"
      ],
      [
        "task-verify",
        "Гүйцэтгэл баталгаажуулах"
      ],
      [
        "task-history",
        "Гүйцэтгэлийн түүх"
      ]
    ]
  ],
  [
    "fulfillment",
    "Шагнал олголт",
    [
      [
        "prizes-pending",
        "Олгох хүлээлттэй"
      ],
      [
        "prizes-delivered",
        "Олгосон шагнал"
      ]
    ]
  ],
  [
    "reports",
    "Тайлан",
    [
      [
        "report-codes",
        "Код ашиглалтын тайлан"
      ],
      [
        "report-points",
        "Онооны тайлан"
      ],
      [
        "report-rewards",
        "Урамшууллын тайлан"
      ],
      [
        "report-activity",
        "Хэрэглэгчийн идэвхийн тайлан"
      ]
    ]
  ],
  [
    "lists",
    "Жагсаалт",
    []
  ],
  [
    "processes",
    "Процесс",
    []
  ]
];
let selectedAdmin='home';const expandedMenus=new Set();
function menuItem(item,depth=0){const [id,label,children=[]]=item;const selected=id===selectedAdmin;const contains=children.some(c=>c[0]===selectedAdmin||(c[2]||[]).some(d=>d[0]===selectedAdmin));return `<div class="menu-node"><button type="button" data-admin="${id}" title="${label}" ${children.length?`aria-expanded="${expandedMenus.has(id)}" aria-controls="submenu-${id}"`:selected?'aria-current="page"':''} class="menu-button depth-${depth} ${selected?'active':''} ${contains?'has-selection':''}">${depth===0?`<span class="menu-icon">${lineIcon(id==='fulfillment'?'gift':id)}</span>`:'<span class="menu-bullet"></span>'}<span class="menu-label">${label}</span>${children.length?`<span class="menu-chevron">${lineIcon('chevron')}</span>`:''}</button>${children.length?`<div id="submenu-${id}" class="submenu" ${expandedMenus.has(id)?'':'hidden'}>${children.map(c=>menuItem(c,depth+1)).join('')}</div>`:''}</div>`}
function findAdmin(id,items=adminMenu){if(id==='home'&&items===adminMenu)return ['home','Нүүр хуудас',[]];for(const item of items){if(item[0]===id)return item;const child=findAdmin(id,item[2]||[]);if(child)return child}return null}
const routes={'organization':'adminSettingsModule','staff':'adminSettingsModule','roles':'adminSettingsModule','system':'adminSettingsModule','audit':'adminSettingsModule','log-records':'logWorkspace','log-system':'logWorkspace','log-users':'logWorkspace','product-list':'goodsWorkspace','product-details':'goodsWorkspace','goods-groups':'goodsWorkspace','product-new':'products','categories':'goodsWorkspace','batches':'batches','brands':'goodsWorkspace','units':'goodsWorkspace','code-list':'codes','code-generate':'codes','code-history':'codes','code-process':'codeProcessWorkspace','survey-list':'engagementModule','survey-answers':'engagementModule','survey-results':'engagementModule','task-list':'engagementModule','task-verify':'engagementModule','task-history':'engagementModule','coupon-list':'couponModule','coupon-purchases':'couponModule','coupon-usage':'couponModule','wheel-list':'wheelModule','wheel-prizes':'wheelModule','wheel-rules':'wheelModule','wheel-history':'wheelModule','point-rules':'rewardProgramsWorkspace','point-expiry':'pointExpiry','point-transactions':'pointBalances','point-document':'pointDocumentsWorkspace','point-scans':'pointScannedCodes','user-list':'users','user-groups':'userGroupsWorkspace','user-points':'points','report-points':'pointTransactions'};
function go(p){if(p==='point-expiry')p='point-rules';let item=findAdmin(p);if(!item)return;while(item[2]?.length){expandedMenus.add(item[0]);item=item[2][0]}selectedAdmin=item[0];page=selectedAdmin;render();$('sidebar').classList.remove('open');$('menu').setAttribute('aria-expanded',String(!matchMedia('(max-width:600px)').matches&&!document.body.classList.contains('sidebar-collapsed')));window.scrollTo(0,0)}

function render(){document.body.classList.toggle('user-group-screen',selectedAdmin==='user-groups');document.body.classList.toggle('wheel-standard-screen',selectedAdmin.startsWith('wheel-'));document.body.classList.toggle('point-standard-screen',['point-rules','point-transactions','point-document','point-scans','report-points'].includes(selectedAdmin));document.body.classList.toggle('qr-standard-screen',selectedAdmin.startsWith('code-'));document.body.classList.toggle('staff-screen',selectedAdmin==='staff');document.body.classList.toggle('goods-screen',goodsPages.includes(selectedAdmin));document.body.classList.toggle('workspace-home',selectedAdmin==='home');document.body.classList.toggle('general-company-screen',selectedAdmin==='organization');document.body.classList.toggle('logs-screen',selectedAdmin.startsWith('log-'));document.body.classList.toggle('user-grid-screen',selectedAdmin==='user-list');renderShellNavigation();const active=findAdmin(selectedAdmin);$('title').textContent=active[1];$('subtitle').textContent=selectedAdmin==='home'?'Smart Point системийн үйл ажиллагааны нэгдсэн мэдээлэл':'Үйлдвэрлэгч, нийлүүлэгчийн удирдлагын хэсэг';const views={pointDocumentsWorkspace,userGroupsWorkspace,rewardProgramsWorkspace,pointBalances,pointScannedCodes,codeProcessWorkspace,goodsWorkspace,home:workspaceHome,users,settings,products,categories,brands,units,batches,codes,points,reports,pointRules,pointTransactions,pointExpiry,wheelModule,couponModule,engagementModule,adminSettingsModule,logWorkspace};const target=routes[selectedAdmin]||(selectedAdmin==='home'?'home':null);$('view').innerHTML=target?views[target]():panel(active[1],'<div class="empty"><p>Энэ хэсгийн цэс, дэлгэцийн бүтэц бэлэн боллоо.</p><p>Дэлгэрэнгүй удирдлагын боломжийг дараагийн хөгжүүлэлтээр нэмнэ.</p></div>');bind();standardModulePage();}

function table(head,rows){return `<div class="table-wrap"><table><thead><tr>${head.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.join('')||`<tr><td colspan="${head.length}" class="empty">Одоогоор мэдээлэл алга</td></tr>`}</tbody></table></div>`}const tr=cells=>`<tr>${cells.map(x=>`<td>${x}</td>`).join('')}</tr>`;function panel(title,content,action=''){return `<section class="panel"><div class="panel-head"><h2>${title}</h2>${action}</div>${content}</section>`}function userTable(term=''){return table(['№','Нэр','Утас','Ашигласан код','Цуглуулсан оноо',''],db.users.filter(u=>u.join(' ').toLowerCase().includes(term.toLowerCase())).map((u,i)=>{const records=db.codes.filter(c=>c.used&&c.userPhone===u[1]),earned=db.transactions.filter(t=>t.amount>0&&(t.userPhone===u[1]||db.codes.some(c=>c.code===t.code&&c.userPhone===u[1]))).reduce((sum,t)=>sum+t.amount,0);return tr([i+1,esc(u[0]),esc(u[1]),records.length,fmt(earned),records.length?`<button class="history-user-link" data-linked-user="${esc(records[0].code)}">Кодын түүх</button>`:'—'])}))}
function settings(){return panel('Үйлдвэрлэгч, нийлүүлэгчийн оноо олгох нөхцөл',`<form id="settingsForm"><div class="toolbar"><label>Шинэ барааны анхны оноо<input id="rate" type="number" required min="1" max="100000" value="${db.rate}"></label><label>Хүрд эргүүлэх үнэ (оноо)<input id="spinCost" type="number" required min="1" max="100000" value="${db.spinCost}"></label><button class="primary">Хадгалах</button></div></form><p>Энэ оноо нь шинэ барааны анхны санал утга. Бүртгэлтэй барааны оноог барааны мэдээлэл дээр тусад нь засна. Админ эрхийн серверийн баталгаажуулалт энэ хувилбарт ороогүй.</p>`)}
const initialProducts=[{code:'PRD001',name:'Шоколад 80 гр',category:'Амттан',price:4500,unit:'Ширхэг',size:'80 гр',image:'chocolate'},{code:'PRD002',name:'Чипс 60 гр',category:'Зууш',price:3200,unit:'Уут',size:'60 гр',image:'chips'},{code:'PRD003',name:'Жүүс 1 л',category:'Уух зүйл',price:5800,unit:'Хайрцаг',size:'1 л',image:'juice'},{code:'PRD004',name:'Кофе 100 гр',category:'Уух зүйл',price:12500,unit:'Уут',size:'100 гр',image:'coffee'}];
const productDetails=Array.isArray(db.products)?db.products:structuredClone(initialProducts);const productList=productDetails.map(p=>[p.code,p.name]);
for(const [i,p] of productDetails.entries()){p.brand??=['Smart Selection','Crispy','Fresh','Daily Coffee'][i%4];p.barcode??='';p.account??='';p.standardCost??=0;p.purchasePrice??=0;p.isSalesItem??=true;p.active??=true;p.vat??=false;p.cityTax??=false;if(!Array.isArray(db.products)&&p.points==null)p.points=db.rate;p.useUnique??=true;p.validFrom??='';p.validTo??='';}
const workspaceAuditBaseline=structuredClone(productDetails);
const brandData=Array.isArray(db.brands)?db.brands:['Smart Selection','Crispy','Fresh','Daily Coffee'];
const unitData=Array.isArray(db.units)?db.units:['Ширхэг','Уут','Хайрцаг','Сав','Кг','Литр','Багц'];
for(const p of productDetails){if(!brandData.includes(p.brand))brandData.push(p.brand);if(!unitData.includes(p.unit))unitData.push(p.unit)}
function lookupRows(type,query=''){const data=type==='brands'?brandData:unitData,key=type==='brands'?'brand':'unit';return data.filter(name=>normalizeCategory(name).includes(normalizeCategory(query))).map((name,i)=>tr([i+1,`<strong>${esc(name)}</strong>`,`<span class="category-count">${productDetails.filter(p=>p[key]===name).length} бараа</span>`]))}
function lookupPage(type){const label=type==='brands'?'Брэнд':'Хэмжих нэгж';return `<section class="panel category-panel"><div class="product-toolbar"><div class="product-search">${lineIcon('search')}<input id="lookupSearch" data-type="${type}" placeholder="${label} хайх…" aria-label="${label} хайх"></div><button class="primary add-product" id="addLookup" data-type="${type}">＋ ${label} нэмэх</button></div><div id="lookupResults">${table(['№',label,'Барааны тоо'],lookupRows(type))}</div></section>`}
function brands(){return lookupPage('brands')}function units(){return lookupPage('units')}
function openLookup(type){const label=type==='brands'?'Брэнд':'Хэмжих нэгж',data=type==='brands'?brandData:unitData;modal(label+' нэмэх',`<form id="lookupForm"><label>${label}ийн нэр<input name="name" required maxlength="60" autocomplete="off"></label><p id="lookupError" class="error" role="alert"></p><button type="submit" class="primary">Хадгалах</button></form>`);$('lookupForm').onsubmit=e=>{e.preventDefault();const name=new FormData(e.target).get('name').trim().replace(/\s+/g,' ');if(!name){$('lookupError').textContent='Нэрээ оруулна уу.';return;}if(data.some(n=>normalizeCategory(n)===normalizeCategory(name))){$('lookupError').textContent='Энэ нэр бүртгэлтэй байна.';return;}data.push(name);const previous=db[type];db[type]=data;if(!save()){data.pop();db[type]=previous;$('lookupError').textContent='Хадгалах боломжгүй байна.';return;}$('dialog').close();render();toast(label+' нэмэгдлээ');}}
const categorySeed=[{code:'CAT001',name:'Амттан',description:'Шоколад, чихэр болон амттан'},{code:'CAT002',name:'Зууш',description:'Чипс, самар болон хөнгөн зууш'},{code:'CAT003',name:'Уух зүйл',description:'Жүүс, кофе, ус болон бусад ундаа'},{code:'CAT004',name:'Сүүн бүтээгдэхүүн',description:'Сүү, тараг, бяслаг'},{code:'CAT005',name:'Хүнс',description:'Өдөр тутмын хүнсний бүтээгдэхүүн'},{code:'CAT006',name:'Ахуйн хэрэглээ',description:'Гэр ахуйн өдөр тутмын хэрэгцээ'}];
const categoryData=Array.isArray(db.categories)?db.categories:structuredClone(categorySeed);
const normalizeCategory=s=>s.normalize('NFKC').trim().replace(/\s+/g,' ').toLocaleLowerCase('mn');
function nextCategoryCode(){let n=1;while(categoryData.some(c=>c.code==='CAT'+String(n).padStart(3,'0')))n++;return 'CAT'+String(n).padStart(3,'0')}
for(const product of productDetails){if(!categoryData.some(c=>normalizeCategory(c.name)===normalizeCategory(product.category)))categoryData.push({code:nextCategoryCode(),name:product.category,description:''})}
function categoryNames(){return [...new Set([...categoryData.map(c=>c.name),...productDetails.map(p=>p.category)])]}
function categoryRows(items){return items.map((c,i)=>tr([`<span class="category-row-icon">${lineIcon('products')}</span>`,`<code>${esc(c.code)}</code>`,`<strong>${esc(c.name)}</strong>`,`<span class="category-description">${esc(c.description||'—')}</span>`,`<span class="category-count">${productDetails.filter(p=>normalizeCategory(p.category)===normalizeCategory(c.name)).length} бүтээгдэхүүн</span>`]))}
function categories(){return `<div class="category-summary"><div><span class="category-summary-icon">${lineIcon('products')}</span><div><strong>${categoryData.length}</strong><p>Нийт ангилал</p></div></div><div><span class="category-summary-icon">${lineIcon('check')}</span><div><strong>${categoryData.filter(c=>productDetails.some(p=>normalizeCategory(p.category)===normalizeCategory(c.name))).length}</strong><p>Бүтээгдэхүүнтэй ангилал</p></div></div></div><section class="panel category-panel"><div class="product-toolbar"><div class="product-search">${lineIcon('search')}<input id="categorySearch" aria-label="Ангилал хайх" placeholder="Ангиллын нэр, кодоор хайх…"></div><span id="categoryCount">Нийт ${categoryData.length} ангилал</span><button class="primary add-product" id="addCategory">＋ Ангилал нэмэх</button></div><div id="categoryResults">${table(['','Код','Ангиллын нэр','Тайлбар','Бүтээгдэхүүн'],categoryRows(categoryData))}</div></section><p class="product-note">Анхны ангиллууд нь жишээ өгөгдөл. Нэмсэн ангилал энэ браузерт хадгалагдана.</p>`}
function openCategoryForm(){modal('Шинэ ангилал нэмэх',`<p class="form-description">Бүтээгдэхүүнээ ангилж, удирдахад хялбар болгоорой.</p><form id="newCategoryForm"><label>Ангиллын код <span class="required">*</span><input name="categoryCode" value="${nextCategoryCode()}" required maxlength="40" autocomplete="off"></label><label>Ангиллын нэр <span class="required">*</span><input name="categoryName" required maxlength="60" placeholder="Жишээ: Гоо сайхан"></label><label>Тайлбар<textarea name="description" maxlength="300" rows="3" placeholder="Энэ ангилалд орох бүтээгдэхүүний тайлбар"></textarea></label><p id="categoryFormError" class="error" role="alert"></p><div class="product-form-actions"><button type="button" id="cancelCategory">Болих</button><button type="submit" class="primary">Хадгалах</button></div></form>`);
$('cancelCategory').onclick=()=>$('dialog').close();$('newCategoryForm').onsubmit=e=>{e.preventDefault();const data=new FormData(e.target),item={code:String(data.get('categoryCode')).trim().toUpperCase(),name:String(data.get('categoryName')).trim().replace(/\s+/g,' '),description:String(data.get('description')).trim()};const error=$('categoryFormError');if(!item.name){error.textContent='Ангиллын нэрээ оруулна уу.';return;}if(!/^[A-Z0-9_-]+$/.test(item.code)){error.textContent='Кодод латин үсэг, тоо, зураас ашиглана уу.';return;}if(categoryData.some(c=>c.code.toUpperCase()===item.code)){error.textContent='Энэ код бүртгэлтэй байна.';return;}if(categoryData.some(c=>normalizeCategory(c.name)===normalizeCategory(item.name))){error.textContent='Энэ нэртэй ангилал бүртгэлтэй байна.';return;}categoryData.push(item);const previous=db.categories;db.categories=categoryData;if(!save()){categoryData.pop();db.categories=previous;error.textContent='Хадгалах боломжгүй байна. Браузерын хадгалах зай болон зөвшөөрлийг шалгана уу.';return;}$('dialog').close();render();toast('Шинэ ангилал нэмэгдлээ');};}
const batchExamples=[
{lot:'LOT-2026-001',product:'PRD001',made:'2026-10-01',expires:'2027-10-01',quantity:10000,generated:10000,used:6420,status:'Идэвхтэй'},
{lot:'LOT-2026-002',product:'PRD002',made:'2026-10-05',expires:'2027-04-05',quantity:8000,generated:8000,used:3150,status:'Идэвхтэй'},
{lot:'LOT-2026-003',product:'PRD003',made:'2026-10-10',expires:'2027-04-10',quantity:12000,generated:12000,used:4820,status:'Идэвхтэй'},
{lot:'LOT-2026-004',product:'PRD004',made:'2026-10-12',expires:'2027-10-12',quantity:5000,generated:5000,used:0,status:'Хэвлэлтэд бэлэн'},
{lot:'LOT-2026-005',product:'PRD001',made:'2026-09-01',expires:'2027-09-01',quantity:6000,generated:6000,used:6000,status:'Дууссан'},
{lot:'LOT-2026-006',product:'PRD003',made:'2026-10-20',expires:'2027-04-20',quantity:15000,generated:0,used:0,status:'Код үүсгээгүй'}];
function batchTable(items){return table(['Багцын дугаар','Бүтээгдэхүүн','Үйлдвэрлэсэн','Дуусах огноо','Тоо хэмжээ','Үүсгэсэн код','Ашигласан код','Төлөв'],items.map(b=>{const p=initialProducts.find(p=>p.code===b.product);return tr([`<code class="lot-code">${b.lot}</code>`,`<div class="batch-product"><img src="${productImage(p)}" alt=""><div><strong>${esc(p.name)}</strong><small>${p.code}</small></div></div>`,b.made.replaceAll('-','.'),b.expires.replaceAll('-','.'),fmt(b.quantity)+' ш',fmt(b.generated),`<div class="batch-usage"><span>${fmt(b.used)}</span><small>${b.generated?Math.round(b.used/b.generated*100):0}%</small></div><div class="batch-progress"><span style="width:${b.generated?b.used/b.generated*100:0}%"></span></div>`,`<span class="batch-status ${b.status==='Идэвхтэй'?'live':b.status==='Дууссан'?'complete':'waiting'}">${b.status}</span>`])}))}
function batches(){const total=batchExamples.reduce((n,b)=>n+b.quantity,0),used=batchExamples.reduce((n,b)=>n+b.used,0);return `<div class="category-summary batch-summary"><div><span class="category-summary-icon">${lineIcon('products')}</span><div><strong>${batchExamples.length}</strong><p>Нийт цуврал</p></div></div><div><span class="category-summary-icon">${lineIcon('codes')}</span><div><strong>${fmt(total)}</strong><p>Нийт бүтээгдэхүүн · ширхэг</p></div></div><div><span class="category-summary-icon">${lineIcon('check')}</span><div><strong>${fmt(used)}</strong><p>Ашигласан код</p></div></div></div><section class="panel batch-panel"><div class="product-toolbar"><div class="product-search">${lineIcon('search')}<input id="batchSearch" aria-label="Цуврал хайх" placeholder="Багцын дугаар, бүтээгдэхүүнээр хайх…"></div><select id="batchStatus" aria-label="Цувралын төлөв"><option value="">Бүх төлөв</option>${[...new Set(batchExamples.map(b=>b.status))].map(status=>`<option>${status}</option>`).join('')}</select><span id="batchCount">Нийт ${batchExamples.length} цуврал</span></div><div id="batchResults">${batchTable(batchExamples)}</div></section><p class="product-note">Жишээ өгөгдөл · Энэ хэсгийн тоо хэмжээ, кодын ашиглалт нь бодитоор үүсгэсэн кодтой холбогдоогүй.</p>`}
function productImage(p){return p.imageData||'assets/products/'+p.image+'.svg'}
function productCard(p){return `<article class="product-card"><div class="product-image"><img src="${esc(productImage(p))}" alt="${esc(p.name)} барааны зураг"><span class="product-status ${p.active?'':'inactive'}"><i></i>${p.active?'Идэвхтэй':'Идэвхгүй'}</span><button class="product-more" data-edit="${esc(p.code)}" aria-label="${esc(p.name)} засах">${lineIcon('more')}</button></div><div class="product-content"><div class="product-meta"><span>${esc(p.category)}</span><code>${esc(p.code)}</code></div><h2>${esc(p.name)}</h2><p class="product-brand">${esc(p.brand)}</p><div class="product-price">${fmt(p.price)} ₮ <small>/ ${esc(p.unit.toLowerCase())}</small></div><dl class="product-specs"><div><dt>Хэмжих нэгж</dt><dd>${esc(p.unit)}</dd></div><div><dt>Unique код</dt><dd>${p.useUnique?'Ашиглана':'Ашиглахгүй'}</dd></div></dl><div class="product-points">${lineIcon('coins')}<span>Олгох оноо</span><strong>+${fmt(p.points)}</strong></div><div class="product-actions"><button class="primary" data-product-code="${esc(p.code)}" ${!p.active||!p.useUnique?'disabled':''}>${lineIcon('codes')} Код үүсгэх</button><button data-detail="${esc(p.code)}" aria-label="${esc(p.name)} мэдээлэл харах">${lineIcon('eye')}</button></div></div></article>`}
function products(){return `<div class="product-toolbar"><div class="product-search">${lineIcon('search')}<input id="productSearch" aria-label="Бараа хайх" placeholder="Барааны нэр, код, брэндээр хайх…"></div><select id="categoryFilter" aria-label="Ангиллаар шүүх"><option value="">Бүх ангилал</option>${categoryNames().map(c=>`<option>${esc(c)}</option>`).join('')}</select><span id="productCount">Нийт ${productDetails.length} бараа</span><button class="primary add-product" id="addProduct">＋ Бараа нэмэх</button></div><div class="product-grid" id="productGrid">${productDetails.map(productCard).join('')}</div><p class="product-note">Эхний 4 бараа нь жишээ мэдээлэл. Тохиргоо энэ браузерт хадгалагдана.</p>`}
function openProductForm(existing=null,copy=null){
const original=existing?JSON.stringify(existing):null,p=existing?{...existing}:copy?{...copy,code:'',deleted:false}:{pointsValidDays:db.pointPolicy?.days||0,code:'',name:'',category:'',brand:'',unit:'',barcode:'',account:'',standardCost:0,purchasePrice:0,isSalesItem:true,price:0,active:true,vat:false,cityTax:false,useUnique:true,validFrom:'',validTo:''};
const text=(key,label,attrs='')=>`<label>${label}<input name="${key}" value="${esc(p[key]??'')}" ${attrs}></label>`;
const select=(key,label,data)=>`<label>${label}<select name="${key}" required><option value="">Сонгох</option>${data.map(value=>`<option value="${esc(value)}" ${p[key]===value?'selected':''}>${esc(value)}</option>`).join('')}</select></label>`;
modal(existing?'Барааны мэдээлэл засах':'Шинэ бараа нэмэх',`<p class="form-description">Барааны үндсэн мэдээлэл болон зургийг бүртгэнэ.</p><form id="newProductForm"><h3 class="form-section-title">Үндсэн мэдээлэл</h3><div class="product-form-grid">${text('code','Барааны код *','required maxlength="40" autocomplete="off"')}${text('name','Барааны нэр *','required maxlength="120"')}${select('category','Ангилал *',categoryNames())}${select('brand','Брэнд *',brandData)}${select('unit','Хэмжих нэгж *',unitData)}${text('barcode','Бар код','maxlength="80"')}</div><div class="product-checks">${[['active','Идэвхтэй эсэх'],['vat','НӨАТ эсэх'],['cityTax','НХАТ-тай эсэх']].map(([key,label])=>`<label><input type="checkbox" name="${key}" ${p[key]?'checked':''}>${label}</label>`).join('')}</div><label class="image-upload-label">Барааны зураг<input id="productImageFile" type="file" accept="image/png,image/jpeg,image/webp"><small>PNG, JPG, WebP · 1 MB хүртэл. Зураг сонголттой.</small></label><img id="newImagePreview" class="new-image-preview" alt="Барааны зураг" ${existing||copy?'src="'+esc(productImage(p))+'"':'hidden'}><p id="productFormError" class="error" role="alert"></p><div class="product-form-actions"><button type="button" id="cancelProduct">Болих</button><button type="submit" class="primary" id="saveProduct">Хадгалах</button></div></form>`);
$('dialog').classList.add('product-form-dialog','goods-product-dialog');let imageData=p.imageData||'',imageReady=true;const form=$('newProductForm');$('cancelProduct').onclick=()=>$('dialog').close();const commands=document.createElement('div');commands.className='goods-form-commands product-standard-commands';const saveNew=document.createElement('button');saveNew.type='button';saveNew.innerHTML=lineIcon('save')+' Хадгалах & Шинэ';saveNew.onclick=()=>{if(!imageReady||!form.reportValidity())return;form.requestSubmit($('saveProduct'));if(!$('dialog').open)openGoodsProduct()};$('saveProduct').innerHTML=lineIcon('copy')+' Хадгалах & Гарах';commands.append(saveNew,$('saveProduct'));const mode=document.createElement('span');mode.className='product-standard-mode';mode.textContent=existing?'ЗАСВАРЛАХ':'ШИНЭ';commands.append(mode);form.prepend(commands);form.querySelector('.product-form-actions').hidden=true;$('dialogTitle').innerHTML='<span>Бараа</span><span class="group-window-actions"><button type="button" id="productWindowMax" title="Цонх дэлгэх">⛶</button><button type="button" id="productWindowClose" aria-label="Хаах">×</button></span>';$('productWindowMax').onclick=()=>$('dialog').classList.toggle('goods-group-maximized');$('productWindowClose').onclick=()=>$('dialog').close();
$('productImageFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;$('productFormError').textContent='';if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1024*1024){$('productFormError').textContent='PNG, JPG эсвэл WebP зураг сонгоно уу. Хэмжээ 1 MB-аас ихгүй байна.';e.target.value='';return;}imageReady=false;$('saveProduct').disabled=true;try{const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)});await new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=data});if(!form.isConnected)return;imageData=data;$('newImagePreview').src=data;$('newImagePreview').hidden=false;}catch{if(form.isConnected){$('productFormError').textContent='Зургийг унших боломжгүй. Өөр зураг сонгоно уу.';e.target.value='';}}finally{imageReady=true;if(form.isConnected)$('saveProduct').disabled=false;}};
form.onsubmit=e=>{e.preventDefault();if(!imageReady)return;const values=new FormData(form),item={...p};if(form.elements.groupCode)item.groupCode=String(values.get('groupCode')||'');if(form.elements.goodsType)item.type=String(values.get('goodsType')||'Бараа материал');for(const key of ['code','name','category','brand','unit','barcode'])item[key]=String(values.get(key)||'').trim();item.code=item.code.toUpperCase();for(const key of ['active','vat','cityTax'])item[key]=values.has(key);item.image=p.image||'default';if(imageData)item.imageData=imageData;
const error=$('productFormError');if(existing&&JSON.stringify(productDetails.find(product=>product.code===existing.code))!==original){error.textContent='Барааны мэдээлэл өөрчлөгдсөн байна. Дахин нээнэ үү.';return}if(['code','name','category','brand','unit'].some(k=>!item[k])){error.textContent='Заавал бөглөх мэдээллээ бүрэн оруулна уу.';return;}if(!/^[A-Z0-9_-]+$/.test(item.code)){error.textContent='Кодод латин үсэг, тоо, зураас ашиглана уу.';return;}if(productDetails.some(p=>p!==existing&&p.code.toUpperCase()===item.code)){error.textContent='Энэ барааны код бүртгэлтэй байна.';return;}if(!categoryNames().includes(item.category)||!brandData.includes(item.brand)||!unitData.includes(item.unit)){error.textContent='Бүртгэлтэй ангилал, брэнд, хэмжих нэгж сонгоно уу.';return;}
const index=existing?productDetails.indexOf(existing):-1,previous=db.products;if(index>=0)productDetails[index]=item;else productDetails.unshift(item);db.products=productDetails;if(!save()){if(index>=0)productDetails[index]=existing;else productDetails.shift();db.products=previous;error.textContent='Хадгалах боломжгүй. Хадгалах зай, зөвшөөрлийг шалгана уу.';return;}productList.splice(0,productList.length,...productDetails.map(p=>[p.code,p.name]));$('dialog').close();expandedMenus.add('products');selectedAdmin=selectedAdmin==='product-details'?'product-details':'product-list';page=selectedAdmin;render();toast(existing?'Барааны мэдээлэл шинэчлэгдлээ':'Шинэ бараа нэмэгдлээ');};}
$('dialog').addEventListener('close',()=>{if(!$('dialog').open)$('dialog').classList.remove('product-form-dialog','qr-dialog','wheel-prize-dialog','coupon-form-dialog','engagement-dialog','settings-dialog','goods-reference-dialog','goods-product-dialog','goods-group-dialog','goods-group-maximized','goods-simple-reference-dialog','goods-points-dialog','point-user-history-dialog','point-user-history-maximized','reward-program-dialog','reward-program-maximized','end-user-group-dialog','staff-dialog','staff-maximized','qr-document-dialog','qr-document-maximized','qr-standard-dialog','qr-unified-dialog','qr-unified-maximized')});
function bindProductActions(){document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openProductForm(productDetails.find(p=>p.code===b.dataset.edit)));document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>{const p=productDetails.find(p=>p.code===b.dataset.detail);modal('Барааны мэдээлэл',`<img class="product-detail-image" src="${esc(productImage(p))}" alt="${esc(p.name)}"><h2>${esc(p.name)}</h2><dl class="detail-specs">${[['Барааны код',p.code],['Ангилал',p.category],['Брэнд',p.brand],['Хэмжих нэгж',p.unit],['Бар код',p.barcode||'—'],['Үнэ',fmt(p.price)+' ₮'],['Идэвхтэй эсэх',p.active?'Тийм':'Үгүй'],['НӨАТ',p.vat?'Тийм':'Үгүй'],['НХАТ',p.cityTax?'Тийм':'Үгүй'],['Олгох оноо',fmt(p.points)],['Онооны хүчинтэй хоног',pointDaysLabel(effectivePointDays(p))],['Unique код',p.useUnique?'Ашиглана':'Ашиглахгүй'],['Код эхлэх огноо',p.validFrom||'Хязгааргүй'],['Код дуусах огноо',p.validTo||'Хязгааргүй']].map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><button id="editProductDetail" class="primary">Мэдээлэл засах</button>`);$('editProductDetail').onclick=()=>{$('dialog').close();openProductForm(p)}});document.querySelectorAll('[data-product-code]').forEach(b=>b.onclick=()=>{go('code-generate');openQrDocument(null,{productCode:b.dataset.productCode,quantity:1})})}

function codes(){return codeWorkspace(selectedAdmin)}
function transactionTable(limit=500){return table(['Төрөл','Тайлбар','Огноо','Оноо'],db.transactions.slice(0,limit).map(t=>tr([esc(t.kind),esc(t.title)+(t.isSample?'<small class="sample-tag">Жишээ · '+esc(t.userName||'')+'</small>':''),t.date,`<span class="${t.amount>=0?'badge':'error'}">${t.amount>=0?'+':''}${fmt(t.amount)}</span>`])))}function points(){return panel('Хэрэглэгчдийн онооны гүйлгээ',`<p>Эцсийн хэрэглэгчдэд олгосон болон зарцуулсан онооны бүртгэл. Доорх нь жишээ хэрэглэгчийн туршилтын гүйлгээ.</p>${transactionTable()}`)}
function reports(){const earned=db.transactions.filter(t=>t.amount>0).reduce((a,t)=>a+t.amount,0),spent=-db.transactions.filter(t=>t.amount<0).reduce((a,t)=>a+t.amount,0);return panel('Туршилтын гүйлгээний тайлан',`<div class="toolbar"><button id="reportCsv">Тайлан CSV татах</button></div><p>Бүртгэгдсэн орлого: ${fmt(earned)} оноо · Зарлага: ${fmt(spent)} оноо · Эхний жишээ үлдэгдэл нь тайланд орлого болж бүртгэгдэхгүй.</p>${transactionTable()}`)}
function download(name,rows){logUiAction('export',name);const content='\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function bindLinkedUsers(){document.querySelectorAll('[data-linked-user]').forEach(button=>button.onclick=()=>openHistoryUser(button.dataset.linkedUser))}
function bind(){bindUserGroups();bindGoods();bindUserGrid();bindLogs();bindAdminSettings();bindEngagement();bindCoupons();bindWheels();bindPoints();bindLinkedUsers();bindProductActions();bindCodes();if($('lookupSearch'))$('lookupSearch').oninput=e=>{$('lookupResults').innerHTML=table(['№',e.target.dataset.type==='brands'?'Брэнд':'Хэмжих нэгж','Барааны тоо'],lookupRows(e.target.dataset.type,e.target.value))};if($('addLookup'))$('addLookup').onclick=e=>openLookup(e.currentTarget.dataset.type);if($('batchSearch')){const filterBatches=()=>{const query=$('batchSearch').value.trim().toLowerCase(),status=$('batchStatus').value;const found=batchExamples.filter(b=>{const p=initialProducts.find(p=>p.code===b.product);return (b.lot+' '+p.name+' '+p.code).toLowerCase().includes(query)&&(!status||b.status===status)});$('batchResults').innerHTML=batchTable(found);$('batchCount').textContent=found.length+' цуврал';};$('batchSearch').oninput=filterBatches;$('batchStatus').onchange=filterBatches;}if($('addCategory'))$('addCategory').onclick=openCategoryForm;if($('categorySearch'))$('categorySearch').oninput=e=>{const term=normalizeCategory(e.target.value);const found=categoryData.filter(c=>normalizeCategory(c.name+' '+c.code).includes(term));$('categoryResults').innerHTML=table(['','Код','Ангиллын нэр','Тайлбар','Бүтээгдэхүүн'],categoryRows(found));$('categoryCount').textContent=found.length+' ангилал';};if($('addProduct'))$('addProduct').onclick=()=>openProductForm();if($('productSearch')){const filter=()=>{const term=$('productSearch').value.trim().toLowerCase(),category=$('categoryFilter').value;const found=productDetails.filter(p=>(p.name+' '+p.code+' '+p.brand).toLowerCase().includes(term)&&(!category||p.category===category));$('productGrid').innerHTML=found.length?found.map(productCard).join(''):'<div class="product-empty">'+lineIcon('search')+'<h2>Бүтээгдэхүүн олдсонгүй</h2><p>Хайх үг эсвэл ангиллаа өөрчлөөд үзээрэй.</p></div>';$('productCount').textContent=found.length+' бүтээгдэхүүн';bindProductActions()};$('productSearch').oninput=filter;$('categoryFilter').onchange=filter;}document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));if($('search'))$('search').oninput=e=>{$('userResults').innerHTML=userTable(e.target.value);bindLinkedUsers()};if($('settingsForm'))$('settingsForm').onsubmit=e=>{e.preventDefault();db.rate=Number($('rate').value);db.spinCost=Number($('spinCost').value);save();toast('Нөхцөл хадгалагдлаа')};if($('reportCsv'))$('reportCsv').onclick=()=>download('smart-point-report.csv',[['Огноо','Төрөл','Тайлбар','Оноо'],...db.transactions.map(t=>[t.date,t.kind,t.title,t.amount])])}

function lineIcon(name){const paths={calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h2M7 18h2M12 18h2"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 17h.01"/>',powerOff:'<path d="M12 2v10M6 5a9 9 0 1 0 12 0"/>',copy:'<path d="M8 7V3h12v14h-4M4 7h12v14H4z"/>',edit:'<path d="m15 3 6 6-12 12H3v-6ZM12 6l6 6"/>',trash:'<path d="M3 6h18M8 6V3h8v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M20 12a8 8 0 0 0-14-6M4 12a8 8 0 0 0 14 6"/>',save:'<path d="M4 3h13l4 4v14H3V3h1ZM7 3v6h10V3M7 21v-8h10v8"/>',hamburger:'<path d="M4 6h16M4 12h16M4 18h16"/>',filter:'<path d="M3 4h18l-7 8v7l-4 2v-9Z"/>',filePlus:'<path d="M5 3h9l5 5v13H5zM14 3v6h5M8 15h8M12 11v8"/>',list:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M3 15h18"/>',upload:'<path d="M12 16V3m-5 5 5-5 5 5M3 16v5h18v-5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',tag:'<path d="M3 3h8l10 10-8 8L3 11Z"/><circle cx="7" cy="7" r="1"/>',printer:'<path d="M6 8V3h12v5M6 17H3V9h18v8h-3M6 14h12v8H6zM17 11h1"/>',chevron:'<path d="m8 10 4 4 4-4"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',sidebar:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16m7-11-3 3 3 3"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M17 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',addUser:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M20 8v6M17 11h6"/><circle cx="9" cy="7" r="4"/>',dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="11" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="18" width="7" height="3" rx="1"/>',settings:'<path d="m9 3-1 3-3 1-2 4 2 3v4l4 3 3-1 3 1 4-3v-4l2-3-2-4-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',products:'<path d="m12 3 9 5v9l-9 5-9-5V8Zm0 10 9-5M12 13 3 8m9 5v9M7 5l10 6"/>',codes:'<path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h2v2h-2zM20 14v4h-3v3M21 21h-1M12 3v3M12 10v3H9M3 12h3M12 18v3"/>',points:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',wheel:'<circle cx="12" cy="12" r="9"/><path d="m9 7 6 10M15 7 9 17M8 12h8"/>',coupons:'<path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Z M9 5v3M9 11v2M9 16v3"/>',surveys:'<path d="M6 2h9l5 5v15H6zM14 2v6h6M9 12h7M9 16h7"/>',tasks:'<rect x="4" y="3" width="16" height="19" rx="2"/><path d="m8 12 3 3 6-7M9 3v3h6V3"/>',reports:'<path d="M4 3v18h17M8 16l4-5 4 2 5-8M15 5h6v6"/>',coins:'<ellipse cx="10" cy="8" rx="7" ry="3"/><path d="M3 8v10c0 4 14 4 14 0V8M3 13c0 4 14 4 14 0M10 4c1-3 12-2 12 1v10c0 2-2 3-5 3"/>',gift:'<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v9h14v-9M12 8v14M12 8C3 8 4 0 8 3l4 5c9 0 8-8 4-5Z"/>',check:'<path d="M21 11a9 9 0 1 1-6-8M8 10l4 4L22 3"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.points}</svg>`}

installModuleStandard();updateOrganizationHeader();if(db.systemSettings?.pageSize)ledgerPageSize=db.systemSettings.pageSize;$('menu').innerHTML=lineIcon('hamburger');$('menu').title='Цэс хураах';$('menu').setAttribute('aria-expanded','true');render();

// Keep the standalone consumer test and Admin views in sync within one browser.
let workspaceStorageSequence=0;window.addEventListener('storage',async event=>{if(event.key!==currentStorageKey||!event.newValue)return;try{const sequence=++workspaceStorageSequence,incoming=await SmartPointCodeStorage.read(currentStorageKey,event.newValue);if(sequence!==workspaceStorageSequence)return;if(!Array.isArray(incoming.codes)||(incoming.orgId&&incoming.orgId!==activeOrg))return;Object.assign(db,incoming);if(Array.isArray(incoming.products)){productDetails.splice(0,productDetails.length,...incoming.products);db.products=productDetails;productList.splice(0,productList.length,...productDetails.map(p=>[p.code,p.name]));}if(!$('dialog').open)render();}catch{toast('Тестийн өгөгдлийг шинэчлэх боломжгүй байна.');}});

window.addEventListener('beforeprint',()=>logUiAction('print',findAdmin(selectedAdmin)?.[1]||'Хэвлэх'));
