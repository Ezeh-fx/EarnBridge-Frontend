const DEVICE_ID_KEY = 'earnbridge_device_id';

export function getOrCreateDeviceId(): string {
  const existingId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (existingId) {
    return existingId;
  }
  
  // Generate a simple unique ID
  const newId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  localStorage.setItem(DEVICE_ID_KEY, newId);
  
  return newId;
}
