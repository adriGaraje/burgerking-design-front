const LOCAL = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)

if (!LOCAL) {
  const { initializeApp } =
    await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js')
  const { getAuth, onAuthStateChanged, signOut } =
    await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js')
  const { firebaseConfig } = await import('/firebase-config.js')

  const auth = getAuth(initializeApp(firebaseConfig))

  const LOGOUT_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'

  const addLogout = () => {
    if (document.getElementById('bk-logout-bar')) return

    if (!document.getElementById('bk-logout-style')) {
      const st = document.createElement('style')
      st.id = 'bk-logout-style'
      st.textContent = '#storybook-explorer-menu{padding-bottom:64px !important}'
      document.head.appendChild(st)
    }

    const bar = document.createElement('div')
    bar.id = 'bk-logout-bar'
    bar.setAttribute(
      'style',
      [
        'position:fixed',
        'left:0',
        'bottom:0',
        'z-index:2147483000',
        'display:inline-flex',
        'align-items:center',
        'padding:10px',
        'background:#f5f5f5',
        'border-radius:0 12px 0 0',
        'box-shadow:0 -2px 14px rgba(0,0,0,.10)',
      ].join(';')
    )

    const btn = document.createElement('button')
    btn.id = 'bk-logout'
    btn.type = 'button'
    btn.innerHTML = LOGOUT_SVG + '<span>Cerrar sesión</span>'
    btn.setAttribute(
      'style',
      [
        'display:inline-flex',
        'align-items:center',
        'gap:7px',
        'padding:7px 14px',
        'border:1px solid rgba(214,35,0,.20)',
        'border-radius:999px',
        'background:#fff',
        'color:#d62300',
        'cursor:pointer',
        'white-space:nowrap',
        "font:600 12px/1 'Segoe UI',system-ui,sans-serif",
      ].join(';')
    )
    btn.addEventListener('click', () => {
      signOut(auth).finally(() => window.location.replace('/login/'))
    })
    bar.appendChild(btn)
    ;(document.body || document.documentElement).appendChild(bar)
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      const top = window.top || window
      const next = encodeURIComponent(top.location.pathname + top.location.search)
      top.location.replace('/login/?next=' + next)
      return
    }
    if (window === window.top) addLogout()
  })
}
