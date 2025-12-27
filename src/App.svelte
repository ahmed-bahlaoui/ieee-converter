<script>
// @ts-nocheck

  import init, { convert_f32, convert_f64 } from "../logic/pkg/logic.js";
  import { onMount } from "svelte";

  let inputVal = "";
  let isDouble = false;
  let result = null;
  let wasmReady = false;

  onMount(async () => {
    await init();
    wasmReady = true;
    update();
  });

  function update() {
    if (!wasmReady) return;

    const raw = inputVal;

    // Treat empty, null, undefined, or whitespace-only as no input
    const isEmpty =
      raw === "" ||
      raw === null ||
      raw === undefined ||
      (typeof raw === "string" && raw.trim() === "");

    if (isEmpty) {
      result = null;
      return;
    }

    // Normalize to a number and validate
    const n = typeof raw === "string" ? parseFloat(raw) : raw;
    if (!Number.isFinite(n)) {
      result = null;
      return;
    }

    result = isDouble
      ? convert_f64(n)
      : convert_f32(Math.fround(n));
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main class="wrapper">
  <div class="card">
    <header>
      <h1>IEEE 754 <span class="accent">Converter</span></h1>
      <p class="subtitle">Real-time Floating Point Analysis via Rust/WASM</p>
    </header>
  
    <div class="controls">
      <div class="input-container">
        <input 
          id="decimal" 
          type="number" 
          step="any" 
          placeholder="0.0"
          bind:value={inputVal} 
          on:input={update} 
        />
        <span class="focus-border"></span>
      </div>

      <label class="toggle-switch">
        <input type="checkbox" bind:checked={isDouble} on:change={update} />
        <span class="slider"></span>
        <span class="label-text">{isDouble ? '64-bit (Double)' : '32-bit (Single)'}</span>
      </label>
    </div>

    {#if result}
      <div class="visualization">
        
        <div class="bit-bar">
          <div class="bit-section sign">
            <span class="section-label">Sign</span>
            <span class="bit-value">{result.sign}</span>
          </div>
          
          <div class="bit-section exponent">
            <span class="section-label">Exponent</span>
            <span class="bit-value">{result.exponent}</span>
          </div>
          
          <div class="bit-section mantissa">
            <span class="section-label">Mantissa</span>
            <span class="bit-value">{result.mantissa}</span>
          </div>
        </div>

        <div class="data-grid">
            <div class="data-item">
                <span class="data-label">Hexadecimal</span>
                <code class="data-value">{result.hex}</code>
            </div>
            <div class="data-item full-width">
                <span class="data-label">Raw Binary</span>
                <code class="data-value small">{result.full_binary}</code>
            </div>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  /* 1. Global Reset & Fonts */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f0f2f5; /* Light gray background */
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  /* 2. Main Card Layout */
  .wrapper {
    width: 100%;
    max-width: 900px;
    padding: 20px;
  }

  .card {
    background: white;
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08); /* Soft, deep shadow */
    text-align: center;
    transition: transform 0.2s ease;
  }

  header h1 {
    font-weight: 800;
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.05rem;
  }

  .accent {
    color: #6366f1; /* Indigo */
    background: linear-gradient(120deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }

  /* 3. Input Styling */
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .input-container {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 20px;
    font-size: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    text-align: center;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    outline: none;
    transition: all 0.2s;
    background: #f9fafb;
    color: #1f2937;
  }

  /* Hide the ugly spinner buttons */
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  input[type="number"]:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  /* 4. Toggle Switch Styling */
  .toggle-switch {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-weight: 600;
    color: #4b5563;
    user-select: none;
  }

  .toggle-switch input {
    display: none;
  }

  .slider {
    width: 50px;
    height: 28px;
    background-color: #e5e7eb;
    border-radius: 34px;
    position: relative;
    transition: .3s;
  }

  .slider:before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  input:checked + .slider {
    background-color: #6366f1;
  }

  input:checked + .slider:before {
    transform: translateX(22px);
  }

  /* 5. Visualization (The Bits) */
  .bit-bar {
    display: flex;
    gap: 4px;
    margin-bottom: 2rem;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'JetBrains Mono', monospace;
  }

  .bit-section {
    display: flex;
    flex-direction: column;
    padding: 12px;
    transition: all 0.3s ease;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 6px;
    opacity: 0.8;
  }

  .bit-value {
    font-size: 1.2rem; /* Make bits readable */
    word-break: break-all;
    line-height: 1.4;
  }

  /* Specific Colors */
  .sign {
    background-color: #fee2e2;
    color: #991b1b;
    flex: 0 0 auto; /* Don't stretch */
  }

  .exponent {
    background-color: #dcfce7;
    color: #166534;
    flex: 0 0 auto;
  }

  .mantissa {
    background-color: #e0f2fe;
    color: #075985;
    flex: 1; /* Take remaining space */
  }

  /* 6. Data Grid (Hex/Binary) */
  .data-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: left;
    background: #111827; /* Dark terminal background */
    padding: 1.5rem;
    border-radius: 12px;
    color: #fff;
  }

  .data-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .data-label {
    font-size: 0.8rem;
    color: #9ca3af;
    font-weight: 600;
    text-transform: uppercase;
  }

  .data-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    color: #e5e7eb;
    word-break: break-all;
  }
  
  .small {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #6ee7b7; /* Matrix green for binary */
  }

  /* 7. Responsive Design */
  @media (max-width: 768px) {
    .wrapper {
      padding: 12px;
    }

    .card {
      padding: 1.5rem;
      border-radius: 16px;
    }

    header h1 {
      font-size: 1.75rem;
    }

    .subtitle {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .controls {
      gap: 1rem;
      margin-bottom: 2rem;
    }

    input[type="number"] {
      padding: 12px 16px;
      font-size: 1.25rem;
    }

    .toggle-switch {
      font-size: 0.875rem;
    }

    .slider {
      width: 44px;
      height: 24px;
    }

    .slider:before {
      height: 16px;
      width: 16px;
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .bit-bar {
      flex-direction: column;
      gap: 8px;
    }

    .bit-section {
      padding: 10px;
      border-radius: 6px;
    }

    .section-label {
      font-size: 0.7rem;
    }

    .bit-value {
      font-size: 1rem;
    }

    .data-grid {
      padding: 1rem;
    }

    .data-label {
      font-size: 0.7rem;
    }

    .data-value {
      font-size: 0.875rem;
    }

    .small {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .wrapper {
      padding: 8px;
    }

    .card {
      padding: 1rem;
      border-radius: 12px;
    }

    header h1 {
      font-size: 1.4rem;
    }

    .subtitle {
      font-size: 0.75rem;
      margin-bottom: 1rem;
    }

    input[type="number"] {
      padding: 10px 12px;
      font-size: 1.1rem;
      border-radius: 8px;
    }

    .toggle-switch {
      flex-direction: column;
      gap: 8px;
    }

    .bit-value {
      font-size: 0.9rem;
    }

    .data-grid {
      padding: 0.75rem;
      border-radius: 8px;
    }

    .small {
      font-size: 0.65rem;
    }
  }
</style>