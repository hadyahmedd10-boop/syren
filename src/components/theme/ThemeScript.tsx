export default function ThemeScript() { 
  const code = ` 
(function() { 
  try { 
    var stored = localStorage.getItem("syren_theme"); 
    var theme = stored || "dark"; 
    var root = document.documentElement; 
    if (theme === "light") root.classList.add("light"); 
  } catch (e) {} 
})();`; 
  return <script dangerouslySetInnerHTML={{ __html: code }} />; 
}