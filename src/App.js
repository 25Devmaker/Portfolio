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

// ── SVG PATHS ─────────────────────────────────────────────────────────────────
const SVGS = {
  github:   "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  twitter:  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  instagram:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  youtube:  "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  email:    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  html:     "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
  css:      "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z",
  js:       "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.704-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
  react:    "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.353.803-1.skipping-2.907 1.353-2.907 1.353 0 3.108.592 4.905 1.'731zm-2.648 28.673c1.346 0 3.107-.96 4.888-2.622 1.78 1.653 3.542 2.602 4.887 2.602.41 0 .783-.093 1.106-.278 1.353-.803 1.skipping-2.907-1.353-2.907-1.353 0-3.108-.592-4.905-1.731zM5.559 8.03c.782-1.353 2.906-1.353 2.906 0 0 3.108-.592 4.905-1.731-.632-1.093-1.351-2.073-2.003-2.907zm12.882 0c.782 1.353-.553 2.907-2.906 2.907 0-3.108.592-4.905 1.731-.632 1.093 1.351 2.073 2.003 2.907zM12 8.164c-1.797 0-3.541.553-4.905 1.731C5.731 11.09 5.138 12.834 5.138 14.63c0 1.797.593 3.541 1.731 4.905 1.364 1.178 3.108 1.731 4.905 1.731s3.541-.553 4.905-1.731c1.138-1.364 1.731-3.108 1.731-4.905 0-1.796-.593-3.54-1.731-4.904C15.541 8.717 13.797 8.164 12 8.164z",
  python:   "M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.034v-2.867s-.109-3.402 3.351-3.402h5.766s3.24.052 3.24-3.131V3.333S18.28 0 11.914 0zm-3.21 1.922a1.046 1.046 0 1 1 0 2.093 1.046 1.046 0 0 1 0-2.093zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.034v2.867s.109 3.402-3.351 3.402H9.446s-3.24-.052-3.24 3.131v5.199S5.72 24 12.086 24zm3.21-1.922a1.046 1.046 0 1 1 0-2.093 1.046 1.046 0 0 1 0 2.093z",
  vscode:   "M0 12C0 5.373 5.373 0 12 0c3.138 0 5.979 1.2 8.095 3.155L8.093 15.157 3.954 11.02 2.54 12.433l5.557 5.557 13.072-13.07A11.953 11.953 0 0 1 24 12c0 6.627-5.373 12-12 12S0 18.627 0 12z",
  node:     "M11.998 24a1.321 1.321 0 0 1-.65-.17L8.12 21.82c-.306-.172-.157-.232-.055-.267.577-.2.693-.245 1.308-.593.064-.037.149-.022.214.017l2.501 1.487a.325.325 0 0 0 .301 0l9.741-5.625a.306.306 0 0 0 .151-.264V7.417a.31.31 0 0 0-.153-.267l-9.739-5.622a.302.302 0 0 0-.3 0L2.353 7.149a.311.311 0 0 0-.154.268v11.25c0 .109.059.211.153.265l2.668 1.54c1.448.724 2.334-.129 2.334-.986V8.29c0-.158.127-.281.285-.281h1.244c.156 0 .285.123.285.281v11.196c0 1.93-1.052 3.037-2.883 3.037-.563 0-1.006 0-2.243-.609L1.35 20.52A1.32 1.32 0 0 1 .698 19.38V8.13A1.326 1.326 0 0 1 1.35 6.99L11.093.275a1.38 1.38 0 0 1 1.312 0l9.741 5.716a1.326 1.326 0 0 1 .654 1.14v11.25a1.33 1.33 0 0 1-.654 1.142l-9.741 5.717a1.322 1.322 0 0 1-.407-.16z",
  sql:      "M12 0C7.373 0 2 1.8 2 5v14c0 3.2 5.373 5 10 5s10-1.8 10-5V5c0-3.2-5.373-5-10-5zm0 2c4.687 0 8 1.57 8 3s-3.313 3-8 3-8-1.57-8-3 3.313-3 8-3zm0 18c-4.687 0-8-1.57-8-3V8.83C5.78 9.854 8.735 10.5 12 10.5s6.22-.646 8-1.67V17c0 1.43-3.313 3-8 3z",
  sklearn:  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  pandas:   "M9 3H7v7h2V3zm8 0h-2v7h2V3zM9 14H7v7h2v-7zm8 0h-2v7h2v-7zm-4-5h-2v10h2V9z",
  jupyter:  "M14.25 2.175C8.047 2.175 3 7.222 3 13.425S8.047 24.675 14.25 24.675s11.25-5.047 11.25-11.25-5.047-11.25-11.25-11.25zm0 20.25c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9zm.75-13.5h-1.5v6h1.5v-6zm0 7.5h-1.5v1.5h1.5v-1.5z",
  huggingface:"M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"
};

// ── SOCIAL ICON ───────────────────────────────────────────────────────────────
const SocialIcon = ({ type, href }) => {
  const [hov,setHov] = useState(false);
  const path = SVGS[type] || SVGS.github;
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        width:38,height:38,
        background:hov?C.orange:"rgba(255,255,255,0.05)",
        border:`1px solid ${hov?C.orange:"rgba(255,255,255,0.1)"}`,
        borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
        textDecoration:"none",transition:"all 0.2s",cursor:"pointer",
        color:hov?"#fff":C.gray,flexShrink:0,
      }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d={path}/>
      </svg>
    </a>
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
        <SocialIcon type="github"   href="https://github.com/25Devmaker"/>
        <SocialIcon type="linkedin"  href="https://www.linkedin.com/in/hari-kishan-devmaker"/>
        <SocialIcon type="huggingface"   href="https://huggingface.co/Devmaker25"/>
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

// ── WORK CARD (sub-component to allow useState) ───────────────────────────────
const WorkCard = ({ w, i }) => {
  const [hov,setHov]=useState(false);
  return (
    <div
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
};

// ── REPO CARD (sub-component to allow useState) ───────────────────────────────
const RepoCard = ({ repo, i }) => {
  const [hov,setHov]=useState(false);
  const rarity=getR(repo.stargazers_count);
  const updated=new Date(repo.updated_at).toLocaleDateString("en-GB",{month:"short",year:"numeric"});
  return (
    <div
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
        <SkillIcon type={getLI(repo.language)} size={24} color={C.orange}/>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <span style={{fontFamily:SF,fontSize:10,fontWeight:700,color:RC[rarity],letterSpacing:1}}>{rarity}</span>
          {repo.stargazers_count>0&&(
            <span style={{fontFamily:SF,fontSize:11,color:C.orange,display:"flex",alignItems:"center",gap:3}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {repo.stargazers_count}
            </span>
          )}
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
        <button onClick={()=>window.open(repo.html_url,"_blank")} style={{flex:1,fontFamily:SF,fontSize:12,fontWeight:600,color:"#fff",background:C.orange,border:"none",borderRadius:7,padding:"9px 0",cursor:"pointer"}}>View code →</button>
        {repo.homepage&&<button onClick={()=>window.open(repo.homepage,"_blank")} style={{flex:1,fontFamily:SF,fontSize:12,fontWeight:600,color:C.orange,background:"transparent",border:`1px solid ${C.orange}`,borderRadius:7,padding:"9px 0",cursor:"pointer"}}>Live demo →</button>}
      </div>
    </div>
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
            {works.map((w,i)=>(
              <WorkCard key={w.title} w={w} i={i}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── SKILLS ─────────────────────────────────────────────────────────────────────
const Skills = () => {
  const [hov,setHov]=useState(null);
  return (
    <section style={{minHeight:"100vh",padding:"80px 52px",background:C.bgDeep}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{fontFamily:SF,fontSize:26,fontWeight:700,color:"#fff",marginBottom:8,animation:"fadeUp 0.7s both"}}>My Skills</h2>
        <div style={{width:48,height:3,background:C.orange,marginBottom:44,animation:"slideIn 0.7s 0.2s both"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:14,marginBottom:52}}>
          {SKILL_LIST.map((sk,i)=>(
            <div key={sk.name} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{
                display:"flex",flexDirection:"column",alignItems:"center",gap:10,
                padding:"18px 10px",
                background:hov===i?"rgba(232,84,26,0.1)":"rgba(255,255,255,0.03)",
                border:`1px solid ${hov===i?C.orange:"rgba(255,255,255,0.07)"}`,
                borderRadius:10,cursor:"default",
                transition:"all 0.2s",transform:hov===i?"translateY(-4px)":"none",
                animation:`popIn 0.5s ${i*0.05}s both`,
              }}>
              <SkillIcon type={sk.type} size={26} color={hov===i?C.orange:C.gray}/>
              <span style={{fontFamily:SF,fontSize:11,color:hov===i?C.orange:C.gray,fontWeight:500,textAlign:"center"}}>{sk.name}</span>
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

// ── SKILL SVG ICON ────────────────────────────────────────────────────────────
const SkillIcon = ({ type, size=24, color=C.gray }) => {
  const path = SVGS[type];
  if (!path) return null;
  // sklearn and pandas use polyline/multi-path, render as stroke
  const isStroke = type==="sklearn"||type==="pandas"||type==="jupyter";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={isStroke?"none":"currentColor"}
      stroke={isStroke?"currentColor":"none"}
      strokeWidth={isStroke?1.5:0}
      style={{color, flexShrink:0}}>
      <path d={path}/>
    </svg>
  );
};

const SKILL_LIST = [
  {type:"html",    name:"HTML"},
  {type:"css",     name:"CSS"},
  {type:"js",      name:"JavaScript"},
  {type:"react",   name:"React"},
  {type:"python",  name:"Python"},
  {type:"sklearn", name:"sklearn"},
  {type:"pandas",  name:"Pandas"},
  {type:"jupyter", name:"Jupyter"},
  {type:"github",  name:"GitHub"},
  {type:"vscode",  name:"VS Code"},
  {type:"node",    name:"Node.js"},
  {type:"sql",     name:"SQL"},
];
const LANG_SVG={Python:"python",JavaScript:"js",TypeScript:"js",HTML:"html",CSS:"css",Jupyter:"jupyter","C++":"node",Java:"node",default:"github"};
const getLI=l=>LANG_SVG[l]||LANG_SVG.default;
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
              {filtered.map((repo,i)=>(
                <RepoCard key={repo.id} repo={repo} i={i}/>
              ))}
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
            {type:"email",    label:"Email",    val:"placeholder@email.com"},
            {type:"location", label:"Location", val:"Your City, Country"},
            {type:"github",   label:"GitHub",   val:"github.com/25Devmaker"},
          ].map(c=>(
            <div key={c.label} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
              <div style={{width:36,height:36,background:"rgba(232,84,26,0.1)",border:`1px solid rgba(232,84,26,0.2)`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:C.orange}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={SVGS[c.type]}/></svg>
              </div>
              <div>
                <div style={{fontFamily:SF,fontSize:11,color:C.grayD,marginBottom:2}}>{c.label}</div>
                <div style={{fontFamily:SF,fontSize:13,color:"#fff"}}>{c.val}</div>
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:10,marginTop:28}}>
            <SocialIcon type="github"    href="https://github.com/25Devmaker"/>
            <SocialIcon type="huggingface"   href="https://huggingface.co/Devmaker25"/>
            <SocialIcon type="linkedin"  href="https://www.linkedin.com/in/hari-kishan-devmaker"/>
          </div>
          {/* Pixel robot decoration */}
          <div style={{marginTop:32}}>
            <PixelRobot px={8}/>
          </div>
        </div>

        {/* Right form */}
        {sent?(
          <div style={{background:C.bgCard,border:`1px solid ${C.orange}`,borderRadius:12,padding:40,textAlign:"center",boxShadow:`0 0 40px rgba(232,84,26,0.15)`,animation:"popIn 0.4s both"}}>
            <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
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
        <span style={{fontFamily:SF,fontSize:13,color:C.grayD}}>Built with <span style={{color:C.orange}}>React</span> <svg style={{display:"inline",verticalAlign:"middle"}} width="13" height="13" viewBox="0 0 24 24" fill={C.orange}><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg></span>
      </div>
    </div>
  );
}