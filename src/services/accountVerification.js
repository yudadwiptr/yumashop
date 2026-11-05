/**
 * Service to check and verify game player nicknames in real-time
 * Uses direct GET validation endpoints (Simple Request to avoid browser CORS preflight issues)
 * with graceful error handling and timeout protection.
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
      // Use GET with query params to avoid browser OPTIONS preflight (which returns 405 on some Cloudflare workers)
      const url = `https://api.isan.eu.org/nickname/ml?id=${encodeURIComponent(cleanUser)}&server=${encodeURIComponent(cleanZone)}`;
      const res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(8000)
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
      const url = `https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(cleanUser)}`;
      const res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(8000)
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
