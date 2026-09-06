export default function HeroBackground() {
  return <div className="hero-background" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
    <svg viewBox="0 0 1440 860" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="eclipse" cx="58%" cy="42%"><stop stopColor="#171513" offset="0"/><stop stopColor="#171513" stopOpacity=".96" offset=".62"/><stop stopColor="#171513" stopOpacity=".42" offset="1"/></radialGradient>
        <linearGradient id="rim" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#C96A4A" stopOpacity="0"/><stop stopColor="#C96A4A" stopOpacity=".22" offset=".42"/><stop stopColor="#E9E1D4" stopOpacity=".8" offset=".68"/><stop stopColor="#C96A4A" stopOpacity=".36" offset="1"/></linearGradient>
        <linearGradient id="terrain" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#B8AD9D" stopOpacity=".09"/><stop stopColor="#171513" stopOpacity=".98" offset=".55"/></linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="24"/></filter><filter id="warm"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>
      <ellipse cx="748" cy="404" rx="570" ry="286" transform="rotate(-15 748 404)" fill="none" stroke="#C96A4A" strokeOpacity=".12"/>
      <ellipse cx="752" cy="394" rx="660" ry="350" transform="rotate(23 752 394)" fill="none" stroke="#E9E1D4" strokeOpacity=".05"/>
      <ellipse cx="754" cy="400" rx="474" ry="405" transform="rotate(61 754 400)" fill="none" stroke="#C96A4A" strokeOpacity=".075"/>
      <circle cx="752" cy="382" r="325" fill="url(#eclipse)"/><circle cx="752" cy="382" r="326" fill="none" stroke="#C96A4A" strokeOpacity=".11"/>
      <path d="M 517 158 A 326 326 0 0 1 1057 420" fill="none" stroke="url(#rim)" strokeWidth="2.2" filter="url(#warm)"/><path d="M 524 164 A 318 318 0 0 1 1050 412" fill="none" stroke="#E9E1D4" strokeOpacity=".28" strokeWidth=".75"/>
      <path d="M250 363C373 288 447 319 516 385C588 454 660 415 719 348C779 280 879 274 958 344C1026 403 1116 405 1208 347" fill="none" stroke="#B8AD9D" strokeOpacity=".045" strokeWidth="58" filter="url(#blur)"/>
      <path d="M134 472C252 414 351 438 441 501C539 570 637 529 713 468C797 400 898 418 993 489C1080 555 1193 539 1334 450" fill="none" stroke="#E9E1D4" strokeOpacity=".035" strokeWidth="42" filter="url(#blur)"/>
      <path d="M0 706L90 628L174 657L280 570L358 617L468 530L574 625L676 553L782 641L896 575L1000 625L1110 516L1210 603L1322 548L1440 616V860H0Z" fill="url(#terrain)"/>
      <path d="M0 760L154 681L264 726L377 647L492 711L597 650L713 735L821 676L930 720L1055 631L1169 702L1283 641L1440 700V860H0Z" fill="#171513" fillOpacity=".92"/>
      <path d="M480 707C625 671 744 689 862 716C1001 747 1120 722 1293 655" fill="none" stroke="#C96A4A" strokeOpacity=".13" strokeWidth="1"/>
      <g fill="#C96A4A"><circle cx="180" cy="180" r="1"/><circle cx="301" cy="121" r="1.2"/><circle cx="1169" cy="180" r="1"/><circle cx="1293" cy="310" r="1.15"/><circle cx="1071" cy="125" r=".8"/><circle cx="1198" cy="599" r="1"/></g><g fill="#E9E1D4" fillOpacity=".42"><circle cx="252" cy="286" r=".8"/><circle cx="1098" cy="278" r=".85"/><circle cx="1264" cy="468" r=".65"/></g>
      <g fill="#B8AD9D" fillOpacity=".48" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="500" letterSpacing="3"><text x="38" y="140" fill="#C96A4A">01</text><text x="38" y="161">HOME</text><path d="M38 177h30" stroke="#C96A4A" strokeOpacity=".6"/><text x="38" y="585">IDEAS</text><text x="38" y="600">INTO</text><text x="38" y="615">IMPACT</text><text x="1302" y="254">BUILD</text><text x="1302" y="269">LEARN</text><text x="1302" y="284">ITERATE</text><text x="1302" y="299">GROW</text></g>
    </svg>
  </div>
}
