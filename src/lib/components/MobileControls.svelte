<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let onThrottle: (value: number) => void = () => {};
  export let onBrake: (value: number) => void = () => {};
  export let onSteer: (value: number) => void = () => {};
  export let onHandbrake: (pressed: boolean) => void = () => {};
  export let onBoost: (pressed: boolean) => void = () => {};

  let isMobile = false;
  let steerValue = 0; // -1 to 1
  let throttlePressed = false;
  let brakePressed = false;
  let handbrakePressed = false;
  let boostPressed = false;

  // Touch tracking for joystick
  let joystickActive = false;
  let joystickStartX = 0;
  let joystickStartY = 0;
  let joystickCurrentX = 0;
  let joystickCurrentY = 0;
  const joystickRadius = 50; // pixels

  onMount(() => {
    // Detect if mobile/touch device
    isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
  });

  function handleThrottleStart(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    throttlePressed = true;
    onThrottle(1);
  }

  function handleThrottleEnd(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    throttlePressed = false;
    onThrottle(0);
  }

  function handleBrakeStart(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    brakePressed = true;
    onBrake(1);
  }

  function handleBrakeEnd(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    brakePressed = false;
    onBrake(0);
  }

  function handleHandbrakeStart(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    handbrakePressed = true;
    onHandbrake(true);
  }

  function handleHandbrakeEnd(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    handbrakePressed = false;
    onHandbrake(false);
  }

  function handleBoostStart(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    boostPressed = true;
    onBoost(true);
  }

  function handleBoostEnd(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    boostPressed = false;
    onBoost(false);
  }

  // Joystick for steering - follows finger position
  function handleJoystickStart(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    joystickActive = true;

    const touch = 'touches' in e ? e.touches[0] : e;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Always track from center of joystick base
    joystickStartX = rect.left + rect.width / 2;
    joystickStartY = rect.top + rect.height / 2;
    // Set current position to finger location immediately
    joystickCurrentX = touch.clientX;
    joystickCurrentY = touch.clientY;

    updateSteer();
  }

  function handleJoystickMove(e: TouchEvent | MouseEvent) {
    if (!joystickActive) return;
    e.preventDefault();

    const touch = 'touches' in e ? e.touches[0] : e;
    // Update to follow finger position directly
    joystickCurrentX = touch.clientX;
    joystickCurrentY = touch.clientY;

    updateSteer();
  }

  function handleJoystickEnd(e: TouchEvent | MouseEvent) {
    e.preventDefault();
    joystickActive = false;
    steerValue = 0;
    onSteer(0);
  }

  function updateSteer() {
    const dx = joystickCurrentX - joystickStartX;
    const dy = joystickCurrentY - joystickStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Clamp to joystick radius
    const clampedDistance = Math.min(distance, joystickRadius);
    const angle = Math.atan2(dy, dx);

    // Use horizontal component for steering
    // Swipe left (negative dx) = turn left = POSITIVE steerValue (counter-clockwise)
    // Swipe right (positive dx) = turn right = NEGATIVE steerValue (clockwise)
    steerValue = -dx / joystickRadius; // Inverted to match Three.js rotation
    steerValue = Math.max(-1, Math.min(1, steerValue));

    onSteer(steerValue);
  }

  // Get joystick knob position - follows finger directly
  function getJoystickKnobStyle(): string {
    if (!joystickActive) return 'transform: translate(-50%, -50%);';

    // Calculate finger offset from center
    const dx = joystickCurrentX - joystickStartX;
    const dy = joystickCurrentY - joystickStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let finalX = dx;
    let finalY = dy;

    // If outside radius, clamp to edge
    if (distance > joystickRadius) {
      const angle = Math.atan2(dy, dx);
      finalX = Math.cos(angle) * joystickRadius;
      finalY = Math.sin(angle) * joystickRadius;
    }

    // Position knob at finger location (or clamped edge)
    return `transform: translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px));`;
  }

  onDestroy(() => {
    // Cleanup if needed
  });
</script>

{#if isMobile}
  <div class="mobile-controls">
    <!-- Left side: Steering Joystick -->
    <div class="control-section left">
      <div
        class="joystick"
        on:touchstart={handleJoystickStart}
        on:touchmove={handleJoystickMove}
        on:touchend={handleJoystickEnd}
        on:mousedown={handleJoystickStart}
        role="button"
        tabindex="0"
        aria-label="Steering joystick"
      >
        <div class="joystick-base">
          <div class="joystick-knob" style={getJoystickKnobStyle()}></div>
        </div>
        <div class="joystick-label">STEER</div>
      </div>
    </div>

    <!-- Right side: Action Buttons -->
    <div class="control-section right">
      <!-- Throttle Button (Top Right) -->
      <button
        class="control-btn throttle"
        class:active={throttlePressed}
        on:touchstart={handleThrottleStart}
        on:touchend={handleThrottleEnd}
        on:mousedown={handleThrottleStart}
        on:mouseup={handleThrottleEnd}
        aria-label="Throttle"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7-7 7 7" />
        </svg>
        <span>GAS</span>
      </button>

      <!-- Brake Button (Bottom Right) -->
      <button
        class="control-btn brake"
        class:active={brakePressed}
        on:touchstart={handleBrakeStart}
        on:touchend={handleBrakeEnd}
        on:mousedown={handleBrakeStart}
        on:mouseup={handleBrakeEnd}
        aria-label="Brake"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7 7 7-7" />
        </svg>
        <span>BRAKE</span>
      </button>
    </div>

    <!-- Center Action Buttons -->
    <div class="control-section center">
      <!-- Boost Button -->
      <button
        class="control-btn boost small"
        class:active={boostPressed}
        on:touchstart={handleBoostStart}
        on:touchend={handleBoostEnd}
        on:mousedown={handleBoostStart}
        on:mouseup={handleBoostEnd}
        aria-label="Boost"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
        </svg>
        <span>BOOST</span>
      </button>

      <!-- Handbrake Button -->
      <button
        class="control-btn handbrake small"
        class:active={handbrakePressed}
        on:touchstart={handleHandbrakeStart}
        on:touchend={handleHandbrakeEnd}
        on:mousedown={handleHandbrakeStart}
        on:mouseup={handleHandbrakeEnd}
        aria-label="Handbrake"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
        </svg>
        <span>DRIFT</span>
      </button>
    </div>
  </div>
{/if}

<style>
  .mobile-controls {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20px;
    padding-bottom: 30px;
  }

  .control-section {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .control-section.left {
    align-items: flex-start;
  }

  .control-section.right {
    align-items: flex-end;
    gap: 20px;
  }

  .control-section.center {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 20px;
  }

  /* Joystick Styling */
  .joystick {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
  }

  .joystick-base {
    position: relative;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%);
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    box-shadow:
      0 4px 15px rgba(0, 0, 0, 0.5),
      inset 0 2px 10px rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .joystick-base::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  .joystick-knob {
    position: absolute;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4a9eff 0%, #2563eb 100%);
    border: 3px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.4),
      inset 0 -2px 5px rgba(0, 0, 0, 0.3),
      inset 0 2px 5px rgba(255, 255, 255, 0.3);
    transition: transform 0.05s ease-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .joystick-label {
    color: #fff;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    opacity: 0.9;
  }

  /* Button Styling */
  .control-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 90px;
    height: 90px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%);
    color: #fff;
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    transition: all 0.15s ease;
    box-shadow:
      0 4px 15px rgba(0, 0, 0, 0.5),
      inset 0 2px 8px rgba(255, 255, 255, 0.1);
  }

  .control-btn svg {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5));
  }

  .control-btn span {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }

  .control-btn.small {
    width: 70px;
    height: 70px;
  }

  .control-btn.small svg {
    width: 24px;
    height: 24px;
  }

  .control-btn.small span {
    font-size: 0.65rem;
  }

  /* Throttle Button */
  .control-btn.throttle {
    background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-color: rgba(34, 197, 94, 0.5);
  }

  .control-btn.throttle.active {
    background: radial-gradient(circle, rgba(34, 197, 94, 0.7) 0%, rgba(21, 128, 61, 0.8) 100%);
    border-color: rgba(34, 197, 94, 0.9);
    box-shadow:
      0 0 25px rgba(34, 197, 94, 0.6),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
  }

  /* Brake Button */
  .control-btn.brake {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-color: rgba(239, 68, 68, 0.5);
  }

  .control-btn.brake.active {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(185, 28, 28, 0.8) 100%);
    border-color: rgba(239, 68, 68, 0.9);
    box-shadow:
      0 0 25px rgba(239, 68, 68, 0.6),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
  }

  /* Boost Button */
  .control-btn.boost {
    background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-color: rgba(251, 191, 36, 0.5);
  }

  .control-btn.boost.active {
    background: radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(217, 119, 6, 0.8) 100%);
    border-color: rgba(251, 191, 36, 0.9);
    box-shadow:
      0 0 25px rgba(251, 191, 36, 0.6),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
  }

  /* Handbrake Button */
  .control-btn.handbrake {
    background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-color: rgba(168, 85, 247, 0.5);
  }

  .control-btn.handbrake.active {
    background: radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(126, 34, 206, 0.8) 100%);
    border-color: rgba(168, 85, 247, 0.9);
    box-shadow:
      0 0 25px rgba(168, 85, 247, 0.6),
      inset 0 2px 8px rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .mobile-controls {
      padding: 15px;
      padding-bottom: 20px;
    }

    .joystick-base {
      width: 100px;
      height: 100px;
    }

    .joystick-knob {
      width: 40px;
      height: 40px;
    }

    .control-btn {
      width: 75px;
      height: 75px;
    }

    .control-btn svg {
      width: 24px;
      height: 24px;
    }

    .control-btn.small {
      width: 60px;
      height: 60px;
    }

    .control-btn.small svg {
      width: 20px;
      height: 20px;
    }

    .control-section.center {
      gap: 15px;
    }
  }

  /* Landscape orientation */
  @media (max-height: 500px) and (orientation: landscape) {
    .mobile-controls {
      padding: 10px;
      padding-bottom: 15px;
    }

    .joystick-base {
      width: 80px;
      height: 80px;
    }

    .joystick-knob {
      width: 35px;
      height: 35px;
    }

    .control-btn {
      width: 65px;
      height: 65px;
    }

    .control-btn svg {
      width: 20px;
      height: 20px;
    }

    .control-btn.small {
      width: 50px;
      height: 50px;
    }

    .control-section.right {
      gap: 12px;
    }

    .control-section.center {
      bottom: 15px;
      gap: 12px;
    }
  }
</style>
