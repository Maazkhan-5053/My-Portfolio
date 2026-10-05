import { useEffect, useRef, useState } from 'react'

// Pull-string lamp: night = lamp on, day = lamp off.
// Pull the bead down (or tap it / press Enter) to switch theme. Drag the shade to swing it.

const PIV = { x: 100, y: 0 } // ceiling mount (svg units)
const SHADE_TOP = 70, SHADE_BOT = 122, BULB_Y = 128
const ANCHOR = { x: -34, y: 119 } // where the pull cord attaches (lamp-local)
const HANG = 62, MAX_PULL = 52, TRIGGER = 24
const K = 11, DAMP = 0.5 // pendulum stiffness / damping
const VBH = 320

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const ease = (dt, r) => 1 - Math.exp(-dt * r)
const anchor = (th) => {
    const c = Math.cos(th), n = Math.sin(th)
    return { x: PIV.x + ANCHOR.x * c - ANCHOR.y * n, y: PIV.y + ANCHOR.x * n + ANCHOR.y * c }
}

const ThemeLamp = ({ theme, onToggle, sound = true }) => {
    const night = theme === 'dark'
    const [, setTick] = useState(0)
    const svgRef = useRef(null)
    const audio = useRef(null)
    const wakeRef = useRef(() => {})
    const target = useRef(night)
    target.current = night

    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const P = useRef({
        th: reduced ? 0 : 0.22, w: 0, lit: 0, p: 0, pv: 0, hx: anchor(reduced ? 0 : 0.22).x, dx: 0,
        drag: null, lastT: 0, sx: 0, sy: 0, p0: 0, moved: 0,
    })

    // ---------- animation loop (sleeps when everything has settled) ----------
    useEffect(() => {
        let raf = 0, last = 0
        const loop = (now) => {
            const s = P.current, dt = Math.min(0.033, (now - last) / 1000)
            last = now
            if (s.drag !== 'shade')
                for (let i = 0; i < 2; i++) {
                    const h = dt / 2
                    s.w += (-K * Math.sin(s.th) - DAMP * s.w) * h
                    s.th += s.w * h
                }
            if (s.drag !== 'handle') {
                s.pv += (-220 * s.p - 11 * s.pv) * dt
                s.p += s.pv * dt
            }
            const A = anchor(s.th)
            s.hx += ((s.drag === 'handle' ? A.x + s.dx : A.x) - s.hx) * ease(dt, s.drag === 'handle' ? 25 : 6)
            s.lit += ((target.current ? 1 : 0) - s.lit) * ease(dt, 7)
            setTick((t) => (t + 1) % 1e6)

            const calm = !s.drag && Math.abs(s.w) < 0.004 && Math.abs(s.th) < 0.002 && Math.abs(s.p) < 0.1 &&
                Math.abs(s.pv) < 0.5 && Math.abs(s.hx - A.x) < 0.05 && Math.abs(s.lit - (target.current ? 1 : 0)) < 0.003
            if (calm) {
                s.th = s.w = s.p = s.pv = 0
                s.lit = target.current ? 1 : 0
                s.hx = anchor(0).x
                raf = 0
                return setTick((t) => (t + 1) % 1e6)
            }
            raf = requestAnimationFrame(loop)
        }
        wakeRef.current = () => {
            if (raf) return
            last = performance.now()
            raf = requestAnimationFrame(loop)
        }
        wakeRef.current()
        return () => { cancelAnimationFrame(raf); raf = 0 }
    }, [])

    useEffect(() => { wakeRef.current() }, [night])

    // ---------- sound + actions ----------
    const click = () => {
        if (!sound) return
        try {
            const c = (audio.current ||= new (window.AudioContext || window.webkitAudioContext)())
            if (c.state === 'suspended') c.resume()
            const t = c.currentTime, o = c.createOscillator(), g = c.createGain()
            o.type = 'square'
            o.frequency.setValueAtTime(1500, t)
            o.frequency.exponentialRampToValueAtTime(700, t + 0.04)
            g.gain.setValueAtTime(0.03, t)
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
            o.connect(g).connect(c.destination)
            o.start(t)
            o.stop(t + 0.07)
        } catch { /* audio is optional */ }
    }
    const flip = () => {
        click()
        if (!reduced) P.current.w -= 0.7
        onToggle()
        wakeRef.current()
    }

    // ---------- pointer handling ----------
    const toSvg = (e) => {
        const r = svgRef.current.getBoundingClientRect()
        return { x: ((e.clientX - r.left) / r.width) * 200, y: ((e.clientY - r.top) / r.height) * VBH }
    }
    const handleDown = (e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        const s = P.current, p = toSvg(e)
        Object.assign(s, { drag: 'handle', sx: p.x, sy: p.y, p0: s.p, pv: 0, moved: 0, dx: 0 })
        wakeRef.current()
    }
    const handleMove = (e) => {
        const s = P.current
        if (s.drag !== 'handle') return
        const p = toSvg(e)
        const np = MAX_PULL * Math.tanh(Math.max(0, p.y - s.sy + s.p0) / MAX_PULL)
        if (!reduced) s.w -= (np - s.p) * 0.012 // the tug swings the lamp
        s.p = np
        s.dx = clamp(p.x - s.sx, -18, 18) * 0.6
        s.moved = Math.max(s.moved, Math.abs(p.y - s.sy) + Math.abs(p.x - s.sx))
    }
    const handleUp = () => {
        const s = P.current
        if (s.drag !== 'handle') return
        const pulled = s.p > TRIGGER, tap = s.moved < 4
        s.drag = null
        s.dx = 0
        if (tap) { s.p = 26; s.pv = 0 }
        if (pulled || tap) flip()
        wakeRef.current()
    }
    const handleKey = (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        P.current.p = 26
        P.current.pv = 0
        flip()
    }
    const shadeDown = (e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        Object.assign(P.current, { drag: 'shade', w: 0, lastT: performance.now() })
        wakeRef.current()
    }
    const shadeMove = (e) => {
        const s = P.current
        if (s.drag !== 'shade') return
        const p = toSvg(e), t = performance.now()
        const th = clamp(Math.atan2(-(p.x - PIV.x), p.y - PIV.y), -1, 1)
        const v = (th - s.th) / Math.max(0.008, (t - s.lastT) / 1000)
        s.w = s.w * 0.6 + clamp(v, -9, 9) * 0.4
        s.th = th
        s.lastT = t
    }
    const shadeUp = () => { if (P.current.drag === 'shade') { P.current.drag = null; wakeRef.current() } }

    // ---------- render ----------
    const s = P.current
    const A = anchor(s.th)
    const hy = A.y + HANG + s.p
    const lit = s.lit

    return (
        <div className='absolute top-[64px] md:top-[84px] xl:top-0 right-2 md:right-4 z-30 w-[200px] h-[320px] pointer-events-none origin-top-right scale-[.6] md:scale-[.8]'>
            <svg ref={svgRef} viewBox={`0 0 200 ${VBH}`} className='w-full h-full overflow-visible select-none'>
                <defs>
                    <linearGradient id='tl-cone' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0' stopColor='#ffe2ad' stopOpacity='0.45' />
                        <stop offset='1' stopColor='#ffe2ad' stopOpacity='0' />
                    </linearGradient>
                    <radialGradient id='tl-glow'>
                        <stop offset='0' stopColor='#ffd9a0' stopOpacity='0.55' />
                        <stop offset='1' stopColor='#ffd9a0' stopOpacity='0' />
                    </radialGradient>
                </defs>

                <rect x={PIV.x - 9} y='-4' width='18' height='8' rx='2' fill='#6b7680' />

                <g transform={`rotate(${(s.th * 180) / Math.PI} ${PIV.x} ${PIV.y})`}>
                    <g transform={`translate(${PIV.x} ${PIV.y})`}>
                        <polygon points='-34,122 34,122 112,310 -112,310' fill='url(#tl-cone)' opacity={lit} />
                        <circle cy={BULB_Y} r='80' fill='url(#tl-glow)' opacity={lit} />
                        <line x1='0' y1='0' x2='0' y2={SHADE_TOP} stroke='#8a949d' strokeWidth='1.6' />
                        <g
                            className='pointer-events-auto cursor-grab active:cursor-grabbing'
                            style={{ touchAction: 'none' }}
                            onPointerDown={shadeDown}
                            onPointerMove={shadeMove}
                            onPointerUp={shadeUp}
                            onPointerCancel={shadeUp}>
                            <rect x='-5' y={BULB_Y - 12} width='10' height='8' rx='2' fill='#3b4650' />
                            <circle cy={BULB_Y} r='9' fill='#8d96a0' />
                            <circle cy={BULB_Y} r='9' fill='#fff3c4' opacity={lit} />
                            <path d={`M-14 ${SHADE_TOP} L14 ${SHADE_TOP} L40 ${SHADE_BOT} L-40 ${SHADE_BOT} Z`}
                                fill='#d8c08a' stroke='#8a6d2f' strokeWidth='1' strokeLinejoin='round' />
                            <path d={`M-14 ${SHADE_TOP} L14 ${SHADE_TOP} L40 ${SHADE_BOT} L-40 ${SHADE_BOT} Z`}
                                fill='#000' opacity={0.38 * (1 - lit)} />
                            <ellipse cy={SHADE_BOT} rx='40' ry='4' fill='#ffe2ad' opacity={lit} />
                        </g>
                    </g>
                </g>

                {/* pull string + bead */}
                <line x1={A.x} y1={A.y} x2={s.hx} y2={hy} stroke='#9aa3ab' strokeWidth='1.2' />
                <g
                    role='button'
                    tabIndex={0}
                    aria-label={`Switch to ${night ? 'day' : 'night'} mode`}
                    className='group outline-none pointer-events-auto cursor-grab active:cursor-grabbing'
                    style={{ touchAction: 'none' }}
                    onPointerDown={handleDown}
                    onPointerMove={handleMove}
                    onPointerUp={handleUp}
                    onPointerCancel={handleUp}
                    onKeyDown={handleKey}>
                    <circle cx={s.hx} cy={hy + 6} r='18' fill='transparent' />
                    <circle cx={s.hx} cy={hy + 6} r='13' fill='none' strokeWidth='2'
                        className='stroke-yellow-400 opacity-0 group-focus-visible:opacity-100' />
                    <rect x={s.hx - 3} y={hy - 2} width='6' height='16' rx='3' className='fill-yellow-400 max-[440px]:fill-black' />
                </g>
            </svg>
        </div>
    )
}

export default ThemeLamp
