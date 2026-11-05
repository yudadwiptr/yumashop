/**
 * Service to check and verify game player nicknames in real-time
 * Uses direct validation endpoints with graceful error handling and timeout protection.
 */

export async function checkGameAccount({ gameId = '', userId = '', zoneId = '' }) {
  const cleanUser = userId.trim();
  const cleanZone = zoneId.trim();

  if (!cleanUser) {
    return { success: false, message: 'User ID belum diisi' };
  }

  const isMLBB = gameId.toLowerCase().includes('mobile-legends') || gameId.toLowerCase().includes('mlbb');
  const isFF = gameId.toLowerCase().includes('free-fire') || gameId.toLowerCase().includes('ff');

  // Mobile Legends: Bang Bang
  if (isMLBB) {
    if (!cleanZone) {
      return { success: false, message: 'Zone / Server ID wajib diisi untuk Mobile Legends' };
    }

    try {
      const res = await fetch('https://api.isan.eu.org/nickname/ml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cleanUser, server: cleanZone }),
        signal: AbortSignal.timeout(7000)
      });

      if (!res.ok) {
        return { success: false, message: 'Akun tidak ditemukan. Periksa kembali ID dan Server Anda.' };
      }

      const data = await res.json();
      if (data && data.success && data.name) {
        return {
          success: true,
          username: data.name,
          country: data.country || 'Indonesia',
          game: 'Mobile Legends: Bang Bang'
        };
      }

      return { success: false, message: 'Akun tidak ditemukan' };
    } catch {
      return { success: false, message: 'Server verifikasi tidak merespons, silakan periksa koneksi Anda.' };
    }
  }

  // Garena Free Fire
  if (isFF) {
    try {
      const res = await fetch(`https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(cleanUser)}`, {
        signal: AbortSignal.timeout(7000)
      });

      if (!res.ok) {
        return { success: false, message: 'ID Free Fire tidak ditemukan.' };
      }

      const data = await res.json();
      if (data && data.success && data.name) {
        return {
          success: true,
          username: data.name,
          game: 'Garena Free Fire'
        };
      }

      return { success: false, message: 'ID Free Fire tidak ditemukan' };
    } catch {
      return { success: false, message: 'Gagal memverifikasi ID Free Fire' };
    }
  }

  // Games that don't have a public lookup endpoint
  return { supported: false };
}
