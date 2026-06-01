import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader, AlertTriangle, CheckCircle, Leaf, Camera, Info, Zap, Video, VideoOff } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function DiseaseDetection() {
  const [image, setImage]         = useState(null);
  const [preview, setPreview]     = useState(null);
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [dragging, setDragging]   = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileRef    = useRef();
  const videoRef   = useRef();
  const canvasRef  = useRef();
  const streamRef  = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP)');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  // ── Camera functions ──────────────────────────────────
  const openCamera = async () => {
    setCameraError(null);
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setCameraError('Camera access denied. Please allow camera permission and try again.');
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      handleFile(file);
      closeCamera();
    }, 'image/jpeg', 0.92);
  };

  // ── Analyze ───────────────────────────────────────────
  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res  = await fetch(`${API_URL}/predict`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(`⚠️ ${data.message || 'Server error. Make sure the API is running.'}`);
        return;
      }
      setResult(data);
    } catch (err) {
      setError('Failed to connect to detection API. Run disease_api.py first.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setImage(null); setPreview(null); setResult(null); setError(null); };
  const isHealthy = result?.prediction?.includes('healthy');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4a2e 100%)',
        padding: '2.5rem 0 3.5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1rem',
          }}>
            <Zap size={14} color="#22c55e" />
            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>AI-Powered · 96.9% Accuracy</span>
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            Corn Disease Detection
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Upload a photo or use your camera to instantly detect corn/maize leaf diseases.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 50" fill="none" style={{ display: 'block' }}>
            <path d="M0 50L1440 50L1440 20C1200 40 960 50 720 40C480 30 240 10 0 20Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </section>

      <div className="container" style={{ padding: '1.5rem 1rem 4rem', maxWidth: '900px' }}>

        {/* Disease badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.625rem', marginBottom: '1.5rem' }}>
          {[
            { name: 'Common Rust', icon: '🔴' },
            { name: 'Northern Leaf Blight', icon: '🟠' },
            { name: 'Cercospora / Gray Leaf Spot', icon: '🟡' },
            { name: 'Healthy Plant', icon: '🟢' },
          ].map(d => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.625rem 0.875rem',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-secondary)',
            }}>
              <span>{d.icon}</span><span>{d.name}</span>
            </div>
          ))}
        </div>

        {/* ── Camera Modal ── */}
        {cameraOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <video ref={videoRef} autoPlay playsInline muted style={{
              width: '100%', maxWidth: '600px', maxHeight: '70vh',
              borderRadius: '12px', objectFit: 'cover',
            }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={closeCamera} style={{
                padding: '0.75rem 1.5rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <VideoOff size={18} /> Close
              </button>
              <button onClick={capturePhoto} style={{
                padding: '0.75rem 2rem', borderRadius: '8px',
                background: '#22c55e', border: 'none',
                color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(34,197,94,0.4)',
              }}>
                <Camera size={20} /> Capture
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              Point camera at the corn leaf and tap Capture
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Upload / Camera area */}
          <div>
            {!preview ? (
              <div>
                {/* Two action buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <button onClick={openCamera} style={{
                    padding: '1rem', borderRadius: 'var(--radius)',
                    background: 'linear-gradient(135deg, #0f2d1a, #166534)',
                    border: '2px solid var(--green-600)',
                    color: 'white', fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0.5rem',
                  }}>
                    <Video size={28} color="#22c55e" />
                    <span>Live Camera</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>Scan in real-time</span>
                  </button>
                  <button onClick={() => fileRef.current.click()} style={{
                    padding: '1rem', borderRadius: 'var(--radius)',
                    background: 'var(--bg-secondary)', border: '2px dashed var(--border)',
                    color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0.5rem',
                  }}>
                    <Upload size={28} color="var(--green-600)" />
                    <span>Upload Photo</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>JPG, PNG, WEBP</span>
                  </button>
                </div>

                {/* Drag & drop zone */}
                <div
                  onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
                  onClick={() => fileRef.current.click()}
                  style={{
                    border: `2px dashed ${dragging ? 'var(--green-500)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)', padding: '1.5rem',
                    textAlign: 'center', cursor: 'pointer',
                    background: dragging ? 'var(--green-50)' : 'var(--bg-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or drag & drop an image here</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

                {cameraError && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#dc2626' }}>
                    ⚠️ {cameraError}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img src={preview} alt="Leaf" style={{ width: '100%', borderRadius: 'var(--radius)', border: '2px solid var(--border)', maxHeight: '320px', objectFit: 'cover' }} />
                <button onClick={reset} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                  <X size={16} />
                </button>
                {!result && (
                  <button onClick={analyze} disabled={loading} style={{
                    width: '100%', marginTop: '1rem', padding: '0.875rem',
                    background: loading ? 'var(--bg-tertiary)' : 'linear-gradient(135deg, var(--green-500), var(--green-600))',
                    color: loading ? 'var(--text-muted)' : 'white',
                    border: 'none', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                  }}>
                    {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <><Leaf size={18} /> Detect Disease</>}
                  </button>
                )}
                {result && (
                  <button onClick={reset} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                    Analyze Another Image
                  </button>
                )}
              </div>
            )}

            {error && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: `2px solid ${result.color}40`, borderRadius: 'var(--radius)', borderLeft: `4px solid ${result.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {isHealthy ? <CheckCircle size={24} color="#22c55e" /> : <AlertTriangle size={24} color={result.color} />}
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detection Result</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{result.display_name}</div>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: result.color }}>{result.confidence}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${result.confidence}%`, background: `linear-gradient(90deg, ${result.color}, ${result.color}cc)`, borderRadius: '999px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', background: `${result.color}15`, border: `1px solid ${result.color}40`, borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, color: result.color }}>
                  Severity: {result.severity}
                </div>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Info size={16} color="var(--green-600)" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>About this Disease</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{result.description}</p>
              </div>

              <div style={{ padding: '1.25rem', background: isHealthy ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)', border: `1px solid ${isHealthy ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: 'var(--radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Leaf size={16} color={isHealthy ? '#22c55e' : '#ef4444'} />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{isHealthy ? 'Care Tips' : 'Recommended Treatment'}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{result.treatment}</p>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>All Predictions</div>
                {result.top3.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 2 ? '0.5rem' : 0 }}>
                    <span style={{ fontSize: '0.8rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: i === 0 ? 600 : 400 }}>
                      {i === 0 ? '✓ ' : ''}{item.display_name}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: i === 0 ? result.color : 'var(--text-muted)' }}>{item.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        {!result && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📸 Tips for Best Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {[
                { icon: '🌿', tip: 'Use a clear, close-up photo of the leaf' },
                { icon: '☀️', tip: 'Take photo in good natural lighting' },
                { icon: '🎯', tip: 'Focus on the affected area of the leaf' },
                { icon: '📐', tip: 'Keep the leaf flat and fully visible' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
