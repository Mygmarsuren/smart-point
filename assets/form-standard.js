'use strict';
// Shared field captions: current and subsequently opened forms use red required marks.
(()=>{
 const decorate=label=>{
  const walker=document.createTreeWalker(label,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode()){const node=walker.currentNode;if(node.nodeValue.includes('*')&&!node.parentElement.closest('input,textarea,select,option,button,script,style,[data-required-marker],.required'))nodes.push(node)}
  nodes.forEach(node=>{if(!node.isConnected)return;const direct=node.parentNode===label,container=direct?document.createElement('span'):document.createDocumentFragment();if(direct)container.className='field-caption';node.nodeValue.split('*').forEach((text,i)=>{if(i){const marker=document.createElement('span');marker.dataset.requiredMarker='';marker.className='required';marker.textContent='*';marker.setAttribute('aria-hidden','true');container.append(marker)}container.append(document.createTextNode(text))});node.replaceWith(container)});
 };
 const scan=root=>{if(root.nodeType===Node.TEXT_NODE){const label=root.parentElement?.closest('label');if(label)decorate(label);return}if(root.nodeType!==Node.ELEMENT_NODE)return;if(root.matches('label'))decorate(root);else{const parent=root.closest('label');if(parent)decorate(parent)}root.querySelectorAll('label').forEach(decorate)};
 const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')scan(record.target);else record.addedNodes.forEach(scan)}});
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});document.querySelectorAll('label').forEach(decorate);
})();
