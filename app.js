const MODEL_CHOICES = {
  base: 'Xenova/whisper-base',
  tiny: 'Xenova/whisper-tiny',
  small: 'Xenova/whisper-small',
  medium: 'Xenova/whisper-medium',
  'large-v3': 'Xenova/whisper-large-v3',
};

const I18N = {
  ja: {
    title: 'オフラインWhisper文字起こし | ブラウザ完結ローカル転写ツール',
    meta_description:
      'MP3/MP4/WAVをドラッグ＆ドロップするだけで、すべてクライアントサイドでWhisper文字起こし。初回ロード後はオフライン対応、プライバシー重視のローカル転写ツール。',
    meta_keywords: 'Whisper, 文字起こし, オフライン, ブラウザ, ローカル, 転写, 音声認識, クライアントサイド, プライバシー',
    og_title: 'オフラインWhisper文字起こし | ブラウザ完結ローカル転写ツール',
    og_description:
      'MP3/MP4/WAVをドラッグ＆ドロップするだけで、すべてクライアントサイドでWhisper文字起こし。初回ロード後はオフライン対応、プライバシー重視のローカル転写ツール。',
    twitter_title: 'オフラインWhisper文字起こし | ブラウザ完結ローカル転写ツール',
    twitter_description:
      'MP3/MP4/WAVをドラッグ＆ドロップするだけで、すべてクライアントサイドでWhisper文字起こし。初回ロード後はオフライン対応、プライバシー重視のローカル転写ツール。',
    app_name: 'オフラインWhisper文字起こし',
    lang_toggle_label: '言語',
    lang_ja: '日本語',
    lang_en: 'English',
    tagline: 'オフライン • クライアントサイド • Whisper',
    hero_title: 'ブラウザだけで動くローカル文字起こし',
    hero_subtitle:
      'MP3 / MP4 / WAV をドラッグ＆ドロップして、すべてクライアントサイドで Whisper 文字起こし。初回ロード後はオフラインでも利用できます。',
    upload_heading: 'ファイルのアップロードと進捗',
    dropzone_title: 'ここにファイルをドロップ',
    dropzone_subtitle: 'またはクリックして選択 (最大 250MB 目安)',
    dropzone_formats: '対応形式: MP3 / MP4 / WAV',
    status_model_unloaded: 'モデル未ロード',
    status_model_loading: 'モデルロード中',
    status_model_ready: 'モデル準備完了',
    status_worker_idle: 'Worker 待機中',
    status_worker_processing: 'Worker 処理中',
    status_worker_starting: 'Worker 起動中',
    status_worker_error: 'Worker エラー',
    status_online: 'オンライン',
    status_offline: 'オフライン',
    label_model: 'モデル',
    option_base: 'Whisper base (精度優先)',
    option_tiny: 'Whisper tiny (速度優先)',
    option_small: 'Whisper small',
    option_medium: 'Whisper medium',
    option_large_v3: 'Whisper large-v3',
    label_file: 'ファイル',
    file_unselected: '未選択',
    clear_btn: 'クリア',
    transcribe_btn: '文字起こし開始',
    preview_placeholder: 'プレビューがここに表示されます。',
    model_progress_title: 'モデルロード進捗',
    model_progress_note: '初回のみ',
    model_progress_empty: 'まだロードされていません。',
    model_progress_empty_ready: 'モデル準備完了',
    transcribe_progress_title: '文字起こし進捗',
    transcribe_status_idle: '待機中',
    result_heading: '文字起こし結果',
    result_title: '文字起こし結果',
    result_subtitle: 'テキストはローカルでのみ処理されます。',
    download_btn: '.txt をダウンロード',
    output_placeholder: 'ここに文字起こし結果が表示されます。',
    footer_note:
      '初回はモデルと WASM をダウンロードします。完了後は Cache API と Service Worker によりオフラインで再利用できます。',
    unknown_type: '不明',
    duration_label: '長さ',
    alert_invalid_format: '対応形式は MP3 / MP4 / WAV です。',
    transcribe_status_start: '文字起こし開始',
    transcribe_status_analyzing: '音声を解析中...',
    transcribe_status_complete: '完了',
    transcribe_error_audio_load: '音声の読み込みに失敗しました',
    transcribe_error_sample_rate: 'サンプルレートが一致しません。',
    transcribe_error_empty: '音声データが空です。',
    transcribe_error_generic: '文字起こしに失敗しました',
    transcribe_error_generic_status: 'エラーが発生しました',
  },
  en: {
    title: 'Offline Whisper Transcriber | Local, Browser-Only Transcription',
    meta_description:
      'Drag and drop MP3/MP4/WAV to transcribe with Whisper fully client-side. Works offline after the first load, privacy-first local transcription.',
    meta_keywords: 'Whisper, transcription, offline, browser, local, speech to text, client-side, privacy',
    og_title: 'Offline Whisper Transcriber | Local, Browser-Only Transcription',
    og_description:
      'Drag and drop MP3/MP4/WAV to transcribe with Whisper fully client-side. Works offline after the first load, privacy-first local transcription.',
    twitter_title: 'Offline Whisper Transcriber | Local, Browser-Only Transcription',
    twitter_description:
      'Drag and drop MP3/MP4/WAV to transcribe with Whisper fully client-side. Works offline after the first load, privacy-first local transcription.',
    app_name: 'Offline Whisper Transcriber',
    lang_toggle_label: 'Language',
    lang_ja: '日本語',
    lang_en: 'English',
    tagline: 'Offline • Client-side • Whisper',
    hero_title: 'Local transcription that runs entirely in your browser',
    hero_subtitle: 'Drag & drop MP3/MP4/WAV and transcribe with Whisper fully client-side. After the first load, it works offline.',
    upload_heading: 'Upload and progress',
    dropzone_title: 'Drop a file here',
    dropzone_subtitle: 'Or click to choose (up to ~250MB)',
    dropzone_formats: 'Supported: MP3 / MP4 / WAV',
    status_model_unloaded: 'Model not loaded',
    status_model_loading: 'Loading model',
    status_model_ready: 'Model ready',
    status_worker_idle: 'Worker idle',
    status_worker_processing: 'Worker processing',
    status_worker_starting: 'Starting worker',
    status_worker_error: 'Worker error',
    status_online: 'Online',
    status_offline: 'Offline',
    label_model: 'Model',
    option_base: 'Whisper base (accuracy)',
    option_tiny: 'Whisper tiny (speed)',
    option_small: 'Whisper small',
    option_medium: 'Whisper medium',
    option_large_v3: 'Whisper large-v3',
    label_file: 'FILE',
    file_unselected: 'No file selected',
    clear_btn: 'Clear',
    transcribe_btn: 'Start transcription',
    preview_placeholder: 'Preview will appear here.',
    model_progress_title: 'Model loading',
    model_progress_note: 'First time only',
    model_progress_empty: 'Not loaded yet.',
    model_progress_empty_ready: 'Model ready',
    transcribe_progress_title: 'Transcription progress',
    transcribe_status_idle: 'Idle',
    result_heading: 'Transcript',
    result_title: 'Transcript',
    result_subtitle: 'Text is processed locally only.',
    download_btn: 'Download .txt',
    output_placeholder: 'Your transcript will appear here.',
    footer_note: 'The first run downloads the model and WASM. After that, Cache API and a Service Worker enable offline reuse.',
    unknown_type: 'Unknown',
    duration_label: 'Duration',
    alert_invalid_format: 'Supported formats are MP3 / MP4 / WAV.',
    transcribe_status_start: 'Transcription started',
    transcribe_status_analyzing: 'Analyzing audio...',
    transcribe_status_complete: 'Complete',
    transcribe_error_audio_load: 'Failed to load audio',
    transcribe_error_sample_rate: 'Sample rate mismatch.',
    transcribe_error_empty: 'Audio data is empty.',
    transcribe_error_generic: 'Transcription failed',
    transcribe_error_generic_status: 'An error occurred',
  },
};

const DEFAULT_LANG = 'ja';
const SUPPORTED_LANGS = ['ja', 'en'];
const LANG_STORAGE_KEY = 'transcript_generator_lang';

let currentLang = DEFAULT_LANG;

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const fileNameEl = document.getElementById('file-name');
const fileDetailsEl = document.getElementById('file-details');
const audioPreview = document.getElementById('audio-preview');
const videoPreview = document.getElementById('video-preview');
const previewPlaceholder = document.getElementById('preview-placeholder');
const modelSelect = document.getElementById('model-select');
const transcribeBtn = document.getElementById('transcribe-btn');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');
const outputText = document.getElementById('output-text');
const modelProgressList = document.getElementById('model-progress-list');
const modelStatus = document.getElementById('model-status');
const workerStatus = document.getElementById('worker-status');
const offlineStatus = document.getElementById('offline-status');
const transcribeProgress = document.getElementById('transcribe-progress');
const transcribePercent = document.getElementById('transcribe-percent');
const transcribeStatus = document.getElementById('transcribe-status');
const langToggle = document.getElementById('language-toggle');
const langButtons = langToggle ? Array.from(langToggle.querySelectorAll('[data-lang]')) : [];

let currentFile = null;
let currentObjectUrl = null;
let currentDuration = null;
let isTranscribing = false;
let modelReady = false;

let workerStatusKey = 'status_worker_idle';
let transcribeStatusKey = 'transcribe_status_idle';
let modelStatusKey = 'status_model_unloaded';

const modelProgress = new Map();

const worker = new Worker('worker.js', { type: 'module' });

function getSavedLang() {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    // ignore storage failures
  }
}

function normalizeLangCode(value) {
  if (!value) return null;
  const normalized = String(value).toLowerCase();
  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('en')) return 'en';
  return null;
}

function getLangFromUrl() {
  try {
    const url = new URL(window.location.href);
    return normalizeLangCode(url.searchParams.get('lang'));
  } catch (error) {
    return null;
  }
}

function getBaseUrl() {
  const canonical = document.querySelector('link[rel="canonical"]');
  const fallback = `${window.location.origin}${window.location.pathname}`;
  if (!canonical) return fallback;
  try {
    const url = new URL(canonical.href, window.location.href);
    url.search = '';
    return url.toString();
  } catch (error) {
    return fallback;
  }
}

function buildLangUrl(lang) {
  const base = getBaseUrl();
  if (lang !== 'en') return base;
  const url = new URL(base);
  url.searchParams.set('lang', 'en');
  return url.toString();
}

function updateUrlForLang(lang) {
  const target = buildLangUrl(lang);
  try {
    if (window.location.href !== target) {
      window.history.replaceState({}, '', target);
    }
  } catch (error) {
    // ignore history update failures (e.g., file://)
  }
}

function detectLang() {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || DEFAULT_LANG];
  for (const lang of candidates) {
    const normalized = normalizeLangCode(lang);
    if (normalized) return normalized;
  }
  return DEFAULT_LANG;
}

function resolveLang() {
  const fromUrl = getLangFromUrl();
  if (SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;
  const saved = getSavedLang();
  if (SUPPORTED_LANGS.includes(saved)) return saved;
  const detected = detectLang();
  return SUPPORTED_LANGS.includes(detected) ? detected : DEFAULT_LANG;
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N[DEFAULT_LANG]?.[key] || key;
}

function setMetaByName(name, value) {
  const element = document.querySelector(`meta[name="${name}"]`);
  if (element && value) element.setAttribute('content', value);
}

function setMetaByProperty(property, value) {
  const element = document.querySelector(`meta[property="${property}"]`);
  if (element && value) element.setAttribute('content', value);
}

function updateSchema(urlOverride) {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script) return;
  try {
    const data = JSON.parse(script.textContent);
    data.name = t('app_name');
    data.description = t('meta_description');
    data.inLanguage = currentLang;
    if (urlOverride) {
      data.url = urlOverride;
    }
    script.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.warn('Structured data update failed', error);
  }
}

function updateLangToggle() {
  if (!langButtons.length) return;
  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLang;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  saveLang(lang);
  applyI18n(lang);
}

function applyI18n(langOverride) {
  const resolved = SUPPORTED_LANGS.includes(langOverride) ? langOverride : resolveLang();
  currentLang = resolved;
  document.documentElement.lang = currentLang;
  document.title = t('title');
  setMetaByName('description', t('meta_description'));
  setMetaByName('keywords', t('meta_keywords'));
  setMetaByName('application-name', t('app_name'));
  setMetaByName('apple-mobile-web-app-title', t('app_name'));
  setMetaByProperty('og:site_name', t('app_name'));
  setMetaByProperty('og:title', t('og_title'));
  setMetaByProperty('og:description', t('og_description'));
  setMetaByProperty('og:locale', currentLang === 'ja' ? 'ja_JP' : 'en_US');
  setMetaByName('twitter:title', t('twitter_title'));
  setMetaByName('twitter:description', t('twitter_description'));
  const canonicalUrl = buildLangUrl(currentLang);
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl);
  }
  setMetaByProperty('og:url', canonicalUrl);
  updateSchema(canonicalUrl);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute('placeholder', t(key));
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute('aria-label', t(key));
  });

  updateUrlForLang(currentLang);
  refreshDynamicText();
}

function setWorkerStatus(text) {
  workerStatus.textContent = text;
}

function setModelStatus(text) {
  modelStatus.textContent = text;
}

function setTranscribeStatus(text) {
  transcribeStatus.textContent = text;
}

function setWorkerStatusKey(key) {
  workerStatusKey = key;
  setWorkerStatus(t(key));
}

function setModelStatusKey(key) {
  modelStatusKey = key;
  setModelStatus(t(key));
}

function setTranscribeStatusKey(key) {
  transcribeStatusKey = key;
  setTranscribeStatus(t(key));
}

function setTranscribeStatusText(text) {
  transcribeStatusKey = null;
  setTranscribeStatus(text);
}

function setOfflineStatus() {
  offlineStatus.textContent = navigator.onLine ? t('status_online') : t('status_offline');
}

function syncWorkerOfflineStatus() {
  worker.postMessage({ type: 'set-offline', offline: !navigator.onLine });
}

function setTranscribeProgress(percent) {
  const value = Math.max(0, Math.min(100, percent));
  transcribeProgress.style.width = `${value}%`;
  transcribePercent.textContent = `${value}%`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '-';
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  let value = bytes;
  while (value > 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(1)} ${units[index]}`;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function refreshDynamicText() {
  updateLangToggle();
  setOfflineStatus();
  if (!currentFile) {
    fileNameEl.textContent = t('file_unselected');
  }
  if (currentFile) {
    updateFileMeta();
  }
  if (modelStatusKey) {
    setModelStatus(t(modelStatusKey));
  }
  if (workerStatusKey) {
    setWorkerStatus(t(workerStatusKey));
  }
  if (transcribeStatusKey) {
    setTranscribeStatus(t(transcribeStatusKey));
  }
  updateModelProgressList();
}

function resetPreview() {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
  audioPreview.classList.add('hidden');
  videoPreview.classList.add('hidden');
  previewPlaceholder.classList.remove('hidden');
  audioPreview.src = '';
  videoPreview.src = '';
}

function resetState() {
  currentFile = null;
  currentDuration = null;
  fileNameEl.textContent = t('file_unselected');
  fileDetailsEl.textContent = '-';
  resetPreview();
  outputText.value = '';
  setTranscribeProgress(0);
  setTranscribeStatusKey('transcribe_status_idle');
  transcribeBtn.disabled = true;
  downloadBtn.disabled = true;
  isTranscribing = false;
}

function updateFileMeta(duration) {
  if (!currentFile) return;
  if (Number.isFinite(duration)) {
    currentDuration = duration;
  }
  const effectiveDuration = Number.isFinite(currentDuration) ? currentDuration : null;
  const details = [`${formatBytes(currentFile.size)}`, currentFile.type || t('unknown_type')];
  if (effectiveDuration) details.push(`${t('duration_label')} ${formatDuration(effectiveDuration)}`);
  fileDetailsEl.textContent = details.join(' • ');
}

function setFilePreview(file) {
  resetPreview();
  currentObjectUrl = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video');
  if (isVideo) {
    videoPreview.src = currentObjectUrl;
    videoPreview.classList.remove('hidden');
  } else {
    audioPreview.src = currentObjectUrl;
    audioPreview.classList.remove('hidden');
  }
  previewPlaceholder.classList.add('hidden');
}

function handleFile(file) {
  if (!file) return;
  const allowed = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'video/mp4'];
  const isValid = allowed.includes(file.type) || /\.(mp3|mp4|wav)$/i.test(file.name);
  if (!isValid) {
    alert(t('alert_invalid_format'));
    return;
  }

  currentFile = file;
  fileNameEl.textContent = file.name;
  updateFileMeta();
  setFilePreview(file);
  transcribeBtn.disabled = false;
}

async function decodeAudio(file) {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await audioContext.decodeAudioData(arrayBuffer);
  const targetSampleRate = 16000;
  let buffer = decoded;
  if (decoded.sampleRate !== targetSampleRate || decoded.numberOfChannels !== 1) {
    const length = Math.ceil(decoded.duration * targetSampleRate);
    const offline = new OfflineAudioContext(1, length, targetSampleRate);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source.connect(offline.destination);
    source.start(0);
    buffer = await offline.startRendering();
  }
  await audioContext.close();
  const channelData = buffer.getChannelData(0);
  const samples = new Float32Array(channelData.length);
  samples.set(channelData);
  return {
    samples,
    sampleRate: buffer.sampleRate,
    duration: buffer.duration,
  };
}

function updateModelProgressList() {
  modelProgressList.innerHTML = '';
  if (modelProgress.size === 0) {
    const placeholder = document.createElement('p');
    placeholder.textContent = modelReady ? t('model_progress_empty_ready') : t('model_progress_empty');
    modelProgressList.appendChild(placeholder);
    return;
  }

  for (const [file, progress] of modelProgress.entries()) {
    const row = document.createElement('div');
    row.className = 'progress-row';

    const meta = document.createElement('div');
    meta.className = 'progress-meta';

    const label = document.createElement('span');
    label.textContent = file;

    const value = document.createElement('span');
    value.textContent = `${progress}%`;

    meta.appendChild(label);
    meta.appendChild(value);

    const track = document.createElement('div');
    track.className = 'progress-track';

    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = `${progress}%`;

    track.appendChild(fill);
    row.appendChild(meta);
    row.appendChild(track);

    modelProgressList.appendChild(row);
  }
}

function normalizeProgress(value) {
  if (!Number.isFinite(value)) return 0;
  if (value <= 1) return Math.round(value * 100);
  return Math.round(value);
}

function shortFileLabel(path) {
  if (!path) return 'model-file';
  const parts = path.split('/');
  return parts[parts.length - 1];
}

worker.addEventListener('message', (event) => {
  const data = event.data;
  if (data.type === 'model') {
    const file = shortFileLabel(data.file);
    if (data.status === 'initiate') {
      modelProgress.set(file, 0);
      setModelStatusKey('status_model_loading');
    }
    if (data.status === 'progress') {
      const percent = normalizeProgress(data.progress ?? (data.loaded && data.total ? data.loaded / data.total : 0));
      modelProgress.set(file, percent);
      setModelStatusKey('status_model_loading');
    }
    if (data.status === 'done') {
      modelProgress.delete(file);
    }
    if (data.status === 'ready') {
      modelReady = true;
      setModelStatusKey('status_model_ready');
    }
    updateModelProgressList();
  }

  if (data.type === 'asr') {
    if (data.status === 'start') {
      setWorkerStatusKey('status_worker_processing');
      setTranscribeStatusKey('transcribe_status_start');
      setTranscribeProgress(0);
      outputText.value = '';
      downloadBtn.disabled = true;
    }
    if (data.status === 'progress') {
      setTranscribeProgress(data.progress ?? 0);
      if (data.text) {
        outputText.value = data.text.trim();
      }
    }
    if (data.status === 'complete') {
      setTranscribeProgress(100);
      setTranscribeStatusKey('transcribe_status_complete');
      if (data.text) {
        outputText.value = data.text.trim();
      }
      downloadBtn.disabled = outputText.value.length === 0;
      transcribeBtn.disabled = false;
      isTranscribing = false;
      setWorkerStatusKey('status_worker_idle');
    }
    if (data.status === 'error') {
      if (data.errorKey) {
        setTranscribeStatusKey(data.errorKey);
      } else if (data.error) {
        setTranscribeStatusText(data.error);
      } else {
        setTranscribeStatusKey('transcribe_error_generic_status');
      }
      transcribeBtn.disabled = false;
      isTranscribing = false;
      setWorkerStatusKey('status_worker_idle');
    }
  }
});

worker.addEventListener('error', (event) => {
  setTranscribeStatusKey('status_worker_error');
  setWorkerStatusKey('status_worker_error');
  console.error(event);
});

async function startTranscription() {
  if (!currentFile || isTranscribing) return;
  isTranscribing = true;
  transcribeBtn.disabled = true;
  setTranscribeStatusKey('transcribe_status_analyzing');

  try {
    const { samples, sampleRate, duration } = await decodeAudio(currentFile);
    updateFileMeta(duration);

    const modelId = MODEL_CHOICES[modelSelect.value] || MODEL_CHOICES.base;
    worker.postMessage(
      {
        type: 'transcribe',
        audio: samples,
        sampleRate,
        modelId,
        fileName: currentFile.name,
      },
      [samples.buffer]
    );
  } catch (error) {
    console.error(error);
    setTranscribeStatusKey('transcribe_error_audio_load');
    transcribeBtn.disabled = false;
    isTranscribing = false;
  }
}

function downloadText() {
  const text = outputText.value.trim();
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${currentFile ? currentFile.name.replace(/\.[^/.]+$/, '') : 'transcript'}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function initDropzone() {
  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    handleFile(file);
  });

  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('is-dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('is-dragover');
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('is-dragover');
    const [file] = event.dataTransfer.files || [];
    handleFile(file);
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (error) {
      console.warn('Service Worker registration failed', error);
    }
  });
}

function init() {
  applyI18n();
  initDropzone();
  registerServiceWorker();
  setWorkerStatusKey('status_worker_starting');
  setTranscribeStatusKey('transcribe_status_idle');

  window.addEventListener('online', setOfflineStatus);
  window.addEventListener('offline', setOfflineStatus);
  window.addEventListener('online', syncWorkerOfflineStatus);
  window.addEventListener('offline', syncWorkerOfflineStatus);
  window.addEventListener('languagechange', () => {
    if (!getSavedLang()) {
      applyI18n();
    }
  });

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.lang);
    });
  });

  clearBtn.addEventListener('click', () => resetState());
  transcribeBtn.addEventListener('click', () => startTranscription());
  downloadBtn.addEventListener('click', () => downloadText());
  modelSelect.addEventListener('change', () => {
    modelReady = false;
    setModelStatusKey('status_model_unloaded');
    updateModelProgressList();
  });

  resetState();
  setWorkerStatusKey('status_worker_idle');
  syncWorkerOfflineStatus();
}

init();
