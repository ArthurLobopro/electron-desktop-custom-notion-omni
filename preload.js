const customStyle = `
  :root {
    /* Dark */
    --dark-hue: 253;

    --dark: hsl(var(--dark-hue), 24%, 10%);
    --dark-1: hsl(var(--dark-hue), 24%, 14%);
    --dark-2: hsl(var(--dark-hue), 24%, 18%);
    --dark-3: hsl(var(--dark-hue), 24%, 22%);
    --dark-4: hsl(var(--dark-hue), 24%, 26%);
    --dark-5: hsl(var(--dark-hue), 24%, 30%);

    /* Primary */
    --primary-hue: 132;
      
    --primary: hsl(var(--primary-hue), 70%, 65%); 
    --primary-1: hsl(var(--primary-hue), 70%, 55%); 
    --primary-2: hsl(var(--primary-hue), 70%, 45%); 
    --primary-3: hsl(var(--primary-hue), 70%, 35%); 
    --primary-4: hsl(var(--primary-hue), 70%, 25%); 
    --primary-5: hsl(var(--primary-hue), 70%, 15%); 
  }

  body.dark #notion-app .notion-sidebar {
      background-color: var(--dark-1) !important;
      color: #fff !important;
  }

  body.dark .notion-frame {
      background-color: var(--dark-2) !important
  }

  body.dark .notion-scroller > div:nth-child(1) {
      color: #eee!important
  }

  body.dark #notion-app > div > div > div.notion-sidebar-container > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1), 
  body.dark #notion-app > div > div > div.notion-sidebar-container > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(1) > span > div > div > div:nth-child(2), 
  body.dark .notion-topbar {
      color: #fff!important;
      background-color: var(--dark-1)!important;
      border-bottom: 1px solid var(--primary-4)
  }

  body.dark .notion-frame .notion-selectable a {
      background: rgb(43, 43, 43) !important;
  }

  /* float page */
  body.dark .notion-peek-renderer > div > div {
    background: var(--dark-2);
  }

  body.dark div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) {
    background: transparent !important;
  }

  /* scrollbar */
  body.dark .notion-scroller::-webkit-scrollbar {
    width: .4rem;
    height: .4rem;
    background: var(--dark-1);
  }

  body.dark .notion-scroller::-webkit-scrollbar * {
      background: transparent;
  }

  body.dark .notion-scroller::-webkit-scrollbar-thumb {
      background: var(--primary-2) !important;
      cursor: pointer;
      border-radius: 1.6rem;
  }

  body.dark .notion-scroller::-webkit-scrollbar-track {
    background: var(--dark-1);
  }


  /* disable topbar: for teaching purposes */
  body.dark #notion-app > div > div.notion-cursor-listener > div.notion-frame > div:nth-child(1),
  body.dark #notion-app > div > div.notion-cursor-listener > div.notion-help-button{
      /*display: none !important;*/
  }

  body.dark #notion-app .notion-topbar > div > div:nth-child(2){
    display:none !important;
  }

  /* links clickable */
  body.dark .notion-frame .notion-selectable a {
    background: var(--dark-1) !important;
  }

  /* help button */
  body.dark #notion-app > div > div.notion-cursor-listener > div.notion-help-button {
    background: var(--dark-1) !important;
  }

  /* every style that has rgb(47, 52, 55) as bg */
  [style*="background: rgb(47, 52, 55);"] {
    background: var(--dark-1) !important;
  }
  /* when hovering some elements */
  [style*="background: rgb(71, 76, 80);"] {
    background: var(--dark-3) !important;
  }
`;

window.addEventListener("DOMContentLoaded", () => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = customStyle;
  document.head.append(styleEl);
});
