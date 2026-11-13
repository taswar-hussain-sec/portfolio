const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});
links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

/* interactive terminal */
(function () {
  const card = document.querySelector('.terminal-card');
  const input = document.getElementById('term-cmd');
  const out = document.getElementById('term-out');
  const body = document.querySelector('.terminal-body');
  if (!card || !input || !out) return;

  const COMMANDS = {
    help: 'Available commands:\n  about     who I am\n  skills    my toolkit\n  projects  what I have built\n  certs     certifications and learning\n  focus     what I am working on now\n  contact   how to reach me\n  clear     clear the screen',
    about: 'Taswar Hussain, final-year BS Computer Science student at Sindh Madressatul Islam University, Karachi.\nFocus: penetration testing, web application security and SOC analysis.',
    skills: 'Pentest : Nmap, Burp Suite, SQLmap, Hydra, Nikto, Metasploit, Nessus, Aircrack-ng, Wireshark\nRecon   : Maltego, Netcraft, Gobuster, Amass, Recon-ng, HTTPX, CyberChef, Dig\nWeb     : OWASP Top 10, XSS, SQL injection, auth/authz flaws, session analysis\nNetwork : TCP/IP, OSI, DNS, DHCP, ARP, NAT, routing, subnetting\nCode    : Python, Java, JavaScript, SQL',
    projects: '[2026] Cybersecurity Monitoring Dashboard\n[2025] AI-Powered Spam & Phishing Email Filter\n[2025] Bunyan Al-Marsoos Secure Network Simulation\n[2023-now] CTF & Vulnerable VM Exploitation\nScroll down to #projects for details.',
    certs: 'Certified Ethical Hacker (CEH), IBA Karachi: in progress\nTryHackMe: 11+ rooms completed\nHack The Box: active CTF participant',
    focus: 'web security, network defense, SOC workflows.\nStatus: open to internships and entry-level roles.',
    contact: 'email    : taswarhussainsamoon999@gmail.com\ngithub   : github.com/taswar-hussain-sec\nlinkedin : linkedin.com/in/taswar-hussain-samoon\nphone    : +92 311 3154469'
  };
  const alias = { whoami: 'about', ls: 'help', '?': 'help', status: 'focus' };
  const history = []; let pos = 0;

  const add = (text, cls) => {
    const d = document.createElement('div');
    if (cls) d.className = cls;
    d.textContent = text;
    out.appendChild(d);
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault(); pos = Math.max(0, pos - 1); input.value = history[pos];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); pos = Math.min(history.length, pos + 1); input.value = history[pos] || '';
    } else if (e.key === 'Enter') {
      const raw = input.value.trim(); input.value = '';
      if (!raw) return;
      history.push(raw); pos = history.length;
      const key = raw.toLowerCase();
      if (key === 'clear') { out.textContent = ''; return; }
      add(raw, 'cmd');
      const found = COMMANDS[alias[key] || key];
      if (found) add(found, 'ok');
      else add('command not found: ' + raw + ' (type help)', 'err');
      body.scrollTop = body.scrollHeight;
    }
  });
  card.addEventListener('click', () => input.focus({ preventScroll: true }));
})();
