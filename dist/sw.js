if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-3ba29ff7"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Cr5x1Ahj.js",revision:null},{url:"assets/main--9F_JUtI.js",revision:null},{url:"assets/main-Q38PkEvD.css",revision:null},{url:"index.html",revision:"64c243481b6c6e73e3cf22fd5dca9d96"},{url:"registerSW.js",revision:"c81614834fda31b96a8c581712b063fa"},{url:"service-worker.js",revision:"53bf46da5e187419d34df465646b9a5e"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"manifest.webmanifest",revision:"f4d45e97eb52fd7aa79d9a40fc726b84"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));