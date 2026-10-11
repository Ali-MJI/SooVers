import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const args=process.argv.slice(2),arg=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
const root=path.resolve(arg('--root',fileURLToPath(new URL('../local-dist',import.meta.url))));
const port=Number(arg('--port',process.env.PORT||'8080')),host=process.env.HOST||'127.0.0.1';
const base='/'+(process.env.BASE_PATH||'').replace(/^\/+|\/+$/g,'');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.md':'text/markdown; charset=utf-8'};
await stat(path.join(root,'index.html'));
const server=http.createServer(async(req,res)=>{
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()'};
 const send=(status,body,extra={})=>{res.writeHead(status,{...headers,...extra});res.end(req.method==='HEAD'?undefined:body);};
 if(!['GET','HEAD'].includes(req.method||''))return send(405,'Method not allowed',{'Allow':'GET, HEAD'});
 try{
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/healthz')return send(200,JSON.stringify({status:'ok',app:'SooVers',version:'0.4.0'}),{'Content-Type':'application/json'});
  if(base!=='/'){if(pathname===base)return send(308,'',{'Location':base+'/'});if(!pathname.startsWith(base+'/'))return send(404,'Not found');pathname=pathname.slice(base.length);}
  if(pathname.split('/').some(p=>p.startsWith('.')||p.includes('\\'))||pathname.includes('\0'))return send(404,'Not found');
  let file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep))return send(404,'Not found');
  if(pathname.endsWith('/'))file=path.join(file,'index.html');
  const data=await readFile(file);return send(200,data,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'});
 }catch(error){return send(error instanceof URIError?400:404,'Not found');}
});
server.listen(port,host,()=>console.log(`SooVers 0.4 · ${host}:${port}${base} · ${root}`));
