const MODEL_CHOICES = {
  base: 'Xenova/whisper-base',
  tiny: 'Xenova/whisper-tiny',
  small: 'Xenova/whisper-small',
  medium: 'Xenova/whisper-medium',
  'large-v3': 'Xenova/whisper-large-v3',
  'large-v3-turbo': 'Xenova/whisper-large-v3-turbo',
};

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

let currentFile = null;
let currentObjectUrl = null;
let isTranscribing = false;
let modelReady = false;

const modelProgress = new Map();

const worker = new Worker('worker.js', { type: 'module' });

function setWorkerStatus(text) {
  workerStatus.textContent = text;
}

function setModelStatus(text) {
  modelStatus.textContent = text;
}

function setOfflineStatus() {
  offlineStatus.textContent = navigator.onLine ? 'オンライン' : 'オフライン';
}

function syncWorkerOfflineStatus() {
  worker.postMessage({ type: 'set-offline', offline: !navigator.onLine });
}

function setTranscribeProgress(percent) {
  const value = Math.max(0, Math.min(100, percent));
  transcribeProgress.style.width = `${value}%`;
  transcribePercent.textContent = `${value}%`;
}

function setTranscribeStatus(text) {
  transcribeStatus.textContent = text;
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
  fileNameEl.textContent = '未選択';
  fileDetailsEl.textContent = '-';
  resetPreview();
  outputText.value = '';
  setTranscribeProgress(0);
  setTranscribeStatus('待機中');
  transcribeBtn.disabled = true;
  downloadBtn.disabled = true;
  isTranscribing = false;
}

function updateFileMeta(duration) {
  if (!currentFile) return;
  const details = [`${formatBytes(currentFile.size)}`, currentFile.type || '不明'];
  if (duration) details.push(`長さ ${formatDuration(duration)}`);
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
    alert('対応形式は MP3 / MP4 / WAV です。');
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
    placeholder.textContent = modelReady ? 'モデル準備完了' : 'まだロードされていません。';
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
      setModelStatus('モデルロード中');
    }
    if (data.status === 'progress') {
      const percent = normalizeProgress(data.progress ?? (data.loaded && data.total ? data.loaded / data.total : 0));
      modelProgress.set(file, percent);
      setModelStatus('モデルロード中');
    }
    if (data.status === 'done') {
      modelProgress.delete(file);
    }
    if (data.status === 'ready') {
      modelReady = true;
      setModelStatus('モデル準備完了');
    }
    updateModelProgressList();
  }

  if (data.type === 'asr') {
    if (data.status === 'start') {
      setWorkerStatus('Worker 処理中');
      setTranscribeStatus('文字起こし開始');
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
      setTranscribeStatus('完了');
      if (data.text) {
        outputText.value = data.text.trim();
      }
      downloadBtn.disabled = outputText.value.length === 0;
      transcribeBtn.disabled = false;
      isTranscribing = false;
      setWorkerStatus('Worker 待機中');
    }
    if (data.status === 'error') {
      setTranscribeStatus(data.error || 'エラーが発生しました');
      transcribeBtn.disabled = false;
      isTranscribing = false;
      setWorkerStatus('Worker 待機中');
    }
  }
});

worker.addEventListener('error', (event) => {
  setTranscribeStatus('Worker エラー');
  setWorkerStatus('Worker エラー');
  console.error(event);
});

async function startTranscription() {
  if (!currentFile || isTranscribing) return;
  isTranscribing = true;
  transcribeBtn.disabled = true;
  setTranscribeStatus('音声を解析中...');

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
    setTranscribeStatus('音声の読み込みに失敗しました');
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
  initDropzone();
  registerServiceWorker();
  setOfflineStatus();
  setWorkerStatus('Worker 起動中');
  setTranscribeStatus('待機中');

  window.addEventListener('online', setOfflineStatus);
  window.addEventListener('offline', setOfflineStatus);
  window.addEventListener('online', syncWorkerOfflineStatus);
  window.addEventListener('offline', syncWorkerOfflineStatus);

  clearBtn.addEventListener('click', () => resetState());
  transcribeBtn.addEventListener('click', () => startTranscription());
  downloadBtn.addEventListener('click', () => downloadText());
  modelSelect.addEventListener('change', () => {
    modelReady = false;
    setModelStatus('モデル未ロード');
    updateModelProgressList();
  });

  resetState();
  setWorkerStatus('Worker 待機中');
  syncWorkerOfflineStatus();
}

init();
