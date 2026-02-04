import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;
env.useBrowserCache = true;
env.allowRemoteModels = true;

class PipelineSingleton {
  static instance = null;
  static modelId = null;

  static async getInstance(modelId, progressCallback) {
    if (this.instance && this.modelId === modelId) {
      return this.instance;
    }
    this.modelId = modelId;
    this.instance = await pipeline('automatic-speech-recognition', modelId, {
      progress_callback: progressCallback,
    });
    return this.instance;
  }
}

function postModelProgress(data) {
  self.postMessage({ type: 'model', ...data });
}

function mergeText(previous, next) {
  const cleanNext = (next || '').trim();
  if (!previous) return cleanNext;
  if (!cleanNext) return previous;
  const maxOverlap = Math.min(80, previous.length, cleanNext.length);
  let overlap = 0;
  for (let i = maxOverlap; i > 10; i -= 1) {
    if (previous.slice(-i).toLowerCase() === cleanNext.slice(0, i).toLowerCase()) {
      overlap = i;
      break;
    }
  }
  const spacer = previous.endsWith(' ') ? '' : ' ';
  return overlap ? previous + cleanNext.slice(overlap) : previous + spacer + cleanNext;
}

async function transcribeAudio({ audio, sampleRate, modelId }) {
  const transcriber = await PipelineSingleton.getInstance(modelId, postModelProgress);
  const targetSampleRate = 16000;
  const chunkSeconds = 20;
  const strideSeconds = 2;
  const chunkSize = Math.floor(targetSampleRate * chunkSeconds);
  const strideSize = Math.floor(targetSampleRate * strideSeconds);
  const step = Math.max(1, chunkSize - strideSize);

  if (sampleRate !== targetSampleRate) {
    self.postMessage({
      type: 'asr',
      status: 'error',
      errorKey: 'transcribe_error_sample_rate',
    });
    return;
  }
  if (!audio || audio.length === 0) {
    self.postMessage({
      type: 'asr',
      status: 'error',
      errorKey: 'transcribe_error_empty',
    });
    return;
  }

  const totalChunks = Math.max(1, Math.ceil((audio.length - strideSize) / step));
  let combinedText = '';

  self.postMessage({ type: 'asr', status: 'start', totalChunks });

  for (let index = 0; index < totalChunks; index += 1) {
    const start = index * step;
    const end = Math.min(start + chunkSize, audio.length);
    const chunk = audio.subarray(start, end);
    const result = await transcriber(chunk, { task: 'transcribe' });
    combinedText = mergeText(combinedText, result.text || '');

    const progress = Math.round(((index + 1) / totalChunks) * 100);
    self.postMessage({ type: 'asr', status: 'progress', progress, text: combinedText });
  }

  self.postMessage({ type: 'asr', status: 'complete', text: combinedText });
}

self.addEventListener('message', async (event) => {
  const data = event.data;
  if (data.type === 'set-offline') {
    env.allowRemoteModels = !data.offline;
    return;
  }

  if (data.type === 'transcribe') {
    try {
      await transcribeAudio(data);
    } catch (error) {
      self.postMessage({
        type: 'asr',
        status: 'error',
        errorKey: 'transcribe_error_generic',
        error: error?.message || '',
      });
    }
  }
});

