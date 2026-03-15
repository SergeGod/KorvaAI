// ─── Vertex Shader ────────────────────────────────────────────────────────────
// Standard passthrough; projectionMatrix + modelViewMatrix provided by Three.js
// ShaderMaterial automatically.
export const VERTEX_SHADER = /* glsl */ `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// ─── Fragment Shader ──────────────────────────────────────────────────────────
// Hyper-realistic black hole: event horizon + photon ring + accretion disk
// with Keplerian swirl, FBM turbulence, relativistic Doppler beaming,
// gravitational lensing UV warp, and a lensed secondary image cap.
// Background is absolute pitch-black (#000000).
export const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2  uResolution;  // framebuffer pixel dimensions
uniform float uQuality;     // 0.0 = medium, 1.0 = high

// ── Noise utilities ──────────────────────────────────────────────────────────

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i),               hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

// 4-octave fBm — used in reduced-quality mode and cheap passes
float fbm4(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p  = p * 2.01 + vec2(100.0, 100.0);
    a *= 0.5;
  }
  return v;
}

// 6-octave fBm — richer detail for high-quality mode
float fbm6(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p  = p * 2.01 + vec2(100.0, 100.0);
    a *= 0.5;
  }
  return v;
}

// ── Main ─────────────────────────────────────────────────────────────────────
void main() {
  // Normalized UV: origin at center, aspect-ratio corrected, [-~0.5, ~0.5]
  vec2 uv  = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
  float r  = length(uv);
  float phi = atan(uv.y, uv.x);

  // ── Physical parameters (all in the same UV unit space) ──
  float R_EH     = 0.090;   // event-horizon radius
  float R_PHOTON = 0.117;   // photon sphere (thin bright ring just outside EH)
  float R_IN     = 0.140;   // disk inner edge (ISCO approximation)
  float R_OUT    = 0.520;   // disk outer edge

  // ── Gravitational lensing: warp UV toward the black hole ─────────────────
  // Simplified deflection: closer to EH → stronger inward pull on apparent pos.
  float lensK  = R_EH * R_EH * 0.10;
  float denomL = max(r * r - R_EH * R_EH * 0.55, 0.0015);
  float lensW  = lensK / denomL;
  float lensS  = smoothstep(R_OUT, R_EH, r);
  vec2  wUV    = uv + normalize(uv) * lensW * lensS * 0.065;
  float wr     = length(wUV);
  float wph    = atan(wUV.y, wUV.x);

  // ── Time ─────────────────────────────────────────────────────────────────
  float t = uTime * 0.18;

  // ── Keplerian swirl: omega ∝ r^(-3/2) → tighter spiral near center ───────
  float kOmega = 1.0 / pow(max(wr, R_IN), 1.5);
  float swirl  = wph + t * kOmega * 2.5 + 3.1 / (wr + 0.04);

  // ── Disk turbulence via layered fBm ──────────────────────────────────────
  vec2 nc1 = vec2(swirl * 1.70, wr * 9.5);
  vec2 nc2 = vec2(swirl * 3.30 + t * 0.40, wr * 17.0);
  vec2 nc3 = vec2(swirl * 6.50 - t * 0.30, wr * 30.0);

  // High-quality path uses fbm6 for nc1; medium uses fbm4
  float n1 = uQuality > 0.5
    ? fbm6(nc1 + vec2(t * 0.55))
    : fbm4(nc1 + vec2(t * 0.55));
  float n2 = fbm4(nc2 - vec2(t * 0.20));
  float n3 = vnoise(nc3 + vec2(t * 0.70));

  float density = n1 * 0.54 + n2 * 0.31 + n3 * 0.15;
  density = smoothstep(0.07, 0.93, density);  // punch up contrast

  // ── Disk radial mask (smooth inner/outer edges) ───────────────────────────
  float dMask = smoothstep(R_IN,  R_IN  + 0.026, wr)
              * smoothstep(R_OUT, R_OUT - 0.080, wr);

  // ── Relativistic Doppler beaming ──────────────────────────────────────────
  // CCW orbit at ~45° inclination: peak brightness peaks top-left (phi ≈ 120°).
  // approaching = 1 → bright, approaching = -1 → dim.
  float approaching = sin(phi + 2.10);
  float beaming     = pow(max(0.01, 1.0 + 0.56 * approaching), 3.0);
  beaming = clamp(beaming, 0.07, 5.0);

  // ── Radial temperature gradient ───────────────────────────────────────────
  // inner ISCO = hottest (near-white), outer edge = coolest (dark red)
  float radPos = clamp((wr - R_IN) / (R_OUT - R_IN), 0.0, 1.0);
  float temp   = 1.0 - pow(radPos, 0.65);

  vec3 c_hot  = vec3(1.000, 0.975, 0.840);  // ~6500 K blue-white
  vec3 c_warm = vec3(1.000, 0.500, 0.070);  // ~3500 K orange
  vec3 c_cool = vec3(0.520, 0.060, 0.012);  // ~2000 K dark red

  // Piecewise lerp: cool → warm → hot
  vec3 diskColor = mix(
    c_cool,
    mix(c_warm, c_hot, clamp(temp * 2.0 - 1.0, 0.0, 1.0)),
    min(temp * 2.0, 1.0)
  );

  // ── Disk luminance ────────────────────────────────────────────────────────
  float diskBright = pow(clamp(density * beaming * 1.80, 0.0, 4.0), 0.72);
  vec3  disk       = diskColor * diskBright * dMask;

  // ── Photon ring ───────────────────────────────────────────────────────────
  // Very thin, very bright ring at the photon sphere. Angular noise for variety.
  float pW   = 0.0090;
  float pRng = exp(-pow((r - R_PHOTON) / pW, 2.0) * 32.0);
  float pN   = 0.55 + 0.45 * fbm4(vec2(phi * 1.70 + t, t * 0.25));
  vec3  photon = vec3(1.0, 0.78, 0.46) * pRng * pN * 4.0;

  // ── Inner glow (just outside the event horizon) ───────────────────────────
  float iG = smoothstep(R_EH * 2.80, R_EH * 1.05, r)
           * smoothstep(R_EH, R_EH * 1.12, r) * 0.32;
  vec3  innerGlow = vec3(0.90, 0.38, 0.06) * iG;

  // ── Secondary lensed "cap" ────────────────────────────────────────────────
  // Simulates far-side accretion disk light bent over the top of the EH.
  // Appears as a thin bright arc hugging the top of the event horizon.
  float capCX  = uv.x;
  float capCY  = uv.y - R_EH * 0.13;          // center slightly above EH
  float capR   = sqrt(capCX * capCX + capCY * capCY);
  float capMask = exp(-pow((capR - R_PHOTON * 0.95) / 0.010, 2.0) * 40.0);
  capMask *= smoothstep(0.00, 0.07, uv.y);     // top-half only
  capMask *= smoothstep(R_EH + 0.04, R_EH + 0.005, r); // close to EH

  float capPhi = atan(capCY, capCX);
  float capSw  = capPhi - t * 3.20;
  float capN   = 0.50 + 0.50 * fbm4(vec2(capSw * 1.60, capR * 9.0 + t * 0.30));
  float capBm  = pow(max(0.01, 1.0 + 0.50 * sin(phi + 1.50)), 2.5);
  vec3  secondary = vec3(1.0, 0.68, 0.30) * capMask * capN * capBm * 2.6;

  // ── Combine all contributions ─────────────────────────────────────────────
  vec3 color = disk + photon + innerGlow + secondary;

  // ── Event horizon: absolute black ─────────────────────────────────────────
  float ehMask = smoothstep(R_EH + 0.010, R_EH - 0.006, r);
  color *= (1.0 - ehMask);

  // ── Outer diffuse halo (very faint — stays within the disk region) ─────────
  float haloN = fbm4(vec2(phi * 0.40 + t * 0.08, r * 2.0));
  float halo  = smoothstep(R_OUT + 0.20, R_IN * 0.80, r) * haloN * 0.038;
  color += vec3(0.78, 0.28, 0.04) * halo;

  // ── Filmic tone-mapping + gamma correction ────────────────────────────────
  // Keeps bright accretion disk from blowing out while preserving black BG.
  color = color / (1.0 + color * 0.36);
  color = pow(max(color, vec3(0.0)), vec3(0.88));

  gl_FragColor = vec4(color, 1.0);
}
`
