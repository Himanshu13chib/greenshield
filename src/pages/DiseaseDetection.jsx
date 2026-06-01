import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader, AlertTriangle, CheckCircle, Leaf, Camera, Info, Zap } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function DiseaseDetection() {
  const [image, setImage]         = useState(null);
  const [preview, setPreview]     = useState(null);
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [dragging, setDragging]   = useState(false);
  const fileRef = useRef();

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

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 422) {
          setError(`⚠️ ${data.message}`);
        } else {
          throw new Error('Server error. Make sure the API is running.');
        }
        return;
      }
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to detection API. Run disease_api.py first.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const isHealthy = result?.prediction?.includes('healthy');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4a2e 100%)',
        padding: '3rem 0 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(16,185,129,0.1) 0%, transparent 40%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.25rem',
          }}>
            <Zap size={14} color="#22c55e" />
            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>AI-Powered · 96.9% Accuracy</span>
          </div>
          <h1 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem',
          }}>
            Corn Disease Detection
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
            Upload a photo of your corn/maize leaf and our AI will instantly detect diseases and suggest treatments.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 50" fill="none" style={{ display: 'block' }}>
            <path d="M0 50L1440 50L1440 20C1200 40 960 50 720 40C480 30 240 10 0 20Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: '900px' }}>

        {/* Supported diseases info */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem', marginBottom: '2rem',
        }}>
          {[
            { name: 'Common Rust', color: '#ef4444', icon: '🔴' },
            { name: 'Northern Leaf Blight', color: '#dc2626', icon: '🟠' },
            { name: 'Cercospora / Gray Leaf Spot', color: '#f59e0b', icon: '🟡' },
            { name: 'Healthy Plant', color: '#22c55e', icon: '🟢' },
          ].map(d => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.75rem 1rem',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', fontSize: '0.8rem',
              fontWeight: 500, color: 'var(--text-secondary)',
            }}>
              <span>{d.icon}</span>
              <span>{d.name}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Upload area */}
          <div>
            {!preview ? (
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragging ? 'var(--green-500)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragging ? 'var(--green-50)' : 'var(--bg-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--green-50)', border: '2px solid var(--green-200)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <Upload size={28} color="var(--green-600)" />
                </div>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Drop your leaf image here
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                  or click to browse files
                </p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  background: 'linear-gradient(135deg, var(--green-500), var(--green-600))',
                  color: 'white', borderRadius: 'var(--radius-sm)',
                  fontWeight: 600, fontSize: '0.875rem',
                }}>
                  <Camera size={16} /> Choose Image
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1rem' }}>
                  Supports JPG, PNG, WEBP · Max 10MB
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt="Uploaded leaf"
                  style={{
                    width: '100%', borderRadius: 'var(--radius)',
                    border: '2px solid var(--border)',
                    maxHeight: '320px', objectFit: 'cover',
                  }}
                />
                <button
                  onClick={reset}
                  style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'white',
                  }}
                >
                  <X size={16} />
                </button>

                {!result && (
                  <button
                    onClick={analyze}
                    disabled={loading}
                    style={{
                      width: '100%', marginTop: '1rem',
                      padding: '0.875rem',
                      background: loading
                        ? 'var(--bg-tertiary)'
                        : 'linear-gradient(135deg, var(--green-500), var(--green-600))',
                      color: loading ? 'var(--text-muted)' : 'white',
                      border: 'none', borderRadius: 'var(--radius)',
                      fontWeight: 700, fontSize: '1rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '0.625rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    {loading ? (
                      <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</>
                    ) : (
                      <><Leaf size={18} /> Detect Disease</>
                    )}
                  </button>
                )}

                {result && (
                  <button
                    onClick={reset}
                    style={{
                      width: '100%', marginTop: '1rem',
                      padding: '0.75rem',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      fontWeight: 600, fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    Analyze Another Image
                  </button>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                marginTop: '1rem', padding: '1rem',
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 'var(--radius)',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              }}>
                <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Main result card */}
              <div style={{
                padding: '1.5rem',
                background: 'var(--bg-secondary)',
                border: `2px solid ${result.color}40`,
                borderRadius: 'var(--radius)',
                borderLeft: `4px solid ${result.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {isHealthy
                    ? <CheckCircle size={24} color="#22c55e" />
                    : <AlertTriangle size={24} color={result.color} />
                  }
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Detection Result
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      {result.display_name}
                    </div>
                  </div>
                </div>

                {/* Confidence bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: result.color }}>{result.confidence}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${result.confidence}%`,
                      background: `linear-gradient(90deg, ${result.color}, ${result.color}cc)`,
                      borderRadius: '999px', transition: 'width 0.8s ease',
                    }} />
                  </div>
                </div>

                {/* Severity badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.25rem 0.75rem',
                  background: `${result.color}15`,
                  border: `1px solid ${result.color}40`,
                  borderRadius: '999px',
                  fontSize: '0.75rem', fontWeight: 600, color: result.color,
                }}>
                  Severity: {result.severity}
                </div>
              </div>

              {/* Description */}
              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Info size={16} color="var(--green-600)" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>About this Disease</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {result.description}
                </p>
              </div>

              {/* Treatment */}
              <div style={{
                padding: '1.25rem',
                background: isHealthy ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
                border: `1px solid ${isHealthy ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Leaf size={16} color={isHealthy ? '#22c55e' : '#ef4444'} />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {isHealthy ? 'Care Tips' : 'Recommended Treatment'}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {result.treatment}
                </p>
              </div>

              {/* Top 3 predictions */}
              <div style={{
                padding: '1.25rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  All Predictions
                </div>
                {result.top3.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: i < 2 ? '0.5rem' : 0,
                  }}>
                    <span style={{
                      fontSize: '0.8rem',
                      color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontWeight: i === 0 ? 600 : 400,
                    }}>
                      {i === 0 ? '✓ ' : ''}{item.display_name}
                    </span>
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 600,
                      color: i === 0 ? result.color : 'var(--text-muted)',
                    }}>
                      {item.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tips section */}
        {!result && (
          <div style={{
            marginTop: '2rem', padding: '1.5rem',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              📸 Tips for Best Results
            </h3>
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
