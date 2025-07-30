import Image from 'next/image';

export default function QRPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Scan to Submit a Maintenance Request</h1>
      <p>Use your phone camera to scan the QR code below</p>
      <Image
        src="/reactive_maintenance_qr.png"
        alt="QR Code to request maintenance"
        width={300}
        height={300}
        priority
      />
      <p style={{ marginTop: '1rem' }}>Or visit <strong>/request</strong> manually</p>
    </div>
  );
}
