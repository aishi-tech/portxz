/**
 * High-performance 2D Canvas renderer for the 15-second Portxz 9:16 promotional ad.
 * Renders at 720x1280 or 1080x1920 crisp resolution for preview & video recording export.
 */

export function renderFrameToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  showCaptions: boolean = true
) {
  const t = Math.max(0, Math.min(15, time));

  // Base background: Dark navy (#0A0F1E)
  ctx.fillStyle = '#0A0F1E';
  ctx.fillRect(0, 0, width, height);

  // Dynamic ambient lighting
  const grad1 = ctx.createRadialGradient(
    width * 0.35,
    height * (t < 3 ? 0.25 : t < 6 ? 0.45 : t < 11 ? 0.3 : 0.2),
    10,
    width * 0.35,
    height * (t < 3 ? 0.25 : t < 6 ? 0.45 : t < 11 ? 0.3 : 0.2),
    width * 0.7
  );
  if (t < 3) {
    grad1.addColorStop(0, 'rgba(239, 68, 68, 0.28)');
    grad1.addColorStop(1, 'rgba(10, 15, 30, 0)');
  } else {
    grad1.addColorStop(0, 'rgba(77, 166, 255, 0.32)');
    grad1.addColorStop(1, 'rgba(10, 15, 30, 0)');
  }
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, width, height);

  const grad2 = ctx.createRadialGradient(
    width * 0.7,
    height * 0.75,
    10,
    width * 0.7,
    height * 0.75,
    width * 0.6
  );
  grad2.addColorStop(0, t < 3 ? 'rgba(239, 68, 68, 0.18)' : 'rgba(124, 92, 255, 0.25)');
  grad2.addColorStop(1, 'rgba(10, 15, 30, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(77, 166, 255, 0.08)';
  ctx.lineWidth = 1;
  const gridStep = width / 12;
  for (let x = 0; x < width; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Floating particles
  ctx.fillStyle = '#4DA6FF';
  for (let i = 0; i < 18; i++) {
    const px = ((i * 137.5) % width);
    const py = (height - ((t * (20 + (i % 3) * 15) + i * 50) % height));
    const size = (i % 3) + 1.5;
    ctx.globalAlpha = 0.3 + 0.5 * Math.sin(t * 2 + i);
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Header Bar (Portxz Logo + Timestamp)
  drawHeaderBar(ctx, width, height, t);

  // Scene Specific Render
  if (t < 3) {
    renderScene1(ctx, width, height, t);
  } else if (t < 6) {
    renderScene2(ctx, width, height, t);
  } else if (t < 11) {
    renderScene3(ctx, width, height, t);
  } else {
    renderScene4(ctx, width, height, t);
  }

  // Caption Bar at Bottom
  if (showCaptions) {
    drawCaptionBar(ctx, width, height, t);
  }
}

function drawHeaderBar(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const pad = width * 0.06;
  const top = height * 0.04;

  // Small Logo Icon
  drawRoundedSquareLogo(ctx, pad, top, width * 0.08);

  // Portxz Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${width * 0.045}px system-ui, sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('Port', pad + width * 0.095, top + width * 0.06);
  ctx.fillStyle = '#4DA6FF';
  ctx.fillText('xz', pad + width * 0.175, top + width * 0.06);

  // Scene indicator
  const sceneNum = t < 3 ? '01' : t < 6 ? '02' : t < 11 ? '03' : '04';
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  const badgeW = width * 0.32;
  const badgeH = width * 0.07;
  const badgeX = width - pad - badgeW;
  roundRect(ctx, badgeX, top, badgeW, badgeH, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(77, 166, 255, 0.3)';
  ctx.stroke();

  // Green pulse dot
  ctx.fillStyle = '#39D98A';
  ctx.beginPath();
  ctx.arc(badgeX + width * 0.035, top + badgeH / 2, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#CBD5E1';
  ctx.font = `600 ${width * 0.026}px monospace`;
  ctx.fillText(`SCENE ${sceneNum} | ${t.toFixed(1)}s`, badgeX + width * 0.065, top + badgeH * 0.65);
}

function drawRoundedSquareLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  glow: boolean = false
) {
  ctx.save();
  if (glow) {
    ctx.shadowColor = '#4DA6FF';
    ctx.shadowBlur = size * 0.4;
  }
  const grad = ctx.createLinearGradient(x, y, x + size, y + size);
  grad.addColorStop(0, '#4DA6FF');
  grad.addColorStop(1, '#7C5CFF');
  ctx.fillStyle = grad;
  roundRect(ctx, x, y, size, size, size * 0.24);
  ctx.fill();
  ctx.restore();

  // White "P"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${size * 0.62}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('P', x + size / 2, y + size / 2);
}

function renderScene1(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const centerY = height * 0.46;

  // Warning Pill
  const pillW = width * 0.65;
  const pillH = height * 0.038;
  ctx.fillStyle = 'rgba(127, 29, 29, 0.85)';
  roundRect(ctx, (width - pillW) / 2, centerY - height * 0.28, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FCA5A5';
  ctx.font = `bold ${width * 0.032}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('⚠ OUT OF SYNC DETECTED', width / 2, centerY - height * 0.28 + pillH * 0.68);

  // Glitch shake offset
  const shakeX = Math.sin(t * 22) * 5;
  const shakeY = Math.cos(t * 18) * 3;

  // 1. Portfolio Window (tilted left)
  ctx.save();
  ctx.translate(width * 0.38 + shakeX, centerY - height * 0.12 + shakeY);
  ctx.rotate(-0.1);
  drawStaleWindow(ctx, width * 0.62, height * 0.14, '2021 Portfolio (Broken)', 'Last updated 892 days ago', '#EF4444');
  ctx.restore();

  // 2. Resume Document (tilted right)
  ctx.save();
  ctx.translate(width * 0.62 - shakeX, centerY + shakeY);
  ctx.rotate(0.08);
  drawStaleWindow(ctx, width * 0.6, height * 0.14, 'Resume_v4_FINAL_2.pdf', 'Missing 3 recent jobs & stack', '#F59E0B');
  ctx.restore();

  // 3. GitHub README (centered bottom)
  ctx.save();
  ctx.translate(width * 0.5 + shakeX * 0.7, centerY + height * 0.14 - shakeY);
  ctx.rotate(-0.03);
  drawStaleWindow(ctx, width * 0.65, height * 0.14, 'alexdev / README.md', 'TODO: update projects (2019)', '#EF4444');
  ctx.restore();

  // Glitch laser line
  const laserY = (centerY - height * 0.2) + ((t * 240) % (height * 0.45));
  ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
  ctx.fillRect(width * 0.1, laserY, width * 0.8, 2);
}

function drawStaleWindow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  title: string,
  desc: string,
  color: string
) {
  const x = -w / 2;
  const y = -h / 2;
  ctx.fillStyle = 'rgba(13, 21, 39, 0.95)';
  roundRect(ctx, x, y, w, h, 12);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Title bar
  ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
  ctx.fillRect(x + 2, y + 2, w - 4, h * 0.26);

  ctx.fillStyle = color;
  ctx.font = `bold ${w * 0.048}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 12, y + h * 0.18);

  ctx.fillStyle = '#94A3B8';
  ctx.font = `${w * 0.042}px sans-serif`;
  ctx.fillText(desc, x + 12, y + h * 0.55);

  ctx.fillStyle = '#EF4444';
  ctx.font = `bold ${w * 0.038}px monospace`;
  ctx.fillText('⚠ DESYNCED', x + 12, y + h * 0.82);
}

function renderScene2(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const st = t - 3; // 0 to 3s
  const centerY = height * 0.46;

  if (st < 0.6) {
    // Suction into singularity
    const scale = Math.max(0.05, 1 - st * 1.6);
    ctx.save();
    ctx.translate(width / 2, centerY);
    ctx.rotate(st * 8);
    ctx.scale(scale, scale);

    ctx.fillStyle = '#4DA6FF';
    ctx.fillRect(-100, -60, 200, 120);
    ctx.restore();
  } else {
    // Shockwave burst rings
    const blastAge = st - 0.6;
    const ringRadius = blastAge * width * 1.2;
    ctx.strokeStyle = '#4DA6FF';
    ctx.lineWidth = 4;
    ctx.globalAlpha = Math.max(0, 1 - blastAge / 1.5);
    ctx.beginPath();
    ctx.arc(width / 2, centerY, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#7C5CFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, centerY, ringRadius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Logo reveal push in
    const logoScale = Math.min(1.3, 0.5 + blastAge * 0.4);
    const logoSize = width * 0.38 * logoScale;
    drawRoundedSquareLogo(ctx, width / 2 - logoSize / 2, centerY - logoSize / 2, logoSize, true);

    // Text "Portxz"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `900 ${width * 0.09}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Portxz', width / 2, centerY + logoSize * 0.75);

    // Sub-badge
    const pillW = width * 0.68;
    const pillH = height * 0.038;
    ctx.fillStyle = 'rgba(77, 166, 255, 0.15)';
    roundRect(ctx, (width - pillW) / 2, centerY + logoSize * 0.9, pillW, pillH, pillH / 2);
    ctx.fill();
    ctx.strokeStyle = '#4DA6FF';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#4DA6FF';
    ctx.font = `bold ${width * 0.03}px monospace`;
    ctx.fillText('⚡ ONE PROFILE • INFINITE SYNC', width / 2, centerY + logoSize * 0.9 + pillH * 0.68);
  }
}

function renderScene3(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const st = t - 6; // 0 to 5s
  const centerY = height * 0.45;

  if (st < 1.6) {
    // Phase 1: Claim Username Field + checkmark
    const cardW = width * 0.85;
    const cardH = height * 0.18;
    ctx.fillStyle = 'rgba(9, 15, 30, 0.95)';
    roundRect(ctx, (width - cardW) / 2, centerY - height * 0.16, cardW, cardH, 16);
    ctx.fill();
    ctx.strokeStyle = '#4DA6FF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 ${width * 0.03}px monospace`;
    ctx.textAlign = 'left';
    ctx.fillText('CLAIM YOUR PORTXZ HANDLE', (width - cardW) / 2 + 16, centerY - height * 0.11);

    // Input Box
    const inputW = cardW - 32;
    const inputH = height * 0.06;
    ctx.fillStyle = '#0E1628';
    roundRect(ctx, (width - inputW) / 2, centerY - height * 0.08, inputW, inputH, 10);
    ctx.fill();

    ctx.fillStyle = '#64748B';
    ctx.font = `bold ${width * 0.038}px monospace`;
    ctx.fillText('portxz.com/@', (width - inputW) / 2 + 12, centerY - height * 0.04);
    ctx.fillStyle = '#FFFFFF';
    const textTyped = st < 0.6 ? 'al' : st < 1.0 ? 'alex' : 'alexdev';
    ctx.fillText(textTyped, (width - inputW) / 2 + width * 0.32, centerY - height * 0.04);

    if (st >= 1.0) {
      ctx.fillStyle = '#39D98A';
      ctx.font = `bold ${width * 0.032}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText('✓ Available', (width + inputW) / 2 - 12, centerY - height * 0.04);
    }
  } else if (st < 3.3) {
    // Phase 2: Theme Switcher Morph
    const themeIdx = (st - 1.6) < 0.85 ? 0 : 1;
    const cardW = width * 0.86;
    const cardH = height * 0.32;

    if (themeIdx === 0) {
      // Terminal style
      ctx.fillStyle = '#080D19';
      roundRect(ctx, (width - cardW) / 2, centerY - cardH / 2, cardW, cardH, 16);
      ctx.fill();
      ctx.strokeStyle = '#39D98A';
      ctx.stroke();

      ctx.fillStyle = '#39D98A';
      ctx.font = `bold ${width * 0.034}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('visitor@alex:~$ whoami', (width - cardW) / 2 + 16, centerY - cardH * 0.25);
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('designer • developer • shipping real things', (width - cardW) / 2 + 16, centerY - cardH * 0.1);

      ctx.fillStyle = '#39D98A';
      ctx.fillText('visitor@alex:~$ sudo hire-me', (width - cardW) / 2 + 16, centerY + cardH * 0.1);
      ctx.fillStyle = '#39D98A';
      ctx.fillText('✓ permission granted.', (width - cardW) / 2 + 16, centerY + cardH * 0.25);
    } else {
      // Luxury Gold / Aurora
      ctx.fillStyle = '#0A0A0F';
      roundRect(ctx, (width - cardW) / 2, centerY - cardH / 2, cardW, cardH, 16);
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.stroke();

      ctx.fillStyle = '#F59E0B';
      ctx.font = `bold ${width * 0.032}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('CURATED PORTFOLIO', (width - cardW) / 2 + 16, centerY - cardH * 0.25);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${width * 0.05}px serif`;
      ctx.fillText('Alex Chen • Principal Architect', (width - cardW) / 2 + 16, centerY - cardH * 0.08);
      ctx.fillStyle = '#94A3B8';
      ctx.font = `${width * 0.032}px sans-serif`;
      ctx.fillText('Crafting resilient distributed systems.', (width - cardW) / 2 + 16, centerY + cardH * 0.1);
    }
  } else {
    // Phase 3: Triple screen live sync
    const cardW = width * 0.26;
    const cardH = height * 0.24;
    const gap = width * 0.04;
    const startX = (width - (cardW * 3 + gap * 2)) / 2;

    // Sync banner
    ctx.fillStyle = 'rgba(6, 78, 59, 0.8)';
    roundRect(ctx, width * 0.1, centerY - height * 0.2, width * 0.8, height * 0.045, 12);
    ctx.fill();
    ctx.strokeStyle = '#39D98A';
    ctx.stroke();
    ctx.fillStyle = '#39D98A';
    ctx.font = `bold ${width * 0.035}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('⚡ SYNCHRONIZED IN 12ms', width / 2, centerY - height * 0.17);

    // 3 cards side by side
    const titles = ['PORTFOLIO', 'RESUME PDF', 'README.md'];
    const colors = ['#4DA6FF', '#7C5CFF', '#39D98A'];
    for (let i = 0; i < 3; i++) {
      const cx = startX + i * (cardW + gap);
      ctx.fillStyle = '#0A1224';
      roundRect(ctx, cx, centerY - cardH / 2, cardW, cardH, 12);
      ctx.fill();
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${width * 0.026}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(titles[i], cx + cardW / 2, centerY - cardH * 0.28);

      ctx.fillStyle = colors[i];
      ctx.fillText('✓ LIVE', cx + cardW / 2, centerY + cardH * 0.28);
    }
  }
}

function renderScene4(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const st = t - 11; // 0 to 4s
  const zoom = 1.0 + (st / 4) * 0.04;

  ctx.save();
  ctx.translate(width / 2, height * 0.48);
  ctx.scale(zoom, zoom);
  ctx.translate(-width / 2, -height * 0.48);

  // 1. Logo
  const logoSize = width * 0.16;
  drawRoundedSquareLogo(ctx, width / 2 - logoSize / 2, height * 0.12, logoSize, true);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${width * 0.065}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('Portxz', width / 2, height * 0.21);

  // 2. Launch offer pill
  const pillW = width * 0.76;
  const pillH = height * 0.034;
  ctx.fillStyle = 'rgba(10, 24, 36, 0.9)';
  roundRect(ctx, (width - pillW) / 2, height * 0.24, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(57, 217, 138, 0.6)';
  ctx.stroke();

  ctx.fillStyle = '#39D98A';
  ctx.font = `bold ${width * 0.028}px monospace`;
  ctx.fillText('🟢 Launch offer — Pro for ₹49 • first 50 users', width / 2, height * 0.24 + pillH * 0.68);

  // 3. Headline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${width * 0.075}px system-ui, sans-serif`;
  ctx.fillText('One profile.', width / 2, height * 0.33);

  // Gradient line
  const grad = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, 0);
  grad.addColorStop(0, '#4DA6FF');
  grad.addColorStop(1, '#7C5CFF');
  ctx.fillStyle = grad;
  ctx.fillText('Portfolio, resume', width / 2, height * 0.38);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('& README', width / 2, height * 0.43);
  ctx.fillText('always in sync.', width / 2, height * 0.48);

  ctx.fillStyle = '#94A3B8';
  ctx.font = `${width * 0.03}px sans-serif`;
  ctx.fillText('Edit once — your portfolio, resume PDF,', width / 2, height * 0.53);
  ctx.fillText('and GitHub README update instantly.', width / 2, height * 0.555);

  // 4. Mini terminal box
  const boxW = width * 0.78;
  const boxH = height * 0.14;
  ctx.fillStyle = '#080D19';
  roundRect(ctx, (width - boxW) / 2, height * 0.59, boxW, boxH, 12);
  ctx.fill();
  ctx.strokeStyle = '#1E293B';
  ctx.stroke();

  ctx.fillStyle = '#39D98A';
  ctx.font = `600 ${width * 0.028}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('visitor@you:~$ resume', (width - boxW) / 2 + 14, height * 0.635);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('view resume | download PDF — always in sync', (width - boxW) / 2 + 14, height * 0.665);
  ctx.fillStyle = '#39D98A';
  ctx.fillText('visitor@you:~$ sudo hire-me -> ✓ granted', (width - boxW) / 2 + 14, height * 0.7);

  // 5. CTA Button
  const btnW = width * 0.78;
  const btnH = height * 0.06;
  ctx.fillStyle = '#4DA6FF';
  roundRect(ctx, (width - btnW) / 2, height * 0.76, btnW, btnH, 14);
  ctx.fill();

  ctx.fillStyle = '#0A0F1E';
  ctx.font = `900 ${width * 0.038}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('Claim your username — free  →', width / 2, height * 0.76 + btnH * 0.62);

  ctx.fillStyle = '#64748B';
  ctx.font = `${width * 0.026}px monospace`;
  ctx.fillText('live in 3 minutes • free plan forever', width / 2, height * 0.84);

  ctx.restore();
}

function drawCaptionBar(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  let text = '3 versions of you. None current.';
  if (t >= 3 && t < 6) text = 'Meet Portxz.';
  else if (t >= 6 && t < 11) text = 'Edit once → update everywhere';
  else if (t >= 11) text = 'Claim your username — free';

  const capW = width * 0.82;
  const capH = height * 0.045;
  const capY = height * 0.92;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
  roundRect(ctx, (width - capW) / 2, capY, capW, capH, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.stroke();

  // Cyan pulse dot
  ctx.fillStyle = '#4DA6FF';
  ctx.beginPath();
  ctx.arc((width - capW) / 2 + 18, capY + capH / 2, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${width * 0.034}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(text, width / 2 + 6, capY + capH * 0.65);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
