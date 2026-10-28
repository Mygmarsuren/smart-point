'use strict';
// Large code collections are gzip packed in the same atomic localStorage snapshot.
// Keep legacy, uncompressed workspaces readable.
window.SmartPointCodeStorage={
  async read(key,raw=null){const data=JSON.parse(raw??localStorage.getItem(key)??'null');if(!data)return null;if(data.codesEncoding==='gzip-base64-v1'){const bytes=Uint8Array.from(atob(data.codesPacked),c=>c.charCodeAt(0));const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));data.codes=JSON.parse(await new Response(stream).text())}return data},
  async prepare(data){if(data.codes.length<500&&!data.codesEncoding)return;const stream=new Blob([JSON.stringify(data.codes)]).stream().pipeThrough(new CompressionStream('gzip')),bytes=new Uint8Array(await new Response(stream).arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));data.codesPacked=btoa(binary);data.codesEncoding='gzip-base64-v1'},
  stringify(data){return JSON.stringify(data,(key,value)=>key==='codes'&&data.codesEncoding==='gzip-base64-v1'?undefined:value)},
  async write(key,data){await this.prepare(data);localStorage.setItem(key,this.stringify(data))},
  async lock(key,work){return navigator.locks?navigator.locks.request('smartpoint-workspace:'+key,work):work()}
};
