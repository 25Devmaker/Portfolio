import { useState, useEffect } from "react";

// ── THEME ─────────────────────────────────────────────────────────────────────
const C = {
  bg:      "#1a1a1a",
  bgCard:  "#222222",
  bgDeep:  "#141414",
  orange:  "#E8541A",
  orangeL: "#FF6B35",
  white:   "#FFFFFF",
  gray:    "#AAAAAA",
  grayD:   "#555555",
  border:  "rgba(232,84,26,0.25)",
};
const PX = "'Press Start 2P', monospace";
const SF = "'Inter', sans-serif";

const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; color: ${C.white}; font-family: ${SF}; overflow-x: hidden; }
  ::selection { background: ${C.orange}; color: #fff; }
  ::-webkit-scrollbar { width: 6px; background: ${C.bgDeep}; }
  ::-webkit-scrollbar-thumb { background: ${C.orange}; border-radius: 3px; }
  input, textarea { font-family: ${SF}; outline: none; }
  @keyframes float1  { 0%,100%{transform:translateY(0) rotate(12deg)}  50%{transform:translateY(-18px) rotate(22deg)} }
  @keyframes float2  { 0%,100%{transform:translateY(0) rotate(-8deg)}  50%{transform:translateY(-24px) rotate(-18deg)} }
  @keyframes float3  { 0%,100%{transform:translateY(0) rotate(45deg)}  50%{transform:translateY(-14px) rotate(55deg)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes popIn   { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(232,84,26,0.4)} 50%{box-shadow:0 0 0 12px rgba(232,84,26,0)} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes walkPx  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes rocketBob { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
`;

// ── FLOATING CUBE ─────────────────────────────────────────────────────────────
const Cube = ({ size=40, color=C.orange, style={}, anim="float1", delay="0s" }) => (
  <div style={{
    width:size, height:size,
    background:`linear-gradient(135deg,${color} 0%,rgba(0,0,0,0.45) 100%)`,
    borderRadius:6,
    boxShadow:`${size*.15}px ${size*.15}px 0 rgba(0,0,0,0.55),inset -${size*.1}px -${size*.1}px 0 rgba(0,0,0,0.3),inset ${size*.07}px ${size*.07}px 0 rgba(255,255,255,0.12)`,
    animation:`${anim} ${3.5}s ease-in-out ${delay} infinite`,
    flexShrink:0, ...style,
  }}/>
);

// ── PIXEL AVATAR ──────────────────────────────────────────────────────────────
const PixelAvatar = ({ px=9 }) => {
  const rows = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [0,1,2,1,1,2,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,3,3,3,3,1,0],
    [0,0,1,1,1,1,0,0],
    [0,1,4,4,4,4,1,0],
    [0,1,4,4,4,4,1,0],
    [0,1,4,4,4,4,1,0],
    [0,0,1,4,4,1,0,0],
    [0,0,1,4,4,1,0,0],
    [0,0,5,0,0,5,0,0],
  ];
  const pal = {0:"transparent",1:"#C68642",2:"#2244DD",3:"#8B4513",4:C.orange,5:"#333"};
  return (
    <div style={{display:"inline-block",imageRendering:"pixelated",animation:"walkPx 0.9s ease-in-out infinite"}}>
      {rows.map((row,ri)=>(
        <div key={ri} style={{display:"flex"}}>
          {row.map((c,ci)=><div key={ci} style={{width:px,height:px,background:pal[c]}}/>)}
        </div>
      ))}
    </div>
  );
};

// ── PIXEL ROBOT ───────────────────────────────────────────────────────────────
const PixelRobot = ({ px=11 }) => {
  const rows = [
    "001110","011111","010101","011111","001110",
    "000100","011110","111111","110011","111111","011110",
    "010010","010010","110011",
  ];
  return (
    <div style={{display:"inline-block",imageRendering:"pixelated",animation:"rocketBob 2.5s ease-in-out infinite"}}>
      {rows.map((row,ri)=>(
        <div key={ri} style={{display:"flex"}}>
          {row.split("").map((c,ci)=><div key={ci} style={{width:px,height:px,background:c==="1"?C.orange:"transparent"}}/>)}
        </div>
      ))}
    </div>
  );
};

// ── SOCIAL ICON ───────────────────────────────────────────────────────────────
const SocialIcon = ({ icon, href }) => {
  const [hov,setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        width:38,height:38,
        background:hov?C.orange:"rgba(255,255,255,0.05)",
        border:`1px solid ${hov?C.orange:"rgba(255,255,255,0.1)"}`,
        borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:15,color:hov?"#fff":C.gray,textDecoration:"none",
        transition:"all 0.2s",cursor:"pointer",
      }}>{icon}</a>
  );
};

// ── BUTTON ─────────────────────────────────────────────────────────────────────
const OBtn = ({ children, onClick, outline=false, style={} }) => {
  const [hov,setHov]=useState(false);
  return (
    <button
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={onClick}
      style={{
        fontFamily:SF,fontSize:14,fontWeight:600,
        color:outline?(hov?"#fff":C.orange):"#fff",
        background:outline?"transparent":(hov?C.orangeL:C.orange),
        border:`2px solid ${C.orange}`,borderRadius:8,
        padding:"12px 28px",cursor:"pointer",
        transition:"all 0.2s",
        animation:!outline?"pulse 2.5s infinite":"none",
        ...style,
      }}>{children}</button>
  );
};

// ── NAV ───────────────────────────────────────────────────────────────────────
const Nav = ({ active, setActive }) => {
  const [sc,setSc]=useState(false);
  useEffect(()=>{
    const fn=()=>setSc(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:200,
      background:sc?"rgba(20,20,20,0.96)":"transparent",
      backdropFilter:sc?"blur(14px)":"none",
      borderBottom:sc?`1px solid ${C.border}`:"none",
      height:64,padding:"0 40px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      transition:"all 0.3s",
    }}>
      <div style={{fontFamily:SF,fontSize:18,fontWeight:700,color:"#fff",cursor:"pointer",letterSpacing:-0.5}}
        onClick={()=>setActive("HOME")}>
        Black<span style={{color:C.orange}}>Orange</span>
      </div>
      <div style={{display:"flex",gap:2}}>
        {["HOME","ABOUT","SKILLS","PROJECTS","CONTACT"].map(it=>(
          <button key={it} onClick={()=>setActive(it)} style={{
            fontFamily:SF,fontSize:13,fontWeight:500,
            color:active===it?C.orange:C.gray,
            background:"transparent",border:"none",
            padding:"8px 14px",cursor:"pointer",
            borderBottom:active===it?`2px solid ${C.orange}`:"2px solid transparent",
            transition:"all 0.2s",
          }}>{it}</button>
        ))}
      </div>
    </nav>
  );
};

// ── HERO ──────────────────────────────────────────────────────────────────────
const Hero = ({ setActive }) => {
  const [typed,setTyped]=useState("");
  const [cur,setCur]=useState(true);
  const FULL="A Full Stack & ML Developer.";
  useEffect(()=>{
    let i=0;
    const t=setInterval(()=>{setTyped(FULL.slice(0,++i));if(i>=FULL.length)clearInterval(t);},60);
    const c=setInterval(()=>setCur(p=>!p),530);
    return ()=>{clearInterval(t);clearInterval(c);};
  },[]);
  return (
    <section style={{
      minHeight:"100vh",background:C.bgDeep,
      border:`1px solid ${C.border}`,borderRadius:20,
      margin:"12px",padding:"0 60px 0 100px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      position:"relative",overflow:"hidden",
      boxShadow:`inset 0 0 140px rgba(232,84,26,0.04)`,
    }}>
      {/* Border glow */}
      <div style={{position:"absolute",inset:0,borderRadius:20,border:`1px solid ${C.border}`,pointerEvents:"none"}}/>

      {/* Floating cubes */}
      <Cube size={50} style={{position:"absolute",top:90,right:200}} anim="float1" delay="0s"/>
      <Cube size={30} color="#333" style={{position:"absolute",top:70,right:100,opacity:0.7}} anim="float2" delay="0.5s"/>
      <Cube size={56} style={{position:"absolute",bottom:110,right:140,opacity:0.8}} anim="float3" delay="1s"/>
      <Cube size={22} color="#444" style={{position:"absolute",bottom:70,left:320,opacity:0.5}} anim="float2" delay="0.8s"/>
      <Cube size={38} style={{position:"absolute",top:160,right:360,opacity:0.4}} anim="float1" delay="1.5s"/>

      {/* Social sidebar */}
      <div style={{position:"absolute",left:24,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:10}}>
        <SocialIcon icon="📷" href="#"/>
        <SocialIcon icon="🐦" href="#"/>
        <SocialIcon icon="📘" href="#"/>
        <SocialIcon icon="▶"  href="#"/>
      </div>

      {/* Left content */}
      <div style={{maxWidth:500,animation:"fadeUp 0.8s ease both"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
          <div style={{width:28,height:2,background:C.orange}}/>
          <span style={{fontFamily:SF,fontSize:13,color:C.gray,letterSpacing:3}}>Hello</span>
        </div>
        <h1 style={{fontFamily:SF,fontWeight:700,fontSize:"clamp(30px,4vw,50px)",color:"#fff",lineHeight:1.2,marginBottom:14}}>
          I'm <span style={{color:C.orange}}>Dev_Placeholder</span>
        </h1>
        <p style={{fontFamily:SF,fontSize:14,color:C.gray,marginBottom:10,minHeight:22}}>
          {typed}<span style={{opacity:cur?1:0,color:C.orange}}>|</span>
        </p>
        <p style={{fontFamily:SF,fontSize:14,color:C.grayD,marginBottom:36,lineHeight:1.8}}>
          Passionate about building intelligent systems and beautiful interfaces.
          Interning at CodeAlpha — crafting ML models and pixel-perfect UIs.
        </p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <OBtn onClick={()=>setActive("PROJECTS")}>Learn more</OBtn>
          <OBtn outline onClick={()=>setActive("CONTACT")}>Contact me</OBtn>
        </div>
        <div style={{marginTop:40}}>
          <span style={{fontFamily:SF,fontSize:11,color:C.grayD,letterSpacing:3}}>↓ scroll down</span>
        </div>
      </div>

      {/* Right — avatar orb */}
      <div style={{position:"relative",animation:"float1 4s ease-in-out infinite",flexShrink:0}}>
        <div style={{
          width:300,height:300,borderRadius:"50%",
          background:"radial-gradient(circle at 38% 32%, #2a2a2a, #0e0e0e)",
          border:`2px solid rgba(232,84,26,0.18)`,
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:`0 24px 70px rgba(0,0,0,0.6),0 0 50px rgba(232,84,26,0.08)`,
          position:"relative",overflow:"hidden",
        }}>
          <PixelAvatar px={11}/>
          <div style={{position:"absolute",inset:-1,borderRadius:"50%",border:`2px solid ${C.orange}`,opacity:0.25}}/>
        </div>
        <Cube size={22} style={{position:"absolute",top:-12,right:-8}} anim="float2" delay="0.3s"/>
        <Cube size={16} color="#555" style={{position:"absolute",bottom:12,left:-18}} anim="float3" delay="0.7s"/>
        {/* Orbiting dot */}
        <div style={{position:"absolute",top:"50%",left:"50%",width:320,height:320,marginLeft:-160,marginTop:-160,borderRadius:"50%",border:"1px dashed rgba(232,84,26,0.12)",pointerEvents:"none"}}/>
      </div>
    </section>
  );
};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
const About = () => {
  const works = [
    {title:"Credit Scoring",   sub:"ML · Random Forest",        link:"https://github.com/25Devmaker/code-alpha_tasks"},
    {title:"Disease Prediction",sub:"SVM · Breast Cancer",       link:"https://github.com/25Devmaker/code-alpha_tasks"},
    {title:"This Portfolio",   sub:"React · Dark Orange theme",  link:"#"},
  ];
  return (
    <section style={{minHeight:"100vh",padding:"80px 52px",background:C.bg}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:48,alignItems:"start",marginBottom:64}}>
          {/* Photo block */}
          <div style={{
            width:220,height:270,background:"#252525",
            border:`1px solid ${C.border}`,borderRadius:14,
            display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14,
            boxShadow:`8px 8px 0 rgba(232,84,26,0.12)`,
            animation:"fadeUp 0.7s both",overflow:"hidden",
          }}>
            <PixelAvatar px={12}/>
            <span style={{fontFamily:PX,fontSize:7,color:C.orange}}>DEV_PH</span>
          </div>
          {/* Bio */}
          <div style={{animation:"fadeUp 0.7s 0.15s both"}}>
            <h2 style={{fontFamily:SF,fontSize:26,fontWeight:700,color:"#fff",marginBottom:12}}>About me</h2>
            <p style={{fontFamily:SF,fontSize:16,fontWeight:600,color:C.orange,marginBottom:14}}>
              I will Design &amp; Develop the best websites
            </p>
            <p style={{fontFamily:SF,fontSize:14,color:C.gray,lineHeight:1.85,marginBottom:14}}>
              Hey! I'm a passionate developer and ML enthusiast completing my internship at CodeAlpha.
              I build things — from machine learning models that predict diseases and credit scores,
              to pixel-perfect UIs. I believe in open source, clean code, and bold design.
            </p>
            <p style={{fontFamily:SF,fontSize:14,color:C.gray,lineHeight:1.85}}>
              Currently grinding skills in React, Python, scikit-learn, and everything in between.
              My goal: make the digital world accessible for everyone.
            </p>
          </div>
        </div>

        {/* Featured Works */}
        <div style={{animation:"fadeUp 0.7s 0.3s both"}}>
          <h3 style={{fontFamily:SF,fontSize:22,fontWeight:600,color:"#fff",marginBottom:20}}>Featured Works</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
            {works.map((w,i)=>{
              const [hov,setHov]=useState(false);
              return (
                <div key={w.title}
                  onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{
                    background:C.bgCard,
                    border:`1px solid ${hov?C.orange:"rgba(255,255,255,0.07)"}`,
                    borderRadius:10,padding:"20px 18px",
                    transition:"all 0.2s",transform:hov?"translateY(-4px)":"none",
                    boxShadow:hov?`0 8px 24px rgba(232,84,26,0.12)`:"none",
                    animation:`popIn 0.5s ${i*0.12}s both`,
                  }}>
                  <h4 style={{fontFamily:SF,fontSize:15,fontWeight:600,color:"#fff",marginBottom:6}}>{w.title}</h4>
                  <p style={{fontFamily:SF,fontSize:12,color:C.gray,marginBottom:14,lineHeight:1.6}}>{w.sub}</p>
                  <a href={w.link} target="_blank" rel="noreferrer" style={{fontFamily:SF,fontSize:12,fontWeight:600,color:C.orange,textDecoration:"none",borderBottom:`1px solid rgba(232,84,26,0.3)`,paddingBottom:2}}>View live →</a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── SKILLS ─────────────────────────────────────────────────────────────────────
const Skills = () => {
  const skills=[
    {icon:"🌐",name:"HTML"},{icon:"🎨",name:"CSS"},{icon:"⚡",name:"JavaScript"},
    {icon:"⚛",name:"React"},{icon:"🐍",name:"Python"},{icon:"🤖",name:"sklearn"},
    {icon:"🐼",name:"Pandas"},{icon:"📓",name:"Jupyter"},{icon:"🐙",name:"GitHub"},
    {icon:"💻",name:"VS Code"},{icon:"🔧",name:"Node.js"},{icon:"🗄",name:"SQL"},
  ];
  const [hov,setHov]=useState(null);
  return (
    <section style={{minHeight:"100vh",padding:"80px 52px",background:C.bgDeep}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{fontFamily:SF,fontSize:26,fontWeight:700,color:"#fff",marginBottom:8,animation:"fadeUp 0.7s both"}}>My Skills</h2>
        <div style={{width:48,height:3,background:C.orange,marginBottom:44,animation:"slideIn 0.7s 0.2s both"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:14,marginBottom:52}}>
          {skills.map((sk,i)=>(
            <div key={sk.name} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{
                display:"flex",flexDirection:"column",alignItems:"center",gap:8,
                padding:"16px 10px",
                background:hov===i?"rgba(232,84,26,0.1)":"rgba(255,255,255,0.03)",
                border:`1px solid ${hov===i?C.orange:"rgba(255,255,255,0.07)"}`,
                borderRadius:10,cursor:"default",
                transition:"all 0.2s",transform:hov===i?"translateY(-4px)":"none",
                animation:`popIn 0.5s ${i*0.05}s both`,
              }}>
              <span style={{fontSize:26}}>{sk.icon}</span>
              <span style={{fontFamily:SF,fontSize:11,color:hov===i?C.orange:C.gray,fontWeight:500}}>{sk.name}</span>
            </div>
          ))}
        </div>
        {/* Proficiency bars */}
        <h3 style={{fontFamily:SF,fontSize:18,fontWeight:600,color:"#fff",marginBottom:24}}>Proficiency</h3>
        {[
          {name:"Python & ML",pct:85},{name:"React / JS",pct:75},
          {name:"CSS / Design",pct:80},{name:"Git & DevOps",pct:72},
        ].map((bar,i)=>(
          <div key={bar.name} style={{marginBottom:18,animation:`fadeUp 0.5s ${i*0.1}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontFamily:SF,fontSize:13,color:C.gray}}>{bar.name}</span>
              <span style={{fontFamily:SF,fontSize:13,color:C.orange,fontWeight:600}}>{bar.pct}%</span>
            </div>
            <div style={{height:6,background:"rgba(255,255,255,0.06)",borderRadius:3}}>
              <div style={{width:`${bar.pct}%`,height:"100%",background:`linear-gradient(90deg,${C.orange},${C.orangeL})`,borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── LANG META ─────────────────────────────────────────────────────────────────
const LICON={Python:"🐍",JavaScript:"⚡",TypeScript:"💎",HTML:"🌐",CSS:"🎨",Jupyter:"📓",Java:"☕","C++":"🔧",default:"📦"};
const getLI=l=>LICON[l]||LICON.default;
const getR=s=>s>=10?"LEGENDARY":s>=3?"EPIC":s>=1?"RARE":"COMMON";
const RC={COMMON:C.grayD,RARE:"#4488ff",EPIC:"#aa44ff",LEGENDARY:C.orange};

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const Projects = () => {
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [filter,setFilter]=useState("ALL");

  useEffect(()=>{
    fetch("https://api.github.com/users/25Devmaker/repos?sort=updated&per_page=100")
      .then(r=>{if(!r.ok)throw new Error(`GitHub API ${r.status}`);return r.json();})
      .then(d=>{
        setRepos(d.filter(r=>!r.fork).sort((a,b)=>b.stargazers_count-a.stargazers_count||new Date(b.updated_at)-new Date(a.updated_at)));
        setLoading(false);
      })
      .catch(e=>{setError(e.message);setLoading(false);});
  },[]);

  const langs=["ALL",...new Set(repos.map(r=>r.language).filter(Boolean))];
  const filtered=filter==="ALL"?repos:repos.filter(r=>r.language===filter);

  return (
    <section style={{minHeight:"100vh",padding:"80px 52px",background:C.bg}}>
      <div style={{maxWidth:1060,margin:"0 auto"}}>
        <h2 style={{fontFamily:SF,fontSize:26,fontWeight:700,color:"#fff",marginBottom:8}}>Featured Works</h2>
        <div style={{width:48,height:3,background:C.orange,marginBottom:36}}/>

        {!loading&&!error&&(
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32}}>
            {langs.map(lang=>(
              <button key={lang} onClick={()=>setFilter(lang)} style={{
                fontFamily:SF,fontSize:12,fontWeight:500,
                color:filter===lang?"#fff":C.gray,
                background:filter===lang?C.orange:"rgba(255,255,255,0.05)",
                border:`1px solid ${filter===lang?C.orange:"rgba(255,255,255,0.1)"}`,
                borderRadius:20,padding:"6px 16px",cursor:"pointer",transition:"all 0.15s",
              }}>{lang}</button>
            ))}
          </div>
        )}

        {loading&&(
          <div style={{textAlign:"center",padding:80}}>
            <div style={{width:40,height:40,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.orange}`,borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 20px"}}/>
            <p style={{fontFamily:SF,fontSize:14,color:C.gray}}>Fetching repos from GitHub...</p>
          </div>
        )}
        {error&&(
          <div style={{background:"#1a0a0a",border:`1px solid rgba(232,84,26,0.4)`,borderRadius:10,padding:24}}>
            <p style={{fontFamily:SF,fontSize:14,color:C.orange}}>⚠ {error}</p>
          </div>
        )}

        {!loading&&!error&&(
          <>
            <p style={{fontFamily:SF,fontSize:12,color:C.grayD,marginBottom:20}}>{filtered.length} repositories</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
              {filtered.map((repo,i)=>{
                const [hov,setHov]=useState(false);
                const rarity=getR(repo.stargazers_count);
                const updated=new Date(repo.updated_at).toLocaleDateString("en-GB",{month:"short",year:"numeric"});
                return (
                  <div key={repo.id}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{
                      background:C.bgCard,
                      border:`1px solid ${hov?C.orange:"rgba(255,255,255,0.07)"}`,
                      borderRadius:12,padding:"22px 20px",
                      display:"flex",flexDirection:"column",
                      transition:"all 0.2s",transform:hov?"translateY(-5px)":"none",
                      boxShadow:hov?`0 12px 32px rgba(232,84,26,0.12)`:"0 2px 8px rgba(0,0,0,0.3)",
                      animation:`popIn 0.4s ${Math.min(i,10)*0.05}s both`,
                    }}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <span style={{fontSize:22}}>{getLI(repo.language)}</span>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <span style={{fontFamily:SF,fontSize:10,fontWeight:700,color:RC[rarity],letterSpacing:1}}>{rarity}</span>
                        {repo.stargazers_count>0&&<span style={{fontFamily:SF,fontSize:11,color:C.orange}}>⭐ {repo.stargazers_count}</span>}
                      </div>
                    </div>
                    <h4 style={{fontFamily:SF,fontSize:14,fontWeight:600,color:"#fff",marginBottom:8,lineHeight:1.4}}>{repo.name}</h4>
                    <p style={{fontFamily:SF,fontSize:13,color:C.gray,lineHeight:1.7,flex:1,marginBottom:14,opacity:repo.description?1:0.4}}>
                      {repo.description||"No description yet."}
                    </p>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,alignItems:"center"}}>
                      {repo.language&&<span style={{fontFamily:SF,fontSize:10,fontWeight:600,color:C.orange,background:"rgba(232,84,26,0.1)",border:`1px solid rgba(232,84,26,0.2)`,borderRadius:4,padding:"2px 8px"}}>{repo.language}</span>}
                      {repo.topics?.slice(0,2).map(t=><span key={t} style={{fontFamily:SF,fontSize:10,color:C.grayD,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:4,padding:"2px 8px"}}>{t}</span>)}
                      <span style={{fontFamily:SF,fontSize:10,color:C.grayD,marginLeft:"auto"}}>{updated}</span>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>window.open(repo.html_url,"_blank")} style={{flex:1,fontFamily:SF,fontSize:12,fontWeight:600,color:"#fff",background:C.orange,border:"none",borderRadius:7,padding:"9px 0",cursor:"pointer",transition:"background 0.15s"}}>View code →</button>
                      {repo.homepage&&<button onClick={()=>window.open(repo.homepage,"_blank")} style={{flex:1,fontFamily:SF,fontSize:12,fontWeight:600,color:C.orange,background:"transparent",border:`1px solid ${C.orange}`,borderRadius:7,padding:"9px 0",cursor:"pointer"}}>Live demo →</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// ── CONTACT ───────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form,setForm]=useState({name:"",email:"",phone:"",location:"",message:""});
  const [sent,setSent]=useState(false);
  const submit=()=>{
    if(form.name&&form.email&&form.message){
      setSent(true);setTimeout(()=>setSent(false),3500);
      setForm({name:"",email:"",phone:"",location:"",message:""});
    }
  };
  const iStyle={fontFamily:SF,fontSize:14,background:"rgba(255,255,255,0.04)",color:"#fff",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:8,padding:"12px 16px",width:"100%",transition:"border-color 0.2s"};
  return (
    <section style={{minHeight:"100vh",padding:"80px 52px",background:C.bgDeep}}>
      <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
        {/* Left */}
        <div style={{animation:"fadeUp 0.7s both"}}>
          <h2 style={{fontFamily:SF,fontSize:26,fontWeight:700,color:"#fff",marginBottom:8}}>Get a quote</h2>
          <div style={{width:48,height:3,background:C.orange,marginBottom:24}}/>
          <p style={{fontFamily:SF,fontSize:14,color:C.gray,lineHeight:1.85,marginBottom:32}}>
            Have a project in mind? Want to collaborate or just say hi?
            Drop me a message and I'll get back to you as soon as possible.
          </p>
          {[
            {icon:"📧",label:"Email",val:"placeholder@email.com"},
            {icon:"📍",label:"Location",val:"Your City, Country"},
            {icon:"🐙",label:"GitHub",val:"github.com/25Devmaker"},
          ].map(c=>(
            <div key={c.label} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
              <div style={{width:36,height:36,background:"rgba(232,84,26,0.1)",border:`1px solid rgba(232,84,26,0.2)`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{fontFamily:SF,fontSize:11,color:C.grayD,marginBottom:2}}>{c.label}</div>
                <div style={{fontFamily:SF,fontSize:13,color:"#fff"}}>{c.val}</div>
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:28}}>
            <SocialIcon icon="🐙" href="https://github.com/25Devmaker"/>
            <SocialIcon icon="🐦" href="#"/>
            <SocialIcon icon="💼" href="#"/>
            <SocialIcon icon="📷" href="#"/>
          </div>
          {/* Pixel robot decoration */}
          <div style={{marginTop:32}}>
            <PixelRobot px={8}/>
          </div>
        </div>

        {/* Right form */}
        {sent?(
          <div style={{background:C.bgCard,border:`1px solid ${C.orange}`,borderRadius:12,padding:40,textAlign:"center",boxShadow:`0 0 40px rgba(232,84,26,0.15)`,animation:"popIn 0.4s both"}}>
            <div style={{fontSize:56,marginBottom:16}}>✅</div>
            <h3 style={{fontFamily:SF,fontSize:20,fontWeight:600,color:"#fff",marginBottom:8}}>Message Sent!</h3>
            <p style={{fontFamily:SF,fontSize:14,color:C.gray}}>I'll get back to you soon.</p>
          </div>
        ):(
          <div style={{background:C.bgCard,border:`1px solid rgba(255,255,255,0.07)`,borderRadius:12,padding:32,animation:"fadeUp 0.7s 0.15s both"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              {[
                {key:"name",ph:"Your Full Name",label:"Full Name"},
                {key:"email",ph:"your@email.com",label:"Email"},
                {key:"phone",ph:"+1 234 567 890",label:"Phone"},
                {key:"location",ph:"Your City",label:"Location"},
              ].map(f=>(
                <div key={f.key}>
                  <div style={{fontFamily:SF,fontSize:11,color:C.gray,marginBottom:6}}>{f.label}</div>
                  <input placeholder={f.ph} value={form[f.key]} style={iStyle}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    onFocus={e=>e.target.style.borderColor=C.orange}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:SF,fontSize:11,color:C.gray,marginBottom:6}}>Type your message</div>
              <textarea rows={4} placeholder="Tell me about your project..." value={form.message}
                style={{...iStyle,resize:"vertical"}}
                onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                onFocus={e=>e.target.style.borderColor=C.orange}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}
              />
            </div>
            <OBtn onClick={submit} style={{width:"100%",display:"block",textAlign:"center"}}>Send message →</OBtn>
          </div>
        )}
      </div>
    </section>
  );
};

// ── TICKER ─────────────────────────────────────────────────────────────────────
const Ticker = () => {
  const items=["REACT","PYTHON","MACHINE LEARNING","CODEALPHA INTERN","SKLEARN","OPEN SOURCE","GITHUB: 25DEVMAKER","FULL STACK DEV"];
  const txt=items.join("   ·   ");
  return (
    <div style={{background:C.orange,overflow:"hidden",height:36,display:"flex",alignItems:"center"}}>
      <div style={{display:"flex",animation:"marquee 22s linear infinite",whiteSpace:"nowrap"}}>
        {[txt,txt].map((t,i)=><span key={i} style={{fontFamily:SF,fontSize:11,fontWeight:600,color:"#fff",padding:"0 30px",letterSpacing:2}}>{t}</span>)}
      </div>
    </div>
  );
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active,setActive]=useState("HOME");
  const S={HOME:Hero,ABOUT:About,SKILLS:Skills,PROJECTS:Projects,CONTACT:Contact};
  const Section=S[active];
  return (
    <div style={{minHeight:"100vh",position:"relative"}}>
      <style>{GLOBAL}</style>
      <Nav active={active} setActive={setActive}/>
      <div style={{paddingTop:active==="HOME"?0:64}}>
        <Section setActive={setActive}/>
      </div>
      <Ticker/>
      <div style={{background:C.bgDeep,borderTop:`1px solid ${C.border}`,padding:"20px 52px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:SF,fontSize:13,color:C.grayD}}>© 2025 Dev_Placeholder · All rights reserved.</span>
        <span style={{fontFamily:SF,fontSize:13,color:C.grayD}}>Built with <span style={{color:C.orange}}>React</span> ❤</span>
      </div>
    </div>
  );
}