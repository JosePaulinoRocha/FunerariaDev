(()=>{"use strict";var e={948:(e,s,t)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.connect=async function(){return(0,o.createPool)({host:"localhost",user:"root",password:"",database:"funeraria_db",connectionLimit:10,timezone:"local"})};const o=t(498)},486:function(e,s,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0}),s.App=void 0;const r=o(t(577)),a=o(t(252)),n=o(t(96)),i=o(t(3)),l=o(t(271)),u="../../cliente/DirectoriCliente/";s.App=class{constructor(e){this.port=e,this.app=(0,a.default)(),this.settings(),this.middlewares(),this.routes()}settings(){this.app.set("port",this.port||process.env.PORT||3080),this.app.set("path",u)}allowCrossDomain(e,s,t){s.header("Access-Control-Allow-Origin","*"),s.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE"),s.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization, Content-Length"),"OPTIONS"==e.method?s.send(200):t()}middlewares(){this.app.use((0,n.default)("dev")),this.app.use((0,r.default)()),this.app.use(this.allowCrossDomain),this.app.use(a.default.json({limit:"1mb"})),this.app.use(a.default.urlencoded({extended:!0})),this.app.use(a.default.static(u))}routes(){this.app.use("/api/usuarios",l.default),this.app.get("*",(function(e,s){s.sendfile(i.default.join(u,"index.html"))}))}async listen(){this.app.listen(this.app.get("port")),console.log("server on port:",this.app.get("port"))}}},918:(e,s,t)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.UpdateUser=s.PostUsers=s.ObtenerUsuarios=s.Login=void 0;const o=t(948);s.Login=async(e,s)=>{const{email:t,password:r}=e.body;let a,n;try{a=await(0,o.connect)();const e="SELECT * FROM usuarios WHERE email = ?",s=(await a.query(e,[t]))[0];if(s.length>0){const e=s[0];n=e.password===r?e:null}else n=null}catch(e){console.log("Error en Login"),console.log(e),n=null}finally{return await(null==a?void 0:a.end()),n?s.json({success:!0,user:n}):s.status(401).json({success:!1,message:"Credenciales incorrectas"})}},s.ObtenerUsuarios=async(e,s)=>{let t,r;try{t=await(0,o.connect)();let e="SELECT * FROM usuarios";r=(await t.query(e))[0]}catch(e){console.log("Error en Usuarios"),console.log(e),r=null}finally{return await(null==t?void 0:t.end()),s.json(r)}},s.PostUsers=async(e,s)=>{let t,r;const{fullName:a,phone:n,email:i,isAdmin:l}=e.body;try{t=await(0,o.connect)();let e="SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";const[s]=await t.query(e,[i]);if(s.length>0&&s[0].count>0)r={message:"Email already exists. User not created."};else{e="INSERT INTO usuarios (fullName, phone, email, isAdmin, password) VALUES (?, ?, ?, ?, ?)";const s=[a,n,i,l,123456];await t.query(e,s),r={message:"User created successfully"}}}catch(e){console.log("Error en Usuarios"),console.log(e),r={message:"Error creating user"}}finally{return await(null==t?void 0:t.end()),s.json(r)}},s.UpdateUser=async(e,s)=>{let t,r;const{userId:a,fullName:n,phone:i,email:l,isAdmin:u}=e.body;try{t=await(0,o.connect)();let e="UPDATE usuarios SET fullName = ?, phone = ?, email = ?, isAdmin = ? WHERE userId = ?";const s=[n,i,l,u,a];await t.query(e,s),r={message:"User updated successfully"}}catch(e){console.log("Error en Usuarios"),console.log(e),r={message:"Error updating user"}}finally{return await(null==t?void 0:t.end()),s.json(r)}}},271:(e,s,t)=>{Object.defineProperty(s,"__esModule",{value:!0});const o=t(252),r=t(918),a=(0,o.Router)();a.get("/GetUsuarios",r.ObtenerUsuarios),a.post("/PostUsers",r.PostUsers),a.put("/UpdateUser",r.UpdateUser),a.post("/login",r.Login),s.default=a},577:e=>{e.exports=require("cors")},252:e=>{e.exports=require("express")},96:e=>{e.exports=require("morgan")},498:e=>{e.exports=require("mysql2/promise")},3:e=>{e.exports=require("path")}},s={};function t(o){var r=s[o];if(void 0!==r)return r.exports;var a=s[o]={exports:{}};return e[o].call(a.exports,a,a.exports,t),a.exports}(()=>{const e=t(486);!async function(){const s=new e.App(3080);await s.listen()}()})()})();